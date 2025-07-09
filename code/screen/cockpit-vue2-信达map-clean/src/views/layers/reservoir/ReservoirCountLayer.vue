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
import { getProjectStatisticByRegion } from "@/views/panels/construction-management/mock/mock";
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
export default {
  name: "CountLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerGeo,
  },
  data() {
    return {
      list: [],
      layerName: "reservoirCountLayer",
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
    getAction("/roms/yg.rsvr.b/listAll", {  }).then(
      (res) => {
        const regionMap = {};
        res.result.forEach((it) => {
          // 重庆市本级的不上图
          if (it.regionId === CQ_REGION_ID) return;
          if (!division[it.regionId]) return;
          if (it.regionId in regionMap) {
            regionMap[it.regionId].bizCount++;
          } else {
            regionMap[it.regionId] = {
              bizCount: 1,
              regionId: it.regionId,
            };
          }
        });
        this.list = Object.values(regionMap).map((item) => {
          const region = division[item.regionId];
          return {
            geometry: {
              type: "Point",
              coordinates: region.center,
            },
            properties: {
              id: item.regionId,
              count: item.bizCount,
              regionName: region.shortName,
            },
          };
        });
      }
    );
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
      const regionId = event.properties.id;
      this.setValues$({
        regionId,
      });
      this.$flyToRegion(regionId);
    },
  },
};
</script>

<style lang="less"></style>
