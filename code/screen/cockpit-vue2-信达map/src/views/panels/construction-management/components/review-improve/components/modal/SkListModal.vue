<template>
  <div style="width: 1000px">
    <div class="common-search-content mt-12 mb-4">
      <a-input
        v-model.trim="searchKey"
        style="width: 400px"
        placeholder="输入名称/编号查询"
        @keyup.enter="search"
      ></a-input>
      <div class="common-search-btns">
        <div class="common-search-btn" @click="reset">重置</div>
        <div class="common-search-btn primary" @click="search">搜索</div>
      </div>
    </div>
    <a-table
      class="common-dark-table"
      size="small"
      :columns="columns"
      :pagination="ipagination"
      :dataSource="tableData"
      @change="onChange"
      rowKey="id"
      :custom-row="customRow"
      :loading="loading"
    ></a-table>
  </div>
</template>

<script>
import { getAction } from "@/utils";
import { FlyToMixin } from "@/views/mixins/FlyToMixin";
import { SchintaMapHelp } from "schinta-map";
export default {
  name: "ReservoirTable",
  components: {},
  props: {
    onClick: {
      type: Function
    },
    regionId: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      searchKey: null,
      tableData: [],
      ipagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ["5", "10", "20", "50", "100", "500", "1000"],
        showQuickJumper: false,
        showSizeChanger: false,
        total: 0,
      },
      columns: [
        {
          title: "序号",
          dataIndex: "",
          key: "rowIndex",
          align: "center",
          ellipsis: true,
          customRender: function (t, r, index) {
            return index + 1;
          },
        },
        {
          title: "水库名称",
          dataIndex: "rsName",
          align: "center",
          ellipsis: true,
        },
        {
          title: "工程规模",
          dataIndex: "rsScale_dictText",
          align: "center",
          ellipsis: true,
        },
        {
          title: "行政区划",
          dataIndex: "regionName",
          align: "center",
          ellipsis: true,
          customRender: (text, record) =>
            `${record.addvnm3 || ""}${record.addvnm4 || ""}`,
        },
        {
          title: "注册码",
          dataIndex: "rsRegCode",
          align: "center",
          ellipsis: true,
        },
        {
          title: "安全类别",
          dataIndex: "safetyAppraisalType_dictText",
          align: "center",
          ellipsis: true,
        },
      ],
      layerName: "reservoirLayer",
      idKey: "id",
    };
  },
  methods: {
    reset() {
      this.searchKey = null;
      this.ipagination.current = 1;
      this.getData();
    },
    search() {
      this.ipagination.current = 1;
      this.getData();
    },
    onChange(pagination) {
      this.ipagination.current = pagination.current;
      this.getData();
    },
    /**
     *
     * @param flag 初次加载，用于渲染
     */
    getData(flag) {
      console.log(this.regionId)
      this.loading = true;
      getAction("/roms/yg.rsvr.b/list", {
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize,
        searchKey: this.searchKey || undefined,
        regionId: this.regionId,
        ...this.params,
      })
        .then((res) => res.result || {})
        .then((res) => {
          this.loading = false;
          this.tableData = res.records;
          this.ipagination.total = res.total;
        });
    },
    customRow(record) {
      return {
        on: {
          click: () => {
            this.onClick(record);
          },
        },
      };
    },
  },
  mounted() {
    this.getData(1);
  },
};
</script>

<style scoped lang="less"></style>
