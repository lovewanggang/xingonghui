<template>
  <view class="mod">
	<view class="posi">
		<view class="frec">
			搜索簡歷
		</view>
		<view class="midinp">
			<input type="text" v-model="sosoval"  placeholder-class="tagwrp" placeholder="輸入關鍵字..." />
			<u-icon style="padding: 0 20px;" @click="soso()" name="search"></u-icon>
		</view>
		<selecta :list="list" @click_job='click_job'></selecta>
		<view class="fts" style="text-align: center;" @click="recommend()">
			<view>
				上滑查看推薦
			</view>
			<u-icon name="arrow-up"></u-icon>
		</view>
	</view>
	<navigation></navigation>
  </view>
</template>
<script>
	import navigation from 'components/public/navigation.vue'
	import selecta from '@/components/recruiter/select.vue'
export default {
  data() {
    return {
		sosoval:"",//搜索输入框的值
		uid:"",
		user:"",
		company_id:"",
		list:[],
    };
  },
  onLoad() {
	  const user = uni.getStorageSync('user');
	  this.uid = user.id;
	  this.user = user;
	  this.company_id = user.company_id;
  	this.joblist();
  },
  components: {
  	navigation,
	selecta
  },
  methods: {
			click_job(id){
				console.log("点击了");
				this.$openPage({
				          name: 'resume',
				          query: {job_id:id},
					})
			},
			soso(){
				//拿到输入框的值 
				//跳转页面
				this.$openPage({
				          name: 'sosolist',
				          query: {sosoval: this.sosoval},
					})
			},
			joblist(){
				var that = this
				this.$minApi.isjob({s:{company_id:this.company_id}}).then((res)=>{
					that.list = res.data.map((resa)=>{
						return{name:resa.title,id:resa.id}
					})
				
				});
			},
			recommend(){
				this.$openPage('resume');
			}
  		}
};
</script>
<style scoped>
	uni-page-body {
		height: 100%;
	}
	body,
	html {
		height: 100%;
	}
	.mod{
		position: relative;
		min-height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url('/static/images/74b67240e38911eaaa7cdfff15829f1f.png');
		padding: 24px;
	}
	.frec{
		font-size:24px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:33px;
	}
	.posi{
		width: calc(100% - 40px);
		position: absolute;
		left: 20px;
		bottom: 110px;
	}
	.fts{
		margin-top: 10px;
		font-size:12px;
		font-family:PingFangTC-Regular,PingFangTC;
		font-weight:400;
		color:rgba(255,255,255,0.8);
		line-height:17px;
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
</style>
