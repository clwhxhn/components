<template>
    <template v-if="showSubPage">
        <div class="panel-container-left basin">
            <img src="@/assets/images/panel/run-left.png" alt="" />
            <div class="empty-st" @click="checkPlantStation"></div>

            <a-dropdown :trigger="['click']">
                <div class="btn-roaming"></div>
                <template #overlay>
                    <a-menu @click="onMenuItemClick">
                        <a-menu-item key="JTH">一品河</a-menu-item>
                        <a-menu-item key="HXK">黄溪河</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>

            <div class="roaming-control">
                <template v-if="roamingStatus !== 'stopped'">
                    <img
                        v-if="roamingStatus === 'paused'"
                        @click="sequencePlay"
                        src="@/assets/images/btn-start.png"
                        alt="" />
                    <img
                        v-if="roamingStatus === 'started'"
                        @click="sequencePause"
                        src="@/assets/images/btn-pause.png"
                        alt="" />
                    <img
                        v-if="
                            roamingStatus === 'started' ||
                            roamingStatus === 'paused'
                        "
                        @click="sequenceStop"
                        src="@/assets/images/btn-stop.png"
                        alt="" />
                </template>
            </div>
        </div>
        <div class="panel-container-right">
            <img src="@/assets/images/panel/run-right.png" alt="" />
            <img
                class="btn-return"
                @click="showSubPage = false"
                src="@/assets/images/return_icon.png"
                alt="" />
            <div class="empty-wq" @click="checkWqDetails"></div>

            <div class="empty-wrap">
                <div
                    v-for="(item, index) in videoList"
                    :key="index"
                    @click="checkVideo(item, index)"></div>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="panel-container-left">
            <img src="@/assets/images/panel/basin.png" alt="" />
        </div>
        <div class="panel-container-right">
            <img src="@/assets/images/panel/project.png" alt="" />
            <!-- <div class="empty" @click="showSubPage = true"></div> -->
        </div>
    </template>

    <img
        class="btn-reset"
        @click="setDefaultView"
        src="@/assets/images/btn-reset.png"
        alt="" />

    <div v-if="showVideo" class="video-wrap">
        <video :src="videoUrl" controls autoplay></video>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { stPoiConfig } from '../poi-config'
import { addStPoi } from '../actions'
import { getAssetsImages } from '@/utils/image'
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()

const showSubPage = ref(false)
const roamingStatus = ref('stopped')
const sequenceTag = ref('')
const onMenuItemClick = ({ key }) => {
    sequenceTag.value = key
    sequencePlay()
}

const sequencePlay = () => {
    swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'sequencePlay',
        param: JSON.stringify({
            sequenceTag: sequenceTag.value
        })
    })
    roamingStatus.value = 'started'
}

const sequencePause = () => {
    swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'sequencePause',
        param: JSON.stringify({
            sequenceTag: sequenceTag.value
        })
    })
    roamingStatus.value = 'paused'
}

const sequenceStop = () => {
    swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'sequenceStop',
        param: JSON.stringify({
            sequenceTag: sequenceTag.value
        })
    })
    roamingStatus.value = 'stopped'
}

const setDefaultView = () => {
    swdt.fire('flyToPoint', {
        duration: 3.0,
        coords: [106.533707, 29.397764, 796.01],
        heading: 147.325,
        pitch: -12.4891
    })

    swdt.fire('removePOIByLayerID', { layerID: 'stPanel' })
    mapStore.updateCurrentPoiId('')
    showVideo.value = false
}

