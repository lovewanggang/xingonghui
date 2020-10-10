<template>
	<view>
		<view class="cornnter">
			<view class="cen_box">
			</view>
		</view>
		<!-- 基本信息 -->
		<view :class="[isborder[0] ? 'nodashed':'dashed']" class="flex" @click="information" style="justify-content: space-between;">
			<view class="flex" style="align-items: center;">
				<view class="flex" style="margin-left: 9px;">
					<view class="box_top">
					</view>
					<view class="box_top2">
						<image v-if="resume_content.photo" mode="aspectFill" :src="$pubFuc.advertising(resume_content.photo)"></image>
					</view>
				</view>
				<view style="margin-left: 12px;">
					<view class="name_txt">
						{{resume_content.family_name ? resume_content.family_name+resume_content.first_name:"姓名"}}
						 <text class="inctr"> / {{resume_content.sex ? resume_content.sex == 1?"男":"女":"性别"}} </text> 
					</view>
					<view class="center_txt">
						{{resume_content.title?resume_content.title:"求職意向"}}
					</view>
					<view class="center_txt">
						{{resume_content.salary_start?resume_content.salary_start/1000 +"K~"+ resume_content.salary_end/1000+"k":"期望薪資"}}
					</view>
					<view class="center_txt">
						{{resume_content.work_experience?resume_content.work_experience+"年經驗":"工作年限"}}
					</view>
				</view>
			</view>
			<view class="" style="margin-right: 9px;">
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						{{resume_content.age?resume_content.age+"歲":"年齡"}}
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="man-add-fill" color="#fff" ></u-icon>
					</view>
				</view>
				
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						{{resume_content.mobile?resume_content.mobile:"电话号码"}}
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="phone-fill" color="#fff" ></u-icon>
					</view>
				</view>
				
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						{{resume_content.email?resume_content.email:"郵箱"}}
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="email-fill" color="#fff" ></u-icon>
					</view>
				</view>
				
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						{{resume_content.address?resume_content.address:"地址"}}
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="map-fill" color="#fff" ></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 经验 -->
		<view :class="[isborder[1] ? 'nodashed':'dashed']" @click="experience">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					教育經歷
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view v-if="isborder[1]" v-for="(item,index) in resume_content.educational">
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							{{item.starttime}}-{{item.endtime}}
						</view>
						<view class="cemmder twowidth">
							{{item.schoolname}}
						</view>
						<view class="cemmder threewidth">
							{{item.study}}({{item.education}})
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;margin-top: 4px;">
						<text>{{item.studytext}}</text>
					</view>
				</view>
				<view v-if="!isborder[1]">
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							學習時間
						</view>
						<view class="cemmder twowidth">
							學校名稱
						</view>
						<view class="cemmder threewidth">
							專業
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;">
						主修課程介紹
					</view>
				</view>
			</view>
			
			<view class="" style="margin-top: 16px;">
				<view class="ctrn_tex" style="margin-left: 9px;">
					實習經驗
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
					</view>
				</view>
				<view v-if="isborder[1]" v-for="(item,index) in resume_content.exercitation">
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							{{item.starttime}}-{{item.endtime}}
						</view>
						<view class="cemmder twowidth">
							{{item.institution_name}}
						</view>
						<view class="cemmder threewidth">
							{{item.practice}}(實習生)
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;margin-top: 4px;">
						<text>{{item.practicetext}} </text>
					</view>
				</view>
				<view class="" v-if="!isborder[1]">
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							公司時間
						</view>
						<view class="cemmder twowidth">
							公司名稱
						</view>
						<view class="cemmder threewidth">
							職位
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;">
						工作內容
					</view>
				</view>
				
			</view>
			
			<view class="" style="margin-top: 16px;">
				<view class="ctrn_tex" style="margin-left: 9px;">
					工作經歷
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
					</view>
				</view>
				
				
				<view v-if="isborder[1]" v-for="(item,index) in resume_content.school">
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							{{item.starttime}}-{{item.endtime}}
						</view>
						<view class="cemmder twowidth">
							{{item.workername}}
						</view>
						<view class="cemmder threewidth">
							{{item.worker}}({{item.rank}})
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;margin-top: 4px;">
						<text>{{item.workertext}}</text>
					</view>
				</view>
				<view class="" v-if="!isborder[1]">
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							公司時間
						</view>
						<view class="cemmder twowidth">
							公司名稱
						</view>
						<view class="cemmder threewidth">
							職位
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;">
						工作內容
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 專業技能 -->
		<!-- :class="[isActive?'active':'disActive']" -->
		<view :class="[isborder[2] ? 'nodashed':'dashed']" @click="professional">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					專業技能
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				
				<view class="" v-if="isborder[2]">
					<view class="flex" style="margin-left: 9px;margin-top: 9px;" v-for="(item,index) in resume_content.skill.professional_skill">
						<view class="left_pro">
							{{item.nameval}}
						</view>
						<view class="mid_pro">
							<view style="height: 12px;background-color: #217AC3;" :style="{width:item.value+'%'}">
							</view>
						</view>
						<view class="cemmd" style="margin-left: 20px;">
							{{item.value}}%
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;margin-top: 10px;width:calc(100% - 16px);">
						{{resume_content.skill.professional_introduction}}
					</view>
				</view>
				<view class="" v-else>
					<view class="flex" style="margin-left: 9px;">
						<view class="cemmder onewidth">
							技能名稱
						</view>
						<view class="cemmder twowidth">
							熟練程度
						</view>
					</view>
					<view class="cemmd" style="margin-left: 9px;">
						技能介紹
					</view>
				</view>
				
			</view>
			<view class="">
				
			</view>
		</view>
		
		<!-- 证书奖状 -->
		<view :class="[isborder[3] ? 'nodashed':'dashed']" @click="certificate">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					技能證書
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view class="flex" style="margin-left: 9px;">
					<view class="cemmder onewidth">
						證書名稱
					</view>
					<view class="cemmder twowidth">
						頒發機構
					</view>
					<view class="cemmder threewidth">
						頒發時間
					</view>
				</view>
				<view v-if="isborder[3]" class="flex cemmd" style="margin-left: 9px;margin-top: 4px;" v-for="(item,index) in resume_content.certificate">
					<view class="onewidth">
						{{item.certificate_name}}
					</view>
					<view class="twowidth">
						{{item.authorization}}
					</view>
					<view class="threewidth" style="letter-spacing: 0px;">
						{{item.time}}
					</view>
				</view>
			</view>
			
			<view style="margin-top: 16px;">
				<view class="ctrn_tex" style="margin-left: 9px;">
					獎項榮譽
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view class="flex" style="margin-left: 9px;">
					<view class="cemmder onewidth">
						獎項名稱
					</view>
					<view class="cemmder twowidth">
						頒發機構
					</view>
					<view class="cemmder threewidth">
						頒發時間
					</view>
				</view>
				<view v-if="isborder[3]" class="flex cemmd" style="margin-left: 9px;margin-top: 4px;" v-for="(item,index) in resume_content.award">
					<view class="onewidth">
						{{item.certificate_name}}
					</view>
					<view class="twowidth">
						{{item.authorization}}
					</view>
					<view class="threewidth" style="letter-spacing: 0px;">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 自我评价 -->
		<view :class="[isborder[4] ? 'nodashed':'dashed']" @click="evaluation">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					自我評價
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view class="cemmd" style="margin-left: 9px;margin-top: 4px;width:calc(100% - 16px) ;" v-if="isborder[4]">
					{{resume_content.evaluate}}
				</view>
				<view class="cemmd" style="margin-left: 9px;margin-top: 4px;" v-else>
					評價內容
				</view>
			</view>
			
			
			<view class="cornnter" style="margin-top: 16px;">
				<view class="cen_box">
				</view>
			</view>
			
			<view style="margin-top: 16px;">
				<view class="ctrn_tex" style="margin-left: 9px;">
					求職信
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view class="cemmd" style="margin-left: 9px;margin-top: 4px;width:calc(100% - 16px) ;" v-if="isborder[4]">
					{{resume_content.cover_letter}}
				</view>
				<view class="cemmd" style="margin-left: 9px;margin-top: 4px;" v-else>
					請輸入求職信內容
				</view>
			</view>
			<view class="cornnter" style="margin-bottom: -18px;margin-top: 16px;">
				<view class="cen_box">
				</view>
			</view>
		</view>

	</view>
