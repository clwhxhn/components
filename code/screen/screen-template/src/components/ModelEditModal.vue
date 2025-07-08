<template>
  <div v-show="isModelConfigOpened" class="model-edit-modal select-none">
    <div class="flex-wrap gap-x-2 h-9 mb-4">
      <div class="h-full bg-gray-900 text-white grid place-items-center px-2">
        当前模式 {{ modeText }}
      </div>
      <button
        :disabled="isAddMode"
        class="cursor-pointer px-2"
        @click="addNewModel">
        添加模型到场景
      </button>
      <button class="cursor-pointer px-2" @click="updateAllModelConfigs">
        同步模型列表
      </button>
    </div>

    <div class="flex-wrap gap-4">
      <div class="flex flex-col">
        <h4 class="text-white">场景已有模型：</h4>
        <div class="flex-1 relative w-40">
          <div class="absolute inset-0">
            <ul class="h-full overflow-y-auto space-y-2">
              <li
                v-for="{ tag, name } in allModelInScene"
                :key="tag"
                :class="{
                  'model-list-item': true,
                  'bg-gray-500': isEditMode && modelConfig.tag === tag,
                  'text-white': isEditMode && modelConfig.tag === tag
                }"
                class="bg-gray-200 px-4 py-2 cursor-pointer rounded-sm truncate transition-all select-none"
                @click="selectModelInScene(tag)">
                {{ `[${name}]` }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form class="model-detail-form">
        <fieldset class="flex-column-wrap">
          <label class="text-white" for="model-name">
            场景唯一标识（Tag）：
          </label>
          <div class="flex gap-x-2">
            <input
              id="model-tag"
              v-model="modelConfig.tag"
              :disabled="isEditMode"
              class="flex-1"
              name="tag" />
            <!--            <button-->
            <!--              v-if="isAddMode"-->
            <!--              :disabled="modelConfig.path !== ''"-->
            <!--              class="cursor-pointer px-2"-->
            <!--              @click.prevent="onHandleGenTag">-->
            <!--              生成唯一标识-->
            <!--            </button>-->
          </div>
        </fieldset>

        <!-- <div>
          <div class="text-white">模型:</div>
          <a-select
            :value="modelConfig.path"
            class="w-52"
            placeholder="请选择模型文件"
            size="small"
            @change="onChangeModelFile">
            <a-select-option
              v-for="[modelName, modelPath] in Object.entries(
                allModelConfigObj
              )"
              :key="modelName"
              :value="modelPath">
              {{ modelName }}
            </a-select-option>
          </a-select>
        </div> -->

        <fieldset class="flex-column-wrap">
          <label class="text-white" for="model-name">模型名称：</label>
          <input id="model-name" :value="modelConfig.name" name="name" />
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label class="text-white" for="model-name">
            业务唯一标识（ID）：
          </label>

          <div class="flex gap-x-2">
            <input
              id="model-id"
              v-model.number="modelConfig.dataId"
              class="flex-1"
              name="id" />

            <button
              v-if="isAddMode"
              :disabled="modelConfig.dataId !== ''"
              class="cursor-pointer px-2"
              @click.prevent="onHandleGenBusinessId">
              生成业务唯一标识
            </button>
          </div>
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label
            class="text-white"
            for="location-x"
            @click.prevent="enableTranslate">
            地理位置：
          </label>
          <div class="flex-wrap">
            <input
              id="longitude"
              v-model.number="modelConfig.coords[0]"
              name="longitude"
              @change="onGeoLocationChange" />
            <input
              id="latitude"
              v-model.number="modelConfig.coords[1]"
              name="latitude"
              @change="onGeoLocationChange" />
            <input
              id="height"
              v-model.number="modelConfig.coords[2]"
              name="height"
              @change="onGeoLocationChange" />
          </div>
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label
            class="text-white"
            for="location-x"
            @click.prevent="enableTranslate">
            位置：
          </label>
          <div class="flex-wrap">
            <input
              id="location-x"
              v-model="modelConfig.location[0]"
              name="locationX"
              @change="onLocationChange" />
            <input
              id="location-y"
              v-model="modelConfig.location[1]"
              name="locationY"
              @change="onLocationChange" />
            <input
              id="location-z"
              v-model="modelConfig.location[2]"
              name="locationZ"
              @change="onLocationChange" />
          </div>
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label class="text-white" for="rotation-roll" @click="enableRotate">
            旋转：
          </label>
          <div class="flex-wrap">
            <input
              id="rotation-roll"
              v-model="modelConfig.rotation[0]"
              name="roll" />
            <input
              id="rotation-picth"
              v-model="modelConfig.rotation[1]"
              name="pitch" />
            <input
              id="rotation-yaw"
              v-model="modelConfig.rotation[2]"
              name="yaw" />
          </div>
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label class="text-white" for="scale-x" @click="enableScale">
            缩放：
          </label>
          <div class="flex-wrap">
            <input id="scale-x" v-model="modelConfig.scale[0]" name="scaleX" />
            <input id="scale-y" v-model="modelConfig.scale[1]" name="scaleY" />
            <input id="scale-z" v-model="modelConfig.scale[2]" name="scaleZ" />
          </div>
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label class="text-white" for="view" @click="setModelViewFromUEMC">
            查看视角：
          </label>
          <a-textarea
            v-model:value="modelConfig.view"
            :rows="3"
            allow-clear
            class="max-h-32"
            placeholder="点击上方的获取查看视角label来获取UE中MainCamera的transform信息" />
        </fieldset>

        <fieldset class="flex-column-wrap">
          <label
            class="text-white"
            for="view"
            @click="copySampleDataToClipboard">
            解析：
          </label>
          <a-textarea
            :rows="5"
            allow-clear
            placeholder="把excel中的json数据拷贝到这里之后回车自动填充,点击上方的label来获取样例JSON"
            @press-enter="resolveData" />
        </fieldset>

        <fieldset class="flex-wrap gap-x-2 mt-4 h-8">
          <button
            v-if="isAddMode"
            class="btn-action"
            @click.prevent="submitAddModel">
            创建
          </button>
          <button
            v-if="isEditMode"
            class="btn-action"
            @click.prevent="onDeleteModelConfig">
            删除
          </button>
          <button
            :disabled="modelConfig.view === ''"
            class="px-2"
            @click.prevent="flyToView">
            飞行到相机视角
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { FlyToRelativeLocationCommand, FlyToViewCommand } from '@/ue/command'
import { noop } from '@/utils'
import { useRunningMonitorStore } from '@/stores/runningMonitor'
import modelConfigs from '@/ue/config/modelConfig.json'

