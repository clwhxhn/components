<template>
  <div class="bn">
    <input type="text" v-model="model" v-bind="$attrs" />

    <RouterLink to="/User/99">99</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { aL } from 'vitest/dist/reporters-yx5ZTtEV'
import { defineModel, ref, useAttrs, inject } from 'vue'
import { useRouter } from 'vue-router'

const attrs = useAttrs()
console.log('attrs: ', attrs.class)

defineOptions({
  inheritAttrs: false
})

const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

inject('message', 'hahhaha')

const user = {
  name: 'Hayes',
  id: 0
}
</script>

<style scoped></style>
