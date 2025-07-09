<template>
  <div class="common-pop-panel-wrapper">
    <!-- <div class="pop-panel-border"></div> -->
    <div class="pop-left-corner"></div>
    <div class="pop-right-corner"></div>
    <!-- <div class="pop-top-line"></div> -->
    <div class="pop-bottom-line"></div>
    <div class="pop-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonPopPanel",
  components: {},
  props: {
    contentStyle: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.common-pop-panel-wrapper {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(0, 91, 153, 0.84) 0%,
    rgba(3, 59, 98, 0.9) 29%,
    rgba(8, 25, 37, 0.9) 100%
  );
  box-shadow: inset 0px 0px 8px 0px #05d6f3,
    0px 0px 4px 0px rgba(55, 207, 255, 0.5);
  overflow: hidden;
  .pop-panel-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(107, 209, 255, 0.53);
  }
  .pop-left-corner {
    position: absolute;
    top: 0;
    left: 0;
    width: 66px;
    z-index: 2;
    &::after {
      display: block;
      padding-top: 100%;
      border-top: 2px solid #13e2ff;
      border-left: 2px solid #13e2ff;
      content: "";
    }
  }
  .pop-right-corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 64px;
    z-index: 2;
    &::after {
      display: block;
      padding-top: 100%;
      border-top: 2px solid #13e2ff;
      border-right: 2px solid #13e2ff;
      content: "";
    }
  }
  .pop-top-line {
    position: absolute;
    top: 0;
    right: 60px;
    height: 2px;
    width: calc(100% - 300px);
    background: #005b99;
    z-index: 2;
  }
  .pop-bottom-line {
    position: absolute;
    bottom: 0;
    right: 50px;
    height: 2px;
    width: 100px;
    background: #13e2ff;
    z-index: 2;
  }
  .pop-content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
}
</style>
