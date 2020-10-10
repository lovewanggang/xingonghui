<template>
	<view class="mod_login" :style="{ backgroundImage: 'url(' + backimg + ')' }">
		<loginShowLayer @layerclose="goback" @goback="goback" :layer_type="layer_type" v-if="layer_type != -1"></loginShowLayer>
		<loginTopbackMove :top_center="top_center" @forgect="forgect"></loginTopbackMove>
		<!-- 选择角色 -->
		<view class="main">
			<view class="backgroundWrap">
				<view class="title" v-if="recruiter">
					請選擇您的角色
				</view>
				<view class="center" v-if="recruiter">
					請選擇角色用最輕鬆的方式招聘/求職吧！
				</view>
				
				<view class="center_index chi" v-if="recruiter">
					<view class="tp">
						<!-- 左边 -->
						<view class="tp_top">
							<view class="top_tit">
								我是求職者
							</view>
							<view class="top_center">
								創建人才簡歷輕鬆求職！
							</view>
						</view>
						<view class="btn_h">
							<u-slider v-model="value" :disabled="slidertrue"  :use-slot="true" active-color="rgb(192, 196, 204)" inactive-color="#fff">
								<!-- 这里外面需要多一层view，否则".badge-button"样式可能不生效 -->
								<view class="ttr">
									<view class="tagWrap" ><span class="tag"><u-icon color="#fff" name="arrow-leftward"></u-icon></span></view>
								</view>
							</u-slider>
						</view>
					</view>
					<view class="heng">
						<!-- 横线 -->
					</view>
					<view class="tp ">
						<!-- 右边 -->
						<view class="tp_top r10">
							<view class="top_tit">
								我是招聘者
							</view>
							<view class="top_center">
								創建公司名片輕鬆招聘！
							</view>
						</view>
						<view class="btn_r">
							<u-slider v-model="values"  :disabled="slidertrue" :use-slot="true" active-color="#fff" inactive-color="rgb(192, 196, 204)">
								<view class="ttr">
									<view class="tagWrap" ><span class="tag"><u-icon  color="#fff" name="arrow-rightward"></u-icon></span></view>
								</view>
							</u-slider>
						</view>
					</view>
				</view>
				
				
				<!-- 选择机构 -->
				<view class="center_index" v-if="!recruiter">
					<view class="to_center">
						<view class="cra">
							<input class="nuainput" placeholder="請輸入分享碼"  type="text"  v-model="share" />
						</view>
						<view class="li" @click="tomechanism">
							加入機構
						</view>
						<view class="li" @click="createmechanism">
							創建機構
						</view>
						<view class="" @click="ismechanism">
							我是獵頭
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loginTopbackMove from 'components/login/login_topback.vue';
	import loginShowLayer from 'components/login/login_showlayer.vue';
	export default{
		name:"character",
		data(){
			return {
				islogin:true,
				top_center:"選擇角色",
				value:100,
				values:0,
				slidertrue:false,
				registered:false,
				pas:"",
				tel:"",
				backimg:"",
				recruiter:true,
				layer_type:-1,
				share:"",
			}
		},
		components:{
			loginTopbackMove,
			loginShowLayer
		},
		watch:{
			 value(val){
				 const that = this;
				if(val == 0){
					//关闭滑块功能
					this.slidertrue = true;
					setTimeout(()=>{
						uni.setStorage({
							key:"identity",
							data:0
						})
						if(this.islogin){
							// console.log("前往求职者端口首页");
							that.$openPage('jobindex');
						}else{
							// 账号密码身份然后注册
							this.$minApi.register({mobile:that.tel,password:that.pas,type:1}).then((res)=>{
								// console.log(res);
								//获取token储存token
								uni.setStorage({
									key:"user",
									data:res.data
								})
								// console.log("前往求职者端口首页");
								that.$openPage('jobindex');
							});
						}
						
					},300);
				}
			 },
			 values(val){
				 const that = this;
				if(val == 100){
					uni.setStorage({
						key:"identity",
						data:1
					})
					//关闭滑块功能 
					this.slidertrue = true;
					if(this.islogin){
						//判断有没有公司行业id有的话直接进入招聘者端口
						uni.getStorage({
							key:"user",
							success(e){
								console.log(e.data);
								if(e.data.company_id){
									//跳转到招聘者的里面去
									that.$openPage('recruiterindex');
								}else{
									that.replynum();
								}
								// e.data//这就是你想要取的token
							}
						})
					}else{
						setTimeout(()=>{
							// console.log("选择机构页面");
							this.replynum();
						},300);
					}
					
				}
			 }
		},
		onLoad(option) {
			const that = this;
			//重置
			this.value = 100,
			this.values = 0,
			this.slidertrue = false;
			uni.getStorage({
				key:"photo",
				success(e){
					that.backimg = that.$pubFuc.advertising(e.data.filter((res)=>{
							return res.title == "首页广告"
						})[0].img) 
				}
			})
			//判断身份
			
			//判断是登录还是注册
			if(JSON.parse(option.query).pas && JSON.parse(option.query).tel){
				this.islogin = false;
				this.pas = JSON.parse(option.query).pas;
				this.tel = JSON.parse(option.query).tel;
			}
		},
		methods:{
			forgect(){
				if(this.recruiter){
					uni.navigateBack();
				}else{
					this.recruiter = true;
					this.value = 100;
					this.values = 0;
					this.slidertrue = false;
				}
			},
			//前往招聘者的端口
			replynum(){
				console.log("获取招聘者的选择");
				this.top_center = "選擇機構";
				this.recruiter = false;
			},
			//加入机构
			tomechanism(){
				const that = this
				if(this.share == ""){
					this.$pubFuc.showToast('請輸入分享碼');
				}else{
					console.log(this.share);
					// 账号密码身份然后注册
					this.$minApi.register({mobile:that.tel,password:that.pas,company_code:this.share,type:2}).then((res)=>{
						console.log(res);
						if(res.code==0){
							//获取token储存token
							uni.setStorage({
								key:"user",
								data:res.data
							})
							that.$openPage('recruiterindex');
						}else{
							this.$pubFuc.showToast('分享碼不正确');
						}
					});
					
				}
			},
			//创建机构
			createmechanism(){
				// this.$pubFuc.showToast('正在開發');
				// 跳转页面
				// this.$openPage('perfect');
				this.$openPage({
				          name: 'perfect',
				          query: {pas: this.pas,tel:this.tel},
					})
			},
			ismechanism(){
				this.layer_type = 3;
			},
			//
			goback(){
				this.layer_type = -1;
			},
		},
	}
