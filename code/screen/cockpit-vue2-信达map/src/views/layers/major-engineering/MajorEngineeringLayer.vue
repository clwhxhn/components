<template>
  <div>
    <MajorEngineeringLayerX
      :list="showData"
      :params="params"
      @refresh="getData"
      :minZoom="minZoom"
      :cluster="cluster"
      @clusterClick="clusterClick"
    ></MajorEngineeringLayerX>
  </div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import MajorEngineeringLayerX from "./MajorEngineeringLayerX.vue";
import { getAction } from "@/utils";
import { getProjectList, getQueryWrEngineeringMap } from "@/views/panels/construction-management/mock/mock";
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
import { requestWithCache } from "@/utils/pre-request/pre-request";
export default {
  name: "MajorEngineeringLayer",
  mixins: [SchintaMapHelp()],
  components: {
    MajorEngineeringLayerX,
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
          i.properties.regionId === this.regionId ||
          i.properties.addvcd === this.regionId
        );
      });
    },
  },

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
       getQueryWrEngineeringMap().then(res => {
        res.forEach((it) => {
          it.engList.forEach((it) => {
            if (!it.lon || !it.lat) return;
            this.dataSource.push({
              geometry: {
                type: "Point",
                coordinates: [+it.lon, +it.lat],
              },
              properties: {
                ...it,
              },
            });
          });
        });
       })
    },
  },
};
</script>

<style scoped></style>
