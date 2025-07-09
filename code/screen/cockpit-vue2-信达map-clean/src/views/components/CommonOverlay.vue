<template>
  <div class="common-overlay-v1">
    <CommonPopPanel class="common-overlay-v1-content" :style="{ width: width }">
      <div v-if="title" :title="title" class="common-overlay-v1-title">
        {{ title }}
      </div>
      <slot></slot>
      <div class="common-overlay-actions"><slot name="action"></slot></div>
    </CommonPopPanel>
  </div>
</template>

<script>
import CommonPopPanel from "./CommonPopPanel.vue";
export default {
  name: "CommonOverlay",
  components: {
    CommonPopPanel,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: "250px",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.common-overlay-v1 {
  position: absolute;
  left: 0;
  top: -3px;
  transform: translate3d(0%, -100%, 0);
  transition: all 0.3s linear;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    background: white;
    transform: rotate(120deg);
    bottom: 16px;
    left: -4px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 25px;
    height: 2px;
    background: white;
    bottom: 29px;
    left: 9px;
    transform: rotate(-27deg);
  }

  .common-overlay-v1-content {
    left: 33px;
    bottom: 35px;
    padding: 12px;
    pointer-events: all;
    .common-overlay-v1-title {
      font-size: 18px;
      color: #ffffff;
      font-weight: 400;
      text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.43);
      width: 100%;
      height: 28px;
      line-height: 28px;
      background-image: url("~@/assets/images/common/overlay_title_bg.png");
      background-size: 262px 28px;
      background-repeat: no-repeat;
      padding-left: 30px;
      padding-right: 30px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      line-height: 23px;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(133, 182, 245, 0.28) 13%,
          rgba(134, 183, 248, 0.16) 34%,
          rgba(171, 195, 225, 0.1) 100%
        );
      }
    }
    .common-overlay-actions {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
