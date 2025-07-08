<template>
    <div class="h-title">
        数字孪生茅塔河
    </div>
    <!-- <div class="datetime-box">
        <div class="date">{{ date }}</div>
    </div> -->

    <div class="weather-box">
        <div class="time">{{ time }}</div>
        <div class="date">{{ date }}</div>
        <div class="divider" />
        <div class="weather">
            <img :src="weather.icon" />
            <span>{{ weather.label }}</span>
        </div>
        <div class="temperature">
            <span>{{ temperature }}</span>
            <span>℃</span>
        </div>

        <div class="mask">
            <div class="flyout-menu">
                <time-weather-menu @time-change="onTimeChange" @weather-change="onWeatherChange"
                    @temp-change="onTempChange" />
            </div>
        </div>
    </div>

    <div class="nav-list" v-if="navState.navVisible">
        <div v-for="(nav, idx) in NAV_LIST" :key="idx" :class="{ 'router-link-active': idx === navState.navActiveIdx }"
            @click="onNavClick(nav.path)">
            {{ nav.name }}
        </div>
    </div>

    <!-- 助手 -->
    <div class="ai-wrap">
        <div class="robot" @click="showChat = !showChat">
            <img src="@/assets/images/AI-APNG.png" alt="">
        </div>
        <!-- <div class="btn-ai" @click="showChat = !showChat">智能助手</div> -->
    </div>

    <!-- 聊天对话框 -->
    <!-- <Transition name="fade">
        <ChatDialog v-if="showChat" />
    </Transition> -->

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
// import ChatDialog from '@/views/ai-assistant/components/ChatDialog.vue'

// import FunctionalPanel from '@/components/FunctionalPanel.vue'
// import { poiInfoMap } from '@/ue/config/poiInfoMap.config.js'
const weather = ref({
    icon: 'src/assets/images/weather/clouds',
    label: '晴间多云',
    type: 'partlyCloudy'
})
const temperature = ref<number>(19)
const time = ref<string>(dayjs().format('HH:mm:ss'))
const date = ref<string>(dayjs().format('YYYY.MM.DD'))

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

const showChat = ref(false)

onMounted(() => {
    date.value = dayjs().format('YYYY.MM.DD dddd')
    // date.value = dayjs().format('YYYY年MM月DD日')

    resizeObserver.observe(document.body)
    observer.observe(document.documentElement, {
        childList: true,
        attributes: false,
        subtree: true
    })
})

onUnmounted(() => {
    resizeObserver.disconnect()
    observer.disconnect()
})
</script>
<style lang="less" scoped>
.h-title {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 100px;
    width: 100vw;
    height: 120px;
    line-height: 110px;
    background-image: url('@/assets/images/logo-bg.png');
    background-size: 100% 100%;

    color: #fff;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-size: 76px;
}

.weather-box {
    position: fixed;
    top: 25px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 8px;
    color: #fff;
    text-shadow: 0 0 2px #383838;
    pointer-events: none;
    z-index: 1;

    .weather {
        line-height: 26px;
        display: flex;
        pointer-events: none;
        align-items: center;

        &>img {
            width: 48px;
            height: 48px;
            margin-right: 10px;
            align-items: center;
        }

        &>span {
            &:nth-child(2) {
                margin: 0 20px;
                font-size: 28px;
            }
        }
    }

    .temperature {
        font-family: D-DIN, D-DIN;
        font-size: 32px;
    }

    .divider {
        margin: 0 50px;
        width: 1px;
        height: 60px;
        background-color: #d7d7d7;
        pointer-events: none;
    }

    .time {
        pointer-events: none;
        font-size: 56px;
        font-family: D-DIN, D-DIN;
        color: #fff;
        font-weight: bold;
        line-height: 32px;
        letter-spacing: 2px;
    }

    .date {
        margin-left: 22px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-size: 32px;
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
    top: 35px;
    left: 1107px;
    background-image: url('@/assets/images/bg-nav.png');
    background-size: 100% 100%;
    display: flex;

    &>div {
        color: #bdc5d5;
        cursor: pointer;
        font-size: 44px;
        color: #ffffff;
        position: relative;
        width: 402px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        background-size: 100% 100%;
        background-image: url(@/assets/images/bg-nav-item.png);

        &.router-link-active,
        &:hover {
            background-image: url(@/assets/images/bg-nav-item-a.png);
        }
    }

}

.functional_pannel_wrapper {
    position: fixed;
    left: 402px;
    bottom: 84px;
    width: 128px;
}


.ai-wrap {
    position: fixed;
    bottom: 0;
    left: 840px;
    pointer-events: all;
    z-index: 1;

    .robot {
        cursor: pointer;

        img {
            height: 150px;
        }
    }

    .btn-ai {
        margin-left: 80px;
        width: 196px;
        height: 40px;
        line-height: 40px;
        background-size: 100% 100%;
        background-image: url(@/assets/images/bg-btn-ai.png);
        color: #fff;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
    }
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
}

.animation-wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 148px;
    height: 371px;
    transform: translate(-50%, -50%);
    pointer-events: all;

    .grow {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0%;
        overflow: hidden;
    }

    img {
        position: absolute;
        bottom: 0;
        width: 148px;
        height: 371px;
        // transform: translate(0, 100%);
    }

    .btn-start {
        cursor: pointer;
    }
}
</style>
