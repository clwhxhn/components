import moment from 'moment';
import * as echarts from 'echarts'

const colorList = ['#31EABE', '#E67D2A', '#60B0FF', '#F0726D', '#def2ff', '#FAD337', '#F2637B', '#975FE4'];
const axisLabelColor = '#DDF8FF';
const axisLineColor = 'rgba(62, 188, 238, 0.2)';
const splitLineColor = 'rgba(62, 188, 238, 0.2)';

// 告警事件统计渐变颜色
const warnEventsColors = [
    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(255, 162, 0, 1)' },
        { offset: 1, color: 'rgba(208, 151, 50, 0.28)' },
    ]),
    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(0, 85, 255, 1)' },
        { offset: 1, color: 'rgba(0, 85, 255, 0.28)' },
    ]),
    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: 'rgba(0, 255, 212, 1)' },
        { offset: 1, color: 'rgba(0, 255, 212, 0.28)' },
    ]),
];


/**
 * 告警事件统计
 * @param {*} list 条形图数据
 * @returns
 */
export function getWarnEventOption() {
    let list = [];
    for (let i = 0; i < 10; i++) {
        let tm = moment().subtract(i, 'month').format('YYYY-MM');
        list.push({
            tm: tm,
            v1: Math.floor(Math.random() * 35),
            v2: Math.floor(Math.random() * 30),
            v3: Math.floor(Math.random() * 25),
        });
    }

    const unit = '个';
    let yData = [];
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    list.forEach((item) => {
        yData.push(item.tm);
        arr1.push(item.v1);
        arr2.push(item.v2);
        arr3.push(item.v3);
    });
    const option = {
        grid: {
            left: 60,
            right: 60,
            bottom: 35,
            top: 25,
        },
        legend: {
            show: false,
            bottom: '10',
            left: 'center',
            icon: 'circle',
            // type: 'scroll',
            textStyle: {
                fontSize: 14,
                color: '#666666',
            },
        },
        color: warnEventsColors,
        tooltip: {
            trigger: 'axis',
            confine: true,
            textStyle: {
                align: 'left',
            },
            //   formatter: '{b0}: {c0}',
            formatter: (params) => {
                let str = `${params[0].name}<br/>`;
                params.forEach((item) => {
                    let isNum = typeof item.value === 'number';
                    let valueText = isNum ? `${item.value} ${unit}` : ``;
                    str += `${item.marker} ${item.seriesName}：${valueText}<br/>`;
                });
                return str;
            },
        },
        xAxis: {
            name: '数量(个)',
            type: 'value',
            minInterval: 1,
            nameTextStyle: {
                color: axisLabelColor,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: axisLineColor,
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: splitLineColor,
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: axisLabelColor,
                },
                fontSize: 11,
                interval: 'auto',
                formatter: '{value}',
            },
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            name: '',
            axisLine: {
                show: true,
                lineStyle: {
                    color: axisLineColor,
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: axisLabelColor,
                },
                fontSize: 11,
            },
            data: yData,
        },
        series: [
            {
                name: 'AI监测告警',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false,
                },
                emphasis: {
                    focus: 'series',
                },
                data: arr1,
            },
            {
                name: '监测设备离线告警',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false,
                },
                emphasis: {
                    focus: 'series',
                },
                data: arr2,
            },
            {
                name: '生态数据未达标告警',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false,
                },
                emphasis: {
                    focus: 'series',
                },
                data: arr3,
            },
        ],
    };
    return option;
}