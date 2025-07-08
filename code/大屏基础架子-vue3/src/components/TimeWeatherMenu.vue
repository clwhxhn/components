<template>
  <div class="menu-content">
    <div class="time-setting">
      <div class="realtime-setting">
        <div class="selected-time">{{ selectedTime }}</div>
        <switch-button
          ref="timeSwitch"
          label="实时"
          :default-checked="realTimeChecked"
          @switchChanged="onRealTimeSwitch($event)" />
      </div>
      <div class="time-selection">
        <div class="time-selection-labels">
          <span>0</span>
          <span>6</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
        <input
          ref="timeSlider"
          type="range"
          min="0"
          max="24"
          step="0.01"
          value="12"
          style="width: 100%"
          @change="onTimeSliderChange($event)" />
      </div>
      <div class="time-shortcuts">
        <div class="time-shortcut-item" @click="onTimeShortcut(7.5)">
          <div class="shortcut-icon shortcut-sunraise" />
          <div class="label">日出</div>
        </div>
        <div class="time-shortcut-item" @click="onTimeShortcut(12.0)">
          <div class="shortcut-icon shortcut-noon" />
          <div class="label">中午</div>
        </div>
        <div class="time-shortcut-item" @click="onTimeShortcut(16.9)">
          <div class="shortcut-icon shortcut-sundown" />
          <div class="label">日落</div>
        </div>
        <div class="time-shortcut-item" @click="onTimeShortcut(22.0)">
          <div class="shortcut-icon shortcut-night" />
          <div class="label">夜晚</div>
        </div>
      </div>
    </div>

    <div class="separate" />

    <div class="weather-setting">
      <div class="realtime-weather">
        <div class="selected-weather">
          <img :src="weathers[selectedWeatherIndex].icon" />
          <div class="selected-weather-label">
            {{ weathers[selectedWeatherIndex].label }}
          </div>
        </div>
        <switch-button
          ref="weatherSwitch"
          label="实时"
          :default-checked="realTimeCheckedW"
          @switchChanged="onRealWeatherSwitch($event)" />
      </div>

      <div class="separate" />

      <div class="weather-list">
        <div
          v-for="(item, i) in weathers"
          :key="i"
          :class="['weather-item', selectedWeatherIndex === i ? 'active' : '']"
          @click="selectWeather(i, true)">
          <img :src="item.icon" />
          <div class="weather-item-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global swdt */
import dayjs from 'dayjs'
import SwitchButton from '@/components/SwitchButton.vue'
import { toFixed } from '@/utils/common'
import { getWeatherInfo } from '@/api/amapWeather'
import { mapState, mapActions } from 'pinia'
import { useWeatherStore } from '@/stores/weather'
import { getAssetsImages } from '@/utils/image'

let dateTicker = null
let weatherTicker = null

