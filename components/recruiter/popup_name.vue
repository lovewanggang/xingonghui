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
				<view class="m_center">
					<view class="">
						<view class="t_title">
							崗位名称
						</view>
						<view class="t_input">
							<input type="text" placeholder-class="t_pla" placeholder="輸入崗位名..." v-model="tit" />
						</view>
					</view>
					<!-- 学历要求 -->
					<view style="margin-top: 24px;">
						<view class="t_title">
							學歷要求
						</view>
						<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
							<!-- 定位 -->
							<view class="islebpo">
								<image src="/static/images/tabplay.png" alt="" mode="scaleToFill">
							</view>
							<picker-view mask-style="background:#F1F3F6" :value="[isone]" style="width: 140px; height: 95px;text-align: center;" @change="changeone">
							    <picker-view-column>
							      <view  v-for='(item,index) in oneList' :class="[isone==index?'iscole':'iscolesa']">{{item.name}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
					<!-- 年资要求 -->
					<view style="margin-top: 24px;">
						<view class="t_title">
							年資要求
						</view>
						<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
							<!-- 定位 -->
							<view class="islebpo">
								<image src="/static/images/tabplay.png" alt="" mode="scaleToFill">
							</view>
							<view class="flex" style="align-items: center;">
								<picker-view mask-style="background:#F1F3F6" :value="[istwo]" style="width: 40px; height: 95px;text-align: center;" @change="changetwo">
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
								<picker-view mask-style="background:#F1F3F6" :value="[istwo_t]" style="width: 40px; height: 95px;text-align: center;" @change="changetwo_t">
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
					<view style="margin-top: 24px;">
						<view class="t_title">
							職位性質
						</view>
						<view class="flex" style="align-items: center;margin-top: 24px;">
							<view class="t_money">
								<image v-if="isnop" @click="isnopo(isnop)" src="/static/images/checked.png" alt="" mode="scaleToFill">
								<image v-if="!isnop" @click="isnopo(isnop)" src="/static/images/oval.png" alt="" mode="scaleToFill">
								全職
							</view>
							<view class="t_money">
								<image v-if="isnop" @click="isnopo(!isnop)" src="/static/images/oval.png" alt="" mode="scaleToFill">
								<image v-if="!isnop" @click="isnopo(!isnop)" src="/static/images/checked.png" alt="" mode="scaleToFill">
								兼職
							</view>
						</view>
					</view>
					
					<!-- 薪资範圍 -->
					<view style="margin-top: 24px;">
						<view class="" v-if="isnop">
							<view class="t_title">
								薪资範圍
							</view>
							
							<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
								<view class="islebpo">
									<image src="/static/images/tabplay.png" alt="" mode="scaleToFill">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#F1F3F6" :value="[isthree]" style="width: 40px; height: 95px;text-align: center;" @change="changethree">
									    <picker-view-column>
									      <view  v-for='(item,index) in twoList' :class="[isthree==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>萬</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#F1F3F6" :value="[isthree_t]" style="width: 40px; height: 95px;text-align: center;" @change="changethree_t">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isthree_t==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>千</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
									
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#F1F3F6" :value="[isthree_h]" style="width: 40px; height: 95px;text-align: center;" @change="changethree_h">
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
									<image src="/static/images/tabplay.png" alt="" mode="scaleToFill">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#F1F3F6" :value="[isfour]" style="width: 40px; height: 95px;text-align: center;" @change="changefour">
									    <picker-view-column>
									      <view  v-for='(item,index) in twoList' :class="[isfour==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>萬</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#F1F3F6" :value="[isfour_t]" style="width: 40px; height: 95px;text-align: center;" @change="changefour_t">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isfour_t==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>千</view>
									    </picker-view-column>
									</picker-view>
								</view>
								<view class="hengshus">
									
								</view>
								<view class="flex" style="align-items: center;">
									<picker-view mask-style="background:#F1F3F6" :value="[isfour_h]" style="width: 40px; height: 95px;text-align: center;" @change="changefour_h">
									    <picker-view-column>
									      <view  v-for='(item,index) in threeList_t' :class="[isfour_h==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>百</view>
									    </picker-view-column>
									</picker-view>
								</view>
							</view>
						</view>
						<view class="t_input" v-if="!isnop">
							<input type="number" placeholder-class="t_pla" placeholder="輸入薪資範圍..." v-model="isthree" />
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
	export default{
		data() {
		  return {
			  vis:{
				  responsibilitiesShow: false //测试为true 正式false
			  },
			  addistwo:0,
			  type: 'textarea',
			  border: true,
			  height: 200,
			  autoHeight: true,
			  popup_content: '',
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
			  ],
			  twoList:31, // 年资要求
			  threeList_t:10,  //薪水要求千 百
			  isnop:true,
			  tit:"",
			  isone:0,//招聘职位
			  istwo:0,//年资要求
			  istwo_t:0,//年资要求
			  isthree:0,//薪资要求
			  isthree_t:0,//薪资要求
			  isthree_h:0,//薪资要求
			  isfour:0,//薪资要求
			  isfour_t:0,//薪资要求
			  isfour_h:0//薪资要求
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
            filldata:{
                type:Object,
                val:null
            }
		},
		methods: {
			isnopo(bool){
				if(!bool){
					this.isnop = !this.isnop;
					//清空值
					this.isthree = 0;
					this.isthree_t = 0;
					this.isthree_h = 0;
					this.isfour = 0;
					this.isfour_t = 0;
					this.isfour_h = 0;
				}
			},
			//关闭
			closePopup(){
				  this.$emit('closePopup');
			},
			//提交
			responsibilitiesSubmit() {
					if(this.tit == ""){
						this.$pubFuc.showToast("請輸入職位");
						return;
					}
				  //判断是否完善
				  if(!this.isnop && this.isthree == ""){
					this.$pubFuc.showToast("請輸入金額")
					return;
				  }
				  let erry = {};
				  erry.title = this.tit;
				  this.isnop?erry.job_type = 1:erry.job_type = 2;
				  erry.education = this.oneList[this.isone].name;
				  erry.seniority_start = this.istwo;
				  erry.seniority_end = this.istwo_t+this.addistwo;
				
				  if(this.isnop){
					//这里是全职
					const onepace = parseInt(this.isthree+""+this.isthree_t+this.isthree_h+"00");
					const twopace = parseInt(this.isfour+""+this.isfour_t+this.isfour_h+"00")
					if(onepace >= twopace){
						erry.salary_start = twopace
						erry.salary_end = onepace
					}else{
						erry.salary_start = onepace
						erry.salary_end = twopace
					}
				}else{
					//如果是兼职
					erry.salary_start = this.isthree;
				
				}
				// console.log(erry);
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
			},
            filldata(val, old){
                this.tit = val.title;
                this.isone = this.oneList.findIndex((item, index) => {
                    return item.name == val.education;
                })
                this.istwo = val.seniority_start;
                this.addistwo = val.seniority_start;
                this.istwo_t = val.seniority_end - val.seniority_start;
                
                this.isnop = (val.job_type === 1);
                
                this.isthree = parseInt(val.salary_start / 10000);
                this.isthree_t = parseInt((val.salary_start-this.isthree*10000) / 1000);
                this.isthree_h = parseInt((val.salary_start-this.isthree*10000-this.isthree_t*1000) / 100);
                
                console.log(this.isthree,this.isthree_t, this.isthree_h)
                
                this.isfour = parseInt(val.salary_end / 10000);
                this.isfour_t = parseInt((val.salary_end - this.isfour*10000) / 1000);
                this.isfour_h = parseInt((val.salary_end - this.isfour*10000 - this.isfour_t*1000) / 100);
                
                console.log(this.isfour,this.isfour_t, this.isfour_h)
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
		background: #243557;
		opacity: 0.2;
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
	.hengshu{
		/**/
		width: 1px;
		height: 32px;
		background: #243557;
		opacity: 0.2;
		margin: 0 48px 0 40px;
	}
	.hengshus{
		/**/
		width: 1px;
		height: 32px;
		background: #243557;
		opacity: 0.2;
		margin:0 20px;
	}
	.isfont{
		margin-left: 10px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #243557;
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
		font-weight: 500;
		color: #243557;
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
		margin-top: 0;
		height: 44px;
	}
	.t_title{
		text-align: center;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #243557;
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
		padding: 48px 60upx 60upx 60upx;
		background:  #F1F3F6;
	}
	.popup{
		background:  #F1F3F6;
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
		background:#F1F3F6;
		border-radius:24px;
	}
</style>
