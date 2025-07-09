<template>
    <LeftPanel />
    <RightPanel />

    <div class="tool-bar">
        <div @click="checkOverview">全局视角</div>
        <div v-if="curViewKey !== 'hub'" @click="checkHub">水库视角</div>
        <a-dropdown placement="bottomRight" trigger="click">
            <div v-if="curViewKey !== 'dam'">工程部位</div>
            <template #overlay>
                <a-menu>
                    <a-menu-item v-for="(item, index) in projList" :key="index" @click="checkDam(item)">
                        <a href="javascript:;">{{ item.name }}</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
        <div>加固前后对比</div>
        <div>水库工程</div>
        <div>流域展示</div>
        <div v-if="curViewKey !=='overview'" @click="onBack">返回</div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { setGlobalView, setHubView } from '@/views/scene'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'
import { damList } from './config'
import {addDamLabels, addDamDetailsPoi} from './actions'

const projList = ref(damList)
const curViewKey = ref('overview')
let lastViewKey = ''

// 全局
const checkOverview = () => {
    resetScene()
    curViewKey.value = 'overview'
    setGlobalView()

    // TODO: 添加书库标签
}


// 查看水库
const checkHub = () => {
    resetScene()
    curViewKey.value = 'hub'
    setHubView()
    addDamLabels(damList)
}

// 查看工程部位(坝)
const checkDam = (dam) => {
    resetScene()
    lastViewKey = curViewKey.value
    curViewKey.value = 'dam'
    swdt.fire('flyToPoint', {
        duration: 1,
        ...dam.view
    })
    addDamDetailsPoi(dam)
}

// 返回
const onBack = ()=> {
    // 水库视角直接返回全局视角；工程部位视角，从哪里进入则返回到哪里
    if(curViewKey.value === 'hub') {
        checkOverview()
    } else {
        if(lastViewKey === 'hub') {
            checkHub()
        } else {
            checkOverview()
        }
    }
}

const resetScene = ()=> {
    swdt.fire('removeAllPOI')
}

onMounted(() => {
    setGlobalView()
})

onBeforeUnmount(() => {

})
</script>


<style lang="less" scoped>
.tool-bar {
    position: fixed;
    top: 130px;
    right: 840px;
    pointer-events: all;

    >div {
        margin-bottom: 10px;
        cursor: pointer;
        background: #fff;
        border-radius: 5px;
        text-align: center;
    }
}

// .btn-back {
//     position: fixed;
//     top: 80px;
//     right: 320px;
//     pointer-events: all;
//     cursor: pointer;
// }
</style>