<template>
  <ClickPopup :properties="properties" :title="title" @close="handleClose">
    <VideoPopup v-if="type === 'video'" slot="detail" :detail="properties"></VideoPopup>
  </ClickPopup>
</template>

<script>
import ClickPopup from '@/components/map/components/ClickPopup.vue'
import VideoPopup from './business/VideoPopup'

export default {
  name: 'StationClickPopup',
  components: {
    ClickPopup,
    VideoPopup
  },
  props: {
    properties: {
      type: Object,
      default: () => ({})
    },
    type: '', // slot（video-视频）
  },
  data() {
    return {}
  },
  computed: {
    title() {
      return this.properties.name
    }
  },
  watch: {},
  created() {},
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.click-warp {
  width: 570px;
  background: rgba(243, 246, 251, 1);
  border-radius: 8px;

  .header {
    width: 100%;
    height: 32px;
    background: linear-gradient(90deg, #3377ff 0%, #cfe2ff 100%);
    display: flex;
    border-radius: 8px 8px 0 0;
    justify-content: space-between;
    align-items: center;
    //padding: 0 16px;

    .title {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }

    .close {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      color: #4e89ff;
    }
  }
}
</style>
