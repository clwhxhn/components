<template>
  <div class="map-menu"></div>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import LeftPanel from "../construction-management/LeftPanel.vue";
import RightPanel from "../construction-management/RightPanel.vue";
import TopPanel from "../construction-management/TopPanel.vue";
import BottomPanel from "../construction-management/BottomPanel.vue";
export default {
  components: {},
  mixins: [SchintaMapHelp()],
  data() {
    return {
      menuList: [
        {
          label: "菜单一",
          value: "0",
          leftPanel: LeftPanel,
          rightPanel: RightPanel,
          topPanel: TopPanel,
          bottomPanel: BottomPanel,
        },
      ],
    };
  },
  computed: {
    currentMenu() {
      return this.mapParamsValue$.currentMenu;
    },
  },
  watch: {},
  mounted() {
    this.onMenu(this.menuList[0]);
  },
  methods: {
    onMenu(menu) {
      this.setValues$({
        currentMenu: menu.value,
      });
      this.setLeftPanel$({
        component: menu.leftPanel,
      });
      this.setRightPanel$({
        component: menu.rightPanel,
      });
      this.setTopPanel$({
        component: menu.topPanel,
      });
      this.setBottomPanel$({
        component: menu.bottomPanel,
      });
      this.setPanelLayout$({
        zIndex: [200, 250, 300, 250],
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
