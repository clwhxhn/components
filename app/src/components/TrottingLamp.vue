<template>
  <div class="wrap">
    <div class="notice-card-wrapper">
      <div>
        <div class="inner-container" ref="notice">
          {{ notice }}
          {{ "" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice:
        "2023年09月29日17时02分发布暴雨蓝色预警信号：预计未来12小时内，沙河乡及周边地区降水可达50毫米以上，请注意防范。",
    };
  },
};
</script>

<style lang="less" scoped>
.notice-card-wrapper {
  width: 200px;
  height: 24px;
  margin-bottom: 9px;
  display: flex;
  border-radius: 2px;
  overflow-x: hidden;
  img {
    position: relative;
    z-index: 20;
  }
  & > div {
    flex: 1;
    background: rgba(31, 103, 250, 0.08);
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0b80ff;
    line-height: 17px;
    position: relative;
    z-index: 10;
    .inner-container {
      margin-left: 160%; // 把文字弄出可见区域
      min-width: 300%;
      animation: myMove 30s linear infinite; // 重点，定义动画
      animation-fill-mode: forwards;
      position: relative;
      top: 4px;
      padding: 0 4px;
      // white-space: nowrap;
    }
  }
}

@keyframes myMove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-160%);
  }
}
</style>