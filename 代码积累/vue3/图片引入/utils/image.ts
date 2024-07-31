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
