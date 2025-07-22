import * as echarts from "echarts";
import echartsSplit from "@/utils/echartsSplit";
export const rainChart = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderWidth: 0,
    textStyle: {
      color: "#fff",
      fontSize: 12,
    },
    formatter: "单站累计降雨量top5<br>{b} : {c}mm",
  },
  grid: {
    left: "10%",
    right: "10%",
    top: "5%",
    bottom: "5%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "value",
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
      type: "category",
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
        color: "rgba(234,241,255,0.74)",
        formatter: "{value}",
      },
      data: ["大兴", "白羊", "五溪", "长岭", "大滩口"],
    },
  ],
  series: [
    {
      name: "流量",
      type: "bar",
      barWidth: 15,
      label: {
        normal: {
          show: true,
          position: "insideRight",
          formatter: function (params) {
            return params.data.value + " mm";
          },
          color: "#fff",
        },
      },
      data: [
        {
          value: 22,
          itemStyle: {
            color: "#9D9529",
          },
        },
        {
          value: 27,
          itemStyle: {
            color: "#945D79",
          },
        },
        {
          value: 32,
          itemStyle: {
            color: "#0885BC",
          },
        },
        {
          value: 36,
          itemStyle: {
            color: "#0AA4AB",
          },
        },
        {
          value: 40,
          itemStyle: {
            color: "#5B9619",
          },
        },
      ],
    },
  ],
};

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
      data: ["实测", "预测", "累计"],
      top: 20,
      textStyle: {
        color: "#EAF1FF",
        fontWeight: 400,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    grid: {
      left: "15%",
      right: "15%",
      top: "25%",
      bottom: "14%",
    },
    xAxis: {
      type: "category",
      data: [
        "2023-11-18 09:00",
        "2023-11-19",
        "2023-11-20",
        "2023-11-21",
        "2023-11-22",
        "2023-11-23",
        "2023-11-24",
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(186,231,255,0.4)",
          width: 1,
          type: "solid",
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        formatter: function (value) {
          return (
            " " +
            `${value}`.substring(5, 7) +
            "-" +
            `${value}`.substring(8, 10) +
            "\n" +
            `${value}`.substring(10, 16)
          );
        },
      },
    },
    yAxis: [
      {
        name: "雨量：mm",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(230,247,255,0.2)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(234,241,255,0.74)",
          },
        },
      },
      {
        name: "累计：mm",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        type: "value",
        splitLine: {
          show: false,
          lineStyle: {
            type: "solid",
            color: "rgba(230,247,255,0.2)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(234,241,255,0.74)",
          },
        },
      },
    ],
    series: [
      {
        name: "实测",
        type: "bar",
        barWidth: 15,
        data: [
          ["2023-11-18", "0.2"],
          ["2023-11-19", "0.5"],
          ["2023-11-20", "0.2"],
          ["2023-11-21", "0.1"],
        ],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#399CFF",
                opacity: 1,
              },
              {
                offset: 1,
                color: "#4A68FB",
                opacity: 1,
              },
            ]),
          },
        },
      },
      {
        name: "预测",
        type: "bar",
        barGap: "-100%",
        barWidth: 15,
        data: [
          ["2023-11-21", "0.4"],
          ["2023-11-22", "0.7"],
          ["2023-11-23", "0.9"],
          ["2023-11-24", "0.8"],
        ],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#5FD4FE",
                opacity: 1,
              },
              {
                offset: 1,
                color: "#20C8AC",
                opacity: 1,
              },
            ]),
          },
        },
      },
      {
        name: "累计",
        type: "line",
        yAxisIndex: 1,
        data: ["0.2", "0.3", "0.5", "0.6", "0.8", "0.81", "0.9", "0.9"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: "#FFB83A",
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
    color: color || ["#C7172F", "#DA8F28", "#098FC9"],
    title: {
      text: subtext,
      subtext: text,
      left: "28%",
      top: "35%",
      itemGap: 1,
      textStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 500,
      },
      subtextStyle: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 30,
      },
      x: "center",
      y: "center",
      textAlign: "center",
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      valueFormatter: (value) => `${value}个`,
    },
    legend: {
      left: "60%",
      x: "left",
      y: "center",
      itemGap: 20,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      orient: "vertical",
      textStyle: {
        color: "#fff",
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
        type: "pie",
        radius: ["50%", "80%"],
        center: ["30%", "50%"],
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
      backgroundColor: "rgba(29,53,101,0.7)",
      textStyle: {
        color: "#fff",
      },
      formatter: function (params) {
        var value = params.value;
        return params.seriesName + ": " + value + " 个"; // 在值后面添加单位
      },
      padding: [5, 10],
      extraCssText:
        "border: 1px solid;border-image: linear-gradient(180deg, rgba(61, 162, 255, 1), rgba(52, 120, 152, 1)) 1 1;",
    },
    backgroundColor: "transparent", // 设置echarts背景为透明
    legend: {
      show: false,
      // data: ['实际检测的量'], // 图例数据
      // bottom: 0, // 图例位置在底部
      // textStyle: {
      //   color: '#fff', // 图例文字颜色为白色
      // },
    },
    xAxis: {
      type: "category",
      data: ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
      axisLabel: {
        color: "#fff", // 设置x轴标签文字颜色为白色
        fontSize: "12px",
        interval: 0,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(255, 255, 255, 1)", // 设置x轴边框颜色为白色
        },
      },
      axisTick: {
        show: false, // 隐藏x轴刻度线
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "rgba(221, 248, 255, 1)", // 设置y轴标签文字颜色为白色
      },
      axisLine: {
        lineStyle: {
          color: "rgba(62, 188, 238, 0.8)", // 设置y轴边框颜色为白色
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(62, 188, 238, 0.5)", // 设置y轴分割线颜色为半透明白色
          width: 0.8,
        },
      },
    },
    series: [
      {
        name: "",
        type: "bar",
        data: [11, 8, 10, 7, 5, 19],
        barWidth: "25%", // 设置柱子宽度
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0, 255, 212, 1)" }, // 设置柱子颜色渐变的起始颜色
            { offset: 1, color: "rgba(0, 255, 212, 0.50)" }, // 设置柱子颜色渐变的结束颜色
          ]),
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 255, 255, 1)" }, // 设置边框颜色渐变的起始颜色
            { offset: 1, color: "rgba(0, 128, 255, 0)" }, // 设置边框颜色渐变的结束颜色
          ]),
          borderWidth: 2, // 设置边框宽度
        },
      },
    ],
  };
}

export function lineChart() {
  return {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "10%",
      right: "10%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
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
          color: "#fff",
        },
      },
      data: [1, 2],
    },
    yAxis: {
      type: "value",
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
        type: "image",
        left: "center",
        top: "bottom",
        style: {
          width: 388,
          height: 200,
          image: require("@/assets/img/water-disasters-defense/sw-bg.svg"),
        },
        z: 3,
      },
    ],
    series: [
      {
        name: "水位(m)",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0,
        },
        areaStyle: {
          // color: '#77B5E9',
          color: "transparent",
        },
        data: [11.5, 11.5],
        z: 2,
      },
      {
        name: "校核洪水位",
        type: "line",
        markLine: {
          symbol: ["none", "none"],
          lineStyle: {
            width: 1,
            color: "#6D000E",
          },
          data: [
            {
              yAxis: 14.5,
              label: {
                show: true,
                color: "#fff",
                position: "insideStartTop",
                formatter: function () {
                  return "校核洪水位";
                },
              },
            },
          ],
        },
      },
      {
        name: "设计洪水位",
        type: "line",
        markLine: {
          symbol: ["none", "none"],
          lineStyle: {
            width: 1,
            color: "#D8001B",
          },
          data: [
            {
              yAxis: 14.2,
              label: {
                show: true,
                color: "#fff",
                position: "insideMiddle",
                formatter: function () {
                  return "设计洪水位";
                },
              },
            },
          ],
        },
      },
      {
        name: "防洪限制水位",
        type: "line",
        markLine: {
          symbol: ["none", "none"],
          lineStyle: {
            width: 1,
            color: "#FFCF4E",
          },
          data: [
            {
              yAxis: 13.5,
              label: {
                show: true,
                color: "#fff",
                position: "insideMiddleBottom",
                formatter: function () {
                  return "防洪限制水位";
                },
              },
            },
          ],
        },
      },
      {
        name: "死水位",
        type: "line",
        markLine: {
          symbol: ["none", "none"],
          lineStyle: {
            width: 1,
            color: "#FFCF4E",
          },
          data: [
            {
              name: "死水位",
              yAxis: 10.5,
              label: {
                show: true,
                color: "#fff",
                position: "insideMiddleTop",
                formatter: function () {
                  return "死水位";
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
  const targetVal = 80; // 当前降雨量
  // 准备转移
  const prepare = 120;
  // 立即转移
  const immediately = 140;

  const maxHeight = 200; // 柱子最大高度（基准）

  return {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
    },
    grid: {
      bottom: "10%",
      top: "29%",
      left: "-4%",
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
      position: "right", // 将 Y 轴移到右侧
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "#7A8A99",
      },
      axisTick: {
        show: false,
      },
    },
    graphic: [
      {
        type: "image",
        left: "11%",
        top: "bottom",
        style: {
          width: 164,
          height: 200,
          image: require("@/assets/img/water-disasters-defense/img-yuanzhu-bg2.png"),
        },
        z: 3,
      },
    ],
    series: [
      {
        //圆柱底部的立体圆,  修改后位置
        name: "圆柱底部的立体圆",
        type: "pictorialBar",
        symbolSize: [barWidth, 40], //图形的大小，[宽，高]
        symbolOffset: [0, 0], //图形相对于原本位置的偏移，[0, '-50%'] 就是把图形向上移动了自身尺寸的一半的位置
        z: 12,
        tooltip: {
          show: false,
        },
        data: [
          {
            name: "",
            value: 10,
            itemStyle: {
              normal: {
                color: "rgba(86,177,213, 1)",
              },
            },
          },
        ],
      },
      {
        name: "实际降雨量-面",
        type: "pictorialBar",
        symbolSize: [barWidth, 40],
        symbolOffset: [0, "-80%"],
        z: 100,
        tooltip: {
          formatter: "当前降雨量为 " + targetVal + "mm",
        },
        data: [
          {
            name: "",
            value: targetVal,
            symbolPosition: "end",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    //修改前
                    offset: 0,
                    color: "rgba(0, 166, 255, 0.26)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 213, 0.50)",
                  },
                ]),
              },
            },
          },
        ],
        markLine: {
          symbol: "none",
          tooltip: {
            formatter: "准备转移： " + prepare + "mm",
          },
          label: {
            position: "end",
            distance: [-2, 0],
            formatter: "{b}",
            color: "yellow",
          },
          data: [
            {
              name: prepare,
              yAxis: prepare,
              lineStyle: {
                color: "yellow",
                width: 1,
                type: "solid",
              },
            },
          ],
        },
      },
      // 内部整个柱子
      {
        name: "内部整个柱子",
        type: "bar",
        barWidth: barWidth,
        tooltip: {
          show: false,
        },
        z: 10,
        stack: "a",
        itemStyle: {
          // 单独设置下面两个角的圆角
          barBorderRadius: [0, 0, 25, 25],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: "rgba(0,255,100,0.5)",
            },
            {
              offset: 1,
              color: "rgba(0,255,100,0.5)",
            },
          ]),
        },
        data: [
          {
            name: "",
            value: maxHeight,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 132, 101, 0.10)",
                    },
                    {
                      offset: 1,
                      color: "rgba(128, 255, 249, 0.60)",
                    },
                  ],
                },
              },
            },
          },
        ],
        markLine: {
          symbol: "none",
          tooltip: {
            formatter: "立即转移： " + immediately + "mm",
          },
          label: {
            position: "end",
            distance: [-2, 0],
            formatter: "{b}",
            color: "#F42626",
          },
          data: [
            {
              name: immediately,
              yAxis: immediately,
              lineStyle: {
                color: "#F42626",
                width: 1,
                type: "solid",
              },
            },
          ],
        },
      },
    ],
  };
}

export function getRainfallOptIcon(xAxis, data, markPoint) {
  const option = {
    legend: {
      show: true,
      itemWidth: 14,
      itemHeight: 7,
      data: ["监测", "预报", "累计"],
      top: 20,
      textStyle: {
        color: "#EAF1FF",
        fontWeight: 400,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "35%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      data: xAxis,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(186,231,255,0.4)",
          width: 1,
          type: "solid",
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        formatter: function (value) {
          return (
            " " +
            `${value}`.substring(5, 7) +
            "-" +
            `${value}`.substring(8, 10) +
            "\n" +
            `${value}`.substring(10, 16)
          );
        },
      },
    },
    yAxis: [
      {
        name: "雨量：mm",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(230,247,255,0.2)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(234,241,255,0.74)",
          },
        },
      },
      {
        name: "累计：mm",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        type: "value",
        splitLine: {
          show: false,
          lineStyle: {
            type: "solid",
            color: "rgba(230,247,255,0.2)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(234,241,255,0.74)",
          },
        },
      },
    ],
    series: [
      {
        name: "监测",
        type: "bar",
        barWidth: 15,
        // data: [
        //   ['2023-11-18', '0.2'],
        //   ['2023-11-19', '0.5'],
        //   ['2023-11-20', '0.2'],
        //   ['2023-11-21', '0.1'],
        // ],
        data: data["监测"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(11, 191, 255, 1)",
                opacity: 1,
              },
              {
                offset: 1,
                color: "rgba(60, 213, 255, 0)",
                opacity: 1,
              },
            ]),
            borderColor: "#1D9BC7", // 设置柱状图边框颜色
            borderWidth: 1, // 设置柱状图边框宽度
          },
        },
        label: {
          show: true,
          position: "top", // 在柱子的顶部显示标签
          offset: [0, -10], // 调整标签的位置，[x, y]，这里向上偏移10个像素
          color: "#DDF8FF", // 文字颜色
          fontSize: 12, // 字体大小
          formatter: (v) => {
            return v.value[1] || 0;
          }, // 显示数据值
        },
        markPoint: {
          data: markPoint["监测"],
          symbolSize: [20, 20],
          label: {
            show: false,
          },
        },
      },
      {
        name: "预报",
        type: "bar",
        barGap: "-100%",
        barWidth: 15,
        // data: [
        //   ['2023-11-21', '0.4'],
        //   ['2023-11-22', '0.7'],
        //   ['2023-11-23', '0.9'],
        //   ['2023-11-24', '0.8'],
        // ],
        data: data["预报"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 255, 204, 1)",
                opacity: 1,
              },
              {
                offset: 1,
                color: "rgba(60, 255, 179, 0)",
                opacity: 1,
              },
            ]),
            borderColor: "#1DC7A5", // 设置柱状图边框颜色
            borderWidth: 1, // 设置柱状图边框宽度
          },
        },
        label: {
          show: true,
          position: "top", // 在柱子的顶部显示标签
          color: "#DDF8FF", // 文字颜色
          fontSize: 12, // 字体大小
          offset: [0, -10], // 调整标签的位置，[x, y]，这里向上偏移10个像素
          formatter: (v) => {
            console.log("v: ", v);
            return v.value[1] || 0;
          }, // 显示数据值
        },
        markPoint: {
          data: markPoint["预报"],
          symbolSize: [20, 20],
          label: {
            show: true,
          },
        },
      },
      {
        name: "累计",
        type: "line",
        yAxisIndex: 1,
        data: data["累计"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: "#FFB83A",
          },
        },
      },
    ],
  };
  return option;
}

