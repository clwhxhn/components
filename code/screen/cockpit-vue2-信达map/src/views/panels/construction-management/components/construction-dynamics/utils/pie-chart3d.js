function getParametricEquation(
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x(u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y(u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z(u, v) {
      // if (u < -Math.PI * 0.5) {
      //   return Math.sin(u);
      // }
      // if (u > Math.PI * 2.5) {
      //   return Math.sin(u) * h * 0.1;
      // }
      // 返回固定值可以让扇形图里每一项的高度都一致
      return Math.sin(v) > 0 ? 2 : -2;
    },
  };
}

/**
 * 生成3d 饼状图的option
 * @param {*} pieData 图表数据
 * @param {*} internalDiameterRatio 透明的空心占比
 * @param {*} getHeight3D 计算高度的函数
 * @returns
 */
export function getPie3D(pieData, internalDiameterRatio, getHeight3D) {
  const series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const k = 1 - internalDiameterRatio;
  pieData.sort((a, b) => {
    return b.value - a.value;
  });
  // 为每一个饼图数据，生成一个 series-surface(参数曲面) 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    const seriesItem = {
      //系统名称
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      //是否为参数曲面（是）
      parametric: true,
      //曲面图网格线（否）上面一根一根的
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
      // x: 'left', //没用
      //设置饼图在容器中的位置(目前没发现啥用)//第一个调整左右，第二个调整上下
      //   center: ['50%', '100%']
    };

    //曲面的颜色、不透明度等样式。
    if (typeof pieData[i].itemStyle != "undefined") {
      const itemStyle = {};
      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
  }
  //(第二个参数可以设置你这个环形的高低程度)
  const boxHeight = getHeight3D(series, 12); //通过传参设定3d饼/环的高度
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    //图例组件
    legend: {
      show: false,
    },
    //这个可以变形
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    //此处是修改样式的重点
    grid3D: {
      show: false,
      boxHeight: boxHeight, //圆环的高度
      //这是饼图的位置
      // top: '-20.5%',
      // left: '-15%',
      top: "10%",
      left: "0",
      viewControl: {
        projection: "orthographic",
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 30, //角度(这个很重要 调节角度的)
        // alpha: 30, //角度(这个很重要 调节角度的)
        // distance: 10, //调整视角到主体的距离，类似调整zoom(这是整体大小)
        orthographicSize: 100,
        rotateSensitivity: 0, //设置为0无法旋转
        zoomSensitivity: 0, //设置为0无法缩放
        panSensitivity: 0, //设置为0无法平移
        autoRotate: false, //自动旋转
      },
    },
    series: series,
    tooltip: {
      // backgroundColor: '#033b77',
      // borderColor: '#21f2c4',
      textStyle: {
        // color: '#fff',
        fontSize: 12,
      },
      confine: true,
      // eslint-disable-next-line consistent-return
      formatter: (params) => {
        if (
          params.seriesName !== "mouseoutSeries" &&
          params.seriesName !== ""
        ) {
          const count = option.series[params.seriesIndex].pieData.value;
          const bfb = (
            (option.series[params.seriesIndex].pieData.endRatio -
              option.series[params.seriesIndex].pieData.startRatio) *
            100
          ).toFixed(2);
          return (
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${params.seriesName}<br/>` +
            `<span>数量：${count}个</span><br/>` +
            `<span>占比：${bfb}%`
          );
        }
      },
    },
  };
  return option;
}
