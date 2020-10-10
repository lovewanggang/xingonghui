<template>
	<view style="background-color: #F1F3F6;	height: 100%;">
		<view :style = "filter == true? 'filter: blur(4px)': ''">
			<loginTopbackTwoMove :top_center="top_center" @forgect="forgect"></loginTopbackTwoMove>
			<!-- <loginShowLayer @layerclose="goback" @goback="goback" :layer_type="layer_type" ></loginShowLayer> -->
			<view class="content">
				<view class="content_list"  v-for="item in userList">
					<view class="list_left">
						<image :src="$pubFuc.advertising(item.avatar)" alt="">
						<!-- <image src="/static/images/flag.png" mode=""></image> -->
						<view class="list_text">
							<view>{{item.family_name}}{{item.first_name}}</view>
							<span>{{item.mobile}}</span>
						</view>
					</view>
					<view class="deltagWrap">
						<span @click="delShow = true;active = item" class="deltag">刪除</span>
					</view>
				</view>
			</view>
			<u-empty v-if="userList.length == 0" text="沒有數據" mode="list"></u-empty>
			<view class="footer" @click.stop="show = true;filter = true">
				<image src="/static/images/adminAdd.png" mode=""></image>
			</view>
		</view>
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="show"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar"></view>
				<view class="popup_text">請輸入新管理員手機號</view>
				<view class="center_indexs">
					<view class="group" style="margin-bottom: 10px;padding:0 15px;border-color: #c7cbd2;">
						<div class="markWrap"><image class="mark" src="/static/images/flag.png" /></div>
						<image class="icona" src="s/tatic/images/to_bt.png" />
						<view class="empty" />
						<input v-model="tel" style="color: #000!important;" class="text_1 text_2p" placeholder="請輸入手機號" type="number" />
					</view>
					<!-- 按钮 -->
					<view class="tagWrapButtom" @click.stop="submit()"><span style="color: #FFFFFF;" class="tagButton">發送邀請碼</span></view>
				</view>
			</view>
		</u-popup>
		<u-mask :show="shows" @click="shows = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">邀請碼已發送!</view>
				<view class="tagWrapButtom" style="margin: 64upx 96upx;" @click="shows = false;filter = false"><span style="color: #FFFFFF;" class="tagButton">確定</span></view>
			</view>
		</u-mask>
		<u-modal v-model="delShow" :show-cancel-button="showCancel" @confirm="del()" :content="content"></u-modal>
	</view>
</template>

<script>
	import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
	import loginShowLayer from 'components/login/login_showlayer.vue';
	export default {
		data() {
			return {
				top_center:"管理員設置",
				show: false,
				count: 0,
				maxlength: 6,
				breathe: true,
				tel: '',
				texta: '重置密碼',
				layer_type: 1,
				shows: false,
				filter: false,
				delShow: false,
				content: '是否確定刪除?',
				showCancel: true,
				user: [],
				userList: [],
				share_code: '',
				active: {}
			}
		},
		components:{
			loginTopbackTwoMove,
			loginShowLayer
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				var that = this;
				uni.getStorage({ //獲取登錄人信息
					key:"user",
					success(e){
						that.user = e.data;
						that.$minApi.companyuserlist({ //獲取列表
							api_token: that.user.api_token,
							company_id: that.user.company_id
						}).then((res) => {
							that.userList = res.data
						})
						that.$minApi.getcompany(that.user.company_id).then((res) => { //獲取機構分享碼
							that.share_code = res.data.share_code
						})
					}
				})
				
				
			},
			forgect(){
				uni.navigateBack();
			},
			closePopup() {
				this.filter = false;
			},
			submit(){ // 發送邀請碼
				var that = this;
				if(!this.$pubFuc.telverification(that.tel)){ //手機號碼驗證
					return this.$pubFuc.showToast('請輸入正確的手機號碼');
				}
				this.$minApi.addcompanyuser({
					mobile:that.tel,
					share_code: that.share_code,
					api_token: that.user.api_token,
				},that.user.id).then((res)=>{
					that.show = false;
					that.shows = true;
					that.filter = true;
				})
				
			},
			del() { //刪除
				var that = this
				this.$minApi.companyuserdel({member_id:that.active.id,api_token:that.active.api_token}).then((res) => {
					that.getList()
				})
				console.log(this.active)
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
.content{
	padding: 0 48upx;
	width: 100%;
	height: 100%;
	padding-bottom: 80px;
	margin-top: 70upx;
}
.content_list{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;
	margin-bottom: 72upx;
}
.list_left{
	display: flex;
	flex-direction: row;
}
.list_left image{
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
}
.list_left .list_text{
	margin-left: 48upx;
	
}
.list_right{
	width: 148upx;
	height: 56upx;
}
.list_text span{
	font-size:24upx;
	font-family:PingFangTC-Regular,PingFangTC;
	font-weight:400;
	color:#c7cdd5;
}
.deltagWrap {
  box-sizing: border-box;
  position: absolute;
  top: 14upx;
  right: 0;
  border-radius: 16upx;
  background-color: #E0372D;
  width: 148upx;
  height: 56upx;
  text-align: center;
  box-shadow: 1px 1px 1px 0 rgba(224,55,45,.9);
}

.deltag {
  line-height: 56upx;
  white-space: nowrap;
  color: #ffffff;
  font-size: 28upx;
  font-weight: 400;
  font-family:PingFangTC-Regular,PingFangTC;
}
.footer{
	position: fixed;
	width: 128upx;
	height: 128upx;
	border-radius: 50%;
	background-color: #FFFFFF;
	bottom: 80upx;
	left: 50%;
	margin-left: -64upx;
	box-shadow:0px 40upx 100upx 0px rgba(17,27,46,0.1);
}
.footer image{
	width: 100%;
	height: 100%;
}
.popup{
	border-radius: 20%;
	padding: 0upx 60upx 60upx 60upx;
}
.popup_bar{
	margin: 0 auto;
	margin-top: 24upx;
	width: 96upx;
	height: 12upx;
	background-color: #F1F3F6;
}
.popup_text{
	font-size:24upx;
	font-family:PingFangTC-Medium,PingFangTC;
	font-weight:500;
	color:rgba(36,53,87,1);
	line-height:34upx;
	margin-top: 48upx;
}
.text_2p {
	border-radius: 0 8px 8px 0;
}
.text_1 {
	line-height: 16px;
	width: 100%;
	white-space: nowrap;
	color: #c7cbd2;
	font-size: 13px;
	font-weight: 500;
}
.icon {
	  width: 14px;
	  height: 11px;
}
.empty {
	margin-right: 3px;
	border-width: 1px;
	border-style: solid;
	border-color: #c7cbd2;
	/* width: 1px; */
	height: 28px;
}
.warp {
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	margin-bottom: 50upx;
}
.rect {
	text-align: center;
	font-size:64upx;
	font-family:PingFangTC-Semibold,PingFangTC;
	font-weight:600;
	color:rgba(255,255,255,1);
}
</style>
