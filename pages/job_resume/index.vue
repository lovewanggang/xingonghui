<template>
	<view class="box_bag">
		<u-modal v-model="showmod" @confirm="confirm" :mask-close-able="true" :show-cancel-button="true" :async-close="true" :content="contentval"></u-modal>
		<!-- 顶部top -->
		<view class="flex">
			<view class="">
				<u-icon style="padding: 15px 15px;" @click="beback()" name="arrow-left" color="#0E320D"></u-icon>
			</view>
			<view style="margin-left: -35px;margin-top: 15px;text-shadow: 1px 1px 1px #aaa;color: #0E320D;width: 100%;text-align: center;">
				我的簡歷
			</view>
		</view>
		<!-- 中间内容 -->
		<view style="padding-bottom: 140px;">
			<u-swipe-action 
			style="width: 100%;"
			:show="item.show"
						:index="index"
						:bg-color="bgcolor"
						v-for="(item, index) in list"
						:key="item.id"
						@click="click"
						@open="open"
						:options="options"
						btn-width="120">
				<view v-if="tlist" class="box" @click="jump(item.id)">
					<view class="box_btn">
						<view class="box_btn_img">
							<image src="/static/images/decrnz.png"></image>
						</view>
						<view class="box_btn_img">
							<image src="/static/images/bjde.png"></image>
						</view>
					</view>
					<!-- 背景图 -->

					<view class="mid_box"  :style="{ backgroundImage: 'url(' +(avatar_width ? $pubFuc.advertising(avatar_width):backimg)+ ')' }">
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
										HK${{item.salary_start}}～{{item.salary_end}}K/月
									</view>
								</view>
								<!-- 是否正在招聘 -->
								<view class="" @click.stop="onswitch(index)">
									<u-switch active-color="#34c759" inactive-color="#eee" v-model="item.is_public == 1"></u-switch>
								</view>
							</view>
							<!-- 地区经验学历 -->
							<view class="job_assres">
								<view class="tla">
									{{item.work_experience}} 年 
								</view>
								/
								<view class="tla">
									 {{item.education}}
								</view>
								/ 
								<view class="" v-if="item.sex">
									<view class="tla" v-if="item.sex==1" >
										男
									</view>
									<view class="tla" v-else >
										女
									</view>
								</view>
								/
								<view class="tla">
									 {{item.age}}歲
								</view>
								 
							</view>
							<!-- 底部资料 -->
							<view class="btrn_btn">
								<view class="btn_box">
									<u-icon name="download" color="#fff" size="28" style="margin-right: 5px;"></u-icon> 已發送{{item.receiverresume_count}}
								</view>
								<view class="btn_box">
								<u-icon name="eye-fill" color="#fff" size="28" style="margin-right: 5px;"></u-icon>
									被查看{{item.resumeview_count}}
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
		<difiler :filter="filter" :title="title"></difiler>
		<view class="btn_im">
			<image @click="toaddjli" src="/static/images/btnnm.png" alt="">
		</view>
	</view>
</template>
<script>
	import difiler from 'components/recruiter/popup_myresume.vue';
	export default{
		name:"jobindex",
		data(){
			return {
				compayid:"",//机构id
				member_id:"",
				avatar_width:"",
				userid:"",
				contentval:"",
				showmod:false,
				tlist:false,
				list: [
				],
				show: false,
				bgcolor:"",
				filter:true,
				title:"标题",
				conter:"内容",
				backimg:"/static/images/80257d70e37911eaa6bb09248d818b59.png",
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
			}
		},
		onLoad() {
			const that = this
		},
		components: {
			difiler
		},
		onShow() {
			this.getUser()
		},
		methods:{
			//获取简历信息
			getUser(){
				var that = this;
				try{
					const user = uni.getStorageSync('user');
						this.member_id = user.id;
						this.avatar_width = user.avatar_width;
						this.$minApi.resumelist({s:{member_id:this.member_id,is_delete:0},sum:'receiverresume,resumeview,message',fields:'id,title,salary_start,salary_end,work_experience,education,sex,age,receiverresume,receiverresume_count,resumeview_count,message_count,is_public'}).then((res)=>{
							that.list = res.data.map((resa)=>{
								resa.show = false;
								return resa;
							})
							console.log(res);
							//是否有职位
							if(res.data.length == 0){
								that.tlist=false
							}else{
								that.tlist=true
							}
						});
				}catch(e){
					// 错误了返回
				}
			},
			//点击显示
			onswitch(index){
				if(this.list[index].is_public == 1){
					this.$minApi.resumestatus({member_id:this.member_id,resume_id:this.list[index].id,'is_public':2}).then((res)=>{
						if(res>0){
							this.list[index].is_public = 2
						}
						this.$set(this.list,index,this.list[index]);
		
					});					
				}else{
					this.$minApi.resumestatus({member_id:this.member_id,resume_id:this.list[index].id,'is_public':1}).then((res)=>{
		
						let filter = this.list.filter((resa)=>{
							if(resa.is_public== 1 && resa.is_public){
								return resa
							}
						});
						if(filter.length>0){
							filter[0].is_public = 2
						}
							this.list[index].is_public = 1
							
							this.$set(this.list,index,this.list[index]);
						});		
					}
			},
			click(index, index1) {
				if(index1 == 1) {
					// 这是删除
					this.showmod = true;
					this.contentval = "是否删除 "+this.list[index].title +" 简历"
					this.delId = this.list[index].id;
					this.delindex = index;
				}else{
					//这是修改职业信息
					this.$openPage({
					    name: 'tolist',
					    query: {id: this.list[index].id},
					})
				}
			},
			confirm() {
					  //删除id
					  const that = this;
					  that.showmod = false;
					  this.$minApi.delresume({is_delete:1},this.list[this.delindex].id).then((res)=>{
					  	if(res){
							 that.list.splice(that.delindex,1);
					  		this.$pubFuc.showToast('删除成功')
					  	}else{
					  		this.$pubFuc.showToast('删除失败')
					  	}
						that.getUser();
						// that.list.$set(this.list,0,this.list[0]);
					  });
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
			beback(){
				uni.navigateBack();
			},
			toaddjli(){
				console.log("点击添加简历");
				// 判断有没有身份证
				// 如果有走true
				// 如果没有走false
				//跳转页面
				this.$openPage('tolist');
			},
			jump(id){
				console.log("进入了详情");
				this.$openPage({
				          name: 'tolist',
				          query: {id: id},
				})
			}
		}
	}
</script>
<style>
	
</style>
<style scoped>

uni-page-body {
		background-color: #F4FAF3;
		height: 100%;
	}
	body,
	html {
		background-color: #F4FAF3;
		height: 100%;
	}
.box_bag{
		background-color: #F4FAF3;
		height: 100%;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;

	}
	.box_btn{
		display: flex;
		position: absolute;
		right: 50px;
		top: 50px;
		width: 66px;
		height: 100%;
		/* height: 66px; */
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
		padding-bottom: 12px;
		background-color: #F4FAF3;
	}
	.mid_box{
		margin: 0 15px;
		/* box-shadow:0px 20px 50px 0px rgba(17,27,46,0.3); */
		border-radius:16px;
		
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
	.btn_im{
		text-align: center;
		position: fixed;
		z-index: 99;
		bottom: -40px;
		left: calc(50% - 80px);
	}
	.btn_im image{
		width: 160px;
		height: 160px;
	}
</style>
