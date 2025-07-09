<template>
  <div class="loading-modal">
    <div>
      <img src="@/assets/images/img-tea.png" alt="" />
      <div v-if="showPercent" class="progress-box">
        <div class="percent" :style="{ width: percent + '%' }">
          <img class="img-dot" src="@/assets/images/img-dot.png" alt="" />
        </div>
      </div>
      <div class="p-text">
        <span>{{ text }}</span>
        <span v-if="showPercent">{{ percent }}%</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoadingModal',
  props: {
    text: {
      type: String,
      default: '正在计算中'
    },
    percent: {
      type: Number,
      default: 0
    },
    showPercent: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
.loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 46, 73, 0.7);
  z-index: 999;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    width: 320px;
    height: 124px;
    text-align: center;

    & > img {
      width: 74px;
      height: 74px;
    }

    .progress-box {
      width: 320px;
      height: 18px;
      background: linear-gradient(
        180deg,
        rgba(127, 191, 255, 0) 0%,
        rgba(93, 158, 223, 0.42) 100%
      );
      border-radius: 2px;
      border: 1px solid rgba(160, 190, 237, 0.4);
      margin: -2px 0 8px;
      padding: 2px;

      .percent {
        position: relative;
        width: 140px;
        height: 10px;
        background: linear-gradient(
          270deg,
          rgba(27, 170, 242, 0.77) 0%,
          rgba(27, 68, 177, 0.7) 100%
        );
        border-radius: 2px 0px 0px 2px;
        border: 1px solid #839eff;
      }

      .img-dot {
        position: absolute;
        width: 60px;
        height: 60px;
        right: -30px;
        top: -26px;
      }
    }

    .p-text {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 24px;
      & > span {
        &:nth-child(1) {
          color: #e0e5ee;
          margin-right: 4px;
        }
        &:nth-child(2) {
          color: #00ffff;
        }
      }
    }
  }
}
</style>
