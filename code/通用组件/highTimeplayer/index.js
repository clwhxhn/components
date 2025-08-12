import HighTimePlayer from './index.vue'
import Demo from './demo.vue'

// 为组件提供 install 方法，供按需引入
HighTimePlayer.install = function (Vue) {
  Vue.component(HighTimePlayer.name, HighTimePlayer)
}

// 支持使用标签的方式引入
if (typeof window !== 'undefined' && window.Vue) {
  HighTimePlayer.install(window.Vue)
}

export default HighTimePlayer
export { Demo }