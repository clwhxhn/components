import { SchintaMapHelp } from "schinta-map";
export const CardMixin = {
  mixins: [SchintaMapHelp()],
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
        this.getData(val);
      },
      immediate: true,
    },
  },
  methods: {
    getData() {},
  },
};
