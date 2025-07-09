<template>
  <div class="section-header">
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
.section-header {
  height: 24px;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  line-height: 22px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-style: normal;
  text-transform: none;
  background-image: url(~@/assets/images-new/common/section-header-bg.png);
  background-size: 100% 100%;
}
</style>
