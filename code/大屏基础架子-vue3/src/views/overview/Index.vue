<template>
  <LeftPanel />
  <RightPanel />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'


onMounted(() => {
  
})

onBeforeUnmount(() => {
  
})
</script>
<script lang="ts">
export default {
  name: 'SubjectOverview'
}
</script>

<style lang="less" scoped>

</style>
