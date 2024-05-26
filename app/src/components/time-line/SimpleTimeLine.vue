<template>
  <div class="time-line-root">
    <div class="container">
      <div class="icon-box">
        <img
          v-if="!autoPlayTimerFlag"
          src="@assets/time-line/player-play.png"
          class="icon"
          alt=""
          @click="autoPlay"
        />
        <img
          v-if="autoPlayTimerFlag"
          src="@assets/time-line/player-pause.png"
          class="icon"
          alt=""
          @click="removeAutoPlay"
        />
      </div>
      <a-slider
        v-model="sliderValue"
        :marks="marks"
        :step="1"
        :max="sliderMax"
        :tip-formatter="tipFormatter"
        @change="sliderChange"
      />
      <a-select
        v-model="doubleSpeed"
        style="width: 60px"
        size="small"
        @change="doubleSpeedChange"
      >
        <a-select-option :value="2000">0.5x</a-select-option>
        <a-select-option :value="1000">1x</a-select-option>
        <a-select-option :value="500">2x</a-select-option>
        <a-select-option :value="250">3x</a-select-option>
        <a-select-option :value="100">5x</a-select-option>
      </a-select>
    </div>
  </div>
</template>
  <script>
import dayjs from "dayjs";
export default {
  props: {
    // 时间刻度
    timeList: {
      type: Array,
      default: () => [],
    },
    // 是否重新加载
    reload: {
      type: Boolean,
      default: false,
    },
  },
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
  watch: {
    // 时间刻度变化
    timeList: {
      handler(val) {
        // this.removeAutoPlay()
        this.initSlider(val);
      },
      deep: true,
    },
  },
  mounted() {
    // this.removeAutoPlay()
  },
  beforeDestroy() {
    this.removeAutoPlay();
  },
  methods: {
    // 滚动条值变化后
    sliderChange() {
      let date = new Date();
      console.log(`通知更改到${this.sliderValue}`);
      this.$emit("clickSlider", this.sliderValue, date);
    },
    changeSliderIndex(val) {
      this.sliderValue = val;
    },
    // 改变播放速度,并重新从当前位置播放
    doubleSpeedChange(val) {
      // this.doubleSpeed = val
      // if (this.autoPlayTimer) clearInterval(this.autoPlayTimer)
      // if (this.autoPlayTimerFlag) {
      //   this.autoPlay()
      // }

      this.doubleSpeed = val;
      this.$emit("changeSpeed", this.doubleSpeed);
    },
    // 移除定时器
    removeAutoPlay() {
      this.autoPlayTimerFlag = false;
      // clearInterval(this.autoPlayTimer)
      this.$emit("clickStop", this.sliderValue);
    },
    // 打开自动预演定时器
    autoPlay() {
      if (!this.timeList.length) {
        this.$message.warning("暂无时间轴数据");
        return;
      }
      this.autoPlayTimerFlag = true;
      if (this.sliderValue === this.timeList.length) {
        this.sliderValue = 0;
      }
      this.$emit("clickPlay", this.sliderValue);
      // this.autoPlayTimer = setInterval(() => {
      //   this.sliderValue += 1
      //   // eslint-disable-next-line eqeqeq
      //   if (this.sliderValue == this.sliderList.length) {
      //     this.sliderValue = 0
      //   }
      //   this.sliderChange()
      // }, this.doubleSpeed)
    },
    // 格式化tip文字
    tipFormatter(val) {
      return this.sliderList[val];
    },
    // 初始化时间轴的刻度
    initSlider(res) {
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
      this.marks = {};
      const times = res.map((item) =>
        dayjs(item.tm).format("YYYY-MM-DD HH:mm:ss")
      ); // 将时间戳转换为 YYYY-MM-DD HH:mm:ss 的格式
      this.sliderMax = times.length - 1; // 设置滚动条的最大值
      this.sliderList = times; // 将时间轴的时间列表赋值给 this.sliderList

      const marks = {};

      this.sliderList.forEach((item, i) => {
        marks[i] = "";
      });

      // 将 this.sliderMax 除以 7 取整数部分的操作,这里必须是是6+1
      let step = Math.floor(this.sliderMax / 8);
      // i < 6 代表刻度的个数, 开始-结束中间6个点
      for (let i = 0; i < 7; i++) {
        marks[(i + 1) * step] = times[(i + 1) * step];
      } // 将刻度的文字描述设置为对应的时间
      marks[0] = "开始"; // 将第一个刻度的文字描述设置为开始
      const modifiedObject = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key in marks) {
        // eslint-disable-next-line eqeqeq
        if (key != 0) {
          modifiedObject[key] = marks[key]
            ? dayjs(marks[key]).format("MM-DD HH")
            : "";
        } else {
          modifiedObject[key] = marks[key];
        }
      }

      this.marks = modifiedObject;
      this.marks[0] = "开始";
      this.marks[this.sliderMax] = "结束"; // 将最后一个刻度的文字描述设置为结束
      this.sliderValue = 0; // 重置滚动条的值
    },
  },
};
</script>
  
  <style lang="less" scoped>
.time-line-root {
  position: absolute;
  bottom: 10px;
  left: -20px;
  width: calc(100% - 500px);
  .container {
    width: 75%;
    margin: 0 auto;
    height: 60px;
    background: rgba(42, 102, 194, 0.33);
    border-radius: 4px;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    padding: 0 15px;
    .icon {
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
    /deep/ .ant-slider {
      position: relative;
      flex: 1;
      margin-left: 26px;
      .ant-slider-step {
        background-color: rgba(0, 0, 0, 0.8);
      }
      .ant-slider-track {
        background-color: rgb(110, 215, 254);
        z-index: 1;
      }
      .ant-slider-dot,
      .ant-slider-handle {
        z-index: 2;
      }
      .ant-slider-mark {
        .ant-slider-mark-text {
          color: rgb(110, 215, 254);
        }
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
  