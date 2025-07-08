<template>
  <a-modal v-bind="attrs" wrap-class-name="dialog-wrap">
    <template v-for="(_, name) in slots" #[name]="scopeData">
      <slot :name="name" v-bind="scopeData || {}" />
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { useSlots, useAttrs } from 'vue'
const attrs = useAttrs()
const slots = useSlots()
</script>

<style lang="less" scoped></style>
