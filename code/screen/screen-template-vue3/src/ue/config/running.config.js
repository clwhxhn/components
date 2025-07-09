import { sections } from './enums.config'
import { getAssetsImages } from '@/utils/image'

export function getWaterQualityLevelInteger(waterQualityString) {
  let waterLevel = 1
  if (waterQualityString === 'Ⅱ') {
    waterLevel = 2
  }
  if (waterQualityString === 'Ⅲ') {
    waterLevel = 3
  }
  if (waterQualityString === 'IV') {
    waterLevel = 4
  }
  if (waterQualityString === 'V') {
    waterLevel = 5
  }
  if (waterQualityString === '劣V') {
    waterLevel = 6
  }
  return waterLevel
}

export const sectionConfigs = {
  defaultView: {
    coordinate: { x: 114.039982, y: 31.019752, z: 46009.730622 },
    rotation: { roll: 0, pitch: -25.307152, yaw: -117.418495 }
  },
  GW: {
    view: {
      coordinate: { x: 113.98394, y: 31.436948, z: 33968.359347 },
      rotation: { roll: 0, pitch: -42.393993, yaw: -103.134674 }
    },
    coords: [113.861578130000112, 31.685861460000069, 88.487902],
    location: { x: 5363800.574578, y: 3406464.731279, z: -32817.120392 },
    orgCode: 'A01A07'
  },
  DX: {
    view: {
      coordinate: { x: 112.412907, y: 32.012336, z: 50129.246512 },
      rotation: { roll: 0, pitch: -44.435272, yaw: -103.689445 }
    },
    location: { x: -13450174.646908, y: -5549852.984842, z: -163660.064235 },
    coords: [111.864723, 32.486787, 122.785088],
    orgCode: 'A01A05'
  },
  ZS: {
    view: {
      coordinate: { x: 113.237398, y: 31.832094, z: 29575.314349 },
      rotation: { roll: 0, pitch: -40.597588, yaw: -113.139168 }
    },
    location: { x: -364273.306609, y: -176621.434755, z: 1070.32471 },
    coords: [113.257306840000069, 32.010259790000077, 111.987897],
    orgCode: 'A01A06'
  }
}

export const waterQualitySectionConfig = [
  {
    stcd: 'A110001_0008',
    name: '王家冲水库',
    section: sections.GuangWu,
    orgCode: 'A01A07',
    coords: [114.123889, 31.609444, 82.089772],
    location: { x: 7857108.252476, y: 4237774.876914, z: -64277.672894 },
    tube: {
      startLocation: { x: 7856845.0, y: 4236858.016836, z: -64080.0 },
      endLocation: { x: 7856845.0, y: 4236858.016836, z: -63956.0 },
      rotation: { roll: 0, pitch: 0, yaw: -97.5 }
    },
    panel: {
      location: { x: 7856812.193459, y: 4236764.54062, z: -63975.333441 }
    },
    view: {
      coordinate: { x: 114.123878, y: 31.609526, z: 84.844742 },
      rotation: { roll: -0.0, pitch: 14.992867, yaw: -167.101212 }
    }
  },
  {
    stcd: 'A110001_0007',
    name: '应山城区',
    section: sections.GuangWu,
    orgCode: 'A01A07',
    coords: [113.8575, 31.6858333, 97.58901],
    location: { x: 5325115.648237, y: 3407034.752726, z: -31086.155471 },
    tube: {
      startLocation: { x: 5325030.0, y: 3408850.0, z: -32610.0 },
      endLocation: { x: 5325030.0, y: 3408850.0, z: -32000.0 },
      rotation: { roll: 0, pitch: 0, yaw: 10 }
    },
    view: {
      coordinate: { x: 113.857469, y: 31.685618, z: 92.977517 },
      rotation: { roll: 0.0, pitch: 17.161629, yaw: -74.196815 }
    }
  },
  {
    stcd: 'A110001_0006',
    name: '封江口出库',
    section: sections.GuangWu,
    orgCode: 'A01A07',
    coords: [113.351229, 31.977392, 110],
    location: { x: 524841.743013, y: 192744.668446, z: 1063.921425 },
    panel: {
      location: { x: 521292.0, y: 186926.0, z: 432.016696 },
      rotation: { roll: 0, pitch: 0, yaw: 0 }
    },
    tube: {
      startLocation: { x: 521149.86646, y: 186844.901453, z: 340.0 },
      endLocation: { x: 521149.86646, y: 186844.901453, z: 423.115136 },
      rotation: { roll: 0, pitch: 0, yaw: 60.832 }
    },
    view: {
      coordinate: { x: 113.35099, y: 31.977475, z: 106.587132 },
      rotation: { roll: -0.0, pitch: 2.972719, yaw: -7.227132 }
    }
  },
  {
    stcd: 'A110001_0003',
    name: '东郊',
    section: sections.ZaoSui,
    orgCode: 'A01A06',
    coords: [112.8063889, 32.1022222, 79.789802],
    location: { x: -4620037.45307, y: -1206770.664317, z: -19883.987063 },
    tube: {
      startLocation: { x: -4614970.0, y: -1203470.0, z: -16870.0 },
      endLocation: { x: -4614970.0, y: -1203470.0, z: -16620.0 },
      rotation: { roll: 0, pitch: 0, yaw: 90 }
    },
    view: {
      coordinate: { x: 112.806855, y: 32.101921, z: 113.051114 },
      rotation: { roll: 0.0, pitch: -2.872223, yaw: -2.105592 }
    }
  },
  {
    stcd: 'A110001_0004',
    name: '刘桥',
    section: sections.ZaoSui,
    orgCode: 'A01A06',
    coords: [112.6444444, 32.1805556, 113.988035],
    location: { x: -6143328.145033, y: -2083477.51244, z: -31575.258679 },
    tube: {
      startLocation: { x: -6142750.0, y: -2085010.0, z: -31800.0 },
      endLocation: { x: -6142750.0, y: -2085010.0, z: -31560.0 },
      rotation: { roll: 0, pitch: 0, yaw: 0 }
    },
    view: {
      coordinate: { x: 112.644477, y: 32.180634, z: 115.289056 },
      rotation: { roll: 0.0, pitch: -1.687384, yaw: -77.977303 }
    }
  },
  {
    stcd: 'A110001_0005',
    name: '封江口入库',
    section: sections.ZaoSui,
    orgCode: 'A01A06',
    coords: [113.333333, 31.989444, 117.413862],
    location: { x: 354131.749713, y: 54207.581564, z: 1640.853477 },
    tube: {
      startLocation: { x: 360540.0, y: 51450.0, z: 300.0 },
      endLocation: { x: 360540.0, y: 51450.0, z: 530.0 },
      rotation: { roll: 0, pitch: 0, yaw: 180 }
    },
    view: {
      coordinate: { x: 113.334017, y: 31.989699, z: 106.293754 },
      rotation: { roll: 0.0, pitch: 2.318636, yaw: 124.357208 }
    }
  },
  {
    stcd: 'A110001_0002',
    name: '滕庄',
    section: sections.DanXiang,
    orgCode: 'A01A05',
    coords: [111.8697639, 32.4853917, 112.264779],
    location: { x: -13402847.820427, y: -5533689.617512, z: -163575.817805 },
    tube: {
      startLocation: { x: -13457830.0, y: -5559270.0, z: -163530.0 },
      endLocation: { x: -13457830.0, y: -5559270.0, z: -163260.0 },
      rotation: { roll: 0, pitch: 0, yaw: 0 }
    },
    view: {
      coordinate: { x: 111.863871, y: 32.487551, z: 129.176161 },
      rotation: { roll: 0.0, pitch: 6.622382, yaw: -72.161011 }
    }
  },
  {
    stcd: 'A110001_0001',
    name: '清泉沟',
    section: sections.DanXiang,
    orgCode: 'A01A05',
    coords: [111.788052, 32.648049, 123.485028],
    location: { x: -14145279.410835, y: -7347766.556829, z: -196868.542667 },
    tube: {
      startLocation: { x: -15081850.0, y: -7365430.0, z: -216990.0 },
      endLocation: { x: -15081850.0, y: -7365430.0, z: -216780.0 },
      rotation: { roll: 0, pitch: 0, yaw: 0 }
    },
    view: {
      coordinate: { x: 111.688187, y: 32.648358, z: 139.917783 },
      rotation: { roll: 0.0, pitch: 6.243844, yaw: -91.011307 }
    }
  }
]

export function isSectionMonitor(featureId) {
  return ['DX', 'GW', 'ZS'].includes(featureId)
}

export function isChannelWaterCondition(featureID) {
  return featureID.startsWith('poi-label_')
}

export function getSectionPanelOptions(config) {
  let name = sections.GuangWu
  if (config.type === 'DX') {
    name = sections.DanXiang
  }
  if (config.type === 'ZS') {
    name = sections.ZaoSui
  }
  return {
    id: config.type,
    title: name,
    flow: config.avgFlow,
    highWaterLevel: config.maxZ,
    lowWaterLevel: config.minZ,
    location: sectionConfigs[config.type].location,
    callbackFuncationName: '_onPOIClickCallback',
    warning: [
      { warningType: '水位预警', warningNum: config.warnZ },
      { warningType: '流量预警', warningNum: config.warnFlow },
      { warningType: '变幅预警', warningNum: config.warnZl }
    ].filter(w => w.warningNum)
  }
}

export function getPOILabelOptions(config) {
  return {
    id: config.labelId,
    layerID: config.layerID,
    type: 'screen',
    coords: config.coords,
    isVisable: true,
    anchor: [0, 1],
    icon: {
      url: getAssetsImages(config.iconPath)
    },
    label: {
      text: config.name,
      fontsize: 12,
      padding: [44, 8, 0, 75],
      hAlign: 'left'
    },
    onClickedCallBack: '_onPOIClickCallback'
  }
}

export function getChannelWaterConditionsPOIOptions(config) {
  return {
    id: config.labelId,
    layerID: config.layerID,
    type: 'screen',
    scaleByOpacity: [500, 0.3, 5000, 1],
    renderScale: 1,
    // disableDepthTest: true,
    coords: config.coords,
    isVisable: true,
    anchor: config.anchor || [0.08, 1.0],
    icon: {
      // url: getAssetsImages(config.iconPath)
      base64: config.base64
    },
    label: {
      text: config.name,
      fontsize: 12,
      hAlign: 'left',
      padding: config.padding || [58, 0, 0, 15]
    },
    onClickedCallBack: '_onPOIClickCallback'
  }
}

export function getWaterQualityPanelOptions(config) {
  const waterLevel = getWaterQualityLevelInteger(config.waterQuality)
  return {
    id: config.stcd,
    title: config.monitorNm,
    evaluation: config.sfzc === '1' ? '正常' : '异常',
    qualityGrade: waterLevel,
    time: config.lastModifiedDate,
    temperature: config.shuiwen,
    PH: config.ph,
    electriaclCondructivity: config.diandaolv,
    dissolvedOxygen: config.oxygen,
    NUT: config.zhuodu,
    location: config.location
  }
}

