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
					<image v-else-if="item.company.logo != null"  :src="$pubFuc.advertising(item.company.logo)" mode=""></image>
					<image v-else src="/static/images/accountSet.png" mode=""></image>
					<view style="margin-left: 20upx;width: 500upx;">
						<view class="list_title">
							<view class="oraqq">{{item.company.name}}</view>
							<view style="font-size: 22upx;">{{$pubFuc.timeconversion(item.created_at)}}</view>
							
						</view>
						<view class="list_content" style="margin-top: 10upx;">{{item.content}}</view>
					</view>
				</view>
				<view class="acmd">
					<helangBlur :params="params" style="border-radius: 16px;"></helangBlur>
				</view>
			</view>
			<view class="ctrona">
				保留最近1個月的記錄
			</view>
		</view>
		<view class="tra" v-else>
			{{isnomsg}}
		</view>
		
		<navigation></navigation>
	</view>
</template>

<script>
	import navigation from 'components/public/job_tobar.vue' 
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	export default {
		data() {
			return {
				isnomsg:"",
				user:"",
				backimg: '../../static/images/newsBgc.png',
				type: 1,
				uid:0,
				tapList: [
					{name: '簡歷邀請', type: 1},
					{name: '面试邀請', type: 2},
					{name: '系統消息', type: 3},
				],
				messageList: [],
				//
				params:{
				    width:'100%',
				    height:'100%',
				    image:"/static/images/bag2.png",
				    blur:"m"
				},
			}
		},
		components: {
			navigation,
			helangBlur
		},
		onLoad() {
			var that = this;
			try{
				const value = uni.getStorageSync('user');
				if(value.id){
					that.user = value;
					that.uid = value.id;
				}else{
					that.$openPage('login');
				}
			}catch(e){
				that.$openPage('login');
			}
			
			this.getList(that.type);
		},
		methods: {
			getList(type) {
				console.log(type);
				var that = this;
				this.$minApi.membermessage({
					member_id:that.uid,
					type: type
				}).then((res)=>{
					console.log(res.data);
					that.messageList = res.data
				})
			},
			selected(type){
				this.type = type;
				this.getList(type)
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
	width: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	height:100%;
}
.acmd{
	position:absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.ctrona{
	font-size: 12px;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	color: #FFFFFF;
	margin-top: 20px;
	line-height: 17px;
	opacity: 0.8;
	text-shadow: 1px 1px 2px #000;
}
.tra{
	margin-top: 20px;
	color: #fff;
	font-size: 16px;
	letter-spacing:2px;
}
.center{
	background: url('/static/images/bag2.png');
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
	background:rgba(39,138,35,0.4);
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
	background: #278A23;
	width: 232upx;
	height: 84upx;
	border-radius: 24upx;
	line-height: 84upx;
}
.content{
	padding-top: 46upx;
}
.content_list{
	position: relative;
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
	z-index: 9;
}
.list_left image{
	background-color: rgba(255,255,255,.8);
	width: 76upx;
	height: 76upx;
	border-radius: 50%;
	z-index: 10;
}
.list_title{
	font-size: 28upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,.9);
}
.list_title{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.list_content, .list_right{
	text-align: left;
	font-size: 24upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,.8);
}
</style>
