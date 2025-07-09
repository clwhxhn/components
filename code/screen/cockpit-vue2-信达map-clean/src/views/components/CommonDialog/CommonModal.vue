<template>
  <transition name="map-modal">
    <a-config-provider :locale="locale">
      <div v-if="show" class="map-modal-backdrop">
        <div
          class="map-modal-wrapper"
          :style="{ width: useInnerWidth ? 'max-content' : `${width}px` }"
          role="dialog"
        >
          <CommonPopPanel :content-style="contentStyle">
            <div class="common-title-v6" :titleText="title">
              <div class="close-icon" @click="show = false"></div>
            </div>
            <div class="map-modal-content">
              <dialog-body
                ref="children"
                :params="params"
                @close="close"
              ></dialog-body>
            </div>
          </CommonPopPanel>
        </div></div
    ></a-config-provider>
  </transition>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import CommonPopPanel from "./CommonPopPanel.vue";
export default {
  name: "CommonModal",
  components: {
    CommonPopPanel,
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    width: {
      type: Number,
      default: 800,
    },
    useInnerWidth: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      locale: zhCN,
      show: false,
      contentStyle: {
        padding: "20px 20px",
      },
    };
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>

<style scoped lang="less">
.map-modal-enter-active,
.map-modal-leave-active {
  transition: all 0.5s linear;
}
.map-modal-enter,
.map-modal-leave-to {
  // transform: translate3d(0, -100%, 0);
  opacity: 0;
}
.map-modal-backdrop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  pointer-events: all;
  background: rgba(0, 0, 0, 0.2);
  .map-modal-wrapper {
    pointer-events: all;
  }
  .close-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    background-image: url("~@/assets/images/common/map-modal-close-icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
    z-index: 10;
  }
}
</style>
