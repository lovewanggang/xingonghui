<template>
	<view class="box_bag">
		<view class="" style="background-color:#fff;padding-top: 44px;box-shadow: 1px 0px 0px rgba(170,170,170,.4);">
			<toptitle :title="title" @beback="beback"></toptitle>
		</view>
		<view class="box">
			<!-- 实习 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view v-for="(item,index) in practice" style="position: relative;">
					<view style="position: absolute;top: -10px;right: -10px;padding: 5px;" @click="practicedelete(index)" v-if="practice.length>1">
						<u-icon name="close-circle" color="rgba(27, 36, 38, 0.2)" size="24px"></u-icon>
					</view>
					<!-- 證書名稱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							證書名稱
						</view>
						<view class="box_input">
							<input v-model="item.certificate_name" type="text" placeholder="輸入證書名稱" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 授發部門 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							授發部門
						</view>
						<view class="box_input" style="margin-right: 15px;" >
							<input v-model="item.authorization" type="text" placeholder="輸入證書授發部門" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 授發時間 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							授發時間
						</view>
						<view class="box_input" style="margin-right: 15px;" @click="istimer(index);">
							<input v-model="item.time" disabled="true" type="text" placeholder="年/月/日" placeholder-class="box_pal" value="" />
						</view>
					</view>
					
					<!-- 横线 -->
					<view class="henxian" v-if="index != practice.length-1">
						
					</view>
				</view>
				<!-- 添加更多 -->
				<view class="addmore" @click="addpractice" v-if="practice.length<3">
					<u-icon name="plus" color="rgba(27, 36, 38, 0.2)" size="20px"></u-icon>
					<view class="">
						添加更多
					</view>
				</view>
			</view>

			<!-- 工作 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view v-for="(item,index) in worker" style="position: relative;">
					<view style="position: absolute;top: -10px;right: -10px;padding: 5px;" @click="workerdelete(index)" v-if="worker.length>1">
						<u-icon name="close-circle" color="rgba(27, 36, 38, 0.2)" size="24px"></u-icon>
					</view>
					<!-- 实习名稱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							獲獎名稱
						</view>
						<view class="box_input">
							<input v-model="item.certificate_name" type="text" placeholder="輸入獲得獎勵名稱" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 实习專業 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							授發部門
						</view>
						<view class="box_input" style="margin-right: 15px;" >
							<input v-model="item.authorization" type="text" placeholder="輸入獎勵授發部門" placeholder-class="box_pal" value="" />
						</view>
					</view>
					
					<!-- 授發時間 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							授發時間
						</view>
						<view class="box_input" style="margin-right: 15px;" @click="istimers(index);">
							<input v-model="item.time" disabled="true" type="text" placeholder="年/月/日" placeholder-class="box_pal" value="" />
						</view>
					</view>
					
					<!-- 横线 -->
					<view class="henxian" v-if="index != worker.length-1">
						
					</view>
				</view>
				<!-- 添加更多 -->
				<view class="addmore" @click="addworker" v-if="worker.length<9">
					<u-icon name="plus" color="rgba(27, 36, 38, 0.2)" size="20px"></u-icon>
					<view class="">
						添加更多
					</view>
				</view>
			</view>

			<view class="box_btn">
				<bottombtn @goback="goback"></bottombtn>
			</view>
		</view>
		
		<u-mask :show="outMaskShow" @click="outMaskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇時間
					</view>
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 70px; height: 95px;text-align: center;" @change="yearChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in year' v-if="item < 100 " :class="[year - isyear==index?'iscole':'iscolesa']">{{year - index}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								年
							</view>
							
						</view>
						<view class="hengshu">
							
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="monthChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in month' :class="[ismonth==index?'iscole':'iscolesa']">{{index+1}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								月
							</view>
						</view>
						<view class="hengshu">
							
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="dayChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in day' :class="[isday - 1==index?'iscole':'iscolesa']">{{index+1}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								日
							</view>
						</view>
					</view>
					
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="signOut()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="outMaskShow = false;">取消</view>
			</view>
		</u-mask>
		
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
				num:null,
				index:null,
				//压屏框
				outMaskShow: false,
				filter: false,
				//年份的选项
				title:"證書與榮譽", 
				biglength:80,
				//证书数组
				practice:[{certificate_name:"",authorization:"",time:""}],
				practicelength:0,
				practicetext:"",
				//获奖数组
				worker:[{certificate_name:"",authorization:"",time:""}],
				workerlength:0,
				workertext:"",
				//日期
				year:"",
				month:12,
				day:0,
				isyear:0,//这是年
				ismonth:0,//这是月
				isday:1,//这是日
				certificate:null,//第几个证书第几个
				glory:null,
			}
		},
		onLoad(option) {
			//获取当前的年月日
			this.year = new Date().getFullYear();
			this.isyear = new Date().getFullYear();
			this.day = this.GetMonthDayCount();
			
			// console.log(option);
			if(option.query && JSON.parse(option.query).data){
				console.log("这是有值的时候");
				console.log(JSON.parse(option.query).data);
				this.practice = JSON.parse(option.query).data.certificate;
				this.worker = JSON.parse(option.query).data.award;
			}
		},
		components: {
			toptitle,
			bottombtn
		},
		methods:{
			istimer(index){
				this.outMaskShow = true;
				this.show = true;
				//选择了第几个证书
				this.certificate = index;
			},
			
			istimers(index){
				this.outMaskShow = true;
				this.show = true;
				//选择了第几个荣耀
				this.glory = index;
			},
			delete_yes(){
				console.log(this.num);
				if(this.num == 0){
					//删除
					delete this.worker[this.index];
					//重新渲染
					this.worker = this.worker.filter((res)=>{
						if(res){
							return res;
						}
					})
				}else if(this.num == 1){
					//删除
					delete this.practice[this.index];
					//重新渲染
					this.practice = this.practice.filter((res)=>{
						if(res){
							return res;
						}
					})
				}
				this.num = null;
				this.index = null;
				this.delete_bra = false;
			},
			// 删除获奖
			workerdelete(index){
				this.num = 0;
				this.index = index;
				this.delete_bra = true;
			},
			goback(){
				//判断内容是否填写完毕
				if(this.practice.filter((res)=>{return res.certificate_name == ""||res.authorization == ""||res.time == "";}).length > 0){
					this.$pubFuc.showToast("請完善證書信息");
					return;
				}
				if(this.worker.filter((res)=>{return res.certificate_name == ""||res.authorization == ""||res.time == "";}).length > 0) {
					this.$pubFuc.showToast("請完善獲獎信息");
					return;
				}
				
				let rendering = {};
				rendering.type =  3;//代表证书获奖
				rendering.certificate= this.practice;
				rendering.award = this.worker;
				uni.setStorage({
					key:'details',
					data:JSON.stringify(rendering)
				})
				// localStorage.setItem('details', JSON.stringify(rendering));
				uni.navigateBack();
			},
			//删除证书
			practicedelete(index){
				this.num = 1;
				this.index = index;
				this.delete_bra = true;
				
			},
			beback(){
				console.log("执行了");
				uni.navigateBack();
			},
			replyeducation(){
			},
			//获奖
			workerinput(){
				this.workerlength = this.workertext.length;
				//长度上限无法输入
				if(this.workerlength>this.biglength){
					this.workertext = this.workertext.substring(0,this.biglength);
					this.workerlength = this.workertext.length;
				}
			},
			//证书
			practiceinput(){
				this.practicelength = this.practicetext.length;
				//长度上限无法输入
				if(this.practicelength>this.biglength){
					this.practicetext = this.practicetext.substring(0,this.biglength);
					this.practicelength = this.practicetext.length;
				}
			},
			timebool(){
				console.log("时间组件");
			},
			signOut(){
				this.outMaskShow = false;
				// 判断是证书还是获奖
				if(this.certificate == null){
					//获奖
					this.worker[this.glory].time = 
					this.isyear+"/"+(this.ismonth+1)+'/'+this.isday
					//还原类别
					this.glory = null;
				}else if(this.glory == null){
					//证书
					this.practice[this.certificate].time = 
					this.isyear+"/"+(this.ismonth+1)+'/'+this.isday
					//还原类别
					this.certificate = null
				}
			},
			yearChange(e){
				// 获取年
				this.isyear = this.year - e.detail.value[0];
				this.day = this.GetMonthDayCount();
			},
			monthChange(e){
				// 获取月份
				this.ismonth = e.detail.value[0];
				this.day = this.GetMonthDayCount();
			},
			dayChange(e){
				//获取日期
				this.isday = e.detail.value[0]+1;
			},
			//判断当前是有多少日的
			GetMonthDayCount(){
				switch(this.ismonth+1)
					{
						case 1:
						case 3:
						case 5:
						case 7:
						case 8:
						case 10:
						case 12:
							{
								return 31;
							}
						case 4:
						case 6:
						case 9:
						case 11:
							{
								return 30;
							}
						case 2:
							{
								if(this.isyear%4)
								{
									return 28;
								}
								else
								{
									if(this.isyear%100)
									{
										return 29;
									}
									else
									{
										if(this.isyear%400)
										{
											return 28;
										}
										else
										{
											return 29;
										}
									}
								}
							}
						default:
							{
								return 0;
							}
					}
			},
			//添加证书
			addpractice(){
				// console.log("点击了添加更多实习");
				this.practice.push({certificate_name:"",authorization:"",time:""});
			},
			//添加获奖
			addworker(){
				// console.log("点击了添加更多学习机构");
				this.worker.push({certificate_name:"",authorization:"",time:""});
			},
		}
	}
