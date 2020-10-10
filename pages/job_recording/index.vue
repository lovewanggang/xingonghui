<template>
	<view class="center">
		<view class="center_head">
			<view v-for="item in tapList" @click="selected(item.type,1,true)" :class="{head_list_select: type == item.type}" class="head_list">{{item.name}}</view>
		</view>
		<!-- 中间部分 -->
		<view class="soso_center">
				  <!-- 循环列表 -->
			<view class="soso_cen" v-for="(item,index) in resumeList" @click="todetails(item.job_id)">
					<!-- 上面部分 -->
				<view class="flex t_box">
						<!-- 图片 -->
					<view class="img_box" v-if="item.company">
						<image :src="$pubFuc.advertising(item.company.logo)" alt="">
							<!-- <image src="/static/images/3507b230e37f11ea97f28da3d4f7876e.png" alt=""> -->
					</view>
						<!-- 内容 -->
						<view class="box_text">
							<view class="title_box">
								{{item.job.title}}
							</view>
							<view class="title_center" v-if="item.company">
								{{item.company.name}}
							</view>
						</view>
						<!-- <view class="">
							<u-icon style="padding: 8px 8px 8px 8px;" name="bookmark-fill" color="#aaa" size="20px"></u-icon>
						</view> -->
				</view>
					<!-- 3-5年 本科 全职 -->
					<view class="flex tip_box">
						<view>
							<!-- <image class="iamge" src="/static/images/gwbb.png"></image> -->
							{{item.job.seniority_start?item.job.seniority_start:0}} - {{item.job.seniority_end?item.job.seniority_end:0}}年
						</view>
						<view>
							{{item.job.education}}
						</view>
						<view v-if="item.job.job_type ==1">
							全职
						</view>
						<view v-else>
							兼职
						</view>
					</view>
					<!-- 薪资 -->
					<view class="bom_box">
						HK${{item.salary_start}}-{{item.salary_end}}/月
					</view>
			</view>
		</view>
		
		<navigation></navigation>
	</view>
</template>
<script>
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	import navigation from 'components/public/job_tobar.vue'
	export default {
		data() {
			return {
				isnomsg:"",
				user:"",
				backimg: '../../static/images/newsBgc.png',
				type: 1,
				page:1,
				limit:6,
				messageList: [],
				resumeList:[],
				tapList: [
					{name: '已發送', type: 1},
					{name: '被查看', type: 2},
				],
				params:{
				    width:'100%',
				    height:'100%',
				    image:"/static/images/bag2.png",
				    blur:"m"
				},
			}
		},
		components: {
			helangBlur,
			navigation
		},
		onLoad() {
			var that = this;
			try{
				const value = uni.getStorageSync('user');
				
				if(value.id){
					that.user = value;
					that.selected(that.type,1)
				}else{
					that.$openPage('login');
				}
			}catch(e){
				that.$openPage('login');
			}
		},
		onReachBottom() {
		      if (this.initStatus) return
				this.page++
				this.selected(this.type,this.page)
		   console.log("到了底部了"+this.page);
		  },
		methods: {
			selected(type,page,is=false){
				if(type==this.type && is==true){
					return; 
				}
				this.type = type
				var that = this;
				if(type==2){
					//被查看
					this.$minApi.Resumeview({"s":{"member_id":that.user.id},"page":that.page,"limit":that.limit}).then((res)=>{
						if(that.page==1){
							that.resumeList = res.data.data;
						}else{
							that.resumeList = that.resumeList.concat(res.data.data);
						}
						if(that.page == res.pageCount){
							this.initStatus = true
						}
						
					})
				}else{
					//已發送
					this.$minApi.Receiveresume({"s":{"member_id":that.user.id},"page":that.page,"limit":that.limit}).then((res)=>{
						if(that.page==1){
							that.resumeList = res.data.data;
						}else{
							that.resumeList = that.resumeList.concat(res.data.data);
						}
						if(that.page == res.pageCount ){
							this.initStatus = true
						}
					})
				}
			},
			todetails(id){
					  this.$openPage({
					            name: 'job_recording_details',
					            query: {job_id: id},
					  	})
			},
		}
	}
</script>
<style scoped>
uni-page-body {
	height: 100%;
}
body,
html {
	height: 100%;
}
page{
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	height:100%;
}
.head_list{
	font-size:28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
	text-align: center;
	width: 232upx;
}
/* .iamge{
	height: 50upx;
	width: 50upx;
} */
.head_list_select{
	background: #278A23;
	width: 232upx;
	height: 84upx;
	border-radius: 24upx;
	line-height: 84upx;
}
.center_head{
	height: 72upx;
	color: #FFFFFF;
	width: 464upx;
	border-radius: 24upx;
	background:rgba(39,138,35,0.4);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.acmd{
	position:absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.center{
	background: url('/static/images/bag2.png');
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	text-align: center;
	padding: 100upx 40upx 180upx 40upx;
	min-height: 100%;
}
.content{
	padding-top: 46upx;
}
.content_list{
	position: relative;
	width:100%;
	background:rgba(64,98,147,0.1);
	border-radius:32upx 32upx 32upx 8upx;
	margin-bottom: 30upx;
	padding: 30upx 40upx;
	display: flex;
	justify-content: space-between;
}
.soso_center{
		margin:24px 14px 14px 14px;
		max-height: 100%;
	}
	.soso_cen{
		width: 100%;
		padding: 14px ;
		margin-bottom: 12px;
		position: relative;
		background: hsla(64, 91, 126, 0.1);
		overflow: hidden;
		z-index: 1;
		border-radius: 12px;
	}
	.soso_cen::before {
		border-radius: 12px;
		content: '';
		z-index: -1;
		opacity: 1;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		border-radius: 16px;
		margin: -10px;
		background: url('/static/images/bag2.png');
		 background-position: center top;
		 background-size: cover;
		 background-attachment: fixed;
		 -webkit-filter: blur(18px);
		 -moz-filter: blur(18px);
		 -ms-filter: blur(18px);
		 -o-filter: blur(18px);
		 filter: blur(18px);
	}
	.img_box{
		width: 50px;
		height: 50px;
	}
	.img_box image{
		width: 100%;
		height: 100%;
	}
	.t_box{
		color: #fff;
		
		/* justify-content: space-between; */
	}
	.box_text{
		margin-left: 16px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		letter-spacing: 1px;
		text-align: left;
	}
	.title_box{
		margin-top: 3px;
		text-align: left;
	}
	.title_center{
		margin-top: 5px;
	}
	.tip_box{
		color: #fff;
		margin-top: 8px;
	}
	.tip_box view {
		margin: 5px;
		font-size: 12px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		letter-spacing: 1px;
		background-color: rgba(170,170,170,0.2);
		padding: 0px 14px;
		border-radius: 15px;
	}
	.bom_box{
		text-align: left;
		margin-top: 8px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		letter-spacing: 1px;
	}
</style>
