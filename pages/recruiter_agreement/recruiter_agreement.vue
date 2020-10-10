<template>
	<view style="background-color: #F1F3F6;height: 100%;">
		<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<view class="content">
			<view class="content_main">
				<view v-for="item in list" class="list" @click="back(item.url, item.type)">
					<view class="list_top">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="list_text">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center:"協議",
				list: [
					{name: '用戶協議',img:'../../static/images/userAgreement.png',url: 'agreement_details',type: 1},
					{name: '隱私協議',img:'../../static/images/privacyAgreement.png',url: 'agreement_details',type: 2},
					{name: '發布協議',img:'../../static/images/releaseAgreement.png',url: 'agreement_details',type: 3},
				]
			}
		},
		components:{
			loginTopbackTwoMove
		},
		methods: {
			forgect(){
				uni.navigateBack();
			},
			back(url, type) {
				console.log(type)
				this.$openPage({
				    name: 'agreement_details',
				    query: {type: type},
				})
			}
		}
	}
</script>

<style scoped>
uni-page-body {
	height: 100%;
	background-color: #F1F3F6;
}
body,
html {
	height: 100%;
	background-color: #F1F3F6;
}
.content{
	padding: 0 48upx;
	width: 100%;
	padding-bottom: 40px;
	margin-top: 48upx;
}
.content_top{
	margin: 0 auto;
	height: 144upx;
	width: 144upx;
	border-radius: 50%;
	background:#c9d4e3;
	position: relative;
}
.content_top image{
	width: 50upx;
	height: 50upx;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -25upx;
	margin-top: -25upx;
}
.content_main{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
	margin-top: 64upx;
}
.content_main .list{
	height: 284upx;
	width: 192upx;
	border-radius: 32upx;
	background:rgba(255,255,255,0.8);
}
.content_main .list .list_top{
	margin: 0 auto;
	width: 112upx;
	height: 112upx;
	margin-top: 48upx;
	background-color: #F1F3F6;
	border-radius: 50%;
	position: relative;
}
.content_main .list .list_top image{
	width: 100%;
	height: 100%;
}
.content_main .list  .list_text{
	text-align: center;
	font-size:28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(36,53,87,1);
	line-height:44upx;
	margin-top: 32upx;
}
</style>