</template>
<script>
export default {
	name: 'bottom',
	data() {
		return {
			resume_content:{},
			isborder:[false,false,false,false,false],
			education:["中學","大學","碩士","博士"],
		};
	},
	props:['details','tel'],
	watch:{
		details(newName,oldName){
			const that= this
			// if(newName.mobile){
			// 	console.log(newName)
			// 	this.resume_content = newName;
			// }
			if(newName.type == -1){
				console.log(this.details.mobile);
				// this.tel = this.details.mobile
				//-1时候直接渲染
				this.resume_content = newName;
				this.isborder.map((res,index)=>{
					that.$set(that.isborder,index,true)
				})
				return 
			}
			 this.$set(this.isborder,newName.type,true)
			 //分批渲染
			 if(newName.type == 0){
				 //基础信息
				 Object.assign(this.resume_content,newName);
				 this.$emit("reproduce",this.resume_content);
			 }else if(newName.type == 1){
				 let rankList = ["普通員工","基層管理","中層管理","高層管理"];
				//学历
				this.$set(this.resume_content,'education',newName.study[newName.study.length-1].education);
				//岗位职责
				const grade = rankList.map((res,index)=>{
					if(res == newName.worker[newName.worker.length-1].rank){
						return index
					}
				}).filter((res)=>{
					if(res){
						return res
					}
				})[0]
				this.$set(this.resume_content,'job_grade',grade+1);
			 	
				//教育经验 educational
			 	this.$set(this.resume_content,'educational',newName.study);
			 	//实习经验 exercitation
			 	this.$set(this.resume_content,'exercitation',newName.practice);
				//工作经验 school
				this.$set(this.resume_content,'school',newName.worker);
				
				this.$emit("reproduce",this.resume_content);
			 }else if(newName.type == 2){
				 this.$set(this.resume_content,'skill',{professional_introduction:newName.text,professional_skill:newName.center});
				// //专业技能介绍
				this.$emit("reproduce",this.resume_content);
			}else if(newName.type == 3){
				//技能证书奖状荣耀
				// this.$set(this.resume_content,"cert",{certificate:newName.certificate,award:newName.award})
				this.$set(this.resume_content,'certificate',newName.certificate);
				this.$set(this.resume_content,'award',newName.award);
				
				this.$emit("reproduce",this.resume_content);
			}else if(newName.type == 4){
				//自我评价
				this.$set(this.resume_content,'evaluate',newName.evaluate_myself);
				//求职短信
				this.$set(this.resume_content,'cover_letter',newName.job_search);
				
				this.$emit("reproduce",this.resume_content);
			}
		}
	},
	methods: {
		// 基础信息
		information(){
			// console.log("这是简历基础信息");
			if(this.isborder[0]){
				let arr = this.resume_content;
				// delete arr.evaluate 
				this.$emit("information",arr);
			}else{
				this.$emit("information");
			}
		},
		// 职业经验
		experience(){
			// console.log("点击了职业经验");
			if(this.isborder[1]){
				// this.$set(this.resume_content,'skill',{professional_introduction:newName.text,professional_skill:newName.center});
				let arr = {};
				arr.study = this.resume_content.educational
				arr.practice = this.resume_content.exercitation
				arr.worker = this.resume_content.school
				this.$emit("experience",arr);
			}else{
				this.$emit("experience");
			}
			
		},
		// 专业技能
		professional(){
			// console.log("点击了专业技能");
			if(this.isborder[2]){
				// this.$set(this.resume_content,'skill',{professional_introduction:newName.text,professional_skill:newName.center});
				let arr = {};
				arr = this.resume_content.skill
				this.$emit("professional",arr);
			}else{
				this.$emit("professional");
			}
		},
		// 技能证书
		certificate(){
			if(this.isborder[3]){
				let arr = {};
				arr.certificate = this.resume_content.certificate
				arr.award = this.resume_content.award
				this.$emit("certificate",arr);
			}else{
				this.$emit("certificate");
			}
			// console.log("点击了技能证书");
			
		},
		// 自我评价
		evaluation(){
			if(this.isborder[4]){
				let arr = {};
				arr.evaluate_myself = this.resume_content.evaluate
				arr.job_search = this.resume_content.cover_letter
				this.$emit("evaluation",arr);
			}else{
				this.$emit("evaluation");
			}
			
			// console.log("自我评价");
			
		},
		
	}
};
</script>

