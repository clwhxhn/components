import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { Fill, Style, Stroke, Text, Icon } from 'ol/style'

const path = '/img/'
const jiantouBigLf = `${path}jiantouBigLf.png`
const jiantouBigRt = `${path}jiantouBigRt.png`
const jiantouOverBg = `${path}modaoxi.png`
const maodaoxiBg = `${path}modaoxi.png`
const wuqiaoheBg = `${path}wuqiaohe.png`
const zhuxiheBg = `${path}zhuxihe.png`

// const path = '/ss-basin-flood-prevention/img/flood-control-situation/'
// const imgs2 =  `${path}map-shuiwei.png` // 水位站

// 地图上流量popup（黄色箭头的流量显示数据）
const popups = [
  {
    id: 'mdx0', // overlayId
    lon: 108.59265309601187,
    lat: 30.738539820534115,
    stCode: '500101000000100012', // 双流无控站
    basCode: '500101000000100004',
    positioning: 'top-right'
  },
  {
    id: 'mdx1',
    lon: 108.61863411267755,
    lat: 30.729940445717492,
    stCode: '500101000000100011', // 苏马无控站
    basCode: '500101000000100004',
    positioning: 'top-left'
  }
]

// 三个流域的箭头图层里的 小箭头的流量值
const basinArrowFlowOverlayConfig = {
  // 磨刀溪
  '500101000000100004': [
    {
      id: 'MDX_XHDOWN', //	小河下方区间(五个中从下往上 第一个)
      type: 'area',
      direction: 'right',
      belongArea: '60513195', // 鱼背山-龙驹Id:2
      lon: 108.50446926988454,
      lat: 30.573376747740832
    },
    {
      id: 'MDX_XH_GCC', //	小河-赶场区间(五个中从下往上 第二个)
      type: 'area',
      direction: 'right',
      belongArea: '60513195', // 鱼背山-龙驹Id:2
      lon: 108.57671798590168, // 108.51319095799154, 30.644376697114083 // 108.57671798590168 30.617339292507225
      lat: 30.617339292507225
    },
    // {
    //   id: 'MDX_GCC_LJ', //	赶场-龙驹(五个中从下往上 第三个)
    //   type: 'area',
    //   direction: 'right',
    //   belongArea: '60513195', // 鱼背山-龙驹Id:2
    //   lon: 108.62579355544871,
    //   lat: 30.675751037844874
    // },
    {
      id: 'MDX_LJ_CT', //	龙驹-长滩(五个中从下往上 第四个)
      type: 'area',
      direction: 'right',
      belongArea: 'HP0015001010001054', // 龙驹-向家嘴 Id:3
      lon: 108.61838743460198,
      lat: 30.707659657799994
    },
    {
      id: 'MDX_CT_XJZ', //	长滩-向家嘴(五个中从下往上 第五个)
      type: 'area',
      direction: 'right',
      belongArea: 'HP0015001010001054', // 龙驹-向家嘴 Id:3
      lon: 108.66517176100074,
      lat: 30.73920363544768
    },
    {
      id: 'MDX_ZWKZ', // 双流无控站（左边）
      type: 'arrow',
      lon: 108.57013347956106,
      lat: 30.654902925204212
    },
    {
      id: 'MDX_YWKZ', // 苏马无控站（右边）
      type: 'arrow',
      lon: 108.6223038932787,
      lat: 30.652803856122716
    },
    {
      id: 'MDX_XHSQHL', // 小河社区河流(最下面的箭头)
      type: 'arrow',
      lon: 108.53136619328072,
      lat: 30.57674791464274
    },
    {
      id: 'MDX_LJZS', // 龙驹左上 （中间左边）
      type: 'arrow',
      lon: 108.58704684823881,
      lat: 30.675930335810644
    },
    {
      id: 'MDX_LJYS', // 龙驹右上（中间右边）
      type: 'arrow',
      lon: 108.63031057624711,
      lat: 30.682542295086105
    },
    {
      id: 'MDX_CTZX', // 长滩左下  （上数 第二个）
      type: 'arrow',
      lon: 108.57147623518277,
      lat: 30.71346992237826
    },
    {
      id: 'MDX_CTZ', // 长滩左 （上数 第一个）
      type: 'arrow',
      lon: 108.57997757799939,
      lat: 30.742026776351935
    }
  ],
  //  五桥河
  '500101000000100003': [
    // 三个区间汇流
    {
      id: 'WQH_CLUP', // 长岭上（右边第一个）
      type: 'area',
      belongArea: '605H1345', // 长岭子流域 id:21
      lon: 108.50103574329957,
      lat: 30.779582301462664
    },
    {
      id: 'WQH_CL_WQ', // 长岭-五桥（右边第二个）
      type: 'area',
      belongArea: 'cl_lh', // 长岭子流域 id:22
      lon: 108.47234202476608,
      lat: 30.76995718914809
    },
    {
      id: 'WQH_WQDOWN', // 五桥下（左边第一个）
      type: 'area',
      belongArea: 'cl_lh', // 长岭子流域 id:21
      lon: 108.4407747228073,
      lat: 30.765600760855264
    },
    // 6个河流的箭头 从右到左
    {
      id: 'WQH_UP_RIVER_1', //右上1
      type: 'arrow',
      lon: 108.47582089268316,
      lat: 30.78871698223409
    },
    {
      id: 'WQH_UP_RIVER_2', //右上2
      type: 'arrow',
      lon: 108.46197898661742,
      lat: 30.793258857661908
    },
    {
      id: 'WQH_UP_RIVER_3', //右上3
      type: 'arrow',
      lon: 108.44554172316435,
      lat: 30.78947396147206
    },
    {
      id: 'WQH_UP_RIVER_4', //右上4
      type: 'arrow',
      lon: 108.42964515916698,
      lat: 30.783309987677157
    },
    {
      id: 'WQH_DOWN_RIVER_1', //右下1
      type: 'arrow',
      lon: 108.48187672658692,
      lat: 30.75627501489251
    },
    {
      id: 'WQH_DOWN_RIVER_2', //右下2
      type: 'arrow',
      lon: 108.49474537363241,
      lat: 30.75778897336845
    }
  ],
  // 苎溪河
  '500101000000100002': [
    {
      id: 'ZXH_GL_TX', // 右边的 李河-天仙湖区间
      type: 'area',
      belongArea: 'lh_tx',
      lon: 108.34108184182317,
      lat: 30.81833519107811
    },
    {
      id: 'ZXH_LH_GL', // 左边的 李河子流域  李河-高粱
      type: 'area',
      belongArea: 'lh_tx',
      lon: 108.27581946969603,
      lat: 30.810247119318763
    },
    //
    {
      id: 'ZXH_UP_RIVER_1', //右上侧支流1
      type: 'arrow',
      lon: 108.35716287858799,
      lat: 30.830555788412244
    },
    {
      id: 'ZXH_UP_RIVER_2', //右上侧支流2
      type: 'arrow',
      lon: 108.33488606101344,
      lat: 30.82947438950086
    },
    {
      id: 'ZXH_UP_RIVER_3', //右上侧支流3
      type: 'arrow',
      lon: 108.30785108822879,
      lat: 30.833691845255267
    },
    {
      id: 'ZXH_DOWN_RIVER_1', //下侧支流1
      type: 'arrow',
      lon: 108.32655928939577,
      lat: 30.814551084523735
    }
  ]
}

