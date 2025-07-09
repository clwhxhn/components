import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '@/views/overview/Index.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import UEPanelLayout from '@/layouts/UEPanelLayout.vue'
import ProjectRunning from '../views/ProjectRunning/Index.vue'
import PlantStation from '../views/PlantStation/Index.vue'
import PipelineMonitor from '../views/PipelineMonitor/Index.vue'
import RiverMonitor from '../views/RiverMonitor/Index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      redirect: '/projectRunning',
      children: [
        {
          path: '/projectRunning',
          name: 'projectRunning',
          component: ProjectRunning
        },
        {
          path: '/plantStation',
          name: 'plantStation',
          component: PlantStation
        },
        {
          path: '/pipelineMonitor',
          name: 'pipelineMonitor',
          component: PipelineMonitor
        },
        {
          path: '/riverMonitor',
          name: 'riverMonitor',
          component: RiverMonitor
        },

      ]
    }
  ]
})

export default router
