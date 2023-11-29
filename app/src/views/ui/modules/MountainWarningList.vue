<template>
  <div class="mountain-warning-list">
    <div class="tab">
      <div
        class="tab-item"
        :class="{ active: tabIndex === idx }"
        v-for="(tab, idx) in tabList"
        :key="idx"
        @click="onTabAcitve(idx)"
      >
        {{ tab.title }}
      </div>
    </div>

    <div class="table">
      <div class="table-tr">
        <div class="table-td">沿河村落</div>
        <div class="table-td">水位（m）</div>
        <div class="table-td">通知转移水位（m）</div>
        <div class="table-td">时间</div>
      </div>
      <div class="table-tr" v-for="(ds, idx) in datasource" :key="idx">
        <div class="table-td">
          <a-tooltip class="addr" :title="ds.addr">{{ ds.addr }}</a-tooltip>
        </div>
        <div class="table-td">
          {{ ds.wl }}
        </div>
        <div class="table-td">
          {{ ds.qwl }}
        </div>
        <div class="table-td">
          {{ ds.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MountainWarningList',
  data() {
    return {
      tabIndex: 0,
      tabList: [
        {
          title: '通知转移',
          value: 1,
        },
        {
          title: '准备转移',
          value: 2,
        },
        {
          title: '立即转移',
          value: 3,
        },
      ],

      datasource: [
        {
          addr: ' 长滩镇1组',
          wl: 20.0,
          qwl: 22,
          time: '2023-10-07 11:00',
        },
        {
          addr: ' 龙驹花坪村2组',
          wl: 20.0,
          qwl: 22,
          time: '2023-10-07 11:00',
        },
        {
          addr: '龙驹龙溪村',
          wl: 20.0,
          qwl: 22,
          time: '2023-10-07 11:00',
        },
        {
          addr: ' 长滩镇土门村',
          wl: 20.0,
          qwl: 22,
          time: '2023-10-07 11:00',
        },
        {
          addr: '长岭青石社区6组',
          wl: 20.0,
          qwl: 22,
          time: '2023-10-07 11:00',
        },
        {
          addr: '新田义和1组',
          wl: 20.0,
          qwl: 22,
          time: '2023-10-07 11:00',
        },
      ],
    };
  },
  methods: {
    onTabAcitve(idx) {
      this.tabIndex = idx;
    },
  },
};
</script>

<style lang="less" scoped>
@import url('~@/views/ui/icon/tab.less');
@import url('~@/views/ui/icon/table.less');

.table-td {
  flex: 1;
}
</style>
