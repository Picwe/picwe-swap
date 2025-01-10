
import { useCallback, useEffect, useRef, useState } from 'react';
import { Table, Button, Input, Row, Col, Image, Pagination, PageInfo, Empty, Affix, Progress, InputNumber, Collapse, Statistic, MessagePlugin, Link } from 'tdesign-react';
import { history, useSearchParams } from 'umi';
import { Aptos, AptosConfig, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";
// import { createSurfClient } from '@thalalabs/surf';
import { AptosSignAndSubmitTransactionInput, AptosSignAndSubmitTransactionOutput, AptosSignMessageInput, AptosSignMessageOutput, AptosSignTransactionOutput, UserResponse, WalletAccount } from '@aptos-labs/wallet-standard';
import { CUSTOMFULLNODE } from '@/config/config';
// import { useAptosProvider, useAptosWallet, type AptosProvider } from '@razorlabs/wallet-kit';
import { getEventsFromChain, getTokenPage } from "@/api/index";
import { decMul, truncateString, bigDiv, bigMul, decSub, decAdd } from '@/utils/utils';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { CaretDownSmallIcon, CaretUpSmallIcon, IconIcon, SwapRightIcon } from 'tdesign-icons-react';
import question from '@/utils/question.json';
import question2 from '@/utils/question2.json';
import moment from 'moment';
import _ from 'lodash';
import { getView, getAccountResource, signAndSubmit, getTimestampByVersion } from "@/utils/transaction";
import ABI from '@/utils/abi.json';
import PRICE_ORACLE_ABI from "@/utils/priceOracleABI.json";
import { InputTransactionData, useWallet } from '@aptos-labs/wallet-adapter-react';
import errorParse from '@/utils/error';
import { Pie } from '@ant-design/plots';
import PIPI_ABI from "@/utils/pipiABI.json";
import WEUSD_ABI from "@/utils/weusdABI.json";
import { useOutletContext } from 'react-router-dom';

export default function IndexPage() {
  const { setIsModalOpen } = useOutletContext<{ setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }>();
  const { Panel } = Collapse;
  const { account, connected, wallet, network, changeNetwork, connect, signAndSubmitTransaction } = useWallet();
  const [mintState, setMintState] = useState({ ratio: '0.1' });
  const [movePrice, setMovePrice] = useState('');
  const [mintWeusdAmount, setMintWeusdAmount] = useState<string | number>('');
  const [mintCost, setMintCost] = useState({ move: '0', usdt: '0' });
  const [poolAmount, setPoolAmount] = useState({ move: '0', usdt: '0' })
  const [loading, setLoading] = useState(false);
  const [peiconfig, setPieConfig] = useState({});
  const [actionType, setActionType] = useState(0); //0:mint 1:reedem
  const [total, setTotal] = useState(0);
  const [queryParams, setQueryParams] = useState({ pageSize: 5, pageNumber: 1 });
  const [tableData, setTableData] = useState<any>([]);
  const [PIPIRatio, setPIPIRatio] = useState<string | number>('0');
  const [WEUSDTotal, setWEUSDTotal] = useState<string | number>('0');
  const [WEUSDPrice, setWEUSDPrice] = useState<string | number>(1);
  const [tableLoading, setTableLoading] = useState(true);
  useEffect(() => {
    getMintState();
    getMovePrice();
    getTotalReverves();
    getEventList();
    getPIPIRatio();
    getWEUSDTotal();
  }, [])

  const getEventList = async () => {
    setTableLoading(true);
    const accountResource = await getAccountResource({
      accountAddress: ABI.address,
      resourceType: `${ABI.address}::${ABI.name}::EventHandles`
    });
    console.log('accountResource', accountResource)
    const totalCounter = Number(accountResource.minted_weusd_events.counter); // 取得总数
    setTotal(totalCounter);
    console.log(decSub(totalCounter, decMul(queryParams.pageNumber, queryParams.pageSize)))
    const res: any = await getEventsFromChain(ABI.address, `${ABI.address}::${ABI.name}::EventHandles`, { start: decSub(totalCounter, decMul(queryParams.pageNumber, queryParams.pageSize)) > 0 ? decSub(totalCounter, decMul(queryParams.pageNumber, queryParams.pageSize)) : 0 })
    console.log('res', res);
    /** 如果分页到下一页，截去之前所有页的 */
    const _res = res.slice(0, decSub(res.length, decMul((queryParams.pageSize), decSub(queryParams.pageNumber, 1))));
    console.log('_res', _res);
    renderDate(_res);
  }

  const handleChangePage = (pageInfo: PageInfo) => {
    setQueryParams((pre) => {
      return {
        ...pre,
        pageNumber: pageInfo.current
      }
    })
  }

  useEffect(() => {
    getEventList()
  }, [queryParams])

  /** 获取mint比例 */
  const getMintState = async () => {
    const payload: InputViewFunctionData = {
      function: `${ABI.address}::${ABI.name}::get_mint_state_fields`,
      functionArguments: [],
      typeArguments: []
    }
    const res: any = await getView(payload);
    const _obj = {
      /**
       * move和usdt的比例，目前是1000/10000也就是10%，然后乘以1，
       * 就是输入mint 1个weusd需要0.1u的move和0.9个usdt,
       * 其中0.1u的move，还需要计算move的数量，使用move价格0.6计算，用0.1/0.6
      */
      ratio: bigDiv(res[2], 10000),
    }
    setMintState(_obj);
    console.log('r', _obj)
  }

  /** 获取move价格 */
  const getMovePrice = async () => {
    const payload: InputViewFunctionData = {
      function: `${PRICE_ORACLE_ABI.address}::${PRICE_ORACLE_ABI.name}::get_latest_price`,
      functionArguments: [],
      typeArguments: []
    }
    const res: any = await getView(payload);
    setMovePrice(bigDiv(res[0].value, 10 ** 8))
    console.log('price', res)
  }

  /** 获得池子move和usdt数量 */
  const getTotalReverves = async () => {
    const payload: InputViewFunctionData = {
      function: `${ABI.address}::${ABI.name}::get_total_reserves`,
      functionArguments: [],
      typeArguments: []
    }
    const res: any = await getView(payload);
    const _obj = {
      move: bigDiv(res[0], 10 ** 8),
      usdt: bigDiv(res[1], 10 ** 6),
    }
    setPoolAmount(_obj);
    console.log('TotalReverves', res)
    const config = {
      data: [{
        type: 'USDT',
        value: Number(_obj.usdt),
      }, {
        type: 'MOVE',
        value: Number(_obj.move),
      }],
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        fontFamily: '',
        text: (d: any) => `${d.type}\n ${d.value}`,
        position: 'spider',
        connectorLineWidth: 3,
        connectorStroke: '#000',
        fontWeight: 900,
        color: '#000'
        // formatter: (text:string, datum: any, index:number, data: any) => {
        //   return `${datum.type}\n ${datum.value}`
        // }
        // render: (_: any, d: any) => {
        //   console.log('ddd', _)
        //   return (<div>
        //     <div className='flex-center'>
        //       <div>{d.type}</div>
        //       <div>{d.value}</div>
        //     </div>
        //   </div>);
        // }
      },
      // color: (datum) => {
      //   // 根据数据项返回不同的颜色
      //   if (datum.type === 'USDT') {
      //     return '#fff';
      //   }
      //   return 'rgba(255, 221, 36, 1)'; // 默认颜色
      // },
      legend: false,
      tooltip: {
        title: (d: any) => (d.type), // transform
      },
      // connector: true,
      style: {
        fill: ({ type }: any) => {
          if (type == 'USDT') {
            return '#fff'
          }
          return 'rgba(255, 221, 36, 1)'
        },
      }
    }
    setPieConfig(config)
  }

  /** 获取pipi和weusd比例 */
  const getPIPIRatio = async () => {
    // get_current_mint_ratio
    const payload: InputViewFunctionData = {
      function: `${PIPI_ABI.address}::${PIPI_ABI.name}::get_current_mint_ratio`,
      functionArguments: [],
      typeArguments: []
    }
    const res: any = await getView(payload); // 10000/10000,如果10000代表百分百，就是1个weusd=1 pipi 如果5000代表50%，就是1个weusd = 0.5 pipi
    console.log('get_current_mint_ratio', res)
    setPIPIRatio(bigDiv(res[0], 10000))
  }

  /** 获取weusd总数量 */
  const getWEUSDTotal = async () => {
    const payload: InputViewFunctionData = {
      function: `${WEUSD_ABI.address}::${WEUSD_ABI.name}::total_supply`,
      functionArguments: [],
      typeArguments: []
    }
    const res: any = await getView(payload);
    setWEUSDTotal(bigDiv(res[0], 10 ** 6))
    console.log('weusd_total_supply', res)
  }

  /** 计算weusd的价格 */
  const computedWEUSDPrice = async () => {
    // move数量*价格+usdt数量 > weusd的数量时 ，则是1。否则就是 move数量*价格 + usdt数量 / weusd数量
    /** move数量*价格 + usdt数量 */
    const totalPool = decAdd(bigMul(poolAmount.move, movePrice), poolAmount.usdt)
    console.log('usdt和move的pool总市值:', totalPool)
    console.log('weusd总数量:', WEUSDTotal)
    if (Number(totalPool) > Number(WEUSDTotal)) {
      setWEUSDPrice(1)
    } else {
      const _weusdprice = bigDiv(totalPool, WEUSDTotal)
      setWEUSDPrice(_weusdprice)
    }
  }

  useEffect(() => {
    if (WEUSDTotal != '0' && poolAmount.move != '0' && WEUSDTotal != '0') {
      computedWEUSDPrice()
    }
  }, [WEUSDTotal, poolAmount, movePrice])



  /** 提交mintWeusd */
  const handleMINT = async () => {
    if (!connected) {
      setIsModalOpen(true);
      return;
    }
    try {
      setLoading(true)
      console.log(mintWeusdAmount);
      const transaction: InputTransactionData = {
        data: {
          function: `${ABI.address}::${ABI.name}::mintWeUSD`,
          functionArguments: [
            bigMul(mintWeusdAmount, 10 ** 6),
            []
          ]
        }
      }
      const transactionRes = await signAndSubmit(transaction, signAndSubmitTransaction);
      MessagePlugin.success('mintWeusd success', 3000)
      getEventList()
      getTotalReverves();
    } catch (error) {
      MessagePlugin.error(errorParse(error), 3000);
    } finally {
      setLoading(false)
    }

  }

  /** 提交redeem */
  const handleREDEEM = async () => {
    if (!connected) {
      setIsModalOpen(true);
      return;
    }
    try {
      setLoading(true)
      const transaction: InputTransactionData = {
        data: {
          function: `${ABI.address}::${ABI.name}::redeemWeUSD`,
          functionArguments: [
            bigMul(mintWeusdAmount, 10 ** 6),
            []
          ]
        }
      }
      const transactionRes = await signAndSubmit(transaction, signAndSubmitTransaction);
      MessagePlugin.success('redeemWeUSD success', 3000)
      getEventList();
      getTotalReverves();
    } catch (error) {
      MessagePlugin.error(errorParse(error), 3000);
    } finally {
      setLoading(false);
    }

  }

  const handleChangeAmount = async (v: string | number) => {
    setMintWeusdAmount((pre) => {
      if (Number(WEUSDPrice) == 1) {
        const usdtAmount = decMul(decSub(1, mintState.ratio), v)
        console.log('usdtAmount', usdtAmount)
        const moveAmount = bigDiv(decMul(v, mintState.ratio), movePrice)
        console.log('moveAmount', moveAmount)
        setMintCost({
          move: moveAmount,
          usdt: usdtAmount
        })
      } else {
        const usdtAmount = decMul(decSub(1, mintState.ratio), v)
        console.log('usdtAmount', usdtAmount)
        // const moveAmount = bigDiv(decMul(v, mintState.ratio), movePrice)
        const moveAmount = bigDiv((bigMul(v, decSub(WEUSDPrice, 0.9))), movePrice)
        console.log('moveAmount', moveAmount)
        setMintCost({
          move: moveAmount,
          usdt: usdtAmount
        })
      }
      return v
    });

  }

  // 使用 useCallback 包裹防抖函数，确保在组件重渲染时不会重新创建
  const debouncedHandleChangeAmount = useCallback(
    _.debounce(handleChangeAmount, 200), // 300ms 延迟
    [mintWeusdAmount, setMintWeusdAmount, setMintCost, mintState, movePrice]
  );





  const renderDate = async (list: Array<any>) => {
    // getTimestampByVersion(version);
    // return '1'
    let _list = [...list];
    for (let i = 0; i < _list.length; i++) {
      const item = list[i];

      // 调用异步函数获取时间戳
      const blockData: any = await getTimestampByVersion(item.version);
      // console.log('blockData', blockData)
      // 转换时间戳为日期格式
      const formattedTime = moment(parseInt(bigDiv(blockData.block_timestamp, 1000))).format('YYYY-MM-DD HH:mm:ss');

      // 将新的时间字段添加到 item 中
      item.block_timestamp = formattedTime;
    }
    // console.log(_list);
    setTableData([..._list].reverse());
    setTableLoading(false);
  }


  return (
    // <div className='home-page flex-column flex-center justify-content-center'>
    //   <div className='box text-white'>
    //     <div className='d-flex'>
    //       <div>
    //         <div>Current Prices</div>
    //         <div>MOVE:$<span>{movePrice}</span></div>
    //       </div>
    //     </div>
    //     <div className='d-flex'>
    //       <div className='text-primary'>weusd：</div>
    //       <InputNumber onChange={(e) => debouncedHandleChangeAmount(e)} placeholder="" theme="normal" value={mintWeusdAmount}></InputNumber>
    //     </div>
    //     <Button className='primary-btn mr-lg' onClick={() => { handleMINT() }} loading={loading}>
    //       submit minit
    //     </Button>

    //     <Button className='primary-btn' onClick={() => { handleREDEEM() }} loading={loading}>
    //       submit redeem
    //     </Button>
    //     <div>
    //       Estimated Cost:
    //       <div>
    //         MOVE: {mintCost.move}
    //       </div>
    //       <div>
    //         USDT: {mintCost.usdt}
    //       </div>
    //     </div>
    //     <div>
    //       pool amount:
    //       <div>
    //         MOVE: {poolAmount.move}
    //       </div>
    //       <div>
    //         USDT: {poolAmount.usdt}
    //       </div>
    //     </div>
    //     <div>
    //       Recent Transactions
    //       {
    //         list.map((item: any) => {
    //           return (
    //             <>
    //               <div>user：{item.data.user}</div>
    //               <div>fee：{item.data.fee}</div>
    //               <div>pipiAmount：{item.data.pipiAmount}</div>
    //               <div>stablecoinAmount：{item.data.stablecoinAmount}</div>
    //               <div>weUSDAmount：{item.data.weUSDAmount}</div>
    //             </>
    //           )
    //         })
    //       }
    //     </div>
    //   </div>

    // </div>
    <div className='mint-page primary-font'>
      <div className='info-page-header d-flex'>
        <div className='frog-img bg-center'></div>
        <div className='text-wrap'>
          <div className='header-text flex-center'>
            <div className='title primary-font-black'>Mint or Redeem WEUSD</div>
            <div className='primary-font desc'>between 0 and 1 UsD.lt typical fluctuates between 0.9 and 1 usD, stabilzing at 1 UsD duing sustained MovE pice growt. WEUsD is an impotantinfrastnucture of picwe system</div>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='price-box left'>
              <div className='box-title'>Current Prices</div>
              <div className='item'>MOVE: ${movePrice}</div>
              <div className='item'>WEUSD: ${WEUSDPrice}</div>
            </div>
            <div className='price-box'>
              <div className='box-title'>PIPl Mint Ratio</div>
              <div className='item'>1 WEUSD = {bigMul(1, PIPIRatio)} PIPI</div>
            </div>
          </div>
        </div>
      </div>

      <div className='pool-ratio-action-box d-flex '>
        <div className='left'>
          <div className='title'>Pool Ratio</div>
          <div className='pie-chart'>
            <Pie {...peiconfig} autoFit width={600} height={228} className='pie-chart' />
          </div>
        </div>
        <div className='right'>
          <div className='tabs d-flex'>
            <div className={`tab-item ${actionType == 0 && 'active'}`} onClick={() => { setActionType(0) }}>MINT</div>
            <div className={`tab-item ${actionType == 1 && 'active'}`} onClick={() => { setActionType(1) }}>REEDEM</div>
          </div>
          <div className='input-wrap'>
            <div className='lable primary-font'>Amount to {actionType == 0 ? 'Mint' : 'Redeem'}(WEUSD).</div>
            <InputNumber onChange={(e) => debouncedHandleChangeAmount(e)} placeholder="" theme="normal" className='mint-input' />
          </div>
          <div className='tips-title'>Estimated {actionType == 0 ? 'Cost' : 'Return'}.</div>
          <div className='d-flex'>
            <div className='tips-item'>MOVE：${mintCost.move}</div>
            <div className='tips-item'>USDT：${mintCost.usdt}</div>
          </div>
          {
            actionType == 0 ? (
              <Button className='trade-btn primary-font' loading={loading} onClick={handleMINT}>
                Mint WEUSD & PIPI
              </Button>
            ) : (
              <Button className='trade-btn primary-font' loading={loading} onClick={handleREDEEM}>
                Redeem USDT & MOVE
              </Button>
            )
          }

        </div>
      </div>

      <div className='table-wrap'>
        <Table
          loading={tableLoading}
          bordered
          data={tableData}
          rowClassName={'table-row primary-font'}
          maxHeight={'359px'}
          className='primary-font'
          columns={[
            {
              colKey: 'user',
              title: 'User',
              cell: ({ row }: any) => (
                <div>{truncateString(row.data?.user || '')}</div>
              )
            },
            {
              colKey: 'isBuy',
              title: 'Type',
              cell: ({ row }: any) => (
                <div>MINT</div>
                // <div style={row.isBuy ? { color: '#B5E961' } : { color: '#FB7444' }} >{row.isBuy ? 'BUY' : 'SELL'}</div>
              )
            },
            {
              colKey: 'aptAmount',
              title: 'WEUSD&PIPI',
              cell: ({ row }: any) => (
                <div>{bigDiv(row.data?.weUSDAmount, 10 ** 6)}</div>
              ),
            },
            {
              colKey: 'date',
              title: 'Date',
              cell: ({ row }: any) => {
                return row.block_timestamp
              }
            },
          ]}
          rowKey="index"
          pagination={{
            defaultPageSize: queryParams.pageSize,
            total: total,
            showPageSize: false
          }}
          onPageChange={handleChangePage}
        />
      </div>

    </div>
  )
}