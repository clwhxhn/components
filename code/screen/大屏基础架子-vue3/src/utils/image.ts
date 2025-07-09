const { VITE_IMAGE_URL } = import.meta.env
export const getAssetsImages = name => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}

export const httpImg = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) {
    return path
  }
  return `${VITE_IMAGE_URL}${path}`
}

export const getAssetsJSONURL = name => {
  return new URL(`/src/ue/geojson/${name}`, import.meta.url).href
}

export const getAssetsVideo = name => {
  return new URL(`/src/assets/video/${name}`, import.meta.url).href
}

// 图片路径转64
export function imageUrlToBase64(url) {
  return new Promise((resolve, reject) => {
    const homeImage = new Image()
    // 解决跨域问题
    homeImage.setAttribute('crossOrigin', 'anonymous')
    homeImage.src = url
    // homeImage.onload为异步加载
    homeImage.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = homeImage.width
      canvas.height = homeImage.height
      const context = canvas.getContext('2d')
      context?.drawImage(homeImage, 0, 0, homeImage.width, homeImage.height)
      const quality = 0.8
      // 这里的dataurl就是base64类型
      const dataURL = canvas.toDataURL('image/png', quality)
      resolve(dataURL)
      // console.log(dataURL)
      // base64ToFile(dataURL, "moren"); // 这里是将base64转为file格式的方法
    }
    homeImage.onerror = error => {
      reject(error)
    }
  })
}
