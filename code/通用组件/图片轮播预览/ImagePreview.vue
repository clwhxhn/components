<template>
    <!-- 图片预览组件 -->
    <div class="image-preview">
        <div class="image-preview-left">
            <a-carousel
                ref="carouselRef"
                arrows
                :autoplay="false"
                dots-class="slick-dots slick-thumb"
                :afterChange="onAfterChange">
                <template #customPaging="props">
                    <a>
                        <div class="c-dot" />
                    </a>
                </template>

                <div v-for="item in list" :key="item" class="carousel-item">
                    <img :src="item.url" />
                    <div class="bottom-name" :title="item.name">
                        {{ item.name }}
                    </div>
                </div>
            </a-carousel>
            <!-- 左右切换按钮 -->
            <div class="carousel-btn-left" @click="prevSlide" />
            <div class="carousel-btn-right" @click="nextSlide" />
            <!-- 全屏按钮 -->
            <img
                class="full-screen"
                src="@/assets/images/four-manage/full-screen.png"
                alt=""
                @click="openFullScreen" />
        </div>
        <!-- 图片列表 -->
        <div class="images-list">
            <div
                v-for="(item, index) in list"
                :key="item"
                class="image-item"
                :class="{ active: currentIndex === index }"
                @click="onImageClick(index)">
                <div class="image-wrap">
                    <img :src="item.url" />
                </div>
                <div class="image-name">{{ item.name }}</div>
            </div>
        </div>

        <!-- 用于全屏显示的容器 -->
        <div ref="fullScreenRef" class="full-screen-view" v-if="isFullScreen">
            <img :src="list[currentIndex].url" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount, defineProps } from 'vue';
import type { PropType } from 'vue'

interface ImageItem {
  url: string
  name: string
}

const props = defineProps({
  list: {
    type: Array as PropType<ImageItem[]>,
    default: () => []
  }
})

const currentIndex = ref(0)

const onAfterChange = index => {
    currentIndex.value = index
    scrollIntoView(index)
}
// 滚动到当前图片
const scrollIntoView = index => {
    const el = document.querySelectorAll('.image-item')[index]
    console.log('el: ', el)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
}

// 点击右侧图片时，让左侧联动
const carouselRef = ref()
const onImageClick = (index: number) => {
    carouselRef.value.goTo(index, false) // 第二个参数 false 表示无动画（可改成 true 有动画）
    currentIndex.value = index
    scrollIntoView(index)
}

// 左右按钮
const prevSlide = () => {
    carouselRef.value?.prev()
}
const nextSlide = () => {
    carouselRef.value?.next()
}

// 打开全屏
const fullScreenRef = ref()
const isFullScreen = ref(false)
const openFullScreen = () => {
  isFullScreen.value = true
    nextTick(async () => {
      try {
        await fullScreenRef.value.requestFullscreen();
      } catch (e) {
        console.error("全屏失败:", e);
      }
    })
};
// 退出全屏
const exitFullScreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen()
  }
}
 // 监听全屏状态变化（比如按 ESC）
const handleFullScreenChange = () => {
  if (!document.fullscreenElement) {
    isFullScreen.value = false
  }
}

 onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullScreenChange)
})

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", handleFullScreenChange)
})
</script>

<style lang="less" scoped>
.image-preview {
    display: flex;
    gap: 9px;
    .image-preview-left {
        width: 740px;
        height: 456px;
        position: relative;

        .carousel-item {
            height: 456px;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain; /* 保持比例，完全显示，不拉伸 */
            }
            .bottom-name {
                position: absolute;
                padding-left: 16px;
                bottom: 0;
                left: 0;
                width: 270px;
                height: 32px;
                background-image: url('@/assets/images/four-manage/image-text-bg.png');
                background-size: 100% 100%;
                font-family: Alibaba PuHuiTi 3, Alibaba PuHuiTi 30;
                font-weight: 500;
                font-size: 16px;
                color: #c0d7ff;
                line-height: 32px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        // 操作按钮
        .carousel-btn-left,
        .carousel-btn-right {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 43px;
            cursor: pointer;
            z-index: 10;
        }
        .carousel-btn-left {
            left: 8px;
            background-image: url('@/assets/images/four-manage/arrow-left.png');
            background-size: 100% 100%;
            &:hover {
                background-image: url('@/assets/images/four-manage/arrow-left-act.png');
            }
        }
        .carousel-btn-right {
            right: 8px;
            background-image: url('@/assets/images/four-manage/arrow-right.png');
            background-size: 100% 100%;
            &:hover {
                background-image: url('@/assets/images/four-manage/arrow-right-act.png');
            }
        }

        // 全屏按钮
        .full-screen {
            position: absolute;
            z-index: 10;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
        .full-screen-view {
            height: 100vh;
            width: 100vw;
        }
    }
    .images-list {
        width: 136px;
        height: 456px;
        overflow-y: auto;
        .image-item {
            .image-wrap {
                height: 74px;
                background-image: url('@/assets/images/four-manage/termite-bg.png');
                background-size: 100% 100%;
                margin-bottom: 4px;
                padding: 6px 5px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain; /* 保持比例，完全显示，不拉伸 */
                }
            }
            .image-name {
                font-family: Alibaba PuHuiTi 3, Alibaba PuHuiTi 30;
                font-weight: 500;
                font-size: 14px;
                color: #c0d7ff;
                line-height: 20px;
                text-align: left;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .image-item.active .image-wrap {
            background-image: url('@/assets/images/four-manage/img-select-bg.png');
            background-size: 100% 100%;
        }
    }
}
// dot
:deep(.ant-carousel .slick-dots) {
    z-index: 20;
    position: absolute;
    bottom: -30px;
    right: 0;
}

:deep(.slick-arrow) {
    display: none !important;
}

:deep(.slick-thumb li) {
    width: 7px;
    height: 7px;
}
:deep(.ant-carousel .slick-dots li.slick-active) {
    width: 7px;
    height: 7px;
}

:deep(.slick-thumb li .c-dot) {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: #8ea7d3;
}

:deep(.slick-thumb .slick-active .c-dot) {
    background-color: #d5e5ff;
}
</style>
