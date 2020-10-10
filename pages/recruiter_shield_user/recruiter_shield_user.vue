<template>
	<view class="background">
		<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
		<view class="content">
			<view class="group" style="margin-bottom: 0px;padding-left: 15px;border-color: #c7cdd5;">
				<input v-model="mobile" type="number" style="color:rgba(36,53,87,1)!important;" class="text_1 text_2p" maxlength="11"  placeholder="搜索手機號..." />
				<view class="block">
					<view class="wrap"><u-icon @click="search()" style="font-size: 30upx;" name="search"></u-icon></view>
				</view>
			</view>
			<view class="record">屏蔽記錄</view>
			<view class="content_main">
				<view class="list" v-for="(item, index) in userList" :key='index'>
					<view class="list_left">
						<image v-if="item.member && item.member.avatar == null" class="list_img" src="/static/images/accountSet.png" ></image>
						<image v-else-if="item.member" class="list_img" :src="$pubFuc.advertising(item.member.avatar)" ></image>
						<image v-else-if="!item.member && item.avatar == null" class="list_img" src="/static/images/accountSet.png" ></image>
						<image v-else class="list_img" :src="$pubFuc.advertising(item.avatar)" ></image>
						<view class="list_text" v-if="item.member">
							{{item.member.mobile}}
						</view>
						<view class="list_text" v-else>
							{{item.mobile}}
						</view>
					</view>
					<view class="list_right" @click="delShow = true;shield = item" v-if="item.isSet == true">
						<view class="tagWrap">
							<span class="tag">撤銷</span>
						</view>
					</view>
					<view @click="addShield(item)" class="list_right" v-if="item.isSet == false">
						<view class="addtagWrap">
							<span class="tag">屏蔽</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="delShow" :show-cancel-button="showCancel" @confirm="change()" :content="content"></u-modal>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	export default {
		data() {
			return {
				top_center:"屏蔽用戶",
				passwordvalue: '',
				company_id: '',
				userList: [],
				mobile: '',
				type: '',
				delShow: false,
				content: '是否確定撤銷?',
				showCancel: true,
				shield: {},
				user: []
			}
		},
		onLoad(option) {
			this.type = JSON.parse(option.query).type
			console.log(this.type);
			this.getList();
		},
		components:{
			loginTopbackTwoMove
		},
		methods: {
			getList() {//初始化列表
				var that = this;
				uni.getStorage({
					key:"user",
					success: function (res) {
						that.user = res.data
						that.company_id = res.data.company_id;
						
						that.$minApi.Blacklist({
							s:{type: 1,company_id: that.company_id},
							join: 'member'
						}).then((res)=>{
							that.userList = res.data
							that.userList.map(i => {
							    i.isSet = true;
							});
						})
					}
				})
				
			},
			forgect() { //返回
				uni.navigateBack();
			},
			search() { //搜索用戶
			console.log(this.mobile)
				var that = this;
				if(!this.$pubFuc.telverification(this.mobile)){
					return this.$pubFuc.showToast('請輸入正確的手機號碼');
				}
				/* if(this.mobile == this.user.data.mobile){
					return this.$pubFuc.showToast('不能添加自己為屏蔽用戶');
				} */
				that.$minApi.searchBlack({
					mobile: that.mobile
				}).then((res)=>{
					that.userList = res.data
					that.userList.map(i => {
					    i.isSet = false;
					});
				})
			},
			addShield(row){ //添加用戶
				var that = this;
				that.$minApi.Blacklist({
					s:{member_id: row.id,
							company_id: that.user.company_id,
					type: 1},
					join: 'company'
				}).then((res)=>{
					if(res.data.length>0){
						return this.$pubFuc.showToast('該用戶已被屏蔽');
					}else{
						that.$minApi.addBlack({
							member_id: row.id,
							company_id: that.user.company_id,
							type: 1
						}).then((res)=>{
							this.getList()
						})
					}
				})
				// that.$minApi.addBlack({
				// 	member_id: row.id,
				// 	company_id: that.user.company_id,
				// 	type: 1
				// }).then((res)=>{
				// 	this.getList()
				// })
			},
			change(){
				var that = this;
				var row = that.shield;
				if(row.isSet == true){
					that.$minApi.delBlack(row.id).then((res)=>{
						that.getList()
					})
				}
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
	height: 100%;
}
.content{
	padding: 0 48upx;
	width: 100%;
	margin-top: 48upx;
}
.text_1 {
	width: 100%;
	padding-left: 5px;
	line-height: 16px;
}
.wrap {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	background-color: rgba(216, 216, 216, 0);
	width: 56upx;
	height: 56upx;
}
.record{
	margin-top: 48upx;
	font-size:32upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(224,55,45,1);
}
.content_main{
	width: 100%;
}
.list{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 48upx;
}
.list_left{
	display: flex;
	flex-direction: row;
}
.list_img{
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
}
.list_text{
	font-size:28upx;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:rgba(36,53,87,1);
	line-height: 40upx;
	margin-top: 20upx;
	margin-left: 48upx;
}
.tagWrap, .addtagWrap {
  box-sizing: border-box;
  border-radius: 16upx;
  background-color: #CCCCCC;
  width: 148upx;
  height: 56upx;
  line-height: 56upx;
  text-align: center;
  box-shadow: 1px 1px 1px 0 #CCCCCC;
  margin-top: 10upx;
}
.addtagWrap{
	background-color: #E0372D;
}
.tag {
  white-space: nowrap;
  font-size: 28upx;
  font-weight: 400;
  color: #FFFFFF;
  font-family:PingFangTC-Regular,PingFangTC;
}
</style>
