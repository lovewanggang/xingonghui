<template>
	<view class="box_bag">
		<!-- 顶部top -->
		<view class="flex">
			<view class="">
				<u-icon style="padding: 15px 15px;" @click="beback()" name="arrow-left" color="#0E320D"></u-icon>
			</view>
			<view style="margin-left: -35px;margin-top: 15px;text-shadow: 1px 1px 1px #aaa;color: #0E320D;width: 100%;text-align: center;">
				简历详情
			</view>
		</view>
		
		<!-- 简历内容 -->
		<view style="margin: 0 20px;background: rgba(255, 255, 255, 0.8);border-radius: 16px;">
			<detailsale :details="details" :tel="tel"></detailsale>
		</view>
		
		<!-- 确定按钮 -->
		<view class="flex" style="margin-bottom: 0px;">
			<view class="" style="width: 100%;">
				<view class="tagWrapButtom" style="margin: 20px;" @click="istel()">
					<span class="tag">电话</span>
				</view>
			</view>
			<view class="" style="width: 100%;">
				<view class="tagWrapButtom" style="margin: 20px;" @click="isokar()" v-if="shoucang">
					<span class="tag" >收藏</span>
				</view>
				<view class="tagWrapButtom" style="margin: 20px;box-shadow: 0px 3px 0px 0px #AEB8CC;background-image: linear-gradient(0deg, #407acc 0%, #AEB8CC 100%);;" @click="dilisskar()" v-else>
					<span class="tag" style="padding: 0 10px;" >取消收藏</span>
				</view>
			</view>
			<!-- ser -->
			<view class=""  style="width: 100%;">
				<view class="tagWrapButtom" style="margin: 20px;" @click="ismsg()">
					<span class="tag">消息</span>
				</view>
			</view>
		</view>
		<view class="" style="width: 100%;height:1;padding: 18px;">
			
		</view>
		
		
		<u-modal v-model="replyhave" @confirm="replyconfirm" :show-confirm-button="true" :show-cancel-button="true" :content="contentreply"></u-modal>
		
		
		<popup :filter="filter" :title="popuptitle" @closePopup="closePopup" @responsibilitiesSubmit='responsibilitiesSubmit'></popup>
		<popupshou :filter="filter_shou" :oneList="oneList" :title="shoutit" @closePopup="closePopup" @replyshou="replyshou"></popupshou>
	</view>
