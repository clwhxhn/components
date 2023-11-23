export const toFixed = (num, decimal) => {
  // Math.pow(10, decimal)
  const multiple = 10 ** decimal;
  return Math.round(num * multiple) / multiple;
};
