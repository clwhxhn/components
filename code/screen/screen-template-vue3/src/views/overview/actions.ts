import { addIconPoi, getCenter } from '../scene'
import { damList, rainfallStations, wqStations, projectPoiConfig } from './config'
import { getAssetsImages } from '@/utils/image'

const damIconConfig = {
    1: getAssetsImages('ue/dam1.png'),
    2: getAssetsImages('ue/dam2.png'),
    3: getAssetsImages('ue/dam3.png'),
    4: getAssetsImages('ue/dam4.png'),
    5: getAssetsImages('ue/dam5.png'),
}

// 坝
export const addDamLabels = (damList) => {
    damList.forEach((item, index) => {
        const coords = item.centerPoint
        addIconPoi({
            id: item.id,
            layerID: 'damLabel',
            type: 'screen',
            coords,
            rotation: [0, 0, 0],
            renderScale: 1,
            anchor: 'left',
            onClickedCallBack: '_onPOIClickCallback',
            icon: {
                url: getAssetsImages('ue/dam1.png')// 本地图标
            },
            title: {
                // 可缺省
                text: item.name, // 可缺省
                fontsize: 12, // 可缺省，默认24
                hAlign: 'left', // 可缺省，默认center，left、center、right、fill
                padding: [30, 7, 0.0, 0.0] // 可缺省[left,top,right,bottom]
            }
        })
    })
}




const styleMap = {
    dam: {
        padding: [30, 7, 0.0, 0.0],
        hAlign: 'left'
    }
}
// 水位及闸门开度数据
export const addDamDetailsPoi = (dam) => {
    console.log(dam)
    dam.detailsPoi.forEach(item => {
        const style = styleMap[item.styleType] || {}
        addIconPoi({
            id: item.id,
            layerID: 'subScenePoi',
            type: 'screen',
            coords: item.coords,
            rotation: [0, 0, 0],
            anchor: item.anchor || 'left',
            renderScale: 1,
            onClickedCallBack: '_onPOIClickCallback',
            icon: {
                url: getAssetsImages(item.icon) // 本地图标
            },
            title: {
                // 可缺省
                text: item.name,
                fontsize: 14, // 可缺省，默认24
                fontFamily: 'Roboto', // 可缺省，默认"Roboto"。选项："Roboto"、"RobotoTiny"、"MSYH"、"DroidSansMono"、"youSheBiaoTiHei"
                hAlign: 'left', // 可缺省，默认center，left、center、right、fill
                padding: [39, 10, 0.0, 0.0],  // 可缺省[left,top,right,bottom]
                ...style
            }
        })
    })
}


