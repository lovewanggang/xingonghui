<!-- 弹出窗口组件 -->

<template>
	<view class="box">
		<!-- 阴影层 -->
		<view class="center_index">
			<!-- 头部关闭 -->
			<view class="topcenter">
				<span class="txtqac">{{ topmode[layer_type].title }}</span>
				<view class="icon_close" @click="layer_close"><u-icon name="close" color="#fff" size="30"></u-icon></view>
			</view>
			<view class="posi">
				<!-- 内容显示  -->
				<view class="center">
					<view>{{ topmode[layer_type].center }}</view>
					<view class="tmanmb">{{ topmode[layer_type].text }}</view>
				</view>
				<bigBtn @goback="goback"></bigBtn>
			</view>
		</view>
	</view>
</template>

<script>
import bigBtn from 'components/login/bottom.vue';
export default {
	data() {
		return {
			topmode: [
				{
					title: '聯繫客服',
					center: '客服郵箱:',
					text: ''
				},
				{
					title: '重置成功',
					center: '您的密碼已',
					text: '重置成功！'
				},
				{
					title: '冻结成功',
					center: '您的帳戶已',
					text: '成功凍結！'
				},
				{
					title: '加入獵頭',
					center: '請聯繫客服:',
					text: ''
				}
			],
			layer: true
		};
	},
	props: {
		layer_type: {
			type: Number,
			val: ''
		}
	},
	components: {
		bigBtn
	},
	mounted() {
		// console.log;
		this.$minApi.config().then((res)=>{
			this.topmode[0].text = res.data[0].service_email
			this.topmode[3].text = res.data[0].headhunting_mobile
			this.$set(this.topmode,0,this.topmode[0])
		});
	},
	onLoad() {
		// config
	},
	methods: {
		layer_close() {
			this.$emit('layerclose');
		},
		goback() {
			this.$emit('goback');
		}
	}
};
</script>

<style scoped>
uni-page-body {
	height: 100%;
}
body,
html {
	height: 100%;
}
.box {
	width: 100%;
	height: 100%;
}
.center_index {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 1;
	z-index: 100;
	overflow: hidden;
}
.topcenter {
	position: relative;
	width: 100%;
	text-align: center;
	margin-top: 40px;
}
.icon_close {
	position: absolute;
	top: 0;
	right: 15px;
}
.posi {
	position: absolute;
	bottom: 65px;
	width: calc(100% - 30px);
}
.center {
	font-size: 30px;
	margin: 0 15px;
	font-family: PingFangTC-Semibold, PingFangTC;
	font-weight: 600;
	color: rgba(255, 255, 255, 1);
	line-height: 40px;
}

.tmanmb {
	margin: 5px 0 30px 0;
	word-wrap: break-word;
	white-space: pre-wrap;
}
</style>
