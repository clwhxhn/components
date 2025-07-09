<template>
  <div class="funding-plan">
    <div class="total-invest-tag">
      <span>年度总投资</span>
      <ItemValue :value="$fn(134, 0, '')" unit="亿元"></ItemValue>
    </div>
    <SectionHeader>资金计划</SectionHeader>
    <div class="funding-plan-content">
      <PanelCard title="中央资金">
        <div class="kpi-wrapper">
          <div class="chart-wrapper">
            <div class="chart-bg"></div>
            <div ref="zyPie" class="pie-chart"></div>
            <div class="chart-title-info">
              <div class="total-value">
                <ItemValue
                  :value="$fn(zyData.total, 0)"
                  unit="亿元"
                ></ItemValue>
              </div>
              <div class="chart-title">总投资</div>
              <div
                class="percent-label"
                :class="{ 'is-up': zyData.constrast > 0 }"
              >
                同比{{ zyData.constrast }}%
                <span class="arrow"></span>
              </div>
            </div>
          </div>
          <div class="legend-wrapper">
            <div class="legend-list">
              <div
                @click="handleOpenList(it)"
                class="legend-item"
                v-for="it in zyData.list"
                :key="it.key"
              >
                <div class="legend-name">
                  <div
                    class="color-block"
                    :style="{ backgroundColor: it.color }"
                  ></div>
                  <span>{{ it.name }}</span>
                </div>
                <div :title="`${it.value}亿元`" class="legend-value">
                  <ItemValue
                    :value="$fn(it.value, 2)"
                    unit="亿元"
                    :show-arrow="it.clickable"
                  ></ItemValue>
                </div>
              </div>
            </div>
          </div>
          <div class="tag-label">金额/占比</div>
        </div>
      </PanelCard>
      <PanelCard title="地方资金">
        <div class="kpi-wrapper no-flex">
          <div class="data-list">
            <div class="data-item" v-for="it in dfKpiList" :key="it.key">
              <div class="data-title">{{ it.title }}</div>
              <div class="data-value">
                <ItemValue
                  :value="$fn(dfData[it.key], 2)"
                  :unit="it.unit"
                ></ItemValue>
              </div>
            </div>
          </div>
          <div class="kpi-content">
            <div class="chart-wrapper">
              <div class="chart-bg"></div>
              <div ref="dfPie" class="pie-chart"></div>
              <div class="chart-title-info">
                <div class="total-value">
                  <ItemValue
                    :value="$fn(dfData.total, 0)"
                    unit="亿元"
                  ></ItemValue>
                </div>
                <div class="chart-title">总投资</div>
              </div>
            </div>
            <div class="legend-wrapper">
              <div class="legend-list2">
                <div
                  @click="handleDfOpenList(it)"
                  class="legend-item"
                  :class="{ clickable: it.clickable }"
                  :style="{ backgroundColor: it.color }"
                  v-for="it in dfData.list"
                  :key="it.key"
                >
                  <div class="legend-content">
                    <div class="legend-name">
                      <span>{{ it.name }}</span>
                    </div>
                    <div class="legend-value">
                      <ItemValue
                        :value="$fn(it.value, 2)"
                        unit="亿元"
                        :show-arrow="it.clickable"
                      ></ItemValue>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>
    </div>
  </div>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import * as echarts from "echarts";
import FundingPlanModal from "./FundingPlanModal.vue";
import FundingPlanDfModal from "./FundingPlanDfModal.vue";
import { SchintaMapHelp } from "schinta-map";

