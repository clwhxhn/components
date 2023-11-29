<template>
  <div class="table-tbody">
    <ul :class="{ marquee_top: animate }">
      <li
        @mouseover="mouseOver(item, index)"
        @mouseleave="mouseLeave"
        v-for="(item, index) in list"
        :key="index"
        :class="{ double: item.double }"
      >
        <div class="table-tbody-box">
          <div v-for="(column,i) in columns" :key="i">
            {{item[column.dataIndex] | filterEmpty}}
          </div>
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
    canPlay: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      animate: false,
      setInTime: null, // 定时器
      isShow: '',
      list: []
    }
  },
  watch: {
    tableData: {
      handler() {
        console.log(this.columns);
        this.initData()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    initData() {
      if (this.setInTime) {
        clearInterval(this.setInTime)
        this.setInTime = null
      }
      this.list = JSON.parse(JSON.stringify(this.tableData)).map(
        (item, index) => {
          return {
            ...item
            // double: index % 2 === 0 ? true : false,
          }
        }
      )

      if (this.canPlay) {
        this.setInTime = setInterval(this.showMarquee, 2000)
      }
    },
    mouseOver(item, i) {
      clearInterval(this.setInTime)
      this.isShow = i
    },
    mouseLeave() {
      if (this.canPlay) {
        this.setInTime = setInterval(this.showMarquee, 2000)
      }
      this.isShow = ''
    },
    // 滚动栏滚动
    showMarquee() {
      this.animate = true
      setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        this.animate = false
      }, 500)
    },
    handleClick(item) {
      this.$emit('itemClick', item)
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
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  // background: rgba(0, 46, 93, 0.4);
  box-shadow: inset 0px -1px 0px 0px rgba(45, 105, 225, 0.4),
    inset 0px 1px 3px 0px rgba(45, 105, 225, 0.4);
  margin-bottom: 2px;
}
ul,
li {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  .table-tbody-box {
    display: flex;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
    line-height: 48px;
    div:first-child {
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        color: #5fd4fe;
      }
    }
    div {
      /deep/.ant-checkbox-wrapper {
        margin-left: 15px;
        margin-right: 12px;
      }
    }
    div {
      overflow: hidden;
      white-space: nowrap; /* 防止文本换行 */
      text-overflow: ellipsis; /* 使用省略号表示溢出 */
    }
    div:nth-child(1) {
      width: 10%;
    }
    div:nth-child(2) {
      width: 25%;
    }
    div:nth-child(3) {
      width: 16%;
    }
    div:nth-child(4) {
      width: 16%;
    }
    div:nth-child(5) {
      width: 16%;
    }
    div:nth-child(6) {
      width: 17%;
    }
  }
}
.marquee_top {
  transition: all 0.5s;
  margin-top: -40px;
}
</style>
