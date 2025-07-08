import { useWindowSize } from '@vueuse/core'
import { watchEffect, unref, ref, Ref } from 'vue'

export const useIsExpandMode = ():Ref<boolean> => {
  const { width,height } = useWindowSize()

  const isExpandedMode = ref(false)

  watchEffect(()=>{
    const ratio = 21 / 9
    isExpandedMode.value = unref(width) / unref(height) >= ratio
  })

  return isExpandedMode
}