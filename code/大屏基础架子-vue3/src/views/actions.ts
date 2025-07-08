import { getAssetsImages } from '@/utils/image'

const iconMap = {
    'wq': getAssetsImages('poi/yph-wq.png'),
    'cz': getAssetsImages('poi/yph-cz.png'),
    'video': getAssetsImages('poi/yph-video.png'),
    'gx': getAssetsImages('poi/yph-gx.png'),
}

export const addStPoi = (stList) => {
    stList.forEach((item, index) => {
        const icon = iconMap[item.type]

        const option = {
            id: item.id,
            layerID: 'stPoi',
            type: 'screen',
            coords: [item.lon, item.lat, 200],
            isVisable: true,
            anchor: 'left',
            icon: {
                url: icon
            },
            label: {
                text: item.stName,
                fontsize: 12,
                padding: [44, 0, 0, 40],
                hAlign: 'left',
                fillcolor: '#fff'
            },
            onClickedCallBack: '_onPOIClickCallback'
        }

        swdt.fire('addIconPOI', option)
    })
}