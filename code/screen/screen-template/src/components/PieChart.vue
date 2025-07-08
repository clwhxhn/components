<template>
  <div class="pie-chart-wrapper">
    <!-- <div
      class="bg-chart"
      :style="{
        width: chartWidthRem + 'rem',
        height: chartWidthRem + 'rem',
        'background-size': props.bgSize + '%'
      }" /> -->
    <div
      ref="chartRef"
      class="pie-chart"
      :style="{ width: chartWidthRem + 'rem', height: chartWidthRem + 'rem' }">
      <b-echarts :option="chartOption" />
    </div>

    <template v-if="legendStyle === 0">
      <div
        v-if="gateMode"
        class="data-list"
        :style="{ width: listWidthRem + 'rem' }">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="data-item"
          :class="{ active: activeItem == item.name }">
          <slot name="legend" :item="item" :color="colors[index]">
            <div
              class="dot"
              :style="{ 'background-color': colors[index] as string }" />
            <div class="item-name">{{ item.name }}</div>
            <div class="flex items-baseline ml-2 mr-4">
              <span class="text-sm text-[#FFF] font-bold font-d-din">
                {{ item.percentage ? item.percentage : '--' }}
              </span>
            </div>
            <div class="item-value">{{ item.value }}</div>
            <div class="item-unit">{{ 'unit' in item ? item.unit : '' }}</div>
          </slot>
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
            {{ 'count' in item ? item.count : '' }}
            <span class="data-item__unit--building-stats">段</span>
          </div>
          <div class="data-item__length--building-stats">
            {{ item.value }}
            <span class="data-item__unit--building-stats">km</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="legendStyle === 1">
      <div
        class="flex-1 grid grid-rows-2 grid-flow-col place-items-center gap-y-4">
        <div
          v-for="(item, idx) in transposedList"
          :key="item.name"
          class="flex text-[#B0D4EF]">
          <div class="bg-white/40 w-[0.06rem] h-[2.38rem] relative mr-3">
            <div
              :style="{ background: transposedColors[idx] }"
              class="w-1 h-2 absolute top-0 left-[-.08rem]" />
          </div>
          <div class="flex flex-col">
            <div class="text-sm">{{ item.name }}</div>
            <div class="flex items-baseline">
              <div class="text-white text-lg font-bold mr-2 font-d-din">
                {{ item.value }}
              </div>
              <div class="text-xs">{{ 'unit' in item ? item.unit : '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, PropType, ref, watch } from 'vue'
import { cloneDeep, merge } from 'lodash-es'
import { hexToRgb, toFixed } from '@/utils/common'
import BEcharts from './BEcharts.vue'

export interface DataItem {
  name: string
  value: number
  percentage?: string
  unit: string
}

export interface BuildingStatsItem {
  name: string
  value: number
  percentage?: string
  count: number
}

export interface ISaftyListItem {
  name: string
  value: number
  percentage?: string
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
    type: Array as PropType<(DataItem | BuildingStatsItem | ISaftyListItem)[]>,
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
  legendStyle: {
    type: Number,
    default: 0 //  0 => origin , 1 => style-1
  },
  gateMode: {
    type: Boolean,
    default: true
  },
  colors: {
    type: Array<string | number>,
    default() {
      return ['#227DE6', '#DDF8FF', '#50EFFD', '#F4C635']
    }
  }
})

function transposeArr<T>(arr: T[]): T[] {
  const hl = arr.length / 2
  return Array.from({ length: hl }).flatMap((_, i) => [arr[i], arr[i + hl]])
}

const transposedList = computed(() => transposeArr(props.list))

const transposedColors = computed(() => transposeArr(props.colors))

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
      padAngle: 3,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: []
    },
    {
      name: '',
      type: 'pie',
      padAngle: 3,
      itemStyle: {
        color: params => {
          const rgb = hexToRgb(props.colors[params.dataIndex])
          return `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`
        }
      },
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
  // tempOptions = merge(tempOptions, props.options)
  const maxRadius =
    (props.options.series && props.options.series[0].radius[1]) || 70
  tempOptions = merge(tempOptions, {
    series: [
      {
        radius: [maxRadius - 6, maxRadius],
        data: props.list
      },
      {
        radius: [maxRadius - 20, maxRadius - 6],
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

  .data-item,
  .data-item--building-stats {
    // background-image: url('@/assets/images/overview/img-bkg-piechart-nor.png');
    // background-size: 100% 100%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 28px;
    padding-right: 8px;
    width: 100%;
    height: 28px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    // &.active,
    // &:hover {
    //   // background-image: url('@/assets/images/overview/img-bkg-piechart-sel.png');
    //   & > div:nth-child(3) {
    //     color: #3094ff;
    //   }
    //   .data-item__name--building-stats {
    //     color: #31eabe;
    //   }
    // }
    .dot {
      width: 4px;
      height: 28px;
      margin-right: 8px;
    }

    .item-name {
      color: #fff;
      flex-grow: 1;
    }

    .item-value {
      color: #5fd4fe;
      font-size: 16px;
    }

    .item-unit {
      color: #5fd4fe;
      font-size: 12px;
    }

    // & > div {
    // &:nth-child(2):not(.data-item__count--building-stats) {
    //   flex-grow: 1;
    //   font-size: 14px;
    // }
    // &:nth-child(3):not(.data-item__length--building-stats) {
    //   color: #fff;
    //   font-size: 16px;
    //   margin-right: 2px;
    // }
    // }
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
  20% {
    transform: rotate(60deg);
  }
  50% {
    transform: rotate(200deg);
  }
  70% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
