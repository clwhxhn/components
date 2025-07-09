import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import { setupRouterGuard } from '@/router/guard'
// 全局引用ant-design
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/main.css'
import '@/styles/index.less'
import 'video.js/dist/video-js.css'

import { getAssetsImages, httpImg } from '@/utils/image'

// import { registerGlobComp } from '@/components/registerGlobComp'

const app = createApp(App)
app.config.globalProperties.$img = getAssetsImages
app.config.globalProperties.$httpImg = httpImg
app.config.unwrapInjectedRef = true

app.use(pinia)
app.use(router)
app.use(Antd)

// Register global components
// 注册全局组件
// registerGlobComp(app)

// router-guard
// 路由守卫
setupRouterGuard(router)

app.mount('#app')
