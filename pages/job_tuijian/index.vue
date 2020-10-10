<template>
  <view class="mod">
	  	<view class="flex spanbt">
	  		<view class="flex" style="align-items: center;">
	  			<u-icon @click="forgect()" style="padding: 8px;" name="arrow-left" color="#FFFFFF" size="24px"></u-icon>
	  			<span class="title_font">推薦職位</span>
	  		</view>
	  		<view class="tit_img" @click="sxuan('篩選條件')">
	  			<image src="/static/images/usersx.png">
	  		</view>
	  	</view>
		<view class="midinp" style="margin:8px 24px;">
			<input type="text" v-model="sosoval"  placeholder-class="tagwrp" placeholder="輸入關鍵字..." />
			<u-icon style="padding: 0 20px;" @click="soso()" name="search"></u-icon>
		</view>
		
		<tuijian :ctrn="ctrn" @toindex="toindex"></tuijian>
		
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
			無推薦內容
		</view>
		<popup :filter="filter" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popup>
  </view>
</template>
<script>
import tuijian from 'components/blackmonth-swiper/job_index.vue'
import popup from 'components/recruiter/peopup_jobfilter.vue'
export default {
  data() {
    return {
		sosoval:"",
		page:1,
		limit:20,
		toindexval:0,
		uid:"",
		resume_id:"",
		user:[],
		isfavorites:false,
		filter: false,
		popuptitle:"",
		ctrn:[],
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
    };
  },
  components:{
	  popup,
	  tuijian
  },
  onLoad() {
	const user = uni.getStorageSync('user');
	this.uid = user.id;
	this.user = user;
	this.resumelist()
  },
  methods: {
	  addpopup(val){
		    this.filter = false
	  		var that = this;
	  		this.val = val;
	  		that.page = 1;
	  		this.recommendjob()
	  },
	  closePopup(){
	  	this.filter = false
	  },
	  
	  sxuan(val){
	  		  this.filter = true;
	  		  this.popuptitle = val
	  },
	  toindex(val){
		  console.log(val)
	  		  this.toindexval = val
	  		  this.$minApi.collectjoblist({s:{job_id:this.ctrn[val].job_id,member_id:this.uid}}).then((re)=>{
	  		  	  	if(re.data.length>0){
	  		  	  		console.log(re.data)
	  		  	  		this.isfavorites = true;
	  		  	  	}else{
	  		  	  		this.isfavorites = false;
	  		  	  	}
	  		  	  });
	  },
	  soso(){
	  	//拿到输入框的值
	  	this.$openPage({
	  	          name: 'job_sosolist',
	  	          query: {sosoval: this.sosoval},
	  	})
	  },
	  favorites(){
	  		this.isfavorites = !this.isfavorites  
			var job_id = this.ctrn[this.toindexval].job_id
			this.$minApi.collectjob({"member_id":this.uid,"job_id":job_id}).then((res)=>{
				  	
				  			
				  });
	  },
	  resumelist(){
		  var that = this
		  this.$minApi.resumelist({s:{member_id:this.uid,"is_public":1}}).then((res)=>{
			  console.log(res);
			  console.log('resumelist');
			  
			  if(res.data.length>0){
				that.resume_id = res.data[0].id
			  }
			  that.recommendjob()
		  });
	  },
		  
	  recommendjob(){
		  var that = this;
		   this.$minApi.recommendjob({resume_id:that.resume_id,member_id:this.uid,"page":that.page,"limit":that.limit,"job_type":that.val.job_type,"salary_start":that.val.salary_start,"salary_end":that.val.salary_end,"education":that.val.education,"seniority_start":that.val.seniority_start,"seniority_end":that.val.seniority_end}).then((res)=>{
		  	  			 console.log('ssss');
		  	  			 console.log(res);
		  				 if(res.data.length>0){
		  					 this.$minApi.collectjoblist({s:{member_id:this.uid,job_id:res.data[0].id}}).then((re)=>{
								 console.log(re)
		  					 	  	if(re.data.length>0){
		  									this.isfavorites = true;
		  								}else{
											this.isfavorites = false;
										}
		  					 	  });
		  				 }
		  				 console.log('ssss');
		  				 console.log(res.data);
						 var  recommendjoblist = res.data
		  				  var receiveresume= res.data.map((resa,index)=>{
		  					  return{
		  						  img:resa.company.logo,
		  						  title:resa.title,
		  						  companytitle:resa.company.name,
		  						  center:"曾任："+resa.title+" $"+resa.salary_start+"-"+resa.salary_end+"/月",
		  						  salary_start:resa.salary_start,
		  						  salary_end:resa.salary_end,
		  						  year:resa.seniority_start+"-"+resa.seniority_start,
		  						  education:resa.education,
		  						  address:resa.address,
								  job_type:resa.job_type,
								  job_id:resa.id,
		  						  msg:resa.require,
		  						  resume_id:resa.id,
		  						  pages:res.length,
		  						  nowpages:index+1,
		  					  }
		  				  })
						  console.log(receiveresume)
						  console.log('receiveresume')
		  				 that.ctrn = receiveresume
		  	 
		  });
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
	.mod::before{
		min-height: 800px;
		content: '';
		z-index: -1;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: url('/static/images/bag1.png');
		overflow: hidden;
		background-position: center top;
		background-size: cover;
		background-attachment: fixed;
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
