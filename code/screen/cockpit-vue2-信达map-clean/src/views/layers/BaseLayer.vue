<template>
  <schinta-map-layer-tile-image
    name="baseLayer"
    z-index="1"
    :config="config"
    :url="url"
    :min-zoom="minZoom"
  ></schinta-map-layer-tile-image>
</template>

<script>
import { CQ_REGION_ID } from "@/utils/map-helper";
import { SchintaMapLayerTileImage } from "schinta-map";
import { SchintaMapHelp } from "schinta-map";
export default {
  name: "BaseLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerTileImage,
  },
  props: {
    url: {
      type: String,
      default: `https://hzz.slj.cq.gov.cn/tileservice/imagery/TianAerial/{z}/{x}/{y}`,
    },
    config: {
      type: Object,
      default: () => {
        return {
          projection: "EPSG:3857",
        };
      },
    },
  },
  computed: {
    minZoom() {
      return this.mapParamsValue$.regionId !== CQ_REGION_ID
        ? 20
        : this.mapParamsValue$.visibleZoom;
    },
    regionId() {
      return this.mapParamsValue$.regionId;
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
