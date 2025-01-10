import { history, useLocation } from 'umi';
import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Button } from 'tdesign-react';
import { truncateString } from '@/utils/utils';
// import { AptosConnectButton } from '@razorlabs/wallet-kit';
// import { useAptosWallet, } from '@razorlabs/wallet-kit';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

interface PageHeaderProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function pageHeader({ isModalOpen, setIsModalOpen }: PageHeaderProps) {
  // const wallet = useAptosWallet();
  const { pathname, hash } = useLocation(); // 获取当前的路径

  // 在 hash 变化时，滚动到指定的锚点
  useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1)); // 获取锚点元素
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 平滑滚动到目标元素
      }
    }
  }, [hash]);

  // 点击导航项，更新 hash 并滚动到相应的锚点
  const handleNavClick = (target: string) => {
    // 使用 replace 更新 hash
    history.replace(`/index#${target}`);
  };

  return (
    <div className='page-header' >

      <Row align='middle' justify="space-between">
        <Col>
          <div className='logo bg-center' onClick={() => { history.replace('/swap'); window.scroll({ top: 0, left: 0, behavior: 'smooth' }); }}></div>
        </Col>
        <Col flex={1}>
          <div className='d-flex navi-menu primary-font'>
            <div
              className={`item ${pathname === '/swap' && !hash ? 'active' : ''}`}
              onClick={() => { history.replace('/swap'); window.scroll({ top: 0, left: 0, behavior: 'smooth' }); }}
            >
              Omi Swap
            </div>
            {/* <div
              className={`item ${pathname === '/index' && hash === '#ABOUT' ? 'active' : ''}`}
              onClick={() => handleNavClick('ABOUT')}
            >
              ABOUT
            </div>
            <div
              className={`item ${pathname === '/index' && hash === '#HOWTOGET' ? 'active' : ''}`}
              onClick={() => handleNavClick('HOWTOGET')}
            >
              HOW TO GET
            </div> */}
            <div
              className={`item ${pathname === '/pipiweusd' ? 'active' : ''}`}
              // onClick={() => history.replace('/pipiweusd')}
            >
              PiPi & WeUSD
            </div>
            <div
              className={`item ${pathname === '/docs' ? 'active' : ''}`}
              // onClick={() => history.replace('/docs')}
            >
              Docs
            </div>
          </div>
        </Col>

        <Col>
          <WalletSelector setModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </Col>
      </Row>
    </div>
  )
}