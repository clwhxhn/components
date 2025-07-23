<template>
  <div class="date-range-box" :class="theme">
    <div class="icon-time" />
    <div class="label-date">选择时间：</div>
    <a-range-picker
      class="common-date-picker"
      :class="theme"
      :value="dateRange"
      :format="dateFormat"
      :date-render="dateRender"
      @change="onRangeChange"
    />
    <div
      v-for="tab in shortcutTabs"
      :key="tab.type"
      class="sc-tab"
      :class="{ active: tab.type === tabActive }"
      @click="onTabClick(tab)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'DateRangePicker',
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    // 有雨日期数组
    rainDateList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      shortcutTabs: [
        {
          name: '近一周',
          type: 'week'
        },
        {
          name: '近一月',
          type: 'month'
        },
        {
          name: '近一年',
          type: 'year'
        }
      ],
      tabActive: '',
      dateFormat: 'YYYY-MM-DD',
      dateRange: []
    }
  },
  mounted() {
    this.onTabClick(this.shortcutTabs[0])
  },
  methods: {
    dateRender(current) {
      const dateStr = current.format('YYYY-MM-DD')
      const isRain = this.rainDateList.includes(dateStr)
      return (
        <div class="ant-calendar-date">
          {current.date()}
          {isRain && <span class={`rain-badge ${this.theme}`}></span>}
        </div>
      )
    },
    onRangeChange(date, dateString) {
      this.tabActive = '' // 取消快捷选项选中状态
      this.dateRange = date
      this.$emit('dateChange', dateString)
    },
    onTabClick(tab) {
      this.tabActive = tab.type
      if (tab.type === 'week') {
        this.dateRange = [moment().subtract(7, 'day'), moment()]
      } else if (tab.type === 'month') {
        this.dateRange = [moment().subtract(1, 'month'), moment()]
      } else if (tab.type === 'year') {
        this.dateRange = [moment().subtract(1, 'year'), moment()]
      }
      this.$emit(
        'dateChange',
        this.dateRange.map(item => item.format(this.dateFormat))
      )
    }
  }
}
</script>
<style lang="less" scoped>
.date-range-box {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  &.dark {
    color: #ffffff;

    .sc-tab {
      background-image: url('~@/assets/images/water-level-flow-chart/bg-tab.png');
      background-size: 100% 100%;
      color: #c0d7ff;
      margin-right: 2px;
      &.active {
        background-image: url('~@/assets/images/water-level-flow-chart/bg-tab-active.png');
        color: #edf3ff;
      }
    }
  }

  &.light {
    color: #333333;
    .sc-tab {
      background: linear-gradient(
        289deg,
        rgba(195, 215, 255, 0.7) 2%,
        rgba(223, 229, 255, 0.5043) 98%
      );
      border-radius: 4px;
      color: #50586e;
      margin-right: 8px;
      &.active {
        background: #3377ff;
        color: #ffffff;
      }
    }
  }

  .icon-time {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background: url('~@/assets/images/water-level-flow-chart/image-time.png');
    background-size: 100% 100%;
  }

  .label-date {
    font-size: 15px;
    line-height: 20px;
    text-wrap: nowrap;
  }

  .sc-tab {
    width: 80px;
    height: 32px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    padding: 6px 0;
    cursor: pointer;
  }
}

.common-date-picker {
  width: 16vw;
  height: 32px;
  border: none;
  margin-right: 8px;
  min-width: 196px;

  &.dark {
    /deep/ .ant-input {
      border-radius: 4px;
      border: 1px solid;
      border-image: linear-gradient(180deg, #004f95 0%, #0086fb 100%) 1;
      background: linear-gradient(
        90deg,
        rgba(57, 125, 240, 0) 0%,
        rgba(17, 28, 77, 0.4) 50%,
        rgba(57, 125, 240, 0) 100%
      );
      color: #edf3ff;
    }

    /deep/ .ant-calendar-range-picker-separator {
      color: #edf3ff;
    }

    /deep/ .ant-calendar-picker-clear {
      background: transparent;
      color: #edf3ff;
    }
  }
}
.ant-calendar-date {
  position: relative;
}

.rain-badge {
  position: absolute;
  top: -12px;
  right: 0;
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
  &.light {
    background-image: url('~@/assets/images/water-level-flow-chart/badge-rain-light.png');
  }
  &.dark {
    background-image: url('~@/assets/images/water-level-flow-chart/badge-rain-dark.png');
  }
}
</style>
