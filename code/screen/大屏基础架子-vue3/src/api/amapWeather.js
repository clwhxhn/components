import axios from 'axios'
// 高德天气 API 湖北省编码
const cityCode = '420000'

// 高德应用APP KEY
const appKey = '7b5ecccc9df243469363f8fcde4cddff'

// 高德天气 API 地址
const apiURL = `https://restapi.amap.com/v3/weather/weatherInfo`

export async function getWeatherInfo() {
  const res = await axios.get(apiURL, {
    params: { city: cityCode, key: appKey },
    withCredentials: false
  })
  return res.data
}
