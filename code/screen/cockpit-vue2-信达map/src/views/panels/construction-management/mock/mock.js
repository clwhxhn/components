import { CQ_REGION_ID } from "@/utils/map-helper";
import investData from "./invest.json";
import aiAlarmData from "./aiAlarm.json";
import qualityDetails from "./qualityDetails.json";
import safetyDetails from "./safetyDetails.json";
import evaluativeDimensionQuality from "./evaluativeDimensionQuality.json";
import evaluativeDimensionSafety from "./evaluativeDimensionSafety.json";
import totalInvestment from "./totalInvestment.json";
import fixedInvestment from "./fixedInvestment.json";
import waterSupplyDetails from "./waterSupplyDetails.json";
import evaluativeDimensionWaterSupply from "./evaluativeDimensionWaterSupply.json";
import waterUtilizeDetails from "./waterUtilizeDetails.json";
import evaluativeDimensionWaterUtilize from "./evaluativeDimensionWaterUtilize.json";

const projectList = require("./projectList.json");

const projectMap = {};
projectList.list.forEach((it, i) => {
  it.id = i + 1;
  projectMap[it.id] = it;
});

const rate = require("./rate.json");
const rateMap = {};
rate.forEach((it) => {
  const ad = it.addvcd;
  rateMap[ad] = it;
});

export function getProjectStatisticByRegion() {
  const list = projectList.list;
  const regionMap = {};
  list.forEach((it) => {
    // 重庆市本级的不上图
    if (it.regionId === CQ_REGION_ID) return;
    if (it.regionId in regionMap) {
      regionMap[it.regionId].bizCount++;
    } else {
      regionMap[it.regionId] = {
        addvcd: it.addvcd,
        bizCount: 1,
        regionId: it.regionId,
        regionName: it.addvcd_dictText,
      };
    }
  });
  return Promise.resolve(Object.values(regionMap));
}

export function getProjectList(query = {}) {
  const { regionId, searchKey } = query;
  const list = projectList.list;
  const res = [];
  list.forEach((it) => {
    if (regionId && it.regionId !== regionId) return;
    if (searchKey && !it.name.includes(searchKey)) return;
    const item = {
      id: it.id,
      isDanger: "0",
      latitude: it.latitude,
      longitude: it.longitude,
      regionId: it.regionId,
      regionName: it.addvcd_dictText,
      rsName: it.name,
      rsScale: it.projectScale,
    };
    res.push(item);
  });
  return Promise.resolve(res);
}

export function getProjectById(id) {
  return Promise.resolve(projectMap[id] || null);
}

export function getRateMap() {
  return Promise.resolve(rateMap);
}

export function getInvestList() {
  return Promise.resolve(investData.list);
}

export function getAiAlarmDataList() {
  return Promise.resolve(aiAlarmData);
}

export function getQualityDetails() {
  return Promise.resolve(qualityDetails);
}

export function getSafetyDetails() {
  return Promise.resolve(safetyDetails);
}

export function getEvaluativeDimension(type) {
  if (type === "safety") {
    return Promise.resolve(evaluativeDimensionSafety);
  }
  return Promise.resolve(evaluativeDimensionQuality);
}

export function getTotalInvestment() {
  totalInvestment.sort((a, b) => b.fund - a.fund);
  return Promise.resolve(totalInvestment);
}

export function getFixedInvestment() {
  fixedInvestment.sort((a, b) => b.currentInvestment - a.currentInvestment);
  return Promise.resolve(fixedInvestment);
}

export function getWaterSupplyDetails() {
  return Promise.resolve(waterSupplyDetails);
}

export function getEvaluativeDimensionWaterSupply() {
  return Promise.resolve(evaluativeDimensionWaterSupply);
}

export function getWaterUtilizeDetails() {
  waterUtilizeDetails.sort((a, b) => a.val - b.val);
  return Promise.resolve(waterUtilizeDetails);
}

export function getEvaluativeDimensionWaterUtilize() {
  return Promise.resolve(evaluativeDimensionWaterUtilize);
}
