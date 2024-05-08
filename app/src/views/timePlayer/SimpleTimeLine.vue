<template>
  <!-- 流域防洪四预-洪水预演-推演结果展示-播放器(a-slider) -->
  <div class="time-line-root" :class="{ short: qxRightPanelName === 'BasinInfoRtPanel' }">
    <div class="container">
      <div class="slider-content">
        <a-slider
          v-model="sliderValue"
          :marks="marks"
          :step="1"
          :max="sliderMax"
          :tip-formatter="tipFormatter"
          @change="sliderChange"
        />
      </div>
      <div class="icon-box">
        <img
          v-if="!autoPlayTimerFlag"
          src="@/assets/img/water-disasters-defense/rehearsal/player-start.png"
          class="icon"
          alt=""
          @click="autoPlay"
        />
        <img
          v-if="autoPlayTimerFlag"
          src="@/assets/img/water-disasters-defense/rehearsal/player-pause.png"
          class="icon"
          alt=""
          @click="removeAutoPlay"
        />
      </div>
      <!-- <a-select v-model="doubleSpeed" style="width: 60px" size="small" @change="doubleSpeedChange">
        <a-select-option :value="2000">0.5x</a-select-option>
        <a-select-option :value="1000">1x</a-select-option>
        <a-select-option :value="500">2x</a-select-option>
        <a-select-option :value="250">3x</a-select-option>
        <a-select-option :value="100">5x</a-select-option>
      </a-select> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { MODULE_NAME } from '../../../store';
import * as _ from 'lodash';
import dayjs from 'dayjs';
import { request } from '@/utils';
const timeFormat = 'MM-DD HH:mm';
let timer = null

export default {
  props: {
    // 是否重新加载
    reload: {
      type: Boolean,
      default: false,
    },
    // 时间刻度
    timeList: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      doubleSpeed: 1000,
      marks: {},
      // 最大时间轴
      sliderMax: 100,
      sliderList: [],
      // 当前时间
      sliderValue: 0,
      // 是否自动播放
      autoPlayTimerFlag: false,
      // 自动预演的时间轴
      autoPlayTimer: {},
    };
  },
  computed: {
    ...mapState({
      qxRightPanelName: (state) => state[MODULE_NAME].qxRightPanelName,
    }),
  },
  watch: {
    // 时间刻度变化
    timeList: {
      handler(val) {
        // this.removeAutoPlay();
        this.initSlider(val);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  beforeDestroy() {
    this.removeAutoPlay();
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  },
  methods: {
    // 滚动条值变化后
    sliderChange(value) {
      this.$emit('clickSlider', this.sliderValue)
    },
    changeSliderIndex(val) {
      this.sliderValue = val;
    },
    // 改变播放速度,并重新从当前位置播放
    doubleSpeedChange(val) {
      this.doubleSpeed = val
      this.$emit('changeSpeed', this.doubleSpeed)
    },
    // 移除定时器
    removeAutoPlay() {
      this.autoPlayTimerFlag = false;
      this.$emit('clickStop', this.sliderValue);
    },
    // 打开自动预演定时器
    autoPlay() {
      if (!this.timeList.length) {
        this.$message.warning('暂无时间轴数据');
        return;
      }
      this.autoPlayTimerFlag = true;
      this.$emit('clickPlay', this.sliderValue);
    },
    // 格式化tip文字
    tipFormatter(val) {
      return this.sliderList[val];
    },
    // 初始化时间轴的刻度
    initSlider(res) {
      console.log('res: ', res);
      // 如果时播放状态就暂停
      if (this.autoPlayTimerFlag) {
        this.removeAutoPlay();
      }
      // 时间数组为空，重置时间轴
      if (!res.length) {
        this.sliderMax = 100; // 设置滚动条的最大值
        this.sliderValue = 0; // 重置滚动条的值
        this.sliderList = [];
        this.marks = {};
        return;
      }
      const times = res.map((item, index) => {
        this.marks[index] = ''; // marks 只显示小圆点不显示文字
        return item.tm;
      });
      this.sliderMax = times.length - 1; // 设置滚动条的最大值
      this.sliderList = times; // 将时间轴的时间列表赋值给 this.sliderList
      this.marks[0] =  ''// dayjs(times[0]).format(timeFormat); // 将第一个刻度的文字描述
      this.marks[this.sliderMax] = ''; // 将最后一个刻度的文字描述
      this.sliderValue = 0; // 重置滚动条的值
    },
  },
};
</script>

<style lang="less" scoped>
.time-line-root {
  position: fixed;
  bottom: 220px;
  left: 4%;
  width: 94%; // 100 - 4 - 2
  z-index: 999;
  &.short {
    width: calc(94% - 206px);
    left: calc(4% + 182px);
  }
  .container {
    width: 100%;
    margin: 0 auto;
    height: 48px;
    // background: linear-gradient(180deg, rgba(14, 77, 140, 0.62) 0%, rgba(8, 45, 83, 0.6) 100%),
    //   linear-gradient(90deg, rgba(28, 190, 252, 0.6) 0%, rgba(14, 77, 140, 0) 100%);
    // border-radius: 8px;
    // border: 1px solid #3ebcee;
    display: flex;
    padding: 0 30px 0 15px;
    display: flex;
    padding: 6px 15px;
    position: relative;
    .icon-box {
      position: absolute;
      right: -20px;
      top: -0px;
    }
    .icon {
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
    .slider-content {
      width: 100%;
      position: relative;
      /deep/ .ant-slider {
        width: 100%;
        margin: 0;
        position: absolute;
        .ant-slider-step {
          height: 10px;
          border: 1px solid #8ac1da;
          background: rgba(162, 202, 234, 0.4);
          border-radius: 8px;
          z-index: 1;
        }
        .ant-slider-rail {
          height: 10px;
          background-color: rgba(162, 202, 234, 0.4);
          border-radius: 8px;
        }
        // 选中的轨道
        .ant-slider-track {
          height: 10px;
          background-color: rgb(110, 215, 254);
          z-index: 3;
        }
        //最后一个刻度
        .ant-slider-dot {
          z-index: 2;
          top: 0 !important;
        }
        .ant-slider-dot-active {
          background-color: rgb(110, 215, 254);
        }
        // 选中的刻度
        .ant-slider-handle {
          z-index: 3;
          width: 24px;
          height: 24px;
          border: none;
          background: url('~@/assets/img/water-disasters-defense/rehearsal/player-current.png') center center no-repeat;
          background-size: 100% 100%;
        }
        .ant-slider-mark {
          .ant-slider-mark-text {
            font-size: 12px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #ddf8ff;
            min-width: 100px;
            text-align: right;
            margin-top: 22px;
          }
          .ant-slider-mark-text:last-child {
            text-align: left;
          }
        }
      }
      .show-style {
        width: 99.3%;
        position: absolute;
        top: 13px;
      }
    }

    /deep/ .ant-select {
      color: #fff;
      margin-left: 20px;
      .ant-select-selection {
        background: #6387bd;
        border-radius: 11px;
        opacity: 0.5;
        .ant-select-arrow {
          font-size: 12px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
