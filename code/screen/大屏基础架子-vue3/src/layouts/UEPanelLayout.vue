<template>
  <RouterView />
</template>
<script setup lang="ts">
// eslint-disable-next-line
const setFontsize = () => {}
document.documentElement.style.fontSize = '16px'
window.removeEventListener('resize', setFontsize, false)
</script>
<style>
html,
body {
  width: 536px;
  height: 392px;
  min-height: 392px;
}
</style>
