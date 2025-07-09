<template>
  <div>
    <WaterProjectLayerX
      :list="showData"
      :params="params"
      @refresh="getData"
      :minZoom="minZoom"
      :cluster="cluster"
      @clusterClick="clusterClick"
      @click="onClick"
      :currentSelectId="currentSelectId"
    ></WaterProjectLayerX>
  </div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import WaterProjectLayerX from "./WaterProjectLayerX.vue";
import { getAction } from "@/utils";
import { getProjectList } from "@/views/panels/construction-management/mock/mock";
import { CQ_REGION_ID } from "@/utils/map-helper";
import division from "@/assets/json/division.json";
import { paramsGetters } from "@/utils/map-helper";
import { requestWithCache } from "@/utils/pre-request/pre-request";

const divisionMap = {};
Object.values(division).forEach((it) => {
  divisionMap[it.addvcd] = it;
  divisionMap[it.name] = it;
});

export default {
  name: "WaterProjectLayer",
  mixins: [SchintaMapHelp()],
  components: {
    WaterProjectLayerX,
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
        if (this.regionId === CQ_REGION_ID) return true;
        const d =
          divisionMap[i.properties.addvName] ||
          divisionMap[i.properties.addvcd];
        return d && d.regionId === this.regionId;
      });
    },
    currentSelectId: {
      get() {
        return this.mapParamsValue$.activeWaterProjectId;
      },
      set(val) {
        this.setValues$({ activeWaterProjectId: val });
      },
    },
  },
  mounted() {
    console.log("waterProjectLayer mounted");
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
      } else {
        console.log("clusterClick:", val);
        this.clickOne(val.list[0].properties);
      }
    },
    onClick(val) {
      this.clickOne(val.properties);
    },
    clickOne(record) {
      this.currentSelectId = record.id;
    },
    getData() {
      this.dataSource = [];
      this.setValues$({ loading: true });
      requestWithCache({
        url: "/rws/rws/rwsWaterSupplyProject/getProjectInfoStat",
      })
        .then((res) => {
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
        })
        .finally(() => {
          // this.setValues$({ loading: false });
        });
    },
  },
};
</script>

<style scoped></style>
