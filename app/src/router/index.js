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
    }
]

const router = new Router({
    mode: 'history',
    routes
});


export default router