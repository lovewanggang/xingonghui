<template>
	<view style="background-color: #F1F3F6;height: 100%;">
		<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<view class="content">{{protocol}}</view>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center:"",
				show: false,
				type: 0,
				protocol: ''
			}
		},
		components:{
			loginTopbackTwoMove
		},
		onLoad(res) {
			this.type = JSON.parse(res.query).type
			this.getList()
		},
		methods: {
			getList() { // 初始化
				if (this.type == 1) {
					this.top_center = '用戶協議';
				} else if (this.type == 2) {
					this.top_center = '隱私協議';
				} 
				
				this.$minApi.config().then((res)=>{
					console.log(res)
					if (this.type == 1){
						this.protocol = res.data[0].applicant_protocol
					} else if(this.type == 2){
						this.protocol = res.data[0].applicant_privacy
					} 
				})
			},
			forgect(){ //返回
				uni.navigateBack();
			},
		}
	}
</script>

<style scoped>
uni-page-body {
	height: 100%;
}
body,
html {
	height: 100%;
	background-color: #F1F3F6;
}
.content{
	padding: 0 48upx;
	width: 100%;
	margin-top: 56upx;
	text-indent: 2em;
}
</style>
