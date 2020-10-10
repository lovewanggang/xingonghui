<!-- 底部导航 -->
<template>
	<view class="navigation">
		<view class="">
			<image v-if="route == 'pages/recruiter_index/index'" class="noSelects" src="/static/images/wode.png" mode=""></image>
			<image v-else @click="back('recruiterindex')" class="noSelect" src="/static/images/me.png" mode=""></image>
		</view>
		<view class="">
			<image v-if="route == 'pages/recruiter_position/recruiter_position'" class="noSelects" src="/static/images/zhiwei.png" mode=""></image>
			<image v-else @click="back('recruiter_position')" class="noSelect" src="/static/images/News.png" mode=""></image>
		</view>
		<view class="">
			<image  v-if="route == 'pages/recruiter_soso/soso'" class="noSelects" src="/static/images/sousuo.png" mode=""></image>
			<image v-else @click="back('soso')" class="noSelect" src="/static/images/Zoom_in.png" mode=""></image>
			
		</view>
		<view class="">
			<image v-if="route == 'pages/recruiter_news/recruiter_news'" class="noSelects" src="/static/images/bianji.png" mode=""></image>
			<image v-else @click="back('recruiter_news')" class="noSelect" src="/static/images/Icon.png" mode=""></image>
			
		</view>
	</view>
</template>

<script>
export default {
	name: 'navigation',
	data() {
		return {
			route: ''
		};
	},
	props: {
		
	},
	mounted() {
	    const routes = getCurrentPages();
	    const curRoute = routes[routes.length - 1].route
		this.route = routes[routes.length - 1].route;
	},
	methods: {
		back(url){
			console.log(this.route);
			this.$openPage(url)
		}
	},
}
</script>

<style scoped>
.navigation{
	blur:6px;
	position: fixed;
	bottom: 80upx;
	left: 5%;
	width: 90%;
	height: 120upx;
	background:rgba(23,62,118,0.6);
	border-radius:32upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 60upx;
}	
.select{
	width: 194upx;
	height: 76upx;
	background:rgba(23,62,118,0.6);
	border-radius:32upx;
}
.noSelect{
	width: 34upx;
	height: 34upx;
}
.noSelects{
	margin-left: -5px;
	margin-top: 3px;
	width: 97px;
	height: 38px;
}
</style>
