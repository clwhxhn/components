##
SimpleTimeLine ： 需要通过每个时间点请求接口缓存数据
TimeLine：不需要缓存数据，直接播放
##

## 时间轴上加标签
addCjjCbxMarks(type) {
      const { marks } = this
      const marksKeys = Object.keys(marks)

      console.log(' this.timeList: ', this.timeList)
      console.log('marksKeys: ', marksKeys)

      const list = type == 'cjj' ? this.extraTimeObj.cjj : this.extraTimeObj.cbz
      list.forEach((arr, i) => {
        console.log('i: ', i)
        arr.forEach((a, tmIdx) => {
          const tm = dayjs(a).format('YYYY-MM-DD HH:mm')
          const idx = this.timeList.findIndex(
            t => dayjs(t.tm).format('YYYY-MM-DD HH:mm') === tm
          )
          if (idx !== -1) {
            // 找出dom对应的index
            const stepEle = document.getElementsByClassName('ant-slider-dot')
            const domIdx = marksKeys.findIndex(i => i == idx)
            // stepEle[domIdx].classList.add(type == 'cjj' ? 'cjjDot' : 'cbzDot')
            const style = {
              opacity: 1,
              width: '4px',
              height: '4px',
              top: '0px',
              borderRadius: 0,
              border: 'none',
              backgroundColor: type == 'cjj' ? '#ffec71' : '#ffc46c'
            }

            Object.keys(style).forEach(k => {
              stepEle[domIdx].style[k] = style[k]
            })

            // 设置卡片(只设置第一个)
            if (i === 0 && tmIdx === 0) {
              console.log(' stepEle[domIdx]: ', stepEle[domIdx])
              const img = type == 'cjj' ? cjjRt : cbxRt
              const newElement = document.createElement('div')
              const style = {
                width: '42px',
                height: '20px',
                position: 'relative',
                left: '3px',
                top: '-54px',
                background: `url(${img}) no-repeat`,
                backgroundSize: '100% 100%'
              }
              Object.keys(style).forEach(k => {
                newElement.style[k] = style[k]
              })
              stepEle[domIdx].appendChild(newElement)
            }
          }
        })
      })
      this.$forceUpdate()
      console.log(this.marks)
    }

##
    