<template>
  ts practice
  <br />
</template>

<script setup lang="ts">
const arr = [1, 2, 3, 4, 5, 56]
arr.forEach((a, i) => {
  if (a < 4) {
    return
  }
  console.log(a)
})
</script>
