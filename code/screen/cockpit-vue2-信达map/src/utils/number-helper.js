import Vue from "vue";

/**
 *
 * @param {*} num 需要格式化的数字
 * @param {*} decimal 保留小数位数 默认为2
 * @param {*} separator 千分位分隔符 默认为,
 * @param {*} placeholder 空数据时的占位符 默认为空字符串
 * @returns
 */
export function formatNumber(
  num,
  decimal = 2,
  separator = ",",
  placeholder = "-"
) {
  if (typeof num === "string") {
    num = num.replace(/,/g, "");
  }
  // 处理小数位数为非负整数
  decimal = Math.max(0, Math.floor(decimal));

  // 有效性校验
  let resolvedNum = num;
  if (typeof num !== "number") {
    if (num === null || num === undefined || num === "") return placeholder;
    resolvedNum = Number(num);
    if (isNaN(resolvedNum)) return placeholder;
  } else if (isNaN(resolvedNum)) {
    return placeholder;
  }

  // 处理小数部分
  const fixedNum = resolvedNum.toFixed(decimal);
  const parts = fixedNum.split(".");

  // 处理整数部分千分位
  let integerPart = parts[0];
  let sign = "";
  if (integerPart.startsWith("-")) {
    sign = "-";
    integerPart = integerPart.substring(1);
  }
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // 组合最终结果
  const decimalPart = decimal > 0 ? `.${parts[1] || ""}` : "";
  return `${sign}${integerPart}${decimalPart}`;
}

Vue.prototype.$fn = formatNumber;
Vue.filter("formatNumber", formatNumber);
