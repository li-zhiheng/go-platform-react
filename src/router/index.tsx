import Home from '@/view/Home'
import Login from '@/view/login'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Lazy = lazy(() => import('../view/Lazy'))



// 懒加载
const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const AppRouter = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />,

        children:[
            {
                path: 'Lazy',
                element: withLoadingComponent(<Lazy />)
            },
            {
                path: 'sub1/Lazy',
                element: withLoadingComponent(<Lazy />)
            },
        ],
    },
    // 访问其余路径都展示lazy页面,重定位
    // {
    //     path: '*',
    //     element: <Navigate to='Lazy' />
    // }
]

export default AppRouter