<template>
    <div class="h-title">
        <!-- <img class="logo" src="@/assets/images/logo.png" alt="" /> -->
        系统标题
    </div>
    <div class="datetime-box">
        <div class="date">{{ date }}</div>
    </div>

    <div class="weather-box">
        <div class="time">{{ time }}</div>
        <div class="divider" />
        <div class="weather">
            <img :src="weather.icon" />
            <span>{{ weather.label }}</span>
        </div>
        <div class="divider" />
        <div class="temperature">
            <span>{{ temperature }}</span>
            <span>℃</span>
        </div>

        <div class="mask">
            <div class="flyout-menu">
                <time-weather-menu
                    @time-change="onTimeChange"
                    @weather-change="onWeatherChange"
                    @temp-change="onTempChange" />
            </div>
        </div>
    </div>

    <div class="nav-list" v-if="navState.navVisible">
        <div
            v-for="(nav, idx) in NAV_LIST"
            :key="idx"
            :class="{ 'router-link-active': idx === navState.navActiveIdx }"
            @click="onNavClick(nav.path)">
            {{ nav.name }}
        </div>
    </div>
    <footer />
    <RouterView />
</template>
<script setup lang="ts">
import '@/utils/flexible'
/* global swdt */
import { RouterView, useRouter } from 'vue-router'
import { onMounted, ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import TimeWeatherMenu from '@/components/TimeWeatherMenu.vue'
import { NAV_LIST, useNavStore } from '@/stores/nav'

// import FunctionalPanel from '@/components/FunctionalPanel.vue'
// import { poiInfoMap } from '@/ue/config/poiInfoMap.config.js'
const weather = ref({
    icon: 'src/assets/images/weather/clouds',
    label: '晴间多云',
    type: 'partlyCloudy'
})
const temperature = ref<number>(19)
const time = ref<string>(dayjs().format('HH:mm:ss'))
const date = ref<string>(dayjs().format('YYYY年MM月DD日'))

let lastRectData: string

const domObserveCallback = () => {
    let width = document.documentElement.clientWidth
    let height = document.documentElement.clientHeight

    let rectData: number[][] = []
    document
        .querySelectorAll(
            '.ant-modal-content, .model-edit-modal, .topoGraphic-container, .water-supply-problem-container, .water-supply-problem-list, .time-box, .test-view-config, .panel-container-left, .panel-container-right, .button-back, .search-box, .search-list, .legend-box, .scene-toolbar, .top-button-wrap, .full-screen-btn, .nav-list, .roaming-btn-wrap, .datetime-box, .mask, .menu-content, .time-line-wrapper, .dispatch-building-stats, .dispatch-problem-container, .section-wrap, .operation-panel, .ant-modal-confirm-btns, .tab-item, .roaming-wrap, .ctrl-box, .edit-dialog, .dispatch-problem-list, .warning-record-list, .step-buttons, .projectManagement-toolbar, .pointer-events-auto, .cursor-pointer, .btn-start, .btn-stop, .btn-pause'
        )
        .forEach(item => {
            let rect = item.getBoundingClientRect()
            rectData.push([
                rect.x / width,
                (rect.x + rect.width) / width,
                rect.y / height,
                (rect.y + rect.height) / height
            ])
        })

    if (JSON.stringify(rectData) !== lastRectData) {
        swdt.fire('setUInoResponseRect', { data: rectData })
    }
    lastRectData = JSON.stringify(rectData)
}

const resizeObserver = new ResizeObserver(domObserveCallback)
const observer = new MutationObserver(domObserveCallback)

const onTimeChange = timeStr => {
    time.value = timeStr
}
const onWeatherChange = weatherObj => {
    weather.value = weatherObj
}

const onTempChange = temp => {
    temperature.value = temp
}

const router = useRouter()
const navState = useNavStore()
function onNavClick(path) {
    router.push({ path: path[0] })
}

onMounted(() => {
    date.value = dayjs().format('YYYY年MM月DD日 dddd')
    // date.value = dayjs().format('YYYY年MM月DD日')

    resizeObserver.observe(document.body)
    observer.observe(document.documentElement, {
        childList: true,
        attributes: false,
        subtree: true
    })

    const worldTags = ['GRID_GROUND', 'WORLD_GROUND']
    const regionTags = [
        '00_QS',
        '01_LHK',
        '02_XZ',
        '03_ZY',
        '04_SX',
        '05_ZD',
        '06_GS',
        '07_DW'
    ]

    // worldTags.forEach(t => {
    //   const command = new SetTilesetCommand({
    //     groundTag: t,
    //     img: 'WorldBackground_Img',
    //     dem: 'WorldBackground_Dem'
    //   })
    //   command.execute()
    // })

    // regionTags.forEach(t => {
    //   const command = new LoadRegionTilesetCommand({
    //     regionID: t
    //   })
    //   command.execute()
    // })

    // swdt.fire('executeBPCustomEvents', {
    //   bpClass: 'BP_CustomEvents',
    //   command: 'dissolveBuilding',
    //   param: JSON.stringify({
    //     translucentTag: 'JXZ_PS_DISSOLVE',
    //     dissolveTag: 'JXZ_PS_TRANSLUCENT'
    //   })
    // })

    // ue.interface._onPOIClickCallback = function (data) {
    //   if (typeof data === 'string') {
    //     let json = JSON.parse(data)
    //     // console.log(json.data)
    //     if (json.data.layerid.startsWith('poi_')) {
    //       // example.focusTo(json.data.id)
    //       const view = poiInfoMap[json.data.id]
    //       // console.log(view)

    //       const focusTo = new FocusToCommand({ view })
    //       focusTo.execute()
    //     }
    //   }
    // }

    // swdt.fire('executeBPCustomEvents', { command: 'hideAllPOI' })

    // // POI点击回调
    // ue.interface._onPOIClickCallback = (data: string) => {
    //   let json = JSON.parse(data)
    //   // alert(data)
    //   let id = json.id
    //   if (id === 'JS_JX') {
    //     swdt.fire('flyToCamera', { id: 'CameraActor_28', duration: 5 })
    //     setTimeout(() => {
    //       swdt.fire('executeBPCustomEvents', { command: 'hideAllPOI' })
    //       swdt.fire('executeBPCustomEvents', {
    //         command: 'showPOIByID',
    //         param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_5" }'
    //       })
    //       swdt.fire('executeBPCustomEvents', {
    //         command: 'showPOIByID',
    //         param: '{ "id": "BP_POI_icon_Screen_leftAnchor_C_10" }'
    //       })
    //     }, 4000)
    //   }
    // }
})

onUnmounted(() => {
    resizeObserver.disconnect()
    observer.disconnect()
})
</script>
<style>
html,
body {
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
}
</style>
<style lang="less" scoped>
.h-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 128px;
    background-image: url('@/assets/images/logo-bg.png');
    background-size: 100% 100%;

    padding-top: 12px;
    color: #fff;
    font-family: DOUYU, DOUYU;
    text-align: center;
    font-size: 26px;
    // .logo {
    //   position: absolute;
    //   top: 12px;
    //   left: 50%;
    //   width: 536px;
    //   height: 48px;
    //   transform: translate(-50%, 0);
    // }
}

