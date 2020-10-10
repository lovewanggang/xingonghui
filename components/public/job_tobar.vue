<!-- 底部导航 -->
<template>
	<view class="">
		<view class="navigation">
			<view>      
				<image v-if="route == 'pages/job_index/index'" class="noSelects" src="/static/images/mine_job.png" mode=""></image>
				<image v-else @click="back('jobindex')" class="noSelect" src="/static/images/me.png" mode=""></image>
			</view>
			<view>
				<image v-if="route == 'pages/job_recording/index'" class="noSelects" src="/static/images/zhiwei_job.png" mode=""></image>
				<image v-else @click="back('job_recording')" class="noSelect" src="/static/images/News.png" mode=""></image>
			</view>
			<view>
				<image  v-if="route == 'pages/job_soso/index'" class="noSelects" src="/static/images/soso_job.png" mode=""></image>
				<image v-else @click="back('job_soso')" class="noSelect" src="/static/images/Zoom_in.png" mode=""></image>
			</view>
			<view>
				<image v-if="route == 'pages/job_news/index'" class="noSelects" src="/static/images/bji_job.png" mode=""></image>
				<image v-else @click="back('job_news')" class="noSelect" src="/static/images/Icon.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
export default {
	name: 'navigation',
	data() {
		return {
			route: '',
			params:{
			    width:'100%',
			    height:'100%',
			    image:"https://mydarling.gitee.io/uniapp-extend/static/images/douyin/4.jpg",
			    blur:"m"
			},
		};
	},
	props: {
		
	},
	components:{
		helangBlur
	},
	mounted() {
        const routes = getCurrentPages();
        const curRoute = routes[routes.length - 1].route
		this.route = routes[routes.length - 1].route;
	},
	methods: {
		back(url){
			// console.log(this.route);
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
    background:rgba(39,138,35,0.6);
	border-radius:32upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 60upx;
	z-index: 999;
}
.acmd{
	position: fixed;
	bottom: 80upx;
	left: 5%;
	width: 90%;
	height: 120upx;
	border-radius: 16px;
	z-index: 888;
}
.nmbr{
	position: fixed;
	bottom: 80upx;
	left: 5%;
	width: 90%;
	height: 120upx;
	border-radius: 16px;
	background: rgba(39,138,35,0.4);
	filter:blur(4px) contrast(1);
}
/* 玻璃阴影层 */
.navigation ::before{
	background-position: center top;
	background-size: cover;
	background-attachment: fixed;
	-webkit-filter: blur(18px);
	-moz-filter: blur(18px);
	-ms-filter: blur(18px);
	-o-filter: blur(18px);
	filter: blur(18px);
	z-index: 888;
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
