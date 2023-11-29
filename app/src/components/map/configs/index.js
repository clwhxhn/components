// 利用webpack 的require.context自动导入
const req = require.context('./layers', false, /\.js$/)
const layersConfigMap = {}
const path = `./layers`

req.keys().forEach(url => {
  const compName = url.split('/')[1].replace('.js', '')
  layersConfigMap[compName] = () => import(`${path}/${compName}.js`)
})

const getLayerConfigs = () => {
  return Promise.all(
    Object.keys(layersConfigMap).map(key => {
      return layersConfigMap[key]().then(res => {
        return res.config
      })
    })
  ).then(configsArray => {
    const configs = []
    configsArray.forEach(config => {
      configs.push(config)
    })
    return configs
  })
}

export { getLayerConfigs }
