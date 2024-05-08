import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { GeoJSON } from 'ol/format'

const vectorImageryStyle = feature => {
  const name = feature.get('name')
  return new Style({
    stroke: new Stroke({
      color: 'rgba(77, 166, 255, 1)', // 设置边界颜色
      width: 0.5 // 设置边界宽度
    }),
    fill: new Fill({
      color: 'rgba(0, 132, 240, 0.30)' // 设置面颜色
    }),
    text: new Text({
      text: name,
      font: '12px Calibri, sans-serif',
      overflow: true,
      offsetY: -7,

      fill: new Fill({
        color: '#3EBCEE'
      }),
      stroke: new Stroke({
        color: 'white',
        width: 0.5
      }),
      textAlign: 'center',
      padding: [3, 3, 0, 3]
    })
  })
}

const layerName = 'river'

export const config = {
  name: '河流',
  layerName,
  type: 'Vector',
  styles: {},
  layerHandle: new Promise((resolve, reject) => {
    axios(
        `/map/river.geojson`
      )
      .then(response => {
        const vectorSource = new VectorSource()
        let features = new GeoJSON().readFeatures(response.data)
        features.forEach(feature => {
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
          zIndex: 3,
          visible: true
        })
        resolve(vectorLayer)
      })
      .catch(error => {
        reject(error)
      })
  })
}
