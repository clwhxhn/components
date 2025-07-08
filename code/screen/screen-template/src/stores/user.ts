import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  function setToken(_token: string) {
    token.value = _token
  }

  return {
    token,
    setToken
  }
})
