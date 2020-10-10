<template>
	<view class="box_bag" >
		<u-modal v-model="showmod" @confirm="confirm" :mask-close-able="true" :show-cancel-button="true" :async-close="true" :content="contentval"></u-modal>
		<view class="flex" >
			<view class="top_tit">
				招聘職位
			</view>
			<view class="btn" @click="addposition()">
				<u-icon name="plus-circle" color="#243557" size="48"></u-icon>
			</view>
		</view>
		<view class="" style="padding-bottom: 140px;">
			<u-swipe-action :show="item.show"
						:index="index"
						:bg-color="bgcolor"
						v-for="(item, index) in list"
						:key="item.id"
						@click="click"
						@open="open"
						:options="options"
						btn-width="120">
				<view v-if="tlist" class="box" @click="jump(index)">
					<view class="box_btn">
						<view class="box_btn_img">
							<image src="/static/images/kasde.png"></image>
						</view>
						<view class="box_btn_img">
							<image src="/static/images/bjde.png"></image>
						</view>
					</view>
					<!-- 背景图 -->
					<view class="mid_box">
						<!-- 阴影层 -->
						<view class="box_cen">
							
							<view class="top_title">
								<view class="">
									<!-- 招聘职位 -->
									<view class="job">
										{{item.title}}
									</view>
									<!-- 招聘金额 -->
									<view class="job_money">
										${{item.salary_start}}～{{item.salary_end}}/月
									</view>
								</view>
								<!-- 是否正在招聘 -->
								<view class="" @click.stop="onswitch(index)">
									<u-switch active-color="#34c759" inactive-color="#eee" v-model="item.is_public == 1"></u-switch>
								</view>
							</view>
							<!-- 地区经验学历 -->
							<view class="job_assres">
								<view class="tla widea">
									{{item.company.address}}
								</view>
								/
								<view class="tla" v-if="item.seniority_start == item.seniority_end">
									{{item.seniority_end}} 年工作经验
								</view>
								<view class="tla" v-if="item.seniority_start != item.seniority_end">
									{{item.seniority_start}}～{{item.seniority_end}} 年工作经验
								</view>
								/ 
								<view class="tla">
									{{item.education}}及以上
								</view>
							</view>
							<!-- 底部资料 -->
							<view class="btrn_btn">
								<view class="btn_box">
									<u-icon name="download" color="#fff" size="28" style="margin-right: 5px;"></u-icon> 新接收{{item.jobresume_count}}
								</view>
								<view class="btn_box">
								<u-icon name="eye-fill" color="#fff" size="28" style="margin-right: 5px;"></u-icon>
									已查看{{item.view}}
								</view>
								<view class="btn_box">
								<u-icon name="man-add-fill" color="#fff" size="28" style="margin-right: 5px;"></u-icon>
									待面试{{item.message_count}}
								</view>
							</view>
						</view>
					</view>
				</view>
				

		</u-swipe-action>
		</view>
		<navigation></navigation>
		
		<u-modal v-model="replyhave" @confirm="replyconfirm" :show-confirm-button="true" :show-cancel-button="true" :content="contentreply"></u-modal>
		
  </view>
