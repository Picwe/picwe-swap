
import { useEffect, useState } from 'react';
import { Button, Input, Row, Col, Image, Pagination, PageInfo, Empty } from 'tdesign-react';
import { history, useLocation } from 'umi';
import { Aptos, AptosConfig, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";
// import { createSurfClient } from '@thalalabs/surf';
import { AptosSignAndSubmitTransactionInput, AptosSignAndSubmitTransactionOutput, AptosSignMessageInput, AptosSignMessageOutput, AptosSignTransactionOutput, UserResponse, WalletAccount } from '@aptos-labs/wallet-standard';
import { CUSTOMFULLNODE } from '@/config/config';
// import { useAptosProvider, useAptosWallet, type AptosProvider } from '@razorlabs/wallet-kit';
import { getTokenPage } from "@/api/index";
import PIPI_ABI from "@/utils/pipiABI.json";
import { getView } from '@/utils/transaction';
import { decMul, truncateString, bigDiv, bigMul, decSub, decAdd } from '@/utils/utils';

export default function IndexPage() {
  const [PIPITotal, setPIPITotal] = useState<number | string>(0);

  /** 获取pipi总量 */
  const getPIPIRatio = async () => {
    // get_current_mint_ratio
    const payload: InputViewFunctionData = {
      function: `${PIPI_ABI.address}::${PIPI_ABI.name}::total_supply`,
      functionArguments: [],
      typeArguments: []
    }
    const res: any = await getView(payload); // 10000/10000,如果10000代表百分百，就是1个weusd=1 pipi 如果5000代表50%，就是1个weusd = 0.5 pipi
    console.log('total_supply', res)
    setPIPITotal(bigDiv(res[0], 10 ** 6))
  }

  useEffect(() => {
    getPIPIRatio();
  }, [])


  return (
    <div className='home-page primary-font'>
      <div className='home-page-header position-relative'>
        <div className='title primary-font-black'>Welcome to PIPI Coin !</div>
        <div className='d-flex justify-content-between'>
          <div className='left'>
            <div className='desc primary-font'>The most adorable and innovative memeo coin in the crypto universe!</div>
            <div className='icon-list flex-center justify-content-start'>
              <div className='icon i-1 bg-center'></div>
              <div className='icon i-2 bg-center'></div>
              <div className='icon i-3 bg-center'></div>
            </div>
          </div>
          <div className='right'>
            <div className='common-card info-card flex-center flex-column'>
              <div className='val'>
                {new Intl.NumberFormat('en-US').format(Number(PIPITotal))}
              </div>
              <div className='label'>Total PIPI Minted</div>
            </div>
          </div>
        </div>
        <div className='frog-love position-absolute bg-center'></div>
      </div>
      <div className='document-box position-relative'>
        <div className='document-title primary-font-black'>PIPI Coin Features</div>
        <div className='common-card primary-font'>
          <div>· Mint PIPI coins alongside WEUSD at a 1:1 ratio initially</div>
          <div>· Each address can only mint PIPI once, but can mint WEUSD unlimited times</div>
          <div>· Total supply of 10 billion PIPI coins</div>
          <div>· Halving periods: 7 days, 30 days, 90 days, then every 180 days</div>
          <div>· Mint ratio decreases over time, making early minting more valuable</div>
          <div>· Redeem WEUSD for USDT and MOVE tokens at any time</div>
          <div>· No presale or initial funding, ensuring a fair launch</div>
          <div>· Team holds no tokens initially, promoting true decentralization</div>
          <div>· 7% of minted tokens are distributed to the team, aligning long-term interests</div>
        </div>

        <div className='document-title primary-font-black' id="ABOUT">About</div>
        <div className='common-card primary-font'>
          PIPI Coin is not just another meme coin - it's a revolutionary tokenomicsexperiment in the world of adorable cryptocurrencies!*Born from the love of cute puppies and the excitement of the crypto worldPIPl aims to bring joy, laughter, and innovative economic models to itsholders.
          Key FeaturesDual minting: Get PlPl coins when you mint WEUSDLimited minting: Each address can only mint PlPl onceDeflationary model: Halving periods reduce minting ratio over timeTotal supply: 10 billion PlPl coinsRedeemable: Exchange WEUSD for USDT and MOVE tokensTokenomicsPIPl's unique halving schedule creates scarcity and rewards early adopters:First 7 days:1 WEUSD=1 PIPINext 30 days:1 WEUSD =0.5 PIPINext 90 days:1 WEUSD = 0.25 PIP!Every 180 days after: Minting ratio halves againRemember, in the world of PiPl, every day is a tail-wagging good time, andevery mint is an opportunity to be part of a unique crypto experiment!
        </div>
        <div className='frog-ass bg-center position-absolute'></div>
      </div>

      <div className='tips-wrap'>
        <div className='tips-title text-center primary-font-black' id="HOWTOGET">How to Get</div>
        <div className='common-card'>
          1. Create a crypto wallet
        </div>
        <div className='common-card'>2. Buy some ETH</div>
        <div className='common-card'>3. Visit a DEX like Uniswap</div>
        <div className='common-card'>4. Swap ETH for PIPI</div>
        <div className='common-card'>5. HoDL and enjoy the ride!</div>
      </div>
    </div>
  );
}
