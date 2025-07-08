<template>
    <div class="character-box">
        <div class="normal-wl" :style="{ height: getBottom('waterLevel') }">
            <div>
                <span class="wl-name">正常蓄水位：</span>
                <span class="wl-value" :style="{ color: '#20B8FF' }">
                    {{ data.waterLevel }}
                </span>
                <span class="wl-unit">m</span>
            </div>
        </div>
        <div
            v-for="wl in CHARACTERISTIC_WL"
            :key="wl.key"
            class="character-wl"
            :style="{ borderColor: wl.color, bottom: getBottom(wl.key) }">
            <span class="wl-name">{{ wl.name }}：</span>
            <span class="wl-value" :style="{ color: wl.color }">
                {{ data[wl.key] }}
            </span>
            <span class="wl-unit">m</span>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            checkFloodWL: 57.65,
            designFloodWL: 56.5,
            floodControlWL: 48.7,
            deadWL: 45,
            min: 40,
            max: 60,
            waterLevel: 50.3
        })
    }
})

// 特征水位
const CHARACTERISTIC_WL = [
    {
        name: '校核洪水位',
        color: '#FF2020',
        key: 'checkFloodWL'
    },
    {
        name: '设计洪水位',
        color: '#FF8520',
        key: 'designFloodWL'
    },
    {
        name: '汛限水位',
        color: '#FFC320',
        key: 'floodControlWL'
    },
    {
        name: '死水位',
        color: '#94A9D3',
        key: 'deadWL'
    }
]

const getBottom = key => {
    return (
        (
            ((props.data[key] - props.data.min) /
                (props.data.max - props.data.min)) *
            100
        ).toFixed(2) + '%'
    )
}
</script>
<style lang="less" scoped>
.character-box {
    width: 614px;
    height: 290px;
    margin: 0 auto;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-image: url('@/assets/images/four-comprehensive/bg-character-wl.png');
        background-size: 100% 100%;
    }

    .character-wl {
        position: absolute;
        width: 100%;
        border-style: dashed;
        border-width: 0 0 1px 0;
        line-height: 16px;
        &:nth-child(2) {
            padding-left: 100px;
        }
        &:nth-child(3) {
            padding-left: 140px;
        }
        &:nth-child(4) {
            padding-left: 180px;
        }
        &:nth-child(5) {
            padding-left: 160px;
        }
    }
    .wl-name,
    .wl-unit {
        font-size: 16px;
        color: #ffffff;
    }
    .wl-value {
        font-family: D-DIN;
        font-size: 20px;
    }
    .normal-wl {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        background: linear-gradient(
            180deg,
            rgba(0, 174, 255, 0.5) 0%,
            rgba(0, 174, 255, 0.1) 100%
        );
        border-top: 2px solid #1cc2fd;
        & > div {
            position: absolute;
            top: -28px;
            right: 60px;
        }
    }
}
</style>
