<template>
  <div></div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import division from "@/assets/json/division.json";
import { CQ_REGION_ID, MAP_CENTER } from "@/utils/map-helper";
export default {
  name: "ParamsWatcher",
  mixins: [SchintaMapHelp()],
  components: {},
  data() {
    return {};
  },
  computed: {
    regionId() {
      return this.mapParamsValue$.regionId;
    },
  },
  watch: {
    regionId: {
      handler(val) {
        if (val) {
          this.$emit("regionChange", this.regionId);
        }
      },
      immediate: true,
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="less"></style>
