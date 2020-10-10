<template>
	<view class="background">
		<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<view :style = "filter == true? 'filter: blur(4px)': ''">
			<view class="content">
				<view @click="upload" class="content_top">
					<image :src="picture" mode=""></image>
				</view>
				<view class="content_main">
					<view v-for="item in list" class="list" @click="difference(item.name)">
						<view class="list_top">
							<image :src="item.url" mode=""></image>
						</view>
						<view class="list_text">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="modifyShow"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar"></view>
				<view class="popup_text">請輸入新手機號</view>
				<view class="center_indexs">
					<view class="group" style="margin-bottom: 10px;padding:0 15px;border-color: #c7cbd2;">
						<div class="markWrap"><image class="mark" src="/static/images/flag.png" /></div>
						<image class="icona" src="/static/images/to_bt.png" />
						<view class="empty" />
						<input v-model="modifytel" style="color: #000!important;" class="text_1 text_2p" placeholder="請輸入手機號" type="number" />
						<view class="block">
							<view class="empty" />
							<view class="wrap" @click="isstart"><image class="icons" src="/static/images/submit.png" /></view>
							<view class="wrap count fopacity" style="margin-left: 10upx;" v-if="countdown">
								<!-- 倒计时 -->
								<span>00:{{ count }}</span>
							</view>
						</view>
					</view>
					<view class="veri">
						<u-message-input
							font-size="45"
							inactive-color="#000"
							@finish="finish"
							active-color="#000"
							:bold="bold"
							width="80"
							:maxlength="maxlength"
							mode="box"
							:breathe="breathe"
						></u-message-input>
					</view>
					<!-- 按钮 -->
					<view class="tagWrapButtom" @click.stop="submit()"><span class="tagButtom">確定修改</span></view>
				</view>
			</view>
		</u-popup>
		
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="cancellationShow"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar"></view>
				<view class="security">安全驗證</view>
				<view class="popup_text">請輸入手機號並發送郵件接收驗證碼</view>
				<view class="center_indexs">
					<view class="group" style="margin-bottom: 10px;padding:0 15px;border-color: #c7cbd2;">
						<div class="markWrap"><image class="mark" src="/static/images/flag.png" /></div>
						<image class="icona" src="/static/images/to_bt.png" />
						<view class="empty" />
						<input v-model="cancellationTel" style="color: #000!important;" class="text_1 text_2p" placeholder="請輸入手機號" type="number" />
					</view>
					<!-- 按钮 -->
					<view class="tagWrapButtom" @click.stop="sendMail()"><span class="tagButtom">發送郵件</span></view>
					<view class="veri" style="margin-top: 40upx;">
						<u-message-input
							font-size="45"
							inactive-color="#000"
							active-color="#000"
							@finish="cancellationFinish"
							:bold="bold"
							width="80"
							:maxlength="maxlength"
							mode="box"
							:breathe="breathe"
						></u-message-input>
					</view>
					
					<view class="container_1">
						<view class="color" />
						<view class="group_1">
							<span class="txt">驗證郵箱6小時有效!</span>
							<view class="block_1" @click="contactMaskShow = true;filter = true;cancellationShow = false;"><span class="contact">聯繫客服</span></view>
						</view>
					</view>
					<view class="tagWrapButtom" @click.stop="cancellationSubmit()"><span class="tagButtom">確定註銷</span></view>
				</view>
			</view>
		</u-popup>
		
		<u-mask :show="maskShow" @click="maskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">您的手機號已修改成功!</view>
				<view class="tagWrapButtom" style="margin: 64upx 96upx;" @click="maskShow = false;filter = false"><span class="tagButtom">確定</span></view>
			</view>
		</u-mask>
		<u-mask :show="cancellationMaskShow" @click="cancellationMaskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">注銷成功!</view>
				<view class="tagWrapButtom" style="margin: 64upx 96upx;" @click="cancellationMaskShow = false;filter = false"><span class="tagButtom">確定</span></view>
			</view>
		</u-mask>
		<u-mask :show="contactMaskShow" @click="contactMaskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">
					<p style="text-align: left;">客服郵箱：</p>
					<p>cs@newjobbase.com</p>
				</view>
				<view class="tagWrapButtom" style="margin: 64upx 96upx;" @click="contactMaskShow = false;filter = false"><span class="tagButtom">確定</span></view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center:"帳號設置",
				list: [
					{name: '修改手機號',url:'../../static/images/modifyphone.png'},
					{name: '密碼重置',url:'../../static/images/modifypassword.png'},
					{name: '註銷帳號',url:'../../static/images/shieldSet.png'},
				],
				maxlength: 6,
				errormsg:"沒有該用戶",
				breathe: true,
				countdown: false,
				count: 60,
				bold: false,
				tel: '',
				modifyShow: false,
				cancellationShow: false,
				maskShow: false,
				cancellationMaskShow: false,
				contactMaskShow: false,
				filter: false,
				modifytel: '',
				sendsms: '',
				cancellationTel: '',
				timer: null,
				verification: false,
				cancellationVerification: false,
				user: [],
				picture: '../../static/images/Flagcardphoto.png',
				code_number: ''
			}
		},
		components:{
			loginTopbackTwoMove
		},
		onLoad() {
			var that = this;
			uni.getStorage({ //獲取登錄人信息
				key:"user",
				success(e){
					that.user = e.data;
					if(e.data.avatar){
						that.picture = that.$pubFuc.advertising(e.data.avatar) // 登錄人頭像
					}
				}
			})
		},
		methods: {
			forgect(){ //返回
				uni.navigateBack();
			},
			difference(name) {
				if(name == '修改手機號'){
					this.modifyShow = true;
					this.filter = true;
				} else if(name == '註銷帳號'){
					this.cancellationShow = true;
					this.filter = true;
				} else if(name == "密碼重置"){
					this.$openPage({
					    name: 'forin',
					    query: {uid:this.user.id,umobile:this.user.mobile},
					})
				}
			},
			finish(value) { //驗證碼驗證
				if(value == this.sendsms){
					this.verification= true;
				}else{
					//如果失败了是不是就显示错误的
					this.$pubFuc.showToast('驗證碼有誤');
				}
			},
			cancellationFinish(value) {
				if(value == this.code_number){
					this.cancellationVerification= true;
				}else{
					//如果失败了是不是就显示错误的
					this.$pubFuc.showToast('驗證碼有誤');
				}
			},
			submit() { //確定修改手機號碼
				var that = this;
				if(!this.modifytel){ //手機號不為空
					return 	this.$pubFuc.showToast('請輸入手機號');
				}
				if(!this.$pubFuc.telverification(that.modifytel)){ //手機號碼驗證
					return this.$pubFuc.showToast('請輸入正確的手機號碼');
				}
				if(!this.verification){ //驗證碼不為空
					return 	this.$pubFuc.showToast('請輸入驗證碼');
				}
				this.$minApi.putmemberinfo({
					mobile:that.modifytel
				},that.user.id).then((res)=>{
					that.modifyShow = false;
					that.filter = true;
					that.maskShow = true;
					that.user.mobile = that.modifytel
					uni.setStorage({
					    key: 'user',
					    data: that.user
					});
				})
			},
			sendMail() { //確定註銷賬號
				var that = this;
				if(!this.$pubFuc.telverification(that.cancellationTel)){
					return this.$pubFuc.showToast('請輸入正確的手機號碼');
				} 
				// console.log(that.user.mobile);
				
				if(this.cancellationTel != that.user.mobile) {
					return this.$pubFuc.showToast('請輸入登錄的手機號碼');
				}
				that.sendmail(this.cancellationTel) //發送郵件
			},
			sendmail(data){//發送郵件
				var that = this;
				console.log(data);
				
				// 验证是否有手机号码
				this.$pubFuc.havemember(data).then((res)=>{
						//有用户查看是否有邮箱
						//调用邮箱
						if(res.data[0].email == null){
							//没有邮箱获取公司邮箱
							that.$minApi.getcompany(res.data[0].company_id).then((res)=>{
								console.log(res.data.email);
								that.$minApi.sendmail({
										email: res.data.email
								}).then((res)=>{
									that.code_number = res.data.code_number
									that.$pubFuc.showToast('驗證碼:'+res.data.code_number);
								});
							});
						}else{
							//有邮箱开始发送邮箱
							this.$minApi.sendmail({
									email: data.email
							}).then((res)=>{
								that.code_number = res.data.code_number
								that.$pubFuc.showToast('驗證碼:'+res.data.code_number);
							});
						}
				})
			},
			cancellationSubmit() {
				if(!this.cancellationVerification){
					that.$pubFuc.showToast('請輸入驗證碼');
				}
				this.cancellationShow = false;
				this.filter = true;
				this.cancellationMaskShow = true;
			},
			closePopup() {
				this.filter = false;
				this.empty()
			},
			// 清空
			empty() {
				this.cancellationTel = '';
				this.modifytel = '';
			},
			//验证码开始倒计时
			isstart(){
				//弹出验证码输入框
				// console.log(this.countdown);
				//开始倒计时
				if(!this.$pubFuc.telverification(this.modifytel)){
					this.$pubFuc.showToast('請輸入正確的手機號碼');
				} else {
					if (!this.countdown) {
						//开始获取验证码 
						//短信还没开通需要验证
						this.$minApi.sendsms({mobile:this.modifytel}).then((res)=>{
							if(res.code == 0){
								// this.$pubFuc.showToast('驗證碼已發送,請留意手機短信');
								this.$pubFuc.showToast('驗證碼:'+res.data.sms_code);
								this.sendsms = res.data.sms_code
							}else if(res.code == -1){
								this.$pubFuc.showToast('該手機號碼已被鎖,請聯繫客服');
							}else{
								this.$pubFuc.showToast('驗證碼已發送失敗,請稍後重試');
							}
						});
						//开始倒计时
						this.countdown = true;
						this.timer = setInterval(() => {
							if (this.count > 0) {
								if (this.count > 0 && this.count <= 10) {
									this.count--;
									this.count = '0' + this.count;
								} else {
									this.count--;
								}
							} else {
								clearInterval(this.timer);
								this.timer = null;
								this.countdown = false;
							}
						}, 1000);
						this.count = 60;
					}
				}
				
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
					
					// 圖片上傳
					that.$minApi.uptopo(that.picture,"file").then((pictureRes)=>{
						// 修改用户照片
						that.user.avatar = pictureRes;
						that.$minApi.putmemberinfo({
							avatar: pictureRes
						},that.user.id).then((userRes)=>{
							uni.setStorage({
							    key: 'user',
							    data: that.user
							});
						})
					})
					
					
			    },
			    error : function(e){
					
			    }
			   });
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
.background{
	background-color: #F1F3F6;
	height: 100%;
}
.icons {
	width: 28px;
	height: 28px;
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
	overflow: hidden;
}
.content_top image{
	width: 100%;
	height: 100%;
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
.text_2p {
	border-radius: 0 8px 8px 0;
}
.text_1 {
	line-height: 16px;
	width: 100%;
	white-space: nowrap;
	color: #c7cbd2;
	font-size: 13px;
	font-weight: 500;
}
.block {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	height: 29px;
}
.empty {
	  margin-right: 3px;
	  border-width: 1px;
	  border-style: solid;
	  border-color: #c7cbd2;
	  /* width: 1px; */
	  height: 28px;
}
	
.wrap {
	  display: flex;
	  align-items: center;
	  flex-direction: row;
	  justify-content: center;
	  background-color: rgba(216, 216, 216, 0);
	  width: 28px;
	  height: 28px;
}
	
.icon {
	  width: 14px;
	  height: 11px;
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
	margin-top: 20upx;
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
	padding: 0 30upx;
}
.container_1{
	background-color: #FFFFFF;
}
.txt{
	color: #243557;
}
.word_1{
	color: #0755c2
}
.security{
	font-size:32upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(36,53,87,1);
}
.contact{
	font-size:24upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(24,230,142,1);
	background:linear-gradient(180deg, rgba(80,145,239,1) 1%, rgba(43,89,155,1) 100%);
	-webkit-background-clip:text;
	-webkit-text-fill-color:transparent;
}
</style>
