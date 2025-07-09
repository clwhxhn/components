<template>
  <div>
    <SchintaMapLayerGeo
      :name="layerName"
      :list="list"
      :list-style="style"
      :cluster="0"
      :max-zoom="maxZoom"
      :is-hover="false"
      :is-overlay="false"
      @click="itemClick"
    ></SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import { SchintaMapHelp } from "schinta-map";
import { getAction } from "@/utils";
import division from "@/assets/json/division.json";
import CQ from "@/assets/json/chongqing_center.json";
import { getProjectStatisticByRegion } from "@/views/panels/construction-management/mock/mock";
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
export default {
  name: "WaterProjectCountLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerGeo,
  },
  data() {
    return {
      list: [],
      layerName: "waterProjectCountLayer",
      style: (prop, item, resolution) => {
        if (this.regionId !== CQ_REGION_ID) return [];
        const isMatch = this.isRegionMatch(prop, resolution);
        return [
          {
            text: {
              text: isMatch ? `${prop.count}` : "",
              fill: {
                color: "#ffffff",
              },
              stroke: {
                color: "#000000",
              },
              font: "13px D-DIN",
              padding: [0, 0, 0, 0],
              offsetY: -6,
            },
            icon: {
              src: require("@/assets/images/construction-management/count_1.png"),
              scale: 0.6,
              opacity: isMatch ? 1 : 0,
            },
          },
          {
            text: {
              text: isMatch ? `${prop.regionName}` : "",
              fill: {
                color: "#ffffff",
              },
              stroke: {
                color: "#000000",
              },
              font: "13px D-DIN",
              padding: [0, 0, 0, 0],
              offsetY: 10,
            },
          },
        ];
      },
    };
  },
  computed: {
    maxZoom() {
      return this.mapParamsValue$.visibleZoom;
    },
    ...paramsGetters(["regionId"]),
  },
  mounted() {
    const divisionCodeMap = {};
    CQ.forEach((it) => {
      divisionCodeMap[it.addvcd] = it;
    });
    getAction(
      "/rws/rws/rwsWaterSupplyProject/getProjectInfoStat/groupByRegion"
    ).then((res) => {
      // const regionMap = {};
      // res.result.forEach((it) => {
      //   if (!divisionCodeMap[it.countyCode]) return;
      //   if (it.countyCode in regionMap) {
      //     regionMap[it.countyCode].bizCount++;
      //   } else {
      //     regionMap[it.countyCode] = {
      //       bizCount: 1,
      //       countyCode: it.countyCode,
      //     };
      //   }
      // });
      this.list = [];
      res.result.forEach((item) => {
        const region = divisionCodeMap[item.countyCode];
        if (!region) return;
        const obj = {
          geometry: {
            type: "Point",
            coordinates: region.center,
          },
          properties: {
            id: item.countyCode,
            count: item.countNum,
            regionName: region.name,
          },
        };
        this.list.push(obj);
      });
    });
  },
  methods: {
    isRegionMatch(prop, resolution) {
      return (
        !["沙坪坝", "北碚", "江北", "南岸", "九龙坡"].includes(
          prop.regionName
        ) || +resolution < 0.0034
      );
    },
    itemClick(event) {
      const item = Object.values(division).find(
        (it) =>
          it.name === event.properties.regionName ||
          event.properties.id === it.addvcd
      );
      const regionId = item.regionId;
      this.setValues$({
        regionId,
      });
      this.$flyToRegion(regionId);
    },
  },
};
</script>

<style lang="less"></style>
