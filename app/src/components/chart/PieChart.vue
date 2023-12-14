<template>
  <div class="pie-chart">
    <div class="pie">
      <BEcharts :option="option" style="width: 100%; height: 100%"> </BEcharts>
      <div class="total">567</div>
    </div>
    <div class="list">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <div>
          <i class="list-item-block" :style="{ backgroundColor: colors[index] }"></i>
          <span class="list-item-name">{{ item.name }}</span>
        </div>
        <div>
          <span class="list-item-value">{{ item.value | filterEmpty }}</span>
          <span class="list-item-unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BEcharts from '@/components/chart/BEcharts.vue';
const colors = ['#FF7070', '#F48135', '#31EABE'];

export default {
  components: {
    BEcharts,
  },
  data() {
    return {
      colors,
      list: [
        {
          name: '立即转移',
          value: 1,
          unit: '个',
        },
        {
          name: '准备转移',
          value: 1,
          unit: '个',
        },
        {
          name: '无预警',
          value: 1,
          unit: '个',
        },
      ],
      option: {},
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const data = [];
      this.list.forEach((i, idx) => {
        data.push(
          {
            value: i.value,
            name: i.name,
            itemStyle: {
              color: colors[idx % colors.length],
              borderWidth: 0,
            },
          },
          {
            value: 0.1,
            name: '',
            tooltip: {
              show: false,
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
              },
            },
          },
        );
      });
      this.option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          valueFormatter: (value) => `${value}个`,
        },
        title: {
          text: '预警数量',
          left: 'center',
          top: '37%',
          padding: [24, 0],
          textStyle: {
            color: '#fff',
            fontSize: 12,
            align: 'center',
          },
        },
        legend: {
          selectedMode: false,
          data: 190,
          left: 'center',
          top: 'center',
          icon: 'none',
          align: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16,
          },
        },
        series: [
          {
            name: '预警数量',
            type: 'pie',
            radius: ['80%', '94%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
    },
  },
};
</script>

<style lang="less" scoped>
.pie-chart {
  display: flex;
  padding: 0 19px 0 39px;
  .pie {
    width: 148px;
    height: 148px;
    margin-right: 34px;
    background: url('~@/assets/img/water-disasters-defense/pie-bg.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .total {
      width: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 26%;
      height: 10px;
      text-align: center;
      font-size: 28px;
      font-family: D-DIN, D-DIN;
      font-weight: bold;
      color: #f4c635;
    }
  }
  .list {
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &-item {
      display: flex;
      justify-content: space-between;
      height: 33px;
      background: url('~@/assets/img/water-disasters-defense/img-pie-list-bg.png') no-repeat center;
      background-size: 100% 100%;
      align-items: end;
      padding: 0 42px 0 21px;
      .list-item-block {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 16px;
        position: relative;
        top: -2px;
      }
      .list-item-name {
        font-size: 14px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      .list-item-value,
      .list-item-unit {
        font-size: 21px;
        font-family: DINAlternate, DINAlternate;
        font-weight: bold;
        color: #00ffff;
      }
      .list-item-unit {
        font-size: 14px;
        color: #ebf2ff;
      }
    }
  }
}
</style>