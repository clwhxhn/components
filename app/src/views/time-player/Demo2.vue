<!-- 需要通过每个时间点调接口缓存数据 -->
<template>
  <div class="demo1">
    <!-- 时间选择器 -->
    <TimeLine
      ref="timeLineRef"
      :time-list="timesList"
      v-bind="$attrs"
      @clickSlider="clickSlider"
      @clickStop="clickStop"
      @clickPlay="clickPlay"
      @changeSpeed="changeSpeed"
      @timeChange="handleTimeChange"
    ></TimeLine>
  </div>
</template>

<script>
import TimeLine from "@/components/time-line/TimeLine";
import timelineSplitMixin from "@/components/time-line/timelineSplitMixin";
import { times } from "./mockData";
export default {
  components: {
    TimeLine,
  },
  mixins: [timelineSplitMixin],
  data() {
    return {
      timesList: [], // 时间序列
      sliderIndex: 0, // 时间轴进度
      timeIdx: 0,
    };
  },
  created() {
    setTimeout(() => {
      this.getTimeList();
    }, 1000);
  },
  methods: {
    clickPlay(sliderIndex) {
      this.sliderIndex = sliderIndex;
      this.timelineSplitMixinStartRun(this.sliderIndex);
      this.timelineSplitMixinStartCache(this.sliderIndex);
    },
    clickStop(sliderIndex) {
      this.timelineSplitMixinStopRun();
      // this.timelineSplitMixinStopCache();
    },
    clickSlider(sliderIndex) {
      this.sliderIndex = sliderIndex;
      // 时间轴方法==>改变时间点
      this.timelineSplitMixinChange(this.sliderIndex);
    },
    changeSpeed(speed) {
      this.timelineSplitMixinTimeStep = speed;
    },
    // 时间轴钩子函数==>停止后触发执行
    timelineSplitMixinAfterComplete() {
      // alert("完成执行了")
      this.$refs.timeLineRef.removeAutoPlay();
    },
    // 钩子函数，展示数据时触发
    timelineSplitMixinShow(i, data) {
      this.$refs.timeLineRef.changeSliderIndex(i);
      this.timeIdx = i;
    },
    getTimeList() {
      // 设置时间轴
      this.timesList = times;
      // 手动渲染第一个时间点数据
      this.handleTimeChange(this.timesList[0].tm, 0)
    },
    handleTimeChange(rec, index) {
      console.log("rec: ", rec, "index", index);
    },
  },
};
</script>

<style lang="less" scoped>
.demo1 {
  position: relative;
  height: 10vh;
}
</style>