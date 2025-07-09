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
        <PreWorkOverlay
          v-if="properties.name || (properties.features && properties.features.length === 1)"
          :params="properties.name ? properties : properties.features[0]"
        ></PreWorkOverlay>
      </template>
    </SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import PreWorkOverlay from "./PreWorkOverlay.vue";
export default {
  name: "PreWorkLayerX",
  components: {
    SchintaMapLayerGeo,
    PreWorkOverlay,
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
      default: "preWorkLayer",
    },
  },
  data() {
    return {
      layerStyle: (prop) => {
        let size = prop.features.length;
        const isDanger =
          prop.features[0].isDanger || prop.features[0].values_.isDanger;
        const rsScale =
          prop.features[0].rsScale || prop.features[0].values_.rsScale;
        const name = prop.features[0].name || prop.features[0].values_.name;
        return {
          icon: {
            src:
              size === 1
                ? require(`@/assets/images-new/common/project-icon-1.png`)
                : require("@/assets/images/construction-management/count_1.png"),
            scale: size === 1 ? 1 : 0.4,
            opacity: 1,
          },
          text: {
            text: size > 1 ? `${size}` : name,
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
            scale: 1,
          },
          text: {
            text: prop.name,
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
