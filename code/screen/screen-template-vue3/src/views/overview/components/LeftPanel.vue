<template>
    <div class="panel-container-left">
        <div class="panel-common-title">左侧面板</div>

    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import dayjs, { Dayjs } from 'dayjs'

const timeRange = ref<[Dayjs, Dayjs]>([
    dayjs('2015/01/01', 'YYYY-MM-DD'),
    dayjs('2015/01/01', 'YYYY-MM-DD')
])
const searchKey = ref('')

const list = ref([
    {
        name: '站点1'
    },
    {
        name: '站点2'
    },
    {
        name: '站点3'
    },
    {
        name: '站点4'
    }
])

onMounted(() => {})

onBeforeUnmount(() => {})
</script>

<style lang="less" scoped>
.panel-common-section {
    padding: 10px;
    height: 800px;
    .range-picker-wrap {
        :deep(.ant-picker) {
            width: 100%;
            height: 32px;
            background: rgba(30, 60, 106, 0.2);
            box-shadow: inset 0px 1px 6px 0px rgba(51, 133, 255, 0.5);
            border: 1px solid rgba(118, 172, 253, 0.5);
            border: none;
            .ant-picker-input > input {
                color: #ddf8ff;
                font-size: 15px;
            }
        }
    }
    .search-wrap {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ant-input {
            width: 308px;
            height: 32px;
            background: rgba(30, 60, 106, 0.2);
            box-shadow: inset 0px 1px 6px 0px rgba(51, 133, 255, 0.5);
            border: 1px solid rgba(118, 172, 253, 0.5);
            color: #ddf8ff;
            &::placeholder {
                color: #76acfd;
            }
        }
        .btn-search {
            width: 71px;
            height: 32px;
            line-height: 32px;
            background-image: url('@/assets/images/overview/btn.png');
            background-size: 100% 100%;
            font-size: 15px;
            color: #ffffff;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>
