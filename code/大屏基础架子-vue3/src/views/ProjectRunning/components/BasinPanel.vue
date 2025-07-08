<template>
    <div class="basin-panel panel-container-left">
        <div class="panel-common-title">流域概况</div>
        <div class="panel-common-section">
            <div class="panel-common-sub-title">一品河流域概况</div>
            <div class="details">
                <div>
                    <img src="@/assets/images/icon-item1.png" alt="" />
                    <div>
                        <div class="label">河长</div>
                        <div class="points">··············</div>
                        <div class="val">
                            <span>51</span>
                            km
                        </div>
                    </div>
                </div>
                <div>
                    <img src="@/assets/images/icon-item2.png" alt="" />
                    <div>
                        <div class="label">流域面积</div>
                        <div class="points">··············</div>
                        <div class="val">
                            <span>363</span>
                            k㎡
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-details">
                <div>
                    <div class="label">巴南区境内</div>
                    <div class="points">··············</div>
                    <div class="val">
                        <span>328.3</span>
                        k㎡
                    </div>
                </div>
                <div>
                    <div class="label">綦江区境内</div>
                    <div class="points">··············</div>
                    <div class="val">
                        <span>34.7</span>
                        k㎡
                    </div>
                </div>
            </div>

            <div class="panel-common-sub-title mt">黄溪河流域概况</div>
            <div class="details">
                <div>
                    <img src="@/assets/images/icon-item1.png" alt="" />
                    <div>
                        <div class="label">河长</div>
                        <div class="points">··············</div>
                        <div class="val">
                            <span>10.75</span>
                            km
                        </div>
                    </div>
                </div>
                <div>
                    <img src="@/assets/images/icon-item2.png" alt="" />
                    <div>
                        <div class="label">流域面积</div>
                        <div class="points">··············</div>
                        <div class="val">
                            <span>16.61</span>
                            k㎡
                        </div>
                    </div>
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
.basin-panel {
    .panel-common-section {
        padding: 16px;
        .mt {
            margin-top: 16px;
        }
        .details {
            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;
                img {
                    width: 32px;
                }
                > div {
                    display: flex;
                    align-items: center;
                    color: #fff;
                    padding-left: 10px;
                    width: 336px;
                    height: 32px;
                    background: linear-gradient(
                            90deg,
                            rgba(47, 92, 144, 0) 0%,
                            rgba(56, 111, 174, 0.42) 52%,
                            rgba(47, 92, 144, 0) 100%
                        ),
                        radial-gradient(
                            25% 47% at 50% 0%,
                            rgba(100, 172, 252, 0.4) 0%,
                            rgba(36, 80, 109, 0) 100%
                        ),
                        radial-gradient(
                            10% 24% at 22% 100%,
                            rgba(255, 255, 255, 0.5) 0%,
                            rgba(36, 53, 109, 0) 100%
                        );
                    border-radius: 2px;
                    border: 1px solid;
                    border-image: linear-gradient(
                            90deg,
                            rgba(115, 180, 255, 0.28),
                            rgba(79, 143, 218, 1),
                            rgba(141, 194, 255, 0.1)
                        )
                        1 1;
                    .label {
                        width: 100px;
                        font-size: 14px;
                    }
                    .points {
                        margin-right: 10px;
                        color: rgba(161, 193, 230, 0.5);
                    }
                    .val {
                        font-size: 12px;
                        span {
                            font-family: D-DIN, D-DIN;
                            font-size: 20px;
                            color: #00ffff;
                        }
                    }
                }
            }
        }
        .sub-details {
            padding: 4px 0 0 40px;
            height: 71px;
            background-image: url('@/assets/images/bg-sub-details.png');
            background-size: 100% 100%;
            > div {
                display: flex;
                align-items: center;
                color: #fff;
                .label {
                    width: 100px;
                    font-size: 14px;
                }
                .points {
                    margin-right: 10px;
                    color: rgba(161, 193, 230, 0.5);
                }
                .val {
                    font-size: 12px;
                    span {
                        font-family: D-DIN, D-DIN;
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
