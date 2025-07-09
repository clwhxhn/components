<template>
  <div class="planning-layout-modal">
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
      <PlanningInfo
        :model="model"
        v-show="active === 'planningInfo'"
      ></PlanningInfo>
      <TargetIndicators
        :model="model"
        v-show="active === 'targetIndicators'"
      ></TargetIndicators>
      <PlanningProject
        @rowClick="onClick"
        :model="model"
        v-show="active === 'planningProject'"
      ></PlanningProject>
    </div>
  </div>
</template>
<script>
import { getAction } from "@/utils";
import { getPlanningDetail } from "../../mock/planning";
import PlanningInfo from "./components/PlanningInfo.vue";
import PlanningProject from "./components/PlanningProject.vue";
import TargetIndicators from "./components/TargetIndicators.vue";

export default {
  components: {
    PlanningInfo,
    TargetIndicators,
    PlanningProject,
  },
  props: {
    planId: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
    },
  },
  data() {
    return {
      active: "planningInfo",
      tabs: [
        { name: "规划概况", key: "planningInfo" },
        { name: "目标指标", key: "targetIndicators" },
        { name: "规划项目", key: "planningProject" },
      ],
      model: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    handleClick(it) {
      this.active = it.key;
    },
    fetchData() {
      // getPlanningDetail().then((res) => {
      //   this.model = res;
      // });
      getAction("/pcm/wpm.plan/query.by.id", { id: this.planId }).then(
        (res) => {
          this.model = res.result;
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
.planning-layout-modal {
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
    height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