export default {
  mixins: [SchintaMapHelp()],
  components: { SectionHeader, PanelCard, ItemValue },
  data() {
    return {
      // 中央资金
      zyData: {
        total: 46.3076,
        // 同比增长率 （负数代表负增长）
        constrast: -79,
        list: [
          {
            name: "中央预算内",
            value: 0.4314,
            key: "zyysntz",
            color: "#59FFFF",
            clickable: true,
          },
          {
            name: "国债",
            value: 12.7791,
            key: "gz2023",
            color: "#F5E74F",
            clickable: true,
          },
          {
            name: "水利发展",
            value: 13.8279,
            key: "zyslfzzj",
            color: "#1F9EFF",
            clickable: true,
          },
          {
            name: "三峡后续",
            value: 9.2303,
            key: "sxhx",
            color: "#F3F7FF",
          },
          {
            name: "移民后扶",
            value: 10.0389,
            key: "dzxskym",
            color: "#FF386B",
          },
          {
            name: "其他资金",
            value: 0,
            key: "qt",
            color: "#FF8317",
          },
        ],
      },
      // 地方资金
      dfData: {
        total: 88.4061,
        list: [
          {
            name: "市级财政资金",
            value: 5.0906,
            key: "shiji",
            color: "#FFEF16",
          },
          {
            name: "区县财政资金",
            value: 5.5421,
            key: "xjjyx",
            color: "#1FFF93",
            clickable: true,
          },
          {
            name: "银行贷款",
            value: 1.3368,
            key: "yhdk",
            color: "#C592F7",
            clickable: true,
          },
          {
            name: "社会资本",
            value: 70.354,
            key: "shzb",
            color: "#8FD0FF",
            clickable: true,
          },
          {
            name: "一般债券",
            value: 0,
            key: "ybzq",
            color: "#FFB638",
          },
          {
            name: "专项债券",
            value: 6.0826,
            key: "zxzq",
            color: "#AFF0CA",
            clickable: true,
          },
        ],
        dfztz: 83.3155,
        sjzj: 5.0906,
        qxzj: 83.3155,
        lsl: 70,
      },
      dfKpiList: [
        {
          title: "市级资金",
          key: "sjzj",
          unit: "亿元",
        },
        {
          title: "区县资金",
          key: "qxzj",
          unit: "亿元",
        },
      ],
      zyPie: null,
      dfPie: null,
    };
  },
  mounted() {
    this.zyPie = echarts.init(this.$refs.zyPie);
    const zyOptions = this.getPieChartOption(this.zyData);
    this.zyPie.setOption(zyOptions);

    this.dfPie = echarts.init(this.$refs.dfPie);
    const dfOptions = this.getPieChartOption(this.dfData);
    this.dfPie.setOption(dfOptions);
  },
  methods: {
    getPieChartOption(data) {
      let option = {
        backgroundColor: "transparent",
        title: [
          {
            show: false,
            // text: data.total + "亿元",
            // subtext: "总投资",
            // subtextStyle: { fontSize: 10, color: "#FFFFFF" },
            // textStyle: { color: "#FFFFFF", fontWeight: "bold", fontSize: 12 },
            // itemGap: 5,
            // textAlign: "center",
            // x: "47%",
            // y: "26%",
          },
        ],
        tooltip: { show: false },
        color: data.list.map((it) => it.color),
        legend: { show: false },
        series: [
          {
            name: "",
            type: "pie",
            clockwise: true,
            minAngle: 20,
            center: ["50%", "50%"],
            radius: [51, 61],
            avoidLabelOverlap: true,
            cursor: "auto",
            itemStyle: { normal: { borderColor: "#1e2239", borderWidth: 1.5 } },
            label: {
              normal: {
                show: false,
                position: "inside",
                formatter: "{d}%",
                textStyle: { color: "#fff" },
              },
              emphasis: {
                position: "inside",
                show: true,
                formatter: "{b}: {d}%",
                textStyle: {
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: "#000",
                  padding: 10,
                },
              },
            },
            data: data.list,
          },
          {
            name: "",
            type: "pie",
            clockwise: true,
            silent: true,
            minAngle: 20,
            center: ["50%", "50%"],
            radius: [37, 47],
            itemStyle: {
              normal: {
                borderColor: "#1e2239",
                borderWidth: 1.5,
                opacity: 0.4,
              },
            },
            label: { normal: { show: false } },
            data: data.list,
          },
        ],
      };
      return option;
    },
    handleOpenList(item) {
      if (!item.clickable) return;
      this.$setCurLayers(["projectLayer", "countLayer"]);
      showModal({
        title: `资金计划（${item.name}）`,
        width: 1200,
        component: FundingPlanModal,
        params: {
          type: item.key,
        },
      });
    },
    handleDfOpenList(item) {
      if (!item.clickable) return;
      this.$setCurLayers(["projectLayer", "countLayer"]);
      showModal({
        title: `资金计划（${item.name}）`,
        width: 800,
        component: FundingPlanDfModal,
        params: {
          type: item.key,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.funding-plan {
  margin-top: 10px;
  position: relative;
  .total-invest-tag {
    position: absolute;
    top: 0;
    right: 0px;
    background-image: url(~@/assets/images-new/construction-management/funding-plan/tag-bg.png);
    background-size: 100% 100%;
    text-align: center;
    height: 20px;
    display: flex;
    align-items: center;
    padding: 0 4px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    line-height: 18px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    /deep/ .value-span {
      margin: 0 4px;
      font-size: 20px;
    }
  }
  .funding-plan-content {
    .kpi-wrapper {
      width: 100%;
      background-image: url(~@/assets/images-new/construction-management/funding-plan/chart-bg.png);
      background-size: 100% 100%;
      display: flex;
      position: relative;
      padding: 6px 0;
      &.no-flex {
        display: block;
      }
      .kpi-content {
        display: flex;
      }
      .tag-label {
        position: absolute;
        top: 0;
        right: 0;
        padding-left: 12px;
        padding-right: 6px;
        height: 18px;
        background: linear-gradient(
          90deg,
          rgba(0, 123, 255, 0) 0%,
          rgba(44, 146, 255, 0.53) 100%
        );
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #9edcff;
        line-height: 17px;

        font-style: normal;
        text-transform: none;
      }
      .chart-wrapper {
        position: relative;
        width: 132px;
        height: 132px;
        margin-left: 6px;
        margin-top: 3px;
        .chart-bg {
          width: 100%;
          height: 100%;
          background: url("~@/assets/images-new/construction-management/funding-plan/chart-animation.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotate 6s linear infinite;
        }
        .pie-chart {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .chart-title-info {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          --primary-color: #ffffff;
          .chart-title {
            font-size: 12px;
            color: var(--primary-color);
          }
          /deep/ .value-span {
            line-height: 16px;
          }
          z-index: 0;
        }
        .percent-label {
          font-family: D-DIN, D-DIN;
          font-weight: 700;
          font-size: 10px;
          line-height: 11px;
          font-style: normal;
          text-transform: none;
          display: flex;
          align-items: center;
          margin-top: 2px;
          --primary-color: #09ef78;
          color: var(--primary-color);
          &.is-up {
            --primary-color: #ff4747;
            .arrow {
              &::after {
                content: " ";
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%) rotateX(180deg);
                border-top: 4px solid var(--primary-color);
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
              }
            }
          }
          &:not(.is-up) {
            .arrow {
              &::after {
                content: " ";
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                border-top: 4px solid var(--primary-color);
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
              }
            }
          }
          .arrow {
            height: 1em;
            width: 2px;
            background-color: var(--primary-color);
            margin-left: 4px;
            margin-bottom: -2px;
            position: relative;
          }
        }
      }
      .legend-wrapper {
        flex: 1;
        overflow: hidden;
        margin-left: 4px;
        .legend-list {
          width: 100%;
          margin-top: 27px;
          display: grid;
          grid-template-columns: repeat(3, 33.33%);
          grid-template-rows: repeat(2, 50%);
          grid-row-gap: 10px;
          .legend-item {
            cursor: pointer;
            .legend-name {
              display: flex;
              align-items: center;
              height: 18px;
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              line-height: 18px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              .color-block {
                width: 6px;
                height: 6px;
                margin-right: 3px;
              }
            }
            .legend-value {
              padding-left: 9px;
              height: 18px;
              line-height: 18px;
              display: flex;
              align-items: center;
              margin-top: 4px;
            }
          }
        }
        .legend-list2 {
          width: 100%;
          margin-top: 15px;
          display: grid;
          grid-template-columns: repeat(2, 168px);
          grid-template-rows: repeat(3, 36px);
          grid-row-gap: 8px;
          grid-column-gap: 8px;
          .legend-item {
            border-radius: 2px;
            padding-left: 3px;
            .legend-content {
              height: 100%;
              display: flex;
              border-radius: 2px;
              align-items: center;
              justify-content: space-between;
              background: linear-gradient(to right, #004890, #0c2955);
              font-family: PingFang SC, PingFang SC;
              font-weight: 600;
              font-size: 13px;
              color: #ffffff;
              line-height: 20px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              box-sizing: border-box;
              padding: 0 3px;
            }
          }
        }
      }
    }
  }
  .data-list {
    display: flex;
    justify-content: space-between;
    margin-left: 6px;
    .data-item {
      background-image: url(~@/assets/images-new/construction-management/funding-plan/kpi-bg.png);
      background-size: 100% 100%;
      text-align: center;
      width: 240px;
      height: 48px;
      .data-title {
        margin-top: 4px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