export function getWaterRainOpt(xAxis, data) {
  // yAxis0
  const data1 =
    Math.max(...data["入库流量"]) > Math.max(...data["出库流量"])
      ? data["入库流量"]
      : data["出库流量"];
  const y0Item = echartsSplit(data1, 4, true);
  // yAxis1
  let data2 =
    Math.max(...data["坝上水位"]) > Math.max(...data["设计水位"])
      ? data["坝上水位"]
      : data["设计水位"];
  data2 =
    Math.max([...data2]) > Math.max(...data["汛限水位"])
      ? data2
      : data["汛限水位"];
  const y1Item = echartsSplit(data2, 4, true);
  const option = {
    color: ["#08E6ED", "#23FF38", "#FF9C23", "#F4C635", "#FF3B3B"],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    legend: {
      show: true,
      data: ["坝上水位", "设计水位", "汛限水位", "入库流量", "出库流量"],
      bottom: "0px",
      itemWidth: 6, // 设置图标宽度
      itemHeight: 3, // 设置图标高度
      textStyle: {
        color: "#EAF1FF",
        fontWeight: 400,
        fontSize: 12, // 设置字体大小
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      top: "25%",
      bottom: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(186,231,255,0.4)",
            width: 1,
            type: "solid",
          },
        },
        axisLabel: {
          color: "rgba(234,241,255,0.74)",
          formatter: function (value) {
            return `${value}`.substring(10, 16);
          },
        },
        data: xAxis,
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "流量(m³/s)",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
          align: "center",
        },
        axisLabel: {
          color: "rgba(234,241,255,0.74)",
          formatter: "{value}",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "solid",
            color: "rgba(230,247,255,0.2)",
          },
        },
        ...y0Item,
      },
      {
        type: "value",
        name: "水位(m)",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
          align: "center",
        },
        axisLabel: {
          color: "rgba(234,241,255,0.74)",
          formatter: "{value}",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(230,247,255,0.2)",
          },
        },
        ...y1Item,
      },
    ],
    series: [
      {
        name: "坝上水位",
        type: "line",
        symbol: "none",
        smooth: false,
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value) => value + " m",
        },
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          normal: {
            color: {
              x: 0,
              y: 0,
              y2: 1,
              globalCoord: false,
              x2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(10,107,215,1)",
                },
                {
                  offset: 1,
                  color: "rgba(65,76,217,0)",
                },
              ],
              type: "linear",
            },
          },
        },
        data: data["坝上水位"],
      },
      {
        name: "设计水位",
        type: "line",
        tooltip: {
          valueFormatter: (value) => value + " m",
        },
        lineStyle: {
          width: 1,
          type: "dotted", // 设置线条的样式为虚线
        },
        symbol: "none",
        smooth: false,
        // markLine: {
        //   symbol: ['none', 'none'],
        //   label: {
        //     normal: {
        //       show: false,
        //     },
        //   },
        //   lineStyle: {
        //     width: 1,
        //     color: '#f59a23',
        //   },
        //   data: [
        //     {
        //       yAxis: 200,
        //       isVisible: true,
        //     },
        //   ],
        // },
        yAxisIndex: 1,
        data: data["设计水位"],
      },
      {
        name: "汛限水位",
        type: "line",
        tooltip: {
          valueFormatter: (value) => value + " m",
        },
        symbol: "none",
        smooth: false,
        yAxisIndex: 1,
        lineStyle: {
          width: 1,
          type: "dotted", // 设置线条的样式为虚线
        },
        // markLine: {
        //   symbol: ['none', 'none'],
        //   label: {
        //     normal: {
        //       show: false,
        //     },
        //   },
        //   lineStyle: {
        //     width: 1,
        //     // color: '#ff0000',
        //   },
        //   data: [
        //     {
        //       yAxis: 220,
        //       isVisible: true,
        //     },
        //   ],
        // },
        data: data["汛限水位"],
      },
      {
        name: "入库流量",
        type: "line",
        symbol: "none",
        smooth: false,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: (value) => value + " m³/s",
        },
        lineStyle: {
          width: 1,
        },
        data: data["入库流量"],
      },
      {
        name: "出库流量",
        type: "line",
        symbol: "none",
        smooth: false,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: (value) => value + " m³/s",
        },
        lineStyle: {
          width: 1,
        },
        data: data["出库流量"],
      },
    ],
  };

  return option;
}

//
const mark = require("@/assets/img/water-disasters-defense/mark.png");
const markTongzhi = require("@/assets/img/water-disasters-defense/mark-tongzhi.png");
const markZhunbei = require("@/assets/img/water-disasters-defense/mark-zhunbei.png");
const markLiji = require("@/assets/img/water-disasters-defense/mark-liji.png");
export function getVMOption(record) {
  const blueData = (record.informTransferLevel - record.staffStart).toFixed(2);
  // 橙色色块
  const orangeData =
    record.immediatelyTransferLevel - record.prepareTransferLevel;

  // 黄色色块
  const yellowData = record.prepareTransferLevel - record.informTransferLevel;

  // 红色色块
  const normalLength = record.length ? record.length : 5;
  const redData = Number(normalLength) - orangeData - yellowData - blueData;

  // 实时水位线
  let currentLevel = 0;
  if (record.z) {
    currentLevel = record.z - record.staffStart;
  }
  // 水尺色块
  const shuichi = record.length - currentLevel;

  const option = {
    grid: {
      left: "0",
      right: 15,
      bottom: 0,
      top: -10,
      containLabel: true,
    },
    legend: {
      show: false,
    },
    tooltip: {
      trigger: "axis",
      // position: ['50%', '50%'],
      confine: true,
      textStyle: {
        align: "left",
      },
      formatter: (params) => {
        let str = `监测水位<br/>`;
        params.forEach((item) => {
          if (item.seriesName !== "水尺总长(m)") {
            let isNum = typeof item.value === "number";
            let valueText = isNum ? `${item.value}` : ``;
            if (item.seriesName === "监测水位(m)") {
              valueText = record.z || "-";
            }
            if (item.seriesName === "距通知转移水位(m)") {
              valueText = record.z
                ? (record.z - record.informTransferLevel).toFixed(2)
                : "-";
            }
            if (item.seriesName === "距准备转移水位(m)") {
              valueText = record.z
                ? (record.z - record.prepareTransferLevel).toFixed(2)
                : "-";
            }
            if (item.seriesName === "距立即转移水位(m)") {
              valueText = record.z
                ? (record.z - record.immediatelyTransferLevel).toFixed(2)
                : "-";
            }
            str += `${item.marker} ${item.seriesName}：${valueText}<br/>`;
          }
        });
        return str;
      },
    },
    xAxis: {
      name: "",
      type: "value",
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      name: "",
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    graphic: [
      {
        type: "image",
        left: "0",
        bottom: "20",
        style: {
          width: 370,
          height: 20,
          image: require("@/assets/img/water-disasters-defense/bar-bg.png"),
        },
        z: 3,
      },
    ],
    series: [
      // 背景
      {
        name: "水尺总长(m)",
        type: "bar",
        barWidth: 8,
        barGap: "-100%",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "rgba(255,254,254,0.2)",
        },
        z: 1,
        data: [6],
        markPoint: {
          // symbol: `image://${mark}`,
          // symbolSize: [5, 30], //设置标记点的大小
          data: [
            {
              symbol: `image://${mark}`,
              symbolSize: [5, 30], //设置标记点的大小
              coord: [currentLevel, 0],
              symbolOffset: [0, 5],
            },
            {
              symbol: `image://${markTongzhi}`,
              symbolSize: [20, 31], // 通知转移
              coord: [record.informTransferLevel - record.staffStart, 0],
              symbolOffset: [0, 5],
            },
            {
              symbol: `image://${markZhunbei}`,
              symbolSize: [20, 31], // 准备转移
              coord: [record.prepareTransferLevel - record.staffStart, 0],
              symbolOffset: [0, 5],
            },
            {
              symbol: `image://${markLiji}`,
              symbolSize: [20, 31], // 立即转移
              coord: [record.immediatelyTransferLevel - record.staffStart, 0],
              symbolOffset: [0, 5],
            },
          ],
        },
      },
      {
        name: "监测水位(m)",
        type: "bar",
        barWidth: 8,
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        // itemStyle:{
        //   color: '#1677FF' // 蓝色色块
        // },
        itemStyle: {
          normal: {
            color: {
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0, 255, 255, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0, 255, 255, 0.2)", // 100% 处的颜色
                },
              ],
            },
          },
        },
        data: [currentLevel],
        z: 2,
      },
      // {
      //   name: '距通知转移水位(m)',
      //   type: 'bar',
      //   barWidth: 20,
      //   stack: 'total',
      //   label: {
      //     show: false,
      //   },
      //   emphasis: {
      //     focus: 'series',
      //   },
      //   data: [yellowData],
      //   itemStyle: {
      //     color: '#e7e211', // 黄色色块
      //   },
      //   z: 2,
      // },
      // {
      //   name: '距准备转移水位(m)',
      //   type: 'bar',
      //   barWidth: 20,
      //   stack: 'total',
      //   label: {
      //     show: false,
      //   },
      //   emphasis: {
      //     focus: 'series',
      //   },
      //   itemStyle: {
      //     color: '#faad14', // 橙色色块
      //   },
      //   data: [orangeData],
      //   z: 2,
      // },
      // {
      //   name: '距立即转移水位(m)',
      //   type: 'bar',
      //   barWidth: 20,
      //   stack: 'total',
      //   label: {
      //     show: false,
      //   },
      //   emphasis: {
      //     focus: 'series',
      //   },
      //   itemStyle: {
      //     color: '#FF2828', // 红色色块
      //   },
      //   data: [redData],
      //   z: 2,
      // },
    ],
  };
  return option;
}

/**
 * 考核概况 蜘蛛图
 * @param {*} dataList
 * @returns
 */
export function getKhgkOption(dataList) {
  const unit = "%";
  let indicatorArr = [];
  let dataArr = [];
  dataList.forEach((item) => {
    indicatorArr.push({
      name: item.name,
      max: 100,
    });
    dataArr.push(item.value);
  });
  let option = {
    legend: {
      show: false,
    },
    color: ["#FFE354", "#FFE434", "#56A3F1", "#FF917C"],
    tooltip: {
      trigger: "item",
      confine: true,
      textStyle: {
        align: "left",
      },
      formatter: (params) => {
        let str = ``;
        params.value.forEach((val, i) => {
          let isNum = typeof val === "number";
          let valueText = isNum ? `${val} ${unit}` : ``;
          str += `${indicatorArr[i].name} ：${valueText}<br/>`;
        });
        return str;
      },
    },
    radar: {
      radius: "60%",
      axisName: {
        fontSize: 11,
        color: "DDF8FF",
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(62, 188, 238, 0.2)",
        },
      },
      axisLabel: {
        show: false,
      },
      // shape: 'circle',
      indicator: indicatorArr,
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: dataArr,
            areaStyle: {
              color: "#FF8800",
            },
          },
        ],
      },
    ],
  };
  return option;
}

export const barDiejia = {
  grid: {
    left: 25,
    right: 10,
    bottom: 10,
    top: 30,
    containLabel: true,
  },
  legend: {
    show: false,
    top: 0,
    right: 10,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      fontSize: 14,
      color: "#DDF8FF",
    },
  },
  color: ["#31EABE"],
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderWidth: 0,
    textStyle: {
      color: "#fff",
      fontSize: 12,
    },
    valueFormatter: (value) => `${value}mm`,
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    name: "",
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(62, 188, 238, 0.2)",
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#DDF8FF",
      },
      fontSize: 12,
    },
    axisTick: {
      //   alignWithLabel: true,
      inside: true, // 小竖线显示在刻度线内部
      lineStyle: {
        color: "#3EBCEE", // 小竖线的颜色
      },
    },
    data: [1, 2, 3, 4, 5],
  },
  yAxis: {
    name: "雨量(mm)",
    type: "value",
    nameTextStyle: {
      color: "#AFCCFF",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(62, 188, 238, 0.2)",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: "rgba(62, 188, 238, 0.2)",
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#AFCCFF",
      },
      fontSize: 11,
      interval: "auto",
      formatter: "{value}",
    },
  },
  series: [
    {
      name: "",
      type: "bar",
      data: [2, 4, 6, 8, 10],
      stack: "1",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(11, 191, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(60, 213, 255, 0)",
            },
          ],
          global: false,
        },
        borderColor: "#1D9BC7",
        borderWidth: 1,
      },
      barWidth: 15,
    },
    {
      name: "",
      type: "bar",
      stack: "1",
      data: [2, 4, 6, 8, 10],
      label: {
        show: true, // 显示标签
        position: "top", // 文字显示在柱子的顶部
        distance: 10, // 文字距离柱子顶部的距离
        color: "#fff", // 文字颜色
        fontSize: 12, // 文字大小
        formatter: "{c}mm", // 文字格式，{c} 表示当前值
      },
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 255, 204, 1)",
            },
            {
              offset: 1,
              color: "rgba(0, 255, 204, 0)",
            },
          ],
          global: false,
        },
        borderColor: "#1DC7A5",
        borderWidth: 1,
      },
      barWidth: 15,
    },
  ],
};

const wending = require("@/assets/img/wendingdabiao.png");
const jiben = require("@/assets/img/jibendabiao.png");
import { echartFontSize } from "@/utils/flexible";
export const lineChart2 = {
  color: ["#DEE5FF", "#4ECAFF", "#E67D2A", "#DABB96", "#FFEA80"],
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderWidth: 0,
    textStyle: {
      color: "#fff",
      fontSize: echartFontSize(12),
    },
  },
  legend: {
    show: true,
    data: ["浩江湖", "廖叶湖", "上琼湖", "下琼湖", "石矶湖"],
    bottom: echartFontSize(6),
    itemWidth: echartFontSize(16), // 设置图标宽度
    itemHeight: echartFontSize(2), // 设置图标高度
    textStyle: {
      color: "#A0C2F2",
      fontWeight: 400,
      fontSize: echartFontSize(12), // 设置字体大小
    },
  },
  grid: {
    left: "3%",
    right: "3%",
    top: "18%",
    bottom: "15%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(186,231,255,0.4)",
          width: echartFontSize(1),
          type: "solid",
        },
      },
      axisLabel: {
        color: "#FFFFFF",
        fontSize: echartFontSize(12), // 设置字体大小
      },
      data: ["01", "02", "03", "04"],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "达标率(%)",
      nameTextStyle: {
        color: "rgba(234,241,255,0.74)",
        align: "center",
      },
      axisLabel: {
        color: "rgba(234,241,255,0.74)",
        formatter: "{value}",
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        //   show: false,
        lineStyle: {
          type: "solid",
          color: "rgba(118, 172, 253, 0.3)",
        },
      },
    },
  ],
  series: [
    {
      name: "浩江湖",
      type: "line",
      symbol: "none",
      tooltip: {
        valueFormatter: (value) => value + " m",
      },
      lineStyle: {
        width: echartFontSize(2),
        color: "#DEE5FF", // 设置线条颜色
      },
      data: [10, 10, 10, 10],
      markLine: {
        symbol: ["none", "none"],
        symbol: ["none", "image://" + wending], // 设置图片路径
        symbolSize: [echartFontSize(56), echartFontSize(20)], // 设置图片大小
        symbolRotate: 0, // 将图片旋转回正确的方向
        symbolOffset: [-echartFontSize(20), -echartFontSize(10)], // 设置图片相对于markLine的偏移量
        label: {
          normal: {
            show: false,
          },
        },
        lineStyle: {
          width: echartFontSize(2),
          color: "#7CE0C3",
        },
        data: [
          {
            yAxis: 35,
            isVisible: true,
          },
        ],
      },
    },
    {
      name: "上琼湖",
      type: "line",
      tooltip: {
        valueFormatter: (value) => value + " m",
      },
      lineStyle: {
        width: echartFontSize(2),
        color: "#4ECAFF", // 设置线条颜色
      },
      symbol: "none",
      data: [50, 50, 50, 50],
      markLine: {
        symbol: ["none", "none"],
        symbol: ["none", "image://" + jiben], // 设置图片路径
        symbolOffset: [-echartFontSize(20), -echartFontSize(10)], // 设置图片相对于markLine的偏移量
        symbolPosition: "start", // 设置图片定位方式为起点位置
        symbolRotate: 0, // 将图片旋转回正确的方向
        symbolSize: [echartFontSize(56), echartFontSize(20)], // 设置图片大小
        label: {
          normal: {
            show: false,
          },
        },
        lineStyle: {
          width: echartFontSize(2),
          color: "#A3A3FF",
        },
        data: [
          {
            yAxis: 15,
            isVisible: true,
          },
        ],
      },
    },
    {
      name: "下琼湖",
      type: "line",
      tooltip: {
        valueFormatter: (value) => value + " m",
      },
      lineStyle: {
        width: echartFontSize(2),
        color: "#E67D2A",
      },
      symbol: "none",
      data: [40, 40, 40, 40],
    },
    {
      name: "石矶湖",
      type: "line",
      tooltip: {
        valueFormatter: (value) => value + " m",
      },
      lineStyle: {
        width: echartFontSize(2),
      },
      symbol: "none",
      // smooth: false,
      data: [30, 30, 30, 30],
      emphasis: false, // 移除鼠标悬停时的高亮效果
    },
  ],
};

