<template>
	<view class="box_bag">
		<view class="" style="background-color:#fff;padding-top: 44px;box-shadow: 1px 0px 0px rgba(170,170,170,.4);">
			<toptitle :title="title" @beback="beback"></toptitle>
		</view>
		<view class="box">
			<!-- 学习 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view v-for="(item,index) in study" style="position: relative;">
					<view style="position: absolute;top: -10px;right: -10px;padding: 5px;" @click="isdelete(index)" v-if="study.length>1">
						<u-icon name="close-circle" color="rgba(27, 36, 38, 0.2)" size="24px"></u-icon>
					</view>
					<!-- 技能名稱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							技能名稱
						</view>
						<view class="box_input">
							<input type="text" v-model="item.nameval" placeholder="輸入技能名稱" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 學校專業 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							熟練程度
						</view>
						<view class="flex">
							<view class="wrap" style="width: 100%;margin: 8px 0;">
								<u-slider v-model="study[index].value" block-width="60" active-color="#5DCA41"></u-slider>
								<view class="midcenter">
									{{item.value}}%
								</view>
							</view>
						</view>
					</view>
					<!-- 横线 -->
					<view class="henxian" v-if="index != study.length-1">
						
					</view>
				</view>
				<!-- 添加更多 -->
				<view class="addmore" @click="addstudy" v-if="study.length<7">
					
					<u-icon name="plus" color="rgba(27, 36, 38, 0.2)" size="20px"></u-icon>
					
					<view class="">
						添加更多
					</view>
				</view>
			</view>
			
			<view class="box_one">
				<!-- 主修內容 -->
				<view style="margin-top: 5px;">
					<view class="box_title">
						技能介紹
					</view>
					<view class="box_center" style="position: relative;">
						<view class="box_pal" style="position: absolute;right: 8px;bottom: 8px;">
							{{studylength}}/{{biglength}}
						</view>
						<textarea @input="studyinput" placeholder-class="box_pal" v-model="studytext" placeholder="輸入主修內容…" :maxlength="biglength"></textarea>
					</view>
				</view>
			</view>

			<view class="box_btn">
				<bottombtn @goback="goback"></bottombtn>
			</view>
		</view>
		
		<u-mask :show="delete_bra" @click="delete_bra = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">是否删除?</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="delete_yes()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="delete_bra = false">取消</view>
			</view>
		</u-mask>
		
	</view>
</template>
<script>
	import toptitle from 'components/details/index_top.vue'
	import bottombtn from 'components/details/index_bottom.vue'
	export default{
		data(){
			return {
				delete_bra:false,
				index:null,
				
				title:"專業技能", 
				biglength:80,
				//学习数组
				study:[{nameval:"",value:0}],
				studylength:0,
				studytext:"",
			}
		},
		onLoad(option) {
			if(option.query && JSON.parse(option.query).data){
				console.log(JSON.parse(option.query).data);
				this.study = JSON.parse(option.query).data.professional_skill;
				this.studytext = JSON.parse(option.query).data.professional_introduction;
				this.studylength = JSON.parse(option.query).data.professional_introduction.length;
			}
		},
		components: {
			toptitle,
			bottombtn
		},
		methods:{
			//返回上一页
			beback(){
				uni.navigateBack();
			},
			goback(){
				console.log();
				if(this.study.filter((res)=>{return res.nameval == "";}).length > 0) {
					this.$pubFuc.showToast("請完善信息");
					return;
				}
				let rendering = {};
				rendering.type =  2;//代表专业技能
				rendering.text= this.studytext;
				rendering.center = this.study
				uni.setStorage({
					key:'details',
					data:JSON.stringify(rendering)
				})
				// localStorage.setItem('details', JSON.stringify(rendering));
				
				uni.navigateBack();
			},
			//技能介绍
			studyinput(){
				this.studylength = this.studytext.length;
				//长度上限无法输入
				if(this.studylength>this.biglength){
					this.studytext = this.studytext.substring(0,this.biglength);
					this.studylength = this.studytext.length;
				}
			},
			//添加技能
			addstudy(){
				this.study.push({nameval:"",value:0});
			},
			//删除技能
			isdelete(index){
				this.delete_bra = true;
				this.index = index;
				// console.log("删除第"+index+"个模块");
				
			},
			delete_yes(){
				//删除
				delete this.study[this.index];
				//重新渲染
				this.study = this.study.filter((res)=>{
					if(res){
						return res;
					}
				})
				this.index = null;
				this.delete_bra = false;
			},
		}
	}
</script>
<style scoped>
	uni-page-body {
		background-color: #EEEEEE;
	}
	body,
	html {
		background-color: #EEEEEE;
	}
	.box_btn{
		margin: 24px 38px;
	}
	.box_bag{
		background-color: #EEEEEE;
		height:100%;
	}
	.midcenter{
		text-align: center;
		margin-top: 17px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #21352D;
		line-height: 17px;
	}
	
	.wrap {
			padding: 30rpx;
		}
	
	.box{
		background-color: #EEEEEE;
		padding: 8px 10px;
	}
	.henxian{
		height: 1px;
		background: rgba(27, 36, 38, 0.2);
		margin: 24px 0;
	}
	.box_one{
		padding: 25px;
		/* height: 200px; */
		margin: 16px 0;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 1px 1px 0px rgba(170,170,170,.6);
	}
	.box_title{
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #21352D;
		line-height: 17px;
		margin:0 10px;
	}
	.box_center{
		margin-top: 4px;
		padding:8px 10px;
		height: 106px;
		/* width: calc(100% - 20px); */
		border-radius: 12px;
		border: 1px solid #CCCFCF;
	}
	.box_input{
		border-bottom: 1px solid rgba(27, 36, 38, 0.2);
	}
	.box_input input{
		padding: 4px 10px 10px 10px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #0E241B;
		line-height: 17px;
	}
	.box_center textarea{
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #0E241B;
		line-height: 17px;
	}
	.box_pal{
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(14,36,27,.3);
		line-height: 17px;
	}
	.addmore{
		margin-top: 16px;
		padding: 15px;
		border-radius: 10px;
		border: 1px dashed #CCCFCF;
		text-align: center;
	}
	
	.rect {
		text-align: center;
		font-size:64upx;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
	}
	.warp {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		margin-bottom: 50upx;
	}
	.tagWrap {
		display: flex;
		position: relative;
		align-items: center;
		align-self: center;
		flex-direction: row;
		justify-content: center;
		margin-top: 24px!important;
		border-radius: 16px;
		background-image: linear-gradient(0deg, #1ceeaf 0%, #079742 100%);
		width: calc(100% - 96px);
		height: 45px;
		-moz-box-shadow: 0px 3px 0px 0px #05653b;
		-webkit-box-shadow: 0px 3px 0px 0px #05653b;
		box-shadow: 0px 3px 0px 0px #05653b;
	}
	.tagWrap:active {
		-moz-box-shadow: 0px 0px 0px 0px #05653b;
		-webkit-box-shadow: 0px 0px 0px 0px #05653b;
		box-shadow: 0px 0px 0px 0px #05653b;
	}
</style>
