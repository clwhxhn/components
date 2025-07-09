<template>
  <div class="video-player-wrapper" :class="isFullClass">
    <div v-if="player && closeSwitch" class="video-top">
      <!-- <a-icon type="close" @click="close" /> -->
    </div>
    <div v-show="!src" class="empty">
      <div class="empty-picture"></div>
      <div class="empty-text">暂无视频数据</div>
    </div>
    <div v-show="src" class="video-boxer">
      <div v-show="loading" class="video-boxer-loading">
        <Spin tip="加载中..." :spinning="loading"></Spin>
      </div>
      <div
        :id="id"
        crossorigin="anonymous"
        style="width: 100%; height: 100%"
      ></div>
    </div>
    <div class="video-cover" @dblclick="full"></div>
  </div>
</template>
<script>
import snowflake from '@/utils/snowflake'
import { Spin } from 'ant-design-vue'
export default {
  name: 'VideoPlayerWs',
  components: {
    Spin
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    closeSwitch: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      player: null,
      id: `video_${snowflake.generate()}`,
      isFull: false,
      loading: false
    }
  },
  computed: {
    isFullClass() {
      return this.isFull ? 'video-player-wrapper-full' : ''
    }
  },
  watch: {
    src: {
      handler(newVal) {
        if (newVal) {
          this.close()
          let timeoutid = setTimeout(() => {
            this.$nextTick().then(() => {
              this.init()
            })
            clearTimeout(timeoutid)
          }, 0)
        }
      },
      immediate: true
    }
  },
  mounted() {
    // this.init()
  },
  destroyed() {
    this.close()
  },
  methods: {
    // 视频播放器初始化
    init() {
      console.log(123132)
      // 无效src 直接结束
      if (!this.src) {
        return
      }
      const el = this.$el
      if (el) {
        this.loading = true
        this.player = new window.JSPlugin({
          szId: this.id,
          iHeight: el.clientHeight,
          iWidth: el.clientWidth,
          szBasePath: '/wpoled/js',
          openDebug: true,
          currentWindowIndex: this.index,
          oStyle: {
            borderSelect: window.MediaSource ? '#000' : '#FFCC00'
          }
        })

        this.player.JS_Resize(el.clientWidth, el.clientHeight)
        this.player
          .JS_Play(this.src, { playURL: this.src, mode: 0 }, this.index)
          .then(
            () => {
              this.loading = false
              this.onFull()
              // console.log('JS_Play success')
            },
            e => {
              this.loading = false
              this.$message.error('播放失败，请重新播放!')
              console.error('JS_Play failed:', e)
            }
          )
      }
    },
    // 视频播放器关闭
    close() {
      if (this.player) {
        this.player.JS_StopRealPlayAll()
        this.player = null
      }
    },
    onFull() {
      this.player.JS_SetWindowControlCallback({
        windowFullCcreenChange: full => {
          console.warn(full, 'full on')
          this.isFull = full
        }
      })
    },
    full() {
      if (this.player) {
        this.player.JS_FullScreenSingle(this.index).then(
          () => {
            //
          },
          () => {
            //
          }
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.video-player-wrapper-full {
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 111;
}
.video-boxer-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 111;
}
.video-boxer {
  position: relative;
}
.video-player-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  &:hover {
    .video-top {
      display: flex;
      justify-content: flex-end;
    }
  }
  .video-top {
    position: absolute;
    right: 0px;
    width: 100%;
    height: 30px;
    z-index: 19999;
    background-color: transparent;
    display: none;
    .anticon {
      color: #fff;
      &:hover {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
  .video-boxer {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .video-cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 11;
  }
  .empty {
    width: 100%;
    height: 100%;
    background: #f6f9fd;
    border: 1px solid rgba(42, 117, 214, 0.2);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .empty-picture {
      width: 200px;
      height: 115px;
      background-image: url('~@/assets/images/video-wall/no-video.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .empty-text {
      width: 96px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #79a2d7;
      line-height: 22px;
    }
  }
}
</style>
