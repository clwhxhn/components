<template>
	<div class="table-tbody">
		<ul :class="{ marquee_top: animate }">
			<li
				@mouseover="mouseOver(item, index)"
				@mouseleave="mouseLeave"
				v-for="(item, index) in tableData"
				:key="index"
			>
				<div class="table-tbody-box" :class="{'warning': item.alarmType > 0}">
					<div>
						<!-- <a-checkbox @change="onChange" /> -->
						<!-- {{ item.name }} -->
                        <img :src="require('@/assets/images/led/list-title.png')" alt="">
						{{ item.objName }}
					</div>
					<div>{{ item.alarmMomentFlow }}</div>
					<div>{{ item.alarmFlow }}</div>
					<div>{{ item.monitorTime }}</div>
					<!-- <div>
						<a-tooltip placement="topLeft">
							<template #title>{{ item.msg }}</template>
							{{ item.msg }}
						</a-tooltip>
					</div> -->
				</div>
				<!-- <div v-if="isShow === index"><a-alert :message="item.msg" type="success" /></div> -->
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'TabelPlay',
	props: {
		tableData: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			animate: false,
			setInTime: null, // 定时器
			isShow: '',
		}
	},
	mounted() {
		this.setInTime = setInterval(this.showMarquee, 2000)
	},
	methods: {
		mouseOver(item, i) {
			clearInterval(this.setInTime)
			this.isShow = i
		},
		mouseLeave() {
			this.setInTime = setInterval(this.showMarquee, 2000)
			this.isShow = ''
		},
		// 滚动栏滚动
		showMarquee() {
			this.animate = true
			setTimeout(() => {
				this.tableData.push(this.tableData[0])
				this.tableData.shift()
				this.animate = false
			}, 500)
		},
	},
	destroyed() {
		clearInterval(this.setInTime) // 页面销毁时清除定时器
		this.setInTime = null
	},
}
</script>
<style scoped lang="less">
@import '~@/assets/less/torem.less';
.table-tbody li {
	.px2rem(margin-top, 10);
	.px2rem(height, 42);
	.px2rem(line-height, 42);
	// border: 1px solid #89abd2;
    border-bottom: 1px solid;
    border-image: linear-gradient(135deg, rgba(60, 183, 232, 0.6), rgba(11, 128, 255, 1), rgba(62, 188, 238, 0.6), rgba(137, 171, 210, 1)) 1 1;
    }
ul,
li {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	.table-tbody-box {
		display: flex;
		.px2rem(font-size, 18);
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #8EB7FF;
        background: rgba(36, 83, 146, 0.1);
		-webkit-background-clip: text;

		&.warning {
			color: red;
		}
		div:first-child {
			.px2rem(padding-left, 20);
            box-sizing: border-box;
            img{
                .px2rem(width, 19);
                .px2rem(height, 17);
            }
		}
		div {
			width: 25%;
			/deep/.ant-checkbox-wrapper {
				.px2rem(margin-left, 15);
				.px2rem(margin-right, 12);
			}
		}
    div:nth-child(2),
    div:nth-child(3),
		div:nth-child(4) {
			text-align: center;
		}
		// div:nth-child(3) {
		// 	overflow: hidden;
		// 	white-space: nowrap;
		// 	text-overflow: ellipsis;
		// }
	}
}
.marquee_top {
	transition: all 0.5s;
	.px2rem(margin-top, -52);
}
</style>