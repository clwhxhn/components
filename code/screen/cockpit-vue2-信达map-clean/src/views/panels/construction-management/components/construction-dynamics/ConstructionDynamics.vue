<template>
  <div class="construction-dynamics">
    <SectionHeader>建设动态</SectionHeader>
    <div @click="handleJump" class="arrow-tag">数字孪生工程平台</div>
    <div class="construction-dynamics content">
      <div class="search-bar">
        <EasySelect
          :disabled="disabledRegionSelector"
          v-model="internalRegionId"
          :options="divisionOptions"
          placeholder="区域(市级/区县)"
        ></EasySelect>
        <EasySelect
          clearable
          v-model="typ"
          placeholder="项目类型"
          :options="typOptions"
        ></EasySelect>
      </div>
      <!-- 进度 -->
      <ProcessCard :region-id="internalRegionId" :typ="typ"></ProcessCard>
      <!-- 安全 -->
      <SafetyCard></SafetyCard>
      <!-- 质量 -->
      <QualityCard></QualityCard>
      <!-- 市场 -->
      <MarketCard></MarketCard>
    </div>
  </div>
</template>
<script>
import EasySelect from "@/components/easy-select/EasySelect.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import ProcessCard from "./components/ProcessCard.vue";
import SafetyCard from "./components/SafetyCard.vue";
import QualityCard from "./components/QualityCard.vue";
import MarketCard from "./components/MarketCard.vue";
import { CQ_REGION_ID, paramsGetters } from "@/utils/map-helper";
import division from "@/assets/json/division.json";
import { SchintaMapHelp } from "schinta-map";
import { getDictOptions } from "@/utils/dict";
import { getRefreshToken, postAction } from "@/utils";

export default {
  components: {
    SectionHeader,
    EasySelect,
    ProcessCard,
    SafetyCard,
    QualityCard,
    MarketCard,
  },
  mixins: [SchintaMapHelp()],
  data() {
    const typOptions = getDictOptions("cmis_engineering_typ");
    return {
      divisionOptions: [],
      internalRegionId: this.regionId,
      typOptions,
      typ: null,
    };
  },
  computed: {
    ...paramsGetters(["regionId"]),
    // 只有全局区域选中重庆的时候才允许改变面板内的区域
    disabledRegionSelector() {
      return this.regionId !== CQ_REGION_ID;
    },
  },
  watch: {
    regionId: {
      handler(val) {
        // 全局的区域改变时，面板内的区域id需要自动同步
        this.internalRegionId = val;
      },
      immediate: true,
    },
  },
  mounted() {
    this.divisionOptions = [
      {
        label: "重庆市",
        value: CQ_REGION_ID,
      },
      ...Object.keys(division).map((key) => {
        return {
          label: division[key].name,
          value: key,
        };
      }),
    ];
  },
  methods: {
    handleJump() {
      const refreshToken = getRefreshToken();
      postAction("/auth/login", {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).then((res) => {
        const jti = res.result.jti;
        window.open("http://10.55.52.229:9090/menuPage/progress?code=" + jti);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.construction-dynamics {
  margin-top: 10px;
  position: relative;
  .arrow-tag {
    cursor: pointer;
    position: absolute;
    top: -6px;
    right: 0;
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #afe9ff;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    width: 139px;
    height: 32px;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/tag-bg.png);
    background-size: 100% 100%;
    line-height: 28px;
    text-indent: 4px;
  }
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .easy-select {
      width: 266px;
    }
  }
}
</style>
