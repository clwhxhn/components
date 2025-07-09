<template>
  <div>
    <SchintaMapLayerGeo
      name="waterSupplyRateLayer"
      :list="filterList"
      :list-style="style"
      idKey="ADDVCD"
      @click="itemClick"
    ></SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import Cq_qu_Json from "@/assets/json/chongqing_qu.json";
import division from "@/assets/json/division.json";
import { SchintaMapHelp } from "schinta-map";
import {
  getRateMap,
  getEvaluativeDimensionWaterSupply,
} from "@/views/panels/construction-management/mock/mock";
import { hideRegionNames, levelset } from "./rate-config";
import { formatNumber } from "@/utils/number-helper";
import {
  CQ_REGION_ID,
  getRegionIdByAd,
  paramsGetters,
} from "@/utils/map-helper";

export default {
  name: "WaterSupplyRateLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerGeo,
  },
  data() {
    return {
      list: [],
      style: (prop, _, resolution) => {
        const rate = prop.rate;
        const colorConfig = this.getLevelItem(rate);
        const isHide = rate == 100 || hideRegionNames.includes(prop.ADDVNM);
        return {
          text: {
            text:
              !isHide || resolution < 0.003
                ? formatNumber(rate, 1, "", "") + "\n" + prop.ADDVNM
                : "",
            overflow: true,
            fill: {
              color: "#fff",
            },
            offsetY: 0,
            textAlign: "center",
            font: `14px YouSheBiaoTiHei`,
          },
          stroke: {
            color: colorConfig.borderColor,
            width: 1,
          },
          fill: {
            color: colorConfig.color,
            opacity: 0.5,
          },
        };
      },
    };
  },
  computed: {
    ...paramsGetters(["regionId"]),
    filterList() {
      if (this.regionId === CQ_REGION_ID) return this.list;
      return this.list.filter(
        (it) => getRegionIdByAd(it.properties.ADDVCD) === this.regionId
      );
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    itemClick(event) {
      const addvcd = event.properties.ADDVCD;
      const regionId = getRegionIdByAd(addvcd);
      if (!regionId) return;
      this.setValues$({
        regionId,
      });
      this.$flyToRegion(regionId);
    },
    async getData() {
      const data = await getEvaluativeDimensionWaterSupply();
      getRateMap().then((map) => {
        this.list = Cq_qu_Json.features.map((it) => {
          return {
            ...it,
            properties: {
              ...it.properties,
              ...map[it.properties.ADDVCD],
              rate: this.getRate(map[it.properties.ADDVCD], data),
            },
          };
        });
      });
    },
    getLevelItem(val) {
      //   return (
      //     levelset.find((it) => val >= it.min && val <= it.max) || levelset[0]
      //   );
      if (!val) return levelset[0];
      if (val > 0 && val < 1) return levelset[0];
      if (val >= 1 && val < 1.1) return levelset[1];
      if (val >= 1.1 && val < 1.2) return levelset[2];
      if (val >= 1.2 && val < 1.3) return levelset[3];
      return levelset[4];
    },
    getRate(region, data) {
      const it = data.find((i) => i.regionName === region.addvcd_dictText);
      return it ? it.val : 100;
    },
  },
};
</script>

<style lang="less"></style>
