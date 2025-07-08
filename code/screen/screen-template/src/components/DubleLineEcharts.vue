<script>
import * as echarts from 'echarts'
import { toFixed } from '@/utils/common'
import dayjs from 'dayjs'

let myChart = null
export default {
  name: 'DubleLineEcharts',
  props: '',
  data() {
    return {
      echartsOption: {}
    }
  },
  methods: {
    initChart(dom, data) {
      var chartDom = document.getElementById(dom)
      myChart = echarts.init(chartDom)
      let series = []
      data.yData.forEach((element, index) => {
        Object.keys(element).forEach(key => {
          series.push({
            name: key,
            data: element[key],
            type: 'line',
            smooth: data.smooth, // true曲线; false折线
            showSymbol: false,
            step: data.step,
            lineStyle: {
              width: 0.5 // 设置折线的宽度
            },
            itemStyle: {
              normal: {
                color: data.lineColor[index][0], // 改变折线点的颜色
                lineStyle: {
                  color: data.lineColor[index][0], // 改变折线颜色
                  type: 'solid',
                  width: 1
                }
              }
            },
            areaStyle: {
              // 折线图颜色半透明
              color: {
                type: 'linear',
                colorStops: [
                  {
                    offset: 0,
                    color: data.lineColor[index][1] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: data.lineColor[index][2] // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          })
        })
      })
      this.echartsOption = {
        // backgroundColor: "rgba(25,47,82,0.26)",
        grid: {
          top: 35,
          left: 30,
          right: '5%',
          bottom: 20
          // containLabel: true,
        },
        tooltip: {
          className: 'custom-tooltip-bk-box',
          trigger: 'axis',
          axisPointer: {
            show: false // 隐藏坐标轴指示线
          },
          // 格式化提示框
          formatter: function (a) {
            let html = ''
            for (let i = 0; i < a.length; i++) {
              const element = a[i]
              html =
                html +
                '<div class="tooltip_content">' +
                '<div class="tooltip_text_label" style="background-color:' +
                element.color +
                '"></div>' +
                '<span class="tooltip_text_name">' +
                element.seriesName +
                '：</span>' +
                '<span class="tooltip_text_val">' +
                element.data +
                data.unit +
                '</span>' +
                ' </div>'
            }
            return (
              '<div class="tooltip_box_custom">' +
              '<span class="tooltipTitle">' +
              a[0].axisValue +
              '</span>' +
              html +
              '</div>'
            )
          }
        },
        legend: {
          show: data.legend,
          icon: 'rect',
          top: 0,
          right: 0,
          itemWidth: 10,
          itemHeight: 2,
          itemGap: 5,
          data: data.legendData,
          textStyle: {
            color: '#fff',
            padding: [3, 0, 0, 0]
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            // interval: 1,
            boundaryGap: false,
            axisLabel: {
              show: true,
              formatter: function (value) {
                return dayjs(value).format('MM-DD HH:mm')
              },
              // interval:1,
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              interval: 0,
              show: true,
              lineStyle: {
                type: 'solid', // solid实线;dashed虚线
                color: 'rgba(131, 173, 255, 1)'
              }
            },
            data: data.xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: true,
            name: data.name,
            nameTextStyle: {
              fontSize: 12,
              color: '#fff',
              padding: [0, 0, 0, 40] // 表示[上,右,下,左]的边距
            },
            alignTicks: true, // 开启该配置项自动对齐刻度
            min: function (value) {
              return data.step ? 0 : toFixed(value.min - 0.1, 1)
            },
            max: function (value) {
              return data.step
                ? Math.ceil(value.max)
                : toFixed(value.max + 0.1, 1)
            },
            splitNumber: 3,
            axisLabel: {
              align: 'center', // 将刻度值居中对齐
              textStyle: {
                color: '#fff', // 坐标轴颜色
                fontSize: '12px'
              }
            },

            // 坐标轴线样式
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed', // solid实线;dashed虚线
                color: 'rgba(196, 202, 215, 0.16)'
              }
            }
          }
        ],
        series: series
      }
      if (this.echartsOption) {
        myChart.setOption(this.echartsOption)
      }
    }
  }
}
</script>

<style>
.custom-tooltip-bk-box {
  border-radius: 0 !important;
  /* width: 260px; */
  background: linear-gradient(
    90deg,
    rgba(10, 33, 65, 0.71) 0%,
    rgba(25, 50, 84, 0.6) 100%
  );
  /* border: 1px solid; */
  border-image: linear-gradient(
      90deg,
      rgba(73, 116, 182, 1),
      rgba(127, 173, 220, 0.2)
    )
    1 1;
}

.tooltip_text_name {
  overflow-wrap: break-word;
  color: rgba(95, 212, 254, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: NaN;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin-left: 4px;
}

.tooltip_text_val {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: NaN;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
}

.tooltip_content {
  margin: 4px 0 0 8px;
}

.tooltipTitle {
  overflow-wrap: break-word;
  color: rgba(0, 255, 255, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: justify;
  white-space: nowrap;
  line-height: 20px;
  margin: 6px 0 0 10px;
}

.tooltip_text_label {
  float: left;
  width: 10px;
  height: 2px;
  margin-right: 8px;
  margin-top: 10px;
}
</style>
