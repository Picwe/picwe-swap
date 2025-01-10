import { Link, Outlet } from 'umi';
import { useEffect, useRef, useState } from 'react';
import { AppKitProvider } from "@/config/config";
import { Row, Col, Space, Button } from 'tdesign-react';
import SiderMenu from './siderMenu';
import PageHeader from './pageHeader';
import enConfig from 'tdesign-react/es/locale/en_US';
import { ConfigProvider } from 'tdesign-react';
import { history, useLocation } from 'umi';

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <AppKitProvider >
      <ConfigProvider globalConfig={enConfig}>
        <div className='web-page'>
          <PageHeader isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
          <div className='page-body'>
            <Outlet context={{ setIsModalOpen }}/>
          </div>
        </div>
      </ConfigProvider>
    </AppKitProvider>

  );
}
