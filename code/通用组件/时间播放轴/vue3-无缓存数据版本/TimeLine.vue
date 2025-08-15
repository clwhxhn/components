<template>
    <div class="timeline-container">
        <div class="icon-box">
            <img
                v-if="!isAutoPlay"
                src="@/assets/images/flood-situation/detail-bottom/player-start.png"
                class="icon"
                alt=""
                @click="onPlay" />
            <img
                v-if="isAutoPlay"
                src="@/assets/images/flood-situation/detail-bottom/player-pause.png"
                class="icon"
                alt=""
                @click="onPause" />
        </div>
        <div class="slider-content">
            <a-slider
                v-model:value="sliderValue"
                :marks="marks"
                :max="sliderMax"
                :step="1"
                :tip-formatter="tipFormatter"
                :tooltip-visible="showTooltip"
                :get-tooltip-popup-container="
                    triggerNode => triggerNode.parentNode
                "
                @after-change="sliderChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue'
import dayjs from 'dayjs'

const emits = defineEmits(['play', 'pause', 'sliderChange'])

const props = defineProps({
    timeList: {
        type: Array,
        required: true,
        default: () => []
    },
    displayCount: {
        type: Number,
        default: 7
    },
    // 时间格式
    timeFormat: {
        type: String,
        default: 'MM-DD HH'
    }
})

let timer
const speed = 1000
const marks = ref({})
// 最大时间轴
const sliderMax = ref(100)
const sliderValue = ref()
const isAutoPlay = ref(false)
const showTooltip = ref(false)

const play = () => {
    emits('sliderChange', sliderValue.value)
    showTooltip.value = true
    if (sliderValue.value === sliderMax.value) {
        clearTimeout(timer)
        isAutoPlay.value = false
        showTooltip.value = false
        return
    }
    timer = setTimeout(() => {
        sliderValue.value += 1
        play()
    }, speed)
}

const onPlay = () => {
    if (!props.timeList.length) {
        message.warning('暂无时间轴数据')
        return
    }
    isAutoPlay.value = true
    play()
}

const sliderChange = value => {
    sliderValue.value = value
    emits('sliderChange', value)
    showTooltip.value = true
}

const onPause = () => {
    isAutoPlay.value = false
    clearTimeout(timer)
    emits('pause')
}

const tipFormatter = val => {
    return `${dayjs(props.timeList[val]).format(props.timeFormat)}`
}

// 初始化时间轴的刻度
const initSlider = list => {
    // 如果是播放状态就暂停
    isAutoPlay.value = false
    showTooltip.value = false

    // 时间数组为空，重置时间轴
    if (!list.length) {
        sliderMax.value = 100 // 设置滚动条的最大值
        sliderValue.value = 0 // 重置滚动条的值
        marks.value = {}
        return
    }
    marks.value = {}

    const times = list.map((item, index) => {
        // marks.value[index] = '' // marks 只显示小圆点不显示文字
        // 对显示的小圆点进行过滤，超过一定数量则间隔显示
        if (list.length > props.displayCount) {
            const interval = Math.floor(list.length / props.displayCount)
            if (
                (index % interval === 0 &&
                    index < list.length - props.displayCount + 1) ||
                index === list.length - 1
            ) {
                marks.value[index] = dayjs(item).format(props.timeFormat)
            }
        } else {
            marks.value[index] = dayjs(item).format(props.timeFormat)
        }

        return item
    })

    sliderMax.value = times.length - 1 // 设置滚动条的最大值
    // marks.value[0] = '' // dayjs(times[0]).format(timeFormat); // 将第一个刻度的文字描述
    // marks.value[sliderMax.value] = '' // 将最后一个刻度的文字描述
    sliderValue.value = 0 // 重置滚动条的值
    // console.log(marks.value)
}

watch(
    () => props.timeList,
    () => {
        initSlider(props.timeList)
    },
    { deep: true, immediate: true }
)
</script>

<style lang="less" scoped>
.timeline-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    height: 60px;
    padding: 0 36px 0 12px;
    .icon-box {
        display: flex;
        margin-right: 18px;
        img {
            cursor: pointer;
            width: 28px;
            height: 28px;

            &:hover {
                opacity: 0.9;
            }
        }
    }

    .slider-content {
        width: 100%;
        margin-top: -14px;
        position: relative;

        /deep/ .ant-slider {
            width: 100%;
            margin: 0;
            position: absolute;

            // 背景
            .ant-slider-step {
                height: 8px;
                border: 1px solid rgba(221, 248, 255, 0.5);
                background: rgba(221, 248, 255, 0.32);
                border-radius: 8px;
                z-index: 1;
            }

            .ant-slider-rail {
                height: 8px;
                background-color: rgba(162, 202, 234, 0.4);
                border-radius: 8px;
            }

            // 选中的轨道
            .ant-slider-track {
                height: 9px;
                margin-top: -1px;
                background: linear-gradient(180deg, #293ab3 0%, #31eabe 100%);
                border: 1px solid rgba(62, 188, 238, 1);
            }

            //最后一个刻度
            .ant-slider-dot {
                z-index: 2;
                top: -3px !important;
                width: 12px;
                height: 12px;
                background-image: url('@/assets/images/flood-situation/detail-bottom/time-dot.png');
                background-size: 100% 100%;
                border: none;
                background-color: transparent;
            }

            // 选中的刻度
            .ant-slider-handle {
                top: 3px;
                z-index: 3;
                width: 20px;
                height: 20px;
                border: none;
                background-image: url('@/assets/images/flood-situation/detail-bottom/time-dot-act.png');
                background-size: 100% 100%;
                background-color: transparent;
            }

            .ant-slider-mark {
                z-index: 99;

                .ant-slider-mark-text {
                    font-size: 12px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    color: #ddf8ff;
                    min-width: 100px;
                    text-align: center;
                    margin-top: 10px;
                }

                .ant-slider-mark-text:last-child {
                    text-align: left;
                }
            }

            .ant-tooltip-inner {
                font-size: 12px;
            }

            .mark-wrap {
                position: relative;
                color: #fff;
                text-align: center;
                font-family: PingFang SC, PingFang SC;
                font-weight: 400;
                font-size: 12px;
                color: #ffffff;
            }
        }

        .show-style {
            width: 99.3%;
            position: absolute;
            top: 13px;
        }
    }
}
</style>
