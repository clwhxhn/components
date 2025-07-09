import gateControlList from '@/mock/gateControl.json'
import openChannelList from '@/mock/openChannel.json'
import gateCheckList from '@/mock/gateCheck.json'
import gateDistributionList from '@/mock/gateDistribution.json'
import gateEscapeList from '@/mock/gateEscape.json'
import aqueduct from '@/mock/aqueduct.json'
import tunnel from '@/mock/tunnel.json'
import siphonList from '@/mock/invertedSiphon.json'
import culvertList from '@/mock/culvert.json'
import type { viewOptions, sceneCaptureOptions } from '@/ue/ue.d.ts'
import type { ActionConfig } from '@/ue/action/action'
import ventingSystemList from '@/mock/ventingSystem.json'
import pipeBridgeList from '@/mock/pipeBridge.json'
import { getAssetsImages, imageUrlToBase64 } from '@/utils/image'

export interface roamingLineOptions {
  id: string
}

export interface monitorDeviceOptions {
  type: string
  dataType: string
  name: string
  nameList: Array<{
    name: string
    tagName: string
  }>
  coords: number[]
  panelCoords: number[]
  view: viewOptions | string | undefined
  tagName?: string
}

export interface panelOptions {
  bgPath: string
  location: number[]
  rotation: number[]
  renderScale?: number
}

export interface BuildingDetailLinear {
  id: number
  featureId?: string | undefined
  region: string
  length: number
  designFlow: number | string
  designWL1: number
  designWL2: number
  designVerticalSlope?: string | undefined
  designElevation?: string | undefined
  bottomWidth?: number | undefined
  crossSectionShape?: string | undefined
  section: string
  mileageStart: string
  mileageEnd: string
  name: string
  farView?: string | viewOptions | undefined
  actions?: ActionConfig[] | undefined
  nearView?: string | viewOptions | undefined
  type?: string | undefined
  namePOILocation?: [number, number, number]
  translucentTag?: string | undefined
  dissolveTag?: string | undefined
  moveActorTag?: string | undefined
  showTipTag?: string | undefined
  deltaHeight?: number | undefined
  duration?: number | undefined
  elevationPanel?: panelOptions
  bottomWidthPanel?: panelOptions
  verticalSlopePanel?: panelOptions
  waterLevelPanel?: panelOptions
  roamingLines?: roamingLineOptions[] | undefined
  showWorld?: boolean
}

export interface BuildingDetailGate {
  id: number
  featureId?: string | undefined
  gateCode?: string | undefined
  region: string
  designFlow: number | string
  designWL: number | string | undefined
  elevation: number | string
  mileage: string
  name: string
  coords?: number[] | undefined
  farView?: viewOptions | undefined
  actions?: ActionConfig[] | undefined
  type?: string | undefined
  section?: string | undefined
  gateSize?: string | undefined
  namePOILocation?: [number, number, number]
  roamingLines?: roamingLineOptions[] | undefined
  gatePanel?: undefined | panelOptions
  elevationPanel?: undefined | panelOptions
  hoistPanel?: undefined | panelOptions
  monitorDevice?: monitorDeviceOptions[]
  sceneCaptures?: undefined | sceneCaptureOptions[]
}

export function isGate(featureID: string) {
  return ['JZZ', 'JXZ', 'FSZ', 'TSZ'].reduce((res, curr) => {
    return res || featureID.includes(curr)
  }, false)
}

export function isAbovegroundCanal(featureID: string) {
  return ['MQ', 'DC'].reduce((res, curr) => {
    return res || featureID.includes(curr)
  }, false)
}

export function isUndergroundCanal(featureID: string) {
  return ['AH', 'SD', 'DHX'].reduce((res, curr) => {
    return res || featureID.includes(curr)
  }, false)
}

export function getGateConfig(featureId): BuildingDetailGate {
  if (!featureId) throw new Error('Gate FeatureID is requried!')
  let config: BuildingDetailGate | undefined
  if (featureId.startsWith('JZZ')) {
    config = gateControlList.find(
      g => g.featureId === featureId
    ) as BuildingDetailGate
  }
  if (featureId.startsWith('JXZ')) {
    config = gateCheckList.find(
      g => g.featureId === featureId
    ) as BuildingDetailGate
  }
  if (featureId.startsWith('FS')) {
    config = gateDistributionList.find(
      g => g.featureId === featureId
    ) as BuildingDetailGate
  }
  if (featureId.startsWith('TSZ')) {
    config = gateEscapeList.find(
      g => g.featureId === featureId
    ) as BuildingDetailGate
  }
  if (!config) throw new Error('Gate Config Not Found')
  return config
}

export function getCanalConfig(featureId) {
  if (!featureId) throw new Error('Canal FeatureID is requried!')
  let config: BuildingDetailLinear | undefined
  if (featureId.startsWith('MQ')) {
    config = openChannelList.find(
      g => g.featureId === featureId
    ) as BuildingDetailLinear
  }
  if (featureId.startsWith('DC')) {
    config = aqueduct.find(
      g => g.featureId === featureId
    ) as BuildingDetailLinear
  }
  if (featureId.startsWith('AH')) {
    config = culvertList.find(
      g => g.featureId === featureId
    ) as BuildingDetailLinear
  }
  if (featureId.startsWith('SD')) {
    config = tunnel.find(g => g.featureId === featureId) as BuildingDetailLinear
  }
  if (featureId.startsWith('DHX')) {
    config = siphonList.find(
      g => g.featureId === featureId
    ) as BuildingDetailLinear
  }
  if (!config) throw new Error('Canal Config Not Found')
  return config
}

export function isAttachedBuilding(featureID: string) {
  return ['jxltxt', 'fkxt', 'gq', 'fsk'].reduce((res, curr) => {
    return res || featureID.startsWith(curr)
  }, false)
}

export function getBuildingConfig(featureId) {
  if (!featureId) throw new Error('Building FeatureID is requried!')
  const code = featureId.split('_')[1]
  const list = ventingSystemList.concat(pipeBridgeList)
  const config = list.find(item => item.code === code)
  return config
}

export async function getGateNamePOIConfig(config) {
  let bgPath = 'overview/bg-name-poi.png'
  if (config.name.length >= 7) {
    bgPath = 'overview/bg-name-poi-l.png'
  }
  if (config.name.length >= 10) {
    bgPath = 'overview/bg-name-poi-xl.png'
  }
  const base64 = await imageUrlToBase64(getAssetsImages(bgPath))

  return {
    id: config.featureId,
    layerID: `overview-gate-name-${config.featureId}`,
    type: 'screen',
    // scaleByOpacity: [500, 0.3, 5000, 1],
    renderScale: 1,
    // disableDepthTest: true,
    location: config.namePOILocation,
    isVisable: true,
    anchor: [0.5, 1.0],
    icon: {
      // url: getAssetsImages(bgPath)
      base64: (base64 as string).split(',')[1]
    },
    label: {
      text: config.name,
      fontsize: 16,
      fontFamily: 'youSheBiaoTiHei',
      hAlign: 'center',
      padding: config.padding || [0, 0, 0, 30]
    }
    // onClickedCallBack: '_onPOIClickCallback'
  }
}
