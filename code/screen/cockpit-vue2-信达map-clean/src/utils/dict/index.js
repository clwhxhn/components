import { getAction } from "@/utils";
let dictMap = {};
function getOptionsByCode(dictCode) {
  return dictMap[dictCode] || [];
}

function getDictText(dictCode, val) {
  const item = (dictMap[dictCode] || []).find((i) => i.dictValue === `${val}`);
  return item ? item.dictLabel : "-";
}

function setDict(dict) {
  const _dictMap = {};
  dict.forEach((element) => {
    if (!_dictMap[element.dictCode]) {
      _dictMap[element.dictCode] = [];
    }
    _dictMap[element.dictCode].push(element);
  });
  dictMap = _dictMap;
}

function getDictData() {
  return getAction(`/system/dict/data/list`, {
    pageSize: 9999,
    pageNum: 1,
  })
    .then((res) => res.result || {})
    .then((res) => res.records || [])
    .then((res) => {
      setDict(res);
      return res;
    });
}
export { getDictData, getOptionsByCode, getDictText };
