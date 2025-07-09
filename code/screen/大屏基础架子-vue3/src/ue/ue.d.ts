declare const swdt: { fire(string, object): void }
declare const ue: {
  interface: {
    _onPOIClickCallback(string)
    _onPOIHoverCallback(string)
    _onPOIUnhoverCallback(string)
  }
}

declare global {
  interface Window {
    ue
  }
}

export interface geojsonPOI {
  type: string
  properties: {
    ID: string
    Name: string
    Type: string
    VisualRange?: number
  }
  geometry: {
    type: string
    coordinates: number[]
  }
}

export interface sceneCaptureOptions {
  sceneCaptureIndex: number
  location: {
    x: number
    y: number
    z: number
  }
  rotation: { roll: number; pitch: number; yaw: number }
  renderSize: { x: number; y: number }
  anchor: { x: number; y: number }
  screenPosition: { x: number; y: number }
}

export interface viewOptions {
  coordinate: { x: number; y: number; z: number }
  rotation: { roll: number; pitch: number; yaw: number }
  duration?: number
  distance?: number
  pitch?: number
  yaw?: number
}

export interface POIOptions {
  id: string
  layerID: string
  type: string
  coords?: number[]
  location?: number[]
  rotation?: number[]
  faceType?: number
  isVisable: boolean
  anchor?: number[]
  renderScale?: number
  icon: {
    url?: string
    base64?: string
  }
  label?: {
    text: string
    fontsize: number
    padding: number[] | string
    hAlign: string
  }
  onClickedCallBack?: string
}
