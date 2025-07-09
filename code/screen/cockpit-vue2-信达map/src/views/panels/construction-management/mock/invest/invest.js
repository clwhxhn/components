import zysljs from "./zysljs.json";
import gz from "./gz.json";
import dfzj from "./dfzj.json";

export const getZysljsData = () => {
  return Promise.resolve(zysljs.resultList);
};

export const getGzData = () => {
  return Promise.resolve(gz.resultList);
};

export const getDfzjData = (key) => {
  const list = dfzj.resultList.map((it) => {
    return {
      regionName: it.regionName,
      value: it[key],
      percent: it[key + "Rate"],
    };
  });
  list.sort((a, b) => b.value - a.value);
  return Promise.resolve(list);
};
