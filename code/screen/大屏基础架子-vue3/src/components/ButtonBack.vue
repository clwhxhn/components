<template>
  <div class="button-back animate__animated animate__fadeInDown" @click="back">
    <div class="button-back__icon" />
    <h2 class="button-back__label">{{ label }}</h2>
  </div>
</template>

<script>
export default {
  name: 'ButtonBack',
  props: {
    label: {
      type: String,
      default: '返回'
    }
  },
  emits: ['back'],
  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="less">
.button-back {
  position: fixed;
  top: 30px;
  left: 246px;
  width: 169px;
  height: 47px;
  background: url('@/assets/images/bg-button-back.png') center no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  cursor: pointer;
  z-index: 999;
  pointer-events: auto;
}
.button-back__icon {
  width: 34px;
  height: 30px;
  background: url('@/assets/images/icon-button-back.png') center no-repeat;
  background-size: 100%;
}
.button-back__label {
  font-family: FZLanTYJW;
  font-size: 16px;
  font-weight: 500;
  color: #ddf8ff;
  line-height: 38px;
  margin: 0;
  padding-left: 30px;
}
</style>