ue.interface._onSequenceStop = data => {
    console.log('sequence stopped')
    roamingStatus.value = 'stopped'
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

// 点击视频点
const showVideo = ref(false)
const videoUrl = ref()
const videoList = ref([
    {
        stName: '一品街道臭水沟',
        lon: '106.5645158',
        lat: '29.28269427',
        id: 'st_10'
    },
    {
        stName: '养老院排口',
        lon: '106.5731827',
        lat: '29.27307957',
        id: 'st_11'
    },
    {
        stName: '圣灯山镇臭水沟',
        lon: '106.6437313',
        lat: '29.27593025',
        id: 'st_12'
    }
])
const checkVideo = (item: any, index: number) => {
    showVideo.value = true
    videoUrl.value = new URL(
        `/src/assets/video/video${index + 1}.mp4`,
        import.meta.url
    ).href

    const view = {
        coords: [
            parseFloat(item.lon) - 0.00017,
            parseFloat(item.lat) + 0.001,
            300
        ],
        heading: 79.5694,
        pitch: -36.4215
    }
    swdt.fire('flyToPoint', {
        ...view,
        duration: 3
    })
}

// 点击右侧列表水质站
const checkWqDetails = () => {
    const point = {
        river: '一品河',
        type: 'wq',
        stType: '河道断面水质监测站',
        stName: '一品河入江口断面',
        lon: '106.526775',
        lat: '29.38443',
        id: 'st_0'
    }
    const view = {
        coords: [
            parseFloat(point?.lon) - 0.00017,
            parseFloat(point?.lat) + 0.001,
            300
        ],
        heading: 79.5694,
        pitch: -36.4215
    }
    swdt.fire('flyToPoint', {
        ...view,
        duration: 3
    })

    // 添加面板
    const option = {
        id: `panel_${point.id}`,
        layerID: 'stPanel',
        type: 'screen',
        coords: [point.lon, point.lat, 200],
        isVisable: true,
        anchor: 'right',
        icon: {
            url: getAssetsImages('panel/details-wq.png')
        },
        onClickedCallBack: '_onPOIClickCallback'
    }
    swdt.fire('addIconPOI', option)
}

watch(
    () => mapStore.currentPoiId,
    (newVal: any, oldVal) => {
        if (newVal === 'panel_st_0') {
            swdt.fire('removePOIByLayerID', { layerID: 'stPanel' })

            const option = {
                id: `panel_st_0_new`,
                layerID: 'stPanel',
                type: 'screen',
                coords: [106.526775, 29.38443, 200],
                isVisable: true,
                anchor: 'right',
                icon: {
                    url: getAssetsImages('panel/history-wq.png')
                }
            }
            swdt.fire('addIconPOI', option)
        }
    },
    { deep: true, immediate: true }
)

onMounted(() => {
    addStPoi(stPoiConfig)

    setDefaultView()
})
onBeforeUnmount(() => {
    swdt.fire('removeAllPOI')
    mapStore.updateCurrentPoiId('')
})
</script>


<style lang="less" scoped>
.video-wrap {
    position: absolute;
    left: 432px;
    bottom: 50px;
    width: 400px;
    video {
        width: 100%;
        height: 300px;
    }
}
.panel-container-left,
.panel-container-right {
    > img {
        width: 100%;
    }
}
.panel-container-left {
    .btn-roaming {
        position: absolute;
        top: 40px;
        right: -50px;
        width: 40px;
        height: 40px;
        background-image: url('@/assets/images/btn-roaming.png');
        background-size: 100% 100%;
    }

    .roaming-control {
        position: absolute;
        top: 100px;
        right: -50px;
        img {
            display: block;
            width: 40px;
            cursor: pointer;
        }
    }

    .empty-st {
        position: absolute;
        bottom: 208px;
        width: 100%;
        height: 32px;
        // border: 2px solid red;
        cursor: pointer;
    }
}
.panel-container-right {
    right: 16px;
    .empty {
        position: absolute;
        bottom: 275px;
        width: 100%;
        height: 80px;
        // border: 2px solid red;
        cursor: pointer;
    }
    .btn-return {
        position: absolute;
        left: -50px;
        top: 90px;
        width: 40px;
        cursor: pointer;
    }

    .empty-wq {
        position: absolute;
        bottom: 190px;
        width: 100%;
        height: 32px;
        // border: 2px solid red;
        cursor: pointer;
    }

    .empty-wrap {
        position: absolute;
        top: 170px;
        width: 100%;
        > div {
            margin-bottom: 9px;
            height: 32px;
            // border: 2px solid red;
            cursor: pointer;
        }
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
