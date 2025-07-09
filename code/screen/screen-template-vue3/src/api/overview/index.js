import { defHttp } from '@/utils/http/axios'

export function getWaterQualityStationList(params) {
  return defHttp.get(
    {
      url: '/information.service/wqwater/wqWaterMonitor/list',
      params
    },
    { errorMessageMode: 'none' }
  )
}
export function getWaterQualityDataList(params) {
  return defHttp.get(
    {
      url: '/information.service/wqwater/wqWaterData/list',
      params
    },
    { errorMessageMode: 'none' }
  )
}
export function getAppMonitorringList(params) {
  return defHttp.get(
    {
      url: '/information.service/floodrainfall/gate/gateDataRecord/appMonitorringList',
      params
    },
    { errorMessageMode: 'none' }
  )
}
export function getAppMonitorringTestDetail(params) {
  return defHttp.get(
    {
      url: '/information.service/floodrainfall/gate/gateDataRecord/appMonitorringTestDetail',
      params
    },
    { errorMessageMode: 'none' }
  )
}
export function getCameraListByName(params) {
  return defHttp.get(
    {
      url: '/jeecg-water-management/water.management/threeDimensional/listAttWmstBaseVO',
      params
    },
    { errorMessageMode: 'none' }
  )
}
