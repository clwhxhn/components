<template>
  <PanelCard :offset-y="6" title="设施">
    <div class="facilities-card">
      <div
        @click="handleClick(it.key)"
        class="facilities-item"
        v-for="it in kpiList"
        :key="it.key"
      >
        <div class="item-name">{{ it.name }}</div>
        <div class="item-value">
          <ItemValue
            :showArrow="it.showArrow"
            :value="dataSource[it.key]"
            :unit="it.unit"
          ></ItemValue>
        </div>
        <div class="item-rate" v-if="it.rateKey">
          <span>达标率</span
          ><span class="rate">{{ $fn(dataSource[it.rateKey], 1) }}%</span>
        </div>
      </div>
    </div>
  </PanelCard>
</template>
<script>
import { showModal } from "@/components/easy-modal/modal";
import ItemValue from "@/components/ItemValue.vue";
import PanelCard from "@/components/PanelCard.vue";
import { getAction } from "@/utils";
import { paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";
import SkListModal from "./modal/SkListModal.vue";
import NcgsListModal from "./modal/NcgsListModal.vue";

const initData = {
  df: 3247.87,
  rate: 89.3,
};

export default {
  mixins: [SchintaMapHelp()],
  components: { PanelCard, ItemValue },
  data() {
    return {
      dataSource: {
        sk: 3067,
        df: 3247.87,
        ncgs: 1.51,
        zxgq: 153,
        rate: 89.3,
      },
      kpiList: [
        { name: "水库", unit: "座", key: "sk", showArrow: true },
        { name: "堤防", unit: "km", key: "df", rateKey: "rate" },
        { name: "农村供水", unit: "处", key: "ncgs", showArrow: true },
        { name: "中型灌区", unit: "个", key: "zxgq", showArrow: false },
      ],
    };
  },
  computed: {
    ...paramsGetters(["regionId"]),
  },
  mounted() {
    this.querySkCount();
    this.getNcgsCount();
  },
  watch: {
    regionId() {
      this.querySkCount();
      this.getNcgsCount();
      this.randomizeData();
    },
  },
  methods: {
    querySkCount() {
      getAction("/roms/yg.rsvr.b/list", {
        regionId: this.regionId,
        pageNo: 1,
        pageSize: 1,
      }).then((res) => {
        this.dataSource.sk = res.result.total;
      });
    },
    getNcgsCount() {
      getAction("/rws/rws/rwsWaterSupplyProjectHis/compareByYear", {
        preYear: 2023,
        behindYear: 2024,
        addvcd: "",
      }).then((res) => {
        this.dataSource.ncgs = res.result.total.totalCountBehind;
      });
    },
    handleClick(key) {
      if (key === "sk") {
        const { close } = showModal({
          title: '水库',
          component: SkListModal,
          width: 1026,
          position: "bottom",
          params: {
            onClick: (record) => {
              this.flyTo$([+record.lgtd, +record.lttd]).then(() => {
                const timer = setTimeout(() => {
                  close();
                  this.setOverlay$("reservoirLayer", record.id);
                  clearTimeout(timer);
                }, 100);
              });
            },
            regionId: this.regionId,
          },
        });
        this.$setCurLayers(["reservoirCountLayer", "reservoirLayer"], false);
      } else if (key === "ncgs") {
        const { close } = showModal({
          title: '农村供水',
          component: NcgsListModal,
          width: 1026,
          position: "bottom",
          params: {
            onClick: (record) => {
              this.setValues$({ activeWaterProjectId: record.id });
              this.flyTo$([+record.longitude, +record.latitude]).then(() => {
                const timer = setTimeout(() => {
                  close();
                  this.setOverlay$("waterProjectLayer", record.id);
                  clearTimeout(timer);
                }, 100);
              });
            },
            regionId: this.regionId,
          },
        });
        this.$setCurLayers(
          ["waterProjectCountLayer", "waterProjectLayer"],
          false
        );
      }
    },
    randomizeData() {
      Object.keys(initData).forEach((key) => {
        if (key === "sk") return;
        const randomInt = Math.floor(Math.random() * 6); // 0~5之间整数
        this.dataSource[key] = randomInt + initData[key];
      });
    },
  },
};
</script>
<style lang="less" scoped>
.facilities-card {
  display: flex;
  justify-content: space-between;
  .facilities-item {
    width: 120px;
    height: 60px;
    background-image: url(~@/assets/images-new/construction-management/review-improve/facilities-bg.png);
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 3px 5px 0;
    cursor: pointer;
    .item-name {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .item-value {
      line-height: 20px;
      margin-top: 3px;
    }
    .item-rate {
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #ffffff;
      line-height: 14px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      .rate {
        color: #ffef16;
      }
    }
  }
}
</style>
