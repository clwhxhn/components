
import * as echarts  from 'echarts'
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

/**
* 雨量过程
* @returns
*/
export function getRainfallOpt() {
    const option = {
        legend: {
            show: true,
            itemWidth: 14,
            itemHeight: 7,
            data: ['实测', '预测', '累计'],
            top: 20,
            textStyle: {
                color: '#EAF1FF',
                fontWeight: 400,
            },
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderWidth: 0,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },
        grid: {
            left: '15%',
            right: '15%',
            top: '25%',
            bottom: '10%',
        },
        xAxis: {
            type: 'category',
            data: ['2023-11-18', '2023-11-19', '2023-11-20', '2023-11-21', '2023-11-22', '2023-11-23', '2023-11-24'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(186,231,255,0.4)',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(234,241,255,0.74)',
                },
                formatter: function (value) {
                    return (
                        ' ' + `${value}`.substring(5, 7) + '-' + `${value}`.substring(8, 10) + '\n' + `${value}`.substring(10, 16)
                    );
                },
            },
        },
        yAxis: [
            {
                name: '雨量：mm',
                nameTextStyle: {
                    color: 'rgba(234,241,255,0.74)',
                },
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(230,247,255,0.2)',
                    },
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(234,241,255,0.74)',
                    },
                },
            },
            {
                name: '累计：mm',
                nameTextStyle: {
                    color: 'rgba(234,241,255,0.74)',
                },
                type: 'value',
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(230,247,255,0.2)',
                    },
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(234,241,255,0.74)',
                    },
                },
            },
        ],
        series: [
            {
                name: '实测',
                type: 'bar',
                barWidth: 15,
                data: [
                    ['2023-11-18', '0.2'],
                    ['2023-11-19', '0.5'],
                    ['2023-11-20', '0.2'],
                    ['2023-11-21', '0.1'],
                ],
                tooltip: {
                    valueFormatter: (value) => value + ' mm',
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#399CFF',
                                opacity: 1,
                            },
                            {
                                offset: 1,
                                color: '#4A68FB',
                                opacity: 1,
                            },
                        ]),
                    },
                },
            },
            {
                name: '预测',
                type: 'bar',
                barGap: '-100%',
                barWidth: 15,
                data: [
                    ['2023-11-21', '0.4'],
                    ['2023-11-22', '0.7'],
                    ['2023-11-23', '0.9'],
                    ['2023-11-24', '0.8'],
                ],
                tooltip: {
                    valueFormatter: (value) => value + ' mm',
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#5FD4FE',
                                opacity: 1,
                            },
                            {
                                offset: 1,
                                color: '#20C8AC',
                                opacity: 1,
                            },
                        ]),
                    },
                },
            },
            {
                name: '累计',
                type: 'line',
                yAxisIndex: 1,
                data: ['0.2', '0.3', '0.5', '0.6', '0.8', '0.81', '0.9', '0.9'],
                tooltip: {
                    valueFormatter: (value) => value + ' mm',
                },
                itemStyle: {
                    normal: {
                        color: '#FFB83A',
                    },
                },
            },
        ],
    };
    return option;
}
/**
 * 饼图
 * @param {*} text
 * @param {*} subtext
 * @param {*} sData
 * @param {*} color
 * @returns
 */
export function getPieOpt(text, subtext, sData = [], color) {
    const option = {
      color: color || ['#C7172F', '#DA8F28', '#098FC9'],
      title: {
        text: subtext,
        subtext: text,
        left: '28%',
        top: '35%',
        itemGap: 1,
        textStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 500,
        },
        subtextStyle: {
          color: '#fff',
          fontSize: 14,
          lineHeight: 30,
        },
        x: 'center',
        y: 'center',
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderWidth: 0,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        valueFormatter: (value) => `${value}个`,
      },
      legend: {
        left: '60%',
        x: 'left',
        y: 'center',
        itemGap: 20,
        icon: 'rect',
        itemHeight: 10,
        itemWidth: 10,
        orient: 'vertical',
        textStyle: {
          color: '#fff',
          padding: [0, 10, 30, 0],
          fontSize: 12,
        },
        formatter: (name) => {
          const [serie] = option.series;
          const item = serie.data.find((lst) => lst.name === name);
          return `${name}  ${item.value} 个`;
        },
      },
      series: [
        {
          name: text,
          type: 'pie',
          radius: ['50%', '80%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          data: sData,
        },
      ],
    };
    return option;
  }