<template>
	<view class="background">
		<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<view class="content">
			<u-collapse :body-style="{height: '220upx',color: '#c7cdd5'}" :active-style="{'margin-top': '20px'}">
				<u-collapse-item @change="order" style="border-bottom: 2upx solid #909399;padding: 0 10upx;" :title="item.head" v-for="(item, index) in itemList" :key="index" :open="item.open" :disabled="item.disabled">
					<template slot="title">
						<div><p class="content_title">{{item.head}}</p><p class="content_date">{{item.date}}</p></div>
						<p class="money">{{item.money}}</p>
					</template>
					<view>
						<view class="list">下單時間：2020-04-12   14:08:24</view>
						<view class="list">支付確認時間：2020-04-12   14:16:52</view>
						<view class="list">服務開通時間：2020-04-13   09:30:12</view>
						<view class="list">服務到期時間：2020-07-13   09:30:12</view>
						<view class="list">訂單號：JZMG9284756283957</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center: '訂單記錄',
				itemList: [{
					head: "購買至尊超級VIP6個月",
					money: 'HK$60000.00',
					date: '2020-10-12 14:08:24',
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
				},{
					head: "購買至尊超級VIP6個月",
					money: 'HK$300.00',
					date: '2020-10-12 14:08:24',
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
				},{
					head: "購買至尊超級VIP6個月",
					money: 'HK$100.00',
					date: '2020-03-12 14:08:24',
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
				}]
			}
		},
		components:{
			loginTopbackTwoMove
		},
		onLoad() {
			
		},
		methods: {
			forgect() {
				uni.navigateBack();
			},
			order(index, show){
				console.log(index, show)
			}
		}
		
	}
</script>

<style scoped>
uni-page-body {
	height: 100%;
	background-color: #F1F3F6;
}
body,
html {
	height: 100%;
	background-color: #F1F3F6;
}
.background{
	background-color: #F1F3F6;
	padding-bottom: 40upx;
	height: 100%;
}
.content{
	padding: 0 40upx;
	margin-top: 40upx;
}
.content_title, .money{
	font-size:28upx;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:600;
	color:#243557;
}
.money{
	text-align: right;
	position: absolute;
	right: 60upx;
}
.list{
	margin-bottom: 10upx;
	font-size:24upx;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color: #c7cdd5;
}
.content_date{
	margin-top: 10upx;
	font-size: 22upx;
	color: #c7cdd5;
}
</style>
