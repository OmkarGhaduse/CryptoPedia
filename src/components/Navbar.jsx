import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const AppHeader = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize])

  return (
    <header className='header'>
      <div className='logo-container'>
        <Avatar src={icon} style={{ width: '65px', height: '65px' }}  />
        <Typography.Title level={2} className='logo'>
          <Link to="/">CryptoPedia</Link>
        </Typography.Title>
      </div>
      {activeMenu && (
        <Menu theme='dark' className='menu' mode="horizontal">
          <Menu.Item icon={<HomeOutlined />} style={{ fontSize: '20px' }}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} style={{ fontSize: '20px' }}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined />} style={{ fontSize: '20px' }}> */}
            {/* <Link to="/exchanges">Exchanges</Link> */}
          {/* </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined />} style={{ fontSize: '20px' }}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
      <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
        <MenuOutlined />
      </Button>
    </header>
  );
}

export default AppHeader;
