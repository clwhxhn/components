export const compareShallow = (obj1, obj2) => {
  if (!obj1 || !obj2) return false;
  // 获取两个对象的键数组
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 比较键的数量
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 遍历所有键进行比较
  for (const key of keys1) {
    // 检查 obj2 是否有当前键
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    // 特殊处理 NaN（因为 NaN === NaN 返回 false）
    if (Number.isNaN(val1) && Number.isNaN(val2)) {
      continue; // 两个值都是 NaN 时视为相等
    }

    // 严格比较其他值
    if (val1 !== val2) {
      return false;
    }
  }

  return true;
};
