<template>
  <transition name="translate">
    <div v-show="panelVisible" class="easy-select-panel">
      <div
        :class="{ 'is-active': value === it.value }"
        class="easy-select-item"
        v-for="it in options"
        :key="it.value"
        @click="$emit('select', it)"
      >
        {{ it.label }}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    panelVisible: {
      type: Boolean,
      required: true,
    },
    options: {
      required: true,
      type: Array,
    },
    value: {
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.easy-select-panel {
  position: absolute;
  z-index: 100;
  left: 0;
  top: calc(100% + 16px);
  background: rgba(0, 51, 102, 0.8);
  box-shadow: inset 0px -2px 6px 0px #2296f0;
  border-image: linear-gradient(
      180deg,
      rgba(68, 131, 235, 0),
      rgba(68, 131, 235, 0.82),
      rgba(50, 169, 255, 1)
    )
    1 1;
  min-width: 200px;
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .easy-select-item {
    height: 28px;
    line-height: 28px;
    padding-left: 30px;
    font-weight: 500;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid transparent;
    &:hover,
    &.is-active {
      color: #51f4c4;
      background: rgba(14, 77, 140, 0.4);
      box-shadow: inset 0px -4px 4px 0px rgba(8, 206, 249, 0.5);
      border-image: linear-gradient(
          180deg,
          rgba(8, 206, 249, 0.21),
          rgba(8, 206, 249, 1)
        )
        1 1;
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
  transform: translateY(-100%);
}
</style>
