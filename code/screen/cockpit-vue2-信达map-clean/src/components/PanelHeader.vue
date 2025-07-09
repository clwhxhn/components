<template>
  <div class="panel-header">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.panel-header {
  height: 40px;
  text-indent: 26px;
  display: flex;
  align-items: center;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 3px;
  text-shadow: 0px 0px 11px rgba(0, 149, 255, 0.5),
    0px 4px 4px rgba(0, 0, 0, 0.55);
  text-align: left;
  font-style: normal;
  text-transform: none;
  background-image: url(~@/assets/images-new/common/panel-header-bg.png);
  background-size: 100% 100%;
  color: #fff;
}
</style>
