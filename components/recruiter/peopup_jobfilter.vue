<template>
	<view class="box_popup">
		<u-popup
			border-radius="50"
			:mask-custom-style = "{background: 'rgb(180, 185, 191, .5)'}"
			v-model="vis.responsibilitiesShow"
			@close="closePopup"
			mode="bottom">
			<view class="popup">
				<view class="popup_bar">
					<view class="popup_bars">
						
					</view>
				</view>
				<view class="m_center" style="background: #FFFFFF;border-radius: 24px;">
					<view class="t_title" style="text-align: center;width: 100%;margin-top: 30px;">
						篩選條件
					</view>
					<view class="aactrn">
						<view :class="{'isbtnac':isbtnac}" style="flex: 1;" @click="isbtnde(true)">
							全職
						</view>
						<view :class="{'isbtnac':!isbtnac}" style="flex: 1;" @click="isbtnde(false)">
							兼職
						</view>
					</view>
					
					<!-- 薪资範圍 -->
					<view style="margin-top: 24px;">
						<view class="" v-if="isnop">
							<view class="t_title flex">
								<view >
									<image style="width: 44px;height: 44px;" src="/static/images/j_04.png" alt="">
								</view>
								<view style="margin-left: 16px;">
									<view class="">
										薪资範圍
									</view>
									<view class="qsstitle">
										<!-- 高等教育（副學士） -->
										{{isthree+''+isthree_t+''+isthree_h+"00"}}~{{isfour+''+isfour_t+''+isfour_h+"00"}}
									</view>
								</view>
								
							</view>
							
							<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
								<view class="islebpo">
									<image src="/static/images/j_00.png" alt="">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changethree">
									    <picker-view-column>
									      <view  v-for='(item,index) in twoList' :class="[isthree==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>萬</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changethree_t">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isthree_t==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>千</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
									
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changethree_h">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isthree_h==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>百</view>
									    </picker-view-column>
									</picker-view>
								</view>
							</view>
							<view class="hengxan">
							</view>
							<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
								<view class="islebpo">
									<image src="/static/images/j_00.png" alt="">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changefour">
									    <picker-view-column>
									      <view  v-for='(item,index) in twoList' :class="[isfour==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>萬</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changefour_t">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isfour_t==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>千</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changefour_h">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isfour_h==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>百</view>
									    </picker-view-column>
									</picker-view>
								</view>
							</view>
						
						</view>
						<view class="t_input" v-if="!isnop">
							<input type="text" placeholder-class="t_pla" placeholder="輸入薪資範圍..." v-model="money" />
						</view>
					</view>


					<!-- 学历要求 -->
					<view style="margin-top: 24px;">
						<view class="t_title flex">
							<view >
								<image style="width: 44px;height: 44px;" src="/static/images/j_01.png" alt="">
							</view>
							<view style="margin-left: 16px;">
								<view class="">
									學歷要求
								</view>
								<view class="qsstitle">
									{{oneList[isone].name}}
								</view>
							</view>
							
						</view>
						<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
							<!-- 定位 -->
							<view class="islebpo">
								<image src="/static/images/j_00.png" alt="">
							</view>
							<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changeone">
							    <picker-view-column>
							      <view  v-for='(item,index) in oneList' :class="[isone==index?'iscole':'iscolesa']">{{item.name}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
					<!-- 年资要求 -->
					<view style="margin-top: 24px;">
						
						<view class="t_title flex">
							<view >
								<image style="width: 44px;height: 44px;" src="/static/images/j_02.png" alt="">
							</view>
							<view style="margin-left: 16px;">
								<view class="">
									年資要求
								</view>
								<view class="qsstitle">
									{{istwo}}~{{istwo_t+addistwo}}年
								</view>
							</view>
							
						</view>
						
						<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
							<!-- 定位 -->
							<view class="islebpo">
								<image src="/static/images/j_00.png" alt="">
							</view>
							<view class="flex" style="align-items: center;">
								<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changetwo">
								    <picker-view-column>
								      <view  v-for='(item,index) in twoList' :class="[istwo==index?'iscole':'iscolesa']">{{index}}</view>
								    </picker-view-column>
								</picker-view>
								<view class="isfont">
									年
								</view>
							</view>
							<view class="hengshu">
								
							</view>
							<view class="flex" style="align-items: center;">
								<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="changetwo_t">
								    <picker-view-column>
								      <view  v-for='(item,index) in twoList' :class="[istwo_t==index?'iscole':'iscolesa']" v-if="addistwo>=0">{{index+addistwo}}</view>
								    </picker-view-column>
								</picker-view>
								<view class="isfont">
									年
								</view>
							</view>
						</view>
					</view>
				
					<!-- 職位性質 -->
					<view style="margin-top: 24px;" v-if="isbtnac">
						
						<view class="t_title flex">
							<view >
								<image style="width: 44px;height: 44px;" src="/static/images/j_03.png" alt="">
							</view>
							<view style="margin-left: 16px;">
								<view class="">
									職級要求
								</view>
								<view class="qsstitle">
									{{cten[job_grade-1]}}
								</view>
							</view>
							
						</view>
						<view class="flex" style="align-items: center;margin-top: 24px;">
							<view class="t_money">
								<image v-if="isnop == 11" @click="isnopo(11,1)" src="/static/images/yeok.jpg" alt="">
								<image v-if="isnop!=11" @click="isnopo(11,1)" src="/static/images/oval.png" alt="">
								普通員工
							</view>
							<view class="t_money">
								<image v-if="isnop !=22" @click="isnopo(22,2)" src="/static/images/oval.png" alt="">
								<image v-if="isnop==22" @click="isnopo(22,2)" src="/static/images/yeok.jpg" alt="">
								基層管理
							</view>
						</view>
						<view class="flex" style="align-items: center;margin-top: 24px;">
							<view class="t_money">
								<image v-if="isnop ==33" @click="isnopo(33,3)" src="/static/images/yeok.jpg" alt="">
								<image v-if="isnop!=33" @click="isnopo(33,3)" src="/static/images/oval.png" alt="">
								中層管理
							</view>
							<view class="t_money">
								<image v-if="isnop !=44" @click="isnopo(44,4)" src="/static/images/oval.png" alt="">
								<image v-if="isnop ==44" @click="isnopo(44,4)" src="/static/images/yeok.jpg" alt="">
								高層管理
							</view>
							
						</view>
					</view>
				</view>
				
				<view class="center_indexs">
					<view class="tagWrapButtom" @click.stop="responsibilitiesSubmit()"><span class="tagButtom">確定</span></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	//这是组件化的
	
	export default{
		data() {
		  return {
			  money:"",
			  vis:{
				  responsibilitiesShow: false //测试为true 正式false
			  },
			  addistwo:0,
			  type: 'textarea',
			  border: true,
			  height: 200,
			  autoHeight: true,
			  popup_content: '',
			  cten:["普通員工","基層管理","中層管理","高層管理"],
			  oneList:[  //学历要求
				  {
					name:"中學",
				  },
				  {
				  	name:"職業訓練IVE/文憑",
				  },
				  {
				  	name:"學士",
				  },
				  {
				  	name:"本科",
				  },
			  ],
			  twoList:31, // 年资要求
			  threeList_t:10,  //薪水要求千 百
			  isnop:11,
			  tit:"",
			  isone:0,//招聘职位
			  istwo:0,//年资要求
			  istwo_t:0,//年资要求
			  isthree:0,//薪资要求
			  isthree_t:0,//薪资要求
			  isthree_h:0,//薪资要求
			  isfour:0,//薪资要求
			  isfour_t:0,//薪资要求
			  isfour_h:0,//薪资要求
			  job_grade:1,
			  isbtnac:true,//是否是兼职还是全职
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
			}
		},
		methods: {
			isbtnde(bool){
				this.isbtnac = bool
			},
			isnopo(bool,val){
				this.isnop = bool
				this.job_grade = val
			},
			//关闭
			closePopup(){
				  this.$emit('closePopup');
			},
			//提交
			responsibilitiesSubmit() {
				  const onepace = parseInt(this.isthree+""+this.isthree_t+this.isthree_h+"00");
				  const twopace = parseInt(this.isfour+""+this.isfour_t+this.isfour_h+"00")
				  let erry = {};
				  erry.job_grade = this.job_grade;
				  if(onepace >= twopace){
					  erry.salary_start = twopace
					  erry.salary_end = onepace
				  }else{
					  erry.salary_start = onepace
					  erry.salary_end = twopace
				  }
				  this.isbtnac?erry.job_type = 1:erry.job_type = 2;
				  erry.education = this.oneList[this.isone].name;
				  erry.seniority_start = this.istwo;
				  erry.seniority_end = this.istwo_t+this.addistwo;
				  
				  this.$emit('addpopup',erry);
			},
			// 学历要求
			changeone(e){
				this.isone = e.detail.value[0];
			},
			//年资要求1
			changetwo(e){
				if(this.istwo > e.detail.value[0]){
					this.addistwo = e.detail.value[0]-this.istwo_t;
				}
				this.istwo = e.detail.value[0];
				//判断
				if(this.istwo > (this.istwo_t + this.addistwo)){
					this.addistwo = this.istwo - this.istwo_t
				}
			},
			//年资要求2
			changetwo_t(e){
				this.istwo_t = e.detail.value[0];
				//判断
				if(this.istwo > (this.istwo_t + this.addistwo)){
					this.addistwo = this.istwo - this.istwo_t
				}
			},
			//薪资要求2
			changethree(e){
				this.isthree = e.detail.value[0];
			},
			changethree_t(e){
				this.isthree_t = e.detail.value[0];
			},
			changethree_h(e){
				this.isthree_h = e.detail.value[0];
			},
			changefour(e){
				this.isfour = e.detail.value[0];
			},
			changefour_t(e){
				this.isfour_t = e.detail.value[0];
			},
			changefour_h(e){
				this.isfour_h = e.detail.value[0];
			},
			
		},
		watch:{
			filter(val,old){
				this.vis.responsibilitiesShow = val;
				this.popup_content = "";
			}
		}
	}
</script>
<style>
	
</style>

<style scoped>
	.hengxan{
		margin: 15px 30px;
		width:calc(100% - 60px) ;
		height: 1px;
		background: #0E320D;
		opacity: 0.2;
	}
	.isbtnac{
		margin: 3px;
		background: linear-gradient(180deg, #5DCA41 0%, #278A23 100%);;
		border-radius: 12px;
	}
	.aactrn{
		
		font-size: 15px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #FFFFFF;
		/* justify-content: space-between; */
		text-align: center;
		/* line-height: 20px; */
		width: 100%;
		line-height: 40px;
		background: #E4E7ED;
		border-radius: 12px;
		display: flex;
		margin-top: 16px;
	}
	.qsstitle{
		font-size: 12px;
		font-family: PingFangTC-Medium, PingFangTC;
		font-weight: 500;
		color: #0E320D;
		line-height: 21px;
		opacity: 0.4;
	}
	.iscole{
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 16px;
		color: #0E320D;
		font-weight: 600;
		line-height: 35px;
	}
	.iscolesa{
		opacity: 0.5;
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 14px;
		color: #0E320D;
		font-weight: 600;
		line-height: 35px;
	}
	.hengshu{
		/**/
		width: 1px;
		height: 32px;
		background: #0E320D;
		opacity: 0.2;
		margin: 0 48px 0 40px;
	}
	.hengshus{
		/**/
		width: 1px;
		height: 32px;
		background: #0E320D;
		opacity: 0.2;
		margin:0 20px;
		/* margin: 0 48px 0 40px; */
	}
	.isfont{
		margin-left: 10px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #0E320D;
		line-height: 22px;
	}
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
	.t_money{
		flex: 1;
		margin-left: 12px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #0E320D;
		line-height: 20px;
		display: flex;
		align-items: center;
	}
	.t_money image{
		width: 24px;
		height: 24px;
		padding-right: 12px;
	}
	.center_indexs{
		background-color: #F1F3F6;
		margin-top: 0px;
		padding: 24px 0 32px 0;
	}
	.tagWrapButtom{
		background-image: linear-gradient(0deg, #5ac63f 0%, #319628 100%);
		height: 37px;
		-moz-box-shadow: 0px 3px 0px 0px #226b0f;
		-webkit-box-shadow: 0px 3px 0px 0px #226b0f;
		box-shadow: 0px 3px 0px 0px #226b0f;
	}
	.tagWrapButtom:active {
		-moz-box-shadow: 0px 1px 0px 0px #226b0f;
		-webkit-box-shadow: 0px 1px 0px 0px #226b0f;
		box-shadow: 0px 1px 0px 0px #226b0f;
	}
	.t_title{
		text-align: left;
		align-items: center;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #0E320D;
		line-height: 22px;
		letter-spacing: 1px;
	}
	.t_pla{
		color: rgba(36, 53, 84, 0.3);
	}
	.t_input{
		margin-top: 20px;
		padding: 8px 22px;
		border-radius: 16px;
		border: 1px solid rgba(36, 53, 84, 0.2); 
		 color: #000;
	}
	.m_center{
		padding: 20px 60upx 60upx 60upx;
		background:  #fff;
	}
	.popup{
		background:  #fff;
		height: 520px;
	}
	.popup_bar{
		z-index: 9;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 48upx;
		background:  #F1F3F6;
	}
	.popup_bars{
		position: fixed;
		top: 24upx;
		left: calc(50% - 48upx);
		width: 96upx;
		height: 12upx;
		background:rgba(255,255,255,1);
		border-radius:3px;
	}
	.mid_center{
		background:#fff;
		border-radius:24px;
	}
</style>
