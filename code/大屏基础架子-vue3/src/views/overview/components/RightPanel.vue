<template>
    <div class="panel-container-right">
        <div class="panel-common-title">右侧面板</div>
        <div class="panel-common-section">
            <div class="panel-common-sub-title">列表</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'

onMounted(() => {})

onBeforeUnmount(() => {})
</script>

<style lang="less" scoped>
.panel-common-section {
    padding: 10px;
    height: 800px;
}
</style>
