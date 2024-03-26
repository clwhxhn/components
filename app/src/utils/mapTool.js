import { getVectorContext } from 'ol/render'; //制作图标动画用上的
import { Fill, Style, Circle, Stroke, Icon } from 'ol/style';

/**
 * 设置图层显示隐藏
 * @param {Object} subMenu - 子菜单对象，包含key属性
 * @param {Array} layers - 图层数组
 * @param {Object} selectShows - 选择显示图层的对象，根据key选择对应图层
 */
export const setLayerShowHide = (subMenu, layers, selectShows) => {
    const { key } = subMenu;

    // 创建图层状态对象
    const layerState = layers.reduce((obj, item) => {
        // 根据选择显示对象中的key属性进行图层状态判断
        obj[item] = selectShows[key].includes(item);
        return obj;
    }, {});

    // 遍历图层数组，如果图层状态对象中没有对应图层，则设置为默认显示
    for (const layer of layers) {
        if (!(layer in layerState)) {
            layerState[layer] = true;
        }
    }

    return layerState;
};

/**
 * 将颜色转换为rgba格式
 * @param {String} color - 颜色
 * @param {String} opacity - 透明度
 *
 */
export const adjustOpacity = (color, opacityKey = 0.7) => {
    if (color === 'transparent') return color;
    // 将透明度从十六进制转换为十进制
    let opacity = parseInt(color.substr(1, 2), 16) / 255;

    // 将透明度设为 0.7，并转换回十六进制
    let newOpacity = Math.round(opacity * opacityKey * 255);
    let newColor = color.substr(0, 7) + newOpacity.toString(16).padStart(2, '0');

    return newColor;
};
/**
 * 设置图标预警动画
 * @param {Object} params - 参数对象
 * @param {Object} params.map - 地图对象
 * @param {Array} params.features - 要素数组
 * @param {Object} params.layer - 图层对象
 * @param {Object} params.colors - 颜色对象
 * @param {String} params.key -预警类型
 * @param {Number} params.speed - 动画速度
 * @param {Number} params.radiusNum - 半径
 * @param {Number} params.width - 线宽
 *
 */
export const iconAnimation = (params) => {
    const { map, features, layer, colors, key, speed = 1, radiusNum = 28, width = 6 } = params;
    //样式中的半径变量，通过不断刷新点样式的半径来实现点动态扩散
    let radius = 1;
    layer.on('postrender', (event) => {
        if (radius >= radiusNum) {
            radius = 0;
        }
        let opacity = (10 - radius) * (1 / 10); //不透明度
        // 外部圈
        const pointStyle = () => {
            return new Style({
                image: new Circle({
                    radius: radius,
                    stroke: new Stroke({
                        //颜色可以根据业务需求改为变量
                        color: `rgba(${colors[1]}, ${opacity})`,
                        width: width,
                    }),
                    scale: [1.4, 0.7], //此处第二位也必须是第一位的一半
                    displacement: [0, -10], // 向下偏移10
                }),
            });
        };
        // 内部圈
        const innerPointStyle = () => {
            return new Style({
                image: new Circle({
                    radius: radius,
                    stroke: new Stroke({
                        //颜色可以根据业务需求改为变量
                        color: `rgba(${colors[1]}, ${opacity})`,
                        width: width,
                    }),
                    scale: [0.9, 0.45], //此处第二位也必须是第一位的一半
                    displacement: [0, -10],
                }),
            });
        };

        let vectorContext = getVectorContext(event);
        features.forEach((fea) => {
            const properties = fea.get('properties');
            //一圈
            vectorContext.drawFeature(fea, pointStyle());
            //内部加一个圈
            vectorContext.drawFeature(fea, innerPointStyle());
        });
    });
    //   map.on('postcompose', () => {
    //     //控制频率，增量越大，速度越快
    //     radius = radius + speed;
    //     //渲染map 触发layer的postrender方法
    //     map.render();
    //   });
    const animate = () => {
        radius += speed;
        if (radius > radiusNum) {
            radius = 0;
        }
        map.render();
        setTimeout(animate, 60)
    };
    animate();

};
