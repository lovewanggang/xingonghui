<!-- 安全验证组件 -->

<template>
	<view class="">
		<view class="center_index">
			<view class="word">安全驗證</view>
			<span class="desc">請輸入手機號並發送郵件接收驗證碼</span>
			<view class="group" :class="{red:errcode}" style="margin-bottom: 10px;padding-left: 15px;">
				<div class="markWrap"><image class="mark" src="/static/images/flag.png" /></div>
				<image class="icona" src="/static/images/to_bt.png" />
				<view class="empty" />
				<input class="text_1 text_2p" placeholder-class="tagwrp" placeholder="請輸入手機號" type="number" v-model="tel" />
			</view>
			<view class="isNoce" v-if="errcode">
				{{errormsg}}
			</view>

			<!-- 按钮 -->
			<view class="tagWrap" @click="verificationTel"><span class="tag">發送郵件</span></view>

			<!-- 验证码 -->
			<view class="veri">
				<u-message-input
					@finish="finish"
					font-size="45"
					inactive-color="#fff"
					active-color="#fff"
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
					<view class="block_1" @click="to_kefu"><span class="word_1">聯繫客服</span></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'login_forget',
	data() {
		return {
			constants: {},
			tel: '', //手机号码 
			breathe: true,
			bold: false,
			maxlength: 6,
			errormsg:"沒有該用戶",
			errcode:false,
			sendsms:"",
			toid:"",//找回密码的id
		};
	},
	props: {
		top_center: {
			type: Array,
			val: null
		},
		isfreeze: {
			type: Boolean,
			val: null
		}
	},
	onLoad() {},
	methods: {
		finish(value) {
			if(value == this.sendsms){
				// 判断是冻结账号还是找回密码
				if (this.isfreeze) {
					//冻结
					//开始冻结账号
					this.$emit('layerfreeze');
				} else {
					//找回密码
					this.$emit('tofpassword',this.toid);
				}
			}else{
				that.$pubFuc.showToast('驗證碼有誤')
			}
			
		},
		to_kefu() {
			// console.log("点击联系客服");
			this.$emit('layershow');
		},
		verificationTel() {
			const that = this;
			//判空
			if(this.tel == ""){
				that.errcode = false;
				return ;
			}
			// 验证是否有手机号码
			this.$pubFuc.havemember(this.tel).then((res)=>{
				
				if(res.data.length!=0){
					//有用户查看是否有邮箱
					that.errcode = false;
					//调用邮箱
					console.log(res);
					if(res.data[0].email){
						that.$minApi.sendmail({email:res.data[0].email}).then((resa)=>{
							if(resa.code == 0){
								// that.$pubFuc.showToast('驗證碼已發送,未收到請查看垃圾箱');
								that.$pubFuc.showToast('驗證碼:'+resa.data.code_number);
								that.toid = res.data[0].id;
								that.sendsms = resa.data.code_number;
							}else{
								that.$pubFuc.showToast('驗證碼發送失敗,請從新發送')
							}
						})
					}else{
						that.$pubFuc.showToast('没有邮箱请联系客服');
						this.$emit('layershow');
					}
					
				}else{
					//没有用户
					that.errcode = true;
				}
			})
		}
	}
};
</script>

<style scoped>
.txt {
	letter-spacing: 1px;
	color: #fff;
}

.veri {
	margin-top: 10px;
}
.word {
	padding-top: 10px;
	padding-bottom: 2px;
	font-family: PingFangTC-Semibold, PingFangTC;
}
.veri {
	margin-left: -6px;
}
.center_index {
	border-radius: 16px;
}
.center_index::before {
	border-radius: 16px;
}

.text_2p {
	border-radius: 0 8px 8px 0;
}
.text_1 {
	line-height: 16px;
	width: 100%;
	white-space: nowrap;
	color: #ffffff;
	font-size: 13px;
	font-weight: 500;
}
.tagwrp {
	font-size: 12px;
	color: #fff;
}
.group:hover {
	background: rgba(0, 0, 0, 0.2);
}
.tagWrap {
	display: flex;
	position: relative;
	align-items: center;
	align-self: center;
	flex-direction: row;
	justify-content: center;
	margin-top: 15px;
	border-radius: 16px;
	background-image: linear-gradient(0deg, #1ceeaf 0%, #079742 100%);
	width: calc(100%);
	height: 37px;
	-moz-box-shadow: 0px 3px 0px 0px #05653b;
	-webkit-box-shadow: 0px 3px 0px 0px #05653b;
	box-shadow: 0px 3px 0px 0px #05653b;
}
.tagWrap:active {
	-moz-box-shadow: 0px 0px 0px 0px #05653b;
	-webkit-box-shadow: 0px 0px 0px 0px #05653b;
	box-shadow: 0px 0px 0px 0px #05653b;
}
.tag {
	max-width: 303px;
	height: 17px;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 17px;
	white-space: nowrap;
	color: #ffffff;
	font-size: 12px;
	font-weight: 500;
}
.isNoce{
	margin: -5px 0 -10px 2px;
}
</style>
