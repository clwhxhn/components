<template>
    <div class="monitor-kpi panel-container-right">
        <img class="img-panel" src="@/assets/images/panel/monitor-kpi.png" alt="" />
        <!-- <div class="panel-common-title">运行指标</div>
        <div class="rate-wrap">
            <div v-for="(item, index) in rateList" :key="index">
                <div class="chart-wrap">
                    <BEcharts :option="item.option" />
                    <div class="val">
                        <span>{{ item.val }}</span>
                        %
                    </div>
                </div>
                <div>{{ item.label }}</div>
            </div>
        </div>

        <div class="panel-common-title">运行监控</div>
        <div class="panel-common-section">
            <div class="range-picker-wrap">
                <a-range-picker v-model:value="timeRange" />
            </div>
            <div class="search-wrap">
                <a-input placeholder="请输入关键字搜索" />
                <div class="btn-search">搜索</div>
            </div>

            <div class="tabs">
                <div
                    v-for="(item, index) in tabsOption"
                    :key="index"
                    :class="{ active: item.val === curTabVal }"
                    @click="changeTab(item)">
                    {{ item.title }}
                </div>
            </div>

            <div class="warn-list">
                <div>
                    <div class="title-wrap">
                        <img
                            src="@/assets/images/icon-warn-level1.png"
                            alt="" />
                        <div class="title">一品河入江口断面监测点水质报警</div>
                        <div class="status">已派确认单</div>
                    </div>
                    <div class="warn-content">
                        <div>
                            <span>【水质报警】</span>
                            当前COD为759mg/l，正常值为80～320mg/l，报警已持续144小时，请及时关注。
                        </div>
                    </div>
                    <div class="warn-time"></div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import BEcharts from '@/components/BEcharts.vue'
import dayjs, { Dayjs } from 'dayjs'

const rateList = ref([
    {
        label: '设备在线率',
        val: 99
    },
    {
        label: '水位达标率',
        val: 100
    },
    {
        label: '水质达标率',
        val: 100
    },
    {
        label: '处置及时率',
        val: 98
    }
])
rateList.value.forEach(item => {
    item.option = {
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['86%', '100%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: item.val,
                        name: '已办结',
                        itemStyle: { color: '#7CE0C3' }
                    },
                    {
                        value: 100 - item.val,
                        name: '待处理',
                        itemStyle: { color: 'rgba(53,90,146,0.5)' }
                    }
                ]
            }
        ]
    }
})

const timeRange = ref<[Dayjs, Dayjs]>([
    dayjs('2015/01/01', 'YYYY-MM-DD'),
    dayjs('2015/01/01', 'YYYY-MM-DD')
])

const tabsOption = ref([
    { title: '全部', val: 'all' },
    { title: '一级报警', val: '1' },
    { title: '二级报警', val: '2' },
    { title: '三级报警', val: '3' }
])
const curTabVal = ref('all')
const changeTab = item => {
    curTabVal.value = item.val
}

const warnList = ref([])

onMounted(() => {})
</script>


<style lang="less" scoped>
.monitor-kpi {
    .img-panel {
        width: 100%;
    }
    .rate-wrap {
        margin-bottom: 16px;
        padding: 10px 20px;
        background: rgba(21, 53, 102, 0.5);
        color: #fff;
        display: flex;
        justify-content: space-between;

        .chart-wrap {
            position: relative;
            width: 66px;
            height: 66px;
            .b-echarts {
                width: 100%;
                height: 100%;
            }
            .val {
                position: absolute;
                left: 50%;
                top: 50%;
                padding-top: 6px;
                width: 50px;
                height: 50px;
                transform: translate(-50%, -50%);
                background-image: url('@/assets/images/bg-val.png');
                background-size: 100% 100%;
                text-align: center;

                span {
                    font-family: D-DIN, D-DIN;
                    font-size: 22px;
                    color: #75fbfd;
                }
            }
        }
    }
    .panel-common-section {
        padding: 6px;
        .range-picker-wrap {
            :deep(.ant-picker) {
                width: 100%;
                height: 32px;
                background: rgba(30, 60, 106, 0.2);
                box-shadow: inset 0px 1px 6px 0px rgba(51, 133, 255, 0.5);
                border: 1px solid rgba(118, 172, 253, 0.5);
                border: none;
                .ant-picker-input > input {
                    color: #ddf8ff;
                    font-size: 15px;
                }
            }
        }
        .search-wrap {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .ant-input {
                width: 308px;
                height: 32px;
                background: rgba(30, 60, 106, 0.2);
                box-shadow: inset 0px 1px 6px 0px rgba(51, 133, 255, 0.5);
                border: 1px solid rgba(118, 172, 253, 0.5);
                color: #ddf8ff;
                &::placeholder {
                    color: #76acfd;
                }
            }
            .btn-search {
                width: 71px;
                height: 32px;
                line-height: 32px;
                background-image: url('@/assets/images/btn.png');
                background-size: 100% 100%;
                font-size: 15px;
                color: #ffffff;
                text-align: center;
                cursor: pointer;
            }
        }

        .tabs {
            margin: 8px 5px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            > div {
                width: 92px;
                height: 40px;
                line-height: 40px;
                background: linear-gradient(
                    180deg,
                    rgba(0, 66, 165, 0.16) 0%,
                    rgba(0, 66, 165, 0.5) 90%,
                    #003a7a 100%
                );
                border: 1px solid;
                border-image: radial-gradient(
                        circle,
                        rgba(0, 186, 255, 1),
                        rgba(255, 255, 255, 0)
                    )
                    1 1;
                text-align: center;
                font-size: 15px;
                color: #b3d1ff;
                &.active {
                    height: 47px;
                    line-height: 50px;
                    background-image: url('@/assets/images/bg-tab.png');
                    background-size: 100% 100%;
                    color: #fff;
                    border: none;
                }
            }
        }

        .warn-list {
            > div {
                padding: 10px;
                height: 134px;
                background-image: url('@/assets/images/bg-warn.png');
                background-size: 100% 100%;
                > div {
                    display: flex;
                    align-items: center;
                }
                .title-wrap {
                    justify-content: space-between;
                    color: #ffffff;
                    img {
                        width: 24px;
                    }
                    .title {
                        width: 240px;
                        font-size: 15px;
                    }
                    .status {
                        width: 90px;
                        height: 20px;
                        line-height: 19px;
                        padding-left: 16px;
                        font-size: 12px;
                        background-image: url('@/assets/images/bg-status.png');
                        background-size: 100% 100%;
                    }
                }
                .warn-content {
                    height: 56px;
                    background: rgba(118,172,253,0.16);
                    justify-content: center;
                    color: #fff;
                    span {
                        color: #F2B975;
                    }
                }
            }
        }
    }
}
</style>
