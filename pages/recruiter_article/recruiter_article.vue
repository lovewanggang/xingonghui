<template>
	<view class="center">
		<!-- <view style="position: fixed;top: 0;width: 100%;"> -->
			<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<!-- </view> -->
		 <!-- style="padding-top: 94px;" -->
		<view class="content">
			<view class="content_title">{{center.title}}</view>
			<view class="content_author">
				<view>作者｜{{center.author}}</view>
				<view style="margin-left: 20px;">編輯｜{{center.edit_autho}}</view>
			</view>
			<view class="content_author">
				<view>來源｜{{center.source}}</view>
			</view>
			<view class="main" v-html="center.content">
				<!-- {{}} -->
			</view>
		</view>
		
		
		<view class="footer" style="display:none;">
			<view class="group" style="margin: 0px;border-color: #c7cdd5;">
				<input v-model="message" style="color:rgba(36,53,87,1)!important;" class="text_1 text_2p" maxlength="11"  placeholder="輸入留言..." />
			</view>
			<view class="message">
				<image src="/static/images/message.png" mode="widthFix"></image>
				<view>999+</view>
			</view>
			<view class="message">
				<image src="/static/images/like.png" mode="widthFix"></image>
				<view>99</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center:"文章詳情",
				center:{},
				message: ''
			}
		},
		components:{
			loginTopbackTwoMove
		},
		onLoad(opion) {
			//拿到id获取详情
			this.details(JSON.parse(opion.query).id);
		},
		methods: {
			//获取新闻详情
			details(id){
				this.$minApi.article({},id).then((res)=>{
					console.log(res.data);
					this.center = res.data
				});
			},
			forgect() { //返回
				uni.navigateBack();
			},
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
.center{
	height: 100%;
	background-color: #F1F3F6;
}
.content{
	padding: 0 48upx;
	width: 100%;
	margin-top: 48upx;
}
.content_title, .content_author{
	font-size:36upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(36,53,87,1);
	margin-bottom: 18upx;
}
.content_author{
	font-size:24upx;
	font-weight:400;
	display: flex;
	margin-bottom: 10upx;
	color: #8a94a6;
}
.footer{
	position: fixed;
	left: 0;
	bottom: 0;
	height: 200upx;
	width: 100%;
	background-color: #FFFFFF;
	padding: 0 40upx;
	display: flex;
	align-items: center;
}
.message{
	margin: 0 20upx;
	font-size: 24upx;
	text-align: center;
}
.message image{
	width: 42upx;
}
.main{
	margin-top: 30upx;
	padding-bottom: 110px;
}
.main image{
	width: 100%;
	height: 346upx;
}
</style>
