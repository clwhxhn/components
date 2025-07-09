<template>
  <div>
    <SchintaMapLayerSuperMap
      name="riverLayer"
      :url="url"
      :config="{}"
      :min-zoom="minZoom"
    ></SchintaMapLayerSuperMap>
    <SchintaMapLayerSuperMap
      name="river2Layer"
      :url="url2"
      :config="{}"
      :min-zoom="minZoom"
    ></SchintaMapLayerSuperMap>
  </div>
</template>

<script>
import { CQ_REGION_ID } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";
import { SchintaMapLayerSuperMap } from "schinta-map";
export default {
  name: "RiverLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerSuperMap,
  },
  data() {
    return {
      url: "https://hzz.slj.cq.gov.cn/iserver/services/map-CQZHHZEQ/rest/maps/rv_main_500000_1@CQZHHZEQ",
      url2: "https://hzz.slj.cq.gov.cn/iserver/services/map-CQZHHZEQ/rest/maps/rv_main_500000_2@CQZHHZEQ",
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
