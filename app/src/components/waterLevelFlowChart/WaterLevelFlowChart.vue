<template>
  <div v-if="isExpand" class="water-flow-chart">
    <div class="flex-box">
      <div class="left-box">
        <a-row v-if="stationList.length">
          <a-col :span="6" class="flex-box">
            <div class="label">选择站点：</div>
            <a-select
              :value="stationList[0].stcd"
              placeholder="请选择站点"
              :style="{ width: '120px' }"
              @change="onStationChange"
            >
              <a-select-option
                v-for="item in stationList"
                :key="item.stcd"
                :value="item.stcd"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="18">
            <DateRangePicker
              :theme="theme"
              :rain-date-list="rainDateList"
              @dateChange="onDateChange"
            />
          </a-col>
        </a-row>
        <template v-else>
          <DateRangePicker
            :theme="theme"
            :rain-date-list="rainDateList"
            @dateChange="onDateChange"
          />
        </template>
        <div id="chart-dom1" class="chart-box" />
      </div>
      <div class="table-box">
        <DataTable
          :class="theme"
          :columns="columns"
          :data-list="dataObj.dataList"
          @export="onExport"
        />
      </div>
    </div>
    <div v-if="statKpiList" class="kpi-list" :class="theme">
      <div
        v-if="statKpiList.drpKpis"
        class="drp-kpis"
        :style="{
          'grid-template-columns':
            'repeat(' + statKpiList.drpKpis.length / 2 + ', 1fr)'
        }"
      >
        <div
          v-for="(kpi, idx) in statKpiList.drpKpis"
          :key="'drp_' + idx"
          class="kpi-item"
        >
          <span>{{ kpi.title }}</span>
          <span>{{ kpi.value }}</span>
          <span>mm</span>
        </div>
      </div>
      <div
        v-if="statKpiList.wlKpis"
        class="wl-kpis"
        :style="{
          'grid-template-columns':
            'repeat(' + statKpiList.wlKpis.length / 2 + ', 1fr)'
        }"
      >
        <div
          v-for="(kpi, idx) in statKpiList.wlKpis"
          :key="'wl_' + idx"
          class="kpi-item"
        >
          <span>{{ kpi.title }}</span>
          <span v-if="kpi.title == '出现时间'">{{
            formatTime(kpi.value)
          }}</span>
          <span v-else>{{ kpi.value }}</span>
          <span v-if="kpi.title != '出现时间'">m</span>
        </div>
      </div>
      <template v-for="(flowKpis, i) in flowStatList">
        <div
          :key="'flowdiv_' + i"
          class="flow-kpis"
          :style="{
            'grid-template-columns': 'repeat(' + flowKpis.length / 2 + ', 1fr)'
          }"
        >
          <div
            v-for="(kpi, idx) in flowKpis"
            :key="'flow_' + idx"
            class="kpi-item"
          >
            <span>{{ kpi.title }}</span>
            <span v-if="kpi.title == '出现时间'">{{
              formatTime(kpi.value)
            }}</span>
            <span v-else>{{ kpi.value }}</span>
            <span v-if="kpi.title != '出现时间'">m³/s</span>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div v-else class="water-flow-chart" :class="theme">
    <template v-if="showDatePicker">
      <DateRangePicker
        :theme="theme"
        :rain-date-list="rainDateList"
        @dateChange="onDateChange"
      />
    </template>
    <div id="chart-dom2" class="chart-box" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { merge, cloneDeep } from 'lodash'
import * as optionDark from './chartOptionsDark.js'
import * as optionLight from './chartOptionsLight.js'
import {
  formatDrp,
  formatFlow,
  formatTime,
  formatWL,
  getSeriesDatas,
  chunkArr,
  getMax,
  getMin,
  getAverage
} from './chartUtils.js'
import DateRangePicker from './DateRangePicker.vue'
import DataTable from './DataTable.vue'

