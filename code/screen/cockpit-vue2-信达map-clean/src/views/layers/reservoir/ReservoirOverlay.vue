<template>
  <CommonOverlay :title="currentReservoir.rsName" width="300px">
    <CommonDescription :field-configs="fieldConfigs" :data-source="dataSource">
      <template #waterLevel>
        <span
          :style="{
            color:
              dataSource.waterLevelType_dictText && isRealData
                ? '#ff4747'
                : '#ffffff',
          }"
          >{{
            dataSource["waterLevel"]
              ? `${dataSource["waterLevel"]}m`
              : "-" | ValidFill
          }}
          {{
            dataSource["tm"]
              ? `(${moment(dataSource["tm"]).format(dateFormat)})`
              : ""
          }}</span
        >
        <span
          class="warning-tag"
          v-if="dataSource.waterLevelType_dictText && isRealData"
          >{{ dataSource.waterLevelType_dictText }}</span
        >
      </template>
    </CommonDescription>
    <template #action>
      <div class="btn-item" @click="detailClick">详情</div>
    </template>
  </CommonOverlay>
</template>

<script>
import CommonOverlay from "@/views/components/CommonOverlay.vue";
import CommonDescription from "@/views/components/CommonDescription.vue";
import { getAction } from "@/utils";
import moment from "moment";
import { showModal } from "@/components/easy-modal/modal";
import ReservoirDetail from './reservoir-detail/ReservoirDetail.vue'

export default {
  name: "ReservoirOverlay",
  components: { CommonOverlay, CommonDescription },
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentReservoir: {},
      dateFormat: "YYYY-MM-DD",
      dataSource: {},
      isRealData: false,
      fieldConfigs: [
        {
          title: "工程规模",
          dataIndex: "rsScale_dictText",
        },
        {
          title: "所在区县",
          dataIndex: "addvnm3",
        },
        {
          title: "管理单位",
          dataIndex: "manageUnitName",
        },
        {
          title: "实时水位",
          dataIndex: "waterLevel",
        },
      ],
    };
  },
  methods: {
    moment,
    detailClick() {
      showModal({
        width: 1100,
        component: ReservoirDetail,
        title: '水库详情',
        params: {
          reservoirId: this.currentReservoir.id,
        },
      });
    },
  },
  mounted() {
    // 判断是聚合图层还是非聚合图层
    if (this.params.rsName) {
      this.currentReservoir = this.params;
    } else {
      this.currentReservoir = this.params.features[0];
    }
    getAction(`/roms/wpo.led/findCardById`, {
      rsId: this.currentReservoir.id,
    })
      .then((res) => {
        return res.result || {};
      })
      .then((res) => {
        this.dataSource = {
          ...res,
          waterCapacityRate: res.waterCapacityRate
            ? `${Math.round(res.waterCapacityRate * 10000) / 100}%`
            : "-",
        };
        this.isRealData =
          this.dataSource.tm &&
          moment().diff(moment(this.dataSource.tm), "day") < 1;
        if (+this.dataSource.rsScale <= 3) {
          this.fieldConfigs = [
            {
              title: "工程规模",
              dataIndex: "rsScale_dictText",
            },
            {
              title: "所在区县",
              dataIndex: "addvnm3",
            },
            {
              title: "管理单位",
              dataIndex: "manageUnitName",
            },
            {
              title: "实时水位",
              dataIndex: "waterLevel",
            },
            {
              title: "蓄水率",
              dataIndex: "waterCapacityRate",
            },
          ];
        }
      });
  },
};
</script>

<style scoped lang="less">
.btn-item {
  width: 64px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
  font-size: 16px;
  color: #00ffff;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/common/overlay-btn-bg.png");
  cursor: pointer;
}
.warning-tag {
  display: inline-block;
  background: linear-gradient(270deg, #dd0000 0%, #480000 97%);
  border-radius: 1px solid #ff5656;
  line-height: 20px;
  padding: 0 3px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}
</style>
