<template>
	<view class="mod_login" :style="{ backgroundImage: 'url(' + backimg + ')' }">
		<!-- 阴影层组件 -->
		<loginShowLayer @layerclose="layerclose" @goback="goback" :layer_type="layer_type" v-if="layer_type != -1"></loginShowLayer>
		<view v-if="type == 0">
			<loginTopMove :top_center="top_center"></loginTopMove>
			<view class="main">
				<!-- 登录注册 -->
				<view class="backgroundWrap"><loginBottom @safety="safety" @freeze="freeze" @topassword="topassword" @istologin="istologin"></loginBottom></view>
			</view>
		</view>
		<view v-if="type == 1">
			<!-- 安全验证 -->
			<loginTopbackMove @forgect="forgect" :top_center="top_center"></loginTopbackMove>
			<view class="main">
				<view class="backgroundWrap"><loginForget @layershow="layershow" @tofpassword="tofpassword" @layerfreeze="layerfreeze" :isfreeze="isfreeze"></loginForget></view>
			</view>
		</view>
		<view v-if="type == 2">
			<loginTopMove :top_center="top_center"></loginTopMove>
			<!-- 密码输入 -->
			<view class="main">
				<view class="backgroundWrap"><password @goback="goback" :registeredtel=registeredtel :texta="texta" :tofpasswordId="tofpasswordId"></password></view>
			</view>
		</view>
		<view v-if="type == 3">
			<!-- 重置密码 -->
			<loginTopbackMove :top_center="top_center" @forgect="safety"></loginTopbackMove>
			<view class="main">
				<view class="backgroundWrap"><password @goback="layersafety" :texta="texta" :tofpasswordId="tofpasswordId"></password></view>
			</view>
		</view>
	</view>
</template>
<script>
import loginTopMove from 'components/login/login_top.vue';
import loginShowLayer from 'components/login/login_showlayer.vue';
import loginTopbackMove from 'components/login/login_topback.vue';
import loginBottom from 'components/login/login_bottom.vue';
import loginForget from 'components/login/login_forget';
import password from 'components/login/login_password';

export default {
	name: 'login',
	data() {
		return {
			istoadress:false,
			top_center: ['高效', '輕鬆', '有趣'],
			type: 0, //0==>注册登录  1==>忘记密码/冻结账户的安全验证   2==>密码输入     3==>密码重置   
 			isfreeze: false, //是否冻结
			layer_type: -1, //-1==>关闭不显示    0==>联系客服   1==>忘记密码修改密码   2==>冻结账号
			texta: '重置密碼',
			tofpasswordId:"-1",//找回密码的id 
			registeredtel:"",
			backimg:"",
		};
	},
	components: {
		loginTopMove,
		loginBottom,
		loginTopbackMove,
		loginForget,
		loginShowLayer,
		password
	},
	onLoad(opion) {
		const that = this
		if(this.$parseURL().uid && this.$parseURL().umobile){
			this.istoadress = true;
			this.freeze();
		}else{
			this.istoadress = false;
		}
		// 查询用户信息是否存在
		//获取广告图片 pictures
			try {
				//获取缓存的图片value
			    const value = uni.getStorageSync('photo');
				// console.log(value);
				that.backimg = that.$pubFuc.advertising(e.data.filter((res)=>{
					return res.location == "login"
				})[0].img)
			} catch (e) {
				// 调用广告的接口
				//用接口获取图片
				this.$pubFuc.pictures().then((res)=>{
					this.backimg = this.$pubFuc.advertising(res.data.filter((res)=>{
							return res.location == "login"
						})[0].img)
					uni.setStorage({
						key:"photo",
						data:res.data
					});
				});
			}
	},
	methods: {
		//去往重置密码
		tofpassword(id) {
			this.tofpasswordId = id;//修改密码的id
			this.type = '3';
			this.texta = '重置密碼';
			this.top_center = '重置密碼';
		},
		//去往输入密码
		topassword(val) {
			this.registeredtel = val;//注册的账号
			this.tofpasswordId = "-1";//-1标识这是注册
			this.type = '2';
			this.texta = '設置密碼';
			this.top_center = ['高效', '輕鬆', '有趣'];
		},
		//去往首页
		forgect() {
			if(this.istoadress){
				console.log("这是有账号跳转过来的");
				this.istoadress = false;
				//返回上一页
				uni.navigateBack();
			}else{
				this.type = '0';
				this.top_center = ['高效', '輕鬆', '有趣'];
			}
		},
		//去往冻结安全验证
		freeze() {
			this.isfreeze = true;
			this.type = '1';
			this.top_center = '安全驗證';
		},
		//找回密码
		safety() {
			this.isfreeze = false;
			this.type = '1';
			this.top_center = '安全驗證';
		},
		//点击了登录
		istologin(val,pas) {
			console.log('点击了登录');
			this.$openPage('character');
		},
		//返回登录
		goback() {
			this.layer_type = -1;
			this.forgect();
		},
		//关闭阴影层弹出窗口
		layerclose() {
			this.layer_type = -1;
		},
		//联系客服方法
		layershow() {
			this.layer_type = 0;
		},
		//冻结成功
		layerfreeze() {
			this.layer_type = 2;
		},
		//忘记密码修改密码
		layersafety() {
			// console.log("进了首页了么"); 联赛机制啊
			this.layer_type = 1;
		},
		
	}
};
</script>
<style scoped>
.main {
	display: flex;
	width: 100%;
	position: absolute;
	bottom: 30px;
}
.backgroundWrap {
	width: calc(100% - 20px);
	display: flex;
	flex-direction: column;
	margin: 0 10px;
	z-index: 11;
}
</style>
