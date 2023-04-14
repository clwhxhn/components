
<template>
    <div>
      <!-- 滚动的表格 -->
      <div class="right-panel-wrap-table">
        <div class="table-header">
          <div v-for="(item, key) in columns" :key="key">{{ item.title }}</div>
        </div>
        <div class="table-tbody">
          <Tabel-Play :tableData="tableData" tabletype="warn"></Tabel-Play>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TabelPlay from "../components/TablePlay/TabelPlay.vue";
  export default {
    name: "Home",
    components: {
      TabelPlay,
    },
    data() {
      return {
        columns: [
          {
            title: "测站名称",
            dataIndex: "name",
            width: "40%",
          },
          {
            title: "瞬时流量(m³/h)",
            dataIndex: "alarmMomentFlow",
          },
          {
            title: "小时水量(m³)",
            dataIndex: "alarmFlow",
          },
          {
            title: "监测时间",
            dataIndex: "beginTime",
          },
        ],
        tableData: [],
      };
    },
    created() {
      for (let i = 0; i < 50; i++) {
        this.tableData.push({
          name: "站点" + i,
          alarmMomentFlow: "1212",
          alarmFlow: "9090",
          beginTime: "2023-10-10",
        });
      }
    },
  };
  </script>
  
  <style lang="less" scoped>
  @import "~@/assets/less/torem.less";
  .right-panel-wrap-table {
    color: #fff;
    .table-header {
      .px2rem(height, 42);
      .px2rem(line-height, 42);
      .px2rem(font-size, 18);
      .px2rem(margin-top, 20);
      display: flex;
      border-bottom: 1px solid #89abd2;
      background: linear-gradient(
        180deg,
        rgba(0, 129, 255, 0.15) 0%,
        rgba(0, 113, 255, 0.19) 100%
      );
      border-radius: 5px 5px 0px 0px;
  
      div:nth-child(1) {
        width: 29%;
      }
      div:nth-child(2) {
        width: 23%;
      }
      div:nth-child(3) {
        width: 23%;
      }
      div:nth-child(4) {
        width: 25%;
      }
      div::before {
        display: inline-block;
        content: "";
        width: 6px;
        height: 6px;
        background: #1198ff;
        margin-bottom: 2px;
        margin-right: 10px;
        border-radius: 50%;
        .px2rem(margin-left, 25);
      }
    }
    .table-tbody {
      .px2rem(height, 328);
      overflow: hidden;
    }
  
    /deep/.ant-table-thead > tr > th {
      background: linear-gradient(
        180deg,
        rgba(0, 129, 255, 0.15) 0%,
        rgba(0, 113, 255, 0.19) 100%
      );
      color: #ddf8ff;
      .px2rem(font-size, 18);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      border-bottom: 1px solid #2f93ff;
    }
    /deep/ .ant-table-body table {
      border-collapse: separate;
      border-spacing: 0px 10px;
    }
    /deep/.ant-table-thead > tr > th .ant-table-column-sorter {
      display: none;
    }
    /deep/.ant-table-tbody .ant-table-row td {
      border-top: 1px solid #89abd2;
      border-bottom: 1px solid #89abd2;
    }
    /deep/.ant-table-tbody .ant-table-row td:first-child {
      border-left: 1px solid #89abd2;
    }
    /deep/.ant-table-tbody .ant-table-row td:last-child {
      border-right: 1px solid #89abd2;
    }
    /deep/.ant-table-thead > tr > th,
    /deep/.ant-table-tbody > tr > td {
      padding: 0;
    }
    /deep/.ant-table-thead {
      height: 40px;
    }
    /deep/.ant-table-tbody > tr {
      height: 40px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    /deep/.ant-table-thead .ant-table-selection {
      display: none;
    }
  }
  </style>