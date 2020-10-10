<!-- 弹出输入框 -->
<template>
	<view class="">
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="vis.responsibilitiesShow"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar"></view>
				<view class="popup_text">{{title}}</view>
				<u-input class="responsibilitiesFrame" placeholder="請輸入..." v-model="popup_content" :type="type" :border="border" :height="height" :auto-height="autoHeight" />
				<view class="center_indexs">
					<view class="tagWrapButtom" @click.stop="responsibilitiesSubmit()"><span class="tagButtom">確定</span></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data() {
		  return {
			  vis:{
				  responsibilitiesShow: false
			  },
			  type: 'textarea',
			  border: true,
			  height: 200,
			  autoHeight: true,
			  popup_content: '',
		  };
		},
		props: {
			//是否显示输入框
			filter: {
				type: Boolean,
				val: false
			},
			//输入框标题
			title: {
				type: String,
				val: null
			},
			conter: {
				type: String,
				val: null
			},
		},
		methods: {
			//关闭
			  closePopup(){
				  this.$emit('closePopup');
			  },
			  //提交
			  responsibilitiesSubmit() {
				  this.$emit('responsibilitiesSubmit',this.popup_content,this.title);
			  }
		},
		watch:{
			filter(val,old){
				if(val){
					this.popup_content = this.conter;
				}
				this.vis.responsibilitiesShow = val;
				// this.popup_content = "";
			},
		}
	}
</script>

<style scoped>
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
		font-size:36upx;
		font-family:PingFangTC-Medium,PingFangTC;
		font-weight:500;
		color:rgba(36,53,87,1);
		line-height:34upx;
		margin-top: 48upx;
		text-align: center;
	}
	.responsibilitiesFrame{
		border:2upx solid rgba(36,53,87,1);
		width: 100%;
		margin-top: 48upx;
	}
</style>
