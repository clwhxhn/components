<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
    <ComplexPoi ref="complexPoi" />
  </a-config-provider>
</template>
<script setup lang="ts">
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $img: (path: string) => string
    $httpImg: (path: string) => string
  }
}
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { getZFPoints } from '@/api/building'
import { getLinePoints } from '@/api/building'

import { ref, provide } from 'vue'
import ComplexPoi from '@/components/HtmlToCanvas.vue'

dayjs.locale('zh-cn')

const complexPoi = ref()
provide('complexPoi', complexPoi)


</script>
<style lang="less" scoped></style>
