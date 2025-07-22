/*
 * @Author: wangxiaohui clwhxhn@163.com
 * @Date: 2024-07-16 10:02:54
 * @LastEditors: wangxiaohui clwhxhn@163.com
 * @LastEditTime: 2025-07-17 17:34:39
 * @FilePath: \app\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import WaterDisastersDefense from '@/views/Home';

const routes = [
    {
        path: '/',
        name: 'ceshi',
        redirect: '/index',
    },
    {
        path: '/index',
        name: 'index',
        component: WaterDisastersDefense
        // component: () =>
        //     import(/* webpackChunkName: "user" */ '@/views/Home')
    },
    {
        path: '/chart',
        name: 'chart',
        component: () =>
            import(/* webpackChunkName: "user" */ '@/views/charts/index')
    },
    {
        path: '/ui',
        name: 'ui',
        component: () =>
            import(/* webpackChunkName: "ui" */ '@/views/ui/index')
    },
    {
        path: '/ol',
        name: 'ol',
        component: () =>
            import(/* webpackChunkName: "ol" */ '@/views/ol/Home')
    },
    {
        path: '/antd',
        name: 'antd',
        component: () =>
            import(/* webpackChunkName: "ol" */ '@/views/antd/Home')
    },
    {
        path: '/time-line',
        name: 'TimeLine',
        component: () =>
            import(/* webpackChunkName: "ol" */ '@/views/time-player/Home')
    },
    {
        path: '/animate',
        name: 'Animate',
        component: () =>
            import(/* webpackChunkName: "ol" */ '@/views/animate/Home')
    },
    {
        path: '/led',
        name: 'Led',
        component: () =>
            import(/* webpackChunkName: "ol" */ '@/views/big-screen/Home')
    },
    
]

const router = new Router({
    mode: 'history',
    routes
});


export default router