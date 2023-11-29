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
      width: 1
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255,0.5)'
    })
  })
}
// 卫星图层样式
const satelliteImageryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#0fe0ff',
      width: 2
    }),
    fill: new Fill({
      color: 'rgba(29, 48, 62,0.5)'
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
const layerName = 'xzqhout'

export const config = {
  name: '行政区划蒙版',
  layerName,
  type: 'Vector',
  styles: {
    vectorImageryStyle,
    satelliteImageryStyle,
    terrainImageryStyle
  },
  layerHandle: new Promise((resolve, reject) => {
    const data = require('../mockData/outxzqh.json') //河流json数据
    // axios
    //   .get(
    //     `${process.env.VUE_APP_NGINX_RESOURCE_URL}/layers/common/outxzqh.geojson`
    //   )
    //   .then(response => {
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(data)
        })
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: function () {
            return vectorImageryStyle()
          },
          layerName,
          zIndex: 2,
          visible: true
        })
        resolve(vectorLayer)
      })
//       .catch(error => {
//         reject(error)
//       })
//   })
}
