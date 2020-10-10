<template>
	<view class="center">
		<view class="bg bg-blur"></view>
		<view class="center_head">
			<view v-for="item in tapList" @click="selected(item.type)" :class="{head_list_select: type == item.type}" class="head_list">{{item.name}}</view>
		</view>
		<view class="content" v-if="messageList.length>0">
			<view class="content_list" v-for="item in messageList" >
				<view class="list_left">
					<image v-if="type == 3" src="/static/images/mort.png" mode=""></image>
					<image v-else-if="item.member.avatar != null"  :src="item.member.avatar" mode=""></image>
					<image v-else src="/static/images/accountSet.png" mode=""></image>
					<view style="margin-left: 20upx;width: 500upx;">
						<view class="list_title">
							<view>{{item.title}}</view>
							<view style="font-size: 22upx;">{{$pubFuc.timeconversion(item.created_at)}}</view>
						</view>
						
						<view class="list_content" style="margin-top: 10upx;">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tra" v-else>
			{{isnomsg}}
		</view>
		<navigation></navigation>
	</view>
</template>

<script>
	import navigation from 'components/public/navigation.vue'
	export default {
		data() {
			return {
				isnomsg:"",
				user:"",
				backimg: '../../static/images/newsBgc.png',
				type: 1,
				tapList: [
					{name: '簡歷邀請', type: 1},
					{name: '面試邀請', type: 2},
					{name: '系統消息', type: 3},
				],
				messageList: []
			}
		},
		components: {
			navigation
		},
		onLoad() {
			var that = this;
			try{
				const value = uni.getStorageSync('user');
				if(value.id){
					that.user = value;
					this.getList();
				}else{
					that.$openPage('login');
				}
			}catch(e){
				that.$openPage('login');
			}
			
		},
		methods: {
			getList() {
				console.log(this.user.company_id);
				var that = this;
				this.$minApi.messageList({
					s:{"type": that.type,"company_id":that.user.company_id},
					join: 'member'
				}).then((res)=>{
					that.messageList = res.data
					console.log(res.data);
					if(res.data.length == 0){
						that.isnomsg = "无"+that.tapList.filter((resa)=>{
							return resa.type == that.type
						})[0].name
					}
					// console.log(that.messageList)
				})
			},
			selected(type){
				this.type = type
				var that = this;
				console.log(that.user.company_id);
				this.$minApi.messageList({
					s:{"type": that.type,"company_id":that.user.company_id},
					join: 'member'
				}).then((res)=>{
					that.messageList = res.data;
					console.log(res.data);
					if(res.data.length == 0){
						that.isnomsg = "无"+that.tapList.filter((resa)=>{
							return resa.type == that.type
						})[0].name
					}
				})
			}
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
}
page{
	background: url('../../static/images/newsBgc.png');
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	height:100%;
	
}
.tra{
	margin-top: 20px;
	color: #fff;
	font-size: 16px;
	letter-spacing:2px;
	
}
.center{
	background: url('../../static/images/newsBgc.png');
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	text-align: center;
	padding: 100upx 40upx 50upx 40upx;
	height: 100%;
}
.center_head{
	height: 72upx;
	width: 100%;
	border-radius: 24upx;
	background: rgba(23, 62, 118, 0.4);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.head_list{
	font-size:28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
	text-align: center;
	width: 232upx;
}
.head_list_select{
	background: rgba(43, 89, 155, 1);
	width: 232upx;
	height: 84upx;
	border-radius: 24upx;
	line-height: 84upx;
}
.content{
	margin-top: 26upx;
	padding-top: 20upx;
	height: calc(100% - 130px);
	overflow: auto;
}
.content_list{
	width:100%;
	background:rgba(64,98,147,0.2);
	border-radius:32upx 32upx 32upx 8upx;
	margin-bottom: 30upx;
	padding: 30upx 40upx;
	display: flex;
	justify-content: space-between;
}
.list_left{
	display: flex;
	flex-direction: row;
}
.list_left image{
	width: 76upx;
	height: 76upx;
	border-radius: 50%;
}
.list_title, .list_content, .list_right{
	font-size: 28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
}
.list_title{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.list_content, .list_right{
	font-size: 24upx;
}

</style>
