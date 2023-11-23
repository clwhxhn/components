export const rainChart = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontSize: 12,
      },
      formatter: '单站累计降雨量top5<br>{b} : {c}mm',
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '5%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(234,241,255,0.74)',
          formatter: '{value}',
        },
        data: ['大兴', '白羊', '五溪', '长岭', '大滩口'],
      },
    ],
    series: [
      {
        name: '流量',
        type: 'bar',
        barWidth: 15,
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            formatter: function (params) {
              return params.data.value + ' mm';
            },
            color: '#fff',
          },
        },
        data: [
          {
            value: 22,
            itemStyle: {
              color: '#9D9529',
            },
          },
          {
            value: 27,
            itemStyle: {
              color: '#945D79',
            },
          },
          {
            value: 32,
            itemStyle: {
              color: '#0885BC',
            },
          },
          {
            value: 36,
            itemStyle: {
              color: '#0AA4AB',
            },
          },
          {
            value: 40,
            itemStyle: {
              color: '#5B9619',
            },
          },
        ],
      },
    ],
  }