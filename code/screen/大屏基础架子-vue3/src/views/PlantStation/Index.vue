<template>
    <div class="panel-container-left basin">
        <img src="@/assets/images/panel/station-left.png" alt="" />
        <div class="empty-st" @click="checkPlantStation"></div>
    </div>
    <div class="panel-container-right">
        <img src="@/assets/images/panel/eco.png" alt="" />
    </div>

    <div class="effect-control">
        <img
            v-if="effectStatus === 'stopped'"
            @click="showRiverFlowEffect"
            src="@/assets/images/btn-start.png"
            alt="" />
        <img
            v-else
            @click="closeRiverFlowEffect"
            src="@/assets/images/btn-stop.png"
            alt="" />
    </div>

    <img
        class="btn-reset"
        @click="setDefaultView"
        src="@/assets/images/btn-reset.png"
        alt="" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { stPoiConfig } from '../poi-config'
import { addStPoi } from '../actions'
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()
watch(
    () => mapStore.currentPoiId,
    (newVal: any, oldVal) => {
        if (newVal === 'st_100') {
            swdt.fire('flyToPoint', {
                coords: [106.512375, 29.3901, 143.79],
                heading: 114.963,
                pitch: -11.4616,
                duration: 3
            })
            setTimeout(() => {
                // startRuler()
                swdt.fire('executeBPCustomEvents', {
                    bpClass: 'BP_CustomEvents',
                    command: 'updateCurrentWaterLevel',
                    param: JSON.stringify({
                        currentWaterLevel: 114,
                        currentFlow: 106
                    })
                })
            }, 5000)
        }
    },
    { deep: true, immediate: true }
)

const effectStatus = ref('stopped')

const showRiverFlowEffect = () => {
    effectStatus.value = 'started'
    swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'showRiverFlowEffect'
    })
}

const closeRiverFlowEffect = () => {
    effectStatus.value = 'stopped'
    swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'closeRiverFlowEffect'
    })
}

const setDefaultView = () => {
    // swdt.fire('flyToPoint', {
    //     duration: 3.0,
    //     coords: [106.533707, 29.397764, 796.01],
    //     heading: 147.325,
    //     pitch: -12.4891
    // })
    swdt.fire('flyToPoint', {
        duration: 3.0,
        coords: [106.519936, 29.396742, 1683.29],
        heading: 116.536,
        pitch: -43.6124
    })
    mapStore.updateCurrentPoiId('')
}

// 点击厂站
const checkPlantStation = () => {
    swdt.fire('flyToPoint', {
        duration: 3.0,
        coords: [106.513931, 29.303757, 192.96],
        heading: -67.5833,
        pitch: -41.1145
    })
}


onMounted(() => {
    const poiList = stPoiConfig.filter(item=> item.type === 'cz')
    addStPoi(poiList)

    const poiList1 = stPoiConfig.filter(item => item.stName.includes('生态补水'))
    addStPoi(poiList1)

    setDefaultView()
})
onBeforeUnmount(()=> {
    swdt.fire('removeAllPOI')

    swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'updateCurrentWaterLevel',
        param: JSON.stringify({
            currentWaterLevel: 110,
            currentFlow: 106
        })
    })
})
</script>


<style lang="less" scoped>
.panel-container-left,
.panel-container-right {
    > img {
        width: 100%;
    }
}
.panel-container-left {
    height: auto;
    background: rgba(0,0,0,0.5);
    .empty-st {
        position: absolute;
        top: 252px;
        width: 100%;
        height: 32px;
        // border: 2px solid red;
        cursor: pointer;
    }
}

.btn-reset {
    position: fixed;
    top: 140px;
    right: 426px;
    width: 40px;
    cursor: pointer;
}

.effect-control {
    position: absolute;
    top: 190px;
    right: 426px;
    img {
        width: 40px;
        cursor: pointer;
    }
}
</style>
