<template>
  <div class="table-tbody">
    <ul :class="{ marquee_top: animate && tableData.length > noPlayNum }">
      <li
        @mouseover="mouseOver(item, index)"
        @mouseleave="mouseLeave"
        v-for="(item, index) in tableData"
        :key="index">
        <div>
          {{ item }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TabelPlay',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    noPlayNum: {
        type: Number,
        default: 0
    }
  },
  data() {
    return {
      animate: false,
      setInTime: null, // 定时器
      isShow: ''
    }
  },
  mounted() {
    this.setInTime = setInterval(this.showMarquee, 2000)
  },
  methods: {
    mouseOver(item, i) {
      clearInterval(this.setInTime)
      this.isShow = i
    },
    mouseLeave() {
      this.setInTime = setInterval(this.showMarquee, 2000)
      this.isShow = ''
    },
    // 滚动栏滚动
    showMarquee() {
      this.animate = true
      setTimeout(() => {
        if (this.tableData.length > this.noPlayNum) {
          this.tableData.push(this.tableData[0])
          this.tableData.shift()
          this.animate = false
        }
      }, 500)
    }
  },
  destroyed() {
    clearInterval(this.setInTime) // 页面销毁时清除定时器
    this.setInTime = null
  }
}
</script>
<style scoped lang="less">
.table-tbody li {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ccddff;
  line-height: 40px;
  background: rgba(0, 13, 38, 0.2);
  &:not(:first-child) {
    margin-top: 8px;
  }
}
ul,
li {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.marquee_top {
  transition: all 0.5s;
  margin-top: -48px;
}
</style>