<template>
  <div>
    <!-- 上下浮动 -->
    <img
      src="@/assets/images/led/icon-location.png"
      alt=""
      class="quality-img"
    />
    <!-- 旋转 -->
    <div style="margin: 0 auto" class="bg-chart" />
    <!-- 放大缩小 -->
    <img src="@/assets/images/led/icon-location.png" alt="" class="aaa" />
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

//

.bg-chart {
  width: 120px;
  height: 120px;
  background-image: url("@/assets/images/led/icon-location.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
  animation: rotation 2s linear infinite;
}

.aaa {
  width: 120px;
  height: 120px;
  animation: myscale 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes myscale {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>