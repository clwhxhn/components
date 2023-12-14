
import * as echarts from 'echarts'
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

export function getVillageRainOpt(xAxis, data) {
    return {
        grid: {
            bottom: 35,
            left: 30,
            right: 15,
            top: 25,
        },
        tooltip: {
            backgroundColor: 'rgba(29,53,101,0.7)',
            textStyle: {
                color: '#fff',
            },
            formatter: function (params) {
                var value = params.value;
                return params.seriesName + ': ' + value + ' 个'; // 在值后面添加单位
            },
            padding: [5, 10],
            extraCssText:
                'border: 1px solid;border-image: linear-gradient(180deg, rgba(61, 162, 255, 1), rgba(52, 120, 152, 1)) 1 1;',
        },
        backgroundColor: 'transparent', // 设置echarts背景为透明
        legend: {
            show: false,
            // data: ['实际检测的量'], // 图例数据
            // bottom: 0, // 图例位置在底部
            // textStyle: {
            //   color: '#fff', // 图例文字颜色为白色
            // },
        },
        xAxis: {
            type: 'category',
            data: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
            axisLabel: {
                color: '#fff', // 设置x轴标签文字颜色为白色
                fontSize: '12px',
                interval: 0,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 1)', // 设置x轴边框颜色为白色
                },
            },
            axisTick: {
                show: false, // 隐藏x轴刻度线
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: 'rgba(221, 248, 255, 1)', // 设置y轴标签文字颜色为白色
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(62, 188, 238, 0.8)', // 设置y轴边框颜色为白色
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(62, 188, 238, 0.5)', // 设置y轴分割线颜色为半透明白色
                    width: 0.8,
                },
            },
        },
        series: [
            {
                name: '',
                type: 'bar',
                data: [11, 8, 10, 7, 5, 19],
                barWidth: '25%', // 设置柱子宽度
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 255, 212, 1)' }, // 设置柱子颜色渐变的起始颜色
                        { offset: 1, color: 'rgba(0, 255, 212, 0.50)' }, // 设置柱子颜色渐变的结束颜色
                    ]),
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255, 255, 255, 1)' }, // 设置边框颜色渐变的起始颜色
                        { offset: 1, color: 'rgba(0, 128, 255, 0)' }, // 设置边框颜色渐变的结束颜色
                    ]),
                    borderWidth: 2, // 设置边框宽度
                },
            },
        ],
    }

}

export function lineChart() {
    return {
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            top: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            // boundaryGap: false,
            // axisLine: {
            //   show: false,
            // },
            // axisTick: {
            //   show: false,
            // },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                },
            },
            data: [1, 2],
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            interval: 1,
            min: 9,
            max: 15,
        },
        graphic: [
            {
                type: 'image',
                left: 'center',
                top: 'bottom',
                style: {
                    width: 388,
                    height: 200,
                    image: require('@/assets/img/water-disasters-defense/sw-bg.svg'),
                },
                z: 3,
            },
        ],
        series: [
            {
                name: '水位(m)',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    opacity: 0,
                },
                areaStyle: {
                    // color: '#77B5E9',
                    color: 'transparent',
                },
                data: [11.5, 11.5],
                z: 2,
            },
            {
                name: '校核洪水位',
                type: 'line',
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        width: 1,
                        color: '#6D000E',
                    },
                    data: [
                        {
                            yAxis: 14.5,
                            label: {
                                show: true,
                                color: '#fff',
                                position: 'insideStartTop',
                                formatter: function () {
                                    return '校核洪水位';
                                },
                            },
                        },
                    ],
                },
            },
            {
                name: '设计洪水位',
                type: 'line',
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        width: 1,
                        color: '#D8001B',
                    },
                    data: [
                        {
                            yAxis: 14.2,
                            label: {
                                show: true,
                                color: '#fff',
                                position: 'insideMiddle',
                                formatter: function () {
                                    return '设计洪水位';
                                },
                            },
                        },
                    ],
                },
            },
            {
                name: '防洪限制水位',
                type: 'line',
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        width: 1,
                        color: '#FFCF4E',
                    },
                    data: [
                        {
                            yAxis: 13.5,
                            label: {
                                show: true,
                                color: '#fff',
                                position: 'insideMiddleBottom',
                                formatter: function () {
                                    return '防洪限制水位';
                                },
                            },
                        },
                    ],
                },
            },
            {
                name: '死水位',
                type: 'line',
                markLine: {
                    symbol: ['none', 'none'],
                    lineStyle: {
                        width: 1,
                        color: '#FFCF4E',
                    },
                    data: [
                        {
                            name: '死水位',
                            yAxis: 10.5,
                            label: {
                                show: true,
                                color: '#fff',
                                position: 'insideMiddleTop',
                                formatter: function () {
                                    return '死水位';
                                },
                            },
                        },
                    ],
                },
            },
        ],
    };
}