export default {
  name: 'TimeWeatherMenu',
  components: { SwitchButton },
  props: {
    defaultSelectedTime: {
      type: String,
      default: '12:00:00'
    }
  },
  data() {
    return {
      selectedTime: this.defaultSelectedTime,
      realTimeChecked: true,
      realTimeCheckedW: true,
      selectedWeatherIndex: 1,
      weathers: [
        {
          icon: getAssetsImages('weather/sunny.png'),
          label: '晴',
          type: 'clearsky'
        },
        {
          icon: getAssetsImages('weather/clouds.png'),
          label: '晴间多云',
          type: 'partlyCloudy'
        },
        {
          icon: getAssetsImages('weather/cloudy.png'),
          label: '多云',
          type: 'cloudy'
        },
        {
          icon: getAssetsImages('weather/overcast.png'),
          label: '阴',
          type: 'overcast'
        },
        {
          icon: getAssetsImages('weather/fog.png'),
          label: '雾',
          type: 'foggy'
        },
        {
          icon: getAssetsImages('weather/light-rain.png'),
          label: '小雨',
          type: 'lightRain'
        },
        {
          icon: getAssetsImages('weather/rain.png'),
          label: '中雨',
          type: 'rain'
        },
        {
          icon: getAssetsImages('weather/thunder.png'),
          label: '雷雨',
          type: 'thunderstorm'
        },
        {
          icon: getAssetsImages('weather/light-snow.png'),
          label: '小雪',
          type: 'lightSnow'
        },
        {
          icon: getAssetsImages('weather/snow.png'),
          label: '中雪',
          type: 'snow'
        },
        {
          icon: getAssetsImages('weather/major-snow.png'),
          label: '大雪',
          type: 'blizzard'
        }
      ]
    }
  },
  computed: {
    ...mapState(useWeatherStore, ['useRealTimeWeather']),
    ...mapState(useWeatherStore, ['weatherLabel']),
    ...mapState(useWeatherStore, ['temperatureValue'])
  },
  watch: {
    selectedTime: {
      handler(newVal) {
        this.$emit('timeChange', newVal)
      }
    },
    useRealTimeWeather: {
      handler(val) {
        this.$refs.weatherSwitch.checked = val
        this.updatedWeather()
      }
    }
  },
  mounted() {
    this.onRealTimeSwitch(this.realTimeChecked)
    this.onRealWeatherSwitch(this.realTimeCheckedW)
  },
  unmounted() {
    if (dateTicker) {
      clearInterval(dateTicker)
      dateTicker = null
    }
    if (weatherTicker) {
      clearInterval(weatherTicker)
      weatherTicker = null
    }
  },
  methods: {
    ...mapActions(useWeatherStore, [
      'setWeatherLabel',
      'setTemperature',
      'setRealTime'
    ]),
    getTimeSliderValue() {
      const times = this.selectedTime.split(':')
      const secs =
        Number(times[0]) * 3600 + Number(times[1]) * 60 + Number(times[2])
      return toFixed(secs / 3600, 2)
    },
    onRealTimeSwitch(checked) {
      if (!checked) {
        if (dateTicker) {
          clearInterval(dateTicker)
          dateTicker = null
        }
        return
      }
      this.selectedTime = dayjs().format('HH:mm:ss')
      this.$refs.timeSlider.value = this.getTimeSliderValue()
      swdt.fire('setDateAndTime', {
        timeOfDay: this.timeSliderValue * 100
      })
      dateTicker = setInterval(() => {
        this.selectedTime = dayjs().format('HH:mm:ss')
        if (this.$refs.timeSlider) {
          this.$refs.timeSlider.value = this.getTimeSliderValue()
        }
        const updatePeriod = 59 // 更新 UE 时间的周期(分钟)
        if (dayjs().minute() % updatePeriod === 0) {
          swdt.fire('setDateAndTime', {
            timeOfDay: this.timeSliderValue * 100
          })
        }
      }, 1000)
    },

    async updatedWeather() {
      /** 调度预演时宏观视角为了避免天气效果遮挡摄像机，会在宏观视角和微观视角设置不同的天气状态
       * 因此需要根据 weatherStore 中的状态标识来控制组件的状态更新
       */
      if (this.useRealTimeWeather) {
        const weatherInfo = await getWeatherInfo()
        this.setTemperature(weatherInfo.lives[0].temperature)
        this.setWeatherLabel(weatherInfo.lives[0].weather)
      }
      this.$emit('tempChange', this.temperatureValue)
      this.weathers.forEach((w, i) => {
        if (w.label === this.weatherLabel) {
          this.selectWeather(i, false)
        }
      })
    },

    onRealWeatherSwitch(checked) {
      this.setRealTime(checked)
      if (!checked) {
        if (weatherTicker) {
          clearInterval(weatherTicker)
          weatherTicker = null
        }
        this.$refs.weatherSwitch.checked = false
        return
      }
      this.$refs.weatherSwitch.checked = true
      this.updatedWeather()
      // 每小时更新一次天气
      const period = 1000 * 60 * 60
      weatherTicker = setInterval(() => {
        this.updatedWeather()
      }, period)
    },

    onTimeSliderChange(event) {
      let timeVal = event.target.value * 100

      if (dateTicker) {
        clearInterval(dateTicker)
        dateTicker = null
      }
      this.$refs.timeSwitch.checked = false
      this.selectedTime = this.timeSliderFormat(event.target.value)

      // 早6点到7点和晚6点到7点是最黑的，需要跨过去
      if (timeVal >= 600 && timeVal < 700) {
        timeVal = 700
      } else if (timeVal >= 1800 && timeVal < 1900) {
        timeVal = 1900
      }
      swdt.fire('setDateAndTime', { timeOfDay: timeVal })
    },

    selectWeather(index, isManual) {
      if (isManual) {
        this.onRealWeatherSwitch(false)
      }
      this.selectedWeatherIndex = index
      this.setWeatherLabel(this.weathers[index].label)
      swdt.fire('setWeatherType', { type: this.weathers[index].type })
      this.$emit('weatherChange', this.weathers[index])
    },

    onTimeShortcut(timeNum) {
      this.$refs.timeSwitch.checked = false
      this.onRealTimeSwitch(false)
      this.$refs.timeSlider.value = timeNum
      this.selectedTime = this.timeSliderFormat(timeNum)
      swdt.fire('setDateAndTime', { timeOfDay: timeNum * 100 })
    },

    timeSliderFormat(val) {
      let time = ('' + val).split('.')
      let hour = time[0]
      let min = '00'
      let sec = '00'
      if (time.length === 2) {
        let minAndSec = ((parseInt(time[1], 10) * 60) / 100)
          .toFixed(2)
          .split('.')
        min = minAndSec[0]
        sec =
          minAndSec.length > 1
            ? Math.ceil((parseInt(minAndSec[1], 10) * 60) / 100)
            : '00'
      }
      return `${this.fillZero(hour)}:${this.fillZero(min)}:${this.fillZero(
        sec
      )}`
    },

    fillZero(str) {
      let res = str + ''
      if (res.length === 1) {
        return '0' + str
      }
      return res
    }
  }
}
</script>

