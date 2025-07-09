<template>
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
import { getWaterUtilizeDetails } from "../../../mock/mock";

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
          dataIndex: "regionName",
          width: 400,
        },
        {
          title: "水资源开发利用率（%）",
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
      getWaterUtilizeDetails().then((res) => {
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
