export default {
    data(){
      return {
        // 数据存放的数组
        timelineSplitMixinDataArr: [],
        // 是否发送了数据请求的记录数组
        timelineSplitMixinDataNoticeCacheArr: [],
        // 播放步长
        timelineSplitMixinTimeStep: 1000,
        timelineSplitMixinRunState: false,
        timelineSplitMixinCacheState: false,
        timelineSplitMixinRunIndex: 0,
        timelineSplitMixinCacheIndex: 0
      }
    },
    methods:{
      timelineSplitMixinInit(dataSize){
        this.timelineSplitMixinDataArr = [];
        this.timelineSplitMixinDataNoticeCacheArr = [];
        for(let i = 0;i<dataSize;i++){
          this.timelineSplitMixinDataArr[i]=null;
          this.timelineSplitMixinDataNoticeCacheArr[i]=false;
        }
        this.timelineSplitMixinCacheState=false;
        this.timelineSplitMixinRunState=false;
        this.timelineSplitMixinRunIndex = 0;
        this.timelineSplitMixinCacheIndex = 0;
      },
      timelineSplitMixinChange(i){
        this.timelineSplitMixinRunIndex = i;
        this.timelineSplitMixinCacheIndex = i;
        if(i<0 || i>=this.timelineSplitMixinDataArr.length){
          throw new Error(`timelineSplitMixinChange传入的时间轴序列号${i}不合法,应该大于0并小于${this.timelineSplitMixinDataArr.length-1}`)
        }
        // 如果没有运行，手动执行一次渲染
        if(!this.timelineSplitMixinRunState){
          this.timelineSplitMixinGoOneTimeWhenStop().then();
        }else{
        }
      },
      timelineSplitMixinStopRun(){
        this.timelineSplitMixinRunState = false;
      },
      timelineSplitMixinStopCache(){
        this.timelineSplitMixinCacheState = false;
      },
      timelineSplitMixinStartRun(i){
        this.timelineSplitMixinRunIndex = i;
        if(!this.timelineSplitMixinRunState){
          this.timelineSplitMixinRunState = true;
          this.timelineSplitMixinCreateRunInterval().then();
        }
      },
      timelineSplitMixinStartCache(i){
        this.timelineSplitMixinCacheIndex = i;
        if(!this.timelineSplitMixinCacheState){
          this.timelineSplitMixinCacheState = true;
          this.timelineSplitMixinCreateCacheInterval().then();
        }
      },
      // 开始缓存设置循环
      async timelineSplitMixinCreateCacheInterval(){
        while (this.timelineSplitMixinCacheState){
          await this.timelineSplitMixinCache();
          await this.timelineSplitMixinSleep(100);
        }
      },
      // 开始运行设置循环
      async timelineSplitMixinCreateRunInterval(){
        // 清理旧的循环，开始新的循环
        while (this.timelineSplitMixinRunState){
          await this.timelineSplitMixinGo()
          await this.timelineSplitMixinSleep(100);
        }
      },
      async timelineSplitMixinGo(){
        // 如果超过最大值就停止
        if(this.timelineSplitMixinRunIndex>=this.timelineSplitMixinDataArr.length){
          this.timelineSplitMixinRunIndex = this.timelineSplitMixinDataArr.length-1;
          this.timelineSplitMixinRunState = false;
          this.timelineSplitMixinAfterComplete();
          return ;
        }
        if(this.timelineSplitMixinDataArr[this.timelineSplitMixinRunIndex] !== null){
          this.timelineSplitMixinShow(this.timelineSplitMixinRunIndex,this.timelineSplitMixinDataArr[this.timelineSplitMixinRunIndex]);
          // 如果是播放状态就继续下一步
          if(this.timelineSplitMixinRunState){
            this.timelineSplitMixinRunIndex++;
            await this.timelineSplitMixinSleep(this.timelineSplitMixinTimeStep);
          }
        }
      },
      // 停止的时候点击触发
      async timelineSplitMixinGoOneTimeWhenStop(){
        while (!this.timelineSplitMixinRunState){
          if(this.timelineSplitMixinDataArr[this.timelineSplitMixinRunIndex] !== null){
            this.timelineSplitMixinShow(this.timelineSplitMixinRunIndex,this.timelineSplitMixinDataArr[this.timelineSplitMixinRunIndex]);
            return
          }
            // 如果既没有数据，也没有发送过，那么通知数据获取
            if(!this.timelineSplitMixinDataNoticeCacheArr[this.timelineSplitMixinCacheIndex]){
              this.timelineSplitMixinNeedGetData(this.timelineSplitMixinCacheIndex);
              this.timelineSplitMixinDataNoticeCacheArr[this.timelineSplitMixinCacheIndex]=true
            }
  
          await this.timelineSplitMixinSleep(100);
        }
  
      },
      async timelineSplitMixinCache(){
        // 先判断是否到最后一个时间点
        if(this.timelineSplitMixinCacheIndex>=this.timelineSplitMixinDataArr.length){
          // 如果有null值，那么就从那个时间点重新开始缓存
          for(let i = 0;i<this.timelineSplitMixinDataArr.length;i++){
            if(this.timelineSplitMixinDataArr[i]==null){
              this.timelineSplitMixinCacheIndex=i;
              return;
            }
          }
          this.timelineSplitMixinCacheState=false;
        }
  
        // 判断是否有数据
        if(this.timelineSplitMixinDataArr[this.timelineSplitMixinCacheIndex]==null){
          // 判断是否已发送过请求
          if(!this.timelineSplitMixinDataNoticeCacheArr[this.timelineSplitMixinCacheIndex]){
  
            this.timelineSplitMixinNeedGetData(this.timelineSplitMixinCacheIndex);
            this.timelineSplitMixinDataNoticeCacheArr[this.timelineSplitMixinCacheIndex]=true
          }
        }else {
          this.timelineSplitMixinCacheIndex++;
        }
      },
      // 钩子函数，展示数据时触发
      timelineSplitMixinShow(i,data){
      },
      // 钩子函数，需要获取数据时触发
      timelineSplitMixinNeedGetData(i){
  
      },
      // 设置数据时手动调用
      timelineSplitMixinSetData(i,data){
        this.timelineSplitMixinDataArr[i]=data;
      },
      // 钩子函数，停止后触发执行
      timelineSplitMixinAfterComplete(){
  
      },
      timelineSplitMixinSleep(time){
        return new Promise((resolve) => setTimeout(resolve, time));
      },
    },
    created() {
    }
  
  }
  