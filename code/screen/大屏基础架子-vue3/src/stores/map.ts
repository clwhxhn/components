import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
    state: (): {
        mapData: object,
        rootDir: string,
        projectDir: string,
        codeText: string,
        eventCoords: Array<any>,
        modalKey: string,
        currentPoiId: string,
    } => {
        return {
            mapData: {},
            rootDir: '',
            projectDir: '',
            codeText: '',
            eventCoords: [],
            modalKey: '',
            currentPoiId:''
        }
    },
    getters: {
        projectName: state => {
            const arr = state.projectDir.split('/')
            return arr[arr.length - 1]
        },
        // rootDir: state => state.projectDir.split('/Projects')[0]
    },
    actions: {
        updateMapData(mapData: object) {
            this.mapData = mapData
        },
        updateRootDir(path: string) {
            this.rootDir = path
        },
        updateProjectDir(path: string) {
            this.projectDir = path
        },
        updateCodeText(text: string) {
            this.codeText = text
        },
        updateEventCoords(coords:Array<any>) {
            this.eventCoords = coords
        },
        updateModalKey(key: string) {
            this.modalKey = key
        },
        updateCurrentPoiId(id: string) {
            this.currentPoiId = id
        }
    }
})