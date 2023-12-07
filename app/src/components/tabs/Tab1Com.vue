<template>
  <div class="tab">
    <div
      class="tab-item"
      :class="{ active: tabIndex === idx }"
      v-for="(tab, idx) in tabList"
      :key="idx"
      @click="onTabAcitve(idx)"
    >
      {{ tab.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      tabList: [
        {
          title: "雨量预报预警",
          value: 1,
        },
        {
          title: "水位监测预警",
          value: 4,
        },
      ],
    };
  },
  methods: {
    onTabAcitve(idx) {
      this.tabIndex = idx;
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.tab {
  display: flex;

  &-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;

    &.active {
      background: url("~@/assets/img/water-disasters-defense/tab-active.png")
        no-repeat center;
      background-size: 100% 100%;
      background-position-y: 15px;
      color: aqua;
    }
  }
}
</style>