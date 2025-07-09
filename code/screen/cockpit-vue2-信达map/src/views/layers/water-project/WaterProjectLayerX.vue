<template>
  <div>
    <SchintaMapLayerGeo
      v-bind="{
        ...$props,
        ...$attrs,
      }"
      v-on="$listeners"
      :list-style="listStyle"
      :layerStyle="layerStyle"
      :is-hover-overlay="isHoverOverlay"
      @clusterClick="clusterClick"
    >
      <template #overlay="{ properties }">
        <WaterProjectOverlay
          v-if="properties.addvName || (properties.features && properties.features.length == 1)"
          :properties="
            properties.addvName ? properties : properties.features[0]
          "
        ></WaterProjectOverlay>
      </template>
    </SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import WaterProjectOverlay from "./WaterProjectOverlay.vue";
export default {
  name: "WaterProjectLayerX",
  components: {
    SchintaMapLayerGeo,
    WaterProjectOverlay,
  },
  props: {
    overlayType: {
      type: String,
      default: "",
    },
    params: {
      type: Object,
      default: () => {},
    },
    cluster: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    },
    isHover: {
      type: Boolean,
      default: false,
    },
    isOverlay: {
      type: Boolean,
      default: true,
    },
    idKey: {
      type: String,
      default: "id",
    },
    name: {
      type: String,
      default: "waterProjectLayer",
    },
    currentSelectId: {},
  },
  data() {
    return {
      layerStyle: (prop, feature, resolution) => {
        let size = prop.features.length;
        let IMG = "";
        const projectName =
          prop.features[0].projectName || prop.features[0].values_.projectName;
        if (prop.features[0].engProTp == 1) {
          IMG = require("@/assets/images/engineering-operation/blue.svg");
        } else if (prop.features[0].engProTp == 2) {
          IMG = require("@/assets/images/engineering-operation/green.svg");
        } else if (prop.features[0].engProTp == 3) {
          IMG = require("@/assets/images/engineering-operation/yellow.svg");
        } else if (prop.features[0].engProTp == 4) {
          IMG = require("@/assets/images/engineering-operation/red.svg");
        } else {
          IMG = require("@/assets/images/engineering-operation/green.svg");
        }
        if (
          prop.features[0].izOnline == "1" ||
          (prop.features[0].values_ && prop.features[0].values_.izOnline == "1")
        ) {
          IMG = require("@/assets/images/engineering-operation/online1.png");
        }
        const id = prop.features[0].id || prop.features[0].values_.id;
        return {
          icon: {
            src:
              size === 1
                ? IMG
                : require("@/assets/images/engineering-operation/count_1.png"),
            scale: size === 1 ? 0.8 : 0.4,
            opacity: this.isSHow(resolution) ? 1 : 0,
          },
          text: {
            text: this.isSHow(resolution)
              ? size > 1
                ? `${size}`
                : this.currentSelectId === id
                ? projectName
                : ""
              : "",
            fill: {
              color: "#ffffff",
            },
            stroke: {
              color: "#000000",
            },
            offsetY: size === 1 ? 25 : 2,
          },
        };
      },
      listStyle: (prop, feature, resolution) => {
        // eslint-disable-next-line
        // console.log(prop, feature,resolution, "8888888")
        let IMG = "";
        if (prop.engProTp == 1) {
          IMG = require("@/assets/images/engineering-operation/blue.svg");
        } else if (prop.engProTp == 2) {
          IMG = require("@/assets/images/engineering-operation/green.svg");
        } else if (prop.engProTp == 3) {
          IMG = require("@/assets/images/engineering-operation/yellow.svg");
        } else if (prop.engProTp == 4) {
          IMG = require("@/assets/images/engineering-operation/red.svg");
        } else {
          IMG = require("@/assets/images/engineering-operation/green.svg");
        }
        return [
          {
            icon: {
              src: IMG,
              scale: 0.8,
              opacity: this.isSHow(resolution) ? 1 : 0,
            },
            text: {
              text: this.isSHow(resolution)
                ? this.currentSelectId === prop.id
                  ? prop.projectName
                  : ""
                : "",
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
    };
  },
  computed: {
    isHoverOverlay() {
      return false;
    },
  },
  methods: {
    isSHow(resolution) {
      return +resolution < 0.001696778046040496;
    },
    clusterClick(val) {
      this.$emit("clusterClick", val);
    },
  },
};
</script>

<style lang="less"></style>
