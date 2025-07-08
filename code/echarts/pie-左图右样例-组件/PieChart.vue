<template>
  <div class="pie-chart-wrapper">
    <div
      class="bg-chart"
      :style="{
        width: chartWidthRem + 'rem',
        height: chartWidthRem + 'rem',
        'background-size': props.bgSize + '%'
      }" />
    <div
      ref="chartRef"
      class="pie-chart"
      :style="{ width: chartWidthRem + 'rem', height: chartWidthRem + 'rem' }">
      <b-echarts :option="chartOption" />
    </div>
    <div
      v-if="gateMode"
      class="data-list"
      :style="{ width: listWidthRem + 'rem' }">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="data-item"
        :class="{ active: activeItem == item.name }">
        <div class="dot" :style="{ 'background-color': colors[index] }" />
        <div>{{ item.name }}</div>
        <div>{{ item.value }}</div>
        <div>{{ item.unit }}</div>
      </div>
    </div>
    <div v-else class="data-list" :style="{ width: listWidthRem + 'rem' }">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="data-item--building-stats"
        :class="{ active: activeItem == item.name }"
        :style="{
          'border-left': `3px solid ${colors[index]}`,
          padding: '0 4px',
          'justify-content': 'space-between'
        }">
        <div class="data-item__name--building-stats">{{ item.name }}</div>
        <div class="data-item__count--building-stats">
          {{ item.count }}
          <span class="data-item__unit--building-stats">段</span>
        </div>
        <div class="data-item__length--building-stats">
          {{ item.value }}
          <span class="data-item__unit--building-stats">km</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { PropType } from 'vue'
import { cloneDeep, merge } from 'lodash-es'
import { toFixed } from '@/utils/common'
import BEcharts from './BEcharts.vue'
export interface DataItem {
  name: string
  value: number
  unit: string
}

export interface BuildingStatsItem {
  name: string
  count: number
  value: number
}

export interface ISaftyListItem {
  name: string
  value: number
}

const props = defineProps({
  chartWidth: {
    type: Number,
    default: 152
  },
  listWidth: {
    type: Number,
    default: 140
  },
  bgSize: {
    type: Number,
    default: 80
  },
  list: {
    type: Array as PropType<
      DataItem[] | BuildingStatsItem[] | ISaftyListItem[]
    >,
    default() {
      return []
    }
  },
  options: {
    type: Object,
    default: () => {
      return {}
    }
  },
  gateMode: {
    type: Boolean,
    default: true
  },
  colors: {
    type: Array,
    default() {
      return ['#2386E9', '#DDF8FF', '#50EFFD', '#F4C635']
    }
  }
})

const OPTIONS = {
  color: props.colors,
  tooltip: {
    trigger: 'item'
  },
  grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: true },
  series: [
    {
      name: '',
      type: 'pie',
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
}

let activeItem = ref<string>('')
let chartOption = ref({})

let chartWidthRem = toFixed(props.chartWidth / 16, 2)
let listWidthRem = toFixed(props.listWidth / 16, 2)

let tempOptions = cloneDeep(OPTIONS)

function updateChartOption() {
  tempOptions = merge(tempOptions, props.options)
  tempOptions = merge(tempOptions, {
    series: [
      {
        data: props.list
      }
    ]
  })
  chartOption.value = tempOptions
}

watch([() => props.list, () => props.options], () => {
  nextTick(() => {
    updateChartOption()
  })
})
updateChartOption()
</script>

<style lang="less" scoped>
.pie-chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  .bg-chart {
    background-image: url('@/assets/images/overview/bkg-ringchart.png');
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
    position: absolute;
    top: 0px;
    left: 5px;
    animation: rotation 2s linear infinite;
  }
  .data-list {
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-box-pack: center;
    // -webkit-box-align: center;
  }
  .data-item,
  .data-item--building-stats {
    background-image: url('@/assets/images/overview/img-bkg-piechart-nor.png');
    background-size: 100% 100%;
    color: #c4cad7;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    padding: 0 12px;
    width: 100%;
    height: 28px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &.active,
    &:hover {
      background-image: url('@/assets/images/overview/img-bkg-piechart-sel.png');
      & > div:nth-child(3) {
        color: #3094ff;
      }
      .data-item__name--building-stats {
        color: #31eabe;
      }
    }
    .dot {
      width: 8px;
      height: 9px;
      margin-right: 10px;
    }
    & > div {
      &:nth-child(2):not(.data-item__count--building-stats) {
        flex-grow: 1;
        font-size: 14px;
      }
      &:nth-child(3):not(.data-item__length--building-stats) {
        color: #fff;
        font-size: 16px;
        margin-right: 2px;
      }
    }
    .data-item__name--building-stats {
      font-size: 16px;
      color: #c4cad7;
      flex-basis: 40%;
    }
    .data-item__count--building-stats {
      font-size: 16px;
      color: #ddf8ff;
      margin-right: 4px;
    }
    .data-item__length--building-stats {
      font-size: 16px;
      color: #5fd4fe;
      text-align: right;
    }
    .data-item__unit--building-stats {
      font-size: 12px;
    }
  }
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
