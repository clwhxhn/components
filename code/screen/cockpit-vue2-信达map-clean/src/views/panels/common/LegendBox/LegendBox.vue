<template>
  <transition @after-leave="handleClear" name="translate">
    <div v-show="visible" class="legend-box" :style="{ bottom: bottom }">
      <div class="legend-header">图例</div>
      <div class="legend-list">
        <LegendItem
          v-for="it in legendList"
          :key="it.label"
          :item="it"
        ></LegendItem>
      </div>
    </div>
  </transition>
</template>
<script>
import { paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";
import LegendItem from "./LegendItem.vue";
import { levelset } from "@/views/layers/problem-rate/problem-rate-config";
import { levelset as wsLevelset } from "@/views/layers/top-panel/rate-config";
import { levelsetWaterUtilize } from "@/views/layers/top-panel/rate-config";

// 问题整改率图例
const rateLegends = levelset.map((it) => {
  return {
    ...it,
    label: it.min === it.max ? `${it.max}%` : [it.min, it.max].map((val) => val + "%").join(" ~ "),
  };
});

// 供水安全系数图例
const wsRateLegends = wsLevelset.map((it) => {
  return {
    ...it,
    label: !it.max ? `>${it.min}`: [it.min, it.max].map((val) => val + "").join(" ~ "),
  };
});

// 水资源开发利用率图例
const wuRateLegends = levelsetWaterUtilize.map((it) => {
  return {
    ...it,
    label: !it.max ? `>${it.min}`: [it.min, it.max].map((val) => val + "").join(" ~ "),
  };
});

// 图层与图例的对应关系
const legendMap = {
  safetyProblemRateLayer: rateLegends,
  qualityProblemRateLayer: rateLegends,
  waterSupplyRateLayer: wsRateLegends,
  waterUtilizeRateLayer: wuRateLegends,
  reservoirLayer: [
    {
      icon: require("@/assets/images/layer-icon/reservoir.png"),
      label: "大中型水库",
    },
    {
      icon: require("@/assets/images/layer-icon/reservoir-small.png"),
      label: "小型水库",
    },
    {
      icon: require("@/assets/images/layer-icon/reservoir-error.png"),
      label: "病险水库",
    },
  ],
  projectLayer: [
    {
      icon: require("@/assets/images-new/common/project-icon-1.png"),
      label: "项目",
    },
  ],
  engineeringLayer: [
    {
      icon: require("@/assets/images-new/common/project-icon-1.png"),
      label: "项目",
    },
  ],
  preWorkLayer: [
    {
      icon: require("@/assets/images-new/common/project-icon-1.png"),
      label: "项目",
    },
  ],
  majorEngineeringLayer: [
    {
      icon: require("@/assets/images-new/common/project-icon-1.png"),
      label: "项目",
    },
  ],
  waterProjectLayer: [
    {
      icon: require("@/assets/images/engineering-operation/blue.svg"),
      label: "城市管网延伸工程",
    },
    {
      icon: require("@/assets/images/engineering-operation/green.svg"),
      label: "千吨万人工程",
    },
    {
      icon: require("@/assets/images/engineering-operation/yellow.svg"),
      label: "千人工程",
    },
    {
      icon: require("@/assets/images/engineering-operation/red.svg"),
      label: "百人工程",
    },
  ],
  aiAlarmLayer: [
    {
      icon: require("@/assets/images-new/common/shipin.png"),
      label: "AI报警",
    },
  ],
};

export default {
  mixins: [SchintaMapHelp()],
  components: { LegendItem },
  computed: {
    ...paramsGetters(["collapseBottom", "collapseSide"]),
    layers() {
      return this.getLayerValue$();
    },
    legendList() {
      const repeatMap = {};
      const legends = [];
      this.layers.forEach((layer) => {
        const layerLegends = legendMap[layer];
        if (!layerLegends) return;
        layerLegends.forEach((it) => {
          // 根据图例名称来去重
          if (repeatMap[it.label]) return;
          repeatMap[it.label] = true;
          legends.push(it);
        });
      });
      return legends;
    },
    bottom() {
      if (this.collapseBottom || this.collapseSide) {
        return "16px";
      }
      return "178px";
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleClear() {},
  },
};
</script>
<style lang="less" scoped>
.legend-box {
  position: absolute;
  right: calc(100% + 16px);
  bottom: 178px;
  padding: 12px;
  background: linear-gradient(
    180deg,
    rgba(56, 131, 200, 0.3994) 0%,
    rgba(26, 76, 150, 0.0001) 100%
  );
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(64.26857337355614, 136.89019292593002, 226.3297176361084, 1),
      rgba(
        116.59329324960709,
        189.57377314567566,
        242.70227909088135,
        0.00009999999747378752
      )
    )
    1 1;
  transition: all 0.3s ease;
  .legend-header {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 20px;
    color: #ffffff;
    line-height: 26px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    white-space: nowrap;
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: all 0.3s;
}

.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
