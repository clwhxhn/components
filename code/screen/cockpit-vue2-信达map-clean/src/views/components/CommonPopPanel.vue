<template>
  <div class="common-pop-panel-wrapper" :class="darkMode ? 'darkMode' : ''">
    <div class="pop-panel-border"></div>
    <div class="pop-left-corner"></div>
    <div class="pop-right-corner"></div>
    <div class="pop-top-line"></div>
    <div class="pop-bottom-line"></div>
    <div class></div>
    <div class="pop-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonPopPanel',
  components: {},
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.common-pop-panel-wrapper {
  position: relative;
  background: rgba(0, 47, 102, 0.8);
  overflow: hidden;
  &.darkMode {
    background: rgba(0, 47, 102, 1);
  }
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
    width: 50px;
    z-index: 2;
    &::after {
      display: block;
      padding-top: 100%;
      border-top: 2px solid #0ce4ff;
      border-left: 2px solid #0ce4ff;
      content: '';
    }
  }
  .pop-right-corner {
    position: absolute;
    top: 4px;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 2;
    border-top: 2px solid #0ce4ff;
    border-right: 2px solid #0ce4ff;
  }
  .pop-top-line {
    position: absolute;
    top: 0;
    right: 60px;
    height: 2px;
    width: 50px;
    background: #000000;
    z-index: 2;
  }
  .pop-bottom-line {
    position: absolute;
    bottom: 0;
    right: 10px;
    height: 2px;
    width: 50px;
    background: #0ce4ff;
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
