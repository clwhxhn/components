<template>
  <PanelCard :offset-y="6" title="投资">
    <div class="invest-card">
      <div @click="handleOpenModal1" class="invest-item hover">
        <div class="invest-label">年度全口径水利投资</div>
        <div class="invest-data">
          <ItemValue
            :value="$fn(dataSource.invest.amount1)"
            unit="亿元"
            show-arrow
          ></ItemValue>
          <span
            :class="[
              'rate-info',
              dataSource.invest.rate1 > 0 ? 'is-up' : 'is-down',
            ]"
          >
            同比{{ $fn(dataSource.invest.rate1, 1) }}%
            <span
              v-if="dataSource.invest.rate1 != 0"
              :class="[
                'arrow-icon',
                dataSource.invest.rate1 > 0 ? 'arrow-up' : 'arrow-down',
              ]"
            ></span>
          </span>
        </div>
      </div>
      <div @click="handleOpenModal2" class="invest-item hover">
        <div class="invest-label">年度水利固定资产投资</div>
        <div class="invest-data">
          <ItemValue
            :value="$fn(dataSource.invest.amount2)"
            unit="亿元"
            show-arrow
          ></ItemValue>
          <span
            :class="[
              'rate-info',
              dataSource.invest.rate2 > 0 ? 'is-up' : 'is-down',
            ]"
          >
            同比{{ $fn(dataSource.invest.rate2, 1) }}%
            <span
              v-if="dataSource.invest.rate2 != 0"
              :class="[
                'arrow-icon',
                dataSource.invest.rate2 > 0 ? 'arrow-up' : 'arrow-down',
              ]"
            ></span>
          </span>
        </div>
        <div class="invest-target">
          <span>年度目标值</span>
          <span class="target-amount"
            >{{ dataSource.invest.yearTarget }}亿元</span
          >
        </div>
      </div>
    </div>
  </PanelCard>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";
import TotalInvestmentModal from "./modal/TotalInvestmentModal.vue";
import fixedInvestmentModal from "./modal/fixedInvestmentModal.vue";
import { SchintaMapHelp } from "schinta-map";
import { formatNumber } from "@/utils/number-helper";

const initData = {
  // 年度全口径水利投资金额
  amount1: 149.57,
  // 年度全口径水利投资同比上涨（下降）
  rate1: -5.4,
  // 年度全口径水利投资金额
  amount2: 182.56,
  // 年度全口径水利投资同比上涨（下降）
  rate2: 11.8,
  // 年度目标值
  yearTarget: 426,
};

export default {
  components: { PanelCard, ItemValue },
  mixins: [SchintaMapHelp()],
  data() {
    return {
      formatNumber,
      dataSource: {
        invest: {
          // 年度全口径水利投资金额
          amount1: 149.57,
          // 年度全口径水利投资同比上涨（下降）
          rate1: -5.4,
          // 年度全口径水利投资金额
          amount2: 182.56,
          // 年度全口径水利投资同比上涨（下降）
          rate2: 11.8,
          // 年度目标值
          yearTarget: 426,
        },
      },
    };
  },
  computed: {
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
    // 年度全口径水利投资弹窗
    handleOpenModal1() {
      // 重置到默认图层
      this.$setCurLayers(["projectLayer", "countLayer"]);
      showModal({
        title: `年度投资执行情况（全口径）`,
        width: 1200,
        component: TotalInvestmentModal,
        params: {},
      });
    },
    // 年度水利固定资产投资弹窗
    handleOpenModal2() {
      // 重置到默认图层
      this.$setCurLayers(["projectLayer", "countLayer"]);
      showModal({
        title: `年度投资执行情况（固定资产）`,
        width: 1200,
        component: fixedInvestmentModal,
        params: {},
      });
    },
    randomizeData() {
      Object.keys(initData).forEach((key) => {
        // 534996 是重庆
        if (this.regionId === "534996") {
          this.dataSource.invest[key] = initData[key];
        } else {
          const randomInt = Math.floor(Math.random() * 6); // 0~5之间整数
          this.dataSource.invest[key] = initData[key] - randomInt;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.invest-card {
  display: flex;
  justify-content: space-between;
  .invest-item {
    width: 243px;
    height: 60px;
    background-image: url(~@/assets/images-new/construction-management/review-improve/invest-bg.png);
    background-size: 100% 100%;
    padding-left: 6px;

    &.hover {
      cursor: pointer;
    }

    .invest-label {
      margin-top: 5px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .invest-data {
      height: 20px;
      margin-top: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .rate-info {
        display: flex;
        align-items: center;
        &.is-up {
          color: #ff4747;
        }
        &.is-down {
          color: #85ff72;
        }
        .arrow-icon {
          margin: 2px 15px 0 4px;
        }
      }
    }
    .invest-target {
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #ffffff;
      line-height: 14px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      .target-amount {
        color: #ffef16;
      }
    }
  }
}
</style>
