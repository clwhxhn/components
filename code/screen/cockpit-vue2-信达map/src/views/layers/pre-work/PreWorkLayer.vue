<template>
  <div>
    <PreWorkLayerX
      :list="showData"
      :params="params"
      @refresh="getData"
      :minZoom="minZoom"
      :cluster="cluster"
      @clusterClick="clusterClick"
    ></PreWorkLayerX>
  </div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import PreWorkLayerX from "./PreWorkLayerX.vue";
import { getAction } from "@/utils";
import { getProjectList } from "@/views/panels/construction-management/mock/mock";
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
import { compareShallow } from "../../../utils/object";
export default {
  name: "ProjectLayer",
  mixins: [SchintaMapHelp()],
  components: {
    PreWorkLayerX,
  },
  data() {
    return {
      dataSource: [],
      params: {},
      oldQueryParams: null,
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
    ...paramsGetters(["preWorkLayerQUeryParams"]),
  },
  watch: {
    preWorkLayerQUeryParams: {
      handler() {
        if (compareShallow(this.oldQueryParams, this.preWorkLayerQUeryParams))
          return;
        this.oldQueryParams = JSON.parse(
          JSON.stringify(this.preWorkLayerQUeryParams)
        );
        this.getData();
      },
      immediate: true,
      deep: true,
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
      getAction("/pcm/pcm.map/queryPreWorkMapEng", {
        typ: "",
        stage: "",
        ...this.preWorkLayerQUeryParams,
      }).then((res) => {
        res.result.forEach((it) => {
          it.engList.forEach((it) => {
            if (!it.longitude || !it.latitude) return;
            this.dataSource.push({
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
      });
    },
  },
};
</script>

<style scoped></style>
