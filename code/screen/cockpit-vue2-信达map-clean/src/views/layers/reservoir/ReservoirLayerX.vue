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
        <ReservoirOverlay
          v-if="properties.rsName || properties.features.length === 1"
          :params="properties"
        ></ReservoirOverlay>
      </template>
    </SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import ReservoirOverlay from "./ReservoirOverlay.vue";
export default {
  name: "ReservoirLayerX",
  components: {
    SchintaMapLayerGeo,
    ReservoirOverlay,
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
      default: "reservoirLayer",
    },
  },
  data() {
    return {
      layerStyle: (prop) => {
        let size = prop.features.length;
        const rsName =
          prop.features[0].rsName || prop.features[0].values_.rsName;
        return {
          icon: {
            src:
              size === 1
                ? require(`@/assets/images/layer-icon/${
                    prop.isDanger === "1"
                      ? "reservoir-error"
                      : `${+prop.rsScale > 3 ? "reservoir-small" : "reservoir"}`
                  }.png`)
                : require("@/assets/images/construction-management/count_1.png"),
            scale: size === 1 ? 0.7 : 0.4,
            opacity: 1,
          },
          text: {
            text: size > 1 ? `${size}` : rsName,
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
      listStyle: (prop, a, xx) => {
        const overZoom = xx <= 0.001373291015625;

        return {
          icon: {
            src: require(`@/assets/images-new/common/project-icon-1.png`),
            scale: 0.5,
          },
          text: {
            text: prop.rsName,
            fill: {
              color: "#ffffff",
            },
            stroke: {
              color: "#000000",
            },
            offsetY: 25,
          },
        };
      },
    };
  },
  computed: {
    isHoverOverlay() {
      return false;
    },
  },
  methods: {
    clusterClick(val) {
      this.$emit("clusterClick", val);
    },
  },
};
</script>

<style lang="less"></style>
