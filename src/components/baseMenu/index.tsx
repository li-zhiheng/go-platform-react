import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
// 这是一个function，MenuItem是返回数据类型
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const MenuItems: MenuItem[] = [
    getItem('Home', '1', <PieChartOutlined />),
    getItem('Lazy22', '/Lazy', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '/sub1/Lazy'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const baseMenu: React.FC = () => {

    // 菜单跳转之后刷新样式问题
    const currentRoute = useLocation()

    let firstOpenKey:string = ''
    const findKey = (obj:{key:string})=>{
        return obj.key === currentRoute.pathname
    }
    for(let k in MenuItems){
        if(MenuItems[k]!['children'] && MenuItems[k]!['children'].find(findKey)){
            firstOpenKey = MenuItems[k]!.key as string
            break
        }
    }
    // 只能展开一个
    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {

        setOpenKeys([keys[keys.length-1]])
        // 这个方法必须要事先将全部的root都整理到rootSubmenuKeys中，const rootSubmenuKeys = ['sub1']。不如上面的方法好用
        // const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        // if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        //      //如果rootSubmenuKeys不包含打开的key，就会将已经打开的和刚点开的都打开
        //     setOpenKeys(keys);
        // } else {
        //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        // }
    };

    // 菜单跳转
    const navigateTo = useNavigate()
    const menuClick = (e: { key: string }) => {
        navigateTo(e.key)
    }
    return (
                <Menu openKeys={openKeys}
                    onOpenChange={onOpenChange} theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={MenuItems} onClick={menuClick} />
    );
};

export default baseMenu;