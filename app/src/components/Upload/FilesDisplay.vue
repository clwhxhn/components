<template>
    <div class="files-main">
        <div class="file-big">
            <a-empty v-if="files.length == 0" description="暂无附件"/>
            <img v-else :src="bigFilePath" />
        </div>
        <div class="files-small">
            <div class="left-icon" v-if="files.length !== 0" >
                <a-button icon="left" type="primary" shape="circle" @click="upper()" :disabled="upperDisable" style="height: 32px;min-width: 32px;"/>
            </div>
            <div class="center-main">
                <div class="files-small-main">
                    <div v-for="(item,index) in files" :key="index" >
                        <img :src="item.filePath" @click="onBigPicture(item.filePath,index)" 
                            :class="index ==currentP ? 'active' : ''"
                        />
                    </div>
                </div>
            </div>
            <div class="left-icon" v-if="files.length !== 0">
                <a-button icon="right" type="primary" shape="circle" @click="lower()" :disabled="lowerDisable" style="height: 32px;min-width: 32px;"/>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'FilesDisplay',
    props:{
        files:{
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            bigFilePath: '',
            currentP: 0,
            upperDisable: false,
            lowerDisable: false,
        }
    },
    watch: {
        files: {
            immediate: true,
            handler(val) {
                const BASE_URL = process.env.VUE_APP_API_BASE_URL
                val.map(item=>{
                    item.filePath = `${BASE_URL}/api/file/view/${item.id}`
                })
                this.bigFilePath = val[0] && val[0].filePath
                this.currentP = 0
                this.upperDisable = true
                if(val.length == 1){
                    this.lowerDisable = true
                }else{
                    this.lowerDisable = false
                }
            },
        },
    },
    mounted(){

    },
    methods: {
        onBigPicture(filePath,index){
            this.bigFilePath = filePath
            this.currentP = index
            if(index !== 0){
                this.upperDisable = false
            }else{
                this.upperDisable = true
            }

            if(index !== this.files.length -1){
                this.lowerDisable = false
            }else{
                this.lowerDisable = true
            }
        },
        upper(){
            const n = this.currentP - 1
            this.lowerDisable = false
            if(n == 0){
                this.upperDisable = true
            }
            if(n >= 0){
                this.bigFilePath = this.files[n].filePath
                this.currentP = n
            }
        },
        lower(){
            const n = this.currentP + 1
            this.upperDisable = false
            if(n == this.files.length - 1){
                this.lowerDisable = true
            }
            if(n < this.files.length){
                this.upperDisable = false
                this.bigFilePath = this.files[this.currentP + 1].filePath
                this.currentP = n
            }
        }
    }
}
</script>
<style lang="less" scoped>
/deep/.ant-btn {
    min-width: 32px;
    height: 32px;
}
.files-main{
    // padding: 0 20px 20px;
    .file-big{
        height: 500px;
        text-align: center;
        img{
            height: 480px;
        }
        .ant-empty{
            padding-top: 185px;
        }
    }
    .files-small{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .left-icon{
            width: 5%;
            text-align: center;
            .icon{
                font-size: 30px;
                color: #1890ff;
                cursor: pointer;
            }
        }
        .center-main{
            width: 90%;
            .files-small-main{
                display: flex;
                justify-content: center;
                img{
                    height: 80px;
                    width: 80px;
                    cursor: pointer;
                    margin: 0 5px;
                }
                .active{
                    border: 3px solid #faad14;
                }
            }
        }
    }
}

</style>