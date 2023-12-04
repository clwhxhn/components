<template>
  <!-- 沿河村落-overlay-基础信息 -->
  <div class="basic-information">
    <div class="basic-information-content1">
      <div>
        人口(人):
        <span class="value">209</span>
      </div>
      <div>
        户数(户):
        <span class="value">90</span>
      </div>
      <div>
        河流名称:
        <span class="value">xx河</span>
      </div>
      <div>
        水系名称:
        <span class="value">长江</span>
      </div>
      <div>
        流域面积(km²):
        <span class="value">9.88</span>
      </div>
      <div>
        洪水比降(%):
        <span class="value">19.88</span>
      </div>
    </div>
    <div class="basic-information-content2">
      <table class="table-main">
        <thead>
          <tr>
            <td>沿河村落名称</td>
            <td>成灾重现期（年）</td>
            <td>时段</td>
            <td>临界雨量（mm）</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="4">沿河村落1</td>
            <td rowspan="4">10</td>
            <td>1h</td>
            <td>20</td>
          </tr>
          <tr>
            <td>1h</td>
            <td>20</td>
          </tr>
          <tr>
            <td>1h</td>
            <td>20</td>
          </tr>
          <tr>
            <td>1h</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  components: {
  },
  data() {
    return {
      columns: [
        {
          title: '沿河村落名称',
          dataIndex: 'tm',
        },
        {
          title: '成灾重现期（年）',
          dataIndex: 'rain',
        },
        {
          title: '时段',
          dataIndex: 'rain',
        },
        {
          title: '临界雨量（mm）',
          dataIndex: 'rain',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.basic-information {
  &-content1 {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
    font-weight: normal;
    color: #c0d7ff;
    line-height: 30px;
    margin-bottom: 22px;
    & > div {
      width: 33.33%;
    }
    .value {
      color: #bed9e3;
      margin-left: 8px;
    }
  }
  &-content2 {
    .table-main {
      width: 100%;
      font-size: 14px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #ddfeff;
      border-collapse: collapse;
      text-align: center;
      thead {
        font-size: 16px;
        font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
        font-weight: normal;
        color: #5fd4fe;
        line-height: 22px;
        border: 1px solid #22558f;
        tr {
          td {
            background-color: #22558F;
          }
          td:not(:last-child) {
            border-right: 2px solid #143866;
          }
        }
      }
      tbody td {
        border: 1px solid rgba(77, 196, 255, 0.5);
      }
      tr {
        height: 33px;
      }
    }
  }
}
</style>
