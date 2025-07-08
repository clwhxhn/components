import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/overview',
      children: [
        {
          path: '/overview',
          name: 'overview',
          component: () => import('@/views/overview/Index.vue')
        }
      ]
    },
    {
      path: '/panel',
      component: () => import('@/layouts/UEPanelLayout.vue'),
      children: [
        // {
        //   path: '/waterLevelCharts',
        //   name: 'waterLevelCharts',
        //   props: route => ({
        //     gateCode: route.query.gateCode,
        //     dataType: route.query.dataType,
        //     warnType: route.query.warnType,
        //     warnTypeStr: route.query.warnTypeStr,
        //     dataValue: route.query.dataValue,
        //     rule: route.query.rule
        //   }),
        //   component: () =>
        //     import('@/views/runningMonitor/components/WaterLevelPanel.vue')
        // },
      ]
    }
  ]
})

export default router
