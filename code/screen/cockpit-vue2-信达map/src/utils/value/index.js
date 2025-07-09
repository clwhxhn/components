/**
 * 系统标识
 */
const sysyemTag = "cq-cockpit";

/**
 * 解析json
 */
const parseJSON = (value, fallback = {}) => {
  if (typeof value !== "string") {
    return value;
  }
  let result;
  try {
    result = JSON.parse(value);
  } catch (err) {
    result = value;
    console.warn(err);
  }
  return result || fallback;
};

/**
 * 获取持久化数据
 */
function getItem(key) {
  return parseJSON(window.localStorage.getItem(`${sysyemTag}_${key}`));
}

/**
 * 保存持久化数据
 */
function setItem(key, value) {
  return window.localStorage.setItem(
    `${sysyemTag}_${key}`,
    JSON.stringify(value)
  );
}

/**
 * 获取url上的参数
 */
function getUrlParams(url) {
  let arr = url.split("?");
  let params = arr.length > 1 ? arr[1].split("&") : [];
  let obj = {};
  for (let i = 0; i < params.length; i++) {
    let param = params[i].split("=");
    obj[param[0]] = param[1];
  }
  return obj;
}

export { parseJSON, getItem, setItem, getUrlParams };
