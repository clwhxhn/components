<template>
  <div class="early-advance">
    <SectionHeader>前期推进</SectionHeader>
    <div class="early-advance-content">
      <PanelCard title="前期工作">
        <div class="early-advance-header" @click="handleDataClick">
          <i class="header-icon"></i>
          <span class="header-title">项目储备量</span>
          <ItemValue :value="dataSource.totalNum" show-arrow></ItemValue>
        </div>
        <div class="early-advance-tabs">
          <div
            class="early-advance-tab"
            :class="{ 'is-active': preWorkLayerQUeryParams.typ === it.typ }"
            v-for="it in dataSource.typKpiList"
            :key="it.key"
            @click="handleChangeTab(it.typ)"
          >
            {{ it.typName }}
          </div>
        </div>
        <div
          class="early-advance-tab-content"
          :class="['tab-conent-' + preWorkLayerQUeryParams.typ]"
        >
          <div
            class="content-item"
            :class="{
              'is-active': preWorkLayerQUeryParams.stage == it.stage,
            }"
            v-for="it in stageList"
            :key="it.stage"
            @click="handleChangeStatge(it.stage)"
          >
            <span class="border-tl"></span>
            <span class="border-tr"></span>
            <span class="border-bl"></span>
            <span class="border-br"></span>
            <span class="content-label">{{ it.stageName }}</span>
            <span class="content-value primary-text bold">{{ it.num }}</span>
          </div>
        </div>
      </PanelCard>
    </div>
  </div>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import PanelCard from "@/components/PanelCard.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import ProjectDimensions from "./components/ProjectDimensions.vue";
import { SchintaMapHelp } from "schinta-map";
import { getAction, postAction } from "@/utils";
import { paramsGetters } from "@/utils/map-helper";
import ItemValue from "@/components/ItemValue.vue";