</script>
<style scoped>
	.main {
		display: flex;
		width: 100%;
		position: absolute;
		bottom: 65px;
	}
	.backgroundWrap {
		width: calc(100% - 20px);
		display: flex;
		flex-direction: column;
		margin: 0 10px;
		z-index: 11;
	}
	.chi{
		height: 160px;
	}
	.center_index {
		display: flex;
		border-radius: 16px;
		padding: 20px 10px;
		
	}
	.center_index::before {
		border-radius: 16px;
	}
	.title{
		margin-left: 10px;
		font-size:20px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:28px;
		letter-spacing: 1px;
	}
	.center{
		font-size:12px;
		font-family:PingFangTC;
		color:rgba(255,255,255,1);
		line-height:17px;
		margin-left: 10px;
		margin-top: 3px;
		margin-bottom: 28px;
	}
	.top_tit{
		font-size:20px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:28px;
	}
	.top_center{
		font-size:12px;
		font-family:PingFangTC;
		color:rgba(255,255,255,1);
		line-height:22px;
	}
	.tp{
		flex: 1;
	}
	.tp_top{
		margin-left: 10px;
		margin-top: 10px;
	}
	.r10{
		margin-left: 20px;
	}
	.heng{
		height: 100%;
		width: 1px;
		background-color: #fff;
		/* margin-right: 10px; */
	}
	.btn_h{
		margin-left: 20px;
		margin-right: 40px;
		margin-top: 32px;
		background-color: #000;
		
	}
	.btn_r{
		margin-left: 40px;
		margin-right: 20px;
		margin-top: 32px;
	}
	.ttr{
		margin-top: -15px;
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
	width: 40px;
	height: 40px;
	-moz-box-shadow: 0px 3px 0px 0px #05653b;
	-webkit-box-shadow: 0px 3px 0px 0px #05653b;
	box-shadow: 0px 3px 0px 0px #05653b;
}
.tagWrap:active {
	-moz-box-shadow: 0px 0px 0px 0px #05653b;
	-webkit-box-shadow: 0px 0px 0px 0px #05653b;
	box-shadow: 0px 0px 0px 0px #05653b;
}
.to_center{
	/* margin-top: 10px; */
	text-align: center;
	width: 100%;
	font-size:14px;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:38px;
	margin-bottom: -10px;
	
}
.li{
	border-bottom: 1px solid rgba(225,224,227,0.4);
	margin: 0px -10px;
}
.nuainput{
	
	text-align: left;
	margin: 5px 10px;
	background:rgba(248,248,248,1);
	border-radius:10px;
	line-height: 16px;
	padding: 6px 20px;
	color: #0E2124;
	font-family:PingFangTC-Medium,PingFangTC;
	font-size: 14px;
}
.cra{
	margin-bottom: 10px;
}
</style>
