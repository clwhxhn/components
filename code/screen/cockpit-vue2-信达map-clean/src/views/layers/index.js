const panelChildReq = require.context("/", true, /Layer\.vue$/);

const layerComponentMap = {};

[...panelChildReq.keys()].forEach((url) => {
  const arr = url.split("/");
  const compName = arr[url.split("/").length - 1].replace(".vue", "");
  if (!layerComponentMap[compName]) {
    layerComponentMap[compName] = {};
  }
  if (layerComponentMap[compName]) {
    layerComponentMap[compName]["component"] = () =>
      import(`./${url.substring(2)}`).then((res) => res);
  }
});
export { layerComponentMap };