export default {
  name: 'WaterLevelFlowChart',
  components: {
    DateRangePicker,
    DataTable
  },
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    isExpand: {
      type: Boolean,
      default: false
    },
    showDatePicker: {
      type: Boolean,
      default: true
    },
    dataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    stationList: {
      type: Array,
      default: () => {
        return []
      }
    },
    statKpis: {
      type: Object,
      default: () => {
        return {}
      }
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    characterWlList: {
      type: Array,
      default: () => []
    },
    // 有雨日期数组
    rainDateList: {
      type: Array,
      default: () => []
    },
    dateChangeCb: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    exportCb: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  data() {
    return {
      chartIns: null,
      chartOption: {},
      formatTime
    }
  },
  computed: {
    columns() {
      let _columns = [
        {
          title: '时间',
          dataIndex: this.dataObj.tmKey,
          key: this.dataObj.tmKey,
          width: 180,
          align: 'center'
        }
      ]
      if (this.dataObj.drpKey) {
        _columns.push({
          title: '雨量(mm)',
          dataIndex: this.dataObj.drpKey,
          key: this.dataObj.drpKey,
          align: 'right',
          customRender: text => {
            return formatDrp(text)
          }
        })
      }
      if (this.list.length > 0) {
        this.list.forEach(item => {
          _columns.push({
            title: `${item.name}(${item.type === 'wl' ? 'm' : 'm³/s'})`,
            dataIndex: item.key,
            key: item.key,
            align: 'right',
            customRender: text => {
              if (item.type === 'wl') {
                return formatWL(text)
              }
              if (item.type === 'flow') {
                return formatFlow(text)
              }
              return text
            }
          })
        })
      } else {
        _columns.push({
          title: '流量(m³/s)',
          dataIndex: this.dataObj.flowKey,
          key: this.dataObj.flowKey,
          align: 'right',
          customRender: text => {
            return formatFlow(text)
          }
        })
        _columns.push({
          title: '水位(m)',
          dataIndex: this.dataObj.wlKey,
          key: this.dataObj.wlKey,
          align: 'right',
          customRender: text => {
            return formatWL(text)
          }
        })
      }
      return _columns
    },
    statKpiList() {
      if (Object.keys(this.statKpis).length) return this.statKpis
      let list
      if (this.list.length > 0) {
        list = this.list
      } else {
        list = [
          {
            type: 'wl',
            name: '水位',
            key: this.dataObj.wlKey
          },
          {
            type: 'flow',
            name: '流量',
            key: this.dataObj.flowKey
          }
        ]
      }
      return list.reduce((def, item) => {
        const _list = this.dataObj.dataList
          .map(t => t[item.key])
          .filter(t => t !== null && t !== undefined)
        const maxIdx = _list.indexOf(Math.max(..._list))
        if (item.type === 'wl') {
          def.wlKpis = def.wlKpis || []
          def.wlKpis = def.wlKpis.concat([
            {
              title: `最高${item.name}`,
              value: formatWL(getMax(_list))
            },
            {
              title: '出现时间',
              value: maxIdx > -1 ? this.dataObj.dataList[maxIdx][this.dataObj.tmKey] : '-'
            },
            {
              title: `最低${item.name}`,
              value: formatWL(getMin(_list))
            },
            {
              title: `平均${item.name}`,
              value: formatWL(getAverage(_list))
            }
          ])
        }
        if (item.type === 'flow') {
          def.flowKpis = def.flowKpis || []
          def.flowKpis = def.flowKpis.concat([
            {
              title: `最大${item.name}`,
              value: formatFlow(getMax(_list))
            },
            {
              title: '出现时间',
              value: maxIdx > -1 ? this.dataObj.dataList[maxIdx][this.dataObj.tmKey] : '-'
            },
            {
              title: `最小${item.name}`,
              value: formatFlow(getMin(_list))
            },
            {
              title: `平均${item.name}`,
              value: formatFlow(getAverage(_list))
            }
          ])
        }
        return def
      }, {})
    },
    flowStatList() {
      if (this.statKpis.flowKpis && this.statKpis.flowKpis.length) {
        return chunkArr(this.statKpis.flowKpis, 4)
      }
      if (this.statKpiList.flowKpis) {
        return chunkArr(this.statKpiList.flowKpis, 4)
      }
      return []
    }
  },
  watch: {
    isExpand() {
      this.renderChart()
    },
    dataObj() {
      this.renderChart()
    }
  },
  mounted() {
    this.renderChart()
  },
  beforeDestroy() {
    if (this.chartIns) {
      this.chartIns.dispose()
      this.chartIns = null
    }
  },
  methods: {
    renderChart() {
      if (this.chartIns) {
        this.chartIns.dispose()
      }
      setTimeout(() => {
        this.chartIns = echarts.init(
          this.isExpand
            ? document.getElementById('chart-dom1')
            : document.getElementById('chart-dom2')
        )
        if (!this.chartIns) return

        const seriesData = getSeriesDatas(
          this.dataObj,
          this.list,
          this.characterWlList,
          this.theme
        )
        // console.log(seriesData)
        const option = merge(
          cloneDeep(
            this.theme === 'dark' ? optionDark.OPTIONS : optionLight.OPTIONS
          ),
          seriesData
        )
        // console.log(option)
        this.chartOption = merge(option, this.option)
        this.chartIns.setOption(this.chartOption, true)
      }, 300)
    },
    onDateChange(dateRange) {
      this.dateChangeCb(dateRange)
    },
    onExport() {
      this.exportCb()
    },
    onStationChange(val) {
      console.log(val)
      // const station = this.stationList.find(item => item.stcd === val)
      // this.$emit('stationChange', station)
    }
  }
}
</script>
<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 60vh;
}

