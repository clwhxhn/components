<template>
  <div class="search-box">
    <a-input-search
      class="search-input common-input"
      v-model:value="searchKey"
      :placeholder="placeholder"
      allow-clear
      @focus="onFocus"
      @blur="onBlur"
      @search="onSearch" />
    <div v-show="showList" class="search-list">
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="{ active: activeTabCode === tab.code }"
          @click="onTabClick(tab)">
          {{ tab.title }}
        </div>
      </div>
      <div class="building-list-box">
        <div v-for="(bl, idx) in buildingList" :key="idx">
          <div class="sub-title">
            <div :class="{ unfold: bl.show }" @click.stop="onToggle(idx)">
              {{ bl.title }}
            </div>
          </div>
          <ul v-show="bl.show" class="building-list">
            <li
              v-for="(building, index) in bl.list"
              :key="index"
              :class="{ selected: building.name === searchKey }"
              @click="onBuildingClick(building)">
              <div class="proj-name">
                {{ building.name
                }}{{ building.stakeNum ? '（' + building.stakeNum + '）' : '' }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { BuildingType, BuildingItem } from '@/api/building'
import { debounce } from 'lodash-es'

const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入名称模糊查询'
  },
  activeTabCode: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array<any>,
    default: []
  },
  dataList: {
    type: Array<any>,
    default: []
  }
})

let buildingList = reactive([])
watch(
  () => props.dataList,
  () => {
    if (buildingList.length) {
      buildingList.forEach((building: any, i: number) => {
        building.list = props.dataList[i].list
      })
    } else {
      buildingList = props.dataList
    }
  }
)

const emit = defineEmits(['clickBuilding', 'getData'])
const searchKey = ref<string>('')
const showList = ref<boolean>(false)
let blurTimer: any = null
let buildingClicked = false

const getBuildingList = (activeCode?) => {
  emit('getData', {
    searchKey: searchKey.value,
    activeTabCode: activeCode === undefined ? props.activeTabCode : activeCode
  })
  showList.value = true
}

const clearBlurTimer = () => {
  if (blurTimer) {
    clearTimeout(blurTimer)
    blurTimer = null
  }
}

const onSearch = (searchValue: string) => {
  searchKey.value = searchValue
  clearBlurTimer()
  getBuildingList()
}

const onChange = debounce(() => {
  clearBlurTimer()
  getBuildingList()
}, 600)

watch(searchKey, () => {
  if (buildingClicked) {
    buildingClicked = false
  } else {
    onChange()
  }
})

const onToggle = (idx: number) => {
  clearBlurTimer()
  const currentUnfold = buildingList[idx].show
  if (!currentUnfold) {
    buildingList.forEach((item: any, i: number) => {
      item.show = i === idx
    })
  } else {
    buildingList[idx].show = false
  }
}
const onBuildingClick = (building: BuildingItem) => {
  // console.log(item)
  showList.value = false
  buildingClicked = true
  // 选择建筑物后清空搜索框
  // searchKey.value = ''
  emit('clickBuilding', building)
}
const onTabClick = (tab: BuildingType) => {
  clearBlurTimer()
  const activeCode = tab.code === props.activeTabCode ? '' : tab.code
  getBuildingList(activeCode)
}
const onFocus = () => {
  getBuildingList()
}
const onBlur = () => {
  blurTimer = setTimeout(() => {
    showList.value = false
  }, 300)
}
</script>
<style lang="less" scoped>
.search-box {
  position: fixed;
  top: 46px;
  // left: calc(50% - 180px);
  right: 16px;
  width: 340px;
  height: 36px;
  background-image: url('@/assets/images/overview/bg-search-box.png');
  background-size: 100%;
  padding: 0 10px;
  pointer-events: all;
  z-index: 9;

  .search-input {
    height: 100%;
  }
}

.search-list {
  margin-top: 4px;
  width: 320px;
  background: rgba(55, 74, 111, 0.6)
    linear-gradient(
      130deg,
      rgba(25, 155, 212, 0.22) 0%,
      rgba(66, 203, 214, 0.08) 73%,
      rgba(106, 194, 238, 0.05) 100%
    );
  border: 1px solid rgba(137, 171, 210, 0.56);

  .tabs {
    height: 40px;
    display: flex;
    justify-content: space-around;
    color: #b9c2d5;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 10px 6px;
    text-shadow: 1px 1px 4px #000000;
    cursor: pointer;
    & > div {
      flex-grow: 1;
      text-align: center;
      position: relative;
      &.active {
        color: #ffffff;
        background-image: url('@/assets/images/overview/bg-tab-active.png');
        background-size: 100%;
        background-position: bottom center;
        background-repeat: no-repeat;
      }
      &:not(:last-child) {
        &::after {
          content: '';
          position: absolute;
          top: 1px;
          right: 0;
          width: 1px;
          height: 16px;
          background-color: #b5c3d6;
        }
      }
    }
  }
  .building-list-box {
    height: 540px;
    overflow-y: auto;
    & > div {
      margin-bottom: 12px;
    }
  }
}
.sub-title {
  height: 32px;
  background: rgba(73, 121, 183, 0.47);
  border-bottom: solid 1px rgba(173, 175, 177, 0.4);
  color: #ddf8ff;
  font-size: 15px;
  line-height: 32px;
  padding-left: 40px;
  position: relative;
  & > div {
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      top: 9px;
      left: -24px;
      width: 14px;
      height: 13px;
      background-image: url('@/assets/images/overview/icon-arrow.png');
      background-size: 100%;
    }
    &.unfold {
      &::before {
        transform: rotate(90deg);
      }
    }
  }
}

.building-list {
  overflow-y: auto;
  max-height: 400px;
  padding: 0 20px 2px 16px;

  & > li {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 34px;
    border-bottom: solid 1px rgba(62, 188, 238, 0.5);
    &.selected {
      background-image: url('@/assets/images/overview/bg-building-selected.png');
      background-size: 100%;
      color: #00ffff;
    }

    .proj-name {
      color: #e1e3e6;
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 1px 1px 4px #484646;
    }
  }
}
</style>
