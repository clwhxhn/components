import Vue from "vue";
import App from "./App.vue";
import { setToken } from "./utils";
import Dialog from "@/views/components/CommonDialog/dialog";
import "./less/index.less";
import Antd from "ant-design-vue";
import "@/utils/filter";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import ItemValue from "./components/ItemValue.vue";
import '@/utils/number-helper'

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Dialog);
Vue.component('ItemValue', ItemValue)

setToken();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