export function getXiangxing() {
    const barWidth = 96;
    // 当前雨量 
    const targetVal = 80 // 当前降雨量
    // 准备转移
    const prepare = 120
    // 立即转移
    const immediately = 140

    const maxHeight = 200// 柱子最大高度（基准）

    return {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
        },
        grid: {
            bottom: '10%',
            top: '29%',
            left: '-4%',
        },
        xAxis: {
            data: [],
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            show: false,
            max: maxHeight,
            //   name: '降雨量',
            //   axisLine: {
            //     show: true,
            //     lineStyle: {
            //       color: '#80D4FF',
            //     },
            //   },
            position: 'right', // 将 Y 轴移到右侧
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: '#7A8A99',
            },
            axisTick: {
                show: false,
            },
        },
        graphic: [
            {
                type: 'image',
                left: '11%',
                top: 'bottom',
                style: {
                    width: 164,
                    height: 200,
                    image: require('@/assets/img/water-disasters-defense/img-yuanzhu-bg2.png'),
                },
                z: 3,
            },
        ],
        series: [
            {
                //圆柱底部的立体圆,  修改后位置
                name: '圆柱底部的立体圆',
                type: 'pictorialBar',
                symbolSize: [barWidth, 40], //图形的大小，[宽，高]
                symbolOffset: [0, 0], //图形相对于原本位置的偏移，[0, '-50%'] 就是把图形向上移动了自身尺寸的一半的位置
                z: 12,
                tooltip: {
                    show: false,
                },
                data: [
                    {
                        name: '',
                        value: 10,
                        itemStyle: {
                            normal: {
                                color: 'rgba(86,177,213, 1)',
                            },
                        },
                    },
                ],
            },
            {
                name: '实际降雨量-面',
                type: 'pictorialBar',
                symbolSize: [barWidth, 40],
                symbolOffset: [0, '-80%'],
                z: 100,
                tooltip: {
                    formatter: '当前降雨量为 ' + targetVal + 'mm',
                },
                data: [
                    {
                        name: '',
                        value: targetVal,
                        symbolPosition: 'end',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        //修改前
                                        offset: 0,
                                        color: 'rgba(0, 166, 255, 0.26)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 255, 213, 0.50)',
                                    },
                                ]),
                            },
                        },
                    },
                ],
                markLine: {
                    symbol: 'none',
                    tooltip: {
                        formatter: '准备转移： ' + prepare + 'mm',
                    },
                    label: {
                        position: 'end',
                        distance: [-2, 0],
                        formatter: '{b}',
                        color: 'yellow',
                    },
                    data: [
                        {
                            name: prepare,
                            yAxis: prepare,
                            lineStyle: {
                                color: 'yellow',
                                width: 1,
                                type: 'solid',
                            },
                        },
                    ],
                },
            },
            // 内部整个柱子
            {
                name: '内部整个柱子',
                type: 'bar',
                barWidth: barWidth,
                tooltip: {
                    show: false,
                },
                z: 10,
                stack: 'a',
                itemStyle: {
                    // 单独设置下面两个角的圆角
                    barBorderRadius: [0, 0, 25, 25],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: 'rgba(0,255,100,0.5)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(0,255,100,0.5)',
                        },
                    ]),
                },
                data: [
                    {
                        name: '',
                        value: maxHeight,
                        itemStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 1,
                                    x2: 0,
                                    y2: 0,
                                    type: 'linear',
                                    global: false,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: 'rgba(0, 132, 101, 0.10)',
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(128, 255, 249, 0.60)',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
                markLine: {
                    symbol: 'none',
                    tooltip: {
                        formatter: '立即转移： ' + immediately + 'mm',
                    },
                    label: {
                        position: 'end',
                        distance: [-2, 0],
                        formatter: '{b}',
                        color: '#F42626',
                    },
                    data: [
                        {
                            name: immediately,
                            yAxis: immediately,
                            lineStyle: {
                                color: '#F42626',
                                width: 1,
                                type: 'solid',
                            },
                        },
                    ],
                },
            },
        ],
    }
}

