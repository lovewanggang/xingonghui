<template>
	<view class="background">
		<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<view :style = "filter == true? 'filter: blur(4px)': ''">
			<view class="main">
				<view class="list" v-for="item in list" @click="back(item.url, item.name)">
					<view class="list_top">
						<image class="list_img" :src="item.img" mode=""></image>
					</view>
					<view class="list_name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="helpShow"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar"></view>
				<view class="popup_text">幫助與反饋</view>
				<view class="center_indexs">
					<view class="help">
						<u-input class="help_input" placeholder="問題詳情..." v-model="content" :type="type" :border="border" :height="height" :auto-height="autoHeight" />
						<view class="help_upload" v-if="uploadPhoto">
							<image @click="upload" class="upload_img" :src="picture" mode=""></image>
						</view>
						<view @click="upload" class="help_upload" v-if="!uploadPhoto">
							<image style="margin:10upx 43upx 0;width: 90upx;height: 90upx;" :src="picture" mode=""></image>
							<view class="help_upload_text">上傳圖片</view>
						</view>
					</view>
					<view class="tagWrapButtom" @click.stop="helpSubmit()"><span class="tagButtom">提交</span></view>
				</view>
			</view>
		</u-popup>
		<u-mask :show="maskShow" @click="maskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">提交已成功!</view>
				<view class="tagWrapButtom" style="margin: 64upx 96upx;" @click="maskShow = false;filter = false"><span class="tagButtom">确定</span></view>
			</view>
		</u-mask>
		<u-mask :show="outMaskShow" @click="outMaskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">退出登錄?</view>
				<view class="tagWrapButtom" style="margin: 64upx 96upx;" @click="signOut()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="outMaskShow = false;filter = false">取消</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center:"通用設置",
				list: [
					{name: '帳號設置',img:'../../static/images/accountSet.png',url: 'account_set'},
					{name: '管理員設置',img:'../../static/images/adminSet.png',url: 'admin_set'},
					{name: '屏蔽用戶',img:'../../static/images/shieldSet.png',url: 'shield_user'},
					{name: '幫助與反饋',img:'../../static/images/helpSet.png'},
					{name: '協議',img:'../../static/images/agreementSet.png',url: 'agreement'},
					{name: '關於我們',img:'../../static/images/aboutSet.png'},
					{name: '退出登陸',img:'../../static/images/signOut.png'},
				],
				filter: false,
				helpShow: false,
				maskShow: false,
				outMaskShow: false,
				helpDetails: '',
				value: '',
				type: 'textarea',
				border: true,
				height: 100,
				autoHeight: true,
				uploadPhoto: false,
				picture: '../../static/images/helpAdd.png',
				content: '',
				user: []
			}
		},
		components:{
			loginTopbackTwoMove
		},
		onLoad() {
			this.getUser()
		},
		methods: {
			getUser(){
				var that = this
				uni.getStorage({
					key:"user",
					success: function (res) {
						that.user = res.data
					}
				})
			},
			// 返回
			forgect(){
				uni.navigateBack();
			},
			back(url, name) {
				if(name == '幫助與反饋'){
					this.helpShow = true;
					this.filter = true;
				} else if(name == '退出登陸'){
					this.outMaskShow = true;
					this.filter = true;
				}else if(name == '屏蔽用戶'){
					this.$openPage({
					          name: url,
					          query: {type: 1},
						})
				} else {
					this.$openPage(url)
				}
			},
			// 取消彈出框
			closePopup(){
				this.filter = false;
				this.empty();
			},
			// 幫助與反饋提交
			helpSubmit() {
				
				var that = this;
				if(that.content == ""){
					this.$pubFuc.showToast('請輸入問題詳情');
					return;
				}
				let fromdata = {};
				fromdata.content = that.content
				fromdata.member_id = that.user.id
				if(that.uploadPhoto){
					// 圖片上傳
					that.$minApi.uptopo(that.picture,"file").then((res)=>{
						fromdata.picture = res
						that.submit(fromdata)
					})
				}else{
					that.submit(fromdata)
				}
			},
			submit:function(fromdata){
				const that = this;
				// 幫助與反饋提交API
				that.$minApi.suggest(fromdata).then((res)=>{
					that.empty();
					that.maskShow = false;
				})	
			},
			// 清空
			empty() {
				this.content = '';
				this.picture = '../../static/images/helpAdd.png';
				this.uploadPhoto = false;
			},
			//上传图片到本地
			upload : function(){
			   const that = this;
			   uni.chooseImage({
			    count: 1,
			    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					that.picture = res.tempFilePaths[0];
					that.uploadPhoto = true
			    },
			    error : function(e){
					
			    }
			   });
			  },
			  signOut(){
				  this.outMaskShow = false;
				  this.filter = false;
				  const that = this;
				  uni.clearStorageSync();
				  that.$openPage('login');
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
.background{
	background-color: #F1F3F6;
}
.main{
	padding: 0 48upx;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-bottom: 80upx;
}
.list{
	width:294upx;
	height:294upx;
	background:#FFFFFF;
	border-radius:32upx;
	margin-top: 40upx;
}
.list_top{
	margin: 0 auto;
	width: 126upx;
	height: 126upx;
	border-radius: 50%;
	background-color: #F1F3F6;
	margin-top: 48upx;
	position: relative;
}
.list_name{
	margin-top: 36upx;
	font-size:28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(36,53,87,1);
	line-height:22px;
	text-align: center;
}
.list_img{
	margin: 0 auto;
	width: 100%;
	height: 100%;
}


.popup{
	border-radius: 20%;
	padding: 0upx 60upx 60upx 60upx;
}
.popup_bar{
	margin: 0 auto;
	margin-top: 24upx;
	width: 96upx;
	height: 12upx;
	background-color: #F1F3F6;
}
.popup_text{
	font-size:24upx;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:rgba(36,53,87,1);
	line-height:34upx;
	margin-top: 48upx;
}
.help{
	display: flex;
	flex-direction: row;
	margin: 32upx 0;
}
.help_input{
	width:462upx;
	height:180upx;
	border-radius:10px;
}
.help_upload{
	width:180upx;
	height:180upx;
	border-radius:10px;
	margin-left: 16upx;
	border:1px solid rgb(220, 223, 230);
	overflow: hidden;
}
.help_upload_text{
	text-align: center;	
	color: #243557!important;
}
.warp {
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	margin-bottom: 50upx;
}
.rect {
	text-align: center;
	font-size:64upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
}
.upload_img{
	width:180upx;
	height:180upx;
}
</style>
