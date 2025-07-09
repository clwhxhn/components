<template>
  <div>
    <SchintaMapLayerGeo
      name="qxLayer"
      :list="list"
      :list-style="style"
      idKey="ADDVCD"
    ></SchintaMapLayerGeo>
  </div>
</template>

<script>
import { SchintaMapLayerGeo } from "schinta-map";
import Cq_qu_Json from "@/assets/json/chongqing_qu.json";
import division from "@/assets/json/division.json";
import { SchintaMapHelp } from "schinta-map";
export default {
  name: "XzLayer",
  mixins: [SchintaMapHelp()],
  components: {
    SchintaMapLayerGeo,
  },
  data() {
    return {
      list: Cq_qu_Json.features,
      style: (prop) => {
        return prop.ADDVCD === this.currentAddvcd
          ? {
              stroke: {
                color: "#f7d98b",
                width: 2,
              },
              fill: {
                color: "rgba(1, 150, 234, 0)",
              },
              text: {
                text: prop.ADDVSNM,
                font: "14px normal",
                padding: [2, 5, 2, 5],
                fill: {
                  color: "#ffffff",
                },
                backgroundFill: {
                  color: "rgba(19,147,194,0.5)",
                },
                backgroundStroke: {
                  color: "rgba(95, 212, 254, 1)",
                  width: 1,
                },
              },
            }
          : this.currentAddvcd
          ? {
              stroke: {
                color: "rgba(249, 218, 140,0)",
                width: 1,
              },
              fill: {
                color: "rgba(59,156,253,0)",
              },
            }
          : {
              stroke: {
                color: "rgba(249, 218, 140,0.5)",
                width: 1,
              },
              fill: {
                color: "rgba(59,156,253,0.15)",
              },
            };
      },
    };
  },
  computed: {
    regionId() {
      return this.mapParamsValue$.regionId;
    },
    currentAddvcd() {
      return division[this.regionId] ? division[this.regionId].addvcd : null;
    },
  },
  methods: {},
};
</script>

<style lang="less"></style>