export function bar3D() {
  const lakes = [
    {
      name: "浩江湖",
    },
    {
      name: "廖叶湖",
    },
    {
      name: "上琼湖",
    },
    {
      name: "下琼湖",
    },
    {
      name: "石矶湖",
    },
  ];
  const seriesData = [
    // 上年同期
    {
      z: 2,
      name: "上年同期",
      type: "pictorialBar",
      symbolPosition: "end",
      data: [41, 42, 52, 50, 61],
      symbol: "diamond",
      symbolOffset: ["-75%", "-60%"], //盖子的位置
      symbolSize: [echartFontSize(15), echartFontSize(7)], //盖子的大小
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: "rgba(74, 151, 226, 1)" },
            { offset: 1, color: "rgba(72, 255, 255, 1)" },
          ],
        }, //盖子的颜色
      },
      tooltip: {
        show: false,
      },
    },

    {
      z: 1,
      type: "bar",
      name: "上年同期",
      barWidth: echartFontSize(15),
      barGap: "50%",
      data: [41, 42, 52, 50, 61],
      label: {
        show: true, // 显示标签
        position: "top", // 文字显示在柱子的顶部
        distance: echartFontSize(6), // 文字距离柱子顶部的距离
        color: "#fff", // 文字颜色
        fontSize: echartFontSize(12), // 文字大小
        formatter: "{c}%", // 文字格式，{c} 表示当前值
      },
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: "rgba(80, 165, 249, 1)" },
            { offset: 0.5, color: "rgba(72, 255, 255, 1)" },
            { offset: 0.5, color: "RGBA(72, 168, 226, 1)" },
            { offset: 1, color: "RGBA(62, 200, 218, 1)" },
          ],
        },
      },
    },
    // 当期
    {
      z: 2,
      name: "当期",
      type: "pictorialBar",
      symbolPosition: "end",
      data: [31, 32, 42, 42, 51],
      symbol: "diamond",
      symbolOffset: ["75%", "-60%"],
      symbolSize: [echartFontSize(15), echartFontSize(7)], //盖子的大小
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: "rgba(170, 225, 132, 1)" },
            { offset: 1, color: "rgba(25, 185, 127, 1)" },
          ],
        },
      },
      tooltip: {
        show: false,
      },
    },
    {
      z: 1,
      type: "bar",
      name: "当期",
      barWidth: echartFontSize(15),
      data: [31, 32, 42, 42, 51],
      label: {
        show: true, // 显示标签
        position: "top", // 文字显示在柱子的顶部
        distance: echartFontSize(6), // 文字距离柱子顶部的距离
        color: "#fff", // 文字颜色
        fontSize: echartFontSize(12), // 文字大小
        formatter: "{c}%", // 文字格式，{c} 表示当前值
      },
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: "rgba(25, 185, 127, 1)" },
            { offset: 0.5, color: "RGBA(98, 205, 130, 1)" },
            { offset: 0.5, color: "RGBA(70, 169, 119, 1)" },
            { offset: 1, color: "RGBA(120, 183, 120, 1)" },
          ],
        },
      },
    },
  ];
  const option = {
    color: ["#DEE5FF", "#4ECAFF", "#E67D2A", "#DABB96", "#FFEA80"],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: echartFontSize(12),
      },
    },
    legend: {
      show: true,
      data: [
        { name: "上年同期", icon: "image://" + wending },
        {
          name: "当期",
          icon: "image://" + wending,
        },
      ],
      bottom: echartFontSize(0),
      itemWidth: echartFontSize(9), // 设置图标宽度
      itemHeight: echartFontSize(10), // 设置图标高度
      textStyle: {
        color: "#A0C2F2",
        fontWeight: 400,
        fontSize: echartFontSize(12), // 设置字体大小
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      top: "25%",
      bottom: "12%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(186,231,255,0.4)",
            width: echartFontSize(1),
            type: "solid",
          },
        },
        axisLabel: {
          color: "#FFFFFF",
          fontSize: echartFontSize(12), // 设置字体大小
        },
        data: lakes.map((i) => i.name),
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "达标率(%)",
        max: 100,
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
          align: "center",
        },
        axisLabel: {
          color: "rgba(234,241,255,0.74)",
          formatter: "{value}",
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          //   show: false,
          lineStyle: {
            type: "solid",
            color: "rgba(118, 172, 253, 0.3)",
          },
        },
      },
    ],
    series: seriesData,
  };

  return option;
}

export function barInterse() {
  const option = {
    legend: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "8%",
      right: "10%",
      top: "25%",
      bottom: "20%",
    },
    xAxis: {
      type: "category",
      data: [
        "2023-11-18",
        "2023-11-19",
        "2023-11-20",
        "2023-11-21",
        "2023-11-22",
        "2023-11-23",
        "2023-11-24",
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: "#E8EEFA",
          width: 1,
          type: "solid",
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#3D454D",
        },
      },
    },
    yAxis: {
      name: "实时监测雨量(mm)",
      align: "center", // 设置 y 轴名称文本左对齐
      nameLocation: "start", // 将 Y 轴的名称放置在上方
      inverse: true,
      nameTextStyle: {
        color: "#7A8A99",
        padding: [0, 0, 0, 60], // 如果需要调整名称和轴线之间的距离
      },
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "#E8EEFA",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#7A8A99",
          fontSize: 12,
        },
      },
    },
    series: [
      {
        name: "监测降雨",
        type: "bar",
        data: [
          ["2023-11-18", 1],
          ["2023-11-19", 1],
          ["2023-11-20", 1],
          ["2023-11-21", 4],
        ],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            barBorderRadius: [0, 0, 4, 4],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4CBCFC",
              },
              {
                offset: 1,
                color: "#418BFA",
              },
            ]),
          },
        },
      },
      {
        name: "预报降雨",
        type: "bar",
        data: [
          ["2023-11-22", 1],
          ["2023-11-23", 1],
          ["2023-11-24", 1],
          ["2023-11-25", 1],
        ],

        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            barBorderRadius: [0, 0, 4, 4],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#93C2BC",
              },
              {
                offset: 1,
                color: "#00B4B9",
              },
            ]),
          },
        },
      },
    ],
  };
  return option;
}

export const lineChartOpt = {
  color: [
    "#A81B1B",
    "#FF9900",
    "#EDC70A",
    "#0346FF",
    "#0346FF",
    "#55C10A",
    "#55C10A",
  ],
  legend: {
    show: true,
    itemWidth: 18,
    textStyle: {
      color: "#333333",
      fontWeight: 400,
    },
    itemStyle: {
      opacity: 0,
    },
  },
  tooltip: {
    trigger: "axis",
    confine: true,
    backgroundColor: "rgba(233,243,255)",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    extraCssText: "box-shadow: 0px 3px 6px -4px rgba(0,0,0,0.12);",
  },
  grid: {
    show: true,
    left: "5%",
    right: "5%",
    top: "25%",
    bottom: "10%",
    borderWidth: 1,
    borderColor: "#C0CAD5",
  },
  xAxis: [
    {
      type: "category",
      data: [
        "06-11 08",
        "06-11 20",
        "06-12 08",
        "06-12 20",
        "06-13 08",
        "06-13 20",
        "06-14 08",
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: "#C0CAD5",
          width: 1,
          type: "solid",
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(204, 221, 255, 0.28)",
        },
      },
    },
    {
      type: "category",
      data: [
        "06-11 08",
        "06-11 20",
        "06-12 08",
        "06-12 20",
        "06-13 08",
        "06-13 20",
        "06-14 08",
      ],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisPointer: {
        type: "line",
        shadowStyle: {
          color: "#B9D0FF",
        },
      },
    },
  ],
  yAxis: [
    {
      name: "水位m",
      type: "value",
      nameTextStyle: {
        color: "rgba(44, 53, 66, 0.80)",
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#556677",
        },
      },
      splitLine: {
        show: false,
      },
    },
    {
      name: "流量m³/s",
      type: "value",
      nameTextStyle: {
        color: "rgba(44, 53, 66, 0.80)",
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#556677",
        },
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      smooth: true,
      name: "历史最高水位",
      type: "line",
      data: [1, 1, 1, 1, 1, 1, 1],
      symbol: "circle",
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 1,
        type: "dashed",
        color: "#A81B1B",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#A81B1B",
        borderWidth: 2,
      },
    },
    {
      smooth: true,
      name: "保证水位",
      type: "line",
      data: ["", "", "", "", "", "", ""],
      symbol: "circle",
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 1,
        type: "dashed",
        color: "#FF9900",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#FF9900",
        borderWidth: 2,
      },
    },
    {
      smooth: true,
      name: "警戒水位",
      type: "line",
      data: ["", "", "", "", "", "", ""],
      symbol: "circle",
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 1,
        type: "dashed",
        color: "#EDC70A",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#EDC70A",
        borderWidth: 2,
      },
    },
    {
      smooth: true,
      name: "预报水位",
      type: "line",
      yAxisIndex: 0,
      data: [4.32, null, null, null, null, null, null],
      symbol: "circle",
      symbolSize: 6,
      showSymbol: false,
      lineStyle: {
        width: 2,
        type: "dashed",
        color: "#0346FF",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#0346FF",
        borderWidth: 2,
      },
    },
    {
      smooth: true,
      name: "实测水位",
      type: "line",
      yAxisIndex: 0,
      data: [4.32, null, null, null, null, null, null],
      symbol: "circle",
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: "#0346FF",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#0346FF",
        borderWidth: 2,
      },
    },
    {
      smooth: true,
      name: "预报流量",
      type: "line",
      yAxisIndex: 1,
      data: [11.1, 5.28, 6.62, 5.14, 2.79, 1.65, 1.03],
      symbol: "circle",
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 2,
        type: "dashed",
        color: "#55C10A",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#55C10A",
        borderWidth: 2,
      },
    },
    {
      smooth: true,
      name: "实测流量",
      type: "line",
      yAxisIndex: 1,
      data: [11.1, null, null, null, null, null, null],
      symbol: "circle",
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 1,
        color: "#55C10A",
      },
      itemStyle: {
        color: "#fff",
        borderColor: "#55C10A",
        borderWidth: 2,
      },
    },
  ],
};

export const lineOpt1 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    show: false,
  },
  grid: {
    left: "3%",
    right: "7%",
    bottom: "3%",
    top: "4%",
    containLabel: true,
  },
  xAxis: {
    position: "top", // 将x轴标签放到顶部
    type: "value",
    axisLabel: {
      color: "#CCDDFF",
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: "rgba(196, 202, 215, 0.24)",
      },
    },
  },
  yAxis: {
    type: "category",
    data: [
      "砂石料",
      "编制物料",
      "照明设备",
      "配电箱",
      "抢修机具",
      "运输设备",
      "机械设备",
      "救生衣",
    ],
    axisLabel: {
      color: "#CCDDFF",
      fontSize: 14,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: "bar",
      barWidth: "30%",
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      itemStyle: {
        borderColor: "#5FD4FE",
        color: "rgba(95, 212, 254, 0.40)",
      },
      tooltip: {
        valueFormatter: (value) => value + "件",
      },
    },
  ],
};