/**
 *
 * @param input {String}
 * @return {Object|null}
 */
const tryParseJson = input => {
  try {
    return JSON.parse(input)
  } catch (e) {
    return null
  }
}

const uniKeyGenCreator = ({ start = 0, prefix = '', separator = '' } = {}) => {
  function* keyGenerator() {
    let index = start

    while (true) {
      yield (index += 1)
    }
  }

  const gen = keyGenerator()

  return () => Array.of(prefix, gen.next().value).join(separator)
}

const businessKeyGen = uniKeyGenCreator({
  start: 2000,
  prefix: '业务标识',
  separator: '_'
})

const tagKeyGen = uniKeyGenCreator({
  start: 0,
  prefix: '模型实例',
  separator: '_'
})

const createDefaultModelConfig = () => ({
  tag: '', //  layerId
  path: '', //  modelAssetPath
  name: '', //  modelFileName
  dataId: '', //  businessId
  location: [0, 0, 0], //   x y z
  coords: [0, 0, 0], //  lat lon height
  rotation: [0, 0, 0], //  pitch yaw roll
  scale: [1, 1, 1],
  view: ''
})

const addUEInterface = (funcName, callback) => {
  window.ue.interface[funcName] = callback
}

/**
 * @description Get project root dir string
 * @returns  {Promise<String>}
 */
