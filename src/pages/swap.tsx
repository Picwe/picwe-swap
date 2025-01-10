
import { useCallback, useEffect, useRef, useState } from 'react';
import { Table, Button, Input, Row, Col, Image, Pagination, PageInfo, Empty, Affix, Progress, InputNumber, Collapse, Statistic, MessagePlugin, Link, Dialog, Skeleton, Loading } from 'tdesign-react';
import { history, useSearchParams } from 'umi';
import { Aptos, AptosConfig, InputViewFunctionData } from "@aptos-labs/ts-sdk";
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
import { getView, getAccountResource, signAndSubmit, getTimestampByVersion, getBalance } from "@/utils/transaction";
import ABI from '@/utils/abi.json';
import PRICE_ORACLE_ABI from "@/utils/priceOracleABI.json";
import { InputTransactionData, useWallet } from '@aptos-labs/wallet-adapter-react';
import errorParse from '@/utils/error';
import { Pie } from '@ant-design/plots';
import PIPI_ABI from "@/utils/pipiABI.json";
import WEUSD_ABI from "@/utils/weusdABI.json";
import { useOutletContext } from 'react-router-dom';
import { Routex, Network, getDefaultClient, FA_ADDRESSES, Coin, FA } from "@routexio/sdk";

export default function SWAPPage() {
  const { setIsModalOpen } = useOutletContext<{ setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }>();
  const { account, connected, wallet, network, changeNetwork, connect, signAndSubmitTransaction } = useWallet();
  const [actionType, setActionType] = useState(0);
  const [payAmount, setPayAmount] = useState<string | number>(0);
  const [receicAmount, setReceicAmount] = useState<string | number>(0);
  const [loading, setLoading] = useState(false);
  const [FAList, setFAList] = useState<Array<any>>([]);
  const [COINList, setCOINList] = useState<Array<any>>([]);
  const [selectList, setSelectList] = useState<Array<any>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectPay, setSelectPay] = useState<any>({});
  const [selectReceic, setSelectReceic] = useState<any>({});
  const [modalType, setModalType] = useState('');
  const client = getDefaultClient(Network.Porto);
  const routex = new Routex({ client, network: Network.Porto });
  const [routeInfo, setRouteInfo] = useState<any>({});
  const [payBalance, setPayBalance] = useState<string | number>(0);
  const [receicBalance, setReceicBalance] = useState<string | number>(0);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    getPayBalance();
    getReceicBalance();
  }, [connected, selectPay, selectReceic])

  const getPayBalance = async () => {
    if (!connected) return '0';
    if (selectPay.type == 'FA') {
      const res = await getBalance({ accountAddress: account!.address, faMetadataAddress: selectPay.address });
      setPayBalance(bigDiv(res, 10 ** selectPay.decimal))
    } else if (selectPay.type) {
      const res = await getBalance({ accountAddress: account!.address, coinType: selectPay.address });
      setPayBalance(bigDiv(res, 10 ** selectPay.decimal))
    }
  }

  const getReceicBalance = async () => {
    if (!connected) return '0';
    if (selectPay.type) {
      const res = await getBalance({ accountAddress: account!.address, faMetadataAddress: selectReceic.address });
      setReceicBalance(bigDiv(res, 10 ** selectReceic.decimal))
    }
  }

  const handleChangeTab = (val: number) => {
    setActionType(val);
    setPayAmount(0);
    setReceicAmount(0);
    setRouteInfo({});
    if (val == 0) {
      setSelectPay(COINList[0])
    } else {
      setSelectPay(FAList[0])
    }
  }

  const handleChangeAmount = async (v: string | number) => {
    setRouteLoading(true);
    setPayAmount(v);
    console.log(selectPay.address)
    console.log(selectReceic.address)
    console.log(BigInt(bigMul(v, 10 ** selectPay.decimal)))
    const routeInfo = await routex.getRouting(selectPay.address, selectReceic.address, BigInt(bigMul(v, 10 ** selectPay.decimal)))
    console.log('routeInfo', routeInfo)
    setRouteInfo(routeInfo);
    setReceicAmount(bigDiv(routeInfo.amount_out, 10 ** selectReceic.decimal));
    setRouteLoading(false);
  }

  // 使用 useCallback 包裹防抖函数，确保在组件重渲染时不会重新创建
  const debouncedHandleChangeAmount = useCallback(
    _.debounce(handleChangeAmount, 200), // 300ms 延迟
    [setPayAmount, selectPay, selectReceic]
  );

  const handleExchange = () => {
    // 调换 selectPay 和 selectReceic
    setSelectPay(selectReceic);
    setSelectReceic(selectPay);
    setPayAmount(0);
    setReceicAmount(0);
    setRouteInfo({});
  }

  useEffect(() => {
    getCoins();
  }, [])

  const getCoins = async () => {

    // Get all FA tokens
    const fas = await routex.getFungibleAssets();
    const _fas = fas.map(item => {
      return {
        ...item,
        address: item.address.toString(),
        type: 'FA'
      }
    })
    setFAList(_fas);
    console.log('Available FA tokens:', _fas);

    // Get all Coin tokens
    const coins = await routex.getCoins();
    const _coins = coins.map(item => {
      return {
        ...item,
        address: item.type_,
        type: item.type_.includes('0x1::aptos_coin::AptosCoin') ? 'MOVE' : 'COIN'
      }
    })
    setCOINList(_coins);
    setSelectPay(_coins[0])
    setSelectReceic(_fas[0]);
    console.log('Available Coin tokens:', _coins)
  }

  const handleModal = (type: string) => {
    /** pay可以根据tab变化，receic只能是FA */
    if (type == 'pay') {
      if (actionType == 0) {
        setSelectList(COINList)
      } else {
        setSelectList(FAList)
      }
    }
    if (type == 'receic') {
      setSelectList(FAList)
    }
    setModalType(type);
    setModalVisible(true);
  }

  const handleSelect = (item: any, type: string) => {
    console.log('item', item)
    if (type == 'pay') {
      setSelectPay(item)
    }
    if (type == 'receic') {
      setSelectReceic(item)
    }
    setPayAmount(0);
    setReceicAmount(0);
    setRouteInfo({});
    setModalVisible(false);
  }

  const handleSWAP = async () => {
    try {
      const txnPayload = await routex.swapWithRouting(routeInfo, 5);
      console.log('txnPayload', txnPayload)
      const transaction: InputTransactionData = {
        data: txnPayload
      }
      const res = await signAndSubmit(transaction, signAndSubmitTransaction);
      MessagePlugin.success('swap success', 3000)
    } catch (error) {
      MessagePlugin.error(errorParse(error), 3000);
    }
   
  }

  return (
    <div className="swap-wrap primary-font">
      <div className='d-flex'>
        <div className='pipi-img bg-center'></div>
        <div className='page-content'>
          <div className='page-title primary-font-black white-shadow-text'>PicWe swap</div>
          <div className='flex-center'>
            <div className='common-card'>
              <div className='card-title primary-font-black'>Coin Token</div>
              <div className='text'>Native coins on Movement, including MOvE and other coins</div>
            </div>
            <div className='common-card c-2'>
              <div className='card-title primary-font-black'>FA Token</div>
              <div className='text'>Fungible Asset tokens on Aptos, similar to ERC-20 tokens on Ethereum</div>
            </div>
          </div>
          <div className='form-box'>
            <div className='flex-center tabs justify-content-start primary-font-black'>
              <div className={`tab-item ${actionType == 0 && 'active'}`} onClick={() => { handleChangeTab(0) }}>COIN</div>
              <div className={`tab-item ${actionType == 1 && 'active'}`} onClick={() => { handleChangeTab(1) }}>FA</div>
            </div>
            <div className='position-relative'>
              <div className='action-box mb-12'>
                <div className='primary-font-black action-box-title'>You pay</div>
                <div className='flex-center justify-content-start action-cell'>
                  <div className='coin-select flex-center' onClick={() => { handleModal('pay') }}>
                    <div className='bg-center coin-img' style={{ backgroundImage: `url(${selectPay?.logo})` }}></div>
                    <div className='coin-name'>{selectPay?.symbol}</div>
                  </div>
                  <div className='select-icon bg-center'></div>
                  <InputNumber onChange={(e) => debouncedHandleChangeAmount(e)} theme="normal" className='my-input flex-1 primary-font' value={payAmount} align='right' />
                </div>
                <div className='computed-num'>Balance: {payBalance}</div>
              </div>
              <div className='action-box mb-lg'>
                <div className='primary-font-black action-box-title'>You receic</div>
                <div className='flex-center justify-content-start action-cell'>
                  <div className='coin-select flex-center' onClick={() => { handleModal('receic') }}>
                    <div className='bg-center coin-img' style={{ backgroundImage: `url(${selectReceic?.logo})` }}></div>
                    <div className='coin-name'>{selectReceic?.symbol}</div>
                  </div>
                  <div className='select-icon bg-center'></div>
                  {
                    routeLoading ? (
                      <div className='flex-1 d-flex' style={{ justifyContent: 'flex-end' }}>
                        <Loading
                          indicator
                          loading
                          preventScrollThrough
                          showOverlay
                        />
                      </div>
                    ) : (
                      <InputNumber theme="normal" className='my-input flex-1 primary-font' value={receicAmount} align='right' disabled />
                    )
                  }
                </div>
                <div className='computed-num'>Balance: {receicBalance}</div>
              </div>
              {
                actionType == 1 && <div className='exchange-img bg-center position-absolute' onClick={handleExchange} ></div>
              }
            </div>
            <div className='route-box flex-center justify-content-start'>
              <div className='text primary-font-black'>ROUTE</div>
              <div className='r-item flex-center flex-column'>
                <div className='img bg-center rounded-circle' style={{ backgroundImage: `url(${selectPay.logo})` }}></div>
                <div className='val'>{payAmount} {selectPay.symbol}</div>
              </div>
              <div className='next-arrow bg-center'></div>
              {
                routeLoading ? (
                  <div className='flex-center'>
                    <Loading
                      indicator
                      loading
                      preventScrollThrough
                      showOverlay
                    />
                    <div className='next-arrow bg-center'></div>
                  </div>
                ) : (
                  routeInfo.routers && routeInfo.routers.map((item: any) => {
                    return (
                      <>
                        <div className='r-item flex-center flex-column'>
                          <div className='img bg-center rounded-circle' style={{ backgroundImage: `url(${item.logo})` }}></div>
                          <div className='val'>{item.name}</div>
                        </div>
                        <div className='next-arrow bg-center'></div>
                      </>
                    )
                  })
                )
              }
              <div className='r-item flex-center flex-column'>
                <div className='img bg-center rounded-circle' style={{ backgroundImage: `url(${selectReceic.logo})` }}></div>
                <div className='val'>{bigDiv(routeInfo.amount_out, 10 ** selectReceic.decimal)} {selectReceic.symbol}</div>
              </div>
            </div>
            {
              connected ? (
                <Button className='primary-btn mr-lg primary-font-black' block onClick={() => { handleSWAP() }} loading={loading || routeLoading}>
                  SWAP
                </Button>
              ) : (
                <Button className='primary-btn mr-lg primary-font-black' block onClick={() => { setIsModalOpen(true) }} loading={loading}>
                  CONNECT
                </Button>
              )
            }
          </div>
        </div>
      </div>

      <Dialog
        closeBtn={false}
        closeOnEscKeydown
        closeOnOverlayClick
        footer={false}
        header={false}
        mode="modal"
        onClose={() => { setModalVisible(false) }}
        placement="top"
        preventScrollThrough
        showOverlay
        theme="default"
        visible={modalVisible}
        className='moveFun-modal'
      >
        <div className='modal-content primary-font"'>
          {
            selectList.map(item => {
              return (
                <div key={item.address} className='flex-center justify-content-start coin-item' onClick={() => { handleSelect(item, modalType) }}>
                  <div className='coin-img bg-center' style={{ backgroundImage: `url(${item.logo})` }}></div>
                  <div className='coin-name flex-1'>{item.symbol}</div>
                  <div className='text'>1</div>
                </div>
              )
            })
          }
        </div>
      </Dialog>
    </div>
  )
}