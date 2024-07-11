import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { GeoJSON } from 'ol/format'

const vectorImageryStyle = feature => {
  return new Style({
    stroke: new Stroke({
      color: '#FFEB81', // 设置边界颜色
      width: 2 // 设置边界宽度
      // lineDash: [5, 10, 20, 10] // 奇数位置代表线的长度，偶数代表间隙长度
    }),
    fill: new Fill({
      color: 'rgba(211,211,211,0)' // 设置面颜色
    }),
    text: new Text({
      text: feature.get('O_Name'),
      // font: '16px PingFangSC',
      font: '16px YouSheBiaoTiHei',
      overflow: true,
      offsetX: 7,
      fill: new Fill({
        color: '#1466B8'
      }),
      stroke: new Stroke({
        color: 'rgba(255,255,255,0.9)',
        width: 2
      }),
      textAlign: 'center',
      padding: [5, 5, 2, 5]
    })
  })
}

const layerName = 'river-basin'

export const config = {
  name: '流域',
  layerName,
  type: 'Vector',
  styles: {},
  layerHandle: new Promise((resolve, reject) => {
    axios.get(
        `/data/basin_shape.json`
      )
      .then(response => {
        const vectorSource = new VectorSource()
        let features = new GeoJSON().readFeatures(response.data)
        features.forEach(feature => {
          feature.set('name', feature.get('O_Name'))
          feature.set('highlight', true) // 设置高亮
        })
        vectorSource.addFeatures(features)
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          renderMode: 'image',
          style: function (feature) {
            return vectorImageryStyle(feature)
          },
          layerName,
          opacity: 0.7,
          zIndex: 1,
          visible: true
        })
        resolve(vectorLayer)
      })
      .catch(error => {
        reject(error)
      })
  })
}