const getProjectDir = () =>
  new Promise(resolve => {
    window.swdt.fire('getProjectDir', res => {
      resolve(JSON.parse(res).data)
    })
  })

/**
 * @param filePath {String}
 * @returns {Promise<unknown>}
 */
const loadJsonFromFile = filePath => {
  return new Promise((resolve, reject) => {
    addUEInterface('onJSONLoaded', res => {
      resolve(res)
    })

    try {
      const option = {
        filePath,
        callback: 'onJSONLoaded'
      }
      window.swdt.fire('executeBPCustomEvents', {
        bpClass: 'BP_CustomEvents',
        command: 'loadJsonFromFile',
        param: JSON.stringify(option)
      })
    } catch (e) {
      reject(e)
    }
  }).then(tryParseJson)
}

/**
 * @param projDir {String}
 * @returns {Promise<Object>}
 */
const loadModelConfig = projDir => {
  return loadJsonFromFile(`${projDir}Content/Pub/modelPathConfig.json`)
  // return Promise.resolve({
  //   "摄像头球机": 'C:/ebei/20240517/SWDT_EBWT/Content/WLS_QIUJ.FBX',
  //   "摄像头枪机": 'C:/ebei/20240517/SWDT_EBWT/Content/WLS_QJ.FBX',
  //   "摄像头智慧杆": 'C:/ebei/20240517/SWDT_EBWT/Content/WLS_ZHG.FBX'
  // })
}

/**
 * @param projDir {String}
 * @returns {Promise<Object>}
 */
const loadModelListInScene = projDir => {
  // if (import.meta.env.PROD) {
  return loadJsonFromFile(`${projDir}Content/Pub/modelConfig.json`)
  // }

  // const tags = ['摄像头', '浊度计', '渗压计', '激光测距仪', '静力水准仪']
  //
  // const createMockDataItem = (modelName, layerId) => ({
  //   tag: layerId,
  //   path: 'C:/ebei/20240517/SWDT_EBWT/Content/WLS_QIUJ.FBX', //  modelAssetPath
  //   name: '摄像头', //  modelFileName
  //   dataId: Array.of('摄像头', businessKeyGen()).join('_'), //  businessId
  //   location: [-13451262.028014, -5552847.175211, -162580.018015], //  worldPos x y z
  //   coords: [111.864608, 32.487054, 134.073416], //  geoPos lat lon height
  //   rotation: [0, 0, 0],
  //   scale: [1, 1, 1],
  //   view: '{"x":"-13451207.310623","y":"-5552979.738139","z":"-162537.558986","roll":0.067669,"pitch":-39.199900,"yaw":117.551667}'
  // })
  //
  // const mockDataCount = 11
  //
  // return Promise.resolve().then(() =>
  //   Array.from({ length: mockDataCount }).reduce((a, _, i) => {
  //     const layerId = ['模型实例', i].join('_')
  //     return Object.assign(a, {
  //       [layerId]: createMockDataItem(tags[random(0, tags.length - 1)], layerId)
  //     })
  //   }, {})
  // )
}

/**
 * @param lon {Number}
 * @param lat {Number}
 * @param height {Number}
 * @returns {Promise<{x:Number,y:Number,z:Number}|null>}
 */
const transformLonLatHeightToWorld = (lon, lat, height) =>
  new Promise(resolve => {
    window.swdt.fire(
      'transformLonLatHeightToWorld',
      { coords: [lon, lat, height] },
      resolve
    )
  }).then(tryParseJson)

/**
 * @param x {Number}
 * @param y {Number}
 * @param z {Number}
 * @returns {Promise<{lon:Number,lat:Number,height:Number}|null>}
 */
const transformWorldToLonLatHeight = (x, y, z) =>
  new Promise(resolve => {
    window.swdt.fire(
      'transformWorldToLonLatHeight',
      { location: [x, y, z] },
      resolve
    )
  }).then(tryParseJson)