export const multipleOption = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["面雨量", "区间流量", "入库流量", "出库流量", "水位"],
    selected: {
      面雨量: true,
      区间流量: false,
      入库流量: true,
      出库流量: false,
      水位: true,
    },
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: "all",
      },
    ],
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      height: 15,
      top: 338,
      xAxisIndex: [0, 1],
    },
  ],
  grid: [
    // 第一个top + height = 第二个 top
    {
      left: 55,
      right: 55,
      top: 40,
      show: true,
      bottom: 10,
      borderColor: "#979797",
      height: 80,
    },
    {
      left: 55,
      right: 55,
      top: 120,
      bottom: 0,
      height: 185,
    },
  ],
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [
        "2025-04-14 17",
        "2025-04-14 18",
        "2025-04-14 19",
        "2025-04-14 20",
        "2025-04-14 21",
        "2025-04-14 22",
        "2025-04-14 23",
        "2025-04-15 00",
        "2025-04-15 01",
        "2025-04-15 02",
        "2025-04-15 03",
        "2025-04-15 04",
        "2025-04-15 05",
        "2025-04-15 06",
        "2025-04-15 07",
        "2025-04-15 08",
        "2025-04-15 09",
        "2025-04-15 10",
        "2025-04-15 11",
        "2025-04-15 12",
        "2025-04-15 13",
        "2025-04-15 14",
        "2025-04-15 15",
        "2025-04-15 16",
        "2025-04-15 17",
        "2025-04-15 18",
        "2025-04-15 19",
        "2025-04-15 20",
        "2025-04-15 21",
        "2025-04-15 22",
        "2025-04-15 23",
        "2025-04-16 00",
        "2025-04-16 01",
        "2025-04-16 02",
        "2025-04-16 03",
        "2025-04-16 04",
        "2025-04-16 05",
        "2025-04-16 06",
        "2025-04-16 07",
        "2025-04-16 08",
        "2025-04-16 09",
        "2025-04-16 10",
        "2025-04-16 11",
        "2025-04-16 12",
        "2025-04-16 13",
        "2025-04-16 14",
        "2025-04-16 15",
        "2025-04-16 16",
        "2025-04-16 17",
        "2025-04-16 18",
        "2025-04-16 19",
        "2025-04-16 20",
        "2025-04-16 21",
        "2025-04-16 22",
        "2025-04-16 23",
        "2025-04-17 00",
        "2025-04-17 01",
        "2025-04-17 02",
        "2025-04-17 03",
        "2025-04-17 04",
        "2025-04-17 05",
        "2025-04-17 06",
        "2025-04-17 07",
        "2025-04-17 08",
        "2025-04-17 09",
        "2025-04-17 10",
        "2025-04-17 11",
        "2025-04-17 12",
        "2025-04-17 13",
        "2025-04-17 14",
        "2025-04-17 15",
        "2025-04-17 16",
        "2025-04-17 17",
        "2025-04-17 18",
        "2025-04-17 19",
        "2025-04-17 20",
        "2025-04-17 21",
        "2025-04-17 22",
        "2025-04-17 23",
        "2025-04-18 00",
        "2025-04-18 01",
        "2025-04-18 02",
        "2025-04-18 03",
        "2025-04-18 04",
        "2025-04-18 05",
        "2025-04-18 06",
        "2025-04-18 07",
        "2025-04-18 08",
        "2025-04-18 09",
        "2025-04-18 10",
        "2025-04-18 11",
        "2025-04-18 12",
        "2025-04-18 13",
        "2025-04-18 14",
        "2025-04-18 15",
        "2025-04-18 16",
        "2025-04-18 17",
        "2025-04-18 18",
        "2025-04-18 19",
        "2025-04-18 20",
        "2025-04-18 21",
        "2025-04-18 22",
        "2025-04-18 23",
        "2025-04-19 00",
        "2025-04-19 01",
        "2025-04-19 02",
        "2025-04-19 03",
        "2025-04-19 04",
        "2025-04-19 05",
        "2025-04-19 06",
        "2025-04-19 07",
        "2025-04-19 08",
        "2025-04-19 09",
        "2025-04-19 10",
        "2025-04-19 11",
        "2025-04-19 12",
        "2025-04-19 13",
        "2025-04-19 14",
        "2025-04-19 15",
        "2025-04-19 16",
        "2025-04-19 17",
        "2025-04-19 18",
        "2025-04-19 19",
        "2025-04-19 20",
        "2025-04-19 21",
        "2025-04-19 22",
        "2025-04-19 23",
        "2025-04-20 00",
        "2025-04-20 01",
        "2025-04-20 02",
        "2025-04-20 03",
        "2025-04-20 04",
        "2025-04-20 05",
        "2025-04-20 06",
        "2025-04-20 07",
        "2025-04-20 08",
        "2025-04-20 09",
        "2025-04-20 10",
        "2025-04-20 11",
        "2025-04-20 12",
        "2025-04-20 13",
        "2025-04-20 14",
        "2025-04-20 15",
        "2025-04-20 16",
        "2025-04-20 17",
        "2025-04-20 18",
        "2025-04-20 19",
        "2025-04-20 20",
        "2025-04-20 21",
        "2025-04-20 22",
        "2025-04-20 23",
        "2025-04-21 00",
        "2025-04-21 01",
        "2025-04-21 02",
        "2025-04-21 03",
        "2025-04-21 04",
        "2025-04-21 05",
        "2025-04-21 06",
        "2025-04-21 07",
        "2025-04-21 08",
        "2025-04-21 09",
        "2025-04-21 10",
        "2025-04-21 11",
        "2025-04-21 12",
        "2025-04-21 13",
        "2025-04-21 14",
        "2025-04-21 15",
        "2025-04-21 16",
      ],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    {
      gridIndex: 1,
      boundaryGap: false,
      data: [
        "2025-04-14 17",
        "2025-04-14 18",
        "2025-04-14 19",
        "2025-04-14 20",
        "2025-04-14 21",
        "2025-04-14 22",
        "2025-04-14 23",
        "2025-04-15 00",
        "2025-04-15 01",
        "2025-04-15 02",
        "2025-04-15 03",
        "2025-04-15 04",
        "2025-04-15 05",
        "2025-04-15 06",
        "2025-04-15 07",
        "2025-04-15 08",
        "2025-04-15 09",
        "2025-04-15 10",
        "2025-04-15 11",
        "2025-04-15 12",
        "2025-04-15 13",
        "2025-04-15 14",
        "2025-04-15 15",
        "2025-04-15 16",
        "2025-04-15 17",
        "2025-04-15 18",
        "2025-04-15 19",
        "2025-04-15 20",
        "2025-04-15 21",
        "2025-04-15 22",
        "2025-04-15 23",
        "2025-04-16 00",
        "2025-04-16 01",
        "2025-04-16 02",
        "2025-04-16 03",
        "2025-04-16 04",
        "2025-04-16 05",
        "2025-04-16 06",
        "2025-04-16 07",
        "2025-04-16 08",
        "2025-04-16 09",
        "2025-04-16 10",
        "2025-04-16 11",
        "2025-04-16 12",
        "2025-04-16 13",
        "2025-04-16 14",
        "2025-04-16 15",
        "2025-04-16 16",
        "2025-04-16 17",
        "2025-04-16 18",
        "2025-04-16 19",
        "2025-04-16 20",
        "2025-04-16 21",
        "2025-04-16 22",
        "2025-04-16 23",
        "2025-04-17 00",
        "2025-04-17 01",
        "2025-04-17 02",
        "2025-04-17 03",
        "2025-04-17 04",
        "2025-04-17 05",
        "2025-04-17 06",
        "2025-04-17 07",
        "2025-04-17 08",
        "2025-04-17 09",
        "2025-04-17 10",
        "2025-04-17 11",
        "2025-04-17 12",
        "2025-04-17 13",
        "2025-04-17 14",
        "2025-04-17 15",
        "2025-04-17 16",
        "2025-04-17 17",
        "2025-04-17 18",
        "2025-04-17 19",
        "2025-04-17 20",
        "2025-04-17 21",
        "2025-04-17 22",
        "2025-04-17 23",
        "2025-04-18 00",
        "2025-04-18 01",
        "2025-04-18 02",
        "2025-04-18 03",
        "2025-04-18 04",
        "2025-04-18 05",
        "2025-04-18 06",
        "2025-04-18 07",
        "2025-04-18 08",
        "2025-04-18 09",
        "2025-04-18 10",
        "2025-04-18 11",
        "2025-04-18 12",
        "2025-04-18 13",
        "2025-04-18 14",
        "2025-04-18 15",
        "2025-04-18 16",
        "2025-04-18 17",
        "2025-04-18 18",
        "2025-04-18 19",
        "2025-04-18 20",
        "2025-04-18 21",
        "2025-04-18 22",
        "2025-04-18 23",
        "2025-04-19 00",
        "2025-04-19 01",
        "2025-04-19 02",
        "2025-04-19 03",
        "2025-04-19 04",
        "2025-04-19 05",
        "2025-04-19 06",
        "2025-04-19 07",
        "2025-04-19 08",
        "2025-04-19 09",
        "2025-04-19 10",
        "2025-04-19 11",
        "2025-04-19 12",
        "2025-04-19 13",
        "2025-04-19 14",
        "2025-04-19 15",
        "2025-04-19 16",
        "2025-04-19 17",
        "2025-04-19 18",
        "2025-04-19 19",
        "2025-04-19 20",
        "2025-04-19 21",
        "2025-04-19 22",
        "2025-04-19 23",
        "2025-04-20 00",
        "2025-04-20 01",
        "2025-04-20 02",
        "2025-04-20 03",
        "2025-04-20 04",
        "2025-04-20 05",
        "2025-04-20 06",
        "2025-04-20 07",
        "2025-04-20 08",
        "2025-04-20 09",
        "2025-04-20 10",
        "2025-04-20 11",
        "2025-04-20 12",
        "2025-04-20 13",
        "2025-04-20 14",
        "2025-04-20 15",
        "2025-04-20 16",
        "2025-04-20 17",
        "2025-04-20 18",
        "2025-04-20 19",
        "2025-04-20 20",
        "2025-04-20 21",
        "2025-04-20 22",
        "2025-04-20 23",
        "2025-04-21 00",
        "2025-04-21 01",
        "2025-04-21 02",
        "2025-04-21 03",
        "2025-04-21 04",
        "2025-04-21 05",
        "2025-04-21 06",
        "2025-04-21 07",
        "2025-04-21 08",
        "2025-04-21 09",
        "2025-04-21 10",
        "2025-04-21 11",
        "2025-04-21 12",
        "2025-04-21 13",
        "2025-04-21 14",
        "2025-04-21 15",
        "2025-04-21 16",
      ],
      type: "category",
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: "#cccccc",
        },
      },
      axisLine: {
        show: true,
        onZeroAxisIndex: 0,
        lineStyle: {
          color: "#979797",
        },
      },
      axisLabel: {},
      position: "bottom",
    },
  ],
  yAxis: [
    {
      name: "雨量mm",
      nameGap: 15,
      nameTextStyle: {
        color: "rgba(44, 53, 66, 0.80)",
        align: "right",
      },
      nameLocation: "start",
      interval: 1,
      min: 0,
      max: 3,
      gridIndex: 0,
      splitNumber: 2,
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 11,
        color: "#333",
      },
      inverse: true,
      axisTick: {
        show: true,
        lineStyle: {
          color: "#cccccc",
        },
        inside: true,
      },
    },
    {
      gridIndex: 1,
      name: "水位m",
      nameGap: 10,
      nameTextStyle: {
        color: "rgba(44, 53, 66, 0.80)",
        align: "right",
        padding: [0, 5, 0, 0],
      },
      nameLocation: "end",
      interval: 0.04,
      min: 308.48,
      max: 308.64,
      splitNumber: 4,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
          width: 2,
        },
      },
      axisLabel: {
        fontSize: 11,
        verticalAlign: "top",
        color: "#333",
      },
      type: "value",
      axisTick: {
        show: true,
        inside: true,
      },
    },
    {
      gridIndex: 1,
      splitNumber: 4,
      name: "流量m³/s",
      nameGap: 15,
      nameTextStyle: {
        color: "rgba(44, 53, 66, 0.80)",
        align: "left",
        padding: 5,
      },
      nameLocation: "end",
      interval: 0.7,
      min: 1,
      max: 3.8,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
          width: 2,
        },
      },
      axisLabel: {
        fontSize: 11,
        color: "#333",
      },
      type: "value",
      axisTick: {
        show: true,
        inside: true,
      },
    },
  ],
  series: [
    {
      name: "面雨量",
      type: "bar",
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: "linear",
          global: false,
          colorStops: [
            {
              offset: 0,
              color: "#2386E9",
            },
            {
              offset: 1,
              color: "#81D9FF",
            },
          ],
        },
      },
      data: [
        ["2025-04-14 17", 0],
        ["2025-04-14 18", 0],
        ["2025-04-14 19", 0],
        ["2025-04-14 20", 0],
        ["2025-04-14 21", 0],
        ["2025-04-14 22", 0],
        ["2025-04-14 23", 0],
        ["2025-04-15 00", 0],
        ["2025-04-15 01", 0],
        ["2025-04-15 02", 0],
        ["2025-04-15 03", 0],
        ["2025-04-15 04", 0],
        ["2025-04-15 05", 0],
        ["2025-04-15 06", 0],
        ["2025-04-15 07", 0],
        ["2025-04-15 08", 0],
        ["2025-04-15 09", 0],
        ["2025-04-15 10", 0],
        ["2025-04-15 11", 0],
        ["2025-04-15 12", 0],
        ["2025-04-15 13", 0],
        ["2025-04-15 14", 0],
        ["2025-04-15 15", 0],
        ["2025-04-15 16", 0],
        ["2025-04-15 17", 0],
        ["2025-04-15 18", 0],
        ["2025-04-15 19", 0],
        ["2025-04-15 20", 0],
        ["2025-04-15 21", 0],
        ["2025-04-15 22", 0],
        ["2025-04-15 23", 0],
        ["2025-04-16 00", 0],
        ["2025-04-16 01", 0],
        ["2025-04-16 02", 0],
        ["2025-04-16 03", 0],
        ["2025-04-16 04", 0],
        ["2025-04-16 05", 0],
        ["2025-04-16 06", 0],
        ["2025-04-16 07", 0],
        ["2025-04-16 08", 0],
        ["2025-04-16 09", 0],
        ["2025-04-16 10", 0],
        ["2025-04-16 11", 0],
        ["2025-04-16 12", 0],
        ["2025-04-16 13", 0],
        ["2025-04-16 14", 0],
        ["2025-04-16 15", 0],
        ["2025-04-16 16", 0],
        ["2025-04-16 17", 0],
        ["2025-04-16 18", 0],
        ["2025-04-16 19", 0],
        ["2025-04-16 20", 0],
        ["2025-04-16 21", 0],
        ["2025-04-16 22", 0],
        ["2025-04-16 23", 0],
        ["2025-04-17 00", 0],
        ["2025-04-17 01", 0],
        ["2025-04-17 02", 0],
        ["2025-04-17 03", 0],
        ["2025-04-17 04", 0],
        ["2025-04-17 05", 0],
        ["2025-04-17 06", 0],
        ["2025-04-17 07", 0],
        ["2025-04-17 08", 0],
        ["2025-04-17 09", 0],
        ["2025-04-17 10", 0],
        ["2025-04-17 11", 0],
        ["2025-04-17 12", 0],
        ["2025-04-17 13", 0],
        ["2025-04-17 14", 0],
        ["2025-04-17 15", 0],
        ["2025-04-17 16", 0],
        ["2025-04-17 17", 0],
        ["2025-04-17 18", 0],
        ["2025-04-17 19", 0],
        ["2025-04-17 20", 0],
        ["2025-04-17 21", 0],
        ["2025-04-17 22", 0],
        ["2025-04-17 23", 0],
        ["2025-04-18 00", 0],
        ["2025-04-18 01", 0],
        ["2025-04-18 02", 0],
        ["2025-04-18 03", 0],
        ["2025-04-18 04", 0],
        ["2025-04-18 05", 0],
        ["2025-04-18 06", 0],
        ["2025-04-18 07", 0],
        ["2025-04-18 08", 0],
        ["2025-04-18 09", 0],
        ["2025-04-18 10", 0],
        ["2025-04-18 11", 0],
        ["2025-04-18 12", 0],
        ["2025-04-18 13", 0],
        ["2025-04-18 14", 0],
        ["2025-04-18 15", 0],
        ["2025-04-18 16", 0],
        ["2025-04-18 17", 0],
        ["2025-04-18 18", 0],
        ["2025-04-18 19", 0],
        ["2025-04-18 20", 0],
        ["2025-04-18 21", 0],
        ["2025-04-18 22", 0],
        ["2025-04-18 23", 0],
        ["2025-04-19 00", 0],
        ["2025-04-19 01", 0],
        ["2025-04-19 02", 0],
        ["2025-04-19 03", 0],
        ["2025-04-19 04", 0],
        ["2025-04-19 05", 0],
        ["2025-04-19 06", 0],
        ["2025-04-19 07", 0],
        ["2025-04-19 08", 0],
        ["2025-04-19 09", 0],
        ["2025-04-19 10", 0],
        ["2025-04-19 11", 0],
        ["2025-04-19 12", 0],
        ["2025-04-19 13", 0],
        ["2025-04-19 14", 0],
        ["2025-04-19 15", 0],
        ["2025-04-19 16", 0],
        ["2025-04-19 17", 0],
        ["2025-04-19 18", 0],
        ["2025-04-19 19", 0],
        ["2025-04-19 20", 0],
        ["2025-04-19 21", 0],
        ["2025-04-19 22", 0],
        ["2025-04-19 23", 0],
        ["2025-04-20 00", 0],
        ["2025-04-20 01", 0],
        ["2025-04-20 02", 0],
        ["2025-04-20 03", 0],
        ["2025-04-20 04", 0],
        ["2025-04-20 05", 0],
        ["2025-04-20 06", 0],
        ["2025-04-20 07", 0],
        ["2025-04-20 08", 0],
        ["2025-04-20 09", 0],
        ["2025-04-20 10", 0],
        ["2025-04-20 11", 0],
        ["2025-04-20 12", 0],
        ["2025-04-20 13", 0],
        ["2025-04-20 14", 0],
        ["2025-04-20 15", 0],
        ["2025-04-20 16", 0],
        ["2025-04-20 17", 0],
        ["2025-04-20 18", 0],
        ["2025-04-20 19", 0],
        ["2025-04-20 20", 0],
        ["2025-04-20 21", 0],
        ["2025-04-20 22", 0],
        ["2025-04-20 23", 0],
        ["2025-04-21 00", 0],
        ["2025-04-21 01", 0],
        ["2025-04-21 02", 0],
        ["2025-04-21 03", 0],
        ["2025-04-21 04", 0],
        ["2025-04-21 05", 0],
        ["2025-04-21 06", 0],
        ["2025-04-21 07", 0],
        ["2025-04-21 08", 0],
        ["2025-04-21 09", 0],
        ["2025-04-21 10", 0],
        ["2025-04-21 11", 0],
        ["2025-04-21 12", 0],
        ["2025-04-21 13", 0],
        ["2025-04-21 14", 0],
        ["2025-04-21 15", 0],
        ["2025-04-21 16", 0],
      ],
      markLine: {
        silent: true,
        label: {
          show: false,
        },
        lineStyle: {
          color: "#414E61",
        },
        symbol: ["none", "none"],
        data: [
          {
            xAxis: "2025-04-18 16",
          },
        ],
      },
    },
    {
      name: "区间流量",
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 2,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: "#EB995E",
          label: {
            show: false,
          },
        },
      },
      data: [
        ["2025-04-14 17", null],
        ["2025-04-14 18", null],
        ["2025-04-14 19", null],
        ["2025-04-14 20", null],
        ["2025-04-14 21", null],
        ["2025-04-14 22", null],
        ["2025-04-14 23", null],
        ["2025-04-15 00", null],
        ["2025-04-15 01", null],
        ["2025-04-15 02", null],
        ["2025-04-15 03", null],
        ["2025-04-15 04", null],
        ["2025-04-15 05", null],
        ["2025-04-15 06", null],
        ["2025-04-15 07", null],
        ["2025-04-15 08", null],
        ["2025-04-15 09", null],
        ["2025-04-15 10", null],
        ["2025-04-15 11", null],
        ["2025-04-15 12", null],
        ["2025-04-15 13", null],
        ["2025-04-15 14", null],
        ["2025-04-15 15", null],
        ["2025-04-15 16", null],
        ["2025-04-15 17", null],
        ["2025-04-15 18", null],
        ["2025-04-15 19", null],
        ["2025-04-15 20", null],
        ["2025-04-15 21", null],
        ["2025-04-15 22", null],
        ["2025-04-15 23", null],
        ["2025-04-16 00", null],
        ["2025-04-16 01", null],
        ["2025-04-16 02", null],
        ["2025-04-16 03", null],
        ["2025-04-16 04", null],
        ["2025-04-16 05", null],
        ["2025-04-16 06", null],
        ["2025-04-16 07", null],
        ["2025-04-16 08", null],
        ["2025-04-16 09", null],
        ["2025-04-16 10", null],
        ["2025-04-16 11", null],
        ["2025-04-16 12", null],
        ["2025-04-16 13", null],
        ["2025-04-16 14", null],
        ["2025-04-16 15", null],
        ["2025-04-16 16", null],
        ["2025-04-16 17", null],
        ["2025-04-16 18", null],
        ["2025-04-16 19", null],
        ["2025-04-16 20", null],
        ["2025-04-16 21", null],
        ["2025-04-16 22", null],
        ["2025-04-16 23", null],
        ["2025-04-17 00", null],
        ["2025-04-17 01", null],
        ["2025-04-17 02", null],
        ["2025-04-17 03", null],
        ["2025-04-17 04", null],
        ["2025-04-17 05", null],
        ["2025-04-17 06", null],
        ["2025-04-17 07", null],
        ["2025-04-17 08", null],
        ["2025-04-17 09", null],
        ["2025-04-17 10", null],
        ["2025-04-17 11", null],
        ["2025-04-17 12", null],
        ["2025-04-17 13", null],
        ["2025-04-17 14", null],
        ["2025-04-17 15", null],
        ["2025-04-17 16", null],
        ["2025-04-17 17", null],
        ["2025-04-17 18", null],
        ["2025-04-17 19", null],
        ["2025-04-17 20", null],
        ["2025-04-17 21", null],
        ["2025-04-17 22", null],
        ["2025-04-17 23", null],
        ["2025-04-18 00", null],
        ["2025-04-18 01", null],
        ["2025-04-18 02", null],
        ["2025-04-18 03", null],
        ["2025-04-18 04", null],
        ["2025-04-18 05", null],
        ["2025-04-18 06", null],
        ["2025-04-18 07", null],
        ["2025-04-18 08", null],
        ["2025-04-18 09", null],
        ["2025-04-18 10", null],
        ["2025-04-18 11", null],
        ["2025-04-18 12", null],
        ["2025-04-18 13", null],
        ["2025-04-18 14", null],
        ["2025-04-18 15", null],
        ["2025-04-18 16", null],
        ["2025-04-18 17", null],
        ["2025-04-18 18", 0],
        ["2025-04-18 19", 0],
        ["2025-04-18 20", 0],
        ["2025-04-18 21", 0],
        ["2025-04-18 22", 0],
        ["2025-04-18 23", 0],
        ["2025-04-19 00", 0],
        ["2025-04-19 01", 0],
        ["2025-04-19 02", 0],
        ["2025-04-19 03", 0],
        ["2025-04-19 04", 0],
        ["2025-04-19 05", 0],
        ["2025-04-19 06", 0],
        ["2025-04-19 07", 0],
        ["2025-04-19 08", 0],
        ["2025-04-19 09", 0],
        ["2025-04-19 10", 0],
        ["2025-04-19 11", 0],
        ["2025-04-19 12", 0],
        ["2025-04-19 13", 0],
        ["2025-04-19 14", 0],
        ["2025-04-19 15", 0],
        ["2025-04-19 16", 0],
        ["2025-04-19 17", 0],
        ["2025-04-19 18", 0],
        ["2025-04-19 19", 0],
        ["2025-04-19 20", 0],
        ["2025-04-19 21", 0],
        ["2025-04-19 22", 0],
        ["2025-04-19 23", 0],
        ["2025-04-20 00", 0],
        ["2025-04-20 01", 0],
        ["2025-04-20 02", 0],
        ["2025-04-20 03", 0],
        ["2025-04-20 04", 0],
        ["2025-04-20 05", 0],
        ["2025-04-20 06", 0],
        ["2025-04-20 07", 0],
        ["2025-04-20 08", 0],
        ["2025-04-20 09", 0],
        ["2025-04-20 10", 0],
        ["2025-04-20 11", 0],
        ["2025-04-20 12", 0],
        ["2025-04-20 13", 0],
        ["2025-04-20 14", 0],
        ["2025-04-20 15", 0],
        ["2025-04-20 16", 0],
        ["2025-04-20 17", 0],
        ["2025-04-20 18", 0],
        ["2025-04-20 19", 0],
        ["2025-04-20 20", 0],
        ["2025-04-20 21", 0],
        ["2025-04-20 22", 0],
        ["2025-04-20 23", 0],
        ["2025-04-21 00", 0],
        ["2025-04-21 01", 0],
        ["2025-04-21 02", 0],
        ["2025-04-21 03", 0],
        ["2025-04-21 04", 0],
        ["2025-04-21 05", 0],
        ["2025-04-21 06", 0],
        ["2025-04-21 07", 0],
        ["2025-04-21 08", 0],
        ["2025-04-21 09", 0],
        ["2025-04-21 10", 0],
        ["2025-04-21 11", 0],
        ["2025-04-21 12", 0],
        ["2025-04-21 13", 0],
        ["2025-04-21 14", 0],
        ["2025-04-21 15", 0],
        ["2025-04-21 16", 0],
      ],
      lineStyle: {
        opacity: 1,
        color: "#EB995E",
        type: "solid",
      },
    },
    {
      name: "入库流量",
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 2,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: "#008DFF",
          label: {
            show: false,
          },
        },
      },
      data: [
        ["2025-04-14 17", null],
        ["2025-04-14 18", null],
        ["2025-04-14 19", null],
        ["2025-04-14 20", null],
        ["2025-04-14 21", null],
        ["2025-04-14 22", null],
        ["2025-04-14 23", null],
        ["2025-04-15 00", null],
        ["2025-04-15 01", null],
        ["2025-04-15 02", null],
        ["2025-04-15 03", null],
        ["2025-04-15 04", null],
        ["2025-04-15 05", null],
        ["2025-04-15 06", null],
        ["2025-04-15 07", null],
        ["2025-04-15 08", null],
        ["2025-04-15 09", null],
        ["2025-04-15 10", null],
        ["2025-04-15 11", null],
        ["2025-04-15 12", null],
        ["2025-04-15 13", null],
        ["2025-04-15 14", null],
        ["2025-04-15 15", null],
        ["2025-04-15 16", null],
        ["2025-04-15 17", null],
        ["2025-04-15 18", null],
        ["2025-04-15 19", null],
        ["2025-04-15 20", null],
        ["2025-04-15 21", null],
        ["2025-04-15 22", null],
        ["2025-04-15 23", null],
        ["2025-04-16 00", null],
        ["2025-04-16 01", null],
        ["2025-04-16 02", null],
        ["2025-04-16 03", null],
        ["2025-04-16 04", null],
        ["2025-04-16 05", null],
        ["2025-04-16 06", null],
        ["2025-04-16 07", null],
        ["2025-04-16 08", null],
        ["2025-04-16 09", null],
        ["2025-04-16 10", null],
        ["2025-04-16 11", null],
        ["2025-04-16 12", null],
        ["2025-04-16 13", null],
        ["2025-04-16 14", null],
        ["2025-04-16 15", null],
        ["2025-04-16 16", null],
        ["2025-04-16 17", null],
        ["2025-04-16 18", null],
        ["2025-04-16 19", null],
        ["2025-04-16 20", null],
        ["2025-04-16 21", null],
        ["2025-04-16 22", null],
        ["2025-04-16 23", null],
        ["2025-04-17 00", null],
        ["2025-04-17 01", null],
        ["2025-04-17 02", null],
        ["2025-04-17 03", null],
        ["2025-04-17 04", null],
        ["2025-04-17 05", null],
        ["2025-04-17 06", null],
        ["2025-04-17 07", null],
        ["2025-04-17 08", null],
        ["2025-04-17 09", null],
        ["2025-04-17 10", null],
        ["2025-04-17 11", null],
        ["2025-04-17 12", null],
        ["2025-04-17 13", null],
        ["2025-04-17 14", null],
        ["2025-04-17 15", null],
        ["2025-04-17 16", null],
        ["2025-04-17 17", null],
        ["2025-04-17 18", null],
        ["2025-04-17 19", null],
        ["2025-04-17 20", null],
        ["2025-04-17 21", null],
        ["2025-04-17 22", null],
        ["2025-04-17 23", null],
        ["2025-04-18 00", null],
        ["2025-04-18 01", null],
        ["2025-04-18 02", null],
        ["2025-04-18 03", null],
        ["2025-04-18 04", null],
        ["2025-04-18 05", null],
        ["2025-04-18 06", null],
        ["2025-04-18 07", null],
        ["2025-04-18 08", null],
        ["2025-04-18 09", null],
        ["2025-04-18 10", null],
        ["2025-04-18 11", null],
        ["2025-04-18 12", null],
        ["2025-04-18 13", null],
        ["2025-04-18 14", null],
        ["2025-04-18 15", null],
        ["2025-04-18 16", null],
        ["2025-04-18 17", null],
        ["2025-04-18 18", 3.1],
        ["2025-04-18 19", 3.1],
        ["2025-04-18 20", 3.2],
        ["2025-04-18 21", 3.2],
        ["2025-04-18 22", 3.2],
        ["2025-04-18 23", 3.2],
        ["2025-04-19 00", 3.2],
        ["2025-04-19 01", 3.2],
        ["2025-04-19 02", 3.2],
        ["2025-04-19 03", 3.2],
        ["2025-04-19 04", 3.2],
        ["2025-04-19 05", 3.2],
        ["2025-04-19 06", 3.2],
        ["2025-04-19 07", 3.2],
        ["2025-04-19 08", 3.2],
        ["2025-04-19 09", 3.2],
        ["2025-04-19 10", 3.2],
        ["2025-04-19 11", 3.2],
        ["2025-04-19 12", 3.2],
        ["2025-04-19 13", 3.2],
        ["2025-04-19 14", 3.2],
        ["2025-04-19 15", 3.2],
        ["2025-04-19 16", 3.2],
        ["2025-04-19 17", 3.2],
        ["2025-04-19 18", 3.2],
        ["2025-04-19 19", 3.2],
        ["2025-04-19 20", 3.2],
        ["2025-04-19 21", 3.2],
        ["2025-04-19 22", 3.2],
        ["2025-04-19 23", 3.2],
        ["2025-04-20 00", 3.2],
        ["2025-04-20 01", 3.2],
        ["2025-04-20 02", 3.2],
        ["2025-04-20 03", 3.2],
        ["2025-04-20 04", 3.2],
        ["2025-04-20 05", 3.2],
        ["2025-04-20 06", 3.2],
        ["2025-04-20 07", 3.2],
        ["2025-04-20 08", 3.2],
        ["2025-04-20 09", 3.2],
        ["2025-04-20 10", 3.2],
        ["2025-04-20 11", 3.2],
        ["2025-04-20 12", 3.2],
        ["2025-04-20 13", 3.2],
        ["2025-04-20 14", 3.2],
        ["2025-04-20 15", 3.2],
        ["2025-04-20 16", 3.2],
        ["2025-04-20 17", 3.2],
        ["2025-04-20 18", 3.2],
        ["2025-04-20 19", 3.2],
        ["2025-04-20 20", 3.2],
        ["2025-04-20 21", 3.2],
        ["2025-04-20 22", 3.2],
        ["2025-04-20 23", 3.2],
        ["2025-04-21 00", 3.2],
        ["2025-04-21 01", 3.2],
        ["2025-04-21 02", 3.2],
        ["2025-04-21 03", 3.2],
        ["2025-04-21 04", 3.2],
        ["2025-04-21 05", 3.2],
        ["2025-04-21 06", 3.2],
        ["2025-04-21 07", 3.2],
        ["2025-04-21 08", 3.2],
        ["2025-04-21 09", 3.2],
        ["2025-04-21 10", 3.2],
        ["2025-04-21 11", 3.2],
        ["2025-04-21 12", 3.2],
        ["2025-04-21 13", 3.2],
        ["2025-04-21 14", 3.2],
        ["2025-04-21 15", 3.2],
        ["2025-04-21 16", 3.2],
      ],
      lineStyle: {
        opacity: 1,
        color: "#008DFF",
        type: "solid",
      },
      markLine: {
        silent: true,
        label: {
          show: true,
          position: "end",
        },
        lineStyle: {
          color: "#414E61",
        },
        symbol: ["none", "none"],
        data: [
          {
            xAxis: "2025-04-18 16",
          },
        ],
      },
      markPoint: {
        symbol: "circle",
        symbolSize: 20,
        itemStyle: {
          color: "rgba(248, 204, 205, 0.70)",
          backgroundColor: "",
        },
        label: {
          formatter: "峰",
          fontFamily: "YouSheBiaoTiHei",
          fontSize: 14,
          color: "rgba(244, 51, 52, 1)",
        },
        data: [
          {
            coord: ["2025-04-18 20", 3.2],
            name: "最大值",
          },
        ],
      },
    },
    {
      name: "出库流量",
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 2,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: "#9874FF",
          label: {
            show: false,
          },
        },
      },
      data: [
        ["2025-04-14 17", null],
        ["2025-04-14 18", null],
        ["2025-04-14 19", null],
        ["2025-04-14 20", null],
        ["2025-04-14 21", null],
        ["2025-04-14 22", null],
        ["2025-04-14 23", null],
        ["2025-04-15 00", null],
        ["2025-04-15 01", null],
        ["2025-04-15 02", null],
        ["2025-04-15 03", null],
        ["2025-04-15 04", null],
        ["2025-04-15 05", null],
        ["2025-04-15 06", null],
        ["2025-04-15 07", null],
        ["2025-04-15 08", null],
        ["2025-04-15 09", null],
        ["2025-04-15 10", null],
        ["2025-04-15 11", null],
        ["2025-04-15 12", null],
        ["2025-04-15 13", null],
        ["2025-04-15 14", null],
        ["2025-04-15 15", null],
        ["2025-04-15 16", null],
        ["2025-04-15 17", null],
        ["2025-04-15 18", null],
        ["2025-04-15 19", null],
        ["2025-04-15 20", null],
        ["2025-04-15 21", null],
        ["2025-04-15 22", null],
        ["2025-04-15 23", null],
        ["2025-04-16 00", null],
        ["2025-04-16 01", null],
        ["2025-04-16 02", null],
        ["2025-04-16 03", null],
        ["2025-04-16 04", null],
        ["2025-04-16 05", null],
        ["2025-04-16 06", null],
        ["2025-04-16 07", null],
        ["2025-04-16 08", null],
        ["2025-04-16 09", null],
        ["2025-04-16 10", null],
        ["2025-04-16 11", null],
        ["2025-04-16 12", null],
        ["2025-04-16 13", null],
        ["2025-04-16 14", null],
        ["2025-04-16 15", null],
        ["2025-04-16 16", null],
        ["2025-04-16 17", null],
        ["2025-04-16 18", null],
        ["2025-04-16 19", null],
        ["2025-04-16 20", null],
        ["2025-04-16 21", null],
        ["2025-04-16 22", null],
        ["2025-04-16 23", null],
        ["2025-04-17 00", null],
        ["2025-04-17 01", null],
        ["2025-04-17 02", null],
        ["2025-04-17 03", null],
        ["2025-04-17 04", null],
        ["2025-04-17 05", null],
        ["2025-04-17 06", null],
        ["2025-04-17 07", null],
        ["2025-04-17 08", null],
        ["2025-04-17 09", null],
        ["2025-04-17 10", null],
        ["2025-04-17 11", null],
        ["2025-04-17 12", null],
        ["2025-04-17 13", null],
        ["2025-04-17 14", null],
        ["2025-04-17 15", null],
        ["2025-04-17 16", null],
        ["2025-04-17 17", null],
        ["2025-04-17 18", null],
        ["2025-04-17 19", null],
        ["2025-04-17 20", null],
        ["2025-04-17 21", null],
        ["2025-04-17 22", null],
        ["2025-04-17 23", null],
        ["2025-04-18 00", null],
        ["2025-04-18 01", null],
        ["2025-04-18 02", null],
        ["2025-04-18 03", null],
        ["2025-04-18 04", null],
        ["2025-04-18 05", null],
        ["2025-04-18 06", null],
        ["2025-04-18 07", null],
        ["2025-04-18 08", null],
        ["2025-04-18 09", null],
        ["2025-04-18 10", null],
        ["2025-04-18 11", null],
        ["2025-04-18 12", null],
        ["2025-04-18 13", null],
        ["2025-04-18 14", null],
        ["2025-04-18 15", null],
        ["2025-04-18 16", null],
        ["2025-04-18 17", null],
        ["2025-04-18 18", 1],
        ["2025-04-18 19", 1],
        ["2025-04-18 20", 1],
        ["2025-04-18 21", 1],
        ["2025-04-18 22", 1],
        ["2025-04-18 23", 1],
        ["2025-04-19 00", 1],
        ["2025-04-19 01", 1],
        ["2025-04-19 02", 1],
        ["2025-04-19 03", 1],
        ["2025-04-19 04", 1],
        ["2025-04-19 05", 1],
        ["2025-04-19 06", 1],
        ["2025-04-19 07", 1],
        ["2025-04-19 08", 1],
        ["2025-04-19 09", 1],
        ["2025-04-19 10", 1],
        ["2025-04-19 11", 1],
        ["2025-04-19 12", 1],
        ["2025-04-19 13", 1],
        ["2025-04-19 14", 1],
        ["2025-04-19 15", 1],
        ["2025-04-19 16", 1],
        ["2025-04-19 17", 1],
        ["2025-04-19 18", 1],
        ["2025-04-19 19", 1],
        ["2025-04-19 20", 1],
        ["2025-04-19 21", 1],
        ["2025-04-19 22", 1],
        ["2025-04-19 23", 1],
        ["2025-04-20 00", 1],
        ["2025-04-20 01", 1],
        ["2025-04-20 02", 1],
        ["2025-04-20 03", 1],
        ["2025-04-20 04", 1],
        ["2025-04-20 05", 1],
        ["2025-04-20 06", 1],
        ["2025-04-20 07", 1],
        ["2025-04-20 08", 1],
        ["2025-04-20 09", 1],
        ["2025-04-20 10", 1],
        ["2025-04-20 11", 1],
        ["2025-04-20 12", 1],
        ["2025-04-20 13", 1],
        ["2025-04-20 14", 1],
        ["2025-04-20 15", 1],
        ["2025-04-20 16", 1],
        ["2025-04-20 17", 1],
        ["2025-04-20 18", 1],
        ["2025-04-20 19", 1],
        ["2025-04-20 20", 1],
        ["2025-04-20 21", 1],
        ["2025-04-20 22", 1],
        ["2025-04-20 23", 1],
        ["2025-04-21 00", 1],
        ["2025-04-21 01", 1],
        ["2025-04-21 02", 1],
        ["2025-04-21 03", 1],
        ["2025-04-21 04", 1],
        ["2025-04-21 05", 1],
        ["2025-04-21 06", 1],
        ["2025-04-21 07", 1],
        ["2025-04-21 08", 1],
        ["2025-04-21 09", 1],
        ["2025-04-21 10", 1],
        ["2025-04-21 11", 1],
        ["2025-04-21 12", 1],
        ["2025-04-21 13", 1],
        ["2025-04-21 14", 1],
        ["2025-04-21 15", 1],
        ["2025-04-21 16", 1],
      ],
      lineStyle: {
        opacity: 1,
        color: "#9874FF",
      },
    },
    {
      name: "水位",
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 1,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: "#73D000",
          label: {
            show: false,
          },
        },
      },
      data: [
        ["2025-04-14 17", null],
        ["2025-04-14 18", null],
        ["2025-04-14 19", null],
        ["2025-04-14 20", null],
        ["2025-04-14 21", null],
        ["2025-04-14 22", null],
        ["2025-04-14 23", null],
        ["2025-04-15 00", null],
        ["2025-04-15 01", null],
        ["2025-04-15 02", null],
        ["2025-04-15 03", null],
        ["2025-04-15 04", null],
        ["2025-04-15 05", null],
        ["2025-04-15 06", null],
        ["2025-04-15 07", null],
        ["2025-04-15 08", null],
        ["2025-04-15 09", null],
        ["2025-04-15 10", null],
        ["2025-04-15 11", null],
        ["2025-04-15 12", null],
        ["2025-04-15 13", null],
        ["2025-04-15 14", null],
        ["2025-04-15 15", null],
        ["2025-04-15 16", null],
        ["2025-04-15 17", null],
        ["2025-04-15 18", null],
        ["2025-04-15 19", null],
        ["2025-04-15 20", null],
        ["2025-04-15 21", null],
        ["2025-04-15 22", null],
        ["2025-04-15 23", null],
        ["2025-04-16 00", null],
        ["2025-04-16 01", null],
        ["2025-04-16 02", null],
        ["2025-04-16 03", null],
        ["2025-04-16 04", null],
        ["2025-04-16 05", null],
        ["2025-04-16 06", null],
        ["2025-04-16 07", null],
        ["2025-04-16 08", null],
        ["2025-04-16 09", null],
        ["2025-04-16 10", null],
        ["2025-04-16 11", null],
        ["2025-04-16 12", null],
        ["2025-04-16 13", null],
        ["2025-04-16 14", null],
        ["2025-04-16 15", null],
        ["2025-04-16 16", null],
        ["2025-04-16 17", null],
        ["2025-04-16 18", null],
        ["2025-04-16 19", null],
        ["2025-04-16 20", null],
        ["2025-04-16 21", null],
        ["2025-04-16 22", null],
        ["2025-04-16 23", null],
        ["2025-04-17 00", null],
        ["2025-04-17 01", null],
        ["2025-04-17 02", null],
        ["2025-04-17 03", null],
        ["2025-04-17 04", null],
        ["2025-04-17 05", null],
        ["2025-04-17 06", null],
        ["2025-04-17 07", null],
        ["2025-04-17 08", null],
        ["2025-04-17 09", null],
        ["2025-04-17 10", null],
        ["2025-04-17 11", null],
        ["2025-04-17 12", null],
        ["2025-04-17 13", null],
        ["2025-04-17 14", null],
        ["2025-04-17 15", null],
        ["2025-04-17 16", null],
        ["2025-04-17 17", null],
        ["2025-04-17 18", null],
        ["2025-04-17 19", null],
        ["2025-04-17 20", null],
        ["2025-04-17 21", null],
        ["2025-04-17 22", null],
        ["2025-04-17 23", null],
        ["2025-04-18 00", null],
        ["2025-04-18 01", null],
        ["2025-04-18 02", null],
        ["2025-04-18 03", null],
        ["2025-04-18 04", null],
        ["2025-04-18 05", null],
        ["2025-04-18 06", null],
        ["2025-04-18 07", null],
        ["2025-04-18 08", null],
        ["2025-04-18 09", null],
        ["2025-04-18 10", null],
        ["2025-04-18 11", null],
        ["2025-04-18 12", null],
        ["2025-04-18 13", null],
        ["2025-04-18 14", null],
        ["2025-04-18 15", null],
        ["2025-04-18 16", null],
        ["2025-04-18 17", null],
        ["2025-04-18 18", 308.48],
        ["2025-04-18 19", 308.49],
        ["2025-04-18 20", 308.49],
        ["2025-04-18 21", 308.49],
        ["2025-04-18 22", 308.49],
        ["2025-04-18 23", 308.49],
        ["2025-04-19 00", 308.5],
        ["2025-04-19 01", 308.5],
        ["2025-04-19 02", 308.5],
        ["2025-04-19 03", 308.5],
        ["2025-04-19 04", 308.5],
        ["2025-04-19 05", 308.51],
        ["2025-04-19 06", 308.51],
        ["2025-04-19 07", 308.51],
        ["2025-04-19 08", 308.51],
        ["2025-04-19 09", 308.51],
        ["2025-04-19 10", 308.52],
        ["2025-04-19 11", 308.52],
        ["2025-04-19 12", 308.52],
        ["2025-04-19 13", 308.52],
        ["2025-04-19 14", 308.52],
        ["2025-04-19 15", 308.52],
        ["2025-04-19 16", 308.53],
        ["2025-04-19 17", 308.53],
        ["2025-04-19 18", 308.53],
        ["2025-04-19 19", 308.53],
        ["2025-04-19 20", 308.53],
        ["2025-04-19 21", 308.54],
        ["2025-04-19 22", 308.54],
        ["2025-04-19 23", 308.54],
        ["2025-04-20 00", 308.54],
        ["2025-04-20 01", 308.54],
        ["2025-04-20 02", 308.55],
        ["2025-04-20 03", 308.55],
        ["2025-04-20 04", 308.55],
        ["2025-04-20 05", 308.55],
        ["2025-04-20 06", 308.55],
        ["2025-04-20 07", 308.56],
        ["2025-04-20 08", 308.56],
        ["2025-04-20 09", 308.56],
        ["2025-04-20 10", 308.56],
        ["2025-04-20 11", 308.56],
        ["2025-04-20 12", 308.57],
        ["2025-04-20 13", 308.57],
        ["2025-04-20 14", 308.57],
        ["2025-04-20 15", 308.57],
        ["2025-04-20 16", 308.57],
        ["2025-04-20 17", 308.58],
        ["2025-04-20 18", 308.58],
        ["2025-04-20 19", 308.58],
        ["2025-04-20 20", 308.58],
        ["2025-04-20 21", 308.58],
        ["2025-04-20 22", 308.59],
        ["2025-04-20 23", 308.59],
        ["2025-04-21 00", 308.59],
        ["2025-04-21 01", 308.59],
        ["2025-04-21 02", 308.59],
        ["2025-04-21 03", 308.6],
        ["2025-04-21 04", 308.6],
        ["2025-04-21 05", 308.6],
        ["2025-04-21 06", 308.6],
        ["2025-04-21 07", 308.6],
        ["2025-04-21 08", 308.61],
        ["2025-04-21 09", 308.61],
        ["2025-04-21 10", 308.61],
        ["2025-04-21 11", 308.61],
        ["2025-04-21 12", 308.61],
        ["2025-04-21 13", 308.62],
        ["2025-04-21 14", 308.62],
        ["2025-04-21 15", 308.62],
        ["2025-04-21 16", 308.62],
      ],
      lineStyle: {
        opacity: 1,
        color: "#73D000",
      },
      markPoint: {},
    },
  ],
};

