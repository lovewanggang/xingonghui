<template>
	<view class="background">
		<view class="topcenter">
			<view class="icon_close" @click="beback()"><u-icon name="arrow-left" color="#000" size="30"></u-icon></view>
			<span style="color: #000000;" class="txtqac">{{ top_center }}</span>
			<span @click="recordJump()" class="txtqac record">記錄</span>
		</view>
		<view class="footer">
			<view style="margin: 0 auto;" class="tagWrapButtom" @click.stop="helpSubmit()"><span class="tagButtom">購買</span></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top_center: 'VIP'
			}
		},
		methods: {
			beback(){
				uni.navigateBack();
			},
			recordJump() { //跳轉到詳情頁
				this.$openPage({
				    name: 'job_vipRecord'
				})
			}
		}
	}
</script>

<style scoped>
uni-page-body {
	height: 100%;
	background-color: #F4FAF3;
}
body,
html {
	height: 100%;
	background-color: #F4FAF3;
}
.background{
	background-color: #F4FAF3;
	padding-bottom: 40upx;
	height: 100%;
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
	left: 30px;
}
.tagWrapButtom{
	background-image: linear-gradient(0deg, #5ac63f 0%, #319628 100%);
	height: 37px;
	-moz-box-shadow: 0px 3px 0px 0px #226b0f;
	-webkit-box-shadow: 0px 3px 0px 0px #226b0f;
	box-shadow: 0px 3px 0px 0px #226b0f;
}
.tagWrapButtom:active {
	-moz-box-shadow: 0px 1px 0px 0px #226b0f;
	-webkit-box-shadow: 0px 1px 0px 0px #226b0f;
	box-shadow: 0px 1px 0px 0px #226b0f;
}
.record{
	color: #000000;
	position: absolute;
	right: 30px;
	top: 48px;
}
.footer{
	width: 80%;
	position: fixed;
	height: 128upx;
	bottom: 80upx;
	left: 0;
	margin-left: 10%;
}
</style>
