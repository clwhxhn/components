const cbs = [];

/**
 * 判断child是否被parent包含
 * @param {*} child 
 * @param {*} parent 
 * @returns 
 */
function isContain(child, parent) {
  while (child) {
    if (child === document.body) return false;
    if (child === parent) return true;
    child = child.parentElement;
  }
  return false;
}

function onWindowClick(e) {
  cbs.forEach((cb) => {
    cb(e, e.target);
  });
}

function createClickHandler(cb, target) {
  const wrapped = (e, source) => {
    // 判断是否点击的是panel内元素
    const isInside = isContain(source, target);
    if (!isInside) {
      cb(e);
    }
  };
  return wrapped
}

function listen(cb) {
  if (cbs.length === 0) {
    window.addEventListener("click", onWindowClick, true);
  }
  cbs.push(cb);
}

function unlisten(cb) {
  const i = cbs.indexOf(cb);
  if (i > -1) {
    cbs.splice(i, 1);
  }
  if (cbs.length === 0) {
    window.removeEventListener("click", onWindowClick);
  }
}

/**
 * 监听面板外的点击事件
 * @param {*} vm vue实例
 * @param {*} callback 回调函数
 * @param {*} el 面板元素，默认使用vm.$el
 */
export function useOutSideClickListener(vm, callback, el) {
  if (!el) el = vm.$el;
  const wrapped = createClickHandler(callback, el);
  listen(wrapped);
  vm.$once("hook:beforeDestroy", () => {
    unlisten(wrapped)
  });
}
