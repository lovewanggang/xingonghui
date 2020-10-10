<template>
	<view class="mod">
		<view class="spanbt">
			
		</view>
		<view class="box_button">
			<!-- 中间box -->
			<view class="box_c">
				<!-- 顶部下滑返回 -->
				<view style="text-align: center;" class="box_t" @click="beback()">
					<image class="icon_1" src="/static/images/11a80ad0e39111eab95cafe3ce92de6c.png"/>
				</view>
				<!-- 搜索框 -->
				<view>
					<span class="title_font" style="margin-left: 32px;">搜索簡歷</span>
					<view class="midinp" style="margin:8px 24px;">
						<input type="text" v-model="sosoval"  placeholder-class="tagwrp" placeholder="輸入關鍵字..." />
						<u-icon style="padding: 0 20px;" @click="soso()" name="search"></u-icon>
					</view>
				</view>
				<!-- 导航 -->
				<!-- <selecta :list="list" @click="click_job"></selecta> -->
				
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
				<customSwiper @goin="goin" :ctrn="ctrn" @toindex="toindex" v-if="ctrn.length >0 && ishave"/>
				<view v-if="ctrn.length >0 && ishave">
					<view class="mid_btn" style="padding-bottom: 40px;" v-if="!isfavorites" @click="favorites">
						<image src="/static/images/bfqi.png" alt="">
					</view>
					<view class="mid_btnr"  v-if="isfavorites">
						<image src="/static/images/bfd.png" alt="">
						<view class="qcvm">
							已收藏
						</view>
					</view>
				</view>
				<view class="centea" v-else>
					无推荐内容
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
		sosoval:"",//搜索输入框的值
		company_id:"",
		job_id:"",
		page:1,
		limit:6,
		current:0,
		member_id:"",
		toindexval:0,
		isfavorites:false,
		ctrn:[],
		list:[],
		ishave:true, //是否有职位
    };
  },
  components:{
	  selecta,
	  customSwiper
  },
  onLoad(option) {
	  if(JSON.parse(option.query).job_id){
		  this.job_id = JSON.parse(option.query).job_id
	  }
  	//拿到当前公司Id
  	this.getUser();
  	//公司职位列表
  	this.joblist();
  },
  onShow() {
  	this.joblist();
  },
  methods: {
	  goin(index){
		  this.$openPage({
		            name: 'recruite_details',
		            query: {
		  			  resume_id:this.ctrn[index].resume_id,
		  			 },
		  })
	  },
	  toindex(val){
	  	this.toindexval = val
	  	this.$minApi.getcompanycollectresume({s:{resume_id:this.ctrn[val].resume_id,job_id:this.job_id,company_id:this.company_id}}).then((re)=>{
			// console.log(re.data)
			if(re.data.length>0){
				this.isfavorites = true;
			}else{
				this.isfavorites = false;
			}
		});
	  },
	  soso(){
		//跳转到搜索页面页面
		this.$openPage({
		    name: 'sosolist',
		    query: {value: this.sosoval},
		});
	  },
	  //点击职位
	  change(index){
	  		  var that = this;
			  console.log(this.list);
			  this.current = index;
	  		  that.job_id=this.list[index].id;
			  that.recommendedresume();
	  },
	  //获取用户信息
	  getUser(){
	  	var that = this;
	  	const value = uni.getStorageSync('user');
	  	this.company_id = value.company_id
	  },
	  //公司职位列表
	  joblist(){
	  		 var that = this; 
	  		  this.$minApi.isjob({s:{company_id:this.company_id}}).then((res)=>{
					if(res.data.length == 0){
					// console.log("这里是空的");
					// 这是慢的把
					that.ishave = false;
					}else{
						that.ishave = true;
					}
					if(res.data.length>0){
						if(that.job_id==''){
							that.job_id=res.data[0].id;
						}
						//拿下标
						for (var i=0;i<res.data.length;i++)
						{
							if(res.data[i].id==that.job_id){
								that.current = i
							}
						}
					}
	  				that.list = res.data.map((resa)=>{
	  					return{name:resa.title,id:resa.id}
	  				})
					that.recommendedresume();
	  	});
	  },
	  recommendedresume(){
		  var that = this;
		  // console.log("进入了这里了");
		   this.$minApi.recommendedresume({job_id:that.job_id,company_id:that.company_id}).then((res)=>{
			   // 收藏
				   if(res.data.length>0){
					   this.$minApi.getcompanycollectresume({s:{company_id:that.company_id,job_id:that.job_id,resume_id:res.data[0].id}}).then((re)=>{
							if(re.data.length>0){
									that.isfavorites = true;
						}
					});
				 }
				 //
				 var receiveresume= res.data.map((resa,index)=>{
					  return{
						  img:resa.photo,
						  name:resa.resume_family_name+resa.resume_first_name,
						  center:"曾任："+resa.title+" $"+resa.salary_start/1000+"K-"+resa.salary_end/1000+"K/月",
						  year:resa.work_experience+"年",
						  education:resa.education,
						  address:resa.address,
						  msg:resa.evaluate,
						  resume_id:resa.resume_id,
					  }
				 })
				that.ctrn = receiveresume
		   });
	  },
	  //收藏简历
	  favorites(){
	  		this.isfavorites = !this.isfavorites  
	  		var resume_id = this.ctrn[this.toindexval].resume_id
	  		this.$minApi.postcompanycollectresume({"member_id":this.member_id,"company_id":this.company_id,"job_id":this.job_id,"resume_id":resume_id}).then((res)=>{
	  		  				
	  		  });
	  },
	  beback(){
		//返回上一页
		
		//刷新上一页
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
		padding: 30px 24px 24px 24px;
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
		width: 100%;
		height: 100%;
		border-radius: 32px;
		margin: 0 auto;
		width: calc(100% - 16px);
		min-height: 660px;
		background-color: rgba(0, 0, 0, 0.2);
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