export default {
  mixins: [SchintaMapHelp()],
  components: { SectionHeader, PanelCard, ItemValue },
  data() {
    return {
      dataSource: {
        totalNum: 0,
        typKpiList: [
          {
            typ: "10",
            typName: "水网及骨干水源工程",
            stageList: [
              {
                stage: "10",
                stageName: "规模论证",
                num: 0,
              },
              {
                stage: "20",
                stageName: "规划方案",
                num: 0,
              },
              {
                stage: "30",
                stageName: "可研阶段",
                num: 0,
              },
              {
                stage: "40",
                stageName: "初设阶段",
                num: 0,
              },
              {
                stage: "50",
                stageName: "实施阶段",
                num: 0,
              },
              {
                stage: "60",
                stageName: "已竣工",
                num: 0,
              },
            ],
          },
          {
            typ: "20",
            typName: "防洪减灾工程",
            stageList: [
              {
                stage: "10",
                stageName: "规模论证",
                num: 0,
              },
              {
                stage: "20",
                stageName: "规划方案",
                num: 0,
              },
              {
                stage: "30",
                stageName: "可研阶段",
                num: 0,
              },
              {
                stage: "40",
                stageName: "初设阶段",
                num: 0,
              },
              {
                stage: "50",
                stageName: "实施阶段",
                num: 0,
              },
              {
                stage: "60",
                stageName: "已竣工",
                num: 0,
              },
            ],
          },
          {
            typ: "30",
            typName: "其他工程",
            stageList: [
              {
                stage: "10",
                stageName: "规模论证",
                num: 0,
              },
              {
                stage: "20",
                stageName: "规划方案",
                num: 0,
              },
              {
                stage: "30",
                stageName: "可研阶段",
                num: 0,
              },
              {
                stage: "40",
                stageName: "初设阶段",
                num: 0,
              },
              {
                stage: "50",
                stageName: "实施阶段",
                num: 0,
              },
              {
                stage: "60",
                stageName: "已竣工",
                num: 0,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    ...paramsGetters(["regionId", "preWorkLayerQUeryParams"]),
    stageList() {
      const item = this.dataSource.typKpiList.find(
        (it) => it.typ == this.preWorkLayerQUeryParams.typ
      );
      if (item) {
        return item.stageList;
      }
      return [];
    },
  },
  watch: {
    regionId() {
      this.queryKpiData();
    },
  },
  mounted() {
    this.queryKpiData();
  },
  methods: {
    handleChangeTab(key) {
      this.preWorkLayerQUeryParams.typ = key;
      this.preWorkLayerQUeryParams.stage = "";
      this.$setCurLayers(["preWorkCountLayer", "preWorkLayer"]);
    },
    handleChangeStatge(stage) {
      if (this.preWorkLayerQUeryParams.stage === stage) {
        this.preWorkLayerQUeryParams.stage = "";
      } else {
        this.preWorkLayerQUeryParams.stage = stage;
      }
      this.$setCurLayers(["preWorkCountLayer", "preWorkLayer"]);
    },
    handleDataClick() {
      showModal({
        title: "项目储备量",
        component: ProjectDimensions,
      });
      this.$setCurLayers(["preWorkCountLayer", "preWorkLayer"]);
    },
    queryKpiData() {
      postAction(
        "/pcm/pcm.map/queryPreWorkKpi",
        {},
        { regionId: this.regionId }
      ).then((res) => {
        if (res.success) {
          this.dataSource = res.result;
          if (!this.preWorkLayerQUeryParams.typ) {
            this.preWorkLayerQUeryParams.typ =
              this.dataSource.typKpiList[0].typ;
          }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.early-advance {
  margin-top: 8px;
  .early-advance-header {
    cursor: pointer;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(~@/assets/images-new/construction-management/early-advance/header-bg.png);
    background-size: 100% 100%;
    .header-icon {
      width: 16px;
      height: 16px;
      background-image: url(~@/assets/images-new/construction-management/early-advance/header-icon.png);
      background-size: 100% 100%;
      margin-right: 2px;
    }
    .header-title {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin: 0 8px;
    }
  }
  .early-advance-tabs {
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    .early-advance-tab {
      width: 160px;
      height: 32px;
      background-image: url(~@/assets/images-new/construction-management/early-advance/tab-bg.png);
      background-size: 100% 100%;
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      line-height: 32px;
      cursor: pointer;
      &.is-active {
        background-image: url(~@/assets/images-new/construction-management/early-advance/tab-bg-active.png);
        color: #fef85f;
      }
    }
  }
  .early-advance-tab-content {
    height: 106px;
    background-size: 100% 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 14px 6px 0;
    &.tab-conent-10 {
      background-image: url(~@/assets/images-new/construction-management/early-advance/tab-content-bg-1.png);
    }
    &.tab-conent-20 {
      background-image: url(~@/assets/images-new/construction-management/early-advance/tab-content-bg-2.png);
    }
    &.tab-conent-30 {
      background-image: url(~@/assets/images-new/construction-management/early-advance/tab-content-bg-3.png);
    }
    .content-item {
      cursor: pointer;
      width: 156px;
      height: 38px;
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 0 15px;
      background: radial-gradient(
          85% 93% at 128% 100%,
          rgba(0, 229, 255, 0.19) 0%,
          rgba(0, 149, 255, 0) 100%
        ),
        rgba(0, 114, 228, 0.37);
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.is-active {
        .content-label {
          color: #00ffff;
        }
      }
    }
    .border-tl {
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 4px;
      border-top: 1px solid #72daff;
      border-left: 1px solid #72daff;
    }
    .border-tr {
      position: absolute;
      top: 0;
      right: 0;
      width: 4px;
      height: 4px;
      border-top: 1px solid #72daff;
      border-right: 1px solid #72daff;
    }
    .border-bl {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 4px;
      height: 4px;
      border-bottom: 1px solid #72daff;
      border-left: 1px solid #72daff;
    }
    .border-br {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 4px;
      height: 4px;
      border-bottom: 1px solid #72daff;
      border-right: 1px solid #72daff;
    }
    .content-label {
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>
