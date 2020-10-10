<template>
	<view class="box_bag">
		<view class="" style="background-color:#fff;padding-top: 44px;box-shadow: 1px 0px 0px rgba(170,170,170,.4);">
			<toptitle :title="title" @beback="beback"></toptitle>
		</view>
		<view class="box">
			<!-- 工作 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view style="position: relative;">
					<!-- 主修实习內容 -->
					<view style="margin-top: 0px;">
						<view class="box_title">
							自我評價
						</view>
						<view class="box_center box_height" style="position: relative;">
							<view class="box_pal" style="position: absolute;right: 8px;bottom: 8px;">
								{{workerlength}}/{{biglength}}
							</view>
							<textarea @input="workerinput" placeholder-class="box_pal" v-model="workertext" placeholder="輸入自我評價內容" :maxlength="biglength"></textarea>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 工作 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view style="position: relative;">
					<!-- 主修实习內容 -->
					<view style="margin-top: 0px;">
						<view class="box_title">
							求職信
						</view>
						<view class="box_center box_height2" style="position: relative;">
							<view class="box_pal" style="position: absolute;right: 8px;bottom: 8px;">
								{{workerlength2}}/{{biglength2}}
							</view>
							<textarea @input="workerinput2" placeholder-class="box_pal" v-model="workertext2" placeholder="輸入求職信內容" :maxlength="biglength2"></textarea>
						</view>
					</view>
				</view>
			</view>
			
			<view class="box_btn">
				<bottombtn @goback="goback"></bottombtn>
			</view>
		</view>
	</view>
</template>
<script>
	import toptitle from 'components/details/index_top.vue'
	import bottombtn from 'components/details/index_bottom.vue'
	export default{
		data(){
			return {
				title:"個人經歷", 
				biglength:80,
				workertext:"",
				workerlength:0,
				workerlength2:0,
				workertext2:"",
				biglength2:800,
			}
		},
		onLoad(option) {
			if(option.query && JSON.parse(option.query).data){
				this.workertext = JSON.parse(option.query).data.evaluate_myself;
				this.workertext2 = JSON.parse(option.query).data.job_search;
				this.workerlength = this.workertext.length;
				this.workerlength2 = this.workertext2.length;
			}
		},
		components: {
			toptitle,
			bottombtn
		},
		methods:{
			beback(){
				uni.navigateBack();
			},
			goback(){
				let rendering = {};
				rendering.type =  4;//代表专业技能
				rendering.evaluate_myself = this.workertext;
				rendering.job_search = this.workertext2
				uni.setStorage({
					key:'details',
					data:JSON.stringify(rendering)
				})
				// localStorage.setItem('details', JSON.stringify(rendering));
				uni.navigateBack();
				
			},
			//工作
			workerinput(){
				this.workerlength = this.workertext.length;
				//长度上限无法输入
				if(this.workerlength>this.biglength){
					this.workertext = this.workertext.substring(0,this.biglength);
					this.workerlength = this.workertext.length;
				}
			},
			workerinput2(){
				this.workerlength2 = this.workertext2.length;
				//长度上限无法输入
				if(this.workerlength2>this.biglength2){
					this.workertext2 = this.workertext2.substring(0,this.biglength2);
					this.workerlength2 = this.workertext2.length;
				}
			}
		}
	}
</script>
<style scoped>
	uni-page-body {
		background-color: #EEEEEE;
		/* height: 100%; */
	}
	body,
	html {
		background-color: #EEEEEE;
		/* height: 100%; */
	}
	.box_btn{
		margin: 24px 38px;
	}
	.box_bag{
		background-color: #EEEEEE;
		height: 100%;
	}
	.box{
		background-color: #EEEEEE;
		padding: 8px 10px;
	}
	.mid_hen{
		margin: 0 19px 0 0 ;
	}
	.henxian{
		height: 1px;
		background: rgba(27, 36, 38, 0.2);
		margin: 24px 0;
	}
	.box_one{
		padding: 25px;
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
		
		border-radius: 12px;
		border: 1px solid #CCCFCF;
	}
	.box_height{
		height: 106px;
	}
	.box_height2{
		height: 320px;
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
</style>
