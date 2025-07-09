<template>
  <div class="header-wrapper">
    <div class="header-text" @click="titleClick">水利工程规划建设管理</div>
    <div class="time-text">
      {{ time }}

      <span class="person-text">
        当前在线用户数<span class="primary-text"
          >{{ personInfo.currOnline }}个</span
        >
        月度活跃用户数<span class="primary-text"
          >{{ personInfo.monthActive }}个</span
        >
      </span>
    </div>
    <div class="weather-text"></div>
    <DivisionSelect></DivisionSelect>
  </div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import DivisionSelect from "./DivisionSelect.vue";
import moment from "moment";
export default {
  name: "MapHeader",
  mixins: [SchintaMapHelp()],
  components: { DivisionSelect },
  data() {
    return {
      time: "",
      timer: null,
      // todo: 对接接口
      personInfo: {
        currOnline: 1,
        monthActive: 20,
      },
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time = moment().format("YYYY-MM-DD    HH:mm:ss");
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    titleClick() {},
  },
};
</script>
<style scoped lang="less">
.header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-image: url("~@/assets/images/layout/header.png");
  background-size: 100% 100%;
  z-index: 400;
  user-select: none;
  pointer-events: none;
  .header-text {
    pointer-events: all;
    margin-top: 10px;
    width: 100%;
    height: 57px;
    font-family: YouSheBiaoTiHei;
    font-size: 44px;
    color: #ffffff;
    line-height: 57px;
    text-align: center;
    font-style: normal;
    background: linear-gradient(90deg, #ffffff 35%, #b8dbff 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }
  .time-text {
    position: absolute;
    top: 20px;
    left: 34px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    .person-text {
      font-size: 14px;
      margin-left: 30px;
    }
  }
}
</style>