</template>
<script>
	// import detailsale from 'components/details/index.vue'
	import detailsale from 'components/details/blank_index.vue'
	import popup from 'components/recruiter/popup.vue'
	import popupshou from 'components/recruiter/popup_shoucang.vue'
	export default{
		data(){
			return {
				userid:"",//用户id
				resume_id:"",//简历id
				company_id:"",//公司id
				shoucang_id:0,//收藏id
				type:1,//消息类型
				shoucang:true, //是否收藏
				filter:false,
				filter_shou:false,//收藏的选择
				shoutit:"",
				popuptitle:"簡曆投遞邀請",
				resume:{},
				detiles:{},
				allid:{},
				user:{},
				oneList:[  //公司职位列表
					  
				],
				replyhave:false,
				contentreply:"沒有添加職位,是否前往添加職位",
				tel:"",
				details:{},//简历列表
				
			}
		},
		onLoad(option) {
			const that = this;
			//获取当前人id
			that.user = uni.getStorageSync('user');
			that.userid = uni.getStorageSync('user').id;
			that.company_id = uni.getStorageSync('user').company_id;
			that.resume_id = JSON.parse(option.query).resume_id;
			//电话号码
			//获取简历详情
			this.$minApi.lookresume(JSON.parse(option.query).resume_id).then((res)=>{
				console.log(res);
				res.data.educational = JSON.parse(res.data.educational);
				res.data.exercitation = JSON.parse(res.data.exercitation);
				res.data.school = JSON.parse(res.data.school);
				res.data.skill = JSON.parse(res.data.skill);
				res.data.certificate = JSON.parse(res.data.cert).certificate;
				res.data.award = JSON.parse(res.data.cert).award;
				that.details = res.data
				that.details.type = -1;
				console.log(that.details);
			})
			//电话号码
			console.log(JSON.parse(option.query));
			//公司职位列表
			this.joblist();
			//是否有收藏
			this.$minApi.companycollectresume({s:{resume_id:JSON.parse(option.query).resume_id,company_id:uni.getStorageSync('user').company_id}}).then((res)=>{
				if(res.data.length>0){
					that.shoucang = false;
					that.shoucang_id= res.data[0].id
				}
			})
			//是否投过简历
			this.$minApi.Receiveresume({s:{resume_id:JSON.parse(option.query).resume_id,company_id:uni.getStorageSync('user').company_id}}).then((res)=>{
				if(res.data.length>0){
					that.type = 2
					that.popuptitle = "面試邀請"
				}
			})
			this.$minApi.lookresume(JSON.parse(option.query).resume_id).then((res)=>{
				that.resume = res.data
			})
		},
		components: {
			detailsale,
			popup,
			popupshou
		},
		methods:{
			replyconfirm(){
				this.$openPage('recruiter_position');
			},
			joblist(){
				var that = this; 
				  this.$minApi.isjob({s:{company_id:that.company_id}}).then((res)=>{
					that.oneList = res.data.map((resa)=>{
						return{name:resa.title,id:resa.id}
					})
				  });
			},
			beback(){
				uni.navigateBack();
			},
			istel(){
				console.log("电话");
				const that = this;
				uni.makePhoneCall({
				 	// 手机号
				    phoneNumber: that.details.mobile, 
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			isokar(num){
				if(this.oneList.length>0){
					this.filter_shou = true;
				}else{
					// this.$pubFuc.showToast("没有职位无法收藏");
					this.replyhave = true;
				}
			},
			dilisskar(){
					const that = this;
					this.$minApi.delecollectresume(that.shoucang_id).then((res)=>{
						console.log("收藏");
						that.shoucang = true;
					})
			},
			ismsg(){
				this.filter = true;
			},
			//弹出窗口
			closePopup(){
				this.filter = false;
				this.filter_shou = false;
			},
			replyshou(val){
				const that = this;
				this.$minApi.postcompanycollectresume({
						member_id:that.userid,
						company_id:that.company_id,
						job_id:that.oneList[val].id,
						resume_id:that.resume_id
					}).then((res)=>{
						that.shoucang_id = res.data.id
						that.shoucang = false;
						that.filter_shou = false;
					})
			},
			responsibilitiesSubmit(val) {
				const that = this;
				//获取发送信息的参数
				if(val!=""){
					this.filter = false;
					//type == 1 时候是简历投简  type == 2 时候是邀请面试
					// console.log(that.userid)
					// that.$pubFuc.showToast("發送消息成功");
					if(that.type==1){
						var title = "简历邀请"
					}else{
						var title = "面试邀请"
					}
					this.$minApi.crudmessage({
						member_id:that.resume.member_id,
						company_id:that.company_id,
						title:title,
						content:val,
						type:that.type,
						from_member_id:that.userid,
						}).then((res)=>{
							if(that.type==1){
								that.$pubFuc.showToast("邀请投遞简历成功")
							}else{
								that.$pubFuc.showToast("邀请面試成功")
							}
							
						});
						
				}else{
					//提示消息不能为空
					this.$pubFuc.showToast("發送消息不能為空")
				}
			},
			

		}
	}
</script>
<style>
	
</style>
<style scoped>
	body,
	html {
		-webkit-overflow-scrolling:touch;
	}
.box_bag{
		/* height: 100vh; */
		/* height: 100%; */
		height: 100%;
		overflow-y: auto;
		 -webkit-overflow-scrolling: touch;
	}
	
	.box_bag::before{
		height: 100vh;
		/* -webkit-overflow-scrolling: touch; */
		/* height: 100%; */
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
	.flex{
		padding: 36px 25px 0 25px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		align-items: auto;
	}
	.tagWrap {
		display: flex;
		position: relative;
		align-items: center;
		align-self: center;
		flex-direction: row;
		justify-content: center;
		margin-top: 15px;
		border-radius: 16px;
		background-image: linear-gradient(0deg, #1ceeaf 0%, #079742 100%);
		width: calc(100%);
		height: 45px;
		-moz-box-shadow: 0px 3px 0px 0px #05653b;
		-webkit-box-shadow: 0px 3px 0px 0px #05653b;
		box-shadow: 0px 3px 0px 0px #05653b;
	}
	.tagWrap:active {
		-moz-box-shadow: 0px 0px 0px 0px #05653b;
		-webkit-box-shadow: 0px 0px 0px 0px #05653b;
		box-shadow: 0px 0px 0px 0px #05653b;
	}
	.tag {
		max-width: 303px;
		height: 17px;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 17px;
		white-space: nowrap;
		color: #ffffff;
		font-size: 12px;
		font-weight: 500;
	}
</style>
