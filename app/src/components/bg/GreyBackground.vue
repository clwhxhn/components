<!--
 * @Author: wangxiaohui clwhxhn@163.com
 * @Date: 2023-11-29 18:21:04
 * @LastEditors: wangxiaohui clwhxhn@163.com
 * @LastEditTime: 2023-11-29 18:42:58
 * @FilePath: \components\app\src\components\bg\GreyBackground.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main-warp">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GreyBackground',
  props: {
    noMargin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeDestroy() {
    // this.getLayoutContent().classList.remove('common-grey')
    // this.getLayoutContent().classList.remove('common-grey-no-margin')
  },
  mounted() {
    this.setBackground() // 重置.global-layout-wrapper .layout-content背景色
  },
  methods: {
    getLayoutContent() {
      return document.querySelector('.layout-content')
    },
    setBackground() {
    //   this.getLayoutContent().classList.add('common-grey')
    //   if (this.noMargin) {
    //     this.getLayoutContent().classList.add('common-grey-no-margin')
    //   }
    }
  }
}
</script>
<style lang="less">
.common-grey {
  background-color: #f0f2f5 !important;
  padding: 0 !important;
}
.common-grey-no-margin {
  margin: 0 !important;
}
</style>
<style lang="less" scoped>
</style>
