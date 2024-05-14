import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import homeStyle from '@/assets/style/home.module.less'
import { Outlet } from 'react-router-dom';
import Menu from '@/components/baseMenu'

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    // 面包屑
    const Breadcrumbs = [
        { key: 1, title: 'xxx' },
        { key: 2, title: 'eee' }
    ]

    return (
        <Layout className={homeStyle.home}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className={homeStyle.logo} />
                <Menu />
            </Sider>
            <Layout className="site-layout">
                <Header className={homeStyle.header} style={{ background: colorBgContainer }} >
                    <Breadcrumb items={Breadcrumbs} />
                </Header>
                <Content style={{ margin: '16px 16px 0', padding: 24, minHeight: 360, background: colorBgContainer }} >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', padding: '17px 50px' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Home;