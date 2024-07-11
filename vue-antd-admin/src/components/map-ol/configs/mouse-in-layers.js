import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Text } from 'ol/style'
import OlFilterMask from 'ol-ext/filter/Mask'
import { feature } from '@turf/turf'
/*
  地图鼠标移入图层配置
*/
// 名称标识图层
const tipSource = new VectorSource()
const tipLayer = new VectorLayer({
  source: tipSource,
  style: function (feature) {
    return new Style({
      text: new Text({
        text: feature.get('name'),
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)'
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)'
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15
      })
    })
  },
  zIndex: 1
})

// 河流、流域高亮图层
const highlightSource = new VectorSource()
const highlightLayer = new VectorLayer({
  source: highlightSource,
  style: function (feature) {
    if (feature.get('O_Name') && feature.get('O_Name').indexOf('流域') > -1) {
      return new Style({
        stroke: new Stroke({
          color: 'rgba(255, 235, 129, 0.6)',
          width: 3,
          shadow: {
            blur: 10, // 模糊半径
            color: 'rgba(255, 235, 129, 0.6)', // 阴影颜色
            offsetX: 5, // X方向偏移
            offsetY: 5 // Y方向偏移
          }
        }),
        text: new Text({
          text: feature.get('O_Name'),
          font: '16px YouSheBiaoTiHei',
          overflow: true,
          offsetX: 7,
          fill: new Fill({
            color: '#FFEB81'
          }),
          stroke: new Stroke({
            color: '#3B4859',
            width: 2
          }),
          textAlign: 'center',
          padding: [5, 5, 2, 5]
        })
      })
    } else {
      return new Style({
        fill: new Fill({
          color: 'rgb(41,133,247,0.8)'
        }),
        stroke: new Stroke({
          color: 'rgb(41,133,247,0.8)',
          width: 5
        })
      })
    }
  },
  zIndex: 1
})

export default {
  tipSource,
  tipLayer,
  highlightSource,
  highlightLayer
}
