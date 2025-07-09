<template>
  <div class="pdf-preview">
    <div class="pdf-wrap">
      <vue-office-docx
        v-if="!pdfUrl.endsWith('.pdf')"
        :src="pdfUrl"
        :style="scale" />
      <div v-else-if="pdfDoc">
        <template v-for="index in pdfDoc._pdfInfo.numPages" :key="index">
          <canvas
            v-show="state.pageNum <= 0 || index == state.pageNum"
            class="pdf-page"
            :style="scale" />
        </template>
      </div>
      <div v-else class="loading"><a-spin /></div>
    </div>
    <div class="page-tool">
      <div class="page-tool-item" @click="lastPage">上一页</div>
      <div class="page-tool-item" @click="nextPage">下一页</div>
      <div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
      <div class="page-tool-item" @click="pageZoomOut">放大</div>
      <div class="page-tool-item" @click="pageZoomIn">缩小</div>
      <div class="page-tool-item" @click="close">关闭</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as pdfjsDist from 'pdfjs-dist'
import * as pdfWorkerMin from 'pdfjs-dist/build/pdf.worker.min?url'
import { ref, reactive, onMounted, computed } from 'vue'
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

const emits = defineEmits(['close'])

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  }
})

const state = reactive({
  source: props.pdfUrl, // 预览pdf文件地址
  pageNum: 1, // 当前页面
  scale: 1, // 缩放比例
  numPages: 1 // 总页数
})

let pdfDoc = ref(null)

onMounted(() => {
  pdfjsDist.GlobalWorkerOptions.workerSrc = pdfWorkerMin.default
  pdfjsDist.getDocument(props.pdfUrl).promise.then(pdf => {
    pdfDoc.value = pdf
    state.numPages = pdf._pdfInfo.numPages
    const pdfPages = document.getElementsByClassName('pdf-page')
    for (let i = 0; i < pdf._pdfInfo.numPages - 1; i++) {
      pdf.getPage(i + 1).then(page => {
        const viewport = page.getViewport({ scale: 1 })
        const context = pdfPages[i].getContext('2d')
        pdfPages[i].height = viewport.height
        pdfPages[i].width = viewport.width
        page.render({
          canvasContext: context,
          viewport: viewport
        })
      })
    }
    // emit('loaded', pdf)
  })
})

const scale = computed(() => `transform:scale(${state.scale})`)
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1
  }
}
function pageZoomOut() {
  if (state.scale < 2) {
    state.scale += 0.1
  }
}
function pageZoomIn() {
  if (state.scale > 1) {
    state.scale -= 0.1
  }
}
function close() {
  emits('close')
}
</script>
<style lang="css" scoped>
:deep(.docx-wrapper) {
  background: unset !important;
}
.pdf-preview {
  position: fixed;
  top: 10vh;
  width: 80vw;
  left: 10vw;
  height: 80vh;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: rgba(25, 47, 82);
}
.pdf-wrap {
  height: 90%;
  width: 100%;
  overflow: auto;
}

.loading {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vue-pdf-embed {
  text-align: center;
  width: 515px;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}
.page-tool {
  position: absolute;
  bottom: 35px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  background: rgb(66, 66, 66);
  color: white;
  border-radius: 19px;
  z-index: 100;
  cursor: pointer;
  margin-left: 50%;
  transform: translateX(-50%);
}
.page-tool-item {
  padding: 8px 15px;
  padding-left: 10px;
  cursor: pointer;
}
</style>
