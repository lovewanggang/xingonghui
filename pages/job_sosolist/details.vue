<template>
    <view class="background">
		<view class="topcenter" >
			<view class="icon_back" @click="forgect()">
				<u-icon name="arrow-left" color="#fff" size="30"></u-icon>
			</view>
			<view class="txtqac">
				職位詳情
			</view>
		</view>
		<view class="content">
					<view class="main">
						<view class="main_image" v-if="basic.company">
							<image :src="$pubFuc.advertising(basic.company.logo)" alt="">
							<!-- <image src="/static/images/3507b230e37f11ea97f28da3d4f7876e.png" ></image> -->
						</view>
						<view class="main_frame">
							<view class="address">
								{{basic.company?basic.company.name:''}}
							</view>
							<view class="address">
								
								<u-icon style="margin-right: 3px;" name="map-fill" color="#fff" size="30"></u-icon>
								{{basic.company?basic.company.province:''}} {{basic.company?basic.company.city:''}} {{basic.company?basic.company.area:''}} {{basic.company?basic.company.address:''}}
							</view>
							<view>
								<view>
									<view class="onetitle">
										{{basic.title}}
									</view>
									<view class="twotitle">
									</view>
									<view class="threetitle">
										${{basic.salary_start}}-{{basic.salary_end}}/月
									</view>
								</view>
							</view>
							<view class="flex tip_box">
								<view>
									{{basic.seniority_start?basic.seniority_start:0}} - {{basic.seniority_end?basic.seniority_end:0}}年
									
								</view>
								<view>
									{{basic.education}}
								</view>
								<view v-if="basic.job_type ==1">
									全職
								</view>
								<view v-else>
									兼職
								</view>
							</view>
							<view>
								<view>
									<view class="ter_top">
										崗位職責
									</view>
									<view class="d_span" @click="">
										<view class="zero">
										</view>
										<view class="btrn_center">
											<text>{{this.basic.responsibility}}</text>
										</view>
									</view>
								</view>
							</view>
							<view>
								<view>
									<view class="ter_top">
										崗位要求
									</view>
									<view class="d_span" @click="">
										<view class="zero">
										</view>
										<view class="btrn_center">
											<text>{{this.basic.require}}</text>
										</view>
									</view>
								</view>
							</view>
							<view>
								<view>
									<view class="ter_top">
										福利待遇
									</view>
									<view class="d_span" @click="">
										<view class="btrn_center">
											<text>{{this.basic.welfare}}</text>
										</view>
									</view>
								</view>
							</view>
							<view>
								<view>
									<view class="ter_top">
										其他信息
									</view>
									<view class="d_span" @click="">
										<view class="zero">
										</view>
										<view class="btrn_center">
											<text>{{this.basic.other}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="information">
							<view class="information_text">公司信息</view>
							<view class="information_content">
								<text>{{basic.company?basic.company.more_desc:''}}</text>
								</view>
						</view>
						<view class="information_content" v-if="basic.company && !outMaskShow">
							<map class="map_mp" scale="15"
							    :latitude="basic.company.lat" :longitude="basic.company.lng" 
							    :markers="[{latitude: basic.company.lat, longitude: basic.company.lng, label: {content:basic.company.name,bgColor:'white',padding:5}}]"
							></map>
						</view>
						<view style="margin-top: 10px;" v-if="basic.company">
							<u-icon name="map-fill" color="rgba(36,53,87,0.5)" size="36"></u-icon>
							<span style="color: rgba(36,53,87,0.5);margin-left: 8px;
								font-size: 12px;
								font-family: PingFangTC-Regular, PingFangTC;
								font-weight: 400;
								opacity: ;
								line-height: 17px;">
								{{basic.company.address || ''}}
							</span>
						</view>
					</view>
		</view>
		<view class="flex" style="justify-content: center;">
			<view class="btnbuttom" style="margin: 64upx 24upx;"><span class="tagButtom" @click="withdraw">{{collection}}</span></view>
			<view class="btnbuttom" style="margin: 64upx 24upx;"><span class="tagButtom" @click="withdrawtwo">{{delivery}}</span></view>
			<view class="btnbuttom" style="margin: 64upx 24upx;"><span class="tagButtom" @click="nowithdraw">{{sign}}</span></view>
		</view>
		
		<u-mask :show="outMaskShow" @click="outMaskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">{{center_in}}</view>
				<view class="btnbuttom" style="margin: 64upx 96upx;width:calc(100% - 192upx) ;" @click="signOut()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="outMaskShow = false;filter = false">取消</view>
			</view>
		</u-mask>
	</view>
</template>
<script>
export default {
  data() {
    return {
		outMaskShow:false,
		discontinuity:false,
		center_in:"",
		uid:"",
		jobcollectid:"",
		receiveresumeid:"",
		jobtagid:"",
		companyId:"",
		sign:"標記",
		collection:"收藏",
		delivery:"投遞",
		user:{},
	  basic:{}, //基础信息
	  top_center: '添加職位',
	  popuptitle:"",
	  popupcenter:"",
    };
  },
  components:{
	  // popup,
	  // popupmore
  },
  onLoad(option){
	const user = uni.getStorageSync('user');
	this.uid = user.id;
	this.user = user;
	//带有职位id的就修改职位不带有就是添加职位
	if(JSON.parse(option.query).job_id){
		var that = this
		that.job_id = JSON.parse(option.query).job_id
		console.log(JSON.parse(option.query).job_id)
		this.$minApi.Jobshow({"job_id":JSON.parse(option.query).job_id,'member_id':that.uid}).then((res)=>{
			console.log(res)
			console.log('res')
			that.basic = res;
			
			
			if(res.receiveresume){
				that.receiveresumeid = res.receiveresume.id;
				that.delivery = '撤回'
			}
			if(res.jobtag){
				that.jobtagid = res.jobtag.id;
				that.sign = '取消標記'
			}
			if(res.jobcollect){
				that.jobcollectid = res.jobcollect.id;
				that.collection = '取消收藏'
			}
			
		})
	}
	//获取公司信息;
  },
  methods:{
	  // 收藏
	  withdraw(job_id){
		  var that = this
		  if(that.basic.resume){
			  console.log(that.collection);
			  if(that.collection=='收藏'){
				  this.center_in = "确定收藏吗！";
				  this.outMaskShow = true;
			  }else{
				  this.center_in = "确定取消吗！";
				   this.outMaskShow = true;
			  }
		  }else{
			  this.$pubFuc.showToast("請設置簡歷再收藏")
		  }
		 
	  },
	  //投简历
	  withdrawtwo(){
		   var that = this
		  if(that.basic.resume){
			  if(that.delivery=='投遞'){
				  this.center_in = "确定投遞吗！";
				  this.outMaskShow = true;
			  }else{
				  this.center_in = "确定撤回吗！";
				   this.outMaskShow = true;
			  }
		  }else{
			  this.$pubFuc.showToast("請設置簡歷再投遞")
		  }
		  
	  },
	  //标记
	  nowithdraw(){
		  var that = this
		  console.log(that.sign);
		  if(that.sign == '標記'){
			  this.$minApi.postJobtag({"member_id":that.uid,"job_id":that.job_id}).then((res)=>{
			  	that.sign = '取消標記'
			  })
		  }else{
			  console.log(that.basic);
			  this.$minApi.delJobtag(that.jobtagid).then((res)=>{
			  	that.sign = '標記'
			  })
		  }
	  },
	  signOut(){
		  var that = this;
		  if(this.center_in=='确定投遞吗！'){
			  if(that.discontinuity==true){
				  return
			  }
			  that.discontinuity=true
			  this.$minApi.postReceiveresume({"member_id":that.uid,"job_id":that.job_id,'resume_id':that.basic.resume.id,'company_id':that.basic.company.id}).then((res)=>{
					that.delivery = '撤回'
					this.center_in = "投遞成功！";
					that.receiveresumeid = res.data.id
					this.outMaskShow = true;
			  })
		  }
		  if(this.center_in=='确定撤回吗！'){
			  if(that.discontinuity==true){
					return
			  }
			  that.discontinuity=true
			  this.$minApi.delReceiveresume(that.receiveresumeid).then((res)=>{
				that.delivery = '投遞'
				this.center_in = "撤回成功！";
				this.outMaskShow = true;
			  })
		  }
		  
		  if(this.center_in=='确定收藏吗！'){
			  if(that.discontinuity==true){
				  return
			  }
			  that.discontinuity=true
			 this.$minApi.collectjob({"member_id":this.uid,"job_id":this.job_id}).then((res)=>{
				 console.log(res.data)
				    that.jobcollectid = res.data.id
					that.collection = '取消收藏'
					that.center_in = "收藏成功！";
					that.outMaskShow = true;
			  }) 
		  }
		  if(this.center_in=='确定取消吗！'){
			  if(that.discontinuity==true){
					return
			  }
			  that.discontinuity=true
			  this.$minApi.delcollectjob(that.jobcollectid).then((res)=>{
					that.collection = '收藏'
					that.center_in = "取消成功！";
					that.outMaskShow = true;
			   })
		  }
		  if(this.center_in=='投遞成功！'|| this.center_in=='撤回成功！'||this.center_in=='收藏成功！'|| this.center_in=='取消成功！'){
			  this.outMaskShow = false;
			  that.discontinuity=false
		  }
	  },
	  forgect(){
		  uni.navigateBack();
	  }
  }
};
</script>
<style scoped>
	.background{
		width: 100%;
		min-height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url('/static/images/bag1.png');
		overflow: hidden;
	}
uni-page-body {
	background-color: #F1F3F6;
}
body,
html {
	background-color: #F1F3F6;
}
.map_mp{
    width: 100%;
    height:90px;
    border-radius: 10px;
}
.btnbuttom{
	display: flex;
	position: relative;
	align-items: center;
	align-self: center;
	flex-direction: row;
	justify-content: center;
	margin-top: 15px;
	border-radius: 16px;
	background-image: linear-gradient(0deg, #1ceeaf 0%, #079742 100%);
	width: 96px;
	height: 45px;
	-moz-box-shadow: 0px 3px 0px 0px #05653b;
	-webkit-box-shadow: 0px 3px 0px 0px #05653b;
	box-shadow: 0px 3px 0px 0px #05653b;
}
.btnbuttom:active {
	-moz-box-shadow: 0px 0px 0px 0px #05653b;
	-webkit-box-shadow: 0px 0px 0px 0px #05653b;
	box-shadow: 0px 0px 0px 0px #05653b;
}
.address{
	margin-top: 5px;
	text-align: center;
	font-size: 12px;
	font-family: PingFangTC-Semibold, PingFangTC;
	font-weight: 600;
	color: #FFFFFF;
	line-height: 17px;
	opacity: 0.8;
}
.onetitle{
	text-align: center;
	margin-top: 24px;
	font-size: 24px;
	font-family: SourceHanSansCN-Medium, SourceHanSansCN;
	font-weight: 500;
	color: #fff;
	line-height: 28px;
}
.warp {
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	margin-bottom: 50upx;
}
.rect {
	text-align: center;
	font-size:64upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
}
.tip_box{
	justify-content: center;
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
.twotitle{
	margin-top: 8px;
	font-size: 14px;
	font-family: SourceHanSansCN-Medium, SourceHanSansCN;
	font-weight: 500;
	color: #fff;
	line-height: 22px;
	text-align: center;
	opacity: 0.6;
}
.threetitle{
	margin-top: 8px;
	text-align: center;
	font-size: 16px;
	font-family: SourceHanSansCN-Medium, SourceHanSansCN;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 22px;
}
.d_span{
	display: flex;
	align-items: center;
	margin-top: 4px;
	
}
.zero{
	width:4px;
	height:4px;
	background:#fff;
	border-radius: 50%;
	background-color: #fff;
	margin-right: 8px;
}
.btrn_center{
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:#fff;
	line-height:22px;
}

.ter_top{
	margin-top: 24px;
	font-size:12px;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:#fff;
	line-height:17px;
},
.topcenter {
	/* margin-left: -35px; */
	padding-left: 20px;
	display: flex;
	align-items: center;
	width: 100%;
	text-align: left;
	padding-top: 43px;
	height: 93px;
}
.icon_back{
	margin-right: -55px;
	padding: 12px;
}
.txtqac{
	text-align: center;
	margin: 0 auto;
	/* margin-left: -20px; */
	font-size: 14px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #FFFFFF;
	line-height: 20px;
}

 .box{
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
  height: 100%;
 }
 .box-c,.child{
  display: flex;
  flex: 1;
  height: 100%;
 }


.icon {
	width: 10px;
	height: 16px;
}


.icon_close {
	position: absolute;
	top: 51px;
	left: 30px;
	line-height: 28px;
}
.content{
	border-radius: 15px;
	background:rgba(255,255,255,0.8);
	margin-left: 5%;
	width: 90%;
	padding: 0 48upx;
	padding-top: 24upx;
	position: relative;
	z-index: 1;
}
.content::before {
		height: 100%;
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

.content_bar{
	margin: 0 auto;
	width: 96upx;
	height: 12upx;
	background-color: #F1F3F6;
}
.main{
	width: 100%;
	padding-bottom: 20px;
	overflow: hidden;
}
.main_image{
	display: flex;
	justify-content: space-around;
	margin-top: 48upx;
}
.main_image image{
	width: 128upx;
	height: 128upx;
}
.main_frame{
	width: 100%;
}
.main_frame_list{
	width: 100%;
	height: 132upx;
	border-radius:10px;
	opacity:0.2;
	border:1px dashed #fff;
	margin-top: 48upx;
	text-align: center;
}
.main_frame_image{
	display: flex;
	justify-content: space-around;
}
.main_frame_text{
	font-size:30upx;
	font-family:PingFangTC-Regular,PingFangTC;
	font-weight:400;
	color:#fff;
}
.information{
	margin-top: 48upx;
}
.information_text,.information_content{
	text-align: left;
	font-size:24upx;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:#fff;
}
.information_content{
	margin-top: 20upx;
	font-weight:400;
}


</style>
