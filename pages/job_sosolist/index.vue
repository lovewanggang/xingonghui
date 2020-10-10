<template>
  <view class="mod">
	  <!-- 这里是sosolist top栏 -->
	  <view class="flex spanbt">
		  <!-- 返回 -->
	  	<view class="">
	  		<u-icon style="padding: 15px 15px;" @click="beback()" name="arrow-left" color="#fff"></u-icon>
	  	</view>
		<!-- 搜索框 -->
		<view class="flex" style="align-items: center;width: 100%;">
			<view class="title_font" style="width: 100%;margin-right: 16px;">
				<input v-model="sosoval" placeholder="輸入搜索職位" style="width: 100%;" placeholder-class="ssax" type="text">
				<u-icon @click="soso(1)" style="padding: 8px 20px 8px 8px;" name="search" color="#FFFFFF" size="14px"></u-icon>
			</view>
		</view>
		<view class="tit_img" @click="sxuan('篩選條件')">
			<image src="/static/images/usersx.png">
		</view>
	  </view>
	  <popup :filter="filter" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popup>
	  <!-- 中间部分 -->
	  <view class="soso_center">
		  <!-- 循环列表 -->
		  <!-- searchjobList -->
	  	<view class="soso_cen" v-for="(item,index) in searchjobList" @click="todetails(item.id)">
			<!-- 上面部分 -->
	  		<view class="flex t_box">
				<!-- 图片 -->
	  			<view class="img_box" v-if="item.company.logo">
					<image :src="$pubFuc.advertising(item.company.logo)" alt="">
					<!-- <image src="/static/images/3507b230e37f11ea97f28da3d4f7876e.png" alt=""> -->
	  			</view>
				<!-- 内容 -->
				<view class="box_text">
					<view class="title_box">
						{{item.title}}
					</view>
					<view class="title_center">
						{{item.company.name}}
					</view>
				</view>
				<view class="crona" @click.stop="ismark(item.tagid,item.id,index)" v-if="item.tagid">
					<u-icon style="padding: 8px 8px 8px 8px;" name="bookmark-fill" color="#fff" size="20px"></u-icon>
					<view class="">
						已标记
					</view>
					
				</view>
				<view class="" @click.stop="ismark(item.tagid,item.id,index)"  v-else >
					<u-icon style="padding: 8px 8px 8px 8px;" name="bookmark-fill" color="#aaa" size="20px"></u-icon>
					
				</view>
				
	  		</view>
			<!-- 3-5年 本科 全职 -->
			<view class="flex tip_box">
				<view>
					{{item.seniority_start?item.seniority_start:0}} - {{item.seniority_end?item.seniority_end:0}}年
				</view>
				<view>
					{{item.education}}
				</view>
				<view v-if="item.job_type ==1">
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
	  
  </view>
</template>
<script>
	import popup from 'components/recruiter/peopup_jobfilter.vue'
export default {
  data() {
    return {
		
		sosoval:"",
		page:1,
		limit:6,
		initStatus:false,
		filter: false,
		popuptitle:"",
		val:{
			"education":"",
			"job_type":"",
			"job_grade":"",
			"salary_start":"",
			"salary_end":"",
			"seniority_start":"",
			"seniority_end":"",
		},
		searchjobList:[],
		// mark:false,//收藏  true 已收藏  false 未收藏
    };
  },
 components: {
 	  popup,
 },

  onLoad(option){
	  const user = uni.getStorageSync('user');
	  this.uid = user.id;
	  this.user = user;
  	  this.sosoval = JSON.parse(option.query).sosoval;
	  this.soso()
  },
  onReachBottom() {
        if (this.initStatus) return
		this.page++
		this.soso()
     // console.log("到了底部了"+this.page);
    },
  methods: {
	//点击收藏
	ismark(){
			  this.mark = !this.mark
	},
	closePopup(){
		this.filter = false
	},
	
	sxuan(val){
			  this.filter = true;
			  this.popuptitle = val
	},
	beback(){
			uni.navigateBack();
	},
	addpopup(val){
			  console.log(val)
			var that = this;
			this.val = val;
				that.page = 1;
			this.soso()
			this.filter = false
	},
	  //标记
	  ismark(tagid,job_id,index){
	  		  var that = this
	  		  if(tagid){
				  this.$minApi.delJobtag(tagid).then((res)=>{
					  that.searchjobList[index].tagid = false;
				  })
	  		  }else{
	  			  this.$minApi.postJobtag({"member_id":that.uid,"job_id":job_id}).then((res)=>{
	  			  	that.searchjobList[index].tagid = res.data.id;
	  			  })
	  		  }
	  },
	  soso(page){
		  var that = this
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
	  		  
	  	this.$minApi.searchjob({"keywords":that.sosoval,"member_id":that.uid,"page":that.page,"limit":that.limit,"job_type":that.val.job_type,"salary_start":that.val.salary_start,"salary_end":that.val.salary_end,"education":that.val.education,"seniority_start":that.val.seniority_start,"seniority_end":that.val.seniority_end}).then((res)=>{
	  			
	  			if(that.page==1){
	  				that.searchjobList = res.data;
	  			}else{
	  				 that.searchjobList = that.searchjobList.concat(res.data);
	  			}
	  			if(that.page == res.pageCount ){
	  				this.initStatus = true
	  			}
	  	})
	  },
	  todetails(job_id){
		  console.log(job_id);
		  this.$openPage({
		            name: 'job_sosolist_details',
		            query: {job_id: job_id},
		  	})
	  },
  	}
};
</script>
<style scoped>
	uni-page-body {
		height: 100%;
	}
	body,
	html {
		height: 100%;
	}
	.mod{
		/* position: relative; */
		height: 100%;
		/* background-repeat: no-repeat; */
		background-size: cover;
		background-image: url('/static/images/bag1.png');
		padding: 62px 14px;
		overflow-x: hidden;
	}
	.title_font{
		display: flex;
		padding-left: 24px;
		color:rgba(255,255,255,1);
		border-radius:16px;
		border:1px solid rgba(255,255,255,1);
	}
	.spanbt{
		justify-content: space-between;
		align-items: center;
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
		height: 35px;
		padding: 8px;
	}
	.tit_img image{
		width: 100%;
		height: 100%;
	}
	.soso_center{
		margin:24px 14px 14px 14px;
	}
	.soso_cen{
		width: 100%;
		padding: 14px ;
		margin-bottom: 16px;
		position: relative;
		background: hsla(64, 91, 126, 0.1);
		overflow: hidden;
		z-index: 1;
	}
	.soso_cen::before {
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
		background: url('/static/images/bag1.png');
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
		height: 55px;
		color: #fff;
		justify-content: space-between;
	}
	.box_text{
		margin-left: 0px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		letter-spacing: 1px;
	}
	.crona{
		font-size: 12px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		
	}
	.title_box{
		margin-top: 3px;
	}
	.title_center{
		margin-top: 5px;
	}
	.tip_box{
		color: #fff;
		margin-top: 10px;
	}
	.tip_box view {
		margin: 5px;
		font-size: 12px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		letter-spacing: 1px;
		background-color: rgba(170,170,170,0.4);
		padding: 0px 14px;
		border-radius: 15px;
	}
	.bom_box{
		margin-top: 8px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		letter-spacing: 1px;
	}
</style>