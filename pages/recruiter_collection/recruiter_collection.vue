<template>
  <view class="mod">
	  <view class="">
	  	<!-- top -->
	  	<view class="flex spanbt">
	  		<view class="flex" style="align-items: center;">
	  			<u-icon @click="forgect()" style="padding: 8px;" name="arrow-left" color="#FFFFFF" size="24px"></u-icon>
	  			<span class="title_font">收藏的簡歷</span>
	  		</view>
	  		<view class="tit_img" @click="sxuan('篩選條件')">
	  			<image src="/static/images/usersx.png">
	  		</view>
	  	</view>
	  	<!-- 标签 -->
		<selecta :list="list" @click_job="click_job"></selecta>
	  	<!-- 内容 -->
		<view class="flex flex_war"  v-if="collection_list.length>0" >  
			<view class="carna" @click="goin(index)" v-for="(item,index) in collection_list" :style="{ backgroundImage: 'url(' +(item.resume.photo ? $pubFuc.advertising(item.resume.photo):backimg)+ ')' }">
				<view class="bcga">
					<view class="top_centt">
						{{item.resume?item.resume.family_name+item.resume.first_name:""}}
					</view>
					<view class="top_centt">
						{{item.resume?item.resume.title:""}}
					</view>
					<view class="top_centt">
						${{item.resume?item.resume.salary_start/1000:""}}K-	{{item.resume?item.resume.salary_end/1000:""}}K/月
					</view>
					<view class="top_centts">
						{{item.resume?item.resume.work_experience:""}}年 / {{item.resume?item.resume.education:""}}
						 <!-- /  {{item.resume?item.resume.city:""}} -->
					</view>
				</view>
			</view>
		</view>
		<view class="centea" v-if="collection_list.length==0">
			无收藏簡歷
		</view>
	  </view>
	  <popup :filter="filter" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popup>
  </view>
</template>
<script>
import popup from 'components/recruiter/popup_filter.vue'
import selecta from 'components/recruiter/select.vue'
export default {
  data() {
    return {
		// isnone:false,//是否有简历
		list:[],
		collection_list:[],
		company_id:"",
		job_id:"",
		val:{
			"education":"",
			"resume_type":"",
			"job_grade":"",
			"salary_start":"",
			"salary_end":"",
			"seniority_start":"",
			"seniority_end":"",
			},
		filter: false,
		popuptitle:"",
		page:1,
		limit:6,
		backimg:"/static/images/74b67240e38911eaaa7cdfff15829f1f.png",
    };
  },
  components:{
	  popup,
	  selecta
  },
  onLoad() {
	//拿到当前公司Id
	this.getUser();
	//获取收藏的类别
	
	//公司职位列表
	this.joblist();
	
  },
  onShow() {
  	//公司职位列表
  	this.joblist();
  },
  methods: {
	  goin(index){
	  		  this.$openPage({
	  		            name: 'recruite_details',
	  		            query: {
	  		  			  resume_id:this.collection_list[index].resume_id,
	  		  			 },
	  		  })
	  },
	  onReachBottom() {
	     if (this.initStatus) return
	     this.page++
	     this.islist()
	  },
	  click_job(val){
		  var that = this;
		  if(that.job_id==val){
		  	return; 
		  }
		  that.job_id=val;
		  that.page=1;
		  this.islist();
	  },
	  //获取用户信息
	  getUser(){
	  	var that = this;
	  	const user = uni.getStorageSync('user');
		this.company_id = user.company_id
	  },
	  //公司职位列表
	  joblist(){
	  		 var that = this; 
	  		  this.$minApi.isjob({s:{company_id:this.company_id}}).then((res)=>{
	  			that.job_id=res.data[0].id;
				this.islist();
	  			that.list = res.data.map((resa)=>{
	  				return{name:resa.title,id:resa.id}
	  			})
	  		});
	  },
	  addpopup(val){
		var that = this;
		this.val = val;
		that.page = 1;
        // console.log(this.val);
        this.filter = false
		this.islist()
	  },
	  //获取收藏列表
	  islist(){
		 var that = this;
		 var val = this.val
		 this.$minApi.companycollectresumelist({"page":that.page,"limit":that.limit,company_id:this.company_id,job_id:this.job_id,"education":val.education,"resume_type":val.job_type,"job_grade":val.job_grade,"salary_start":val.salary_start,"salary_end":val.salary_end,"seniority_start":val.seniority_start,"seniority_end":val.seniority_end}).then((res)=>{	
			console.log(res);
			if(that.page==1){
				that.collection_list = res.data.data;
			}else{
				 that.collection_list=that.collection_list.concat(res.data.data);
			}
			if(that.page == res.data.pageNum ){
				this.initStatus = true
			}
			// 获取所有招聘者投简的Id
		 });
	  },
	  closePopup(){
	  	this.filter = false
	  },
	  change(index) {
	  	this.utabs.current = index;
	  },
	  sxuan(val){
		  this.filter = true;
		  this.popuptitle = val
	  },
	  // 返回
	  forgect(){
	  	uni.navigateBack();
	  },
  },
};
</script>
<style scoped>
	.centea{
		text-align: center;
		margin-top: 20px;
		color: #fff;
		text-shadow: 1px 0px 1px #aaa;
	}
	.mod{
		overflow-x: hidden;
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
	
	.spanbt{
		justify-content: space-between;
		padding: 44px 24px 0px 24px;
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
	.tit_img image{
		width: 100%;
		height: 100%;
	}
	.flex_war{
		flex-wrap: wrap;
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
		width:calc(50% - 16px);
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
	
	
</style>