.flex-box {
  display: flex;
  align-items: center;
  .left-box {
    width: 52vw;
    min-width: 860px;
  }

  .table-box {
    margin-top: 56px;
    flex-grow: 1;
    margin-left: 40px;
  }
}

.label {
  font-size: 15px;
  line-height: 20px;
}

.kpi-list {
  height: 100px;
  display: flex;
  overflow-x: auto;
  margin-top: 20px;
  & > div {
    display: grid;
    gap: 10px;
    height: 90px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  .kpi-item {
    width: 193px;
    height: 40px;
    border-radius: 8px;
    padding: 4px 12px;
    display: flex;
    align-items: baseline;
    font-size: 14px;
    line-height: 22px;
    & > span {
      &:nth-child(1) {
        flex-grow: 1;
        font-weight: bold;
      }
      &:nth-child(2) {
        font-family: D-DIN;
        font-size: 22px;
        font-weight: 700;
      }
    }
  }

  &.light {
    .kpi-item {
      border: 3px solid #ffffff;
    }
    .drp-kpis {
      .kpi-item {
        background: linear-gradient(180deg, #efecff 3%, #fafafa 100%);
        color: #5e5dd1;
        box-shadow: 4px 4px 10px 0px #c9bfee;
      }
    }
    .wl-kpis {
      .kpi-item {
        background: linear-gradient(180deg, #dbebff 3%, #fafafa 100%);
        color: #0071ff;
        box-shadow: 4px 4px 10px 0px #bfcfee;
      }
    }
    .flow-kpis {
      .kpi-item {
        background: linear-gradient(180deg, #eefff0 3%, #fafafa 100%);
        color: #1fa13e;
        box-shadow: 4px 4px 10px 0px #bfcfee;
      }
    }
  }

  &.dark {
    .drp-kpis {
      .kpi-item {
        background: linear-gradient(
          90deg,
          rgba(60, 0, 128, 0) 4%,
          rgba(86, 0, 184, 0.3) 53%,
          rgba(64, 0, 128, 0) 100%
        );
        color: #ede6ff;
        border: 1px solid;
        border-image: linear-gradient(
            180deg,
            rgba(168, 69, 255, 0.4) 0%,
            #9971ff 100%
          )
          1;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5),
          inset 0px -2px 6px 0px #9971ff;
      }
    }
    .wl-kpis {
      .kpi-item {
        background: linear-gradient(
          90deg,
          rgba(0, 51, 128, 0) -1%,
          rgba(0, 80, 184, 0.7) 49%,
          rgba(0, 51, 128, 0) 100%
        );
        color: #d6edff;
        border: 1px solid;
        border-image: linear-gradient(
            180deg,
            rgba(69, 162, 255, 0.3966) 0%,
            #71b8ff 100%
          )
          1;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5),
          inset 0px -2px 6px 0px rgba(107, 137, 255, 0.6);
      }
    }
    .flow-kpis {
      .kpi-item {
        background: linear-gradient(
          90deg,
          rgba(0, 128, 51, 0) 4%,
          rgba(0, 184, 95, 0.1) 53%,
          rgba(0, 128, 57, 0) 100%
        );
        color: #c5ffe0;
        border: 1px solid;
        border-image: linear-gradient(
            180deg,
            rgba(38, 156, 99, 0.3966) 0%,
            #38a574 98%
          )
          1;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5),
          inset 0px -2px 6px 0px rgba(107, 255, 166, 0.6);
      }
    }
  }
}
</style>
<style>
.echarts-tooltip {
  border: none !important;
  padding: 0 !important;
}
.tooltip-box {
  padding: 10px;
  &.dark {
    background-color: rgba(0, 56, 112, 0.8);
    color: #fff;
    border: 1px solid rgba(17, 152, 255, 0.4);
  }
  & > div {
    display: flex;
    align-items: center;
    & > span {
      &:nth-child(3) {
        flex-grow: 1;
        text-align: right;
      }
    }
  }
}
.marker-rect {
  width: 14px;
  height: 14px;
  margin-right: 8px;
}
.marker-line-solid {
  width: 14px;
  height: 2px;
  border-style: solid;
  border-width: 0 0 2px 0;
  margin-right: 8px;
}
.marker-line-dashed {
  width: 14px;
  height: 2px;
  border-style: dashed;
  border-width: 0 0 2px 0;
  margin-right: 8px;
}
</style>
