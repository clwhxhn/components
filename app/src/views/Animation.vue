
<template>
  <div>
    <img src="@/assets/images/led/icon-location.png" alt="" class="quality-img" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/assets/less/torem.less";
.quality-img {
  cursor: pointer;
  .px2rem(width, 88);
  .px2rem(height, 146);
  animation: bounce-down 1.6s linear infinite;
}
@keyframes bounce-down {
  25% {
    transform: translateY(-0.2rem);
  }
  50%,
  100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(0.5rem);
  }
}
</style>