<template>
  <div>
    <div class="detail-tabs">
      <div
        class="tab-item"
        :class="activeKey === 'basic' ? 'active' : ''"
        @click="activeKey = 'basic'"
      >
        基础信息
      </div>
      <div
        class="tab-item"
        :class="activeKey === 'building' ? 'active' : ''"
        @click="activeKey = 'building'"
      >
        建筑物信息
      </div>
    </div>
    <div class="detail-content">
      <div class="scroll-content">
        <BasicInfo
          :reservoirId="reservoirId"
          v-show="activeKey === 'basic'"
        ></BasicInfo>
        <BuildingInfo
          :reservoirId="reservoirId"
          v-show="activeKey === 'building'"
        ></BuildingInfo>
      </div>
    </div>
  </div>
</template>

<script>
import BuildingInfo from "./BuildingInfo.vue";
import BasicInfo from "./BasicInfo.vue";
export default {
  name: "ReservoirDetail",
  components: { BasicInfo, BuildingInfo },
  props: {
    reservoirId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeKey: "basic",
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.detail-content {
  padding: 20px 0;
  .scroll-content {
    height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background: rgba(22, 139, 255, 0.32);
      border-radius: 2px;
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
}
.detail-tabs {
  display: flex;
  .tab-item {
    height: 40px;
    padding: 0 16px;
    background-size: 100% 100%;
    background-image: url("~@/assets/images/common/tab/tab-bg.png");
    line-height: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    margin-right: 4px;
    cursor: pointer;
    &.active {
      background-image: url("~@/assets/images/common/tab/tab-bg-active.png");
    }
  }
}
</style>
