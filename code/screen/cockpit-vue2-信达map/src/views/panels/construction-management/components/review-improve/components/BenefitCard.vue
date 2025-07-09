<template>
  <PanelCard :offset-y="6" title="效益">
    <div class="benefit-card">
      <div class="card-left">
        <div class="left-row mb-4">
          <div class="left-data">
            <div class="data-label">总库容</div>
            <div class="data-value">
              <ItemValue
                :value="$fn(dataSource.zkr, 2, '')"
                unit="亿m³"
              ></ItemValue>
            </div>
          </div>
          <span class="divider"></span>
          <div class="left-data">
            <div class="data-label">供水能力</div>
            <div class="data-value">
              <ItemValue
                :value="$fn(dataSource.gsnl, 2, '')"
                unit="亿m³"
              ></ItemValue>
            </div>
          </div>
        </div>
        <div class="left-row mb-4">
          <div class="left-data">
            <div class="data-label">农村供水人口</div>
            <div class="data-value">
              <ItemValue
                :value="$fn(dataSource.ncgsrk, 0, '')"
                unit="万"
              ></ItemValue>
            </div>
          </div>
          <span class="divider"></span>
          <div class="left-data">
            <div class="data-label">自来水普及率</div>
            <div class="data-value">
              <ItemValue
                :value="$fn(dataSource.zlspjl, 1, '')"
                unit="%"
              ></ItemValue>
            </div>
          </div>
        </div>
        <div class="left-row">
          <div class="left-data">
            <div class="data-label">耕地灌溉</div>
            <div class="data-value">
              <ItemValue
                :value="$fn(dataSource.gdgg, 2, '')"
                unit="万"
              ></ItemValue>
            </div>
          </div>
          <span class="divider"></span>
          <div class="left-data">
            <div class="data-label">耕地灌溉率</div>
            <div class="data-value">
              <ItemValue
                :value="$fn(dataSource.gdggl, 1, '')"
                unit="%"
              ></ItemValue>
            </div>
          </div>
        </div>
      </div>
      <div class="card-right">
        <div class="right-row mb-4">
          <div class="right-label">保护人口</div>
          <div class="right-value">
            <ItemValue
              :value="$fn(dataSource.bhrk, 2, '')"
              unit="万"
            ></ItemValue>
          </div>
        </div>
        <div class="right-row">
          <div class="right-label">保护耕地</div>
          <div class="right-value">
            <ItemValue
              :value="$fn(dataSource.bhgd, 2, '')"
              unit="万亩"
            ></ItemValue>
          </div>
        </div>
      </div>
    </div>
  </PanelCard>
</template>
<script>
import { SchintaMapHelp } from "schinta-map";
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";

const initData = {
  // 总库容
  zkr: 131.13,
  // 供水能力
  gsnl: 112.8,
  // 农村供水人口
  ncgsrk: 2176,
  // 自来水普及率
  zlspjl: 90.8,
  // 耕地灌溉
  gdgg: 1047.68,
  // 耕地灌溉率
  gdggl: 41.6,
  // 保护人口,
  bhrk: 3190.47,
  // 保护耕地
  bhgd: 2804.37,
};

export default {
  components: { PanelCard, ItemValue },
  mixins: [SchintaMapHelp()],
  data() {
    return {
      dataSource: {
        // 总库容
        zkr: 131.13,
        // 供水能力
        gsnl: 112.8,
        // 农村供水人口
        ncgsrk: 2176,
        // 自来水普及率
        zlspjl: 90.8,
        // 耕地灌溉
        gdgg: 1047.68,
        // 耕地灌溉率
        gdggl: 41.6,
        // 保护人口,
        bhrk: 3190.47,
        // 保护耕地
        bhgd: 2804.37,
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
    randomizeData() {
      Object.keys(initData).forEach((key) => {
        console.log(key, "key");
        const randomInt = Math.floor(Math.random() * 6); // 0~5之间整数
        this.dataSource[key] = randomInt + initData[key];
      });
    },
  },
};
</script>
<style lang="less" scoped>
.benefit-card {
  display: flex;
  justify-content: space-between;
  .mb-4 {
    margin-bottom: 4px;
  }
  .card-left {
    width: 372px;
    .left-row {
      background-image: url(~@/assets/images-new/construction-management/review-improve/benefit-left-bg.png);
      background-size: 100% 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;
      .divider {
        width: 2px;
        height: 17px;
        background-image: url(~@/assets/images-new/construction-management/review-improve/benefit-left-divider.png);
        background-size: 100% 100%;
        margin: 0 12px;
      }
      .left-data {
        flex: 1;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .data-label {
          font-family: PingFang SC, PingFang SC;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
          line-height: 16px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }
  .card-right {
    width: 120px;
    .right-row {
      padding: 6px 6px 0;
      box-sizing: border-box;
      height: 50px;
      background-image: url(~@/assets/images-new/construction-management/review-improve/benefit-left-bg.png);
      background-size: 100% 100%;
      .right-label {
        font-family: PingFang SC, PingFang SC;
        font-weight: 600;
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
</style>
