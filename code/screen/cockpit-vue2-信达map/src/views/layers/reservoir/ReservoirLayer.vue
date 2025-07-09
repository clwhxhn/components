<template>
  <div>
    <ReservoirLayerX
      :list="showData"
      :params="params"
      @refresh="getData"
      :minZoom="minZoom"
      :cluster="cluster"
      @clusterClick="clusterClick"
    ></ReservoirLayerX>
  </div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import ReservoirLayerX from "./ReservoirLayerX.vue";
import { getAction } from "@/utils";
import { getProjectList } from "@/views/panels/construction-management/mock/mock";
import { CQ_REGION_ID } from "@/utils/map-helper";
export default {
  name: "ReservoirLayer",
  mixins: [SchintaMapHelp()],
  components: {
    ReservoirLayerX,
  },
  data() {
    return {
      dataSource: [],
      params: {},
    };
  },
  computed: {
    cluster() {
      return this.mapParamsValue$.regionId !== CQ_REGION_ID ? 40 : 0;
    },
    minZoom() {
      return this.mapParamsValue$.regionId !== CQ_REGION_ID
        ? 0
        : this.mapParamsValue$.visibleZoom;
    },
    currentMenu() {
      return this.mapParamsValue$.currentMenu;
    },
    regionId() {
      return this.mapParamsValue$.regionId;
    },
    reservoirMap() {
      return this.mapParamsValue$.reservoirMap || {};
    },
    showData() {
      return (this.dataSource || []).filter((i) => {
        return (
          this.regionId === CQ_REGION_ID ||
          i.properties.regionId === this.regionId
        );
      });
    },
  },
  watch: {},

  methods: {
    clusterClick(val) {
      if (val.features.length > 1) {
        const coordinate = val.event.coordinate;
        const zoom = this.getMapInstance$().getView().getZoom();
        this.flyTo$(coordinate, {
          maxZoom: zoom + 2,
        });
        this.getOverlayController$().clearOverlayGroup();
      }
    },
    getData() {
      this.dataSource = [];
      getAction("/roms/yg.rsvr.b/listAll", {}).then((res) => {
        this.getMapInstance$().getView().getResolutionForZoom(10);
        this.dataSource = res.result.map((i) => {
          return {
            geometry: {
              type: "Point",
              coordinates: [+i.longitude, +i.latitude],
            },
            properties: {
              ...i,
            },
          };
        });
      });
    },
  },
};
</script>

<style scoped></style>
