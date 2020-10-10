<!-- 弹出输入框 -->
<template>
	<view class="backrol">
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="vis.responsibilitiesShow"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar"></view>
				<view class="popup_text">{{title}}</view>
				<!-- <u-input class="responsibilitiesFrame" placeholder="請輸入..." v-model="popup_content" :type="type" :border="border" :height="height" :auto-height="autoHeight" /> -->
				<view class="popu_select">
					
					
					<!-- 学历要求 -->
					
					<view style="margin-top: 24px;">
						<view class="t_title flex">
							<!-- <view >
								<img style="width: 44px;height: 44px;" src="static/images/fil_xueli.png" alt="">
							</view> -->
							<view style="margin-left: 16px;">
								<!-- <view class="">
									學歷要求
								</view>
								<view class="qsstitle">
									{{oneList[isone].name}}
								</view> -->
							</view>
							
						</view>
						<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
							<view class="islebpo">
								<img src="static/images/tabplay.png" alt="">
							</view>
							<picker-view mask-style="" style="width: 80%; height: 160px;text-align: center;" @change="changeone">
							    <picker-view-column>
							      <view  v-for='(item,index) in oneList' :class="[isone==index?'iscole':'iscolesa']">{{item.name}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
					
					
				</view>
				<view class="center_indexs">
					<view class="tagWrapButtom" @click.stop="replyshou()"><span class="tagButtom">確定</span></view>
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
			  isone:0,
			 
			  type: 'textarea',
			  border: true,
			  height: 200,
			  autoHeight: true,
			  popup_content: '',
		  };
		},
		props: {			//是否显示输入框
			oneList:{
				type:Array,
				val:[],
			},
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
			  replyshou() {
				  console.log(this.isone)
				  this.$emit('replyshou',this.isone);
			  },
			  // 职位
			  changeone(e){
			  	this.isone = e.detail.value[0];
			  },
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
	.t_title{
		text-align: left;
		align-items: center;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #243557;
		line-height: 22px;
		letter-spacing: 1px;
	}
	.iscole{
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 16px;
		color: #243557;
		font-weight: 600;
		line-height: 35px;
	}
	.iscolesa{
		opacity: 0.5;
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 14px;
		color: #243557;
		font-weight: 600;
		line-height: 35px;
	}
	.islebpo{
		width: 11px;
		height: 14px;
		position: absolute;
		left: 52px;
	}
	.islebpo img{
		width: 100%;
		height: 100%;
	}
	.popup{
		padding: 10upx 60upx 60upx 60upx;
		background-color: rgba(170, 170, 170,0.2);
	}
	.backrol{
		background-color: rgba(255, 255, 255,1);
	}
	.popu_select{
		width: 100%;
		height: 190px;
		background: rgba(255, 255, 255,1);
		border-radius: 32px;
	}
	.popup_bar{
		background-color: #aaa;
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
