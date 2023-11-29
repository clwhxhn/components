<template>
  <!-- 实时水情 -->
  <div class="water-regimen-container">
    <div class="header">实时水情</div>
    <div class="water-regimen-body">
      <div class="water-regimen-search">
        <a-input-search
          v-model="stName"
          allowClear
          placeholder="请输入站点名称搜索"
          style="width: 100%; margin-bottom: 5px"
          @search="onSearch"
        />
      </div>
      <div class="water-regimen-table">
        <div class="table-header">
          <div v-for="(item, key) in columns" :key="key">
            {{ item.title }}
            <template v-if="item.unit">
              <br />
              ( {{ item.unit }})
            </template>
          </div>
        </div>
        <div class="table-box">
          <Tabel-Play
            :tableData="tableData"
            @itemClick="itemClick"
            :columns="columns"
            :canPlay="false"
          ></Tabel-Play>
        </div>
      </div>
      <div class="pagination-box">
        <a-pagination v-model="pageNo" :total="total" :page-size="pageSize" @change="onChange" show-less-items />
      </div>
    </div>
  </div>
</template>

<script>
import TabelPlay from '../TabelPlay'
// import { getAction } from '@/api/manage'

export default {
  components: {
    TabelPlay
  },
  created() {
    this.getData()
  },
  data() {
    return {
      stName: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'customIndex'
        },
        {
          title: '点位',
          dataIndex: 'name'
        },
        {
          title: '水位',
          unit: 'm',
          dataIndex: 'waterLevel'
        },
        {
          title: '查险水位',
          unit: 'm',
          dataIndex: 'patrolz'
        },
        {
          title: '避险水位',
          unit: 'm',
          dataIndex: 'avoidz'
        },
        {
          title: '数据时间',
          dataIndex: 'time'
        }
      ],
      tableData: [
        {
          index: 0,
          dw: 0,
          sw: 0,
          cxsw: 0,
          bxsw: 0,
          tm: 0
        }
      ],
      pageNo: 1,
      pageSize: 15,
      total: 0
    }
  },
  methods: {
    onSearch() {
      this.tableData = []
      this.pageNo = 1
      this.getData()
    },
    itemClick() {},
    getData() {
    //   getAction('/basin.flood.prevention/bfpEmePlan/currentWaterSituation', {
    //     pageNo: this.pageNo,
    //     pageSize: this.pageSize,
    //     stName: this.stName
    //   }).then(res => {
    //     console.log('res: ', res);
    //     if(res.success) {
    //       this.total = res.result.total
    //       this.tableData = res.result.records.map((rec,i) => {
    //         return {
    //           customIndex: i,
    //           ...rec
    //         }
    //       })
    //     }
    //   })
    },
    onChange() {
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.water-regimen-container {
  display: flex;
  flex-direction: column;
  .water-regimen-body {
    flex: 1;
    position: relative;
    .water-regimen-search {
      padding: 10px 10px;
    }
    .water-regimen-table {
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      .table-header {
        display: flex;
        height: 50px;
        background: #cfe2ff;
        margin-bottom: 2px;
        & > div {
          font-size: 16px;
          font-family: Alibaba-PuHuiTi-M, Alibaba-PuHuiTi;
          font-weight: normal;
          color: #000;
          line-height: 24px;
          display: flex;
          align-items: center;
        }
        div:nth-child(1) {
          width: 10%;
        }
        div:nth-child(2) {
          width: 25%;
        }
        div:nth-child(3) {
          width: 16%;
        }
        div:nth-child(4) {
          width: 16%;
        }
        div:nth-child(5) {
          width: 16%;
        }
        div:nth-child(6) {
          width: 17%;
        }
      }
      .table-box {
        flex: 1;
      }
    }
    .pagination-box {
      text-align: right;
      padding: 0 10px;
      position: absolute;
      bottom: 10px;
      z-index: 101;
      right: 0;
    }
  }
}
</style>