.datetime-box {
    position: absolute;
    top: 40px;
    left: 16px;
    width: 400px;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    color: #fff;
    text-shadow: 0 0 2px #383838;
    pointer-events: none;

    // .weather {
    //   & > img {
    //     width: 24px;
    //     height: 21px;
    //     margin-right: 10px;
    //     align-items: center;
    //   }
    //   line-height: 26px;
    //   font-family: FZLanTYJW;
    //   display: flex;
    //   pointer-events: none;
    //   & > span {
    //     &:nth-child(2) {
    //       font-size: 16px;
    //       font-weight: bold;
    //     }
    //     &:nth-child(3) {
    //       font-size: 16px;
    //     }
    //   }
    // }

    .divider {
        width: 1px;
        height: 20px;
        background-color: #d7d7d7;
        margin: 0 16px;
        pointer-events: none;
    }

    .date {
        pointer-events: none;
        font-size: 16px;
        font-family: FZLanTYJW;
        color: #eae9e9;
        /*font-family: DIN-RegularAlternate, DIN;*/
        font-weight: normal;
        line-height: 32px;
        margin-left: 8px;
    }

    &::after {
        pointer-events: none;
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 440px;
        height: 1px;
        opacity: 0.6;
        border: 1px solid;
        border-image: linear-gradient(
                90deg,
                rgba(106, 106, 106, 0.32),
                rgba(169, 198, 255, 1),
                rgba(197, 197, 197, 0.4)
            )
            1 1;
    }
}

