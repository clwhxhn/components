<template>
  <transition @after-leave="handleClosed" name="fade">
    <div
      @click="handleClose"
      v-if="visible"
      :style="{ zIndex }"
      class="easy-modal-mask"
    >
      <div
        @click.stop
        :style="{ width: styleWidth }"
        :class="['easy-modal', 'easy-modal-' + position]"
      >
        <div class="modal-header">
          <div class="modal-title">{{ title }}</div>
          <span @click="handleClose" class="modal-close"></span>
        </div>
        <div class="modal-content">
          <dialog-body v-bind="params"></dialog-body>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
      default: 800,
    },
    zIndex: {
      type: Number,
      required: true,
    },
    /**
     * 弹窗位置（目前仅支持center bottom）
     */
    position: {
      type: String,
      default: "center",
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    styleWidth() {
      if (typeof this.width === "number") return this.width + "px";
      return this.width;
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleClosed() {
      this.$emit("closed");
    },
  },
};
</script>
<style lang="less" scoped>
.easy-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .easy-modal {
    position: absolute;
    padding: 16px 12px;
    &.easy-modal-center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.easy-modal-bottom {
      left: 50%;
      transform: translateX(-50%);
      bottom: 60px;
    }
    background: linear-gradient(
      180deg,
      rgba(0, 91, 153, 0.82) 0%,
      rgba(3, 59, 98, 0.85) 29%,
      rgba(8, 25, 37, 0.85) 100%
    );
    box-shadow: inset 0px 0px 8px 0px #05d6f3,
      0px 0px 4px 0px rgba(55, 207, 255, 0.5);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid;
    border-image: linear-gradient(
        180deg,
        rgba(48.000000938773155, 193.00000369548798, 214.00000244379044, 1),
        rgba(29.000000171363354, 90.00000223517418, 126.00000008940697, 1)
      )
      1 1;
    .modal-header {
      height: 42px;
      background: linear-gradient(90deg, #016dbc 0%, rgba(1, 131, 188, 0) 100%);
      display: flex;
      align-items: center;
      .modal-title {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 24px;
        color: #ffffff;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-left: 16px;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
      }
      .modal-close {
        cursor: pointer;
        margin-right: 10px;
        width: 35px;
        height: 35px;
        background-image: url(~@/assets/images-new/common/modal-close.png);
        background-size: 100% 100%;
      }
    }
    .modal-content {
      margin-top: 10px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
