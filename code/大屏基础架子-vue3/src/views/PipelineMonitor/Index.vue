<template>
    
    <div class="panel-container-left">
        <img src="@/assets/images/panel/gw-left.png" alt="" />
    </div>
    <div class="panel-container-right">
        <img src="@/assets/images/panel/gw-right.png" alt="" />
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
import { getAssetsImages } from '@/utils/image'

const showVideo = ref(false)

const mapStore = useMapStore()
watch(
    () => mapStore.currentPoiId,
    (newVal: any, oldVal) => {
        if (newVal) {
            console.log(newVal)
            const poiData = stPoiConfig.find(item => item.id === newVal)
            const option = {
                id: `panel_${newVal}`,
                layerID: 'stPanel',
                type: 'screen',
                coords: [poiData.lon, poiData.lat, 200],
                isVisable: true,
                anchor: 'right',
                icon: {
                    url: getAssetsImages('panel/details-gw.png')
                }
            }
            swdt.fire('addIconPOI', option)
        }
    },
    { deep: true, immediate: true }
)

const setDefaultView = () => {
    swdt.fire('flyToPoint', {
        duration: 3.0,
        coords: [106.509491, 29.3857, 455.46],
        heading: -90.2737,
        pitch: -12.9937
    })
    swdt.fire('removePOIByLayerID', { layerID: 'stPanel' })
    mapStore.updateCurrentPoiId('')
}

onMounted(() => {
    const poiList = stPoiConfig.filter(item => item.type === 'gx')
    addStPoi(poiList)

    setDefaultView()
})
onBeforeUnmount(() => {
    swdt.fire('removeAllPOI')
    mapStore.updateCurrentPoiId('')
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
    video {
        width: 100%;
        height: 300px;
    }
}
.btn-reset {
    position: fixed;
    top: 120px;
    right: 426px;
    width: 40px;
    cursor: pointer;
}
</style>
