<template>
  <!-- 水情专题图例 -->
  <div class="station-legend">
    <a-row class="row-title">
      <a-col span="12">图例</a-col>
    </a-row>
    <div class="body-content">
      <a-row type="flex" align="top">
        <a-col type="flex" span="12">
          <div
            v-for="(item, i) in list1"
            :key="'legenditem1' + i"
            class="legend-item"
          >
            <div class="legend-item-icon">
              <img
                v-if="item.path"
                :class="item.action ? 'actionClass' : ''"
                :src="item.path"
              />
              <span
                v-else
                :class="item.action ? 'actionClass' : ''"
                :style="{ backgroundColor: item.color }"
              ></span>
            </div>
            <div class="legend-item-text">{{ item.text }}</div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
const path = '/ss-basin-flood-prevention/img/flood-control-situation/'
const skImg = `${path}sk_3.png` // 水库站
const swImg = `${path}sq_swenz.png` // 水文站
export default {
  name: 'StationLegend',
  data() {
    return {
      list1: [
        {
          text: '水库',
          path: skImg,
          action: false
        },
        {
          text: '水文站',
          path: swImg,
          action: false
        },
        {
          text: '水位站',
          path: swImg,
          action: false
        },
        {
          text: '视频监控站',
          path: skImg,
          action: false
        },
        {
          text: '重点场镇',
          path: skImg,
          action: false
        },
        {
          text: '巡险风险点',
          path: null,
          action: true,
          color: 'yellow'
        },
        {
          text: '抢险风险点',
          path: null,
          action: true,
          color: 'orange'
        },
        {
          text: '避险转移风险点',
          path: null,
          action: true,
          color: 'red'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.station-legend {
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 160px;
  color: #3e454d;
  background: RGBA(226, 236, 246, 0.5);
  box-shadow: 0px 2px 4px 0px #eaebef;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  font-family: PingFangSC-Semibold, PingFang SC;

  .row-title {
    height: 40px;
    background: url('~@assets/images/flood-control-situation/searchTitle.png');
    background-size: 100% 100%;
    line-height: 40px;
    padding-left: 25px;
    font-size: 16px;
    font-weight: 600;
    color: #202020;
  }

  .body-content {
    padding: 0 10px;

    .legend-item {
      width: 140px;
      line-height: 32px;
      height: 32px;
      display: flex;
      align-items: center;

      .legend-item-icon {
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: auto;
        }
        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 100%;
        }
      }

      .legend-item-text {
        text-indent: 10px;
      }
    }
  }
}

.actionClass {
  animation: myzoom 1s infinite;
  -moz-animation: myzoom 1s infinite; /* Firefox */
  -webkit-animation: myzoom 1s infinite; /* Safari and Chrome */
  -o-animation: myzoom 1s infinite; /* Opera */
}

@keyframes myzoom {
  from {
    transform: scale(0.6, 0.6);
  }
  to {
    transform: scale(1, 1);
  }
}

@-moz-keyframes myzoom /* Firefox */ {
  from {
    transform: scale(0.6, 0.6);
  }
  to {
    transform: scale(1, 1);
  }
}

@-webkit-keyframes myzoom /* Safari and Chrome */ {
  from {
    transform: scale(0.6, 0.6);
  }
  to {
    transform: scale(1, 1);
  }
}

@-o-keyframes myzoom /* Opera */ {
  from {
    transform: scale(0.6, 0.6);
  }
  to {
    transform: scale(1, 1);
  }
}
</style>
