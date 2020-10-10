<template>
	<view class="mod">
		<view class="flex spanbt">
			<view class="flex" style="align-items: center;">
				<span class="title_font">收到的簡歷</span>
			</view>
			<view class="tit_img" @click="sxuan('篩選條件')">
				<image src="static/images/usersx.png">
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
				<!-- <view style="width:calc( 100% - 0px);margin-top: 4px;">
					<u-tabs
					:list="list"
					:inactive-color="utabs.incolors"
					:bg-color="utabs.bagcolor" 
					:bold="false"
					:item-width="utabs.width"
					:gutter="utabs.gutte"
					:font-size="utabs.font"
					:active-color="utabs.incolor"
					:is-scroll="true"
					:active-item-style="utabs.opin"
					:current="current"
					@change="change"></u-tabs>
				</view> -->
				<view style="width:calc( 100% - 0px);margin-top: 4px;">
					<u-tabs
					:list="list"
					:inactive-color="utabs.incolors"
					:bg-color="utabs.bagcolor" 
					:bold="false"
					:item-width="utabs.width"
					:gutter="utabs.gutte"
					:font-size="utabs.font"
					:active-color="utabs.incolor"
					:is-scroll="true"
					:active-item-style="utabs.opin"
					:current="current"
					@change="change"></u-tabs>
				</view>
				<!-- 内容 -->
				
				<customSwiper :ctrn="ctrn" @toindex="toindex" v-if="ctrn.length >0" @goin="goin"/>
				
				<view v-if="ctrn.length >0">
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
				<view class="centea" v-else>
					沒有投遞的簡歷
				</view>
			</view>
		</view>
		<popup :filter="filter" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popup>
	</view>
</template>
<script>
	import popup from 'components/recruiter/popup_filter.vue'
	import selecta from '@/components/recruiter/select.vue'
	import customSwiper from '@/components/blackmonth-swiper/index'
