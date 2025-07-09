import Vue from "vue";
import CommonModal from "./CommonModal.vue";
const DialogConstructor = Vue.extend(CommonModal);
// eslint-disable-next-line
export default (dialog$) => {
  function dialog(opt) {
    const options = opt || {};
    const DialogInstance = new DialogConstructor({
      propsData: {
        title: options.title || "标题",
        width: options.width || 800,
        useInnerWidth: options.useInnerWidth || false,
        params: options.params || {},
      },
      components: {
        "dialog-body": options.component,
      },
    });

    DialogInstance.vm = DialogInstance.$mount();
    DialogInstance.vm.show = true;

    DialogInstance.dom = DialogInstance.vm.$el;
    document.body.appendChild(DialogInstance.dom);
    return DialogInstance;
  }

  Vue.prototype.$dialog = dialog;
};