export const multipleOption2 = {
  legend: {
    show: true,
    top: 0,
    left: 0,
    itemWidth: 16,
    itemHeight: 16,
    textStyle: {
      color: "#333333",
      fontSize: 14,
    },
    data: [
      {
        name: "汛限水位：53.00m",
        textStyle: {
          color: "#EDC70A",
        },
      },
      {
        name: "设计水位：56.50m",
        textStyle: {
          color: "#FF9900",
        },
      },
      {
        name: "校核水位：57.10m",
        textStyle: {
          color: "#FF0012",
        },
      },
      "库水位",
      "入库流量",
      "出库流量",
    ],
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: "all",
      },
    ],
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1, 2],
      height: 20,
      bottom: 16,
    },
    {
      type: "inside",
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1, 2],
      height: 20,
      bottom: 16,
    },
  ],
  tooltip: {
    className: "echarts-tooltip",
    trigger: "axis",
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "#333333",
        type: "solid",
      },
    },
  },
  grid: [
    {
      left: 60,
      right: 46,
      top: 56,
      bottom: 80,
      show: true,
      borderColor: "#333333",
      borderWidth: 1,
    },
  ],
  xAxis: [
    {
      gridIndex: 0,
      type: "category",
      boundaryGap: false,
      position: "bottom",
      axisLabel: {
        show: true,
        color: "#333333",
        fontSize: 14,
        margin: 8,
      },
      axisLine: {
        onZero: true,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        inside: true,
        lineStyle: {
          color: "#333333",
        },
      },
      splitLine: {
        show: false,
      },
      data: [
        "06-30 17",
        "06-30 18",
        "06-30 19",
        "06-30 20",
        "06-30 21",
        "06-30 22",
        "06-30 23",
        "07-01 00",
        "07-01 01",
        "07-01 02",
        "07-01 03",
        "07-01 04",
        "07-01 05",
        "07-01 06",
        "07-01 07",
        "07-01 08",
        "07-01 09",
        "07-01 10",
        "07-01 11",
        "07-01 12",
        "07-01 13",
        "07-01 14",
        "07-01 15",
        "07-01 16",
        "07-01 17",
        "07-01 18",
        "07-01 19",
        "07-01 20",
        "07-01 21",
        "07-01 22",
        "07-01 23",
        "07-02 00",
        "07-02 01",
        "07-02 02",
        "07-02 03",
        "07-02 04",
        "07-02 05",
        "07-02 06",
        "07-02 07",
        "07-02 08",
        "07-02 09",
        "07-02 10",
        "07-02 11",
        "07-02 12",
        "07-02 13",
        "07-02 14",
        "07-02 15",
        "07-02 16",
        "07-02 17",
        "07-02 18",
        "07-02 19",
        "07-02 20",
        "07-02 21",
        "07-02 22",
        "07-02 23",
        "07-03 00",
        "07-03 01",
        "07-03 02",
        "07-03 03",
        "07-03 04",
        "07-03 05",
        "07-03 06",
        "07-03 07",
        "07-03 08",
        "07-03 09",
        "07-03 10",
        "07-03 11",
        "07-03 12",
        "07-03 13",
        "07-03 14",
        "07-03 15",
        "07-03 16",
        "07-03 17",
        "07-03 18",
        "07-03 19",
        "07-03 20",
        "07-03 21",
        "07-03 22",
        "07-03 23",
        "07-04 00",
        "07-04 01",
        "07-04 02",
        "07-04 03",
        "07-04 04",
        "07-04 05",
        "07-04 06",
        "07-04 07",
        "07-04 08",
        "07-04 09",
        "07-04 10",
        "07-04 11",
        "07-04 12",
        "07-04 13",
        "07-04 14",
        "07-04 15",
        "07-04 16",
        "07-04 17",
        "07-04 18",
        "07-04 19",
        "07-04 20",
        "07-04 21",
        "07-04 22",
        "07-04 23",
        "07-05 00",
        "07-05 01",
        "07-05 02",
        "07-05 03",
        "07-05 04",
        "07-05 05",
        "07-05 06",
        "07-05 07",
        "07-05 08",
        "07-05 09",
        "07-05 10",
        "07-05 11",
        "07-05 12",
        "07-05 13",
        "07-05 14",
        "07-05 15",
        "07-05 16",
        "07-05 17",
        "07-05 18",
        "07-05 19",
        "07-05 20",
        "07-05 21",
        "07-05 22",
        "07-05 23",
        "07-06 00",
        "07-06 01",
        "07-06 02",
        "07-06 03",
        "07-06 04",
        "07-06 05",
        "07-06 06",
        "07-06 07",
        "07-06 08",
        "07-06 09",
        "07-06 10",
        "07-06 11",
        "07-06 12",
        "07-06 13",
        "07-06 14",
        "07-06 15",
        "07-06 16",
        "07-06 17",
        "07-06 18",
        "07-06 19",
        "07-06 20",
        "07-06 21",
        "07-06 22",
        "07-06 23",
        "07-07 00",
        "07-07 01",
        "07-07 02",
        "07-07 03",
        "07-07 04",
        "07-07 05",
        "07-07 06",
        "07-07 07",
        "07-07 08",
        "07-07 09",
        "07-07 10",
        "07-07 11",
        "07-07 12",
        "07-07 13",
        "07-07 14",
        "07-07 15",
        "07-07 16",
        "07-07 17",
        "07-07 18",
        "07-07 19",
        "07-07 20",
        "07-07 21",
        "07-07 22",
        "07-07 23",
        "07-08 00",
        "07-08 01",
        "07-08 02",
        "07-08 03",
        "07-08 04",
        "07-08 05",
        "07-08 06",
        "07-08 07",
        "07-08 08",
        "07-08 09",
        "07-08 10",
        "07-08 11",
        "07-08 12",
        "07-08 13",
        "07-08 14",
        "07-08 15",
        "07-08 16",
        "07-08 17",
        "07-08 18",
        "07-08 19",
        "07-08 20",
        "07-08 21",
        "07-08 22",
        "07-08 23",
        "07-09 00",
        "07-09 01",
        "07-09 02",
        "07-09 03",
        "07-09 04",
        "07-09 05",
        "07-09 06",
        "07-09 07",
        "07-09 08",
        "07-09 09",
        "07-09 10",
        "07-09 11",
        "07-09 12",
        "07-09 13",
        "07-09 14",
        "07-09 15",
        "07-09 16",
        "07-09 17",
        "07-09 18",
        "07-09 19",
        "07-09 20",
        "07-09 21",
        "07-09 22",
        "07-09 23",
        "07-10 00",
        "07-10 01",
        "07-10 02",
        "07-10 03",
        "07-10 04",
        "07-10 05",
        "07-10 06",
        "07-10 07",
        "07-10 08",
        "07-10 09",
        "07-10 10",
        "07-10 11",
        "07-10 12",
        "07-10 13",
        "07-10 14",
        "07-10 15",
        "07-10 16",
        "07-10 17",
        "07-10 18",
        "07-10 19",
        "07-10 20",
        "07-10 21",
        "07-10 22",
        "07-10 23",
        "07-11 00",
        "07-11 01",
        "07-11 02",
        "07-11 03",
        "07-11 04",
        "07-11 05",
        "07-11 06",
        "07-11 07",
        "07-11 08",
        "07-11 09",
        "07-11 10",
        "07-11 11",
        "07-11 12",
        "07-11 13",
        "07-11 14",
        "07-11 15",
        "07-11 16",
        "07-11 17",
      ],
    },
  ],
  yAxis: [
    {
      min: 50,
      max: 290,
      interval: 40,
      gridIndex: 0,
      type: "value",
      name: "水位(m)",
      nameLocation: "middle",
      nameGap: 48,
      nameTextStyle: {
        fontSize: 12,
        color: "#333333",
      },
      axisLabel: {
        show: true,
        color: "#333333",
        fontSize: 14,
        margin: 8,
        showMaxLabel: true,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        inside: true,
        lineStyle: {
          color: "#333333",
        },
      },
    },
    {
      min: null,
      max: null,
      interval: null,
      gridIndex: 0,
      type: "value",
      name: "流量(m³/s)",
      nameLocation: "middle",
      nameGap: 32,
      nameTextStyle: {
        fontSize: 12,
        color: "#333333",
      },
      axisLabel: {
        show: true,
        color: "#333333",
        fontSize: 14,
        margin: 8,
        showMaxLabel: true,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        inside: true,
        lineStyle: {
          color: "#333333",
        },
      },
    },
  ],
  series: [
    {
      name: "校核水位：57.10m",
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [],
      symbol: "none",
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: "#FF0012",
        type: [6, 4],
      },
      legendHoverLink: false,
      markLine: {
        symbol: ["none", "none"],
        label: {
          show: false,
        },
        lineStyle: {
          color: "#FF0012",
          type: [6, 6],
        },
        data: [
          {
            yAxis: 57.1,
          },
        ],
      },
    },
    {
      name: "设计水位：56.50m",
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [],
      symbol: "none",
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: "#FF9900",
        type: [6, 4],
      },
      legendHoverLink: false,
      markLine: {
        symbol: ["none", "none"],
        label: {
          show: false,
        },
        lineStyle: {
          color: "#FF9900",
          type: [6, 6],
        },
        data: [
          {
            yAxis: 56.5,
          },
        ],
      },
    },
    {
      name: "汛限水位：53.00m",
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [],
      symbol: "none",
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: "#EDC70A",
        type: [6, 4],
      },
      legendHoverLink: false,
      markLine: {
        symbol: ["none", "none"],
        label: {
          show: false,
        },
        lineStyle: {
          color: "#EDC70A",
          type: [6, 6],
        },
        data: [
          {
            yAxis: 53,
          },
        ],
      },
    },
    {
      name: "库水位",
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: "#0346FF",
      },
      data: [
        ["06-30 17", "260.80"],
        ["06-30 18", "260.80"],
        ["06-30 19", "260.80"],
        ["06-30 20", "260.80"],
        ["06-30 21", "260.80"],
        ["06-30 22", "260.79"],
        ["06-30 23", "260.79"],
        ["07-01 00", "260.79"],
        ["07-01 01", "260.79"],
        ["07-01 02", "260.81"],
        ["07-01 03", "260.84"],
        ["07-01 04", "260.92"],
        ["07-01 05", "261.12"],
        ["07-01 06", "261.40"],
        ["07-01 07", "261.66"],
        ["07-01 08", "261.85"],
        ["07-01 09", "262.05"],
        ["07-01 10", "262.18"],
        ["07-01 11", "262.32"],
        ["07-01 12", "262.43"],
        ["07-01 13", "262.51"],
        ["07-01 14", "262.59"],
        ["07-01 15", "262.66"],
        ["07-01 16", "262.73"],
        ["07-01 17", "262.78"],
        ["07-01 18", "262.84"],
        ["07-01 19", "262.88"],
        ["07-01 20", "262.92"],
        ["07-01 21", "262.96"],
        ["07-01 22", "263.00"],
        ["07-01 23", "263.03"],
        ["07-02 00", "263.06"],
        ["07-02 01", "263.09"],
        ["07-02 02", "263.12"],
        ["07-02 03", "263.15"],
        ["07-02 04", "263.17"],
        ["07-02 05", "263.20"],
        ["07-02 06", "263.21"],
        ["07-02 07", "263.23"],
        ["07-02 08", "263.25"],
        ["07-02 09", "263.28"],
        ["07-02 10", "263.30"],
        ["07-02 11", "263.31"],
        ["07-02 12", "263.34"],
        ["07-02 13", "263.35"],
        ["07-02 14", "263.44"],
        ["07-02 15", "263.45"],
        ["07-02 16", "263.47"],
        ["07-02 17", "263.48"],
        ["07-02 18", "263.50"],
        ["07-02 19", "263.51"],
        ["07-02 20", "263.53"],
        ["07-02 21", "263.55"],
        ["07-02 22", "263.58"],
        ["07-02 23", "263.60"],
        ["07-03 00", "263.66"],
        ["07-03 01", "263.71"],
        ["07-03 02", "263.76"],
        ["07-03 03", "263.50"],
        ["07-03 04", "263.83"],
        ["07-03 05", "263.86"],
        ["07-03 06", "263.90"],
        ["07-03 07", "263.91"],
        ["07-03 08", "263.94"],
        ["07-03 09", "263.97"],
        ["07-03 10", "263.99"],
        ["07-03 11", "264.02"],
        ["07-03 12", "264.03"],
        ["07-03 13", "264.05"],
        ["07-03 14", "264.06"],
        ["07-03 15", "264.08"],
        ["07-03 16", "264.09"],
        ["07-03 17", "264.11"],
        ["07-03 18", "264.12"],
        ["07-03 19", "264.13"],
        ["07-03 20", "264.15"],
        ["07-03 21", "264.16"],
        ["07-03 22", "264.17"],
        ["07-03 23", "264.18"],
        ["07-04 00", "264.18"],
        ["07-04 01", "264.19"],
        ["07-04 02", "264.20"],
        ["07-04 03", "264.21"],
        ["07-04 04", "264.22"],
        ["07-04 05", "264.23"],
        ["07-04 06", "264.23"],
        ["07-04 07", "264.24"],
        ["07-04 08", "264.25"],
        ["07-04 09", "264.26"],
        ["07-04 10", "264.26"],
        ["07-04 11", "264.27"],
        ["07-04 12", "264.28"],
        ["07-04 13", "264.29"],
        ["07-04 14", "264.29"],
        ["07-04 15", "264.30"],
        ["07-04 16", "264.31"],
        ["07-04 17", "264.31"],
        ["07-04 18", "264.32"],
        ["07-04 19", "264.32"],
        ["07-04 20", "264.33"],
        ["07-04 21", "264.35"],
        ["07-04 22", "264.35"],
        ["07-04 23", "264.36"],
        ["07-05 00", "264.36"],
        ["07-05 01", "264.37"],
        ["07-05 02", "264.37"],
        ["07-05 03", "264.37"],
        ["07-05 04", "264.38"],
        ["07-05 05", "264.39"],
        ["07-05 06", "264.40"],
        ["07-05 07", "264.38"],
        ["07-05 08", "264.39"],
        ["07-05 09", "264.41"],
        ["07-05 10", "264.41"],
        ["07-05 11", "264.42"],
        ["07-05 12", "264.42"],
        ["07-05 13", "264.43"],
        ["07-05 14", "264.43"],
        ["07-05 15", "264.43"],
        ["07-05 16", "264.44"],
        ["07-05 17", "264.44"],
        ["07-05 18", "264.44"],
        ["07-05 19", "264.44"],
        ["07-05 20", "264.44"],
        ["07-05 21", "264.44"],
        ["07-05 22", "264.44"],
        ["07-05 23", "264.44"],
        ["07-06 00", "264.44"],
        ["07-06 01", "264.45"],
        ["07-06 02", "264.45"],
        ["07-06 03", "264.45"],
        ["07-06 04", "264.45"],
        ["07-06 05", "264.45"],
        ["07-06 06", "264.45"],
        ["07-06 07", "264.45"],
        ["07-06 08", "264.44"],
        ["07-06 09", "264.45"],
        ["07-06 10", "264.45"],
        ["07-06 11", "264.45"],
        ["07-06 12", "264.46"],
        ["07-06 13", "264.46"],
        ["07-06 14", "264.46"],
        ["07-06 15", "264.46"],
        ["07-06 16", "264.46"],
        ["07-06 17", "264.47"],
        ["07-06 18", "264.46"],
        ["07-06 19", "264.46"],
        ["07-06 20", "264.46"],
        ["07-06 21", "264.45"],
        ["07-06 22", "264.46"],
        ["07-06 23", "264.43"],
        ["07-07 00", "264.46"],
        ["07-07 01", "264.47"],
        ["07-07 02", "264.48"],
        ["07-07 03", "264.44"],
        ["07-07 04", "264.47"],
        ["07-07 05", "264.47"],
        ["07-07 06", "264.47"],
        ["07-07 07", "264.43"],
        ["07-07 08", "264.46"],
        ["07-07 09", "264.44"],
        ["07-07 10", "264.44"],
        ["07-07 11", "264.44"],
        ["07-07 12", "264.48"],
        ["07-07 13", "264.48"],
        ["07-07 14", "264.45"],
        ["07-07 15", "264.49"],
        ["07-07 16", "264.49"],
        ["07-07 17", "264.45"],
        ["07-07 18", "264.49"],
        ["07-07 19", "264.49"],
        ["07-07 20", "264.49"],
        ["07-07 21", "264.49"],
        ["07-07 22", "264.49"],
        ["07-07 23", "264.49"],
        ["07-08 00", "264.49"],
        ["07-08 01", "264.49"],
        ["07-08 02", "264.49"],
        ["07-08 03", "264.49"],
        ["07-08 04", "264.49"],
        ["07-08 05", "264.46"],
        ["07-08 06", "264.46"],
        ["07-08 07", "264.46"],
        ["07-08 08", "264.46"],
        ["07-08 09", "264.46"],
        ["07-08 10", "264.46"],
        ["07-08 11", "264.46"],
        ["07-08 12", "264.46"],
        ["07-08 13", "264.46"],
        ["07-08 14", "264.46"],
        ["07-08 15", "264.46"],
        ["07-08 16", "264.47"],
        ["07-08 17", "264.46"],
        ["07-08 18", "264.49"],
        ["07-08 19", "264.50"],
        ["07-08 20", "264.50"],
        ["07-08 21", "264.46"],
        ["07-08 22", "264.46"],
        ["07-08 23", "264.46"],
        ["07-09 00", "264.46"],
        ["07-09 01", "264.46"],
        ["07-09 02", "264.46"],
        ["07-09 03", "264.46"],
        ["07-09 04", "264.46"],
        ["07-09 05", "264.46"],
        ["07-09 06", "264.46"],
        ["07-09 07", "264.45"],
        ["07-09 08", "264.45"],
        ["07-09 09", "264.45"],
        ["07-09 10", "264.45"],
        ["07-09 11", "264.46"],
        ["07-09 12", "264.46"],
        ["07-09 13", "264.46"],
        ["07-09 14", "264.46"],
        ["07-09 15", "264.46"],
        ["07-09 16", "264.46"],
        ["07-09 17", "264.46"],
        ["07-09 18", "264.46"],
        ["07-09 19", "264.46"],
        ["07-09 20", "264.46"],
        ["07-09 21", "264.46"],
        ["07-09 22", "264.45"],
        ["07-09 23", "264.46"],
        ["07-10 00", "264.49"],
        ["07-10 01", "264.49"],
        ["07-10 02", "264.45"],
        ["07-10 03", "264.47"],
        ["07-10 04", "264.47"],
        ["07-10 05", "264.48"],
        ["07-10 06", "264.48"],
        ["07-10 07", "264.48"],
        ["07-10 08", "264.49"],
        ["07-10 09", "264.49"],
        ["07-10 10", "264.50"],
        ["07-10 11", "264.51"],
        ["07-10 12", "264.52"],
        ["07-10 13", "264.52"],
        ["07-10 14", "264.53"],
        ["07-10 15", "264.54"],
        ["07-10 16", "264.54"],
        ["07-10 17", "264.55"],
        ["07-10 18", "264.55"],
        ["07-10 19", "264.56"],
        ["07-10 20", "264.62"],
        ["07-10 21", "264.61"],
        ["07-10 22", "264.63"],
        ["07-10 23", "264.66"],
        ["07-11 00", "264.69"],
        ["07-11 01", "264.71"],
        ["07-11 02", "264.74"],
        ["07-11 03", "264.77"],
        ["07-11 04", "264.83"],
        ["07-11 05", "264.81"],
        ["07-11 06", "264.84"],
        ["07-11 07", "264.86"],
        ["07-11 08", "264.89"],
        ["07-11 09", "264.95"],
        ["07-11 10", "264.95"],
        ["07-11 11", "265.00"],
        ["07-11 12", "265.05"],
        ["07-11 13", "265.14"],
        ["07-11 14", "265.16"],
        ["07-11 15", "265.18"],
        ["07-11 16", "265.26"],
      ],
    },
    {
      name: "入库流量",
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 1,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: "#55C10A",
      },
      data: [
        ["06-30 17", "-"],
        ["06-30 18", "-"],
        ["06-30 19", "-"],
        ["06-30 20", "-"],
        ["06-30 21", "-"],
        ["06-30 22", "-"],
        ["06-30 23", "-"],
        ["07-01 00", "-"],
        ["07-01 01", "-"],
        ["07-01 02", "-"],
        ["07-01 03", "-"],
        ["07-01 04", "-"],
        ["07-01 05", "-"],
        ["07-01 06", "-"],
        ["07-01 07", "-"],
        ["07-01 08", "-"],
        ["07-01 09", "-"],
        ["07-01 10", "-"],
        ["07-01 11", "-"],
        ["07-01 12", "-"],
        ["07-01 13", "-"],
        ["07-01 14", "-"],
        ["07-01 15", "-"],
        ["07-01 16", "-"],
        ["07-01 17", "-"],
        ["07-01 18", "-"],
        ["07-01 19", "-"],
        ["07-01 20", "-"],
        ["07-01 21", "-"],
        ["07-01 22", "-"],
        ["07-01 23", "-"],
        ["07-02 00", "-"],
        ["07-02 01", "-"],
        ["07-02 02", "-"],
        ["07-02 03", "-"],
        ["07-02 04", "-"],
        ["07-02 05", "-"],
        ["07-02 06", "-"],
        ["07-02 07", "-"],
        ["07-02 08", "-"],
        ["07-02 09", "-"],
        ["07-02 10", "-"],
        ["07-02 11", "-"],
        ["07-02 12", "-"],
        ["07-02 13", "-"],
        ["07-02 14", "-"],
        ["07-02 15", "-"],
        ["07-02 16", "-"],
        ["07-02 17", "-"],
        ["07-02 18", "-"],
        ["07-02 19", "-"],
        ["07-02 20", "-"],
        ["07-02 21", "-"],
        ["07-02 22", "-"],
        ["07-02 23", "-"],
        ["07-03 00", "-"],
        ["07-03 01", "-"],
        ["07-03 02", "-"],
        ["07-03 03", "-"],
        ["07-03 04", "-"],
        ["07-03 05", "-"],
        ["07-03 06", "-"],
        ["07-03 07", "-"],
        ["07-03 08", "-"],
        ["07-03 09", "-"],
        ["07-03 10", "-"],
        ["07-03 11", "-"],
        ["07-03 12", "-"],
        ["07-03 13", "-"],
        ["07-03 14", "-"],
        ["07-03 15", "-"],
        ["07-03 16", "-"],
        ["07-03 17", "-"],
        ["07-03 18", "-"],
        ["07-03 19", "-"],
        ["07-03 20", "-"],
        ["07-03 21", "-"],
        ["07-03 22", "-"],
        ["07-03 23", "-"],
        ["07-04 00", "-"],
        ["07-04 01", "-"],
        ["07-04 02", "-"],
        ["07-04 03", "-"],
        ["07-04 04", "-"],
        ["07-04 05", "-"],
        ["07-04 06", "-"],
        ["07-04 07", "-"],
        ["07-04 08", "-"],
        ["07-04 09", "-"],
        ["07-04 10", "-"],
        ["07-04 11", "-"],
        ["07-04 12", "-"],
        ["07-04 13", "-"],
        ["07-04 14", "-"],
        ["07-04 15", "-"],
        ["07-04 16", "-"],
        ["07-04 17", "-"],
        ["07-04 18", "-"],
        ["07-04 19", "-"],
        ["07-04 20", "-"],
        ["07-04 21", "-"],
        ["07-04 22", "-"],
        ["07-04 23", "-"],
        ["07-05 00", "-"],
        ["07-05 01", "-"],
        ["07-05 02", "-"],
        ["07-05 03", "-"],
        ["07-05 04", "-"],
        ["07-05 05", "-"],
        ["07-05 06", "-"],
        ["07-05 07", "-"],
        ["07-05 08", "-"],
        ["07-05 09", "-"],
        ["07-05 10", "-"],
        ["07-05 11", "-"],
        ["07-05 12", "-"],
        ["07-05 13", "-"],
        ["07-05 14", "-"],
        ["07-05 15", "-"],
        ["07-05 16", "-"],
        ["07-05 17", "-"],
        ["07-05 18", "-"],
        ["07-05 19", "-"],
        ["07-05 20", "-"],
        ["07-05 21", "-"],
        ["07-05 22", "-"],
        ["07-05 23", "-"],
        ["07-06 00", "-"],
        ["07-06 01", "-"],
        ["07-06 02", "-"],
        ["07-06 03", "-"],
        ["07-06 04", "-"],
        ["07-06 05", "-"],
        ["07-06 06", "-"],
        ["07-06 07", "-"],
        ["07-06 08", "-"],
        ["07-06 09", "-"],
        ["07-06 10", "-"],
        ["07-06 11", "-"],
        ["07-06 12", "-"],
        ["07-06 13", "-"],
        ["07-06 14", "-"],
        ["07-06 15", "-"],
        ["07-06 16", "-"],
        ["07-06 17", "-"],
        ["07-06 18", "-"],
        ["07-06 19", "-"],
        ["07-06 20", "-"],
        ["07-06 21", "-"],
        ["07-06 22", "-"],
        ["07-06 23", "-"],
        ["07-07 00", "-"],
        ["07-07 01", "-"],
        ["07-07 02", "-"],
        ["07-07 03", "-"],
        ["07-07 04", "-"],
        ["07-07 05", "-"],
        ["07-07 06", "-"],
        ["07-07 07", "-"],
        ["07-07 08", "-"],
        ["07-07 09", "-"],
        ["07-07 10", "-"],
        ["07-07 11", "-"],
        ["07-07 12", "-"],
        ["07-07 13", "-"],
        ["07-07 14", "-"],
        ["07-07 15", "-"],
        ["07-07 16", "-"],
        ["07-07 17", "-"],
        ["07-07 18", "-"],
        ["07-07 19", "-"],
        ["07-07 20", "-"],
        ["07-07 21", "-"],
        ["07-07 22", "-"],
        ["07-07 23", "-"],
        ["07-08 00", "-"],
        ["07-08 01", "-"],
        ["07-08 02", "-"],
        ["07-08 03", "-"],
        ["07-08 04", "-"],
        ["07-08 05", "-"],
        ["07-08 06", "-"],
        ["07-08 07", "-"],
        ["07-08 08", "-"],
        ["07-08 09", "-"],
        ["07-08 10", "-"],
        ["07-08 11", "-"],
        ["07-08 12", "-"],
        ["07-08 13", "-"],
        ["07-08 14", "-"],
        ["07-08 15", "-"],
        ["07-08 16", "-"],
        ["07-08 17", "-"],
        ["07-08 18", "-"],
        ["07-08 19", "-"],
        ["07-08 20", "-"],
        ["07-08 21", "-"],
        ["07-08 22", "-"],
        ["07-08 23", "-"],
        ["07-09 00", "-"],
        ["07-09 01", "-"],
        ["07-09 02", "-"],
        ["07-09 03", "-"],
        ["07-09 04", "-"],
        ["07-09 05", "-"],
        ["07-09 06", "-"],
        ["07-09 07", "-"],
        ["07-09 08", "-"],
        ["07-09 09", "-"],
        ["07-09 10", "-"],
        ["07-09 11", "-"],
        ["07-09 12", "-"],
        ["07-09 13", "-"],
        ["07-09 14", "-"],
        ["07-09 15", "-"],
        ["07-09 16", "-"],
        ["07-09 17", "-"],
        ["07-09 18", "-"],
        ["07-09 19", "-"],
        ["07-09 20", "-"],
        ["07-09 21", "-"],
        ["07-09 22", "-"],
        ["07-09 23", "-"],
        ["07-10 00", "-"],
        ["07-10 01", "-"],
        ["07-10 02", "-"],
        ["07-10 03", "-"],
        ["07-10 04", "-"],
        ["07-10 05", "-"],
        ["07-10 06", "-"],
        ["07-10 07", "-"],
        ["07-10 08", "-"],
        ["07-10 09", "-"],
        ["07-10 10", "-"],
        ["07-10 11", "-"],
        ["07-10 12", "-"],
        ["07-10 13", "-"],
        ["07-10 14", "-"],
        ["07-10 15", "-"],
        ["07-10 16", "-"],
        ["07-10 17", "-"],
        ["07-10 18", "-"],
        ["07-10 19", "-"],
        ["07-10 20", "-"],
        ["07-10 21", "-"],
        ["07-10 22", "-"],
        ["07-10 23", "-"],
        ["07-11 00", "-"],
        ["07-11 01", "-"],
        ["07-11 02", "-"],
        ["07-11 03", "-"],
        ["07-11 04", "-"],
        ["07-11 05", "-"],
        ["07-11 06", "-"],
        ["07-11 07", "-"],
        ["07-11 08", "-"],
        ["07-11 09", "-"],
        ["07-11 10", "-"],
        ["07-11 11", "-"],
        ["07-11 12", "-"],
        ["07-11 13", "-"],
        ["07-11 14", "-"],
        ["07-11 15", "-"],
        ["07-11 16", "-"],
      ],
    },
    {
      name: "出库流量",
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 1,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: "#BA60FF",
      },
      data: [
        ["06-30 17", "-"],
        ["06-30 18", "-"],
        ["06-30 19", "-"],
        ["06-30 20", "-"],
        ["06-30 21", "-"],
        ["06-30 22", "-"],
        ["06-30 23", "-"],
        ["07-01 00", "-"],
        ["07-01 01", "-"],
        ["07-01 02", "-"],
        ["07-01 03", "-"],
        ["07-01 04", "-"],
        ["07-01 05", "-"],
        ["07-01 06", "-"],
        ["07-01 07", "-"],
        ["07-01 08", "-"],
        ["07-01 09", "-"],
        ["07-01 10", "-"],
        ["07-01 11", "-"],
        ["07-01 12", "-"],
        ["07-01 13", "-"],
        ["07-01 14", "-"],
        ["07-01 15", "-"],
        ["07-01 16", "-"],
        ["07-01 17", "-"],
        ["07-01 18", "-"],
        ["07-01 19", "-"],
        ["07-01 20", "-"],
        ["07-01 21", "-"],
        ["07-01 22", "-"],
        ["07-01 23", "-"],
        ["07-02 00", "-"],
        ["07-02 01", "-"],
        ["07-02 02", "-"],
        ["07-02 03", "-"],
        ["07-02 04", "-"],
        ["07-02 05", "-"],
        ["07-02 06", "-"],
        ["07-02 07", "-"],
        ["07-02 08", "-"],
        ["07-02 09", "-"],
        ["07-02 10", "-"],
        ["07-02 11", "-"],
        ["07-02 12", "-"],
        ["07-02 13", "-"],
        ["07-02 14", "-"],
        ["07-02 15", "-"],
        ["07-02 16", "-"],
        ["07-02 17", "-"],
        ["07-02 18", "-"],
        ["07-02 19", "-"],
        ["07-02 20", "-"],
        ["07-02 21", "-"],
        ["07-02 22", "-"],
        ["07-02 23", "-"],
        ["07-03 00", "-"],
        ["07-03 01", "-"],
        ["07-03 02", "-"],
        ["07-03 03", "-"],
        ["07-03 04", "-"],
        ["07-03 05", "-"],
        ["07-03 06", "-"],
        ["07-03 07", "-"],
        ["07-03 08", "-"],
        ["07-03 09", "-"],
        ["07-03 10", "-"],
        ["07-03 11", "-"],
        ["07-03 12", "-"],
        ["07-03 13", "-"],
        ["07-03 14", "-"],
        ["07-03 15", "-"],
        ["07-03 16", "-"],
        ["07-03 17", "-"],
        ["07-03 18", "-"],
        ["07-03 19", "-"],
        ["07-03 20", "-"],
        ["07-03 21", "-"],
        ["07-03 22", "-"],
        ["07-03 23", "-"],
        ["07-04 00", "-"],
        ["07-04 01", "-"],
        ["07-04 02", "-"],
        ["07-04 03", "-"],
        ["07-04 04", "-"],
        ["07-04 05", "-"],
        ["07-04 06", "-"],
        ["07-04 07", "-"],
        ["07-04 08", "-"],
        ["07-04 09", "-"],
        ["07-04 10", "-"],
        ["07-04 11", "-"],
        ["07-04 12", "-"],
        ["07-04 13", "-"],
        ["07-04 14", "-"],
        ["07-04 15", "-"],
        ["07-04 16", "-"],
        ["07-04 17", "-"],
        ["07-04 18", "-"],
        ["07-04 19", "-"],
        ["07-04 20", "-"],
        ["07-04 21", "-"],
        ["07-04 22", "-"],
        ["07-04 23", "-"],
        ["07-05 00", "-"],
        ["07-05 01", "-"],
        ["07-05 02", "-"],
        ["07-05 03", "-"],
        ["07-05 04", "-"],
        ["07-05 05", "-"],
        ["07-05 06", "-"],
        ["07-05 07", "-"],
        ["07-05 08", "-"],
        ["07-05 09", "-"],
        ["07-05 10", "-"],
        ["07-05 11", "-"],
        ["07-05 12", "-"],
        ["07-05 13", "-"],
        ["07-05 14", "-"],
        ["07-05 15", "-"],
        ["07-05 16", "-"],
        ["07-05 17", "-"],
        ["07-05 18", "-"],
        ["07-05 19", "-"],
        ["07-05 20", "-"],
        ["07-05 21", "-"],
        ["07-05 22", "-"],
        ["07-05 23", "-"],
        ["07-06 00", "-"],
        ["07-06 01", "-"],
        ["07-06 02", "-"],
        ["07-06 03", "-"],
        ["07-06 04", "-"],
        ["07-06 05", "-"],
        ["07-06 06", "-"],
        ["07-06 07", "-"],
        ["07-06 08", "-"],
        ["07-06 09", "-"],
        ["07-06 10", "-"],
        ["07-06 11", "-"],
        ["07-06 12", "-"],
        ["07-06 13", "-"],
        ["07-06 14", "-"],
        ["07-06 15", "-"],
        ["07-06 16", "-"],
        ["07-06 17", "-"],
        ["07-06 18", "-"],
        ["07-06 19", "-"],
        ["07-06 20", "-"],
        ["07-06 21", "-"],
        ["07-06 22", "-"],
        ["07-06 23", "-"],
        ["07-07 00", "-"],
        ["07-07 01", "-"],
        ["07-07 02", "-"],
        ["07-07 03", "-"],
        ["07-07 04", "-"],
        ["07-07 05", "-"],
        ["07-07 06", "-"],
        ["07-07 07", "-"],
        ["07-07 08", "-"],
        ["07-07 09", "-"],
        ["07-07 10", "-"],
        ["07-07 11", "-"],
        ["07-07 12", "-"],
        ["07-07 13", "-"],
        ["07-07 14", "-"],
        ["07-07 15", "-"],
        ["07-07 16", "-"],
        ["07-07 17", "-"],
        ["07-07 18", "-"],
        ["07-07 19", "-"],
        ["07-07 20", "-"],
        ["07-07 21", "-"],
        ["07-07 22", "-"],
        ["07-07 23", "-"],
        ["07-08 00", "-"],
        ["07-08 01", "-"],
        ["07-08 02", "-"],
        ["07-08 03", "-"],
        ["07-08 04", "-"],
        ["07-08 05", "-"],
        ["07-08 06", "-"],
        ["07-08 07", "-"],
        ["07-08 08", "-"],
        ["07-08 09", "-"],
        ["07-08 10", "-"],
        ["07-08 11", "-"],
        ["07-08 12", "-"],
        ["07-08 13", "-"],
        ["07-08 14", "-"],
        ["07-08 15", "-"],
        ["07-08 16", "-"],
        ["07-08 17", "-"],
        ["07-08 18", "-"],
        ["07-08 19", "-"],
        ["07-08 20", "-"],
        ["07-08 21", "-"],
        ["07-08 22", "-"],
        ["07-08 23", "-"],
        ["07-09 00", "-"],
        ["07-09 01", "-"],
        ["07-09 02", "-"],
        ["07-09 03", "-"],
        ["07-09 04", "-"],
        ["07-09 05", "-"],
        ["07-09 06", "-"],
        ["07-09 07", "-"],
        ["07-09 08", "-"],
        ["07-09 09", "-"],
        ["07-09 10", "-"],
        ["07-09 11", "-"],
        ["07-09 12", "-"],
        ["07-09 13", "-"],
        ["07-09 14", "-"],
        ["07-09 15", "-"],
        ["07-09 16", "-"],
        ["07-09 17", "-"],
        ["07-09 18", "-"],
        ["07-09 19", "-"],
        ["07-09 20", "-"],
        ["07-09 21", "-"],
        ["07-09 22", "-"],
        ["07-09 23", "-"],
        ["07-10 00", "-"],
        ["07-10 01", "-"],
        ["07-10 02", "-"],
        ["07-10 03", "-"],
        ["07-10 04", "-"],
        ["07-10 05", "-"],
        ["07-10 06", "-"],
        ["07-10 07", "-"],
        ["07-10 08", "-"],
        ["07-10 09", "-"],
        ["07-10 10", "-"],
        ["07-10 11", "-"],
        ["07-10 12", "-"],
        ["07-10 13", "-"],
        ["07-10 14", "-"],
        ["07-10 15", "-"],
        ["07-10 16", "-"],
        ["07-10 17", "-"],
        ["07-10 18", "-"],
        ["07-10 19", "-"],
        ["07-10 20", "-"],
        ["07-10 21", "-"],
        ["07-10 22", "-"],
        ["07-10 23", "-"],
        ["07-11 00", "-"],
        ["07-11 01", "-"],
        ["07-11 02", "-"],
        ["07-11 03", "-"],
        ["07-11 04", "-"],
        ["07-11 05", "-"],
        ["07-11 06", "-"],
        ["07-11 07", "-"],
        ["07-11 08", "-"],
        ["07-11 09", "-"],
        ["07-11 10", "-"],
        ["07-11 11", "-"],
        ["07-11 12", "-"],
        ["07-11 13", "-"],
        ["07-11 14", "-"],
        ["07-11 15", "-"],
        ["07-11 16", "-"],
      ],
    },
  ],
};
