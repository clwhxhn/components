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
    ></TimeLine>
  </div>
</template>

<script>
import TimeLine from "@/components/time-line/SimpleTimeLine";
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
    // 时间轴钩子函数==>需要获取数据时触发
    timelineSplitMixinNeedGetData(i) {
      // 需要通过每个时间点去调接口获取对应的数据时，将数据存进去
      // 获取数据后需要设置进组件
      this.timelineSplitMixinSetData(i, "111");
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
      // 初始化时间序列
      this.timelineSplitMixinInit(this.timesList.length);
      // 开始缓存数据
      this.timelineSplitMixinStartCache(0);
      // 渲染第一个点
      this.timelineSplitMixinChange(0);
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