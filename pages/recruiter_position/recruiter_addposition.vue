<template>
    <view class="background">
		<view class="topcenter" :style = "filter == true ? 'filter: blur(4px)': ''">
			<view class="icon_back" @click="forgect()">
				<u-icon name="arrow-left" color="#2B599B" size="30"></u-icon>
			</view>
			<view class="txtqac">
				{{ top_center }}
			</view>
		</view>
		
		<view class="content" :style = "filter == true? 'filter: blur(4px)': ''">
		<view class="content_bar"></view>
					<view class="main">
						<view class="main_image">
							<image :src="company.logo" mode="scaleToFill" ></image>
						</view>
						<view class="main_frame">
							<view @click="ispopupmo()">
								<view v-if="basic.title">
									<view class="onetitle">
										{{basic.title}}
									</view>
									<view class="twotitle">
										{{basic.company.address}}/{{basic.seniority_start}}-{{basic.seniority_end}}年經驗/{{basic.education}}以上/全職
									</view>
									<view class="threetitle" v-if="basic.company.job_type ==1">
										${{basic.salary_start}}-{{basic.salary_end}}/月
									</view>
									<view v-else class="threetitle">
										${{basic.salary_start}}/月
									</view>
								</view>
								<view v-else>
									<view class="main_frame_list">
										<view class="main_frame_image">
											<u-icon style="margin-top: 20upx;" name="plus"
											 color="#2B599B" size="40"></u-icon>
										</view>
										<view class="main_frame_text">基本信息</view>
									</view>
								</view>
							</view>
							<view @click="ispopup('崗位職責')">
								<view v-if="basic.responsibility == null" class="main_frame_list">
									<view class="main_frame_image">
										<u-icon style="margin-top: 20upx;" name="plus" 
										color="#2B599B" size="40"></u-icon>
									</view>
									<view class="main_frame_text">崗位職責</view>
								</view>
								
								<view v-else>
									<view class="ter_top">
										崗位職責
									</view>
									<view class="d_span" @click="">
										<view class="zero">
										</view>
										<view class="btrn_center">
											<text>{{basic.responsibility}}</text>
										</view>
									</view>
								</view>
							</view>
							
							<view @click="ispopup('崗位要求')">
								<view v-if="basic.require == null" class="main_frame_list">
									<view class="main_frame_image">
										<u-icon style="margin-top: 20upx;" 
										name="plus" color="#2B599B" size="40"></u-icon>
									</view>
									<view class="main_frame_text">崗位要求</view>
								</view>
								<view v-else>
									<view class="ter_top">
										崗位要求
									</view>
									<view class="d_span" @click="">
										<view class="zero">
										</view>
										<view class="btrn_center">
											<text>{{basic.require}}</text>
										</view>
									</view>
								</view>
							</view>
							
							<view @click="ispopup('福利待遇')">
								<view v-if="basic.welfare  == null" class="main_frame_list">
									<view class="main_frame_image">
										<u-icon style="margin-top: 20upx;" 
										name="plus" color="#2B599B" size="40"></u-icon>
									</view>
									<view class="main_frame_text">福利待遇</view>
								</view>
								<view v-else>
									<view class="ter_top">
										福利待遇
									</view>
									<view class="d_span" @click="">
										<view class="btrn_center">
											<text>{{basic.welfare}}</text>
										</view>
									</view>
								</view>
							</view>
							
							<view @click="ispopup('其他信息')">
								<view v-if="basic.other == null" class="main_frame_list">
									<view class="main_frame_image">
										<u-icon style="margin-top: 20upx;" 
										name="plus" color="#2B599B" size="40"></u-icon>
									</view>
									<view class="main_frame_text">其他信息</view>
								</view>
								<view v-else>
									<view class="ter_top">
										其他信息
									</view>
									<view class="d_span" @click="">
										<view class="zero">
										</view>
										<view class="btrn_center">
											<text>{{basic.other}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="information">
							<view class="information_text">公司信息</view>
							<view class="information_content">
								<text>{{company.desc}}</text>
							</view>
							<view class="information_content">
								<map v-if="!filter&&!filtermo" class="map_mp" scale="15"
								    :latitude="company.lat" :longitude="company.lng" 
								    :markers="[{latitude: company.lat, longitude: company.lng, label: {content:company.name,bgColor:'white',padding:5}}]"
								></map>
							</view>
							<view style="margin-top: 10px;">
								<u-icon name="map-fill" color="rgba(36,53,87,0.5)" size="36"></u-icon>
								<span style="color: rgba(36,53,87,0.5);margin-left: 8px;
									font-size: 12px;
									font-family: PingFangTC-Regular, PingFangTC;
									font-weight: 400;
									opacity: ;
									line-height: 17px;">
									{{company.address || ''}}
								</span>
							</view>
						</view>
						<view class="tagWrapButtom" style="margin: 64px auto;" v-if="!centerres" @click="isbtn();"><span class="tagButtom">添加</span></view>
						<view class="tagWrapButtom" style="margin: 64px auto;" v-if="centerres" @click="ischange();"><span class="tagButtom">修改</span></view>
                        <view style="height:30px"></view>
					</view>
		</view>
		<!-- 基础信息的弹窗 -->
		<popupmore  :filter="filtermo" :title="popuptitle" @addpopup="addpopup" @closePopup="closePopup"></popupmore>
		<!-- 这是弹出层的组件 -->
		<popup :filter="filter" :conter="popupcenter" :title="popuptitle" @closePopup="closePopup" @responsibilitiesSubmit='responsibilitiesSubmit'></popup>
	</view>
</template>
<script>
import popup from 'components/recruiter/popup.vue'
import popupmore from 'components/recruiter/popup_name.vue'
export default {
  data() {
    return {
        uid:"",
        companyId:"",
        basic:{}, //基础信息
        top_center: '添加職位',
        filter: false,
        filtermo:false,
        popuptitle:"",
        popupcenter:"",
        company:{},
		centerres:false,
    };
  },
  components:{
	  popup,
	  popupmore
  },
  onLoad(option){
	this.uid = JSON.parse(option.query).uid;
	this.companyId = JSON.parse(option.query).companyId
	//带有职位id的就修改职位不带有就是添加职位
	if(JSON.parse(option.query).aid){
		this.top_center = "職位信息"
		this.centerres = true;
		this.$minApi.onejob(JSON.parse(option.query).aid).then((res)=>{
			// console.log(res.data)
			this.basic = res.data;
		})
	}
    this.getcompany();
	//获取公司信息;
  },
  methods: {
      getcompany(){
        const that = this;
        try{
            //企业id
            const user = uni.getStorageSync('user');
            // console.log('user',user);
            //获取企业内容
            this.$minApi.getcompany(user.company_id).then((res)=>{
                res.data.logo == null?"":res.data.logo = that.$pubFuc.advertising(res.data.logo);
                res.data.bg == null?"":res.data.bg = that.$pubFuc.advertising(res.data.bg);
                that.company = res.data
                that.basic.company = res.data
            })
        }catch(e){
          console.log(e);
        }
      },
	  addpopup(res){
		  console.log(res);
		this.basic = Object.assign(this.basic, res);
		this.filtermo = false;
	  },
	  ispopupmo(){
		  this.popuptitle = "";
		  this.filtermo = true;
	  },
	ispopup(val){
		this.filter = true;
		this.popuptitle = val;
		if(val == "崗位職責"){
			this.popupcenter = this.basic.responsibility;
		}
		if(val == "崗位要求"){
			this.popupcenter = this.basic.require;
		}
		if(val == "福利待遇"){
			this.popupcenter = this.basic.welfare;
		}
		if(val == "其他信息"){
			this.popupcenter = this.basic.other;
		}
	},
	 forgect(){ //返回
	  	uni.navigateBack({
			delta: 1,
			animationType: 'slide-out-bottom',
			animationDuration: 200
		})
	
	},
	 closePopup(){
		  this.filter = false;
		  this.filtermo = false;
	 },
	 responsibilitiesSubmit(val,type) {
		 if(type == "崗位職責"){
		 	this.basic.responsibility= val;
		 }
		 if(type == "崗位要求"){
		 	this.basic.require= val;
		 }
		 if(type == "福利待遇"){
		 	this.basic.welfare= val;
		 }
		 if(type == "其他信息"){
		 	this.basic.other= val;
		 }
		 this.filter = false
	 },
	 //点击添加job
	 isbtn(){
		 // console.log(this.basic);
		 this.basic.company_id = this.company.id;
		 this.basic.member_id = this.uid
		 //创建之后是否发布
		 // 1 发布
		 // 2 不发布
		 this.basic.is_public = 1;
		 //添加job
		 this.$minApi.addjob(this.basic).then((res)=>{
			 if(res.code == 0){
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-bottom',
					animationDuration: 200
				 });
			 }
		 });
	 },
	 //点击修改job
	 ischange(){
	 		 // console.log(this.basic);
	 		 this.basic.company_id = this.companyId;
	 		 this.basic.member_id = this.uid
	 		 //创建之后是否发布
	 		 // 1 发布
	 		 // 2 不发布
	 		 //添加job
	 		 this.$minApi.updatejob(this.basic).then((res)=>{
	 			 if(res.code == 0){
	 				uni.navigateBack({
	 					delta: 1,
	 					animationType: 'slide-out-bottom',
	 					animationDuration: 200
	 				 });
	 			 }
	 		 });
	 },
  },
};
</script>
<style scoped>
uni-page-body {
	background-color: #F1F3F6;
}
body,
html {
	background-color: #F1F3F6;
}
.onetitle{
	text-align: center;
	margin-top: 24px;
	font-size: 24px;
	font-family: SourceHanSansCN-Medium, SourceHanSansCN;
	font-weight: 500;
	color: #243557;
	line-height: 28px;
}
.map_mp{
    width: 100%;
    height:90px;
    border-radius: 10px;
}
.twotitle{
	margin-top: 8px;
	font-size: 14px;
	font-family: SourceHanSansCN-Medium, SourceHanSansCN;
	font-weight: 500;
	color: #243557;
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
	color: #243557;
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
	background:rgba(36,53,87,1);
	border-radius: 50%;
	background-color: #243557;
	margin-right: 8px;
}
.btrn_center{
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(36,53,87,1);
	line-height:22px;
}

