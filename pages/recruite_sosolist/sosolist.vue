<template>
  <view class="mod">
	  <view style="width: 100%;height: 44px;">
	  </view>
	  <view class="torp">
		  <view style="text-align: center;" @click="forgect()">
		  	<image class="icon_1" src="/static/images/11a80ad0e39111eab95cafe3ce92de6c.png"/>
		  </view>
	  	<!-- top -->
	  	<view class="flex spanbt">
	  		<view class="flex" style="align-items: center;width: 100%;">
				<view class="title_font" style="width: 100%;margin-right: 16px;">
					<input v-model="sosoval" placeholder="輸入搜索簡歷" style="width: 100%;" placeholder-class="ssax" type="text">
					<u-icon style="padding: 8px 20px 8px 8px;" @click="ctiner(1)" name="search" color="#FFFFFF" size="14px"></u-icon>
				</view>
	  		</view>
	  		<view class="tit_img" @click="sxuan('篩選條件')">
	  			<image src="/static/images/usersx.png">
	  		</view>
	  	</view>
	  	<!-- 内容 -->
		<view class="flex" style="flex-wrap: wrap;" v-if="isnone">
			<view class="flex flex_war" v-for="(item,index) in searchjobList"  @click="oninto(index);">
				<view class="carna" :style="{ backgroundImage: 'url(' + $pubFuc.advertising(item.photo) + ')' }">
					<view class="bcga">
						<view class="top_centt">
							{{item.family_name}}{{item.first_name}}
						</view>
						<view class="top_centt">
							曾任: {{item.title}}
						</view>
						<view class="top_centt">
							
							${{item.salary_start/1000 +"K"}}-{{item.salary_end/1000 +"K"}}/月
						</view>
						<view class="top_centts">
							{{item.work_experience}}年 / {{item.education}} 
							<!-- / {{item.city}} -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="centea" v-else>
			無搜索的簡歷
		</view>
		
	  </view>
	  <popup :filter="filter" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popup>
  </view>
</template>
<script>
	import popup from 'components/recruiter/popup_filter.vue'
	// import selecta from 'components/recruiter/select.vue'
export default {
  data() {
    return {
		isnone:false,
		backimg:"/static/images/74b67240e38911eaaa7cdfff15829f1f.png",
		sosoval:"",
		isfavorites:false,
		filter: false,
		user:"",
		uid:"",
		popuptitle:"",
		company_id:"",
		page:1,
		limit:20,
		val:{
			"education":"",
			"resume_type":"",
			"job_grade":"",
			"salary_start":"",
			"salary_end":"",
			"seniority_start":"",
			"seniority_end":"",
			},
		searchjobList:[],
    };
  },
  onLoad(option){
	  const that = this
	  const user = uni.getStorageSync('user');
	  this.uid = user.id;
	  this.user = user;
	  this.company_id = user.company_id
	 //直接搜索职位
	 that.sosoval = JSON.parse(option.query).sosoval
	 this.ctiner();
  },
  components:{
	   popup,
  },
  
  methods: {
	  oninto(index){
		  console.log(this.searchjobList[index].id+'resume_id')
		this.$openPage({
		          name: 'recruite_details',
		          query: {
					  resume_id:this.searchjobList[index].id,
					 },
		})
	  },
	  addpopup(val){
	  		var that = this;
			this.filter = false
	  		this.val = val;
	  		that.page = 1;
			that.val.education = '';
			that.val.job_type = '';
			that.val.job_grade = '';
			that.val.salary_start = '';
			that.val.salary_end = '';
			that.val.seniority_start = '';
			that.val.seniority_end = '';
	  		this.ctiner()
	  },
	  closePopup(){
	  	this.filter = false
	  },
	  
	  sxuan(val){
	  		  this.filter = true;
	  		  this.popuptitle = val
	  },
	  ctiner(page){
		  const that = this
		  if(page==1){
			  that.page = 1
			  that.val.education = '';
			  that.val.job_type = '';
			  that.val.job_grade = '';
			  that.val.salary_start = '';
			  that.val.salary_end = '';
			  that.val.seniority_start = '';
			  that.val.seniority_end = '';
			}
		// console.log("点击了搜索"); 
		var val = that.val
		this.$minApi.searchresume({company_id:that.company_id,page:that.page,"limit":that.limit,keywords:this.sosoval,"education":val.education,"resume_type":val.job_type,"job_grade":val.job_grade,"salary_start":val.salary_start,"salary_end":val.salary_end,"seniority_start":val.seniority_start,"seniority_end":val.seniority_end}).then((res)=>{
			this.searchjobList = res.data.data;
			if(res.data.data.length == 0){
				that.isnone = false;
			}else{
				that.isnone = true;
			}
		})
	  },
	 
	  // 返回
	  forgect(){
	  	uni.navigateBack();
	  },
  },
};
</script>
<style scoped>
	uni-page-body {
		min-height: 100%;
	}
	body,
	html {
		min-height: 100%;
	}
	.mod{
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;

	}
	
	.centea{
		text-align: center;
		margin-top: 20px;
		color: #fff;
		text-shadow: 1px 0px 1px #aaa;
	}
	.mod::before {
		
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
	.torp{
		/* height: calc(100% - 44px); */
		/* background:rgba(130,141,161,0.3); */
		border-radius:32px 32px 0px 0px;
	}
	
	.spanbt{
		justify-content: space-between;
		padding: 10px 24px 0px 24px;
	}
	.title_font{
		display: flex;
		padding-left: 24px;
		color:rgba(255,255,255,1);
		border-radius:16px;
		border:1px solid rgba(255,255,255,1);
		
		
	}
	.title_font input,.ssax{
		font-size:14px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:20px;
		padding: 8px 0 8px 0;
	}
	.tit_img{
		width: 40px;
		height: 40px;
		padding: 8px;
	}
	.flex{
		height: 100%;
	}
	.tit_img image{
		width: 100%;
		height: 100%;
	}
	.flex_war{
		flex-wrap: wrap;
		overflow: hidden;
		width:calc(50% - 32px);
		margin: 8px 16px;
	}
	.bcga{
		width: 100%;
		background:linear-gradient(180deg,rgba(46,51,58,0) 0%,rgba(13,13,16,0.8) 100%)!important;
		position: absolute;
		padding: 12px;
		bottom: 0;
	}
	.carna{
		position: relative;
		margin: 8px;
		width: 100%;
		height:206px;
		overflow: hidden;
		background-position: center;
		background-size: cover;
		border-radius:16px;
		opacity:0.79;
	}
	.top_centt{
		font-size:16px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:22px;
	}
	.top_centts{
		font-size:12px;
		font-family:PingFangTC-Regular,PingFangTC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:17px;
		margin-top: 5px;
	}
	
	.icon_1 {
	  position: relative;
	  align-self: center;
	  margin-top: 12px;
	  padding: 5px 40px;
	  width: 32px;
	  height: 10px;
	}
	
	
</style>
