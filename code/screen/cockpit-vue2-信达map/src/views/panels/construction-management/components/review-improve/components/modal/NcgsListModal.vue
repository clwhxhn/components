<template>
  <div style="width: 1000px">
    <div class="common-search-content mt-12 mb-4">
      <a-input
        v-model.trim="searchKey"
        style="width: 400px"
        placeholder="输入名称查询"
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
import { getDictText } from "@/utils/dict";

export default {
  name: "ReservoirTable",
  components: {},
  props: {
    onClick: {
      type: Function,
    },
    regionId: {
      type: String,
    },
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
          title: "水厂名称",
          dataIndex: "projectName",
          align: "center",
          ellipsis: true,
        },
        {
          title: "所属区县",
          dataIndex: "addvName",
          align: "center",
          ellipsis: true,
        },
        {
          title: "工程类型",
          dataIndex: "engProTp",
          align: "center",
          ellipsis: true,
          customRender: (text) => {
            return getDictText("rws_eng_pro_type", text);
          },
        },
        {
          title: "设计供水规模（m³/d）",
          dataIndex: "desScale",
          align: "center",
          ellipsis: true,
        },
        {
          title: "水源名称",
          dataIndex: "waterSourceName",
          align: "center",
          ellipsis: true,
        },
      ],
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
      this.loading = true;
      getAction("/rws/rws/rwsWaterSupplyProject/getProjectInfoStat/page", {
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize,
        projectName: this.searchKey || undefined,
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
