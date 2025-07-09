<template>
  <div class="detail-dimension">
    <EasyTable
      contentHeight="460px"
      :columns="columns"
      :data-source="dataSource"
      :loading="tableLoading"
    ></EasyTable>
  </div>
</template>
<script>
import EasyTable from "@/components/easy-table/EasyTable.vue";
import { getAction, postAction } from "@/utils";
export default {
  components: { EasyTable },
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
          title: "项目数量",
          dataIndex: "engNum",
          align: "center",
        },
      ],
      dataSource: [],
      tableLoading: false,
    };
  },
  mounted() {
    this.tableLoading = true;
    getAction("/pcm/pcm.map/queryPreWorkRegionTable", {})
      .then((res) => {
        this.dataSource = res.result;
      })
      .finally(() => {
        this.tableLoading = false;
      });
  },
};
</script>
<style lang="less" scoped>
.detail-dimension {
  height: 500px;
  /deep/ .easy-table-content {
    height: 460px;
  }
}
</style>
