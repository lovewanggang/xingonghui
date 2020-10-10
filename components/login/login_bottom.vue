<!-- 登录注册组件 -->
<template>
	<view>
		<view class="container">
			<view class="outer_le" :class="islogin ? 'recolor' : 'locolor'" @click="registeredbtn(false)"><span class="word">註冊</span></view>
			<view class="outer_ri" :class="islogin ? 'locolor' : 'recolor'" @click="registeredbtn(true)"><span class="word">登錄</span></view>
		</view>
		<view class="center_index" v-if="islogin">
			<span class="desc">請輸入您的手機號登錄帳戶</span>
			<input class="tagWrap" type="number" placeholder-class="tagwrp" placeholder="請輸入手機號" v-model="value" />
			<!-- <view class="isNocew" v-if="errcode">
				{{errormsg}}
			</view> -->
			<view class="group" :class="{red:errcode}">
				<input class="text_1 text_1p" placeholder-class="tagwrp" placeholder="請輸入密碼" type="password" v-model="pvalue"/>
				<view class="block">
					<view class="empty" />
					<view class="wrap" @click="tologin"><image class="icon" src="/static/images/to_ri.png" /></view>
				</view>
			</view>
			<view class="isNocew" v-if="errcode">
				{{errormsg}}
			</view>
			<view class="container_1">
				<view class="color" />
				<view class="group_1">
					<span class="txt" @click="safety()">忘記密碼？</span>
					<view class="block_1">
						<u-icon name="warning-fill" color="#ffcd00" size="27"></u-icon>
						<span class="word_1" style="margin-left: 4px;" @click="freeze()">凍結帳戶</span>
					</view>
				</view>
			</view>
		</view>

		<view class="center_index" v-else>
			<span class="desc">請輸入您的手機號登錄帳戶</span>
			<view class="group" :class="{red:errcode}" style="margin-bottom: 10px;padding-left: 15px;">
				<view class="markWrap"><image class="mark" src="/static/images/flag.png" /></view>
				<image class="icona" src="/static/images/to_bt.png" />
				<view class="empty" />
				<input class="text_1 text_2p" placeholder-class="tagwrp" placeholder="請輸入手機號" type="number" v-model="registeredtel" />
				<view class="block">
					<view class="empty" />
					<view class="wrap" @click="toverification"><image class="icon" :class="{ fopacity: countdown }" src="/static/images/to_fly.png" /></view>
					<view class="wrap count fopacity" v-if="countdown">
						<!-- 倒计时 -->
						<span>00:{{ count }}</span>
					</view>
				</view>
			</view>
			<view class="isNoce" v-if="errcode">
				{{errormsg}}
			</view>
			<view v-if="verificationcode" class="veri">
				<u-message-input
					font-size="45"
					@finish="finish"
					:inactive-color="colr"
					:active-color="colr"
					:bold="bold"
					width="80"
					:maxlength="maxlength"
					mode="box"
					:breathe="breathe"></u-message-input>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'login_bottom',
	data() {
		return {
			constants: {},
			islogin: true, //是不是登录
			breathe: true,
			bold: false,
			verificationcode: false, //是否显示验证码
			maxlength: 6,
			countdown: false,
			colr:"#fff",
			count: 60,
			timer: null,
			errcode:false,//错误提示标识是否显示
			errormsg:"",//错误提示内容
			value:"",//账号
			pvalue:"",//密码
			registeredtel:"", // 注册的手机号码
			sendsms:"",//获取后台返回的验证码
		};
	},
	onLoad() {},
	methods: {
		//验证错误状态清理
		iserror() {
			clearInterval(this.timer);
			this.count = 60;
			this.timer = null;
			this.countdown = false;
			this.errcode = false;
			this.errormsg = "";
		},
		//验证码输入完成
		finish(value) {
			if(value == this.sendsms){
				this.$emit('topassword',this.registeredtel);
			}else{
				//如果失败了是不是就显示错误的
				this.$pubFuc.showToast('驗證碼有誤');
			}
		},
		//冻结
		freeze() {
			this.$emit('freeze');
		},
		safety() {
			this.$emit('safety');
		},
		//点击了注册/登录按钮
		registeredbtn(bool) {
			if (this.islogin === bool) return;
			this.iserror();
			this.registeredtel = "";
			this.verificationcode = false;
			this.islogin = !this.islogin;
		},
		//点击了登录
		tologin() {
			const that = this
			if(this.value.length == 0){
				return
			}
			if(this.$pubFuc.telverification(this.value)){
				this.$pubFuc.havemember(this.value).then((res)=>{
					if(res.data.length == 0){
						that.$pubFuc.showToast('該手機號碼沒註冊');
						return
					}
					if(res.data[0].login_number == 5 || res.data[0].login_number > 5){
						that.$pubFuc.showToast('密碼錯誤次數太多,今天不能登錄');
						return
					}
					if(that.pvalue == res.data[0].password){
						//登陆
						that.$minApi.login({mobile:that.value,password:that.pvalue}).then((resa)=>{
							uni.setStorage({
								key:"user",
								data:resa.data
							})
							that.errcode = false;
							that.$emit('istologin');
						});
					}else{
						const num = res.data[0].login_number+1
						console.log(num);
						that.$minApi.menberpassword({login_number:num},res.data[0].id).then((res)=>{
							console.log(res);
						})
						// menberpassword
						//密码错误
						that.errcode = true;
						if(num == 5 || num > 5){
							that.errormsg = "密碼錯誤，今天不能登錄";
						}else{
							that.errormsg = "密碼錯誤，還剩"+ (5 - num)+"次機會";
						}	
					}
				})
			}else{
				this.$pubFuc.showToast('請輸入正確的手機號碼');
			}
			
		},
		//点击获取验证码
		toverification() {
			const that = this;
			if(this.countdown){
				return;
			}
			if(this.registeredtel == ""){
				this.errcode = false;
				return;
			}
			//获取手机号码并且验证
			if(this.$pubFuc.telverification(this.registeredtel)){
				this.$pubFuc.havemember(this.registeredtel).then((res)=>{
					if(res.data.length == 0){
						this.errcode = false;
						this.iserror();
						this.isstart();	
					}else{
						this.errormsg = "手機號碼已註冊,請直接登錄";
						this.errcode = true;
					}
				})
			}else{
				this.errormsg = "手機號碼有誤,請重填";
				this.errcode = true;
			}
		},
		
		//验证码开始倒计时
		isstart(){
			//弹出验证码输入框
			this.verificationcode = true;
			console.log(this.countdown);
			//开始倒计时
			if (!this.countdown) {
				//开始获取验证码 
				//短信还没开通需要验证
				this.$minApi.sendsms({mobile:this.registeredtel}).then((res)=>{
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
			}
		}
	}
};
</script>

<style scoped>
.u-box {
	border: 1px solid #18e68e !important;
}
.group {
	padding-right: 9px;
}
.group:hover {
	background: rgba(0, 0, 0, 0.2);
}
.container {
	display: flex;
}

.outer_le {
	border-radius: 16px 0px 0px 0px;
	padding: 10px 30px 10px 20px;
}
.outer_ri {
	border-radius: 0px 16px 0px 0px;
	padding: 10px 30px 10px 20px;
}
.recolor {
	background: rgba(0, 0, 0, 0.3);
	
}
.locolor {
	background: rgba(79, 114, 156, 0.4);
}
.text {
	line-height: 22px;
	white-space: nowrap;
	color: #ffffff;
	font-size: 16px;
	font-weight: 600;
}
.tagWrap:hover {
	background: rgba(0, 0, 0, 0.2);
}
.tagWrap {
	display: flex;
	margin-top: 10px;
	border-width: 1px;
	border-style: solid;
	border-radius: 10px;
	border-color: rgba(255, 255, 255, 1);
	width: calc(100% - 40px);
	height: 38px;
	line-height: 16px;
	white-space: nowrap;
	color: #ffffff;
	font-size: 13px;
	font-weight: 500;
	padding: 0 18px;
}

.text_1p {
	padding: 0px 18px;
	line-height: 16px;
}

.text_1 {
	width: 100%;
	line-height: 16px;
}

.empty {
	margin-right: 3px;
	border-width: 1px;
	border-style: solid;
	border-color: rgba(255, 255, 255, 0.2);
	/* width: 1px; */
	height: 28px;
}

.block {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	height: 29px;
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

.fopacity {
	opacity: 0.4;
}
.count {
	margin-right: 2px;
	color: #fff;
	/* letter-spacing: 1px; */
	font-size: 12px;
	font-family: PingFangTC-Medium, PingFangTC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 17px;
}

.icon {
	width: 14px;
	height: 11px;
}

.txt {
	color: #18e68e;
	text-decoration: underline;
}

.icon_1 {
	margin-right: 4px;
	width: 16px;
	height: 16px;
}
.isNoce{
	margin-left: 2px;
	margin-top: -5px;
}
.isNocew{
	margin-left: 2px;
	margin-top: 5px;
	color: #E61818;
	font-size:12px;
	font-family:PingFangTC;
	color:rgba(230,24,24,1);
	line-height:17px;
}
</style>
