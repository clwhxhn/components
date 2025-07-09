<template>
  <!-- 行政区划选择 -->
  <div class="division-select" @click.stop="showPanel = !showPanel">
    <div class="division-icon"></div>
    <div class="division-name">{{ title }}</div>
    <div class="division-arrow"></div>

    <div class="division-select-dropdown" :class="showPanel ? '' : 'hidden'">
      <div class="select-scroll-content" @click.stop="undefined">
        <a-input v-model.trim="searchKey" placeholder="请输入关键字搜索" />
        <template v-for="item in options">
          <div
            v-show="!searchKey || item.label.includes(searchKey)"
            class="select-item"
            :key="item.value"
            :class="item.value === regionId ? 'active' : ''"
            @click.stop="change(item.value)"
          >
            {{ item.label }}
          </div>
        </template>
      </div>
    </div>
    <!-- <div @click.stop="handleJumpBiz" class="arrow-tag">进入业务系统</div> -->
  </div>
</template>

<script>
import division from "@/assets/json/division.json";
import { getRefreshToken } from "@/utils";
import { CQ_REGION_ID } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";
export default {
  name: "DivisionSelect",
  mixins: [SchintaMapHelp()],
  components: {},
  data() {
    return {
      options: [],
      regionMap: {},
      showPanel: false,
      searchKey: "",
    };
  },
  computed: {
    title() {
      return this.regionMap[this.regionId] || "重庆市";
    },
    regionId() {
      return this.mapParamsValue$.regionId;
    },
  },
  mounted() {
    this.options = [
      {
        label: "重庆市",
        value: CQ_REGION_ID,
      },
      ...Object.keys(division).map((key) => {
        this.regionMap[key] = division[key].name;
        return {
          label: division[key].name,
          value: key,
        };
      }),
    ];
  },
  methods: {
    // 选择完成回调
    change(val) {
      this.setValues$({
        regionId: val,
      });
      this.searchKey = "";
      this.showPanel = false;
      this.$flyToRegion(val);
    },
    handleJumpBiz() {
      const url = `${
        process.env.VUE_APP_MANAGE_SYSTEM_URL
      }#login?refresh_token=${getRefreshToken()}`;
      console.log(url)
      window.open(url);
    },
  },
};
</script>

<style scoped lang="less">
.division-select {
  position: absolute;
  top: 12px;
  right: 162px;
  margin-top: 12px;
  align-self: flex-start;
  width: 176px;
  height: 32px;
  background-image: url("~@/assets/images/layout/division-bg.png");
  display: flex;
  align-items: center;
  padding: 0 30px 0 26px;
  font-weight: 600;
  pointer-events: all;
  cursor: pointer;

  /deep/ .ant-input,
  /deep/ .ant-select .ant-select-selection {
    border: 0;
    color: #d1e2ff;
    font-family: Alibaba-PuHuiTi, Alibaba-PuHuiTi;
    font-weight: normal;
    background: none;
    border: 1px solid #0783fa;
    background-size: 100% 100%;
    .ant-calendar-range-picker-separator,
    .ant-select-arrow-icon {
      color: #d1e2ff;
    }
  }

  .division-icon {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-image: url("~@/assets/images/layout/position.png");
  }
  .arrow-tag {
    cursor: pointer;
    position: absolute;
    top: -0px;
    right: -138px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #afe9ff;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    width: 139px;
    height: 32px;
    background-image: url(~@/assets/images-new/construction-management/construction-dynamics/tag-bg.png);
    background-size: 100% 100%;
    line-height: 28px;
    text-indent: 4px;
  }
  .division-name {
    font-size: 16px;
    color: #ffffff;
    line-height: 32px;
    flex: 1;
  }
  .division-arrow {
    flex-shrink: 0;
    width: 20px;
    height: 16px;
    background-image: url("~@/assets/images/layout/division-arrow.png");
    transform: translateY(2px);
  }

  .division-select-dropdown {
    position: absolute;
    left: 12px;
    top: 40px;
    width: 140px;
    height: 194px;
    background: rgba(0, 51, 102, 0.8);
    box-shadow: inset 0px -2px 6px 0px #2296f0;
    border-image: linear-gradient(
        180deg,
        rgba(68, 131, 235, 0),
        rgba(68, 131, 235, 0.82),
        rgba(50, 169, 255, 1)
      )
      1 1;
    padding: 7px 0;
    pointer-events: all;
    transition: all 300ms;
    &.hidden {
      pointer-events: none;
      opacity: 0;
      top: -50px;
    }
    .select-scroll-content {
      width: 100%;
      max-height: 180px;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none !important;
      }
      .select-item {
        height: 28px;
        line-height: 28px;
        padding-left: 30px;
        font-weight: 500;
        color: #ffffff;
        font-size: 16px;
        cursor: pointer;
        &:hover,
        &.active {
          color: #51f4c4;
          background: rgba(14, 77, 140, 0.4);
          box-shadow: inset 0px -4px 4px 0px rgba(8, 206, 249, 0.5);
          border-radius: 0px 0px 0px 0px;
          border: 1px solid;
          border-image: linear-gradient(
              180deg,
              rgba(8, 206, 249, 0.21),
              rgba(8, 206, 249, 1)
            )
            1 1;
        }
      }
    }
  }
}
</style>
