<template>
  <transition name="translate">
    <div v-show="!collapseTop" class="top-panel-content">
      <div class="kpi-section">
        <SectionHeader>KPI(2027年目标)</SectionHeader>
        <div class="section-content">
          <div
            @click="openWaterSupplyModal"
            class="content-item pl-40 clickable"
          >
            <div class="item-row item-title">供水安全系数</div>
            <div class="item-row">
              <span class="value-pair">
                <span>现状：</span>
                <span class="primary-text">1.12</span>
                <span class="clickable-arrow"></span>
              </span>
              <span class="value-pair ml-15">
                <span>目标：</span>
                <span class="primary-text">1.14</span>
                <span class="clickable-arrow"></span>
              </span>
            </div>
          </div>
          <div
            @click="openWaterUtilizeModal"
            class="content-item pl-60 clickable"
          >
            <div class="item-row item-title">水资源开发利用率</div>
            <div class="item-row">
              <span class="value-pair">
                <span>现状：</span>
                <span class="primary-text">41%</span>
                <span class="clickable-arrow"></span>
              </span>
              <span class="value-pair ml-15">
                <span>目标：</span>
                <span class="primary-text">54%</span>
                <span class="clickable-arrow"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="kpi-section">
        <div class="section-header">
          <SectionHeader>基础数据</SectionHeader>
        </div>
        <div class="section-content">
          <div class="content-item flex">
            <div
              class="data-pair-ver clickable ml-10"
              @click="handleProjectLayer(1)"
            >
              <div class="item-title">在建水源工程</div>
              <span class="value-pair">
                <item-value
                  :value="bottomDataSource.wrEngTotalNum"
                  unit="个"
                  show-arrow
                ></item-value>
              </span>
            </div>
            <div class="divider ml-10"></div>
            <div
              class="data-pair-ver clickable ml-12"
              @click="handleProjectLayer(2)"
            >
              <div class="item-title">大型</div>
              <item-value
                :value="bottomDataSource.wrEngBigNum"
                unit="个"
              ></item-value>
            </div>
            <div
              class="data-pair-ver clickable ml-18"
              @click="handleProjectLayer(3)"
            >
              <div class="item-title">中型</div>
              <item-value
                :value="bottomDataSource.wrEngMiddleNum"
                unit="个"
              ></item-value>
            </div>
            <div
              class="data-pair-ver clickable ml-18"
              @click="handleProjectLayer(4)"
            >
              <div class="item-title">小型</div>
              <item-value
                :value="bottomDataSource.wrEngSmallNum"
                unit="个"
              ></item-value>
            </div>
          </div>
          <div class="content-item flex">
            <div class="data-pair-ver ml-10">
              <div class="item-title">在建江河治理</div>
              <span class="value-pair">
                <item-value
                  :value="58"
                  unit="个"
                ></item-value>
              </span>
            </div>
            <div class="divider ml-10"></div>
            <div class="data-pair-ver ml-12">
              <div class="item-title">大江大河</div>
              <item-value
                :value="6"
                unit="个"
              ></item-value>
            </div>
            <div class="data-pair-ver ml-20">
              <div class="item-title">中小河流</div>
              <item-value
                :value="52"
                unit="个"
              ></item-value>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { showModal } from "@/components/easy-modal/modal";
import SectionHeader from "@/components/SectionHeader.vue";
import { SchintaMapHelp } from "schinta-map";
import { paramsGetters } from "@/utils/map-helper";
import WaterSupplyModal from "./components/top-panel-modal/water-supply/WaterSupplyModal.vue";
import WaterUtilizeModal from "./components/top-panel-modal/water-utilize/WaterUtilizeModal.vue";
import { getAction } from "@/utils";

export default {
  name: "TopPanel",
  mixins: [SchintaMapHelp()],
  components: {
    SectionHeader,
  },
  computed: paramsGetters(["regionId", "collapseTop"]),
  data() {
    return {
      bottomDataSource: {},
    };
  },
  mounted() {
    this.queryBottomData();
  },
  watch: {
    regionId() {
      this.queryBottomData();
    },
  },
  methods: {
    openWaterSupplyModal() {
      this.$setCurLayers(["waterSupplyRateLayer"]);
      showModal({
        title: "供水安全系数",
        width: 800,
        component: WaterSupplyModal,
        params: {},
      });
    },
    openWaterUtilizeModal() {
      this.$setCurLayers(["waterUtilizeRateLayer"]);
      showModal({
        title: "水资源开发利用率",
        width: 800,
        component: WaterUtilizeModal,
        params: {},
      });
    },
    queryBottomData() {
      getAction("/pcm/pcm.map/queryBasicWrEngKpi", {
        regionId: this.regionId,
      }).then((res) => {
        this.bottomDataSource = res.result;
      });
    },
    handleProjectLayer(type) {
      this.$setCurLayers(["projectLayer", "countLayer"], false);
      let queryParams = {};
      if (type === 1) {
        queryParams = {
          typ: this.bottomDataSource.wrEngTyp,
        };
      } else if (type === 2) {
        queryParams = {
          typ: this.bottomDataSource.wrEngTyp,
          engScal: this.bottomDataSource.wrEngBigScal,
        };
      } else if (type === 3) {
        queryParams = {
          typ: this.bottomDataSource.wrEngTyp,
          engScal: this.bottomDataSource.wrEngMiddleScal,
        };
      } else if (type === 4) {
        queryParams = {
          typ: this.bottomDataSource.wrEngTyp,
          engScal: this.bottomDataSource.wrEngSmallScal,
        };
      }
      this.setValues$({ projectLayerQueryParams: queryParams });
    },
  },
};
</script>

<style scoped lang="less">
.top-panel-content {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%);
  width: 628px;
  height: 164px;
  background-image: url(~@/assets/images-new/construction-management/top-panel/box-bg.png);
  background-size: 100% 100%;
  .kpi-section {
    .section-content {
      margin: 5px auto 0px;
      width: 568px;
      display: flex;
      justify-content: space-between;
    }
    .content-item {
      width: 270px;
      height: 51px;
      background-image: url(~@/assets/images-new/construction-management/top-panel/content-bg.png);
      background-size: 100% 100%;
      &.clickable {
        cursor: pointer;
      }
      .item-row {
        display: flex;
        margin-top: 5px;
        .value-pair {
          height: 22px;
          line-height: 22px;
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
      }
      .item-title {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 16px;
        color: #e3f3ff;
        line-height: 21px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        height: 18px;
        line-height: 18px;
      }
      .data-pair-ver {
        margin-top: 10px;
      }
      .divider {
        width: 4px;
        height: 45px;
        background-image: url(~@/assets/images-new/construction-management/top-panel/divider.png);
        background-size: 100% 100%;
        margin-top: 3px;
      }
    }
  }
  .pl-40 {
    padding-left: 40px;
  }
  .pl-60 {
    padding-left: 40px;
  }
  .ml-15 {
    margin-left: 15px;
  }
  .ml-10 {
    margin-left: 10px;
  }
  .ml-5 {
    margin-left: 5px;
  }
  .ml-12 {
    margin-left: 12px;
  }
  .ml-18 {
    margin-left: 18px;
  }
  .ml-20 {
    margin-left: 20px;
  }
  .flex {
    display: flex;
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: all 0.3s;
}

.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
