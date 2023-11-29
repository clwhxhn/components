<template>
  <div :class="bgClassName" class="kpi-box" :style="{ height: height }">
    <div
      v-for="(item, i) in list"
      :key="'kpi' + i"
      class="kpi-item"
      :style="{ marginLeft: i > 0 ? itemGap : '0px', cursor: hasClickEvent ? 'pointer' : 'default' }"
      @click.stop="itemClick(i)"
    >
      <img :src="item.icon" :style="{ height: imgHeight, width: imgWidth }" />
      <div class="item-text" :style="setItemText()">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-value" :style="{ color: valueColor }">
          {{ fmtValue(item.value) }}
          <span>{{ item.unit }}</span>
        </div>
      </div>
      <div v-if="hasDivider && i < list.length - 1" class="divider-div"></div>
    </div>
  </div>
</template>

<script>
import { fmtValue } from '@/utils/tiptool';

export default {
  name: 'KpiBox',
  components: {},
  props: {
    /**
     * kpi数据对象数据
     * {
     *  icon: '图片',
     *  label: '文本',
     *  value: 0,
     *  unit: '单位'
     * }
     */
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * kpi高度
     */
    height: {
      type: String,
      default: '68px',
    },
    /**
     * item间是否有分割线
     */
    hasDivider: {
      type: Boolean,
      default: false,
    },
    /**
     * 图片宽度
     */
    imgWidth: {
      type: String,
      default: '40px',
    },
    /**
     * 图片高度
     */
    imgHeight: {
      type: String,
      default: '43px',
    },
    /**
     * kpi值的颜色
     */
    valueColor: {
      type: String,
      default: '#FFC300',
    },
    /**
     * 背景图片类名  bgimg3、bgimg2
     */
    bgClassName: {
      type: String,
      default: 'bgimg3',
    },
    /**
     * 右边文本背景颜色
     */
    labelBgcolor: {
      type: String,
      default: '',
    },
    /**
     * 背景图片类名  bgimg3、bgimg2
     */
    itemGap: {
      type: String,
      default: '0px',
    },
    /**
     * kpi item能否有点击事件
     */
    hasClickEvent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    fmtValue,
    setItemText() {
      let style = `height:${this.imgHeight};`;
      if (this.labelBgcolor && this.labelBgcolor !== '') {
        style += `background-color: ${this.labelBgcolor}`;
      }
      return style;
    },
    /**
     * 面板点击
     * @param {*} index 下标
     */
    itemClick(index) {
      if (this.hasClickEvent) {
        this.$emit('itemClick', index);
      }
    },
  },
};
</script>

<style scoped lang="less">
.kpi-box {
  display: flex;
  align-items: center;
  justify-content: center;
  .kpi-item {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 10px;
    position: relative;
    .item-text {
      flex: 1;
      padding: 4px;
      margin-left: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000;
      line-height: 20px;
      .item-value {
        font-size: 22px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #ffffff;
        span {
          font-size: 14px;
        }
      }
    }
    .divider-div {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 1px;
      height: 37px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      border: 1px solid #4277bd;
    }
  }
}
// .bgimg3 {
//   background: url('~@/assets/img/water-resource/kpi-bg3.png') center center no-repeat;
//   background-size: 100% 100%;
// }
// .bgimg2 {
//   background: url('~@/assets/img/water-resource/kpi-bg2.png') center center no-repeat;
//   background-size: 100% 100%;
// }
</style>
