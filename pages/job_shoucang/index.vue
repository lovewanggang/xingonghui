<template>
	<view class="center">
		
		<!-- 这里是sosolist top栏 -->
		<view class="flex spanbt">
				  <!-- 返回 -->
			<view class="">
				<u-icon style="padding: 15px 15px;" @click="beback()" name="arrow-left" color="#fff"></u-icon>
			</view>
				<!-- 搜索框 -->
				<view class="flex" style="margin-left: -15px;text-shadow: 1px 1px 1px #aaa;color: #fff;align-items: center;width: 100%;justify-content: center;">
					收藏的職位
				</view>
				<view class="tit_img" @click="sxuan()">
					<image src="/static/images/usersx.png">
				</view>
		</view>
		
		<!-- 中间部分 -->
		<view class="soso_center">
			<!-- 循环列表 -->
			
			<view class="soso_cen" v-for="(item,index) in collectjoblist" @click="todetails(item.job.id)">
					<!-- 上面部分 -->
				<!-- 上面部分 -->
				<view class="flex t_box">
					<!-- 图片 -->
					<view class="img_box">
						<image :src="$pubFuc.advertising(item.job.company.logo)" alt="">
						<!-- <image src="/static/images/3507b230e37f11ea97f28da3d4f7876e.png" alt=""> -->
					</view>
					<!-- 内容 -->
					<view class="box_text">
						<view class="title_box">
							{{item.job.title}}
						</view>
						<view class="title_center">
							{{item.job.company.name}}
						</view>
					</view>
				</view>
				<!-- 3-5年 本科 全职 -->
				<view class="flex tip_box">
					<view>
						{{item.job.seniority_start?item.job.seniority_start:0}} - {{item.job.seniority_end?item.job.seniority_end:0}}
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
					${{item.job.salary_start}}-{{item.job.salary_end}}/月
				</view>
			</view>

				
		</view>
		
		<popup :filter="filter" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popup>
	</view>
</template>
<script>
	// model: { // 负责将对应的事件值传给父组件v-model绑定的变量
	//     prop: 'selectValue', 
	//     event: 'change' // 这个触发事件对应元素自身的事件，比如输入框就是input
	//   },
	import popup from 'components/recruiter/peopup_jobfilter.vue'
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	export default {
		data() {
			return {
				
				
				isnomsg:"",
				user:"",
				backimg: '../../static/images/newsBgc.png',
				type: 1,
				filter: false,
				popuptitle:"",
				collectjoblist: [],
				tapList: [
					{name: '简历邀请', type: 1},
					{name: '面试邀请', type: 2},
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
			popup,
		},
		onLoad() {
			var that = this;
			try{
				const value = uni.getStorageSync('user');
				if(value.id){
					that.user = value;
					that.selected()
				}else{
					that.$openPage('login');
				}
			}catch(e){
				that.$openPage('login');
			}
		},
		methods: {
			beback(){
				uni.navigateBack();
			},
			addpopup(val){
					console.log(val); 
					 var that = this;
					 this.$minApi.collectjoblist({
					 	"member_id":that.user.id,"job_type":val.job_type,"education":val.education,"job_grade":val.job_grade,"salary_start":val.salary_start,"salary_end":val.salary_end,"seniority_start":val.seniority_start
					 }).then((res)=>{
					 	// console.log("这是素有的")
					 	that.collectjoblist = res.data;				 	
					 	
					 })
					 this.filter = false
			},
			closePopup(){
				this.filter = false
			},
			sxuan(val){
					  this.filter = true;
					  this.popuptitle = val
			},
			todetails(job_id){
					  console.log(job_id);
					  this.$openPage({
					            name: 'job_shoucang_details',
					            query: {job_id: job_id},
					  	})
			},
			selected(type){
				var that = this;
				this.$minApi.collectjoblist({
					"member_id":that.user.id
				}).then((res)=>{
					that.collectjoblist = res.data;
				})
			}
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

	.spanbt{
		justify-content: space-between;
		align-items: center;
	}
	.tit_img{
		width: 40px;
		height: 35px;
		padding: 8px;
	}
	.tit_img image{
		width: 100%;
		height: 100%;
	}

.head_list{
	font-size:28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
	text-align: center;
	width: 232upx;
}
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
	height: 100%;
	background: url('/static/images/bag2.png');
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	text-align: center;
	padding: 100upx 40upx 50upx 40upx;
	overflow: hidden;
}
.content{
	padding-top: 46upx;
	/* height: 100%; */
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
	overflow-x: hidden;
}
.soso_center{
	margin: 24px 14px 14px 14px;
	overflow: auto;
	-webkit-overflow-scrolling: touch;

	/* height: 100%; */
	}
.soso_cen{
	width: 100%;
	/* height: 100%; */
	padding: 14px ;
	margin-bottom: 16px;
	position: relative;
	background: hsla(64, 91, 126, 0.1);
	overflow: hidden;
	z-index: 1;
	border-radius: 12px;
}
.soso_cen::before {
	/* height: 100%; */
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
