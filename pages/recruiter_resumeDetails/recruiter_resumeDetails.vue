<template>
	<view class="content">
		<view class="bg bg-blur"></view>
		<view class="main">
			
			<div class="topcenter">
				<span class="txtqac">{{ top_center }}</span>
				<view class="icon_close" @click="beback()"><u-icon name="close" color="#FFFFFF" size="30"></u-icon></view>
			</div>
			
			<view class="details">
				这是简历内容
			</view>
			
			<view class="footer">
				<view class="tagWrapButtom" @click="tel()" style="margin:0;width: 93px;height: 44px;"><span class="tagButtom">電話</span></view>
				<view class="tagWrapButtom" @click="scjl()" style="margin:0;width: 93px;height: 44px;"><span class="tagButtom">收藏</span></view>
				<view class="tagWrapButtom" @click="ispopup()" style="margin:0;width: 93px;height: 44px;"><span class="tagButtom">消息</span></view>
			</view>
		</view>
		
		<!-- 消息弹窗 -->
		<popup :filter="filter" :title="popuptitle" @closePopup="closePopup"></popup>
	</view>
</template>

<script>
	import popup from 'components/recruiter/popup.vue'
	export default {
		data() {
			return {
				top_center: '簡歷詳情',
				//简历是否收藏
				filter: false,
				popuptitle:"",
			}
		},
		components:{
			popup
		},
		methods: {
			beback() {
				uni.navigateBack();
			},
			tel(){
				console.log("点击了电话");
			},
			scjl(){
				console.log("这是收藏")
			},
			closePopup(){
				this.filter = false
			},
			ispopup(val){
				this.filter = true;
				this.popuptitle = val
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
.content{
	width: 100%;
	height: 100%;
}
.bg {
	background: url('/static/images/74b67240e38911eaaa7cdfff15829f1f.png');
	height:100%;
	text-align: center;
}
.bg-blur {
	float: left;
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	-webkit-filter: blur(10px);
	-moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
}
.main{
	position:absolute;
	left: 0px;
	right: 0px;
	height: 100%;
	padding: 0 48upx;
}
.groupback {
	text-align: center;
}
.icon {
	width: 10px;
	height: 16px;
}
.topcenter {
	position: relative;
	width: 100%;
	text-align: center;
	padding-top: 50px;
}
.icon_close {
	position: absolute;
	top: 48px;
	right: 30px;
}
.details{
	margin-top: 40px;
	width: 100%;
	height: 50%;
	overflow: hidden;
	background:rgba(255,255,255,0.8);
	border-radius:16px;
}
.tagButtom{
	font-size: 14px;
	line-height: 29px;
	height: 29px;
	letter-spacing: 1px;
	font-family:PingFangSC-Semibold,PingFang SC;
	color:rgba(255,255,255,1);
}
.footer{
	display: flex;
	margin-top: 32px;
	margin-bottom: 40px;
	width: 100%;
	justify-content: space-around;
}
</style>
