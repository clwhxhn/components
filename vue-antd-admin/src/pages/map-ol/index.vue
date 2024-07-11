<template>
    <div class="map-wrap">
        <OlMap></OlMap>
    </div>
</template>

<script>
    import OlMap from '@/components/map-ol/OlMap'
    export default {
        components: {
            OlMap
        }
    }
</script>

<style lang="less" scoped>
.map-wrap {
 height: calc(100vh - 90px);
}
</style>