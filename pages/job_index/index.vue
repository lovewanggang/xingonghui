<template>
	<view class="center">
		<view class="cetent_head">
			<view class="head_left">
				<view class="head_title">歡迎回來!</view>
				<view class="head_name">{{user.realname}}</view>
			</view>
			<view @click="Settings" class="head_right">
				<u-icon size="60" name="setting"></u-icon>
			</view>
		</view>
		<view class="content">
			<view class="advertisement">
				<image :src="backimg" alt="">
			</view>
			<view class="optionsList">
				<view @click="back(item.url)" v-for="(item,index) in optionsList" class="options">
					<image :src="item.img" ></image>
					<view class="optina" :class="{'vipco':index == 1}" >{{item.name}}</view>
				</view>
			</view>
			<view class="article" @click="article(item.id)" v-for="(item,index) in newList">
				<view class="article_head">
					<view>職場規則</view>
					<view>{{$pubFuc.timeconversion(item.updated_at)}}</view>
				</view>
				<view class="article_content">
					{{item.title}}
				</view>
			</view>
		</view>
		<navigation></navigation>
	</view>
</template>
<script>
	import navigation from 'components/public/job_tobar.vue' 
	export default{
		name:"jobindex",
		data(){
			return {
				backimg:"",//图片
				user: [],
				optionsList: [
					{name: '簡歷',img: '/static/images/z_jigou.png', url: 'job_resume'},
					{name: 'VIP', img: '/static/images/vip2.png', url: 'job_vip'},
					{name: '獵頭',img: '/static/images/z-lietou.png', url: ''},
					{name: '收藏',img: '/static/images/z_shezhi.png', url: 'job_shoucang'},
				],
				newList:[],
			}
		},
		onLoad() {
			const that = this
			console.log(this.$route);
			uni.setStorage({
				key:"identity",
				data:1
			})
			//获取用户信息
			this.getUser();
			//获取新闻信息
			this.$minApi.article({s:{'type':1}}).then((res)=>{
				this.newList = res.data;
			});
			// 获取广告信息 
			// 那边要兵秒捐的么
			this.pictures();
		},
		components: {
			navigation
		},
		methods:{
			// 获取广告图
			pictures(){
				const that= this;
				// 获取广告图片
				try {
					// 获取缓存的图片value
				    const value = uni.getStorageSync('photo');
					that.backimg = that.$pubFuc.advertising(value.filter((res)=>{
						return res.location == "company_center"
					})[0].img)
				} catch (e) {
					// 调用广告的接口
					this.$pubFuc.pictures().then((res)=>{
						this.backimg = this.$pubFuc.advertising(res.data.filter((res)=>{
								return res.location == "company_center"
							})[0].img)
						uni.setStorage({
							key:"photo",
							data:res.data
						});
					});
				}
				//
			},
			// 获取用户信息
			getUser(){
				var that = this;
				try{
					const value = uni.getStorageSync('user');
					if(value.id){
						that.user = value;
					}else{
						that.$openPage('login');
					}
				}catch(e){
					that.$openPage('login');
				}
			},
			back(){
				const that = this;
				uni.removeStorage({
				    key: 'user',
				    success: function (res) {
						that.$openPage('login');
				    },
					error:function(e){
						
					}
				});
			},
			Settings() {
				const that = this;
				that.$openPage('job_currency_set');
			},
			back(url) { // 頁面跳轉
				this.$openPage(url);
			},
			article(id) { //跳轉文章詳情頁
				// timeconversion
				//携带id
				this.$openPage({
				          name: 'recruiter_article',
				          query: {id: id},
				});
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
.optina{
	font-size: 14px;
	font-family: PingFangHK-Medium, PingFangHK;
	font-weight: 600;
	color: #0E320D;
	line-height: 20px;
}
.vipco{
	color: #1E5E1C!important;
	background: linear-gradient(180deg, #BBFF00 0%, #278A23 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.center{
	background-color: #F4FAF3;
	padding: 100upx 40upx 200upx 40upx;
}
.cetent_head{
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.head_title, .head_name{
	font-size:48upx;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(17,14,11,1);
}
.head_name{
	font-size:28upx;
}
.content{
	margin-top: 40upx;
	width: 100%;
	height: 100%;
}
.advertisement{
	width:100%;
	height:244upx;
	box-shadow:0px 20px 30px 0px rgba(66,94,119,0.2);
	border-radius:32upx;
}
.advertisement image{
	width: 100%;
	height: 100%;
	object-fit: contain;
}
.advertisement_title{
	padding: 36upx 0 0 78upx;
	color: #FFFFFF;
	font-size: 32upx;
}
.optionsList{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 60upx 20upx;
}
.options{
	width: 120upx;
	text-align: center;
}
.options image{
	width: 100%;
	height: 120upx;
}
.article{
	height: 346upx;
	width: 100%;
	background: url('/static/images/4223e1d0e41711eaaa7cdfff15829f1f.png');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	box-shadow:0px 0px 8px rgba(222,222,222,0.4);
	border-radius:32upx;
	padding: 32upx 40upx 0 40upx;
	margin-bottom: 32upx;
}
.article_head{
	display: flex;
	justify-content: space-between;
	font-size:24upx;
	font-family:PingFangTC-Regular,PingFangTC;
	font-weight:400;
	color:rgba(37,54,86,1);
}
.article_content{
	font-size:36upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(36,53,87,1);
	margin-top: 8upx;
}
</style>
