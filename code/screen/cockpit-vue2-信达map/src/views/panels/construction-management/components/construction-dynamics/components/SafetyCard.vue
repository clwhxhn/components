<template>
  <PanelCard :offset-y="6" title="安全">
    <div class="safety-card">
      <div class="card-left">
        <div class="chart-container">
          <ChartBox ref="chart"></ChartBox>
          <div class="total-count">{{ totalCount }}</div>
        </div>
        <div class="chart-title">安全事故数</div>
      </div>
      <div class="card-center">
        <div class="kpi-item" v-for="it in kpiList" :key="it.key">
          <div class="kpi-title-row">
            <img :src="it.icon" alt="" class="kpi-item-icon" />
            <span class="kpi-title">{{ it.title }}</span>
          </div>
          <div class="kpi-value" :style="{ color: it.color }">
            {{ dataSource[it.key] }}
          </div>
        </div>
      </div>
      <div class="kpi-divider"></div>
      <div class="card-right">
        <div class="right-item">
          <div class="right-icon"></div>
          <div class="right-data">
            <div class="right-data-label">监督检查次数</div>
            <div class="right-data-value">
              <ItemValue :value="dataSource.checkCount" unit="次"></ItemValue>
            </div>
          </div>
        </div>
        <div class="right-item">
          <div class="right-icon icon2"></div>
          <div @click="handleClick" class="right-data hover">
            <div class="right-data-label">安全隐患数/整改率</div>
            <div class="right-data-value">
              <ItemValue
                :value="dataSource.questionCount"
                unit="个/"
              ></ItemValue>
              <ItemValue
                :value="dataSource.questionHandleRate"
                unit="%"
                :show-arrow="true"
              ></ItemValue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PanelCard>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";
import { problemRateLegends } from "@/views/layers/problem-rate/problem-rate-config";
import { SchintaMapHelp } from "schinta-map";
import { getPie3D } from "../utils/pie-chart3d";
import ChartBox from "@/components/ChartBox.vue";
import RectificationRateModal from "./modal/RectificationRateModal.vue";

const initData = {
  totalCount: 0,
  checkCount: 23,
  questionCount: 434,
  questionHandleRate: 65,
};

export default {
  components: { PanelCard, ItemValue, ChartBox },
  mixins: [SchintaMapHelp()],
  data() {
    return {
      dataSource: {
        totalCount: 0,
        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
        checkCount: 23,
        questionCount: 434,
        questionHandleRate: 65,
      },
      kpiList: [
        {
          title: "一般",
          icon: require("@/assets/images-new/construction-management/construction-dynamics/level-1.png"),
          key: "level1Count",
          color: "#08CEF9",
        },
        {
          title: "较大",
          icon: require("@/assets/images-new/construction-management/construction-dynamics/level-2.png"),
          key: "level2Count",
          color: "#FFEF16",
        },
        {
          title: "重大",
          icon: require("@/assets/images-new/construction-management/construction-dynamics/level-3.png"),
          key: "level3Count",
          color: "#FF8B16",
        },
        {
          title: "特别重大",
          icon: require("@/assets/images-new/construction-management/construction-dynamics/level-4.png"),
          key: "level4Count",
          color: "#FA5252",
        },
      ],
    };
  },
  computed: {
    totalCount() {
      //   return this.kpiList.reduce((pre, cur) => {
      //     return pre + (this.dataSource[cur.key] || 0);
      //   }, 0);
      return 0;
    },
    regionId() {
      return this.mapParamsValue$.regionId;
    },
  },
  watch: {
    regionId: {
      handler() {
        this.randomizeData(this.dataSource);
      },
    },
  },
  mounted() {
    this.getChartOption();
  },
  methods: {
    handleLayer() {
      this.$setCurLayers(["safetyProblemRateLayer"]);
    },
    getChartOption() {
      const pieData = (this.chart1Data = this.kpiList.map((it) => {
        return {
          value: 1, // this.dataSource[it.key] || 0,
          name: it.title,
          itemStyle: {
            color: it.color,
          },
        };
      }));
      const option = getPie3D(pieData, 0.8, () => 10);

      option.tooltip = {
        trigger: "item",
        confine: true,
        textStyle: {
          fontSize: 12,
        },
        formatter: function (params) {
          const str =
            `${params.marker}${params.seriesName}<br />` +
            `数量：0个<br />` +
            `占比：0.0%<br />`;
          return str;
        },
      };
      this.$refs.chart.render(option);
    },
    handleClick() {
      this.handleLayer();
      showModal({
        title: "安全隐患整改率",
        width: 800,
        component: RectificationRateModal,
        params: {
          panelType: "safety",
        },
      });
    },
    // 随机修改数据
    randomizeData(data) {
      const keysToUpdate = [
        "checkCount",
        "questionCount",
        "questionHandleRate",
      ];

      keysToUpdate.forEach((key) => {
        // 随机生成 -5 到 5 之间的整数
        const randomChange = Math.floor(Math.random() * 11) - 5;
        data[key] =
          this.regionId === "534996"
            ? initData[key]
            : randomChange + initData[key];
      });

      return data;
    },
  },
};
</script>
<style lang="less" scoped>
.safety-card {
  display: flex;
  height: 122px;
  background-image: url(~@/assets/images-new/construction-management/construction-dynamics/save-bg.png);
  background-size: 100% 100%;
  .card-left {
    width: 140px;
    height: 100px;
    .chart-container {
      height: 88px;
      position: relative;
      .total-count {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translateX(-50%);
        font-family: D-DIN, D-DIN;
        font-weight: 700;
        font-size: 24px;
        color: #ffffff;
        line-height: 26px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
    .chart-title {
      font-family: PingFang TC, PingFang TC;
      font-weight: 500;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
  .card-center {
    margin-left: 8px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    width: 155px;
    .kpi-item {
      margin-top: 18px;
      .kpi-title-row {
        display: flex;
        align-items: center;
        height: 20px;
        color: #fff;
        font-family: PingFang TC, PingFang TC;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        .kpi-item-icon {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
      .kpi-value {
        margin-left: 20px;
        font-family: D-DIN, D-DIN;
        font-weight: 700;
        font-size: 18px;
        color: #08cef9;
        line-height: 24px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
  .kpi-divider {
    width: 10px;
    height: 81px;
    margin: 20px 7px 0;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/kpi-divider.png);
    background-size: 100% 100%;
  }
  .card-right {
    .right-item {
      margin-top: 17px;
      display: flex;
      .right-icon {
        width: 24px;
        height: 24px;
        background-image: url(~@/assets/images-new/construction-management/construction-dynamics/save-1.png);
        background-size: 100% 100%;
        &.icon2 {
          background-image: url(~@/assets/images-new/construction-management/construction-dynamics/save-2.png);
        }
      }
      .right-data {
        margin-left: 10px;
        &.hover {
          cursor: pointer;
        }
        .right-data-label {
          font-family: PingFang TC, PingFang TC;
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }
}
</style>
