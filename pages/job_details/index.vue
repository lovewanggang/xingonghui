<template>
	<view class="box_bag">
		<toptitle :title="title" @beback="beback"></toptitle>
		<!-- 简历内容 -->
		<view class="ccall">
			<jobdetailsale @reproduce="reproduce" :details="details" @information="information" @evaluation="evaluation" @experience="experience" @professional="professional" @certificate="certificate"></jobdetailsale>
		</view>
		<!-- 确定按钮 -->
		<view class="ccall" style="padding: 28px 48px 0px 48px;margin-top: -20px;">
			<view class="tagWrap" @click="isokar()">
				<span class="tag">確定</span>
			</view>
			<view>
				
			</view>
		</view>
		<view class="" style="width: 100%;height:1;padding: 18px;background-color: #fff;">
		</view>
	</view>
</template>
<script>
	import toptitle from 'components/details/index_top.vue'
	import jobdetailsale from 'components/details/blank_index.vue'
	export default{
		data(){
			return {
				title:"新建簡歷",
				contentval:"",
				userid:"",
				// tel:"",
				details:{},
				proment:{},
				
				reviseId:null, //修改的Id
			}
		},
		onLoad(option) {
			const that = this;
			// this.proment.mobile = uni.getStorageSync('user').mobile;
			this.proment.member_id = uni.getStorageSync('user').id;
			
			this.userid = uni.getStorageSync('user').id;
			
			//如果有简历id
			if(JSON.parse(option.query).id){
				this.reviseId = JSON.parse(option.query).id;
				//获取简历详情
				this.$minApi.lookresume(JSON.parse(option.query).id).then((res)=>{
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
			}
		},
		onShow() {
			this.rendering();
		},
		components: {
			jobdetailsale,
			toptitle
		},
		methods:{
			beback(){
				uni.navigateBack();
			},
			reproduce(data){
				// this.proment = data;
				Object.assign(this.proment,data);
			},
			rendering(){
				try {
				    const details = uni.getStorageSync('details');
					uni.setStorage({
						key:'details',
						data:''
					})
				    if(details == ""){
				    	console.log("查看是否是简历详情");
				    }else{
				    	this.details = JSON.parse(details);
				    }
				} catch (e) {
				    // error
					uni.setStorage({
						key:'details',
						data:''
					})
				}
				
				
			},
			isokar(){
				//开始添加简历
				this.proment.educational = JSON.stringify(this.proment.educational);
				this.proment.exercitation = JSON.stringify(this.proment.exercitation);
				this.proment.school = JSON.stringify(this.proment.school);
				this.proment.skill = JSON.stringify(this.proment.skill);
				let crll = {certificate:this.proment.certificate,award:this.proment.award};
				// console.log(crll);
				if(crll.award == undefined || crll.certificate == undefined){
					this.proment.cert = undefined;
				}else{
					this.proment.cert = JSON.stringify(crll);
				}
				this.$minApi.putmemberinfo({
					family_name:this.proment.family_name,first_name:this.proment.first_name
				},this.userid).then((res)=>{
					console.log(res);
				})
				if(this.reviseId){
					console.log(this.proment);
					//修改
					this.$minApi.reviseresume(this.proment,this.reviseId).then((res)=>{
						console.log(res);
						if(res.code == 0){
							uni.navigateBack();
						}
					});
				}else{
					if(this.proment.educational == undefined || this.proment.skill == undefined || this.proment.certificate == undefined){
						this.$pubFuc.showToast("請完善信息");
						return
					}
					this.proment.is_public = 2;
					//添加
					this.$minApi.addresume(this.proment).then((res)=>{
						// console.log(res);
						if(res.code == 0){
							uni.navigateBack();
						}
					});
				}
				
			},
			information(data){
				if(data){
					this.$openPage({
					    name: 'information',
					    query: {data: data},
					})
				}else{
					this.$openPage("information");
				}
			},
			// 经验
			experience(data){
				if(data){
					this.$openPage({
					    name: 'experience',
					    query: {data: data},
					})
				}else{
					this.$openPage("experience");
				}
			},
			// 技能
			professional(data){
				if(data){
					this.$openPage({
					    name: 'professional',
					    query: {data: data},
					})
					//
				}else{
					this.$openPage("professional");
				}
			},
			//证书
			certificate(data){
				if(data){
					this.$openPage({
					    name: 'certificate',
					    query: {data: data},
					})
				}else{
					this.$openPage("certificate");
				}
			},
			//自我评价
			evaluation(data){
				if(data){
					this.$openPage({
					    name: 'evaluation',
					    query: {data: data},
					})
				}else{
					this.$openPage("evaluation");
				}
			}
		}
	}
</script>
<style>
	
</style>
<style scoped>
uni-page-body {
		/* background-color: #fff; */
		height: 100%;
	}
	body,
	html {
		/* background-color: #fff; */
		height: 100%;
	}
	.ccall{
		/* background-color: #fff; */
		/* height: 100%; */
	}
.box_bag{
		/* background-color: #fff; */
		height: 100%;
		/* padding-bottom: 32px; */
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