export default {
  name: 'ModelEditModal',
  data() {
    return {
      mode: 'add',

      // allModelConfigObj: {}, //  model list

      modelConfig: createDefaultModelConfig(), //  current
      allModelInScene: [],

      isModelConfigOpened: false
    }
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit'
    },
    isAddMode() {
      return this.mode === 'add'
    },
    modeText() {
      let text = '新增'
      if (this.mode === 'edit') {
        text = '编辑'
      }
      return text
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeyPressHandler)
  },
  async mounted() {
    window.addEventListener(
      'keydown',
      (this.onKeyPressHandler = this.onKeyPressHandler.bind(this))
    )

    // 响应场景编辑按键
    addUEInterface('onShowModelEditForm', () => {
      this.isModelConfigOpened = !this.isModelConfigOpened
    })

    // 避免重复加载模型配置
    if (useRunningMonitorStore().allModelInScene.length) return

    // const projDir = await getProjectDir()

    // ;[{ value: this.allModelConfigObj }, { value: this.allModelInScene }] =
    //   await Promise.allSettled([
    //     loadModelConfig(projDir),
    //     loadModelListInScene(projDir).then(
    //       this.formatModelListInSceneData.bind(this)
    //     )
    //   ])

    // this.allModelConfigObj = await loadModelConfig(projDir)

    this.allModelInScene = await this.formatModelListInSceneData(modelConfigs)

    useRunningMonitorStore().setAllModelData(this.allModelInScene)

    this.updateModelsFromConfig()
  },
  methods: {
    onKeyPressHandler({ code, shiftKey, altKey }) {
      if (shiftKey && altKey && code === 'KeyM') {
        this.isModelConfigOpened = !this.isModelConfigOpened
      }
    },

    async transformViewJson({ view: viewJson, ...modelInfo }) {
      // const [lon, lat, height] = modelInfo.coords
      const { x, y, z, roll, pitch, yaw } = viewJson ?? {}

      // const { lon, lat, height } = await transformWorldToLonLatHeight(x, y, z)

      // console.log({ lon, lat, height })

      return Object.assign({}, modelInfo, {
        view: JSON.stringify({
          location: { x, y, z },
          // coordinate: { x: lon, y: lat, z: height },
          rotation: { roll, pitch, yaw }
        })
      })
    },

    async formatModelListInSceneData(modelMap) {
      const modelInfoList = await Promise.all(
        Object.values(modelMap) // .map(this.extGeoInfo)
      )

      // 映射模型类型和模型文件路径
      // modelInfoList.forEach(m => {
      //   m.path = this.allModelConfigObj[m.type]
      // })

      return Promise.all(modelInfoList.map(m => this.transformViewJson(m)))
    },

    /**
     * @description 因为拿到的数据格式中 全部都只有世界坐标的位置，在这里加入新的地理位置
     * @param modelInfo
     * @returns {Promise<{coords: *[]}>}
     */
    async extGeoInfo(modelInfo) {
      const { location } = modelInfo
      const { lon, lat, height } = await transformWorldToLonLatHeight(
        ...location
      )
      return Object.assign(modelInfo, { coords: [lon, lat, height] })
    },
    onHandleGenTag() {
      this.modelConfig.tag = this.generateUniqueTag()
    },
    onHandleGenBusinessId() {
      this.modelConfig.dataId = this.generateUniqueBusinessId()
    },
    generateUniqueKey(dataList, genMethod) {
      const set = dataList.reduce((s, c) => s.add(c), new Set())
      let newGenItem
      do {
        newGenItem = genMethod()
      } while (set.has(newGenItem))
      return newGenItem
    },
    generateUniqueBusinessId() {
      return this.generateUniqueKey(
        this.allModelInScene.map(v => v.dataId),
        businessKeyGen
      )
    },
    generateUniqueTag() {
      return this.generateUniqueKey(
        this.allModelInScene.map(v => v.tag),
        tagKeyGen
      )
    },
    async onGeoLocationChange() {
      try {
        const { x, y, z } = await transformLonLatHeightToWorld(
          ...this.modelConfig.coords
        )
        this.modelConfig.location = [x, y, z]
      } catch (e) {
        message.warning('异常:转换地理坐标到世界坐标')
        console.warn(e)
      }
    },
    async onLocationChange() {
      try {
        const { lon, lat, height } = await transformWorldToLonLatHeight(
          ...this.modelConfig.location
        )
        this.modelConfig.coords = [lon, lat, height]
      } catch (e) {
        message.warning('异常:转换世界坐标到地理坐标')
        console.warn(e)
      }
    },
    removeModelFromLevel(tag) {
      return !tag
        ? Promise.resolve()
        : new Promise(resolve => {
            window.swdt.fire('removeModelFromLevel', { layerID: tag }, resolve)
          })
    },

    addModelToLevel({
      tag,
      type,
      location = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = [1, 1, 1]
    }) {
      return new Promise(resolve => {
        const params = {
          id: tag,
          type,
          location,
          rotation,
          scale,
          tag
        }

        window.swdt.fire('executeBPCustomEvents', {
          bpClass: 'BP_CustomEvents',
          command: 'addCamera',
          param: JSON.stringify(params)
        })
        resolve()
      })
    },
    updateModelsFromConfig() {
      this.allModelInScene.forEach(async model => {
        const { tag, type, location, rotation, scale } = model
        // 已有场景模型的不添加
        if (
          !tag.startsWith('JZZ_FJKCK') &&
          !tag.startsWith('JXZ_MLDHXJK') &&
          !tag.startsWith('JZZ_MLDHXCK') &&
          !tag.startsWith('TSZ_XJH') &&
          !tag.startsWith('DC_ML') &&
          !tag.startsWith('JXZ_MLQFDHXRK')
        ) {
          await this.removeModelFromLevel(tag)
          this.addModelToLevel({ tag, type, location, rotation, scale })
        }
      })
    },
    async updateAllModelConfigs() {
      const projDir = await getProjectDir()
      // 保存模型场景配置文件
      window.swdt.fire(
        'saveJsonToFile',
        {
          filePath: `${projDir}Content/Pub/modelConfig.json`,
          jsonString: JSON.stringify(
            this.allModelInScene.reduce(
              (a, c) => ({
                ...a,
                [c.tag]: c
              }),
              {}
            )
          )
        },
        () => {
          message.success('保存文件成功.')
        }
      )
    },
    addNewModel() {
      this.changeEditorState('add')
      this.modelConfig = createDefaultModelConfig()
    },
    /**
     * @description 操作场景中的模型
     * @param tag
     * @return {Promise<void>}
     */
    async selectModelInScene(tag) {
      // if (this.isAddMode) {
      //   const currentTag = this.modelConfig.tag
      //   await this.removeModelFromLevel(currentTag)
      // }

      this.changeEditorState('edit')
      this.modelConfig = this.getModelInSceneByTag(tag)

      this.flyToRelative()
    },
    /**
     * @param newMode {'edit'|'add'}
     */
    changeEditorState(newMode) {
      this.mode = newMode
    },
    getModelInSceneByTag(tag) {
      return this.allModelInScene.find(model => model.tag === tag)
    },
    async onChangeModelFile(modelPath) {
      const isUniqueTag = tag => {
        const result = this.isUniqFieldInAllModelInScene('tag', tag)
        if (!result) {
          message.warn(`检查到tag重复, [ ${tag} ]`)
        }
        return result
      }

      const changeModelStrategies = {
        //  Add 现在不会直接添加模型到场景,而是把这个过程推迟到用户点击创建按钮
        add: async () => {
          const {
            modelConfig: { tag }
          } = this

          if (!tag) {
            message.warning(`请先输入 Tag`)
            return
          }

          if (!isUniqueTag(tag)) {
            return
          }

          this.modelConfig.path = modelPath
        },
        //  Edit 会删除之前添加的模型,之后重新添加用户新增的模型
        edit: async () => {
          const {
            modelConfig: { tag, location, rotation, scale, type }
          } = this

          this.modelConfig.path = modelPath

          await this.removeModelFromLevel(tag)

          await this.addModelToLevel({
            tag,
            type,
            location,
            rotation,
            scale
          })

          this.flyToRelative()
        }
      }

      changeModelStrategies[this.mode]?.()
    },
    flyToRelative({ distance = 50, duration = 2 } = {}) {
      const {
        modelConfig: {
          coords: [x, y, z],
          rotation: [pitch, yaw]
        }
      } = this

      new FlyToRelativeLocationCommand({
        x,
        y,
        z,
        pitch,
        yaw,
        distance,
        duration
      }).execute()
    },
    flyToView() {
      new FlyToViewCommand({
        view: tryParseJson(this.modelConfig.view)
      }).execute()
    },
    async onDeleteModelConfig() {
      const {
        modelConfig: { tag }
      } = this

      const deletedIdx = this.allModelInScene.findIndex(
        model => model.tag === tag
      )
      this.allModelInScene = this.allModelInScene.filter(
        model => model.tag !== tag
      )

      let nextEditIdx = -1
      if (this.allModelInScene.length - 1 >= deletedIdx) {
        nextEditIdx = deletedIdx
      } else if (this.allModelInScene.length - 1 < deletedIdx) {
        nextEditIdx = deletedIdx - 1
      }

      await this.removeModelFromLevel(tag)

      if (this.allModelInScene.length > 0) {
        this.modelConfig = this.allModelInScene[nextEditIdx]
      } else {
        this.addNewModel()
      }

      message.success('删除模型成功.')
    },

    isUniqFieldInAllModelInScene(fieldName, newValue) {
      const realSize = this.allModelInScene
        .reduce((set, { [fieldName]: v }) => set.add(v), new Set())
        .add(newValue).size

      const expectedSize = this.allModelInScene.length + 1

      return realSize === expectedSize
    },
    async submitAddModel() {
      const config = this.modelConfig
      const { dataId, tag, type, location, rotation, scale } = config

      const isUniqueBusinessId = () =>
        this.isUniqFieldInAllModelInScene('dataId', dataId)

      if (!type) {
        message.warn('选择要创建模型类型')
        return
      }

      if (!dataId) {
        message.warn('需要填写业务id')
        return
      }

      // 表格验证：新增模式tag唯一
      if (this.getModelInSceneByTag(tag)) {
        message.warn('场景唯一标识重复')
        return
      }

      if (!isUniqueBusinessId()) {
        message.warn('业务唯一标识重复')
        return
      }

      // 仅定位时不保存模型路径 ?? TBC
      // if (config.path.includes('default')) {
      //   config.path = ''
      // }

      //  提交时保证用户的 modelConfig 是有效的
      // if (!this.modelConfig.view) {
      //   await this.setModelViewFromUEMC()
      // }

      await this.addModelToLevel({
        tag,
        type,
        location,
        rotation,
        scale
      })

      this.allModelInScene.unshift(config)

      // await this.setModelLayerTransform()

      this.flyToRelative()

      message.success('保存模型到列表成功.')

      //  用户可以直接继续添加下一个
      this.addNewModel()
    },
    async resolveData({ target: { value: jsonStr } }) {
      const itemData = tryParseJson(jsonStr)
      if (!itemData) {
        message.warning('解析json数据失败，请检查格式')
        return
      }

      const { modelName, modelType, tag, location, viewLocation, viewAngle } =
        itemData

      this.addNewModel()

      this.modelConfig.tag = tag
      this.modelConfig.name = modelName

      // const modelPath = this.allModelConfigObj[modelType]

      // if (modelPath) {
      //   this.onChangeModelFile(modelPath).then(noop)
      // } else {
      //   message.warning('没有找到该模型对应的模型文件在本地')
      // }

      //  解析其他json数据，如果有的话
      if (Array.isArray(location)) {
        this.modelConfig.location = location
        this.onLocationChange().then(noop)
      }

      if (Array.isArray(viewLocation) && Array.isArray(viewAngle)) {
        const [x, y, z] = viewLocation
        const [roll, pitch, yaw] = viewAngle

        if ([x, y, z, roll, pitch, yaw].some(comp => !comp)) {
          message.warning('view 信息不完整，无法构建view信息')
          return
        }

        const modelInfo = Object.assign(this.modelConfig, {
          view: JSON.stringify({
            x,
            y,
            z,
            roll,
            pitch,
            yaw
          })
        })

        this.modelConfig.view = (await this.transformViewJson(modelInfo)).view
      }
    },

    async copySampleDataToClipboard() {
      const sd = {
        tag: 'JXZ_QF_SXT_ZM',
        modelType: '摄像头枪机',
        modelName: 'QF_ZM',
        location: [-7032007.530973, -2596959.374897, -41795.87174],
        viewLocation: [-7032010.006038, -2596977.775795, -41769.574983],
        viewAngle: [-7032010.006038, -2596977.775795, -41769.574983]
      }

      await navigator.clipboard.writeText(JSON.stringify(sd))

      message.success('成功复制了样本数据到剪切板')
    },

    /**
     * @description 获取当前 UE mainCamera 的 transform信息 并且将他填写到 viewJson中
     * @return {Promise<unknown>}
     */
    setModelViewFromUEMC() {
      return new Promise(resolve => {
        window.swdt.fire('getViewPoint', viewDataStr => {
          const viewData = tryParseJson(viewDataStr)

          const transformTypeToNumber = data =>
            Object.entries(data).reduce(
              (a, [k, v]) => ({
                ...a,
                [k]: Number(v)
              }),
              Object.create(null)
            )

          const formatViewData = data => {
            const { height, lat, lon, pitch, roll, yaw, x, y, z } =
              transformTypeToNumber(data)

            return {
              location: { x, y, z },
              coordinate: { x: lon, y: lat, z: height },
              rotation: { pitch, roll, yaw }
            }
          }

          resolve(
            (this.modelConfig.view = JSON.stringify(
              formatViewData(viewData)
            ).replaceAll(/\s/g, ''))
          )

          message.success('获取UE MainCamera 的transform信息成功!')
        })
      })
    },
    /**
     * @param type  {'translation' | 'rotation' | 'scale'}
     * @return {Promise<[unknown,unknown]>}
     */
    enableEditorToolByType(type) {
      return Promise.allSettled([
        new Promise(resolve => {
          window.swdt.fire('setTransformerTool', { enabled: true }, resolve)
        }),
        new Promise(resolve => {
          window.swdt.fire('setTransformerType', { type }, resolve)
        })
      ])
    },

    setModelLayerTransform() {
      return new Promise(resolve => {
        window.swdt.fire(
          'getModelLayerTransform',
          {
            layerID: this.modelConfig.tag
          },
          async res => {
            const { data } = JSON.parse(res)

            this.modelConfig.location = data.slice(0, 3)
            this.modelConfig.rotation = data.slice(3, 6)
            this.modelConfig.scale = data.slice(6)

            //  Q3  目前参数中视乎没有 geoLoc 所以无论是点击哪一边都是获取世界坐标
            //   之后根据世界坐标来调用转换接口来获取地理位置

            await this.onLocationChange()

            resolve()
          }
        )
      })
    },

    /**
     * @return {Promise<void>}
     */
    enableTranslate() {
      this.enableEditorToolByType('translation')
      this.setModelLayerTransform()
    },
    enableRotate() {
      this.enableEditorToolByType('rotation')
    },
    enableScale() {
      this.enableEditorToolByType('scale')
    }
  }
}
</script>

<style lang="less" scoped>
.model-edit-modal {
  pointer-events: auto;
  position: fixed;
  top: 180px;
  left: 800px;
  padding: 14px;
  background: rgba(25, 47, 82, 0.6);
  color: black;

  .heading {
    color: white;
    line-height: 3;
  }

  .model-list-item {
    min-width: 100px;

    &.selected {
      background-color: red;
    }
  }

  .flex-wrap,
  .flex-column-wrap {
    display: flex;
  }

  .flex-column-wrap {
    flex-direction: column;
  }

  .btn-action {
    width: 80px;
  }
}
</style>