</template>
<script>
import navigation from 'components/public/navigation.vue'
export default {
  data() {
    return {
        compayid:"",//机构id
		replyhave:false,
		contentreply:"未完善信息,是否前往機構",
	    checked: true,
	    userid:"",
	    tlist:false,
	    list: [
	  	],
		delId:"", //删除的id
		delindex:"", //删除的第几个
	  	disabled: false,
	  	show: false,
		bgcolor:"",
		showmod:false,
		contentval:"",
	  	options: [
	  		{ //拖拽的设置
				text: '',
	  			style: {
	  				backgroundColor: ''
	  			}
	  		},
	  		{ //拖拽的删除
	  			text: '',
	  			style: {
	  				backgroundColor: ''
	  			}
	  		}
	  		]
    };
  },
  components: {
  	navigation
  },
  onShow() {
  	this.getUser();
  },
  methods: {
	  getUser(){
	  	var that = this;
	  	try{
	  		const value = uni.getStorageSync('user');
			this.compayid = value.company_id;
			this.userid = value.id;
			this.$minApi.isjob({s:{company_id:this.compayid}, sum:'jobresume,message'}).then((res)=>{
                console.log(res.data);
				that.list = res.data.map((resa)=>{
					resa.show = false;
					return resa;
				})
				//是否有职位
				if(res.data.length == 0){
					that.tlist=false
				}else{
					that.tlist=true
				}
			});
	  	}catch(e){
			// 错误了返回
			that.$openPage('recruiterindex');
	  	}
	  },
	  //添加职位
	  addposition() {
		  const that = this;
		  this.$minApi.getcompany(this.compayid).then((res)=>{
                console.log(res.data);
				if(res.data.address && res.data.desc){
					this.$openPage({
								  name:'recruiter_addposition',
								  query:{uid:this.userid,companyId:this.compayid}
					});
				}else{
					// this.$pubFuc.showToast('請前往機構,完善信息！！！')
					that.replyhave = true;
				}
			})
		  
	  },
	  replyconfirm(){
		 this.$openPage("recruiter_mechanism");
	  },
	  //点击跳转
	  jump(index){
		  this.$openPage({
		  			  name:'login2',
		  			  query:{index:index}
		  })
	  },
	  //点击显示
	  onswitch(index){
		if(this.list[index].is_public == 1){
			this.list[index].is_public = 2
		}else{
			this.list[index].is_public = 1
		}
		//开始修改招聘职位信息
	  },
	  click(index, index1) {
	  	if(index1 == 1) {
			// 这是删除
			this.showmod = true;
			this.contentval = "是否删除 "+this.list[index].title +" 职位"
			this.delId = this.list[index].id;
			this.delindex = index;
	  	}else{
			//这是修改职业信息
			this.$openPage({
				name:'recruiter_addposition',
				query:{uid:this.userid,companyId:this.compayid,aid:this.list[index].id}
			});
	  	}
	  },
	  // 如果打开一个的时候，不需要关闭其他，则无需实现本方法
	  open(index) {
	  	// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
	  	// 原本为'false'，再次设置为'false'会无效
	  	this.list[index].show = true;
	  	this.list.map((val, idx) => {
	  		if(index != idx) this.list[idx].show = false;
	  	})
	  },
	  confirm() {
		  //删除id
		  const that = this;
		  
		  that.showmod = false;
		  this.$minApi.deljob(this.delId).then((res)=>{
			  if(res == 1){
				  that.list.splice(that.delindex,1);
				  this.$pubFuc.showToast("删除成功");
				  this.delId = "";
				  this.delindex = "";
				}else{
					//删除失败
					this.$pubFuc.showToast("删除失败");
					this.getUser();
				}
		  });
	  	}
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
	.box_bag{
		background-color: #F1F3F6;
		overflow-x: hidden;
        height:100%;
	}
	.widea{
		width: 110px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.tla{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0 3px;
	}
	.box_btn{
		display: flex;
		position: absolute;
		right: 50px;
		top: 50px;
		width: 66px;
		height: 66px;
	}
	.box_btn_img{
		margin: 0 4px;
		width: 50px;
		height: 50px;
	}
	.box_btn_img image{
		width: 50px;
		height: 50px;
	}
	.box_btn_color{
		display: flex;
		align-items: center;
		margin-right: 11px;
		border-radius: 50%;
		width: 48px;
		height: 48px;
	}
	.flex{
		padding: 36px 25px 0 25px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		align-items: auto;
	}
	.top_tit{
		padding: 8px;
		font-size:24px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(36,53,87,1);
		line-height:28px;
	}
	.btn{
		margin-top: 2px;
		padding: 8px;
	}
	.box{
		width: 100%;
		margin-bottom: 12px;
	}
	.mid_box{
		margin: 0 15px;
		box-shadow:0px 20px 50px 0px rgba(17,27,46,0.3);
		border-radius:16px;
		background-image: url("/static/images/80257d70e37911eaa6bb09248d818b59.png");
	}
	.box_cen{
		width: 100%;
		height: 100%;
		border-radius:16px;
		padding: 15px 20px 20px 20px;
		background:linear-gradient(180deg,rgba(15,54,90,0.1) 0%,rgba(18,36,53,0.6) 100%);
	}
	
	.top_title{
		display: flex;
		justify-content: space-between;
	}
	.job{
		font-size:20px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:28px;
		text-shadow:0px 20px 50px rgba(17,27,46,0.3);
	}
	.job_money{
		margin-top: 3px;
		font-size:16px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:22px;
		text-shadow:0px 20px 50px rgba(17,27,46,0.3);
	}
	.job_assres{
		display: flex;
		margin-top: 27px;
		font-size:12px;
		font-family:PingFangTC-Medium,PingFangTC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:17px;
		text-shadow:0px 20px 50px rgba(17,27,46,0.3);
	}
	.btrn_btn{
		margin-top: 5px;
		display: flex;
	}
	.btn_box{
		padding: 3px 9px;
		margin-right: 5px;
		background:rgba(255,255,255,0.25);
		box-shadow:0px 20px 50px 0px rgba(17,27,46,0.3);
		border-radius:5px;
		font-size:12px;
		font-family:PingFangTC-Medium,PingFangTC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:17px;
		text-shadow:0px 20px 50px rgba(17,27,46,0.3);
	}
</style>
