<template>
  <div class="viewer-container">
    <template v-if="error">
      <div @click="download" class="not-support">
        文件解析失败，点击下载到本地后查看
      </div>
    </template>
    <template v-else>
      <template v-if="['doc', 'docx', 'xls', 'xlsx', 'pdf'].includes(ext)">
        <div ref="officeContainer" class="office-viewer"></div>
      </template>
      <template v-else-if="['mp4', 'flv', 'm3u8'].includes(ext)">
        <ClapprPlayer :hideMask="true" :src="src"></ClapprPlayer>
      </template>
      <template v-else-if="['jpeg', 'png', 'jpg'].includes(ext)">
        <img class="img-viewer" :src="src" />
      </template>
      <template v-else>
        <div @click="download" class="not-support">
          不支持该文件类型，点击下载到本地后查看
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import jsPreviewDocx from "@js-preview/docx";
import "@js-preview/docx/lib/index.css";

import jsPreviewExcel from "@js-preview/excel";
import "@js-preview/excel/lib/index.css";

import jsPreviewPdf from "@js-preview/pdf";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import ClapprPlayer from "../clappr-player/ClapprPlayer.vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  ext: {
    type: String,
    required: true,
  },
});

const officeContainer = ref();
const officeInstance = ref();
const initDocx = () => {
  if (!officeContainer.value) return;
  officeInstance.value = jsPreviewDocx.init(officeContainer.value);
  officeInstance.value.preview(props.src).catch(errorHandler);
};

const initExcel = () => {
  if (!officeContainer.value) return;
  officeInstance.value = jsPreviewExcel.init(officeContainer.value);
  officeInstance.value.preview(props.src).catch(errorHandler);
};

const initPdf = () => {
  if (!officeContainer.value) return;
  officeInstance.value = jsPreviewPdf.init(officeContainer.value);
  officeInstance.value.preview(props.src);
};

const init = () => {
  destroy();
  if (["doc", "docx"].includes(props.ext)) {
    initDocx();
  } else if (["xlsx"].includes(props.ext)) {
    initExcel();
  } else if (["pdf"].includes(props.ext)) {
    initPdf();
  }
};

const destroy = () => {
  officeInstance.value?.destroy();
};

onMounted(init);
onBeforeUnmount(destroy);

watch(() => props.src, init);

const renderedHandler = () => {};

const error = ref();
const errorHandler = (err) => {
  console.log("文件解析失败:", err);
  error.value = err;
};
const download = () => {
  window.open(props.src);
};
</script>
<style scoped lang="less">
.viewer-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  .office-viewer {
    height: 100%;
    width: 100%;
  }
  .not-support {
    cursor: pointer;
    color: #1890ff;
  }
  .img-viewer {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
