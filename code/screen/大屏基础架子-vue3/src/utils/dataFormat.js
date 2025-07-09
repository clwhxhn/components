// 开度数据转成每个小时一条的表格数据
export function controlDataToTableData(controlDataList, startTime, endTime) {
  // 排序
  controlDataList.sort((o1, o2) => o1.hour - o2.hour)

  // 找到为0的那个，作为全集
  let initControlItemList = controlDataList[0].controlItemList
  let swmmObjArr = initControlItemList.map(item => {
    return {
      swmmid: item[0],
      totalHeight: parseFloat(item[2]) / parseFloat(item[1])
    }
  })

  controlDataList.sort((o1, o2) => o2.hour - o1.hour)

  let tableArr = []
  // 第一个小时取整
  for (
    let time = new Date(startTime);
    time.getTime() <= endTime.getTime();
    time.setHours(time.getHours() + 1)
  ) {
    // 分秒都设置0
    time.setMinutes(0)
    time.setSeconds(0)
    time.setMilliseconds(0)
    let thisTime = new Date(time)

    let data = {
      time: thisTime
    }
    for (const swmmObj of swmmObjArr) {
      let swmmid = swmmObj.swmmid
      for (const controlData of controlDataList) {
        let controlTime = new Date(startTime)
        controlTime.setHours(startTime.getHours() + controlData.hour - 24)
        let controlItem = controlData.controlItemList.filter(
          item => item[0] == swmmid
        )[0]
        if (controlTime.getTime() <= thisTime.getTime() && controlItem) {
          data[swmmid] = parseFloat(Number(controlItem[2]).toFixed(3))
          break
        }
      }
    }
    tableArr.push(data)
  }
  return {
    tableData: tableArr,
    swmmObjArr
  }
}

// 表格数据转模型保存需要的开度数据
export function tableDataToControlData(tableData, swmmObjArr, startTime) {
  startTime = new Date(startTime)
  startTime.setMinutes(0)
  startTime.setSeconds(0)
  startTime.setMilliseconds(0)
  let totalHeightMap = {}
  for (const swmmObj of swmmObjArr) {
    totalHeightMap[swmmObj.swmmid] = swmmObj.totalHeight
  }

  let controlDataList = []
  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i]
    let controlData = {}
    if (i == 0) {
      controlData.hour = 0.0
    } else {
      controlData.hour =
        (row.time.getTime() - startTime.getTime()) / 1000 / 60 / 60 + 24
    }
    let controlItemList = []
    for (const swmmObj of swmmObjArr) {
      let controlItem = [
        swmmObj.swmmid,
        Number(row[swmmObj.swmmid]) / swmmObj.totalHeight,
        Number(row[swmmObj.swmmid])
      ]
      controlItemList.push(controlItem)
    }
    controlData.controlItemList = controlItemList
    controlDataList.push(controlData)
  }
  return controlDataList
}