.weather-box {
    position: absolute;
    top: 40px;
    right: 16px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 8px;
    color: #fff;
    text-shadow: 0 0 2px #383838;
    pointer-events: none;

    .weather {
        & > img {
            width: 24px;
            height: 21px;
            margin-right: 10px;
            align-items: center;
        }
        line-height: 26px;
        font-family: FZLanTYJW;
        display: flex;
        pointer-events: none;
        & > span {
            &:nth-child(2) {
                font-size: 14px;
                font-weight: bold;
            }
            &:nth-child(3) {
                font-size: 16px;
            }
        }
    }
    .temperature {
        font-size: 16px;
        font-weight: 600;
        color: #c0c7d4;
        line-height: 22px;
    }

    .divider {
        width: 1px;
        height: 20px;
        background-color: #d7d7d7;
        margin: 0 16px;
        pointer-events: none;
    }

    .time {
        pointer-events: none;
        font-size: 16px;
        font-family: FZLanTYJW;
        color: #fff;
        /*font-family: DINAlternate-Bold, DINAlternate;*/
        font-weight: bold;
        line-height: 32px;
        letter-spacing: 2px;
    }

    &::after {
        pointer-events: none;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 400px;
        height: 1px;
        opacity: 0.6;
        border: 1px solid;
        border-image: linear-gradient(
                90deg,
                rgba(106, 106, 106, 0.32),
                rgba(169, 198, 255, 1),
                rgba(197, 197, 197, 0.4)
            )
            1 1;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: all;
        cursor: pointer;
        z-index: 888;
        background-color: #8b68ff00;

        &:hover {
            .flyout-menu {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    .flyout-menu {
        position: absolute;
        right: 16px;
        top: 32px;
        z-index: 999;
        opacity: 0;
        backdrop-filter: blur(8px);
        visibility: hidden;
        transform: translateY(-4px);
        transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
    }
}

.nav-list {
    pointer-events: all;
    position: fixed;
    width: 984px;
    height: 42px;
    bottom: 10px;
    left: calc(50% - 492px);
    background-image: url('@/assets/images/bg-nav.png');
    background-size: 100%;
    display: flex;
    justify-content: center;

    & > div {
        color: #bdc5d5;
        cursor: pointer;
        font-size: 18px;
        /*font-family: DOUYU-Font, DOUYU;*/
        font-family: FZLanTYJW;
        font-weight: 700;
        text-shadow: 0 0 2px #383838;
        line-height: 36px;
        width: 136px;
        text-align: center;
        &:not(:last-child) {
            margin-right: 32px;
        }
        &.router-link-active {
            color: #ffffff;
            position: relative;
            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 136px;
                height: 54px;
                background-image: url(@/assets/images/bg-link-active.png);
                background-size: 100%;
            }
        }
    }
}

.functional_pannel_wrapper {
    position: fixed;
    left: 402px;
    bottom: 84px;
    width: 128px;
}

footer {
    position: fixed;
    bottom: -24px;
    left: 0;
    width: 100vw;
    height: 65px;
    background-image: url('@/assets/images/bottom.png');
    background-size: 100%;
    pointer-events: none;
}
</style>