</script>
<style scoped>
	.islebpo{
		width: 11px;
		height: 14px;
		position: absolute;
		left: 32px;
	}
	.islebpo image{
		width: 100%;
		height: 100%;
	}
	.isfont{
		
		
		
		font-size: 15px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #0E320D;
		line-height: 22px;
		
	
	}
	.iscole{
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 16px;
		color: #0E320D;
		font-weight: 600;
		line-height: 35px;
	}
	.hengshu{
		width: 1px;
		height: 32px;
		background: #0E320D;
		opacity: 0.2;
		margin: 0 20px 0 20px;
	}
	.iscolesa{
		opacity: 0.5;
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 14px;
		color: #0E320D;
		font-weight: 600;
		line-height: 35px;
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
	.border{
		padding: 24px 35px!important;
		margin: 0 10px;
		min-height: 120px;
		background: rgba(255, 255, 255, 1)!important;
		border-radius: 20px;
	}
	.tagWrap:active {
		-moz-box-shadow: 0px 0px 0px 0px #05653b;
		-webkit-box-shadow: 0px 0px 0px 0px #05653b;
		box-shadow: 0px 0px 0px 0px #05653b;
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
	
	
	
	
	uni-page-body {
			background-color: #EEEEEE;
		}
		body,
		html {
			background-color: #EEEEEE;
		}
		.box_bag{
			background-color: #EEEEEE;
			height: 100%;
		}
	.box_btn{
		margin: 24px 38px;
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
		height: 106px;
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
</style>