export const channelWaterConditionsConfigs = [
  // 丹襄段
  {
    gateCode: '101',
    gateName: '清泉沟隧洞进口检修闸',
    coords: [111.69434488, 32.64493773, 90],
    orgCode: 'A01A05',
    VisualRange: 30000,
    view: {
      coordinate: { x: 111.689062, y: 32.646971, z: 183.394949 },
      rotation: { roll: 0, pitch: -28.599999, yaw: -154.880473 }
    },
    monitorDevice: [
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '101',
        name: '流量',
        coords: [111.688834008, 32.64707301, 113.084046],
        panelCoords: [111.688834008, 32.64707301, 116.084046],
        view: {
          pitch: -12.415568,
          yaw: 164.18158
        }
      }
    ]
  },
  {
    gateCode: '1',
    gateName: '渠首节制闸',
    coords: [111.69424564, 32.64498968, 90],
    orgCode: 'A01A05',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 111.688502, y: 32.647023, z: 170.597409 },
      rotation: { roll: -0.0, pitch: -26.368486, yaw: -131.624847 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_QS_WLS_BF',
        coords: [111.688247, 32.647232, 157.627013],
        panelCoords: [111.688256, 32.647272, 159.127013],
        view: {
          coordinate: { x: 111.688174, y: 32.647212, z: 158.985065 },
          rotation: { roll: 0.0, pitch: -2.974703, yaw: -31.496853 }
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_QS',
            location: {
              x: -15081411.660231,
              y: -7352249.097684,
              z: -218470.644695
            },
            rotation: { roll: 0.025715, pitch: -12, yaw: 35 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_QS_WLS_RB',
        gateMapId: 'DX_JZZ_QS_ZMB',
        coords: [111.688352, 32.647123, 157.071805],
        panelCoords: [111.688352, 32.647123, 160.471805],
        view: {
          yaw: -160
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_QS',
            location: {
              x: -15078986.6,
              y: -7349705.423,
              z: -218269.872
            },
            rotation: { roll: 0.0, pitch: -11.205102, yaw: -130.493164 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_QS_SXT_ZQ'
          },
          {
            name: '闸后',
            tagName: 'JZZ_QS_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_QS_SXT_ZSMK'
          },
          {
            name: '大闸',
            tagName: 'JZZ_QS_SXT_DZ'
          },
          {
            name: '闸室',
            tagName: 'JZZ_QS_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'DX_JZZ_QS_ZMB',
        coords: [111.688357, 32.647163, 157.331516],
        view: {
          coordinate: { x: 111.688378, y: 32.647137, z: 165.009405 },
          rotation: { roll: -0.0, pitch: -53.84074, yaw: -132.499756 }
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_QS',
            location: {
              x: -15079509.146,
              y: -7350178.147,
              z: -218387.985
            },
            rotation: { roll: 0, pitch: -9.752956, yaw: -131.60585 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      }
    ]
  },
  {
    gateCode: '60',
    gateName: '古城水库分水闸',
    coords: [111.77494902, 32.54088208, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 111.774771, y: 32.540908, z: 161.814545 },
      rotation: { roll: 0, pitch: -21.1999, yaw: -3.009439 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_GCSK_WLS_BF',
        coords: [111.775408, 32.540998, 140.013396],
        panelCoords: [111.775408, 32.540998, 143.013396],
        view: {
          distance: 800
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_GCSK_WLS_RB',
        coords: [111.775252, 32.540884, 140.224218],
        panelCoords: [111.775252, 32.540884, 143.224218],
        view: {
          yaw: -160
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZ_GCSK_SXT_ZQ'
          },
          {
            name: '闸后',
            tagName: 'FSZ_GCSK_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_GCSK_SXT_ZSMK'
          },
          {
            name: '闸门',
            tagName: 'FSZ_GCSK_SXT_ZM'
          },
          {
            name: '闸室',
            tagName: 'FSZ_GCSK_SXT_ZS'
          }
        ]
      }
    ]
  },
  {
    gateCode: '100',
    gateName: '孟楼水文站',
    coords: [111.8165479, 32.51969543, 90],
    orgCode: 'A01A05',
    VisualRange: 8000000
  },
  {
    gateCode: '3',
    gateName: '熊家河退水闸',
    coords: [111.82107689, 32.5172410906, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 111.820581, y: 32.517231, z: 150.991093 },
      rotation: { roll: 0, pitch: -22.1999, yaw: 9.190556 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'TSZ_XJH_WLS_BF',
        coords: [111.82094, 32.517191, 129.558947],
        panelCoords: [111.82094, 32.517191, 132.558947],
        view: {
          distance: 800
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DX_TSZ_XJH_SXT_ZQ'
          },
          {
            name: '闸后',
            tagName: 'DX_TSZ_XJH_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'DX_TSZ_XJH_SXT_ZSMK'
          },
          {
            name: '闸门',
            tagName: 'DX_TSZ_XJH_SXT_ZM'
          },
          {
            name: '闸室',
            tagName: 'DX_TSZ_XJH_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        coords: [111.821022, 32.517197, 132.098812]
      }
    ]
  },
  {
    gateCode: '4',
    gateName: '孟楼倒虹吸出口节制闸',
    coords: [111.82104202, 32.5171019906, 90],
    orgCode: 'A01A05',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 111.820657, y: 32.516923, z: 145.859218 },
      rotation: { roll: 0.000021, pitch: -13.619982, yaw: -15.510401 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zupleft',
        name: '左闸前',
        tagName: 'JZZ_MLDHX_WLS_RF1',
        gateMapId: 'DX_JZZ_MLDHXJZZ_ZMB01',
        coords: [111.82091, 32.517049, 130.280436],
        panelCoords: [111.82091, 32.517049, 133.280436],
        view: {
          pitch: -4.95923,
          yaw: 30.866282
        }
      },
      {
        type: 'water-level',
        dataType: 'zupright',
        name: '右闸前',
        tagName: 'JZZ_MLDHX_WLS_RF2',
        gateMapId: 'DX_JZZ_MLDHXJZZ_ZMB',
        coords: [111.820883, 32.517013, 130.299786],
        panelCoords: [111.820883, 32.517013, 133.299786],
        view: {
          pitch: -5.734045,
          yaw: 30.843668
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_MLDHX_WLS_RB',
        coords: [111.821426, 32.516766, 128.039357],
        panelCoords: [111.821426, 32.516766, 131.039357],
        view: {
          pitch: -9.368114,
          yaw: -144.118744
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DX_JZZ_MLDHX_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'DX_JZZ_MLDHX_SXT_ZM1'
          },
          {
            name: '闸门',
            tagName: 'DX_JZZ_MLDHX_SXT_ZM2'
          },
          {
            name: '闸后',
            tagName: 'DX_JZZ_MLDHX_SXT_ZH'
          },
          {
            name: '渡槽',
            tagName: 'DX_JZZ_MLDHX_SXT_DC'
          },
          {
            name: '闸室门口',
            tagName: 'DX_JZZ_MLDHX_SXT_ZSMK'
          },
          {
            name: '大闸',
            tagName: 'DX_JZZ_MLDHX_SXT_DZ'
          },
          {
            name: '闸室',
            tagName: 'DX_JZZ_MLDHX_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'DX_JZZ_MLDHXJZZ_ZMB01',
        coords: [111.820948, 32.51703, 132.783351],
        view: {
          coordinate: { x: 111.820899, y: 32.517057, z: 136.557771 },
          rotation: { roll: 0.0, pitch: -29.3011, yaw: 32.020233 }
        }
      },
      {
        gateMapId: 'DX_JZZ_MLDHXJZZ_ZMB',
        coords: [111.820922, 32.516992, 132.783351],
        view: {
          coordinate: { x: 111.820873, y: 32.517023, z: 136.464784 },
          rotation: { roll: 0.0, pitch: -29.476084, yaw: 33.239784 }
        }
      }
    ]
  },
  {
    gateCode: '61',
    gateName: '滕庄分水闸（退水闸）',
    coords: [111.8641022, 32.4876985606, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 111.863835, y: 32.487598, z: 149.02182 },
      rotation: { roll: 0, pitch: -18.399999, yaw: -34.409446 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'TSZ_TZ_WLS_RF',
        coords: [111.864028, 32.487716, 128.948488],
        panelCoords: [111.864028, 32.487716, 131.948488],
        view: {
          pitch: -5.024758,
          yaw: -10.190871
        }
      },
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010004',
        name: '流量',
        coords: [111.864522, 32.488031, 127.550867],
        panelCoords: [111.864522, 32.488031, 127.550867],
        view: {
          coordinate: { x: 111.864607, y: 32.488076, z: 130.366897 },
          rotation: { roll: -0.0, pitch: -12.000273, yaw: 144.087021 }
        }
      }
    ],
    gateOpening: [
      {
        gateMapId: 'DX_TSZ_TZ_ZMB',
        coords: [111.864086, 32.487764, 130.577628],
        view: {
          coordinate: { x: 111.864078, y: 32.487753, z: 135.439965 },
          rotation: { roll: 0.0, pitch: -55.956421, yaw: -42.855438 }
        }
      }
    ]
  },
  {
    gateCode: '63',
    gateName: '孟楼~七方倒虹吸进口检修闸',
    coords: [111.86463999, 32.4871363306, 90],
    orgCode: 'A01A05',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 111.864437, y: 32.48718, z: 143.641412 },
      rotation: { roll: 0.0, pitch: -18.79656, yaw: 62.832561 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_MLQFDHX_WLS_RF',
        coords: [111.864552, 32.487083, 135.913479],
        panelCoords: [111.864535, 32.487086, 133.013479],
        view: {
          coordinate: { x: 111.864591, y: 32.487167, z: 134.604075 },
          rotation: { roll: -0.0, pitch: -7.998526, yaw: 105.561882 }
        }
      },
      {
        type: 'water-level',
        dataType: 'zdownleft',
        name: '左孔后',
        tagName: 'JXZ_MLQFDHX_WLS_BB1',
        gateMapId: 'DX_JXZ_MLQFDHXRK_ZMB01',
        coords: [111.865347, 32.486301, 128.895465],
        panelCoords: [111.865347, 32.486301, 131.895465],
        view: {
          distance: 800,
          pitch: -6.966105,
          yaw: -103.837265
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JXZ_MLQFDHX',
            location: {
              x: -13444335.469,
              y: -5543964.002,
              z: -164908.081
            },
            rotation: { roll: 0.000511, pitch: -7.852658, yaw: -98.313324 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'water-level',
        dataType: 'zdownmiddle',
        name: '中孔后',
        tagName: 'JXZ_MLQFDHX_WLS_BB2',
        gateMapId: 'DX_JXZ_MLQFDHXRK_ZMB02',
        coords: [111.865295, 32.486266, 128.965618],
        panelCoords: [111.865295, 32.486266, 131.965618],
        view: {
          distance: 800,
          pitch: -6.966105,
          yaw: -103.837265
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JXZ_MLQFDHX',
            location: {
              x: -13444821.55,
              y: -5543511.621,
              z: -164855.261
            },
            rotation: { roll: 0, pitch: -10.290772, yaw: -103.487305 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'water-level',
        dataType: 'zdownright',
        name: '右孔后',
        tagName: 'JXZ_MLQFDHX_WLS_BB3',
        gateMapId: 'DX_JXZ_MLQFDHXRK_ZMB03',
        coords: [111.865245, 32.486226, 129.028314],
        panelCoords: [111.865245, 32.486226, 132.028314],
        view: {
          distance: 800,
          pitch: -6.966105,
          yaw: -103.837265
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JXZ_MLQFDHX',
            location: {
              x: -13445283.234,
              y: -5543035.552,
              z: -164827.258
            },
            rotation: { roll: 0, pitch: -9.940807, yaw: -108.736778 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JXZ_MLQFDHX_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'JXZ_MLQFDHX_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JXZ_MLQFDHX_SXT_ZM1'
          },
          {
            name: '闸门',
            tagName: 'JXZ_MLQFDHX_SXT_ZM2'
          },
          {
            name: '闸门',
            tagName: 'JXZ_MLQFDHX_SXT_ZM3'
          },
          {
            name: '闸后',
            tagName: 'JXZ_MLQFDHX_SXT_ZH'
          },

          {
            name: '闸室门口',
            tagName: 'JXZ_MLQFDHX_SXT_ZSMK'
          },
          {
            name: '大闸',
            tagName: 'JXZ_MLQFDHX_SXT_DZ'
          },
          {
            name: '闸室',
            tagName: 'JXZ_MLQFDHX_SXT_ZS'
          }
        ]
      }
    ],
    monitorWarning: [
      {
        warnType: 3,
        dataType: 'zdownmiddle',
        riverTag: 'MLQFDHX_DOWN',
        warningRiverLocation: {
          x: -13444660.148334,
          y: -5542320.203091,
          z: -165130.0
        },
        warningRiverRotation: { pitch: 0, yaw: -130, roll: 0 },
        riverWidth: 5.5,
        riverLength: 50,
        lineLength: 3.0,
        lineLocation: { x: 1870.0, y: -10.0, z: 0.0 },
        view: {
          coordinate: { x: 111.865127, y: 32.486296, z: 111.354274 },
          rotation: { roll: 0.0, pitch: -6.085926, yaw: 44.884151 }
        }
      },
      {
        warnType: 4,
        dataType: 'zdownmiddle',
        panelCoords: [111.86515, 32.486278, 134.092822],
        view: { yaw: -135 }
      },
      {
        warnType: 5,
        dataType: 'zdownmiddle',
        panelCoords: [111.86515, 32.486278, 134.092822],
        view: { yaw: -135 }
      },
      {
        warnType: 6,
        dataType: 'zdownmiddle',
        panelCoords: [111.86515, 32.486278, 134.092822],
        view: { yaw: -135 }
      },
      {
        warnType: 7,
        dataType: 'zdownmiddle',
        panelCoords: [111.86515, 32.486278, 134.092822],
        view: { yaw: -135 }
      }
    ],
    gateOpening: [
      {
        gateMapId: 'DX_JXZ_MLQFDHXRK_ZMB03',
        coords: [111.864695, 32.48691, 132.164612],
        view: {
          coordinate: { x: 111.864554, y: 32.487061, z: 130.402092 },
          rotation: { roll: -0.0, pitch: -7.602705, yaw: 54.701138 }
        }
      },
      {
        gateMapId: 'DX_JXZ_MLQFDHXRK_ZMB02',
        coords: [111.864644, 32.486874, 132.164612],
        view: {
          coordinate: { x: 111.864507, y: 32.487021, z: 130.021043 },
          rotation: { roll: -0.0, pitch: -4.093342, yaw: 53.183872 }
        }
      },
      {
        gateMapId: 'DX_JXZ_MLQFDHXRK_ZMB01',
        coords: [111.864591, 32.486836, 132.164612],
        view: {
          coordinate: { x: 111.864451, y: 32.486979, z: 129.918244 },
          rotation: { roll: -0.0, pitch: -4.093342, yaw: 53.183872 }
        }
      }
    ]
  },
  // {
  //   gateCode: 'rg-12',
  //   gateName: '熊家河退水闸',
  //   coords: [111.82107169, 32.51724702, 90],
  //   orgCode: 'A01A05',
  //   view: {
  //     coordinate: { x: 111.820581, y: 32.517231, z: 150.991093 },
  //     rotation: { roll: 0, pitch: -22.1999, yaw: 9.190556 }
  //   }
  // },
  {
    gateCode: '62010004',
    gateName: '滕庄分水口',
    coords: [null, null, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '渡槽',
            tagName: 'DX_TSZ_TZT_SXT_DC'
          },
          {
            name: '闸门',
            tagName: 'DX_TSZ_TZT_SXT_ZM'
          },
          {
            name: '闸后',
            tagName: 'DX_TSZ_TZ_SXT_ZH'
          },
          {
            name: '闸后',
            tagName: 'DX_TSZ_TZ_1_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'DX_TSZ_TZ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DX_TSZ_TZ_SXT_ZS'
          }
        ]
      }
    ]
  },
  {
    gateCode: '62010005',
    gateName: '千亩大堰分水阀',
    coords: [112.04456774, 32.42160728, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸后',
            tagName: 'FSZ_QMDY_SXT_ZH'
          },

          {
            name: '闸室门口',
            tagName: 'FSZ_QMDY_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_QMDY_SXT_ZS'
          }
        ]
      }
    ]
  },
  {
    gateCode: '62010006',
    gateName: '樊庄分水阀',
    coords: [null, null, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FKFSF_FZ_SXT_ZQ'
          },

          {
            name: '闸后',
            tagName: 'FKFSF_FZ_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'FKFSF_FZ_SXT_ZSMK'
          }
        ]
      }
    ]
  },
  {
    gateCode: '62010007',
    gateName: '襄北监狱分水阀',
    coords: [null, null, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000
  },
  {
    gateCode: '62010009',
    gateName: '夹河套分水阀',
    coords: [null, null, 90],
    orgCode: 'A01A05',
    VisualRange: 8000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSF_JHT_SXT_ZQ'
          },

          {
            name: '闸后',
            tagName: 'FSF_JHT_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'FSF_JHT_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSF_JHT_SXT_ZS'
          }
        ]
      }
    ]
  },
  {
    gateCode: '62',
    gateName: '黑清河放空系统防洪闸',
    coords: [null, null, 90],
    orgCode: 'A01A05',
    VisualRange: 3000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '放空阀',
            tagName: 'FKF_HQH_SXT_FKF'
          }
        ]
      }
    ]
  },
  // 枣随段
  {
    // 无模型
    gateCode: '64',
    gateName: '孟楼~七方倒虹吸出口节制闸',
    coords: [112.54590096, 32.2275813306, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.545667, y: 32.227643, z: 121.818878 },
      rotation: { roll: -0.0, pitch: -7.908717, yaw: 8.733642 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zupleft',
        name: '左闸前',
        tagName: 'JZZ_MLQFCK_WLS_BF1',
        gateMapId: 'DX_JZZ_MLQFCK_ZMB03',
        coords: [112.54589, 32.22769, 114.412105],
        panelCoords: [112.54589, 32.22769, 116.199876],
        view: {
          distance: 800
        }
      },
      {
        type: 'water-level',
        dataType: 'zupmiddle',
        name: '中闸前',
        tagName: 'JZZ_MLQFCK_WLS_BF2',
        gateMapId: 'DX_JZZ_MLQFCK_ZMB02',
        coords: [112.545864, 32.227638, 114.150122],
        panelCoords: [112.545864, 32.227638, 116.204127],
        view: {
          distance: 800
        }
      },
      {
        type: 'water-level',
        dataType: 'zupright',
        name: '右闸前',
        tagName: 'JZZ_MLQFCK_WLS_BF3',
        gateMapId: 'DX_JZZ_MLQFCK_ZMB01',
        coords: [112.545842, 32.227589, 114.150453],
        panelCoords: [112.545842, 32.227589, 116.204127],
        view: {
          distance: 800
        }
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JZZ_MLQFCK_WLS_RB',
        coords: [112.546336, 32.227545, 121.942867],
        panelCoords: [112.546336, 32.227545, 124.942867],
        view: {
          distance: 800
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'QFDHXCKJZZ_ML_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'QFDHXCKJZZ_ML_SXT_ZM'
          },
          {
            name: '闸门',
            tagName: 'QFDHXCKJZZ_ML_1_SXT_ZM'
          },
          {
            name: '闸门',
            tagName: 'QFDHXCKJZZ_ML_2_SXT_ZM'
          },
          {
            name: '水位',
            tagName: 'QFDHXCKJZZ_ML_SXT_SW'
          },
          {
            name: '闸后',
            tagName: 'QFDHXCKJZZ_ML_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'QFDHXCKJZZ_ML_SXT_ZSMK'
          },
          {
            name: '大闸',
            tagName: 'QFDHXCKJZZ_ML_SXT_DZ'
          },
          {
            name: '闸室',
            tagName: 'QFDHXCKJZZ_ML_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'DX_JZZ_MLQFCK_ZMB01',
        coords: [112.545893, 32.227566, 117.341967],
        view: {
          coordinate: { x: 112.545667, y: 32.227643, z: 121.818878 },
          rotation: { roll: -0.0, pitch: -7.908717, yaw: 8.733642 }
        }
      },
      {
        gateMapId: 'DX_JZZ_MLQFCK_ZMB02',
        coords: [112.545907, 32.227613, 117.341967],
        view: {
          coordinate: { x: 112.545667, y: 32.227643, z: 121.818878 },
          rotation: { roll: -0.0, pitch: -7.908717, yaw: 8.733642 }
        }
      },
      {
        gateMapId: 'DX_JZZ_MLQFCK_ZMB03',
        coords: [112.545934, 32.227663, 117.341967],
        view: {
          coordinate: { x: 112.545667, y: 32.227643, z: 121.818878 },
          rotation: { roll: -0.0, pitch: -7.908717, yaw: 8.733642 }
        }
      }
    ]
  },
  {
    gateCode: '66',
    gateName: '官沟分水闸（高庵分水闸）',
    coords: [112.54760819, 32.2269505306, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.547402, y: 32.227178, z: 126.649509 },
      rotation: { roll: 0, pitch: -13.799999, yaw: 65.318898 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_GGGA_WLS_RF',
        coords: [112.547584, 32.226931, 115.064677],
        panelCoords: [112.547584, 32.226931, 118.064677],
        view: {
          distance: 1000,
          pitch: -7.69167,
          yaw: 75.052238
        }
      },
      {
        type: 'water-level',
        name: '左闸后（高庵）',
        dataType: 'zdownleft',
        tagName: 'FSZ_GGGA_WLS_BB1',
        gateMapId: 'ZS_FSZ_GGGA_ZMB01',
        coords: [112.547552, 32.226794, 115.036659],
        panelCoords: [112.547552, 32.226794, 117.636659],
        view: {
          pitch: -8.627791,
          yaw: -56.314747
        }
      },
      {
        type: 'water-level',
        name: '右闸后（官沟）',
        dataType: 'zdownright',
        tagName: 'FSZ_GGGA_WLS_BB2',
        gateMapId: 'ZS_FSZ_GGGA_ZMB02',
        coords: [112.547501, 32.22681, 115.097064],
        panelCoords: [112.547501, 32.22681, 117.697064],
        view: {
          pitch: -6.504808,
          yaw: -84.919357
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZ_GGGY_SXT_ZM'
          },
          {
            name: '闸后',
            tagName: 'FSZ_GGGY_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_GGGY_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_GGGY_SXT_ZS'
          }
        ]
      }
    ],
    ahdId: ['StaticMeshActor_840'],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_GGGA_ZMB01',
        coords: [112.547543, 32.22688, 116.899431],
        view: {
          coordinate: { x: 112.547556, y: 32.226896, z: 118.60723 },
          rotation: { roll: 0.0, pitch: -28.053051, yaw: 107.04113 }
        }
      },
      {
        gateMapId: 'ZS_FSZ_GGGA_ZMB02',
        coords: [112.547576, 32.226869, 116.860548],
        view: {
          coordinate: { x: 112.547577, y: 32.22689, z: 118.691849 },
          rotation: { roll: 0.0, pitch: -28.053051, yaw: 107.04113 }
        }
      }
    ]
  },
  // {
  //   gateCode: '62010012',
  //   gateName: '官沟分水闸',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A06'
  // },
  {
    gateCode: '65',
    gateName: '黑清河分水闸（七方分水闸）',
    coords: [112.54773693, 32.2272250906, 90],
    orgCode: 'A01A06',
    VisualRange: 30000,
    view: {
      coordinate: { x: 112.547582, y: 32.227083, z: 126.632393 },
      rotation: { roll: 0.0, pitch: -30.933748, yaw: -48.020233 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_HQHQF_WLS_RF',
        coords: [112.547684, 32.227146, 114.855801],
        panelCoords: [112.547684, 32.227146, 117.255801],
        view: {
          distance: 1000,
          pitch: -7.912267,
          yaw: -74.629715
        }
      },
      {
        type: 'water-level',
        name: '左闸后（七方）',
        dataType: 'zdownleft',
        tagName: 'FSZ_HQHQF_WLS_BB1',
        gateMapId: 'ZS_FSZ_HQHQF_ZMB02',
        coords: [112.547777, 32.227293, 114.924364],
        panelCoords: [112.547777, 32.227293, 117.324364],
        view: {
          pitch: -6.296991,
          yaw: 74.007484
        }
      },
      {
        type: 'water-level',
        name: '右闸后（黑清河）',
        dataType: 'zdownright',
        tagName: 'FSZ_HQHQF_WLS_BB2',
        gateMapId: 'ZS_FSZ_HQHQF_ZMB01',
        coords: [112.54773, 32.227306, 114.924364],
        panelCoords: [112.54773, 32.227306, 117.324364],
        view: {
          pitch: -9.43024,
          yaw: 134.443542
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZ_HQH_SXT_ZM'
          },
          {
            name: '闸后',
            tagName: 'FSZ_HQH_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_HQH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_HQH_SXT_ZS'
          }
        ]
      }
    ],
    ahdId: ['StaticMeshActor_543'],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_HQHQF_ZMB02',
        coords: [112.547707, 32.227222, 116.366263],
        view: {
          coordinate: { x: 112.547702, y: 32.227214, z: 118.076919 },
          rotation: { roll: 0.0, pitch: -59.642246, yaw: -68.771629 }
        }
      },
      {
        gateMapId: 'ZS_FSZ_HQHQF_ZMB01',
        coords: [112.547729, 32.227216, 116.366263],
        view: {
          coordinate: { x: 112.547725, y: 32.227207, z: 118.050013 },
          rotation: { roll: 0.0, pitch: -61.926777, yaw: -68.188042 }
        }
      }
    ]
  },
  // {
  //   gateCode: '62010010',
  //   gateName: '黑清河分水闸',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A06'
  // },
  {
    gateCode: '67',
    gateName: '七方检修节制闸',
    coords: [112.54986124, 32.2264468006, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.549555, y: 32.226324, z: 124.219785 },
      rotation: { roll: 0, pitch: -6.724763, yaw: 8.317775 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_QF_WLS_RF',
        gateMapId: 'ZS_JXZ_QF_ZMB01',
        coords: [112.549752, 32.226383, 122.261186],
        panelCoords: [112.549752, 32.226383, 125.261186],
        view: {
          distance: 1000,
          pitch: -18.104071,
          yaw: -44.270706
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JXZ_QF_WLS_RB',
        gateMapId: 'ZS_JXZ_QF_ZMB02',
        coords: [112.550031, 32.226221, 121.898664],
        panelCoords: [112.550031, 32.226221, 124.898664],
        view: {
          pitch: -12.121478,
          yaw: 98.859726
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JXZ_QF_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'JXZ_QF_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JXZ_QF_SXT_ZM1'
          },
          {
            name: '闸门',
            tagName: 'JXZ_QF_SXT_ZM2'
          },
          {
            name: '闸后',
            tagName: 'JXZ_QF_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'JXZ_QF_SXT_ZSMK'
          },
          {
            name: '大闸',
            tagName: 'JXZ_QF_SXT_DZ'
          },
          {
            name: '闸室',
            tagName: 'JXZ_QF_SXT_ZS'
          },
          {
            name: '明渠',
            tagName: 'JXZ_QF_SXT_MQ'
          },
          {
            name: '渡槽',
            tagName: 'JXZ_QF_SXT_DC'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_JXZ_QF_ZMB01',
        coords: [112.549827, 32.226345, 118.395521],
        view: {
          coordinate: { x: 112.549733, y: 32.226375, z: 122.254338 },
          rotation: { roll: 0.0, pitch: -24.261433, yaw: 25.814741 }
        }
      },
      {
        gateMapId: 'ZS_JXZ_QF_ZMB02',
        coords: [112.5498, 32.226304, 118.395521],
        view: {
          coordinate: { x: 112.549705, y: 32.226326, z: 122.193553 },
          rotation: { roll: 0.0, pitch: -24.77179, yaw: 24.03248 }
        }
      }
    ]
  },
  {
    gateCode: '38970541',
    gateName: '丹襄枣随分界点',
    coords: [112.5500523, 32.22626237, 90],
    orgCode: 'A01A06',
    VisualRange: 30000
  },
  {
    gateCode: '13',
    gateName: '刘桥分水闸',
    coords: [112.64468538, 32.1808135406, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.644299, y: 32.180857, z: 122.617192 },
      rotation: { roll: 0, pitch: -17.3999, yaw: 8.518898 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_LQ_WLS_RF',
        coords: [112.644618, 32.180776, 113.360925],
        panelCoords: [112.644618, 32.180776, 116.060925],
        view: {
          distance: 1000,
          pitch: -18.104071,
          yaw: -44.270706
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_LQ_WLS_RB',
        gateMapId: 'ZS_FSZ_LQ_ZMB',
        coords: [112.644763, 32.180839, 113.151807],
        panelCoords: [112.645232, 32.181117, 121.953954],
        view: {
          coordinate: { x: 112.645303, y: 32.18119, z: 123.56088 },
          rotation: { roll: -0.0, pitch: -7.04567, yaw: 130.603104 }
        }
      },
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010014',
        name: '流量',
        tagName: 'FSZ_LQ_FLOW',
        coords: [112.645176, 32.181053, 119.955574],
        panelCoords: [112.645176, 32.181053, 122.955574],
        view: {
          pitch: -12.415568,
          yaw: 164.18158
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZ_LQ_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZ_LQ_SXT_ZM'
          },
          {
            name: '闸后',
            tagName: 'FSZ_LQ_SXT_ZH'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_LQ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_LQ_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_LQ_ZMB',
        coords: [112.644696, 32.180826, 114.507738],
        view: {
          coordinate: { x: 112.644721, y: 32.180845, z: 117.15982 },
          rotation: { roll: 0.0, pitch: -30.250078, yaw: 141.650238 }
        }
      }
    ]
  },
  {
    gateCode: '14',
    gateName: '刘桥退水闸',
    coords: [112.64739173, 32.1795195206, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.646635, y: 32.179334, z: 126.521218 },
      rotation: { roll: 0, pitch: -19.5999, yaw: -11.081097 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'TSZ_LQ_WLS_RB',
        gateMapId: 'ZS_TSZ_LQ_ZMB',
        coords: [112.647313, 32.179482, 113.854357],
        panelCoords: [112.647311, 32.179476, 117.847889],
        view: {
          coordinate: { x: 112.647444, y: 32.179481, z: 119.788035 },
          rotation: { roll: -0.000081, pitch: -10.70153, yaw: -178.94574 }
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸后',
            tagName: 'TSZ_LQ_SXT_ZH'
          },
          {
            name: '闸门',
            tagName: 'TSZ_LQ_SXT_ZM'
          },
          {
            name: '闸后',
            tagName: 'TSZ_LQ_SXT_ZH2'
          },
          {
            name: '闸室门口',
            tagName: 'TSZ_LQ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZ_LQ_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_TSZ_LQ_ZMB',
        coords: [112.647115, 32.179409, 116.408698],
        view: {
          coordinate: { x: 112.647163, y: 32.179428, z: 117.956914 },
          rotation: { roll: -0.000081, pitch: -41.458786, yaw: 155.56813 }
        }
      }
    ]
  },
  {
    gateCode: '15',
    gateName: '刘桥节制闸',
    coords: [112.64783429, 32.1790722806, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.647277, y: 32.179001, z: 129.341363 },
      rotation: { roll: 0, pitch: -18.5999, yaw: -1.281097 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_LQ_WLS_RF',
        coords: [112.647788, 32.179033, 113.765359],
        panelCoords: [112.647788, 32.179033, 116.265359],
        view: {
          distance: 1000,
          pitch: -12.06461,
          yaw: 19.199907
        }
      },
      {
        type: 'water-level',
        name: '左闸后',
        dataType: 'zdownleft',
        tagName: 'JZZ_LQ_WLS_BB1',
        gateMapId: 'ZS_JZZ_LQ_ZMB01',
        coords: [112.647962, 32.178931, 114.272235],
        panelCoords: [112.647962, 32.178931, 116.872235],
        view: {
          pitch: -12.067403,
          yaw: -107.587822
        }
      },
      {
        type: 'water-level',
        name: '右闸后',
        dataType: 'zdownright',
        tagName: 'JZZ_LQ_WLS_BB2',
        gateMapId: 'ZS_JZZ_LQ_ZMB02',
        coords: [112.647994, 32.179005, 114.272235],
        panelCoords: [112.647994, 32.179005, 116.872235],
        view: {
          pitch: -17.858269,
          yaw: 161.727417
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_LQ_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'JZZ_LQ_SXT_ZM1'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_LQ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_LQ_SXT_ZS'
          },
          {
            name: '闸门',
            tagName: 'JZZ_LQ_SXT_ZM2'
          },
          {
            name: '水位',
            tagName: 'JZZ_LQ_SXT_SW'
          },
          {
            name: '闸后',
            tagName: 'JZZ_LQ_SXT_ZH'
          },
          {
            name: '大闸',
            tagName: 'JZZ_LQ_SXT_DZ'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_JZZ_LQ_ZMB01',
        coords: [112.647859, 32.179033, 117.297602],
        view: {
          coordinate: { x: 112.647816, y: 32.179056, z: 117.969743 },
          rotation: { roll: -0.0, pitch: -19.675274, yaw: 23.82831 }
        }
      },
      {
        gateMapId: 'ZS_JZZ_LQ_ZMB02',
        coords: [112.647845, 32.178994, 117.296454],
        view: {
          coordinate: { x: 112.647798, y: 32.178997, z: 117.734187 },
          rotation: { roll: 0.0, pitch: -20.178337, yaw: 16.775484 }
        }
      }
    ]
  },
  {
    gateCode: '16',
    gateName: '熊河分水闸',
    coords: [112.68646078, 32.1707491806, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.68622, y: 32.170982, z: 122.942045 },
      rotation: { roll: -0.0, pitch: -18.455679, yaw: 68.367592 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_XH_WLS_RB',
        gateMapId: 'ZS_FSZ_XH_ZMB',
        coords: [112.686351, 32.170659, 111.914059],
        panelCoords: [112.686328, 32.170583, 122.154035],
        view: {
          coordinate: { x: 112.686328, y: 32.17048, z: 122.550834 },
          rotation: { roll: 0.0, pitch: -8.683972, yaw: -88.882217 }
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZ_XH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_XH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_XH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZ_XH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_XH_ZMB',
        coords: [112.686364, 32.170697, 113.811351],
        view: {
          coordinate: { x: 112.686333, y: 32.170628, z: 116.295573 },
          rotation: { roll: 0.0, pitch: -34.586414, yaw: -75.282593 }
        }
      }
    ]
  },
  {
    gateCode: '17',
    gateName: '熊河节制闸',
    coords: [112.68724935, 32.1708048006, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.686654, y: 32.17081, z: 122.750504 },
      rotation: { roll: -0.0, pitch: -14.256098, yaw: 17.272699 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_XH_WLS_RF',
        gateMapId: 'ZS_JZZ_XH_ZMB01',
        coords: [112.68708, 32.170679, 112.500761],
        panelCoords: [112.68708, 32.170679, 115.500761],
        view: {
          pitch: -12.239427,
          yaw: 16.885063
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_XH_WLS_RB',
        gateMapId: 'ZS_JZZ_XH_ZMB02',
        coords: [112.68731, 32.170639, 112.09227],
        panelCoords: [112.68731, 32.170639, 115.09227],
        view: {
          pitch: -10.257544,
          yaw: -164.664032
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_XH_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'JZZ_XH_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JZZ_XH_SXT_ZM1'
          },
          {
            name: '闸门',
            tagName: 'JZZ_XH_SXT_ZM2'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_XH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_XH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JZZ_XH_SXT_ZH'
          },
          {
            name: '大闸',
            tagName: 'JZZ_XH_SXT_DZ'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_JZZ_XH_ZMB01',
        coords: [112.687129, 32.170699, 115.398881],
        view: {
          coordinate: { x: 112.687064, y: 32.170732, z: 117.568403 },
          rotation: { roll: 0.0, pitch: -19.680555, yaw: 16.572769 }
        }
      },
      {
        gateMapId: 'ZS_JZZ_XH_ZMB02',
        coords: [112.687115, 32.170665, 115.398934],
        view: {
          coordinate: { x: 112.68705, y: 32.170686, z: 117.503009 },
          rotation: { roll: 0.0, pitch: -20.961515, yaw: 13.158091 }
        }
      }
    ]
  },
  {
    gateCode: '18',
    gateName: '北郊分水闸',
    coords: [112.76124747, 32.1673445706, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.760664, y: 32.167606, z: 124.604013 },
      rotation: { roll: 0, pitch: -8.199999, yaw: 48.919374 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_BJ_WLS_RB',
        gateMapId: 'ZS_FSZ_BJ_ZMB',
        coords: [112.76097, 32.167169, 117.933196],
        panelCoords: [112.76097, 32.167169, 120.933196],
        view: {
          pitch: -9.592186,
          yaw: -87.595329
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZY_BJ_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZY_BJ_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZY_BJ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZY_BJ_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZY_BJ_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_BJ_ZMB',
        coords: [112.760983, 32.167283, 113.961635],
        view: {
          coordinate: { x: 112.760976, y: 32.167223, z: 117.6334 },
          rotation: { roll: 0.0, pitch: -24.867311, yaw: -85.764923 }
        }
      }
    ]
  },
  {
    gateCode: '19',
    gateName: '吉河分水闸',
    coords: [112.76125686, 32.1677612106096, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.760682, y: 32.167392, z: 130.335441 },
      rotation: { roll: 0, pitch: -24.9999, yaw: -41.281098 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_JH_WLS_RF',
        gateMapId: 'ZS_FSZ_JH_ZMB',
        coords: [112.761016, 32.167591, 112.939284],
        panelCoords: [112.761016, 32.167591, 115.939284],
        view: {
          pitch: -13.48932,
          yaw: -104.21286
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_JH_WLS_RB',
        coords: [112.761028, 32.16778, 117.893571],
        panelCoords: [112.761028, 32.16778, 120.893571],
        view: {
          pitch: -9.451045,
          yaw: 78.794548
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZZ_JH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZZ_JH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZZ_JH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZZ_JH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_JH_ZMB',
        coords: [112.761024, 32.167664, 114.657558],
        view: {
          coordinate: { x: 112.761013, y: 32.16763, z: 116.604174 },
          rotation: { roll: -0.0, pitch: -32.479488, yaw: -83.89193 }
        }
      }
    ]
  },
  {
    gateCode: '21',
    gateName: '沙河检修闸',
    coords: [112.76817964, 32.1670630206, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.76728, y: 32.167341, z: 130.27331 },
      rotation: { roll: -0.304729, pitch: -12.834515, yaw: 37.020847 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_SH_WLS_RF',
        gateMapId: 'ZS_JXZ_SH_ZMB01',
        coords: [112.767883, 32.166931, 118.924849],
        panelCoords: [112.767883, 32.166931, 121.924849],
        view: {
          pitch: -8.763215,
          yaw: 19.89987
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JXZ_SH_WLS_RB',
        gateMapId: 'ZS_JXZ_SH_ZMB02',
        coords: [112.768141, 32.166932, 112.534784],
        panelCoords: [112.768141, 32.166932, 115.534784],
        view: {
          pitch: -4.329883,
          yaw: 173.867142
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JXZ_SH_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'JXZ_SH_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JXZ_SH_SXT_ZM1'
          },
          {
            name: '闸门',
            tagName: 'JXZ_SH_SXT_ZM2'
          },
          {
            name: '闸室门口',
            tagName: 'JXZ_SH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JXZ_SH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JXZ_SH_SXT_ZH'
          },
          {
            name: '大闸',
            tagName: 'JXZ_SH_SXT_DZ'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_JXZ_SH_ZMB01',
        coords: [112.767962, 32.166921, 116.441395],
        view: {
          coordinate: { x: 112.767911, y: 32.16693, z: 119.308218 },
          rotation: { roll: -0.0, pitch: -30.789852, yaw: 1.219543 }
        }
      },
      {
        gateMapId: 'ZS_JXZ_SH_ZMB02',
        coords: [112.767966, 32.166966, 116.441395],
        view: {
          coordinate: { x: 112.767924, y: 32.166968, z: 118.672242 },
          rotation: { roll: -0.0, pitch: -30.439888, yaw: 3.098494 }
        }
      }
    ]
  },
  {
    gateCode: 'rg-1',
    gateName: '沙河退水闸',
    coords: [null, null, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.767524, y: 32.167424, z: 128.288141 },
      rotation: { roll: -0.304734, pitch: -8.969842, yaw: 66.800911 }
    },
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'TSZY_SH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'TSZY_SH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZY_SH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'TSZY_SH_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    gateCode: '22',
    gateName: '东郊分水闸',
    coords: [112.80608865, 32.1025567106, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.805749, y: 32.102776, z: 123.667105 },
      rotation: { roll: 0, pitch: -12.399999, yaw: 71.318899 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_DJ_WLS_RF',
        coords: [112.805913, 32.102439, 111.800962],
        panelCoords: [112.805913, 32.102439, 114.800962],
        view: {
          pitch: -12.555296,
          yaw: 106.293068
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_DJ_WLS_RB',
        gateMapId: 'ZS_FSZ_DJ_ZMB',
        coords: [112.805871, 32.102228, 117.986189],
        panelCoords: [112.805871, 32.102228, 120.986189],
        view: {
          pitch: -9.312278,
          yaw: -121.930885
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZY_DJ_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZY_DJ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZY_DJ_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZY_DJ_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_DJ_ZMB',
        coords: [112.805898, 32.102354, 113.393901],
        view: {
          coordinate: { x: 112.805906, y: 32.102411, z: 116.700879 },
          rotation: { roll: 0.0, pitch: -35.309467, yaw: 97.561935 }
        }
      }
    ]
  },
  // {
  //   gateCode: '62010018',
  //   gateName: '东郊分水闸',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A06'
  // },
  {
    gateCode: '68',
    gateName: '东郊北干渠节制闸',
    coords: [112.80584725, 32.1015899006, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'BGQJZZ_DJ_SXT_ZQ'
          },
          {
            name: '闸室门口',
            tagName: 'BGQJZZ_DJ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'BGQJZZ_DJ_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'BGQJZZ_DJ_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    gateCode: '23',
    gateName: '东郊节制闸',
    coords: [112.80746059, 32.1019080106, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.806655, y: 32.101735, z: 130.890594 },
      rotation: { roll: 0, pitch: -15.3999, yaw: 6.118903 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_DJ_WLS_RF',
        gateMapId: 'ZS_JZZ_DJ_ZMB01',
        coords: [112.807184, 32.101758, 116.591403],
        panelCoords: [112.807184, 32.101758, 119.591403],
        view: {
          pitch: -10.963941,
          yaw: 55.614811
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_DJ_WLS_RB',
        gateMapId: 'ZS_JZZ_DJ_ZMB02',
        coords: [112.807474, 32.101526, 110.264296],
        panelCoords: [112.807474, 32.101526, 113.264296],
        view: {
          pitch: -6.23865,
          yaw: -163.252945
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_DJ_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'JZZ_DJ_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JZZ_DJ_SXT_ZM1'
          },
          {
            name: '闸门',
            tagName: 'JZZ_DJ_SXT_ZM2'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_DJ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_DJ_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JZZ_DJ_SXT_ZH'
          },
          {
            name: '大闸',
            tagName: 'JZZ_DJ_SXT_DZ'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_JZZ_DJ_ZMB01',
        coords: [112.807246, 32.101711, 116.012856],
        view: {
          coordinate: { x: 112.807207, y: 32.101738, z: 117.748222 },
          rotation: { roll: 0.0, pitch: -18.241724, yaw: 37.123451 }
        }
      },
      {
        gateMapId: 'ZS_JZZ_DJ_ZMB02',
        coords: [112.807215, 32.101678, 116.012856],
        view: {
          coordinate: { x: 112.807178, y: 32.101706, z: 117.704682 },
          rotation: { roll: 0.0, pitch: -18.241724, yaw: 37.123451 }
        }
      }
    ]
  },
  {
    gateCode: '62010019',
    gateName: '兴隆（华阳河）明渠',
    coords: [112.904148043, 32.0591184021, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '明渠',
            tagName: 'MQ_XLHYH_SXT_MQ'
          }
        ]
      }
    ]
  },
  {
    gateCode: '25',
    gateName: '华阳河分水闸',
    coords: [112.90762635, 32.0585640806, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.907004, y: 32.058214, z: 128.735513 },
      rotation: { roll: 0, pitch: -13.1999, yaw: -8.881097 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_HYH_WLS_RB',
        gateMapId: 'ZS_FSZ_HYH_ZMB',
        coords: [112.907545, 32.058533, 114.676319],
        panelCoords: [112.907545, 32.058533, 112.576319],
        view: {
          pitch: -8.471372,
          yaw: 98.748604
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZ_HYH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_HYH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_HYH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZ_HYH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_FSZ_HYH_ZMB',
        coords: [112.907517, 32.058486, 111.586004],
        view: {
          coordinate: { x: 112.90755, y: 32.058537, z: 115.935064 },
          rotation: { roll: 0.000085, pitch: -31.460783, yaw: 122.300652 }
        }
      }
    ]
  },
  {
    gateCode: '27',
    gateName: '华阳河节制闸',
    coords: [112.90763842, 32.0583572106, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 112.907004, y: 32.058214, z: 128.735513 },
      rotation: { roll: 0, pitch: -13.1999, yaw: -8.881097 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_HYH_WLS_RF',
        coords: [112.90755, 32.058317, 115.447491],
        panelCoords: [112.90755, 32.058317, 118.447491],
        view: {
          pitch: -8.021126,
          yaw: -7.712576
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_HYH_WLS_RB',
        gateMapId: 'ZS_JZZ_HYH_ZMB',
        coords: [112.907721, 32.058273, 110.149031],
        panelCoords: [112.907721, 32.058273, 113.149031],
        view: {
          pitch: -9.534486,
          yaw: -171.418457
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_HYH_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'JZZ_HYH_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JZZ_HYH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_HYH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_HYH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JZZ_HYH_SXT_ZH'
          },
          {
            name: '河流',
            tagName: 'JZZ_HYH_SXT_HL'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'ZS_JZZ_HYH_ZMB',
        coords: [112.907631, 32.05829, 112.599936],
        view: {
          coordinate: { x: 112.9075, y: 32.058323, z: 115.628305 },
          rotation: { roll: 0.0, pitch: -18.618736, yaw: 13.863256 }
        }
      }
    ]
  },
  {
    gateCode: '62010025',
    gateName: '进封江口明渠',
    coords: [113.3332435, 31.9896915755, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000
  },
  {
    gateCode: 'rg-2',
    gateName: '华阳河退水闸',
    coords: [112.90215893, 32.05934117, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 112.902199, y: 32.059738, z: 132.15464 },
      rotation: { roll: -0.0, pitch: -29.90848, yaw: 81.65155 }
    },
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'TSZY_HYH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'TSZY_HYH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZY_HYH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'TSZY_HYH_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    gateCode: '69',
    gateName: '随阳分水口',
    coords: [null, null, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000
  },
  {
    gateCode: '70',
    gateName: '黑龙口分水口',
    coords: [null, null, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000
  },
  {
    gateCode: '71',
    gateName: '鲁城河分水口',
    coords: [null, null, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000
  },
  {
    gateCode: '72',
    gateName: '砂河口分水口',
    coords: [null, null, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000
  },
  {
    gateCode: '73',
    gateName: '砂河口节制闸',
    coords: [null, null, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000
  },
  {
    gateCode: 'rg-3',
    gateName: '㵐水河退水闸',
    coords: [113.296013, 31.995652, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.29591, y: 31.995969, z: 123.140313 },
      rotation: { roll: 0, pitch: -17.599999, yaw: 75.119374 }
    },
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'DCTSZY_JS_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DCTSZY_JS_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DCTSZY_JS_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DCTSZY_JS_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    gateCode: '74',
    gateName: '㵐水河检修闸',
    coords: [113.296129, 31.995739, 90],
    orgCode: 'A01A06',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.295848, y: 31.996034, z: 125.440996 },
      rotation: { roll: 0, pitch: -19.3999, yaw: 53.719028 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_JSH_WLS_RF',
        coords: [113.296057, 31.995766, 106.001991],
        panelCoords: [113.296057, 31.995766, 109.001991],
        view: {
          pitch: -17.211416,
          yaw: 11.536688
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_JSH_WLS_RB',
        coords: [113.296298, 31.995682, 104.801874],
        panelCoords: [113.296298, 31.995682, 107.801874],
        view: {
          pitch: -8.364798,
          yaw: 179.826401
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DCJXZ_JS_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'DCJXZ_JS_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'DCJXZ_JS_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DCJXZ_JS_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DCJXZ_JS_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DCJXZ_JS_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        coords: [113.296135, 31.995733, 108.001929]
      }
    ]
  },
  {
    gateCode: '75',
    gateName: '封江口水库入库节制闸',
    coords: [113.33350258, 31.98963255, 90],
    orgCode: 'A01A06',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.333183, y: 31.989507, z: 130.991274 },
      rotation: { roll: 0.016666, pitch: -15.032535, yaw: -21.307415 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_FJKRK_WLS_BF',
        coords: [113.296057, 31.995766, 106.001991],
        panelCoords: [113.296057, 31.995766, 109.001991],
        view: {
          pitch: -17.211416,
          yaw: 11.536688
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_FJKRK_WLS_RB',
        coords: [113.333703, 31.989629, 113.023113],
        panelCoords: [113.333703, 31.989629, 111.523113],
        view: {
          pitch: -8.364798,
          yaw: 179.826401
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_FJKRK_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'JZZ_FJKRK_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_FJKRK_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_FJKRK_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JZZ_FJKRK_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_FJKRK_ZMB',
        coords: [113.333542, 31.989643, 114.114485],
        view: {
          coordinate: { x: 113.33344, y: 31.989658, z: 122.004542 },
          rotation: { roll: 0.0, pitch: -25.82457, yaw: 5.85345 }
        }
      }
    ]
  },
  // 广悟段
  {
    gateCode: '76',
    gateName: '封江口水库出库节制闸',
    coords: [113.3519973, 31.9776439906, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.351234, y: 31.977121, z: 116.526222 },
      rotation: { roll: -0.0, pitch: -11.450224, yaw: -13.596341 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_FJKCK_WLS_RF',
        coords: [113.351476, 31.977258, 111.006045],
        panelCoords: [113.351476, 31.977259, 114.006045],
        view: {
          pitch: -12.694967,
          yaw: -11.837527
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_FJKCK_WLS_BB',
        gateMapId: 'GW_JZZ_FJKCK_ZMB',
        coords: [113.351566, 31.977154, 104.456488],
        panelCoords: [113.351607, 31.977187, 107.056488],
        view: {
          distance: 700,
          pitch: -10.158815,
          yaw: -155.076385
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_FJKCK',
            location: { x: 528473.621, y: 192812.86, z: -770.259 },
            rotation: { roll: -0.0, pitch: 7.949242, yaw: -123.918678 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'flow',
        name: '流量',
        dataType: 'flow',
        gateCode: '62010029',
        tagName: 'JZZ_FJKCK_FLOW',
        coords: [113.351671, 31.977095, 117.586661],
        panelCoords: [113.35164, 31.977122, 115.586661],
        view: {
          pitch: -8.771469,
          yaw: -98.049232
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_FJKCK',
            location: { x: 530049.018, y: 194564.327, z: -800.495 },
            rotation: { roll: -0.021126, pitch: -8.072871, yaw: 44.614292 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_FJKCK_SXT_ZQ'
          },
          {
            name: '景点',
            tagName: 'JZZ_FJKCK_SXT_JD'
          },
          {
            name: '水位',
            tagName: 'JZZ_FJKCK_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'JZZ_FJKCK_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_FJKCK_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_FJKCK_SXT_ZS'
          },
          {
            name: '大闸',
            tagName: 'JZZ_FJKCK_SXT_DZ'
          },
          {
            name: '闸后',
            tagName: 'JZZ_FJKCK_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_FJKCK_ZMB',
        coords: [113.351533, 31.977198, 111.950502],
        view: {
          coordinate: { x: 113.351506, y: 31.977229, z: 115.017901 },
          rotation: { roll: -0.0, pitch: -45.626873, yaw: 50.623913 }
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_FJKCK',
            location: { x: 525428.934, y: 188888.261, z: -299.163 },
            rotation: { roll: -0.0, pitch: -3.249641, yaw: 51.42915 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      }
    ]
  },
  {
    // 无监测数据
    gateCode: '80',
    gateName: '竹林湾倒虹吸出口节制闸',
    coords: [113.40896461, 31.94579741, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.409335, y: 31.945934, z: 106.794722 },
      rotation: { roll: 0, pitch: -14.45108, yaw: -144.53064 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_ZLWDHX_WLS_BF',
        coords: [113.409211, 31.946022, 98.149964],
        panelCoords: [113.409211, 31.946022, 101.149964],
        view: {
          distance: 800,
          yaw: -157
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_ZLWDHX_WLS_BB',
        coords: [113.409122, 31.946028, 97.835363],
        panelCoords: [113.409122, 31.946028, 100.835363],
        view: {
          yaw: 20
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DHXCKJZZ_ZLW_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'DHXCKJZZ_ZLW_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DHXCKJZZ_ZLW_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DHXCKJZZ_ZLW_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DHXCKJZZ_ZLW_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        coords: [113.409165, 31.94603, 100.342069]
      }
    ]
  },
  {
    gateCode: '35',
    gateName: '高城镇分水闸',
    coords: [113.43600677, 31.9355216606, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.435613, y: 31.935472, z: 106.030245 },
      rotation: { roll: -0.095447, pitch: -7.642889, yaw: 71.99469 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_GCZ_WLS_RF',
        gateMapId: 'GW_FSZ_GC_ZMB',
        coords: [113.435674, 31.935113, 97.475146],
        panelCoords: [113.435674, 31.935113, 100.475146],
        view: {
          pitch: -24.736565,
          yaw: -64.500725
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZZ_GCZ_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZZ_GCZ_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZZ_GCZ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZZ_GCZ_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZZ_GCZ_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_FSZ_GC_ZMB',
        coords: [113.435692, 31.935146, 98.674845],
        view: {
          coordinate: { x: 113.435674, y: 31.935107, z: 101.396963 },
          rotation: { roll: 0.00006, pitch: -26.16058, yaw: -65.701408 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_321']
  },
  {
    gateCode: '36',
    gateName: '漂水检修闸',
    coords: [113.44371812, 31.9299661806, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 113.443467, y: 31.929469, z: 107.80516 },
      rotation: { roll: 0, pitch: -13.042268, yaw: -174.969391 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_PS_WLS_RF',
        coords: [113.443207, 31.929548, 96.557643],
        panelCoords: [113.443207, 31.929548, 99.557643],
        view: {
          coordinate: { x: 113.44306, y: 31.92965, z: 101.308063 },
          rotation: { roll: 0, pitch: -1.616993, yaw: 39.958164 }
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JXZ_PS_WLS_RB',
        gateMapId: 'GW_JXZ_PS_ZMB',
        coords: [113.443253, 31.929506, 96.472558],
        panelCoords: [113.443253, 31.929506, 99.472558],
        view: {
          coordinate: { x: 113.44343, y: 31.929388, z: 103.913764 },
          rotation: { roll: 0, pitch: -12.756289, yaw: -156.522598 }
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JXZ_PSH_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'JXZ_PSH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'JXZ_PSH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JXZ_PSH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JXZ_PSH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JXZ_PS_ZMB',
        coords: [113.443249, 31.929499, 99.47258],
        view: {
          coordinate: { x: 113.44343, y: 31.929388, z: 103.913764 },
          rotation: { roll: 0, pitch: -12.756289, yaw: -156.522598 }
        }
      }
    ]
  },
  {
    // 无监测点
    gateCode: 'rg-4',
    gateName: '漂水河退水闸',
    coords: [113.44333298, 31.92977796, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.44347, y: 31.929978, z: 110.306082 },
      rotation: { roll: -0.150432, pitch: -21.232487, yaw: 122.420982 }
    },
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'TSZZ_PSH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'TSZZ_PSH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZZ_PSH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'TSZZ_PSH_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    // 无监测数据
    // 1	雷达	泵站前池
    gateCode: '38',
    gateName: '两河口分水闸',
    coords: [113.50793692, 31.90270961, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.508158, y: 31.902255, z: 134.144904 },
      rotation: { roll: 0.126394, pitch: -15.732905, yaw: -116.049385 }
    },
    monitorDevice: [
      {
        type: 'flow',
        name: '流量',
        dataType: 'flow',
        coords: [113.507871, 31.902847, 112.36877],
        panelCoords: [113.507871, 31.902847, 115.36877]
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'FSZY_LHK_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZY_LHK_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZY_LHK_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZY_LHK_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        coords: [113.507867, 31.902763, 111.882346]
      }
    ]
  },
  {
    gateCode: '39',
    gateName: '两河口节制闸',
    coords: [113.50847738, 31.9032551706, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.508544, y: 31.902903, z: 125.267047 },
      rotation: { roll: -0.0, pitch: -17.58532, yaw: -159.323761 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_LHK_WLS_BF',
        coords: [113.508246, 31.902977, 110.556989],
        panelCoords: [113.508246, 31.902977, 113.556989],
        view: {
          pitch: -4.753329,
          yaw: -103.378258
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_LHK',
            location: { x: 2009804.487, y: 1011591.631, z: -4398.563 },
            rotation: { roll: 0.000102, pitch: -9.764532, yaw: -144.812241 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_LHK_WLS_BB',
        gateMapId: 'GW_JZZ_LHK_ZMB',
        coords: [113.508108, 31.903068, 110.600026],
        panelCoords: [113.508108, 31.903068, 113.600026],
        view: {
          coordinate: { x: 113.508016, y: 31.903043, z: 115.744483 },
          rotation: { roll: -0.0, pitch: -11.448317, yaw: -12.096665 }
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_LHK',
            location: { x: 2006663.793, y: 1009369.841, z: -4294.908 },
            rotation: { roll: 0.000102, pitch: -12.239253, yaw: 33.399017 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_LHK_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'JZZ_LHK_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_LHK_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_LHK_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JZZ_LHK_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_LHK_ZMB',
        coords: [113.508184, 31.903013, 112.032366],
        view: {
          coordinate: { x: 113.508251, y: 31.902976, z: 117.760359 },
          rotation: { roll: -0.0, pitch: -27.819963, yaw: -147.584396 }
        }
      }
    ]
  },
  {
    gateCode: '40',
    gateName: '吴店河退水闸',
    coords: [113.56972964, 31.8808890906, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 113.569329, y: 31.880792, z: 104.516748 },
      rotation: { roll: 0.185909, pitch: -18.362392, yaw: -17.133022 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'TSZ_WDH_WLS_RF',
        coords: [113.569583, 31.880821, 95.536226],
        panelCoords: [113.569583, 31.880821, 98.872788],
        view: {
          pitch: -14.336895,
          yaw: -23.831036
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'TSZZ_WDH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'TSZZ_WDH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZZ_WDH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'TSZZ_WDH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'TSZ_WDH_HL_ZMB',
        coords: [113.569631, 31.880823, 96.354485]
      }
    ]
  },
  {
    gateCode: '41',
    gateName: '老虎沟倒虹吸进口检修闸',
    coords: [113.56949354, 31.8808321506, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.569193, y: 31.88072, z: 101.303678 },
      rotation: { roll: 0.059471, pitch: -8.597329, yaw: 12.857715 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_LHGDHX_WLS_RF',
        coords: [113.569363, 31.880718, 101.774959],
        panelCoords: [113.569363, 31.880718, 99.574959],
        view: {
          coordinate: { x: 113.569223, y: 31.880702, z: 102.616963 },
          rotation: { roll: -0.0, pitch: -12.531849, yaw: -4.742715 }
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JXZ_LHGDHX_WLS_RB',
        gateMapId: 'GW_JXZ_LHGDHX_ZMB',
        coords: [113.569513, 31.880656, 95.446052],
        panelCoords: [113.569558, 31.880645, 98.915946],
        view: {
          pitch: -19.269972,
          yaw: 161.494843
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_LHGDHX',
            location: { x: 2590224.135, y: 1257730.363, z: -7135.957 },
            rotation: { roll: 0.0, pitch: -3.619326, yaw: -151.159302 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DHXJKJXZ_LHG_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'DHXJKJXZ_LHG_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DHXJKJXZ_LHG_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DHXJKJXZ_LHG_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DHXJKJXZ_LHG_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JXZ_LHGDHX_ZMB',
        coords: [113.569509, 31.880661, 99.643398],
        view: {
          coordinate: { x: 113.56957, y: 31.880642, z: 101.108054 },
          rotation: { roll: 0.0, pitch: -27.691973, yaw: -152.952347 }
        }
      }
    ]
  },
  {
    gateCode: '42',
    gateName: '先觉庙分水闸',
    coords: [113.58485328, 31.8745877606, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.584609, y: 31.874784, z: 108.92345 },
      rotation: {
        roll: 0,
        pitch: -14.647823,
        yaw: 49.253611
      }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_XJM_WLS_BF',
        coords: [113.584809, 31.874644, 96.23367],
        panelCoords: [113.584809, 31.874644, 99.23367],
        view: {
          pitch: -8.364388,
          yaw: 152.571121
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_XJM_WLS_RB',
        gateMapId: 'GW_FSZ_XJM_ZMB',
        coords: [113.584762, 31.874543, 96.038174],
        panelCoords: [113.584762, 31.874543, 99.038174],
        view: {
          pitch: -18.628487,
          yaw: -17.334721
        }
      },
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010033',
        name: '流量',
        tagName: 'FSZ_XJM_FLOW',
        coords: [113.584714, 31.874577, 101.758862],
        panelCoords: [113.584714, 31.874577, 105.758862],
        view: {
          pitch: -9.136988,
          yaw: 20.441385
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZY_XJM_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZY_XJM_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZY_XJM_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZY_XJM_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZY_XJM_SXT_ZH'
          },
          {
            name: '河流',
            tagName: 'FSZY_XJM_SXT_HL'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_FSZ_XJM_ZMB',
        coords: [113.584777, 31.874583, 96.434991],
        view: {
          coordinate: { x: 113.584745, y: 31.87452, z: 100.7957 },
          rotation: { roll: -0.0, pitch: -28.762032, yaw: -61.378277 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_417']
  },
  {
    // 无监测数据
    gateCode: '43',
    gateName: '千家河倒虹吸出口节制闸',
    coords: [113.59462184, 31.87087256, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.595047, y: 31.870764, z: 114.48334 },
      rotation: { roll: -0.07186, pitch: -20.618156, yaw: -167.881409 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_QJHDHX_WLS_BF',
        coords: [113.59458, 31.87094, 98.928766],
        panelCoords: [113.59458, 31.87094, 101.928766],
        view: {
          pitch: -5.674585,
          yaw: 50.894779
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_QJHDHX_WLS_RB',
        gateMapId: 'GW_JZZ_QJHDHX_ZMB',
        coords: [113.594543, 31.870834, 99.238619],
        panelCoords: [113.594543, 31.870834, 102.238619],
        view: {
          pitch: -7.636279,
          yaw: -91.085541
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DHXCKJZZ_QJH_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'DHXCKJZZ_QJH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DHXCKJZZ_QJH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DHXCKJZZ_QJH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DHXCKJZZ_QJH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_QJHDHX_ZMB',
        coords: [113.594565, 31.87089, 101.434566],
        view: {
          coordinate: { x: 113.595047, y: 31.870764, z: 114.48334 },
          rotation: { roll: -0.07186, pitch: -20.618156, yaw: -167.881409 }
        }
      }
    ]
  },
  {
    gateCode: '44',
    gateName: '张家桥倒虹吸进口检修闸',
    coords: [113.65728365, 31.8180432806, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 113.657685, y: 31.817352, z: 111.406161 },
      rotation: { roll: 0.15654, pitch: -13.888958, yaw: -124.799858 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_ZJQDHX_WLS_RF',
        coords: [113.657065, 31.818006, 93.712153],
        panelCoords: [113.657065, 31.818006, 96.712153],
        view: {
          pitch: -16.950527,
          yaw: 7.467819
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JXZ_ZJQDHX_WLS_BB',
        gateMapId: 'GW_JXZ_ZJQDHX_ZMB',
        coords: [113.657316, 31.817827, 95.000995],
        panelCoords: [113.657316, 31.817827, 98.000995],
        view: {
          pitch: -19.567375,
          yaw: -107.874916
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'DHXJKJXZ_ZJQH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DHXJKJXZ_ZJQH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DHXJKJXZ_ZJQH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DHXJKJXZ_ZJQH_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JXZ_ZJQDHX_ZMB',
        coords: [113.657216, 31.817884, 94.631883],
        view: {
          coordinate: { x: 113.657302, y: 31.817817, z: 103.136437 },
          rotation: { roll: -0.0, pitch: -29.233519, yaw: -138.100143 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_72']
  },
  {
    gateCode: '81',
    gateName: '余店河分水（退水）闸',
    coords: [113.65947234, 31.8163612206, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.659357, y: 31.816425, z: 113.326913 },
      rotation: { roll: 0.0, pitch: -11.047823, yaw: 78.453612 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_YDH_WLS_RF',
        gateMapId: 'GW_FSZ_YDH_ZMB',
        coords: [113.659488, 31.816008, 93.330882],
        panelCoords: [113.659488, 31.816008, 96.330882],
        view: {
          pitch: -14.101108,
          yaw: 90.993492
        }
      },
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010034',
        name: '流量',
        tagName: 'FSZ_YDH_FLOW',
        coords: [113.659323, 31.815822, 103.250191],
        panelCoords: [113.659323, 31.815822, 103.250191],
        view: {
          pitch: -10.557409,
          yaw: -62.531109
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZY_YD_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZY_YD_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZY_YD_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZY_YD_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZY_YD_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_FSZ_YDH_ZMB',
        coords: [113.659456, 31.815981, 95.323977],
        view: {
          coordinate: { x: 113.659538, y: 31.816051, z: 99.76222 },
          rotation: { roll: 0.0, pitch: -21.995234, yaw: 133.937515 }
        }
      }
    ]
  },
  {
    gateCode: '62010035',
    gateName: '余店河（张家湾）明渠',
    coords: [113.6721237, 31.80628857, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.659357, y: 31.816425, z: 113.326913 },
      rotation: { roll: 0.0, pitch: -11.047823, yaw: 78.453612 }
    },
    monitorDevice: [
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010035',
        name: '流量',
        coords: [113.659355, 31.815906, 95.498291],
        panelCoords: [113.659355, 31.815906, 98.498291],
        view: {
          pitch: -10.557409,
          yaw: -62.531109
        }
      }
    ]
  },
  {
    gateCode: '46',
    gateName: '余店河倒虹吸出口节制闸',
    coords: [113.6761141, 31.8045665206, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.67652, y: 31.804319, z: 118.533218 },
      rotation: { roll: -0.137339, pitch: -17.661581, yaw: -170.034485 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_YDHDHX_WLS_RF',
        coords: [113.675913, 31.804411, 92.835672],
        panelCoords: [113.675913, 31.804412, 95.835672],
        view: {
          pitch: -13.174195,
          yaw: 22.426764
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_YDHDHX_WLS_RB',
        gateMapId: 'GW_JZZ_YDHDHX_ZMB',
        coords: [113.676308, 31.804248, 97.80626],
        panelCoords: [113.676308, 31.804248, 100.80626],
        view: {
          coordinate: { x: 113.67625, y: 31.804274, z: 91.609568 },
          rotation: { roll: 0.000204, pitch: -7.865782, yaw: 29.81426 }
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'HDHXCKJZZ_YD_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'HDHXCKJZZ_YD_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'HDHXCKJZZ_YD_SXT_ZS'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_YDHDHX_ZMB',
        coords: [113.675955, 31.804395, 95.464116],
        view: {
          coordinate: { x: 113.676039, y: 31.80436, z: 98.590034 },
          rotation: { roll: 0.000204, pitch: -40.327991, yaw: -155.156952 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_81']
  },
  {
    gateCode: '47',
    gateName: '四家门楼分水闸',
    coords: [113.71837365, 31.7314055806, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.717735, y: 31.730966, z: 109.54523 },
      rotation: { roll: 0.0, pitch: -17.647823, yaw: -18.14639 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'FSZ_SJM_WLS_RF',
        gateMapId: 'GW_FSZ_SJML_ZMB02',
        coords: [113.718124, 31.731149, 92.691949],
        panelCoords: [113.718124, 31.731149, 94.991949],
        view: {
          pitch: -26.20541,
          yaw: 131.302856
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'FSZ_SJM_WLS_RB',
        gateMapId: 'GW_FSZ_SJML_ZMB01',
        coords: [113.71805, 31.73109, 92.877852],
        panelCoords: [113.71805, 31.73109, 95.877852],
        view: {
          pitch: -17.019871,
          yaw: -45.172119
        }
      },
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010036',
        name: '流量',
        tagName: 'FSZ_SJML_FLOW',
        coords: [113.71788, 31.730939, 95.54962],
        panelCoords: [113.71788, 31.730939, 95.54962],
        view: {
          pitch: -17.636486,
          yaw: -16.187325
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZY_SJML_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZY_SJML_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZY_SJML_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZY_SJML_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZY_SJML_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_FSZ_SJML_ZMB02',
        coords: [113.718098, 31.731128, 97.25698],
        view: {
          coordinate: { x: 113.718095, y: 31.731107, z: 97.074217 },
          rotation: { roll: 0.0, pitch: -45.36132, yaw: -70.433876 }
        }
      },
      {
        gateMapId: 'GW_FSZ_SJML_ZMB01',
        coords: [113.718075, 31.731111, 95.145366],
        view: {
          coordinate: { x: 113.718036, y: 31.731082, z: 97.819649 },
          rotation: { roll: 0.0, pitch: -34.237686, yaw: -42.419407 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_102']
  },
  {
    // 无监测数据
    gateCode: 'rg-6',
    gateName: '龙泉河退水闸',
    coords: [113.77259509, 31.71550095, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 113.772148, y: 31.715372, z: 109.755418 },
      rotation: { roll: 0, pitch: -16.247823, yaw: -2.346384 }
    },
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'TSZZ_LQH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'TSZZ_LQH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZZ_LQH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'TSZZ_LQH_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    gateCode: '49',
    gateName: '龙泉河节制闸',
    coords: [113.7727608, 31.7156299306, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.771732, y: 31.715462, z: 128.62029 },
      rotation: { roll: 0.25412, pitch: -21.884232, yaw: 5.683353 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_LQH_WLS_RF',
        coords: [113.772551, 31.715366, 91.315614],
        panelCoords: [113.772551, 31.715366, 94.315614],
        view: {
          coordinate: { x: 113.772422, y: 31.715369, z: 96.831214 },
          rotation: { roll: 0.0, pitch: -16.793007, yaw: -4.899338 }
        }
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JZZ_LQH_WLS_RB',
        gateMapId: 'GW_JZZ_LQH_ZMB',
        coords: [113.77268, 31.715325, 91.423811],
        panelCoords: [113.77268, 31.715325, 94.423811],
        view: {
          pitch: -12.30713,
          yaw: -162.859589
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'JZZ_LQH_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'JZZ_LQH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'JZZ_LQH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'JZZ_LQH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'JZZ_LQH_SXT_ZH'
          },
          {
            name: '河流',
            tagName: 'JZZ_LQH_SXT_HL'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_LQH_ZMB',
        coords: [113.77262, 31.715345, 92.372746],
        view: {
          coordinate: { x: 113.772516, y: 31.715377, z: 96.351595 },
          rotation: { roll: 0.0, pitch: -29.018204, yaw: 19.909986 }
        }
      }
    ]
  },
  {
    // 无监测数据
    // 1	雷达	七里冲调蓄池
    gateCode: '50',
    gateName: '广水应山城区分水闸',
    coords: [113.85746947, 31.68594889, 90],
    orgCode: 'A01A07',
    VisualRange: 3000000,
    view: {
      coordinate: { x: 113.857166, y: 31.685585, z: 108.203069 },
      rotation: { roll: 0.0, pitch: -14.647823, yaw: -35.34639 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'FSZ_GSYSCQ_WLS_RB',
        coords: [113.8575, 31.685708, 97.525237],
        panelCoords: [113.8575, 31.685708, 95.025237],
        view: {
          pitch: -18.534441,
          yaw: -103.047241
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'FSZ_GSYSCQ_SXT_ZQ'
          },
          {
            name: '闸门',
            tagName: 'FSZ_GSYSCQ_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'FSZ_GSYSCQ_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'FSZ_GSYSCQ_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'FSZ_GSYSCQ_SXT_ZH'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'FSZ_GSYSCQ_HL_ZMB',
        coords: [113.857507, 31.685789, 91.682249]
      }
    ]
  },
  {
    gateCode: '51',
    gateName: '广水节制闸',
    coords: [113.8672024, 31.68366538, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 113.861028, y: 31.686407, z: 142.016278 },
      rotation: { roll: -0.168298, pitch: -23.148577, yaw: 48.332729 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_GS_WLS_BF',
        coords: [113.861678, 31.685653, 92.663335],
        panelCoords: [113.861678, 31.685653, 95.063335],
        view: {
          pitch: -27.777063,
          yaw: -14.158367
        }
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JZZ_GS_WLS_BB',
        gateMapId: 'GW_JZZ_GS_ZMB',
        coords: [113.861775, 31.685682, 92.323502],
        panelCoords: [113.861775, 31.685682, 94.723502],
        view: {
          pitch: -11.631842,
          yaw: 132.033783
        }
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_GS_ZMB',
        coords: [113.861745, 31.685666, 93.409035],
        view: {
          coordinate: { x: 113.861656, y: 31.685671, z: 97.328209 },
          rotation: { roll: 0.0, pitch: -32.394543, yaw: 5.210783 }
        }
      }
    ]
  },
  {
    // 无监测数据
    gateCode: 'rg-7',
    gateName: '宝林河退水闸',
    coords: [113.87519243, 31.68487994, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 113.875261, y: 31.684639, z: 106.231055 },
      rotation: { roll: 0, pitch: -14.847823, yaw: -130.746386 }
    },
    gateOpening: [
      {
        coords: [113.874986, 31.68487, 91.126138]
      }
    ],
    monitorDevice: [
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸门',
            tagName: 'TSZY_BLH_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'TSZY_BLH_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'TSZY_BLH_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'TSZY_BLH_SXT_ZH'
          }
        ]
      }
    ]
  },
  {
    gateCode: '82',
    gateName: '宝林检修闸',
    coords: [113.87513133, 31.6850509106, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 113.874418, y: 31.685111, z: 135.990136 },
      rotation: { roll: 0.127343, pitch: -31.623568, yaw: 21.194309 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_BL_WLS_RF',
        coords: [113.874992, 31.684961, 89.675661],
        panelCoords: [113.874949, 31.684966, 93.346608],
        view: {
          pitch: -23.99065,
          yaw: 4.247818
        }
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JXZ_BL_WLS_RB',
        gateMapId: 'GW_JXZ_BL_ZMB',
        coords: [113.875097, 31.684956, 89.864362],
        panelCoords: [113.875097, 31.684956, 92.864362],
        view: {
          pitch: -21.737501,
          yaw: -159.860001
        }
      },
      {
        dataType: 'video',
        nameList: [
          {
            name: '闸前',
            tagName: 'DCSDJXZ_BL_SXT_ZQ'
          },
          {
            name: '水位',
            tagName: 'DCSDJXZ_BL_SXT_SW'
          },
          {
            name: '闸门',
            tagName: 'DCSDJXZ_BL_SXT_ZM'
          },
          {
            name: '闸室门口',
            tagName: 'DCSDJXZ_BL_SXT_ZSMK'
          },
          {
            name: '闸室',
            tagName: 'DCSDJXZ_BL_SXT_ZS'
          },
          {
            name: '闸后',
            tagName: 'DCSDJXZ_BL_SXT_ZH'
          },
          {
            name: '闸后',
            tagName: 'DCSDJXZ_BL_SXT_DC'
          }
        ]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JXZ_BL_ZMB',
        coords: [113.875043, 31.684957, 91.120424],
        view: {
          coordinate: { x: 113.874936, y: 31.684966, z: 94.305661 },
          rotation: { roll: 0.0, pitch: -26.554089, yaw: 4.917038 }
        }
      }
    ]
  },
  {
    gateCode: '54',
    gateName: '广水河退水闸',
    coords: [114.03172374, 31.6502351, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 114.026287, y: 31.651869, z: 98.311386 },
      rotation: { roll: 0, pitch: -9.047823, yaw: -97.746391 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'TSZ_GS_WLS_BF',
        gateMapId: 'GW_TSZ_GSH_ZMB',
        coords: [114.026163, 31.652133, 88.511307],
        panelCoords: [114.026163, 31.652133, 91.511307],
        view: {
          pitch: -6.351346,
          yaw: -49.279568
        }
      }
      // {
      //   type: 'flow',
      //   dataType: 'flow',
      //   gateCode: 'rg-8',
      //   name: '流量',
      //   coords: [114.026197, 31.652119, 88.354947],
      //   panelCoords: [114.026197, 31.652119, 91.354947],
      //   view: {
      //     pitch: -10.428847,
      //     yaw: -28.319126
      //   }
      // }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_TSZ_GSH_ZMB',
        coords: [114.026242, 31.652153, 89.678949],
        view: {
          coordinate: { x: 114.026144, y: 31.652112, z: 92.901511 },
          rotation: { roll: 0.0, pitch: -28.043837, yaw: -32.072151 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_501']
  },
  {
    gateCode: '83',
    gateName: '广水河倒虹吸进口检修闸',
    coords: [114.03011607, 31.6500984606, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 114.030646, y: 31.649658, z: 104.320927 },
      rotation: { roll: -0.258001, pitch: -13.808815, yaw: -171.797485 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_GSHDHX_WLS_RF',
        coords: [114.030012, 31.649783, 88.739311],
        panelCoords: [114.030012, 31.649783, 91.739311],
        view: {
          pitch: -18.92037,
          yaw: -0.191839
        }
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JXZ_GSHDHX_WLS_BB',
        gateMapId: 'GW_JXZ_GSHDHX_ZMB',
        coords: [114.030116, 31.649727, 88.583784],
        panelCoords: [114.030116, 31.649727, 91.583784],
        view: {
          pitch: -24.767084,
          yaw: -179.308289
        }
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JXZ_GSHDHX_ZMB',
        coords: [114.030066, 31.649761, 89.50923],
        view: {
          coordinate: { x: 114.029987, y: 31.64979, z: 92.684434 },
          rotation: { roll: 0.0, pitch: -32.199875, yaw: 21.036434 }
        }
      }
    ]
  },
  {
    gateCode: 'rg-9',
    gateName: '广水河倒虹吸放空阀',
    coords: [null, null, 90],
    orgCode: 'A01A07',
    VisualRange: 30000
  },
  {
    gateCode: '84',
    gateName: '广水河倒虹吸节制闸',
    coords: [114.04494332, 31.6441273406, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 114.044093, y: 31.643876, z: 101.167882 },
      rotation: { roll: 0.0, pitch: -3.572518, yaw: 15.738097 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_GSHDHX_WLS_BF',
        coords: [114.044803, 31.643705, 86.951511],
        panelCoords: [114.044803, 31.643705, 89.951511],
        view: {
          pitch: -11.52938,
          yaw: 61.349876
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_GSHDHX',
            location: {
              x: 7103852.744476,
              y: 3862984.458151,
              z: -53021.332908
            },
            rotation: { roll: 0.0, pitch: -7.012987, yaw: 41.609699 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JZZ_GSHDHX_WLS_RB',
        gateMapId: 'GW_JZZ_GSHDHX_ZMB',
        coords: [114.044941, 31.643635, 93.245359],
        panelCoords: [114.044941, 31.643635, 90.745359],
        view: {
          pitch: -9.218771,
          yaw: -115.315834
        }
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_GSHDHX_ZMB',
        coords: [114.044873, 31.643677, 88.544803],
        view: {
          coordinate: { x: 114.044809, y: 31.643717, z: 92.906367 },
          rotation: { roll: 0.0, pitch: -41.54483, yaw: 36.741871 }
        }
      }
    ]
  },
  {
    gateCode: '62010038',
    gateName: '霞家河分水阀',
    coords: [null, null, 90],
    orgCode: 'A01A07',
    VisualRange: 30000
  },
  {
    gateCode: '58',
    gateName: '霞家河节制闸',
    coords: [114.07093495, 31.6204644, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 114.065071, y: 31.622656, z: 93.681703 },
      rotation: { roll: 0, pitch: -7.622899, yaw: 88.160423 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_XJH_WLS_BF',
        coords: [114.065077, 31.622342, 84.5],
        panelCoords: [114.065045, 31.622379, 89.8],
        view: {
          coordinate: { x: 114.065089, y: 31.622467, z: 91.024779 },
          rotation: { roll: -0.710942, pitch: -14.237696, yaw: 86.341888 }
        }
      },
      {
        type: 'water-level',
        name: '闸后',
        dataType: 'zdown',
        tagName: 'JZZ_XJH_WLS_BB',
        gateMapId: 'GW_JZZ_XJH_ZMB',
        coords: [114.065079, 31.622296, 87.640974],
        panelCoords: [114.065106, 31.622276, 89.564163],
        panelScale: [0.8, 0.8, 0.8],
        view: {
          pitch: -11.382404,
          yaw: -62.276508
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_XJH',
            location: { x: 7298224.058, y: 4099763.824, z: -56446.932 },
            rotation: { roll: 0.72919, pitch: -4.229916, yaw: -101.243347 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        dataType: 'video',
        name: '闸前',
        wmstCode: '42138100000075',
        coords: [114.065069, 31.622373, 93.664304]
      },
      {
        dataType: 'video',
        name: '闸室门口',
        wmstCode: '42138100000076',
        coords: [114.065106, 31.622302, 94.854209]
      },
      {
        dataType: 'video',
        name: '闸室',
        wmstCode: '42138100000077',
        coords: [114.065106, 31.622302, 95.854209]
      },
      {
        dataType: 'video',
        name: '闸后',
        wmstCode: '42138100000078',
        coords: [114.065118, 31.622245, 96.807878]
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_XJH_ZMB',
        coords: [114.06509, 31.62231, 89.030696],
        view: {
          coordinate: { x: 114.065087, y: 31.622366, z: 91.841452 },
          rotation: { roll: 0.0, pitch: -25.472847, yaw: 86.432823 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_839']
  },
  {
    gateCode: '85',
    gateName: '王家冲水库入库节制闸',
    coords: [114.11809592, 31.61132771, 90],
    orgCode: 'A01A07',
    VisualRange: 8000000,
    view: {
      coordinate: { x: 114.118046, y: 31.611232, z: 96.783824 },
      rotation: { roll: 0.0, pitch: -10.359685, yaw: -118.475624 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JZZ_WJCSK_WLS_BF',
        coords: [114.117851, 31.611376, 87.724965],
        panelCoords: [114.117851, 31.611376, 90.024965],
        view: {
          pitch: -8.75303,
          yaw: 0.561638
        },
        sceneCaptures: [
          {
            playerID: 1,
            id: 'JZZ_WJCSK',
            location: {
              x: 7798549.331856,
              y: 4216527.113109,
              z: -63144.787535
            },
            rotation: { roll: 0.0, pitch: -4.493623, yaw: 3.736875 },
            renderSize: { x: 640, y: 320 },
            anchor: { x: 1, y: 1 },
            screenPosition: { x: -680, y: -360 }
          }
        ]
      },
      {
        type: 'water-level',
        dataType: 'zdown',
        name: '闸后',
        tagName: 'JZZ_WJCSK_WLS_RB',
        gateMapId: 'GW_JZZ_WJCRK_ZMB',
        coords: [114.118072, 31.611379, 92.978983],
        panelCoords: [114.118072, 31.611379, 90.978983],
        view: {
          coordinate: { x: 114.117989, y: 31.611333, z: 93.076439 },
          rotation: { roll: -0.0, pitch: -6.80976, yaw: -31.62752 }
        }
      },
      {
        type: 'flow',
        dataType: 'flow',
        gateCode: '62010040',
        name: '流量',
        tagName: 'JZZ_WJCSK_FLOW',
        coords: [114.117986, 31.611641, 96.362913],
        panelCoords: [114.117986, 31.611641, 96.362913],
        view: {
          coordinate: { x: 114.117995, y: 31.611744, z: 97.102582 },
          rotation: { roll: -0.0, pitch: -4.545505, yaw: 91.730568 }
        }
      }
    ],
    gateOpening: [
      {
        gateMapId: 'GW_JZZ_WJCRK_ZMB',
        coords: [114.1179, 31.611387, 88.773663],
        view: {
          coordinate: { x: 114.117792, y: 31.611394, z: 93.638247 },
          rotation: { roll: -0.000015, pitch: -23.518688, yaw: 2.917744 }
        }
      }
    ],
    ahdId: ['StaticMeshActor_527']
  },
  {
    gateCode: '86',
    gateName: '王家冲水库出库输水洞检修闸',
    coords: [114.1238928, 31.6101828806, 90],
    orgCode: 'A01A07',
    VisualRange: 30000,
    view: {
      coordinate: { x: 114.12455, y: 31.609799, z: 114.399557 },
      rotation: { roll: -0.493412, pitch: -17.841597, yaw: 172.742218 }
    },
    monitorDevice: [
      {
        type: 'water-level',
        dataType: 'zup',
        name: '闸前',
        tagName: 'JXZ_WJCSK_WLS_RF',
        gateMapId: 'GW_JXZ_WJCCK_ZMB',
        coords: [114.123715, 31.609707, 86.567023],
        panelCoords: [114.123715, 31.609707, 89.067023],
        view: {
          distance: 1000,
          pitch: -17.728436,
          yaw: -42.781357
        }
      },
      {
        dataType: 'video',
        list: [
          {
            tagName: 'JZZ_MLDHX_SXT_ZQ',
            name: '闸前'
          },
          {
            tagName: 'JZZ_MLDHX_SXT_ZQ',
            name: '闸后'
          }
        ]
      }
    ]
  }

  // {
  //   gateCode: 'rg-13',
  //   gateName: '大悟二水厂调流阀',
  //   coords: [0, 0, 90],
  //   orgCode: 'A01A07',
  //   VisualRange: 30000
  // },
  // {
  //   gateCode: '77',
  //   gateName: '封江口水库灌溉分水口1',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A07'
  // },
  // {
  //   gateCode: '78',
  //   gateName: '封江口水库灌溉分水口2',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A07'
  // },
  // {
  //   gateCode: '87',
  //   gateName: '曹家口',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A07'
  // },
  // {
  //   gateCode: '79',
  //   gateName: '封江口水库发电分水口1',
  //   coords: [null, null, 90],
  //   orgCode: 'A01A07'
  // }
]