export default {
  data() {
    return {
		// current: 0,
		 utabs:{
		 	incolor:"rgba(255,255,255,1)",
		 	incolors:"rgba(255,255,255,0.6)",
		 	bagcolor:"''",//空白底色
		 	font:"28rpx",
		 	gutter:"48rpx",
		 	width:"180rpx",
		 	gutte:"20rpx",
			// opin:{"font-size":"38rpx"},
		 },
		
		company_id:"",
		job_id:"",
		member_id:"",
		uid:"",
		toindexval:0,
		current:0,
		isfavorites:false,
		filter: false,
		popuptitle:"",
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
			cc:0,
		received_resume:true,//
		ctrn:[],
		list:[],
    };
  },
  components:{
	   popup,
	  selecta,
	  customSwiper
  },
  onLoad(option) {
	  const value = uni.getStorageSync('user');
	  this.uid = value.id
  	//拿到当前公司Id
	this.cc = JSON.parse(option.query).index;
	// console.log(this.current);
  	this.getUser();
  	
  },
  onShow() {
  	this.islist()
  },
  methods: {
	  addpopup(val){
	  		var that = this;
	  		this.val = val;
	  		that.page = 1;
	  		this.islist()
	  },
	  closePopup(){
	  	this.filter = false
	  },
	  
	  sxuan(val){
	  		  this.filter = true;
	  		  this.popuptitle = val
	  },
	  //滑动返回值
	  toindex(val){
		  this.toindexval = val
		  //
		  this.$minApi.getcompanycollectresume({s:{resume_id:this.ctrn[val].resume_id,job_id:this.job_id,company_id:this.company_id}}).then((re)=>{
		  	  	if(re.data.length>0){
		  	  		this.isfavorites = true;
		  	  	}else{
		  	  		this.isfavorites = false;
		  	  	}
		  	  });
	  },	
	  //点击职位
	  // click_job(val){
	  // 		  var that = this;
	  // 		  that.job_id=val;
	  // 		  this.islist();
	  // },
	  //获取用户信息
	  getUser(){
	  	var that = this;
	  	const user = uni.getStorageSync('user');
	  	this.company_id = user.company_id
	  	this.member_id = user.member_id
		
		//公司职位列表
		this.joblist();
	  },
	  //收藏简历
	  favorites(){
		this.isfavorites = !this.isfavorites  
		var resume_id = this.ctrn[this.toindexval].resume_id
		//member_id用户id
		this.$minApi.postcompanycollectresume({"member_id":this.member_id,"company_id":this.company_id,"job_id":this.job_id,"resume_id":resume_id}).then((res)=>{		
				
			});
	  },
	  //公司职位列表
	  joblist(){
	  		 var that = this; 
	  		  this.$minApi.isjob({s:{company_id:this.company_id}}).then((res)=>{
	  					that.job_id=res.data[0].id;
	  					that.list = res.data.map((resa)=>{
	  						return{name:resa.title,id:resa.id}
						})
						that.current = that.cc
						this.islist();
	  		  });
	  },
	  //点击职位
	  change(index){
	  		  var that = this;
			  // console.log(index);
	  			  // this.current = index;
				  this.current = index;
				  console.log(this.current);
				  this.job_id=this.list[index].id;
				  this.islist();
	  },
	  //收到的简历
	  islist(){
	  		 var that = this;
	  		 var val = this.val
			 this.$minApi.receiveresumelist({"page":that.page,"limit":that.limit,company_id:this.company_id,job_id:this.job_id,"education":val.education,"resume_type":val.job_type,"job_grade":val.job_grade,"salary_start":val.salary_start,"salary_end":val.salary_end,"seniority_start":val.seniority_start,"seniority_end":val.seniority_end}).then((res)=>{
				 
				 console.log(res.data);
				 
				 if(res.data.length>0){
					 that.received_resume = true;
					this.$minApi.getcompanycollectresume({s:{company_id:res.data[0].company_id,job_id:res.data[0].job_id,resume_id:res.data[0].resume_id}}).then((re)=>{
					 	  	if(re.data.data.length>0){
								this.isfavorites = true;
							}
					 	});
				 }else{
					 that.received_resume = false;
				 }
				  var receiveresume= res.data.data.map((resa,index)=>{
					  console.log(resa.ing);
					  return{
						  id:resa.id,
						  resume_id:resa.resume.id,
						  job_id:resa.job_id,
						  member_id:resa.member_id,
						  company_id:resa.company_id,
						  img:resa.resume.photo,
						  name:resa.resume.family_name+resa.resume.first_name,
						  center:"曾任："+resa.resume.title+"$"+resa.resume.salary_start/1000+"K-"+resa.resume.salary_end/1000+"K/月",
						  year:resa.resume.work_experience+"年",
						  education:resa.resume.education,
						  address:resa.resume.address,
						  msg:resa.resume.evaluate,
						  pages:res.data.length,
						  nowpages:index+1,
					  }
				  })
				  if(that.page==1){
				  	that.ctrn = receiveresume;
				  }else{
				  	 that.ctrn=that.ctrn.concat(receiveresume);
				  }
	  		 });
	  },

	  //点击了详情
	  goin(val){
		  console.log("第一个");
		  console.log(this.ctrn[val]);
		   var that = this;
		  this.$minApi.Resumeview({s:{company_id:that.ctrn[val].company_id,job_id:that.ctrn[val].job_id,resume_id:that.ctrn[val].resume_id}}).then((re)=>{
			   console.log(re.data);
			   console.log("第二个");
		   	  	if(re.data.length==0){
		  			that.$minApi.postResumeview({from_member_id:that.uid,member_id:that.ctrn[val].member_id,company_id:that.ctrn[val].company_id,job_id:that.ctrn[val].job_id,resume_id:that.ctrn[val].resume_id}).then((res)=>{
						console.log(res);
						console.log("第三个");
					});
		  		}
		   	});
			
		this.$openPage({
		          name: 'recruite_details',
		          query: {
					  id: this.ctrn[val].id,
					  company_id:this.ctrn[val].company_id,
					  job_id:this.ctrn[val].job_id,
					  member_id:this.ctrn[val].member_id,
					  resume_id:this.ctrn[val].resume_id,
					  shoucang:this.isfavorites,
					 },
		})
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
	.centea{
		text-align: center;
		margin-top: 20px;
		color: #fff;
		text-shadow: 1px 0px 1px #aaa;
		/* box-shadow: 1px 1px 1px #000; */
	}
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
	.tit_img image{
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
	.mid_btn image{
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
	.mid_btnr image{
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