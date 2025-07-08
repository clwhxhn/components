import { ref } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'

export const useMapStore = defineStore('map', () => {
    const clickedLayer = ref('')
    const eventCoords = ref()

    function setClickedLayer(value: string) {
        clickedLayer.value = value
    }

    function setEventCoords(value: string) {
        eventCoords.value = value
    }

    
    return {
        clickedLayer,
        eventCoords,

        setClickedLayer,
        setEventCoords
    }
})

