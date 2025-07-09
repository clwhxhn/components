<template>
  <!-- 供水安全系数 弹窗（明细维度） -->
  <div class="detail-dimension">
    <EasyTable
      contentHeight="460px"
      :columns="columns"
      :data-source="dataSource"
    ></EasyTable>
  </div>
</template>

<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { getWaterSupplyDetails } from "../../../mock/mock";

export default {
  components: {
    EasyTable,
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
          title: "区划名称",
          dataIndex: "region",
          width: 400,
        },
        {
          title: "供水安全系数",
          dataIndex: "val",
          align: "center",
          filter(_, row) {
            return `${_}`;
          },
        },
        // {
        //   title: "",
        //   dataIndex: "empty",
        //   align: "right",
        //   width: 200
        // },
      ],
      dataSource: [],
    };
  },
  mounted() {
      getWaterSupplyDetails().then((res) => {
        this.dataSource = res;
      });
  },
};
</script>

<style lang="less" scoped>
.detail-dimension {
  height: 500px;
}
</style>
