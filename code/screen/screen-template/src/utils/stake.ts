export const formatStake = (mileage: number) => {
  if (mileage === 0) {
    return mileage
  }
  const value = Math.abs(mileage)
  return `${Math.floor(value / 1000)}${mileage > 0 ? '+' : '-'}${Math.round(
    value % 1000
  )}`
}

export const decodeStake = (stakeStr: string) => {
  if (stakeStr.indexOf('+') >= 0) {
    const stake = stakeStr.match(/\d+\+\d+/g)
    const miles = stake[0].split('+')
    return Number(miles[0]) * 1000 + Number(miles[1])
  }
  if (stakeStr.indexOf('-') >= 0) {
    const miles = stakeStr.split('-')
    return Number(miles[0]) * 1000 - Number(miles[1])
  }
  return Number(stakeStr)
}
