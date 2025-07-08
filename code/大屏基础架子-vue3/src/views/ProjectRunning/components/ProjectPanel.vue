<template>
    <div class="project-panel panel-container-right">
        <div class="panel-common-title">工程概况</div>
        <div class="panel-common-section">
            <div class="panel-common-sub-title">水环境治理工程</div>
            <div class="details">
                <div>
                    <div>
                        分流改造：雨污水管
                        <span class="val">91.92</span>
                        km
                    </div>
                </div>
                <div>
                    <div>
                        厂站建设：新建
                        <span class="val">1</span>
                        座
                        <span class="br"></span>
                        扩容
                        <span class="val">4</span>
                        座
                        <span class="br"></span>
                        新改建
                        <span class="val">7</span>
                        座
                    </div>
                </div>
                <div>
                    <div>
                        泵站完善：新建
                        <span class="val">12</span>
                        座
                        <span class="br"></span>
                        改建
                        <span class="val">1</span>
                        座
                    </div>
                </div>
                <div>
                    <div>
                        海绵调蓄：湿地、水塘共
                        <span class="val">13391.8</span>
                        ㎡
                    </div>
                </div>
                <div>
                    <div>
                        清淤工程：箱涵清淤
                        <span class="val">137</span>
                        m³
                        <span class="br"></span>
                        河道清淤
                        <span class="val">41430</span>
                        m³
                    </div>
                </div>
            </div>

            <div class="panel-common-sub-title">水岸线治理工程</div>
            <div class="details">
                <div>
                    <div>新建护岸</div>
                    <div class="val-wrap"><span class="val">1.6</span>km</div>
                </div>
            </div>

            <div class="panel-common-sub-title">水生态修复工程</div>
            <div class="details">
                <div>
                    <div>生态缓冲带</div>
                    <div class="val-wrap"><span class="val">2</span>节点</div>
                </div>
                <div>
                    <div>生态补水-改造补水泵站</div>
                    <div class="val-wrap"><span class="val">1</span>座</div>
                </div>
            </div>

            <div class="panel-common-sub-title">水智慧工程</div>
            <div class="details">
                <div>
                    <div>一品河、黄溪河智慧系统</div>
                    <div class="val-wrap"><span class="val">1</span>套</div>
                </div>
            </div>

            <div class="panel-common-sub-title">水环境配套工程</div>
            <div class="details">
                <div>
                    <div>路灯、厕所，停车位等配套设施</div>
                    <div class="val-wrap"><span class="val">1</span>套</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

onMounted(() => {})
</script>


<style lang="less" scoped>
.project-panel {
    .panel-common-section {
        padding: 16px;
        .details {
            margin-bottom: 20px;
            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: 42px;
                margin-top: 5px;
                height: 43px;
                background-image: url('@/assets/images/bg-item.png');
                background-size: 100% 100%;
                font-size: 14px;
                color: #b3d9ff;
                .val {
                    margin-top: -5px;
                    font-size: 18px;
                    color: #00ffff;
                    font-family: D-DIN, D-DIN;
                }
                .br {
                    margin-left: 10px;
                }
                .val-wrap {
                    margin-right: 20px;
                    .val {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
