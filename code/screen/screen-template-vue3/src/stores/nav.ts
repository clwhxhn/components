import { ref } from 'vue'
import { defineStore } from 'pinia'

export const NAV_LIST = [
  {
    name: '工程概况',
    path: ['/overview']
  },
  {
    name: '防洪调度',
    path: ['/floodControlOperation']
  },
  {
    name: '工程安全',
    path: ['/projectSafety']
  },
  // {
  //   name: '智能助手',
  //   path: ['/aiAssistant']
  // }
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