.ter_top{
	margin-top: 24px;
	font-size:12px;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:rgba(36,53,87,1);
	line-height:17px;
},
.topcenter {
	padding-left: 20px;
	display: flex;
	width: 100%;
	text-align: left;
	padding-top: 43px;
	height: 93px;
}
.icon_back{
	padding: 12px;
}
.txtqac{
	font-size:24px;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(36,53,87,1);
	line-height: 40px;
	/* padding: 12px 0 0 0; */
}
.background{
	width: 100%;
	height: 100%;
	background-color: #F1F3F6;
	/* overflow: hidden; */
}
.groupback {
	text-align: center;
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
	border-top-left-radius: 30upx;
	border-top-right-radius: 30upx;
	background:rgba(255,255,255,0.8);
	width: 100%;
	height:calc(100% - 95px);
	padding: 0 48upx;
	padding-top: 24upx;
}

.content_bar{
	margin: 0 auto;
	width: 96upx;
	height: 12upx;
	background-color: #F1F3F6;
}
.main{
	width: 100%;
}
.main_image{
	display: flex;
	justify-content: space-around;
	margin-top: 48upx;
}
.main_image image{
	width: 128upx;
	height: 128upx;
    border-radius: 16px;
}
.main_frame{
	width: 100%;
}
.main_frame_list{
	width: 100%;
	height: 132upx;
	border-radius:10px;
	opacity:0.2;
	border:1px dashed rgba(36,53,87,1);
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
	color:rgba(36,53,87,1);
}
.information{
	margin-top: 48upx;
}
.information_text,.information_content{
	text-align: left;
	font-size:12px;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:rgba(36,53,87,1);
}
.information_content{
	margin-top: 20upx;
	font-weight:400;
}


</style>