<style lang="less" scoped>
.menu-content {
  width: 340px;
  height: 530px;
  background: rgba(54, 60, 70, 0.8);
  color: #fff;
  font-size: 14px;
  font-family: FZLanTYJW;
  text-shadow: 0 0 2px #383838;
  line-height: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: left;

  .separate {
    background-image: url('@/assets/images/weather/separater.png');
    width: 100%;
    height: 12px;
    margin: 10px 0;
  }

  .time-setting {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .realtime-setting {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;

      .selected-time {
        font-size: 24px;
        line-height: 28px;
        font-weight: 900;
      }
    }

    .time-selection {
      margin-top: 16px;
      width: 100%;
      display: flex;
      /*justify-content: space-between;*/
      flex-direction: column;
      align-items: center;

      .time-selection-labels {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: baseline;
        font-size: 10px;
        color: #c1c1c1;
        font-family: FZLanTYJW;
        margin-bottom: 6px;

        span {
          width: 20px;
          text-align: center;
        }
      }
    }

    .time-shortcuts {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 16px;

      .time-shortcut-item {
        opacity: 0.5;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }

        .label {
          margin-top: 2px;
        }
      }

      .shortcut-icon {
        background-repeat: no-repeat;
        background-size: 28px;
        width: 28px;
        height: 28px;
      }

      .shortcut-sunraise {
        background-image: url('@/assets/images/weather/sun-raise.png');
      }

      .shortcut-noon {
        background-image: url('@/assets/images/weather/noon.png');
      }

      .shortcut-sundown {
        background-image: url('@/assets/images/weather/sun-down.png');
      }

      .shortcut-night {
        background-image: url('@/assets/images/weather/night.png');
      }
    }
  }

  .weather-setting {
    display: flex;
    flex-direction: column;
    justify-content: left;

    .realtime-weather {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .selected-weather {
        font-size: 18px;
        line-height: 28px;
        font-weight: 900;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 38px;
          margin-right: 10px;
        }
      }
    }

    .weather-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .weather-item {
        display: flex;
        flex-direction: column;
        width: 25%;
        align-items: center;
        opacity: 0.5;
        margin-bottom: 22px;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
        &.active {
          opacity: 1;
        }

        img {
          width: 40px;
          margin-bottom: 8px;
        }

        .weather-item-label {
        }
      }
    }
  }
}
</style>
