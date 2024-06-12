import { toFixed, getType } from './common';

// 基准大小
const baseSize = 16;
// 1920*1080
const DESIGN_WIDTH = 1920;
const DESIGN_Height = 1080;
function setFontsize() {
    const widthScale = window.innerWidth / DESIGN_WIDTH; // 当前窗口的宽度
    const heightScale = window.innerHeight / DESIGN_Height; // 当前窗口的高度
    const scale = Math.min(widthScale, heightScale);
    document.documentElement.style.fontSize = `${baseSize * scale}px`;
}

setFontsize();

window.addEventListener('resize', setFontsize, false);

export function scaleFontSize(size) {
    const widthScale = window.innerWidth / DESIGN_WIDTH; // 当前窗口的宽度
    const heightScale = window.innerHeight / DESIGN_Height; // 当前窗口的高度
    const scale = Math.min(widthScale, heightScale);
    //返回大小
    return toFixed(scale * size, 2);
}

const resizeKeys = ['fontSize', 'radius', 'top', 'right', 'bottom', 'left', 'barWidth', 'borderWidth', 'width', 'height', 'itemWidth', 'itemHeight', 'length', 'padding', 'margin', 'symbolSize']
export function updateChartSize(opt, kName) {
    const type = getType(opt);
    switch (type) {
        case 'string':
            return opt;
        case 'boolean':
            return opt;
        case 'number':
            if (resizeKeys.indexOf(kName) === -1) {
                return opt;
            } else {
                return scaleFontSize(opt);
            }
        case 'array':
            return opt.reduce((def, item) => {
                def.push(updateChartSize(item, kName));
                return def;
            }, []);
        case 'object':
            var obj = {};
            for (const key in opt) {
                obj[key] = updateChartSize(opt[key], key);
            }
            return obj;
        default:
            return opt;
    }
}

/*
echarts 
使用： echartFontSize(16)
*/

export function scaleFontSizeChart(size) {
    // const designHeight = process.env.VUE_APP_DESIGN_SCREEN_HEIGHT
    const scale = window.innerHeight / 1080 // 根据1080P设计的高度按比例缩放
    return toFixed(scale * size, 5)
}

export function echartFontSize(res) {
    return scaleFontSizeChart(res)
}
