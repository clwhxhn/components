import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
import '@/utils/filter'
import vueBus from '@/utils/vue-bus'

Vue.use(vueBus)
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
