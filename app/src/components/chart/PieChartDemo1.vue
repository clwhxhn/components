<template>
    <div class="row row2">
        <div class="chart-box">
            <BEcharts :option="chartOption" />
            <div class="title">
                <div class="value">
                    设备评估
                </div>
                <div class="value">
                    结果统计
                </div>
            </div>
        </div>
        <div class="list">
            <div v-for="(item, index) in list" :key="index" class="list-item">
                <div class="list-item-lf">
                    <i class="circle" />
                    <span class="name">{{ item.name }}</span>
                </div>
                <div class="list-item-rt">
                    <span class="value">{{ item.value }}</span>
                    <span class="unit">{{ item.unit }}</span>
                    <span class="percent">占比15%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BEcharts from "@/components/chart/BEcharts";

const colors = [
    '#3DD3C0',
    '#FFA44C',
    '#FBD45C',
    '#1E89FF',
]

export default {
    data() {
        return {
            chartOption: {},
            list: [
                {
                    name: '优',
                    value: 77,
                    unit: '个',
                },
                {
                    name: '良',
                    value: 20,
                    unit: '个',
                },
                {
                    name: '中',
                    value: 20,
                    unit: '个',
                },
                {
                    name: '差',
                    value: 10,
                    unit: '个',
                },
            ]
        }
    },
    components: {
        BEcharts
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            const data = this.list.map((item, index) => {
                return {
                    value: item.value,
                    name: item.name,
                    itemStyle: {
                        color: colors[index],
                        borderWidth: 0,
                    },
                }
            })
            const option = {
                tooltip: {
                    trigger: 'item',
                },
                title: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                series: [
                    {
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: [
                            '90%',
                            '65%',
                        ],
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data,
                    },
                ],
                color: colors,
            }

            this.chartOption = option
        }
    }
}
</script>

<style lang="less" scoped>
.row2 {
    border-top: 1px dashed #DADEE5;
    display: flex;
    align-items: center;
    padding-top: 32px;

    .chart-box {
        flex: 1;
        position: relative;
        height: 118px;
        background-image: url('~@/assets/img/water-disasters-defense/pie-bg.png');
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;

        .title {
            width: 60%;
            top: 42px;
            left: 20%;
            position: absolute;
            text-align: center;

            .value {
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                font-size: 12px;
                color: #333333;
                line-height: 17px;
            }
        }
    }

    .list {
        width: 160px;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .list-item {
            display: flex;
            justify-content: space-between;
            padding: 0 13px 0 9px;
            background: #FFFFFF;
            border-radius: 2px;

            &:not(:last-child) {
                margin-bottom: 5px;
            }

            &-lf {
                .circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(180deg, #4CBCFC 0%, #418BFA 100%);
                    border-radius: 2px;
                    margin-right: 5px;
                    position: relative;
                    top: -1px;
                }

                .name {
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 600;
                    font-size: 14px;
                    color: #333333;
                    line-height: 20px;
                }
            }

            &-rt {

                .value,
                .unit {
                    font-family: D-DIN, D-DIN;
                    font-weight: bold;
                    font-size: 16px;
                    color: #0B80FF;
                    line-height: 17px;
                }

                .unit {
                    color: #333333;
                    font-size: 14px;
                    margin-right: 11px;
                    font-weight: normal;
                }

                .percent {
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 500;
                    font-size: 12px;
                    color: #333333;
                    line-height: 17px;
                }
            }
        }
    }
}
</style>