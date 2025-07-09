<template>
  <div>
    <!-- :layer-style="clusterStyle" -->
    <SchintaMapLayerGeo
      :zIndex="8"
      :name="name"
      :list="list"
      :list-style="style"
      :cluster="0"
      :is-hover="false"
      :is-overlay="true"
      :overlay-type="''"
      @refresh="refresh"
    >
      <template #overlay="{ properties }">
        <EngineeringOverlay :params="properties" />
      </template>
    </SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import { SchintaMapHelp } from "schinta-map";
import { getAction } from "@/utils";
import EngineeringOverlay from "./EngineeringOverlay.vue";
import { getQueryPlanMapEng } from "@/views/panels/construction-management/mock";

export default {
  name: "EngineeringLayer",
  components: {
    SchintaMapLayerGeo,
    EngineeringOverlay,
  },
  mixins: [SchintaMapHelp()],
  props: {},
  computed: {
    planId() {
      return this.mapParamsValue$.planId;
    },
  },
  watch: {
    planId(val) {
      this.getData();
    },
  },
  data() {
    return {
      list: [],
      name: "engineeringLayer",
      style: (prop, feature, resolution) => {
        // eslint-disable-next-line
        console.log(prop, feature, resolution, "8888888");
        const IMG = require(`@/assets/images-new/common/project-icon-1.png`);
        return [
          {
            icon: {
              src: IMG,
              scale: 0.8,
            },
            text: {
              text: prop.name,
              font: "12px Calibri, sans-serif",
              overflow: true,
              placement: "line",
              fill: {
                color: "#ffffff",
              },
              stroke: {
                color: "#000000",
                width: 2,
              },
              textAlign: "center",
              padding: [33, 3, 0, 3],
              offsetX: 0,
              offsetY: 24,
            },
          },
        ];
      },
      clusterStyle: (prop, feature, resolution) => {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.list = [];
      getQueryPlanMapEng().then(res => {
        res.forEach((it) => {
        it.engList.forEach((it) => {
          if (!it.longitude || !it.latitude) return;
          this.list.push({
            geometry: {
              type: "Point",
              coordinates: [+it.longitude, +it.latitude],
            },
            properties: {
              ...it,
            },
          });
        });
      });
      })
    },
    /**
     * @description: 更新图层
     * @return {*}
     */
    refresh(event) {
      this.$emit("refresh", event);
    },
    onClick(val) {},
  },
};
</script>

<style lang="less" scoped></style>