<style scoped>
	uni-page-body {
		/* background-color: #F4FAF3; */
		height: 100%;
	}
	body,
	html {
			/* background-color: #F4FAF3; */
			height: 100%;
		}
		.left_pro{
			width: 55px;
			margin-right: 5px;
			font-size: 12px;
			font-family: SourceHanSansCN-Bold, SourceHanSansCN;
			font-weight: bold;
			color: #000000;
			line-height: 14px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
		}
		.mid_pro{
			background-color: #DBDBDB;
			border-radius: 2px;
			width: calc(100% - 150px) ;
			height: 12px;
		}
		
	.inctr{
		font-size: 8px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #000000;
		line-height: 6px;
	}
	.onewidth{
		width: 33%;
		overflow: hidden;
		text-overflow:ellipsis; white-space: nowrap;
		margin-right: 8px;
	}
	.twowidth{
		width: 30%;
		overflow: hidden;
		text-overflow:ellipsis; white-space: nowrap;
		margin-right: 8px;
	}
	.threewidth{
		width: 28%;
		overflow: hidden;
		text-overflow:ellipsis; white-space: nowrap;
	}
	
	/* 虚线边框 */
	.dashed{
		border: 1px dashed rgba(31,35,31,.4);
		margin: 10px;
		padding: 16px 0;
		border-radius: 12px;
	}
	.nodashed{
		/* color: rgba(); */
		border: 1px dashed rgba(0,0,0,0)!important;
		margin: 10px;
		padding: 16px 0;
		border-radius: 12px;
	},
	.cemmder{
		margin-top: 7px;
		font-size: 8px;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		line-height: 14px;
	}
	.transfrom{
		transform: scale(0.75);
		-webkit-transform: scale(0.75);
		-moz-transform: scale(0.75);
		-o-transform: scale(0.75); 
	}
	.cemmd{
		font-size: 8px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		letter-spacing: 1px;
		white-space:normal;
		word-break: break-all;

		color: rgba(0,0,0,.6);
		line-height: 14px;
		
	}
	.cen_box{
		width: 16px;
		height: 16px;
		background-color: #1E8FC7;
	}
	.cornnter{
		width: 100%;
		height: 16px;
		background: #000000;
		position: relative;
	}
	.box_aa{
		width: 16px;
		height: 16px;
		color: #1E8FC7;
	}
	.box_top{
		width: 63px;
		height: 63px;
		background: #1E8FC7;
		margin-top: 6px;
		margin-left: 6px;
	}
	.box_top2{
		width: 63px;
		height: 63px;
		background:#D4D4D4 ;
		margin-left: -70px;
	}
	.box_top2 image{
		width: 100%;
		height: 100%;
	}
	.name_txt{
		font-size: 14px;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		line-height: 20px;
	}
	.center_txt{
		font-size: 8px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #1E8FC7;
		line-height: 15px;
	}
	.txt_r{
		font-size: 12px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #000000;
		line-height: 16px;
		text-align: right;
	}
	.heng{
		position: relative;
		width:calc(100% - 40px) ;
		margin: 0 9px;
		height: 1px;
		background-color: #000;
		margin-top: 1px;
	}
	.ctrn_tex{
		font-size: 12px;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		line-height: 12px;
	}
</style>
