<template>
  <div class="panel-card" :style="{ marginTop: offsetY + 'px' }">
    <div class="panel-card-header">{{ title }}</div>
    <div class="panel-card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    offsetY: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.panel-card {
  display: flex;
  .panel-card-header {
    width: 42px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    font-style: normal;
    text-transform: none;
    background-image: url(~@/assets/images-new/common/card-header-bg.png);
    background-size: 100% 100%;
    writing-mode: vertical-rl;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 4px;
  }
  .panel-card-content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
