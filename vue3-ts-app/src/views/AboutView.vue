<template>
  <div class="about">
    <h1>This is an about page</h1>

    {{ b }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const a = ref(99)

const b = computed(() => {
  return a.value > 90 ? 9 : 0
})
console.log(b.value)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
