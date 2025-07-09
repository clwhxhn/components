<template>
  <!-- 供水安全系数 弹窗 -->
  <div class="water-supply-modal">
    <div class="modal-tabs">
      <div
        class="modal-tab"
        :class="{ 'is-active': active === it.key }"
        v-for="it in tabs"
        :key="it.key"
        @click="handleClick(it)"
      >
        {{ it.name }}
      </div>
    </div>
    <div class="tab-content">
      <DetailDimension v-show="active === 'detailDimension'" />
      <TimeDimension v-if="active === 'timeDimension'" />
      <EvaluativeDimension v-if="active === 'evaluativeDimension'" />
    </div>
  </div>
</template>

<script>
import DetailDimension from "./DetailDimension.vue";
import TimeDimension from "./TimeDimension.vue";
import EvaluativeDimension from "./EvaluativeDimension.vue";
export default {
  components: {
    DetailDimension,
    TimeDimension,
    EvaluativeDimension,
  },
  data() {
    return {
      active: "detailDimension",
      tabs: [
        { name: "明细维度", key: "detailDimension" },
        { name: "时间维度", key: "timeDimension" },
        { name: "评价维度", key: "evaluativeDimension" },
      ],
    };
  },
  methods: {
    handleClick(it) {
      this.active = it.key;
    },
  },
};
</script>

<style lang="less" scoped>
.water-supply-modal {
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
  .tab-content {
    margin-top: 10px;
    max-height: 600px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