const basinArrowFlowOverlayConfigList = [
  // 磨刀溪
  {
    id: 'MDX_XHDOWN', //	小河下方区间(五个中从下往上 第一个)
    type: 'area',
    direction: 'right',
    belongArea: '60513195', // 鱼背山-龙驹Id:2
    lon: 108.50446926988454,
    lat: 30.573376747740832,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_XH_GCC', //	小河-赶场区间(五个中从下往上 第二个)
    type: 'area',
    direction: 'right',
    belongArea: '60513195', // 鱼背山-龙驹Id:2
    lon: 108.57671798590168, // 108.51319095799154, 30.644376697114083 // 108.57671798590168 30.617339292507225
    lat: 30.617339292507225,
    belongBasin: '500101000000100004'
  },
  // {
  //   id: 'MDX_GCC_LJ', //	赶场-龙驹(五个中从下往上 第三个)
  //   type: 'area',
  //   direction: 'right',
  //   belongArea: '60513195', // 鱼背山-龙驹Id:2
  //   lon: 108.62579355544871,
  //   lat: 30.675751037844874
  // },
  {
    id: 'MDX_LJ_CT', //	龙驹-长滩(五个中从下往上 第四个)
    type: 'area',
    direction: 'right',
    belongArea: 'HP0015001010001054', // 龙驹-向家嘴 Id:3
    lon: 108.61838743460198,
    lat: 30.707659657799994,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_CT_XJZ', //	长滩-向家嘴(五个中从下往上 第五个)
    type: 'area',
    direction: 'right',
    belongArea: 'HP0015001010001054', // 龙驹-向家嘴 Id:3
    lon: 108.66517176100074,
    lat: 30.73920363544768,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_ZWKZ', // 双流无控站（左边）
    type: 'arrow',
    lon: 108.57013347956106,
    lat: 30.654902925204212,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_YWKZ', // 苏马无控站（右边）
    type: 'arrow',
    lon: 108.6223038932787,
    lat: 30.652803856122716,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_XHSQHL', // 小河社区河流(最下面的箭头)
    type: 'arrow',
    lon: 108.53136619328072,
    lat: 30.57674791464274,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_LJZS', // 龙驹左上 （中间左边）
    type: 'arrow',
    lon: 108.58704684823881,
    lat: 30.675930335810644,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_LJYS', // 龙驹右上（中间右边）
    type: 'arrow',
    lon: 108.63031057624711,
    lat: 30.682542295086105,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_CTZX', // 长滩左下  （上数 第二个）
    type: 'arrow',
    lon: 108.57147623518277,
    lat: 30.71346992237826,
    belongBasin: '500101000000100004'
  },
  {
    id: 'MDX_CTZ', // 长滩左 （上数 第一个）
    type: 'arrow',
    lon: 108.57997757799939,
    lat: 30.742026776351935,
    belongBasin: '500101000000100004'
  },

  // 五桥河
  // 三个区间汇流
  {
    id: 'WQH_CLUP', // 长岭上（右边第一个）
    type: 'area',
    belongArea: '605H1345', // 长岭子流域 id:21
    lon: 108.50103574329957,
    lat: 30.779582301462664,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_CL_WQ', // 长岭-五桥（右边第二个）
    type: 'area',
    belongArea: 'cl_lh', // 长岭子流域 id:22
    lon: 108.47234202476608,
    lat: 30.76995718914809,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_WQDOWN', // 五桥下（左边第一个）
    type: 'area',
    belongArea: 'cl_lh', // 长岭子流域 id:21
    lon: 108.4407747228073,
    lat: 30.765600760855264,
    belongBasin: '500101000000100003'
  },
  // 6个河流的箭头 从右到左
  {
    id: 'WQH_UP_RIVER_1', //右上1
    type: 'arrow',
    lon: 108.47582089268316,
    lat: 30.78871698223409,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_UP_RIVER_2', //右上2
    type: 'arrow',
    lon: 108.46197898661742,
    lat: 30.793258857661908,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_UP_RIVER_3', //右上3
    type: 'arrow',
    lon: 108.44554172316435,
    lat: 30.78947396147206,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_UP_RIVER_4', //右上4
    type: 'arrow',
    lon: 108.42964515916698,
    lat: 30.783309987677157,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_DOWN_RIVER_1', //右下1
    type: 'arrow',
    lon: 108.48187672658692,
    lat: 30.75627501489251,
    belongBasin: '500101000000100003'
  },
  {
    id: 'WQH_DOWN_RIVER_2', //右下2
    type: 'arrow',
    lon: 108.49474537363241,
    lat: 30.75778897336845,
    belongBasin: '500101000000100003'
  },

  // 苎溪河
  {
    id: 'ZXH_GL_TX', // 右边的 李河-天仙湖区间
    type: 'area',
    belongArea: 'lh_tx',
    lon: 108.34108184182317,
    lat: 30.81833519107811,
    belongBasin: '500101000000100002'
  },
  {
    id: 'ZXH_LH_GL', // 左边的 李河子流域  李河-高粱
    type: 'area',
    belongArea: 'lh_tx',
    lon: 108.27581946969603,
    lat: 30.810247119318763,
    belongBasin: '500101000000100002'
  },
  //
  {
    id: 'ZXH_UP_RIVER_1', //右上侧支流1
    type: 'arrow',
    lon: 108.35716287858799,
    lat: 30.830555788412244,
    belongBasin: '500101000000100002'
  },
  {
    id: 'ZXH_UP_RIVER_2', //右上侧支流2
    type: 'arrow',
    lon: 108.33488606101344,
    lat: 30.82947438950086,
    belongBasin: '500101000000100002'
  },
  {
    id: 'ZXH_UP_RIVER_3', //右上侧支流3
    type: 'arrow',
    lon: 108.30785108822879,
    lat: 30.833691845255267,
    belongBasin: '500101000000100002'
  },
  {
    id: 'ZXH_DOWN_RIVER_1', //下侧支流1
    type: 'arrow',
    lon: 108.32655928939577,
    lat: 30.814551084523735,
    belongBasin: '500101000000100002'
  }
]

