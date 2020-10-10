<!-- 输入密码组件 -->

<template>
	<view>
		<view class="center_index">
			<view class="word">{{ texta }}</view>
			<span class="desc">請輸入6-8位字母加數字的密碼</span>
			<view class="group" :class="{red:errcode}" style="margin-bottom: 0px;padding-left: 15px;">
				<!-- <input class="text_1 text_2p" placeholder-class="tagwrp" placeholder="請輸入手機號" type="number" v-model="registeredtel" /> -->
				<!-- :type="intype" -->
				<input class="text_1 text_2p" maxlength="8"  placeholder-class="tagwrp" placeholder="請輸入密碼" v-if="pas"  type="password" v-model="passwordvalue" />
				<input class="text_1 text_2p" maxlength="8"  placeholder-class="tagwrp" placeholder="請輸入密碼" v-if="!pas"  type="text" v-model="passwordvalue" />
				<view class="block">
					<view class="wrap" @click="passbtn"><u-icon :name="iconkey" color="#fff" size="18px"></u-icon></view>
				</view>
			</view>
			<view class="isNoce" v-if="errcode">
				{{errormsg}}
			</view>
		</view>
		<!-- 按钮btn -->
		<view class="btn"><passwordBtn @goback="goback"></passwordBtn></view>
	</view>
</template>

<script>
import passwordBtn from 'components/login/bottom';
export default {
	name: 'password',
	data() {
		return {
			pas:true,
			errormsg:"密碼不合規範",
			errcode:false,
			iconkey: 'eye-off',
			passwordvalue:"",
		};
	},
	props: {
		texta: {
			type: String,
			val: null
		},
		tofpasswordId:{
			type: String,
			val: null
		},
		registeredtel:{
			tyoe:String,
			val:null
		}
	},
	components: {
		passwordBtn
	},
	onLoad() {},
	methods: {
		passbtn() {
			if (this.intype == 'text') {
				//隐藏密码
				this.iconkey = 'eye-off';
				this.intype = 'password';
				this.pas = true;
			} else {
				//显示密码
				this.iconkey = 'eye-fill';
				this.intype = 'text';
				this.pas = false;
			}
			this.errcode = false;
		},
		goback() {
			console.log(this.tofpasswordId);
			 if(this.$pubFuc.password(this.passwordvalue)){
				 if(this.tofpasswordId == "-1"){
					 // console.log(this.passwordvalue);
					 // console.log(this.registeredtel);
					 //跳转前往选择的页面
					 this.$openPage({
					           name: 'character',
					           query: {pas: this.passwordvalue,tel:this.registeredtel},
							})
				 }else{
					 //这里是找回密码
					 this.$minApi.menberpassword({password:this.passwordvalue},this.tofpasswordId).then((res)=>{
						 // console.log(res);
						 if(res.code == 0){
							this.$emit('goback');
						 }
					 })
				 }
			 }else{
				 this.errcode = true;
			 }
		}
	}
};
</script>

<style scoped>
.center_index {
	border-radius: 16px;
}
.tagwrp {
	opacity: 0.6;
}
.desc {
	margin-left: 0;
}
.group {
	padding-right: 9px;
	margin-top: 15px;
}
.group:hover {
	background: rgba(0, 0, 0, 0.2);
}
.text_1 {
	width: 100%;
	padding-left: 5px;
	line-height: 16px;
}
.block {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	height: 29px;
}
.word {
	padding-top: 10px;
	padding-bottom: 5px;

	font-family: PingFangTC-Semibold, PingFangTC;
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
.btn {
	margin: 0 10px;
	padding-top: 5px;
}
.isNoce{
	margin-left: 2px;
	margin-top: 5px;
}
</style>
