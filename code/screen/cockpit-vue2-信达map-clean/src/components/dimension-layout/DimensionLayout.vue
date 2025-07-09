<template>
  <div class="dimension-layout">
    <!-- 四维弹窗组件 -->
    <div class="modal-tabs">
      <div
        class="modal-tab"
        :class="{ 'is-active': activeTab === it.value }"
        v-for="it in tabList"
        :key="it.value"
        @click="handleClick(it)"
      >
        {{ it.label }}
      </div>
    </div>
    <div class="layout-content">
      <div
        class="tab-pane"
        v-for="it in tabList"
        :key="it.value"
        v-show="it.value === activeTab"
      >
        <slot :name="it.value" :isActive="activeTab === it.value"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    layout: {
      type: Array,
      default: () => ["detail", "business", "time", "judgement"],
    },
  },
  data() {
    return {
      activeTab: "",
      dimensionList: [
        { label: "明细维度", value: "detail" },
        { label: "业务维度", value: "business" },
        { label: "时间维度", value: "time" },
        { label: "评价维度", value: "judgement" },
      ],
    };
  },
  mounted() {
    this.activeTab = this.layout[0];
  },
  computed: {
    tabList() {
      return this.layout
        .map((it) => this.dimensionList.find((tab) => tab.value === it))
        .filter(Boolean);
    },
  },
  methods: {
    handleClick(tab) {
      this.activeTab = tab.value;
    },
  },
};
</script>
<style lang="less" scoped>
.dimension-layout {
  .modal-tabs {
    display: flex;
    .modal-tab {
      padding: 0 12px;
      line-height: 32px;
      font-size: 14px;
      font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
      font-weight: normal;
      color: #afccff;
      text-align: center;
      cursor: pointer;
      background-color: #081f41;
      border: 0.1px solid #42b5ea;
      &.is-active {
        color: #fff;
        background-image: url(~@/assets/images-new/construction-management/planning-layout/panel-tabs-bg.png);
        background-size: 100% 100%;
      }
    }
  }
  .layout-content {
    margin-top: 8px;
  }
}
</style>
