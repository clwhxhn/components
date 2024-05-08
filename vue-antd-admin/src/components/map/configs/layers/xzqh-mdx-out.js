import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style } from 'ol/style'
import { GeoJSON } from 'ol/format'
// 矢量图层样式
const vectorImageryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#666666',
      width: 2
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255,1)'
    })
  })
}
// 卫星图层样式
const satelliteImageryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#C1F5FF',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0,0,0,0.5)' // 设置面颜色
    })
  })
}

// 地形图层样式
const terrainImageryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#40852a',
      width: 3
    })
  })
}
const layerName = 'xzqhmdxout'

export const config = {
  name: '行政区划-磨刀溪蒙版',
  layerName,
  type: 'Vector',
  styles: {
    vectorImageryStyle,
    satelliteImageryStyle,
    terrainImageryStyle
  },
  layerHandle: new Promise((resolve, reject) => {
    axios(
        `/map/wzly-area-out.geojson`
      )
      .then(response => {
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(response.data)
        })
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          renderMode: 'image',
          style: function () {
            return vectorImageryStyle()
          },
          layerName,
          zIndex: 2,
          visible: true
        })
        resolve(vectorLayer)
      })
      .catch(error => {
        reject(error)
      })
  })
}
