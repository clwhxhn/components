<template>
  <div
    :class="[
      `common-${position}-panel-wrapper`,
      { 'transparent-bg': transparentBg },
    ]"
  >
    <div
      :class="[collapseSide ? 'is-collapsed' : '', `common-${position}-panel`]"
    >
      <div class="common-panel-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { paramsGetters } from "@/utils/map-helper";
import { SchintaMapHelp } from "schinta-map";

export default {
  name: "CommonPanel",
  components: {},
  mixins: [SchintaMapHelp()],
  props: {
    position: {
      type: String,
      default: "left",
    },
    transparentBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: paramsGetters(["collapseSide"]),
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.transparent-bg {
  &.common-left-panel-wrapper {
    padding-left: 8px;
    background: linear-gradient(
      90deg,
      #002548 0%,
      rgba(1, 50, 96, 0.66) 61%,
      rgba(0, 89, 174, 0) 100%
    );
    &::before {
      opacity: 0;
    }
    .common-left-panel {
      width: 480px;
      padding: 8px 12px 0 9px;
      background: rgba(0, 41, 89, 0.64);
      border-radius: 0px 0px 0px 0px;
      border: 1px solid;
      border-image: linear-gradient(
          270deg,
          rgba(55, 155, 255, 1),
          rgba(36, 95, 209, 0)
        )
        1 1;
    }
  }
  &.common-right-panel-wrapper {
    padding-right: 8px;
    background: linear-gradient(
      270deg,
      #002548 0%,
      rgba(1, 50, 96, 0.66) 61%,
      rgba(0, 89, 174, 0) 100%
    );
    &::before {
      opacity: 0;
    }
    .common-right-panel {
      width: 480px;
      padding: 8px 9px 0 12px;
      background: rgba(0, 41, 89, 0.64);
      border-radius: 0px 0px 0px 0px;
      border: 1px solid;
      border-image: linear-gradient(
          90deg,
          rgba(55, 155, 255, 1),
          rgba(36, 95, 209, 0)
        )
        1 1;
    }
  }
}
.common-panel-content {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  user-select: none;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
.common-left-panel-wrapper {
  padding-top: 72px;
  padding-left: 20px;
  padding-bottom: 18px;
  height: 100%;
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    background-image: url("~@/assets/images/layout/bg.png");
    opacity: 0.3;
    z-index: -1;
  }
  .common-left-panel {
    height: 100%;
    width: 560px;
    opacity: 1;
    padding: 0;
    position: relative;
    background: rgba(0, 41, 89, 0.64);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid;
    border-image: linear-gradient(
        313deg,
        rgba(55.35376153886318, 155.17686367034912, 255, 1),
        rgba(35.78762345016003, 94.72402274608612, 209.12987977266312, 0),
        rgba(
          79.77017596364021,
          137.12468594312668,
          248.45982134342194,
          0.7599999904632568
        )
      )
      1 1;
    transition: width 0.3s;
    &.is-collapsed {
      width: 0;
      border: none;
    }
  }
}
.common-right-panel-wrapper {
  padding-top: 72px;
  padding-right: 20px;
  padding-bottom: 18px;
  height: 100%;
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-position: calc(596px - 1920px) 0;
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    background-image: url("~@/assets/images/layout/bg.png");
    opacity: 0.3;
    z-index: -1;
  }
  .common-right-panel {
    height: 100%;
    width: 560px;
    opacity: 1;
    padding: 0;
    position: relative;
    background: rgba(0, 41, 89, 0.64);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid;
    border-image: linear-gradient(
        313deg,
        rgba(55.35376153886318, 155.17686367034912, 255, 1),
        rgba(35.78762345016003, 94.72402274608612, 209.12987977266312, 0),
        rgba(
          79.77017596364021,
          137.12468594312668,
          248.45982134342194,
          0.7599999904632568
        )
      )
      1 1;
    transition: width 0.3s;
    &.is-collapsed {
      width: 0;
      border: none;
    }
  }
}
</style>
