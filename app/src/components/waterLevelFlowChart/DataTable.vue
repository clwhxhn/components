<template>
  <div class="data-table" :class="theme">
    <div class="title-box">
      <div class="title">水位流量过程表</div>
      <div class="btn-export" @click="onExport">导出</div>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataList"
      bordered
      :scroll="{ y: '56vh' }"
      :pagination="pagination"
    ></a-table>
  </div>
</template>
<script>
export default {
  name: 'DataTable',
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pagination: {
        size: 'small', // 分页器大小
        pageSize: 10,
        showSizeChanger: true,
        total: this.dataList.length,
        showTotal: total => `共 ${total} 条`
      }
    }
  },
  watch: {
    dataList(val) {
      // this.pagination.current = 1
      this.pagination.total = val.length
    }
  },
  methods: {
    onExport() {
      this.$emit('export')
    }
  }
}
</script>
<style lang="less" scoped>
.data-table {
  .title-box {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  .title {
    flex-grow: 1;
    height: 22px;
    background-image: url('~@/assets/images/water-level-flow-chart/bg-subtitle.png');
    background-size: 100% 100%;
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    margin-right: 16px;
    padding-left: 24px;
  }
  .btn-export {
    cursor: pointer;
    width: 88px;
    height: 32px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
  }
  &.light {
    .title {
      color: #333;
    }
    .btn-export {
      background: #3377ff;
      border: 1px solid #ffffff;
      color: #ffffff;
    }

    /deep/ .ant-table-thead > tr > th,
    /deep/ .ant-table-tbody > tr > td,
    /deep/ .ant-table-tbody .ant-table-row td {
      color: #333;
      padding: 10px 12px;
      font-size: 14px;
      line-height: 16px;
    }
    /deep/ .ant-table-thead > tr > th {
      background: #dfe5ff;
    }
    /deep/ .ant-table-tbody .ant-table-row {
      &:nth-child(odd) {
        background: #fafafa;
      }
      &:nth-child(even) {
        background: #ffffff;
      }
    }
  }
  &.dark {
    .title {
      color: #ffffff;
    }
    .btn-export {
      background: linear-gradient(
        90deg,
        rgba(0, 51, 128, 0) -1%,
        rgba(0, 80, 184, 0.7) 49%,
        rgba(0, 51, 128, 0) 100%
      );
      border: 1px solid;
      border-image: linear-gradient(
        180deg,
        rgba(113, 184, 255, 0) 0%,
        #71b8ff 100%
      );
      box-shadow: inset 0px -4px 13px 0px rgba(107, 137, 255, 0.6);
      border-radius: 4px;
      color: #ffffff;
    }

    /deep/ .ant-table-thead > tr > th,
    /deep/ .ant-table-tbody > tr > td,
    /deep/ .ant-table-tbody .ant-table-row td {
      color: #ffffff;
      padding: 10px 12px;
      font-size: 14px;
      line-height: 16px;
    }
    /deep/ .ant-table-bordered .ant-table-thead > tr > th,
    /deep/ .ant-table-bordered .ant-table-tbody > tr > td {
      border-right: 1px solid #29598d;
      border-bottom: 1px solid #29598d;
    }
    /deep/ .ant-table-bordered .ant-table-header > table,
    /deep/ .ant-table-bordered .ant-table-body > table {
      border: 1px solid #29598d;
    }
    /deep/ .ant-table-thead > tr > th {
      background: #326295;
    }
    /deep/ .ant-table-tbody .ant-table-row {
      &:nth-child(odd) {
        background: #043d78;
      }
      &:nth-child(even) {
        background: #184c84;
      }
    }

    /* 修改行 hover 背景色 */
    /deep/ .ant-table-tbody > tr:hover > td {
      background: rgba(0, 80, 184, 0.5) !important;
    }

    /deep/ .ant-pagination,
    /deep/ .ant-pagination-item a {
      color: #fff;
    }
    /deep/ .ant-pagination-item-active {
      background: #006aff;
    }
    /deep/ .ant-pagination-item-ellipsis {
      color: #fff !important;
    }

    /deep/ .ant-pagination-prev a,
    /deep/ .ant-pagination-next a {
      color: #fff !important;
    }
    /deep/ .ant-pagination-disabled a,
    /deep/ .ant-pagination-disabled .ant-pagination-item-link {
      color: rgba(255, 255, 255, 0.6) !important;
    }
  }
}
</style>