const imgsObj = {
  anchor: [0.5, 0.5],
  /*   anchorOrigin: 'top-right',
  anchorXUnits: 'fraction',
  anchorYUnits: 'pixels',
  offsetOrigin: 'top-right', */
  scale: 0.5,
  opacity: 1,
  offsetX: 0
}

const jiantouImages = [
  // over-bg
  {
    img: maodaoxiBg,
    url: maodaoxiBg,
    layerName: 'mdxOverBg',
    basCode: '500101000000100004', // 磨刀溪
    extent: [
      108.4751834363954, 30.54539280264944, 108.75696341049854,
      30.81022487232603
    ],
    rotate: 20.12,
    lon: 108.5715056,
    lat: 30.73672011,
    visible: true
  },
  // TODO 修改extent和图片
  {
    img: zhuxiheBg,
    url: zhuxiheBg,
    layerName: 'zxhOverBg',
    basCode: '500101000000100002', // 苎溪河
    extent: [
      108.2668834364954, 30.81039280264944, 108.37896341049854,
      30.828535297307817
    ],
    rotate: 20.12,
    lon: 108.5715056,
    lat: 30.73672011,
    visible: false
  },
  {
    img: wuqiaoheBg,
    url: wuqiaoheBg,
    layerName: 'wqhOverBg',
    basCode: '500101000000100003', // 五桥河
    extent: [
      108.4300834364954, 30.74659280264944, 108.51196341049854,
      30.804035297307817
    ],
    rotate: 20.12,
    lon: 108.5715056,
    lat: 30.73672011,
    visible: false
  }
  // 左-大箭头
  // {
  //     img: jiantouBigLf,
  //     url: jiantouBigLf,
  //     extent: [
  //         108.59659655494927, 30.650765970627667, 108.62259218304926,
  //         30.685728369527666
  //     ],
  //     rotate: 20.12,
  //     lon: 108.5715056,
  //     lat: 30.73672011,
  // },
  // 右-大箭头
  // {
  //     img: jiantouBigRt,
  //     url: jiantouBigRt,
  //     extent: [
  //         108.59659655494927, 30.650765970627667, 108.62259218304926,
  //         30.685728369527666
  //     ],
  //     rotate: -20,
  //     lon: 108.64258033286311,
  //     lat: 30.731629078290678
  // }
]

// 图层样式相关
const styleFunction = function (feature, resolution) {
  console.log('resolution: ', resolution)
  console.log('featurecxscxs: ', feature)
  const img = feature.get('img')
  const rotation = feature.get('rotate')
  const scale = 0.00032781887211348116 / resolution

  return new Style({
    image: new Icon({
      ...imgsObj,
      rotation: rotation,
      src: img,
      scale: scale
    })
  })
}

const layerName = 'jiantou'
const jiantouConfig = {
  name: '箭头',
  layerName,
  type: 'Vector',
  layerHandle: new Promise(resolve => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature, resolution) {
        return styleFunction(feature, resolution)
      },
      layerName,
      zIndex: 10,
      visible: true
    })
    resolve(vectorLayer)
  })
}

export {
  jiantouImages,
  jiantouConfig,
  popups,
  basinArrowFlowOverlayConfig,
  basinArrowFlowOverlayConfigList
}
