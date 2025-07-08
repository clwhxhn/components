<template>
  <!-- 质量检测单位-弹窗 -->
  <a-spin :spinning="loading">
    <div class="total-investment-modal">
      <EasyTable
        contentHeight="40vh"
        :columns="columns"
        :data-source="dataSource"
      ></EasyTable>
    </div>
  </a-spin>
</template>

<script>
import { formatNumber } from "@/utils/number-helper";
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { getAction } from "@/utils";

export default {
  components: {
    EasyTable,
  },
  props: {
    regionId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          width: 80,
          filter(_, row, i) {
            return i + 1;
          },
        },
        {
          title: "单位名称",
          dataIndex: "unitName",
          width: 300,
        },
        {
          title: "统一社会信用代码",
          dataIndex: "riunOde",
        },
        {
          title: "所属区划",
          dataIndex: "unitLoc_dictText",
        },
        {
          title: "资质信息",
          dataIndex: "qualificationLevel",
          filter(_, row, i) {
            const isEmpty = row.qualificationLevel === "" || undefined || null;
            return isEmpty ? "-" : row.qualificationLevel;
          },
        },
        {
          title: "成立日期",
          dataIndex: "openTime",
        },
      ],
      dataSource: [],
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      getAction("/pcm/unit/WctEntUnitBasis/listQualification", {
        unitLoc: this.regionId === '534996' ? '' : this.regionId, // 重庆传空
      })
        .then((res) => res.result || [])
        .then((res) => {
          this.dataSource = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.total-investment-modal {
  min-height: 30vh;
}
</style>
