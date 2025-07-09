<template>
  <PanelCard :offset-y="6" title="质量">
    <div class="safety-card">
      <div class="safety-kpi">
        <div class="main-kpi">
          <div class="main-icon">
            <div class="total-count">{{ totalCount }}</div>
          </div>
          <div class="main-label">质量事故数</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-list">
          <div class="kpi-item" v-for="it in kpiList" :key="it.key">
            <div class="item-header">
              <img :src="it.icon" class="item-icon" alt="" />
              <span class="item-name">{{ it.title }}</span>
            </div>
            <div class="item-value" :style="{ color: it.color }">
              {{ dataSource[it.key] }}
            </div>
          </div>
        </div>
      </div>
      <div class="question-info">
        <div class="question-item" style="width: 205px">
          <span class="question-label">检查次数</span>
          <span class="question-value">
            <ItemValue :value="dataSource.checkCount" unit="次"></ItemValue>
          </span>
        </div>
        <div
          @click="handleLayer"
          style="width: 285px"
          class="question-item clickable"
        >
          <span class="question-label">质量问题数及整改率</span>
          <span class="question-value">
            <ItemValue :value="dataSource.questionCount" unit="个/"></ItemValue>
            <ItemValue
              :value="dataSource.questionHandleRate"
              unit="%"
              show-arrow
            ></ItemValue>
          </span>
        </div>
      </div>
    </div>
  </PanelCard>
</template>
<script>
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";
import { problemRateLegends } from "@/views/layers/problem-rate/problem-rate-config";
import { SchintaMapHelp } from "schinta-map";
import { showModal } from "@/components/easy-modal/modal";
import RectificationRateModal from "./modal/RectificationRateModal.vue";

const initData = {
  checkCount: 112,
  questionCount: 23,
  questionHandleRate: 65.2,
};

const regionObj = {
  // 重庆市
  534996: {
    checkCount: 112,
    questionCount: 23,
    questionHandleRate: 65.2,
  },
  // 江津区
  539450: {
    checkCount: 19,
    questionCount: 12,
    questionHandleRate: 58.3,
  },
  //   巫山县
  545317: {
    checkCount: 86,
    questionCount: 8,
    questionHandleRate: 50,
  },
  //   石柱县
  546047: {
    checkCount: 6,
    questionCount: 3,
    questionHandleRate: 0,
  },
  //   涪陵区
  535685: {
    checkCount: 1,
    questionCount: 0,
    questionHandleRate: 0,
  },
};

export default {
  components: { PanelCard, ItemValue },
  mixins: [SchintaMapHelp()],
  data() {
    return {
      dataSource: {
        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
        checkCount: 112,
        questionCount: 23,
        questionHandleRate: 65.2,
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
      return Object.keys(this.dataSource)
        .filter((key) => key.includes("level"))
        .reduce((sum, key) => sum + this.dataSource[key], 0);
    },
    regionId() {
      return this.mapParamsValue$.regionId;
    },
  },
  watch: {
    regionId: {
      handler() {
        this.randomizeData();
      },
    },
  },
  methods: {
    handleLayer() {
      this.$setCurLayers(["qualityProblemRateLayer"]);
      showModal({
        title: "质量问题整改率",
        width: 800,
        component: RectificationRateModal,
        params: {
          panelType: "quality",
        },
      });
    },
    randomizeData() {
      if (regionObj[this.regionId]) {
        Object.keys(regionObj[this.regionId]).forEach((key) => {
          this.dataSource[key] = regionObj[this.regionId][key];
        });
      } else {
        ["checkCount", "questionCount", "questionHandleRate"].forEach((key) => {
          this.dataSource[key] = 0;
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.safety-kpi {
  height: 77px;
  background-image: url(~@/assets/images-new/construction-management/construction-dynamics/safety-kpi-bg.png);
  background-size: 100% 100%;
  display: flex;
  .main-kpi {
    margin-top: 7px;
    margin-left: 36px;
    .main-icon {
      width: 69px;
      height: 42px;
      background-image: url(~@/assets/images-new/construction-management/construction-dynamics/main-kpi.png);
      background-size: 100% 100%;
      .total-count {
        font-family: D-DIN, D-DIN;
        font-weight: 700;
        font-size: 24px;
        color: #ffffff;
        line-height: 22px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
    .main-label {
      margin-top: 3px;
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
  .kpi-divider {
    width: 10px;
    height: 45px;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/kpi-divider.png);
    background-size: 100% 100%;
    margin: 16px 20px 0;
  }
  .kpi-list {
    flex: 1;
    overflow: hidden;
    display: flex;
    padding-right: 15px;
    .kpi-item {
      flex: 1;
      overflow: hidden;
      .item-header {
        height: 20px;
        display: flex;
        align-items: center;
        margin-top: 14px;
        .item-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
        .item-name {
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
      .item-value {
        margin-top: 5px;
        padding-left: 24px;
        font-family: D-DIN, D-DIN;
        font-weight: 700;
        font-size: 22px;
        line-height: 24px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}
.question-info {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .question-item {
    width: 245px;
    height: 40px;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/question-bg.png);
    background-size: 100% 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding-left: 18px;
    padding-right: 10px;

    &.clickable {
      position: relative;
    }
    .question-label {
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
</style>
