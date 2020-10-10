<template>
	<view class="mod">
		<view class="flex spanbt">
			<view class="flex" style="align-items: center;">
				<!-- <u-icon @click="forgect()" style="padding: 8px;" name="arrow-left" color="#FFFFFF" size="24px"></u-icon> -->
				<span class="title_font">收到的簡歷</span>
			</view>
			<view class="tit_img" @click="sxuan">
				<image src="/static/images/usersx.png">
			</view>
		</view>
		
		<view class="box_button">
			<!-- 阴影层 -->
			<view class="box_l">
			</view>
			<!-- 中间box -->
			<view class="box_c">
				<!-- 顶部下滑返回 -->
				<view style="text-align: center;" class="box_t" @click="beback()">
					<image class="icon_1" src="/static/images/11a80ad0e39111eab95cafe3ce92de6c.png"/>
				</view>
				<!-- 导航 -->
				<selecta :list="list"></selecta>
				<!-- 内容 -->
				<customSwiper :ctrn="ctrn" />
				
				<view class="mid_btn" v-if="!isfavorites" @click="favorites">
					<image src="/static/images/bfqi.png" alt="">
					
				</view>
				<view class="mid_btnr" v-if="isfavorites">
					<image src="/static/images/bfd.png" alt="">
					<view class="qcvm">
						收藏成功
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import selecta from '@/components/recruiter/select.vue'
	import customSwiper from '@/components/blackmonth-swiper/index'
export default {
  data() {
    return {
		isfavorites:false,
		ctrn:{
			img:"/static/images/74b67240e38911eaaa7cdfff15829f1f.png",
			center:"曾任：產品設計師 HK$20-40K/月",
			year:"5年",
			education:"本科",
			address:"浙江省 杭州市 西湖區",
			msg:"深度互聯網從業人員，對互聯網保持高度的敏感性和關注度，熟悉產品開...",
			pages:8,
			nowpages:2,
		},
		list:[{
				name: '产品经理'
			}, {
				name: '财务总监'
			}, {
				name: '平面设计'
			}, {
				name: '平面设计'
			}, {
				name: '平面设计'
			}],
    };
  },
  components:{
	  selecta,
	  customSwiper
  },
  methods: {
	  favorites(){
		this.isfavorites = !this.isfavorites  
	  },
	  sxuan(){
		 //筛选
		 console.log("点击了筛选");
	  },
	  beback(){
		//返回上一页
		uni.navigateBack({
		    delta: 1,
		    animationType: 'slide-out-bottom',
		    animationDuration: 200
		});
	  },
	 },
};
</script>

<style scoped>
	.midinp{
		margin-top: 8px;
		display: flex;
		border-radius:14px;
		border:1px solid rgba(255,255,255,1);
		color:rgba(255,255,255,1);
		justify-content: space-between;
		padding: 0 0 0 20px;
	}
	.midinp input{
		font-size:14px;
		width: calc( 100% - 40px);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:20px;
		padding: 10px 0;
	}
	.mod{
		min-height: 800px;
	}
	.mod::before {
		min-height: 800px;
		content: '';
		z-index: -1;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: url('/static/images/74b67240e38911eaaa7cdfff15829f1f.png');
		overflow: hidden;
		background-position: center top;
		background-size: cover;
		background-attachment: fixed;
		-webkit-filter: blur(8px);
		-moz-filter: blur(8px);
		-ms-filter: blur(8px);
		-o-filter: blur(8px);
		filter: blur(8px);
	}
	.spanbt{
		justify-content: space-between;
		padding: 52px 24px 24px 24px;
	}
	.title_font{
		font-size:24px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:28px;
	}
	.tit_img{
		width: 40px;
		height: 40px;
		padding: 8px;
	}
	.tit_img img{
		width: 100%;
		height: 100%;
	}
	.box_button{
		background-position: center top;
		background-size: cover;
		border-radius: 32px;
		margin: 0 auto;
		width: calc(100% - 16px);
		min-height: 660px;
		background-image: url('/static/images/110d2a60e39111eaa6585b94bb979a32.png');
		position: relative;
	}
	.box_l{
		width: 100%;
		min-height: 100%;
		background: linear-gradient(180deg, rgba(15, 54, 90, 0.1) 0%, rgba(116, 142, 167, 0.36) 100%);
		border-radius: 32px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.box_c{
		width: 100%;
		border-radius: 32px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.icon_1{
	  align-self: center;
	  margin-top: 12px;
	  padding: 5px 40px;
	  width: 32px;
	  height: 10px;
	}
	.mid_btn{
		margin-top: 42px;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.mid_btn img{
		width: 64px;
		height: 64px;
	}
	.mid_btnr{
		margin-top: 42px;
		width: 100%;
		height: 100%;
		text-align: center;
		object-fit: cover;
	}
	.mid_btnr img{
		width: 64px;
		height: 81px;
	}
	.qcvm{
		margin-top: 6px;
		font-size: 12px;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 17px;
	}
	
	
</style>