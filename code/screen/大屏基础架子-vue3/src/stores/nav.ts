import { ref } from 'vue'
import { defineStore } from 'pinia'

export const NAV_LIST = [
  {
    name: '首页',
    path: ['/projectRunning']
  },
  {
    name: '厂',
    path: ['/plantStation']
  },
  {
    name: '网',
    path: ['/pipelineMonitor']
  },
  {
    name: '河',
    path: ['/riverMonitor']
  },
]

export const useNavStore = defineStore('nav', () => {
  const navActiveIdx = ref(0)
  const navVisible = ref(true)

  function setNavIdx(idx: number) {
    navActiveIdx.value = idx
  }
  function setNavVisible(visible: boolean) {
    navVisible.value = visible
  }

  return {
    navActiveIdx,
    navVisible,
    setNavIdx,
    setNavVisible
  }
})
