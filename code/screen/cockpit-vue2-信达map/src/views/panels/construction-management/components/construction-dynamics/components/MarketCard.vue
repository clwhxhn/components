<template>
  <PanelCard :offset-y="6" title="市场">
    <div class="market-card">
      <div
        v-for="it in kpiList"
        :key="it.key"
        :class="{ hover: it.hover }"
        @click="it.hover && handleClick(it)"
        class="market-item"
      >
        <div class="market-label">{{ it.title }}</div>
        <div class="market-value primary-text bold">
          <ItemValue
            :value="dataSource[it.key]"
            :show-arrow="it.hover"
          ></ItemValue>
        </div>
      </div>
    </div>
  </PanelCard>
</template>
<script>
import { getAction } from "@/utils";
import { showModal } from "@/components/easy-modal/modal";
import PanelCard from "@/components/PanelCard.vue";
import QualityInspectionModal from "./modal/QualityInspectionModal.vue";
import { SchintaMapHelp } from "schinta-map";
import ItemValue from "@/components/ItemValue.vue";

const initData = {
  kcsjdw: 39,
  sgdw: 1012,
  jldw: 78,
};

export default {
  components: { PanelCard, ItemValue },
  mixins: [SchintaMapHelp()],
  data() {
    return {
      kpiList: [
        { title: "勘察设计单位", key: "kcsjdw", hover: false },
        { title: "施工单位", key: "sgdw", hover: false },
        { title: "监理单位", key: "jldw", hover: false },
        { title: "质量检测单位", key: "zljcdw", hover: true },
      ],
      dataSource: {
        kcsjdw: 39,
        sgdw: 1012,
        jldw: 78,
        zljcdw: 20,
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
        this.getData();
        this.randomizeData();
      },
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleClick(item) {
      // 重置到默认图层
      this.$setCurLayers(["projectLayer", "countLayer"]);
      showModal({
        title: `${item.title}`,
        width: 1200,
        component: QualityInspectionModal,
        params: {
          regionId: this.regionId,
        },
      });
    },
    getData() {
      getAction("/pcm/unit/WctEntUnitBasis/countUnitByType", {
        unitLoc: this.regionId === "534996" ? "" : this.regionId, // 重庆传空
      })
        .then((res) => res.result || {})
        .then((res) => {
          this.kpiList.forEach((kpi) => {
            // 重庆：只更新 质量检测单位
            if (this.regionId === "534996") {
              if (kpi.key === "zljcdw") {
                this.dataSource[kpi.key] = res[kpi.title];
              }
            } else {
              this.dataSource[kpi.key] = res[kpi.title];
            }
          });
        });
    },
    randomizeData() {
      if (this.regionId === "534996") {
        Object.keys(initData).forEach((key) => {
          this.dataSource[key] = initData[key];
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.market-card {
  height: 60px;
  background-image: url(~@/assets/images-new/construction-management/construction-dynamics/market-bg.png);
  background-size: 100% 100%;
  padding-left: 18px;
  display: flex;
  align-items: center;

  .market-item {
    flex: 1;
    overflow: hidden;

    &.hover {
      cursor: pointer;
    }

    .market-label {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .market-value {
      margin-top: 3px;
      line-height: 20px;
      /deep/ .arrow-icon {
        margin-top: -4px;
      }
    }
  }
}
</style>
