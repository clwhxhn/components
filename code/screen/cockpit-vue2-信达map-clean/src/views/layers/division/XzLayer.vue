<template>
  <div>
    <SchintaMapLayerSuperMap
      name="xzLayer"
      :url="url"
      :config="{}"
      :min-zoom="minZoom"
    ></SchintaMapLayerSuperMap>
  </div>
</template>

<script>
import { CQ_REGION_ID } from "@/utils/map-helper";
import { SchintaMapLayerSuperMap } from "schinta-map";
import { SchintaMapHelp } from "schinta-map";
export default {
  name: "XzLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerSuperMap,
  },
  data() {
    return {
      url: "https://hzz.slj.cq.gov.cn/iserver/services/map-CQZHHZEQ/rest/maps/ad_xz@CQZHHZEQ",
    };
  },
  computed: {
    minZoom() {
      return this.mapParamsValue$.regionId !== CQ_REGION_ID
        ? 20
        : this.mapParamsValue$.visibleZoom;
    },
  },
  methods: {},
};
</script>

<style lang="less"></style>
