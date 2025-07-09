let internalDictMap = null;

export function setAllDict(dictMap) {
  internalDictMap = dictMap;
  localStorage.setItem("dict", JSON.stringify(dictMap));
}

export function getDictOptions(dictCode) {
  if (!internalDictMap) {
    const json = localStorage.getItem("dict");
    try {
      internalDictMap = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }
  }
  return internalDictMap[dictCode] || [];
}

export function getDictText(dictCode, value) {
  const dict = getDictOptions(dictCode);
  const option = dict.find((it) => it.value === value);
  if (option) return option.label;
  return value;
}