export function getRainfallOptIcon(xAxis, data, markPoint) {
    const option = {
      legend: {
        show: true,
        itemWidth: 14,
        itemHeight: 7,
        data: ['监测', '预报', '累计'],
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
        left: '10%',
        right: '10%',
        top: '35%',
        bottom: '10%',
      },
      xAxis: {
        type: 'category',
        data: xAxis,
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
          name: '监测',
          type: 'bar',
          barWidth: 15,
          // data: [
          //   ['2023-11-18', '0.2'],
          //   ['2023-11-19', '0.5'],
          //   ['2023-11-20', '0.2'],
          //   ['2023-11-21', '0.1'],
          // ],
          data: data['监测'],
          tooltip: {
            valueFormatter: (value) => value + ' mm',
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(11, 191, 255, 1)',
                  opacity: 1,
                },
                {
                  offset: 1,
                  color: 'rgba(60, 213, 255, 0)',
                  opacity: 1,
                },
              ]),
              borderColor: '#1D9BC7', // 设置柱状图边框颜色
              borderWidth: 1, // 设置柱状图边框宽度
            },
          },
          label: {
            show: true,
            position: 'top', // 在柱子的顶部显示标签
            offset: [0, -10], // 调整标签的位置，[x, y]，这里向上偏移10个像素
            color: '#DDF8FF', // 文字颜色
            fontSize: 12, // 字体大小
            formatter: (v) => {
              return v.value[1] || 0;
            }, // 显示数据值
          },
          markPoint: {
            data: markPoint['监测'],
            symbolSize: [20, 20],
            label: {
              show: false,
            },
          }
        },
        {
          name: '预报',
          type: 'bar',
          barGap: '-100%',
          barWidth: 15,
          // data: [
          //   ['2023-11-21', '0.4'],
          //   ['2023-11-22', '0.7'],
          //   ['2023-11-23', '0.9'],
          //   ['2023-11-24', '0.8'],
          // ],
          data: data['预报'],
          tooltip: {
            valueFormatter: (value) => value + ' mm',
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 204, 1)',
                  opacity: 1,
                },
                {
                  offset: 1,
                  color: 'rgba(60, 255, 179, 0)',
                  opacity: 1,
                },
              ]),
              borderColor: '#1DC7A5', // 设置柱状图边框颜色
              borderWidth: 1, // 设置柱状图边框宽度
            },
          },
          label: {
            show: true,
            position: 'top', // 在柱子的顶部显示标签
            color: '#DDF8FF', // 文字颜色
            fontSize: 12, // 字体大小
            offset: [0, -10], // 调整标签的位置，[x, y]，这里向上偏移10个像素
            formatter: (v) => {
              console.log('v: ', v);
              return v.value[1] || 0;
            }, // 显示数据值
          },
          markPoint: {
            data: markPoint['预报'],
            symbolSize: [20, 20],
            label: {
              show: true,
            },
          }
        },
        {
          name: '累计',
          type: 'line',
          yAxisIndex: 1,
          data: data['累计'],
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
  