import { computed, defineComponent, h, vShow, withDirectives } from "vue";

const LazyShow = defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    let isFirstLoad = true;
    return () => {
      if (isFirstLoad && !props.show) return null;
      isFirstLoad = false;
      const vnode = slots.default?.();
      if (!vnode) return null;
      if (Array.isArray(vnode) && vnode.length > 1) {
        console.warn("LazyShow组件仅支持包裹一个根组件");
      }
      return withDirectives(vnode[0], [[vShow, props.show]]);
    };
  },
});

export default LazyShow;
