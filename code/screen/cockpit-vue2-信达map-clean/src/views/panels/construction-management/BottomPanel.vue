<template>
  <transition name="translate">
    <div class="bottom-panel" v-show="!collapseBottom">
        <span style="color: #fff;">底部</span>
    </div>
  </transition>
</template>

<script>
import { SchintaMapHelp } from "schinta-map";
import { paramsGetters } from "@/utils/map-helper";
export default {
  name: "BottomPanel",
  mixins: [SchintaMapHelp()],

  components: {
  },
  data() {
    return {};
  },
  computed: paramsGetters(["collapseBottom"]),
  methods: {},
};
</script>

<style scoped lang="less">
.bottom-panel {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translate(-50%);
  width: 634px;
  z-index: 300;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  .link-list {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    pointer-events: none;
    .link-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      pointer-events: all;
      .link-item-icon {
        width: 40px;
        height: 46px;
        background-image: url("~@/assets/images/warning/icon-2.png");
      }
      .link-item-label {
        font-weight: 500;
        font-size: 12px;
        color: #00ffff;
      }
    }
  }
  .bottom-box {
    width: 634px;
    height: 123px;
    display: flex;
    flex-direction: column;
    .warning-list {
      margin-top: 4px;
      width: 100%;
      flex: 1;
      display: flex;
      .warning-list-left {
        width: 46px;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        .left-tab-item {
          width: 46px;
          height: 40px;
          display: flex;
          align-items: center;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          line-height: 16px;
          color: #ffffff;
          padding: 6px 4px 4px 2px;
          background-image: url("~@/assets/images/warning/bg-3.png");
          margin-bottom: 4px;
          &.active {
            background-image: url("~@/assets/images/warning/bg-4.png");
          }
        }
      }
      .warning-list-right {
        width: calc(100% - 46px);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 3px;
      }
      .warning-item {
        width: 100%;
        height: 40px;
        background-size: 100% 100%;
        background-position: 0 0;
        background-repeat: no-repeat;
        background-image: url("~@/assets/images/warning/bg-2.png");
        cursor: pointer;
        margin-bottom: 4px;
        display: flex;
        align-items: center;

        .item-icon {
          margin-left: 11px;
          background-image: url("~@/assets/images/warning/icon-1.png");
          background-size: 100% 100%;
          width: 21px;
          height: 21px;
          margin-right: 9px;
        }
        .item-label {
          font-weight: 500;
          font-size: 14px;
          color: #ff4747;
          margin-right: 20px;
        }
        .item-text {
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          width: 400px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .level-list {
      height: 32px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      .level-item {
        width: 140px;
        height: 32px;
        padding: 0 10px 0 41px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.level-item-1 {
          background-size: 17px 16px, 100% 100%;
          background-position: 10px center, 0 0;
          background-repeat: no-repeat, no-repeat;
          background-image: url("~@/assets/images/warning/level-1.png"),
            url("~@/assets/images/warning/level-1-bg.png");
          .item-value {
            color: #ee4150;
          }
        }
        &.level-item-2 {
          background-size: 17px 16px, 100% 100%;
          background-position: 10px center, 0 0;
          background-repeat: no-repeat, no-repeat;
          background-image: url("~@/assets/images/warning/level-2.png"),
            url("~@/assets/images/warning/level-2-bg.png");
          .item-value {
            color: #ff8446;
          }
        }
        &.level-item-3 {
          background-size: 17px 16px, 100% 100%;
          background-position: 10px center, 0 0;
          background-repeat: no-repeat, no-repeat;
          background-image: url("~@/assets/images/warning/level-3.png"),
            url("~@/assets/images/warning/level-3-bg.png");
          .item-value {
            color: #ffef16;
          }
        }
        &.level-item-4 {
          background-size: 17px 16px, 100% 100%;
          background-position: 10px center, 0 0;
          background-repeat: no-repeat, no-repeat;
          background-image: url("~@/assets/images/warning/level-4.png"),
            url("~@/assets/images/warning/level-4-bg.png");
          .item-value {
            color: #16d8ff;
          }
        }
        .item-label {
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
        }
        .item-value {
          font-family: D-DIN-DIN, D-DIN-DIN;
          font-weight: bold;
          font-size: 24px;
          text-wrap-mode: nowrap;
        }
      }
    }
  }
}

.translate-enter-active,
.translate-leave-active {
  transition: all 0.3s;
}

.translate-enter,
.translate-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%);
}
</style>
