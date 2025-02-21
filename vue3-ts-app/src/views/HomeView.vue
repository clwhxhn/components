<template>
  <ScaleBox :width="1920" :height="1080" bgc="transparent" :delay="100" :isFlat="false">
    ts practice
    <br />
  </ScaleBox>
</template>

<script setup lang="ts">
import ScaleBox from 'vue3-scale-box'
const arr = [1, 2, 3, 4, 5, 56]
arr.forEach((a, i) => {
  if (a < 4) {
    return
  }
  console.log(a)
})
</script>
