import { createApp } from 'vue'
import { getAssetsImages, httpImg } from '@/utils/image'

const app = createApp(App)

app.config.globalProperties.$img = getAssetsImages
app.config.globalProperties.$httpImg = httpImg