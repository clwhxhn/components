import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Text } from 'ol/style'
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
    zIndex: 10
})

// 河流、流域高亮图层
const highlightSource = new VectorSource()
const highlightLayer = new VectorLayer({
    source: highlightSource,
    style: function (feature) {
        return new Style({
            fill: new Fill({
                color: 'rgb(41,133,247,0.8)'
            }),
            stroke: new Stroke({
                color: 'rgb(41,133,247,0.8)',
                width: 5
            })
        })
    },
    zIndex: 9
})

export default {
    tipSource,
    tipLayer,
    highlightSource,
    highlightLayer
}
