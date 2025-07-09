<template>
  <div class="common-rate-ring">
    <XCharts :options="options" :mergeOptions="mergeOptions"></XCharts>
    <div class="common-rate-ring-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { graphic } from "echarts";
import XCharts from "@/views/components/common-charts/XCharts.vue";
export default {
  name: "CommonRateRing",
  components: {
    XCharts,
  },
  props: {
    rate: {
      type: [Number, String],
      default: 50,
    },
    width: {
      type: [Number, String],
      default: 5,
    },
    color: {
      type: Object,
      default: () => {
        return new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#00FFFF",
          },
          {
            offset: 1,
            color: "#168BFF",
          },
        ]);
      },
    },
  },
  data() {
    return {
      options: {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            radius: "100%",
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 7,
                color: [[1, "#05488d"]],
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 50,
              },
            ],
            title: {
              show: false,
            },
          },
        ],
      },
      mergeOptions: {},
    };
  },
  watch: {
    width: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.mergeOptions = {
            series: [
              {
                axisLine: {
                  lineStyle: {
                    width: val,
                  },
                },
                progress: {
                  itemStyle: {
                    color: this.color,
                  },
                },
                data: [
                  {
                    value: this.rate,
                  },
                ],
              },
            ],
          };
        });
      },
    },
    rate: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          this.mergeOptions = {
            series: [
              {
                axisLine: {
                  lineStyle: {
                    width: this.width,
                  },
                },
                progress: {
                  itemStyle: {
                    color: this.color,
                  },
                },
                data: [
                  {
                    value: val,
                  },
                ],
              },
            ],
          };
        });
      },
    },
  },
  methods: {},
};
</script>

<style scoped lang="less">
.common-rate-ring {
  width: 100%;
  height: 100%;
  position: relative;
  .common-rate-ring-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
