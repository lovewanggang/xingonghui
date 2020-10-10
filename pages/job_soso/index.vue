<template>
  <view class="mod">
	<view class="posi">
		<view class="frec">
			搜索職位
		</view>
		<view class="midinp">
			<input type="text" v-model="sosoval"  placeholder-class="tagwrp" placeholder="輸入關鍵字..." />
			<u-icon style="padding: 0 20px;" @click="soso()" name="search"></u-icon>
		</view>
		
		<view class="fts" style="text-align: center;" @click="toresume()">
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
	import navigation from 'components/public/job_tobar.vue'
export default {
  data() {
    return {
		sosoval:"", //搜索输入框的值 slide-out-right
    };
  },
  components: {
  	navigation,
	// selecta
  },
    
  methods: {
		soso(){
			//拿到输入框的值
			this.$openPage({
			          name: 'job_sosolist',
			          query: {sosoval: this.sosoval},
			})
		},
		recommend(){
			this.$openPage('resume');
		},
		toresume(){
			//上滑查看所有
			console.log("上滑查看所有");
			this.$openPage('tuijian');
			
		},
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
		background-image: url('/static/images/bag1.png');
		padding: 24px;
	}
	.frec{
		font-size:24px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:33px;
		text-shadow: 1px 0px 1px #aaa;
	}
	.posi{
		width: calc(100% - 40px);
		position: absolute;
		left: 20px;
		bottom: 120px;
	}
	.fts{
		margin-top: 10px;
		font-size:12px;
		font-family:PingFangTC-Regular,PingFangTC;
		font-weight:400;
		color:rgba(255,255,255,0.8);
		line-height:17px;
		text-shadow: 1px 1px 1px #aaa;
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
		text-shadow: 1px 1px 1px #aaa;
		letter-spacing: 1px;
	}
</style>
