import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', () => {
  const useRealTimeWeather = ref(true)
  const weatherLabel = ref('晴')
  const temperatureValue = ref(20)

  function setWeatherLabel(value) {
    weatherLabel.value = value
  }

  function setTemperature(value) {
    temperatureValue.value = value
  }

  async function setRealTime(value) {
    useRealTimeWeather.value = value
  }

  return {
    useRealTimeWeather,
    weatherLabel,
    temperatureValue,
    setRealTime,
    setWeatherLabel,
    setTemperature
  }
})
