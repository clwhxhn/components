import Vue from "vue";
import EasyModal from "./EasyModal.vue";
const ModalCtor = Vue.extend(EasyModal);

const instances = [];

const addInstance = (instance) => {
  instances.push(instance);
};

const removeInstance = (instance) => {
  const i = instances.indexOf(instance);
  if (i > -1) {
    instances.splice(i, 1);
  }
};

const findMaxZIndex = () => {
  const zIndexList = instances.map((it) => it.instance.vm.zIndex);
  const max = Math.max(...zIndexList, 1000);
  return max;
};

/**
 *
 * @param {import('@/types/modal').ModalOptions} opt
 */
export function showModal(opt = {}) {
  // 确保新打开的弹窗zIndex是最大的
  const zIndex = findMaxZIndex();
  const instance = new ModalCtor({
    propsData: {
      title: opt.title || "标题",
      width: opt.width || 800,
      position: opt.position || "center",
      zIndex: zIndex + 10,
      params: opt.params || {},
    },
    components: {
      "dialog-body": opt.component,
    },
  });
  instance.vm = instance.$mount();
  instance.vm.$once("closed", () => {
    removeInstance(instance);
  });

  addInstance(instance);

  const close = () => {
    instance.vm.visible = false;
  };

  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  return {
    instance,
    close,
  };
}
