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
import { requestWithCache } from "@/utils/pre-request/pre-request";
export default {
  name: "MajorEngineeringCountLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerGeo,
  },
  data() {
    return {
      list: [],
      layerName: "majorEngineeringCountLayer",
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
    this.getData();
  },
  methods: {
    getData() {
      requestWithCache({
        url: "/pcm/pcm.map/queryWrEngineeringMap",
      }).then((res) => {
        this.list = res.result
          .map((item) => {
            if (item.engList.length == 0) return null;
            const region = division[item.regionId];
            if (!region) return null;
            return {
              geometry: {
                type: "Point",
                coordinates: region.center,
              },
              properties: {
                id: item.regionId,
                count: item.engList.length,
                regionName: region.shortName,
              },
            };
          })
          .filter(Boolean);
      });
    },
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
