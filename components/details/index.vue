<template>
	<view>
		<view class="cornnter">
			<view class="cen_box">
			</view>
		</view>
		<!-- 基本信息 -->
		<view class="flex dashed" @click="information" style="justify-content: space-between;">
			<view class="flex" style="align-items: center;">
				<view class="flex" style="margin-left: 9px;">
					<view class="box_top">
						
					</view>
					<view class="box_top2">
						
					</view>
				</view>
				<view style="margin-left: 12px;">
					<view class="name_txt">
						Amelia
					</view>
					<view class="center_txt">
						求職意向
					</view>
				</view>
			</view>
			<view class="" style="margin-right: 9px;">
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						24歲
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="man-add-fill" color="#fff" ></u-icon>
					</view>
					
				</view>
				
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						13833004422
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="phone-fill" color="#fff" ></u-icon>
					</view>
					
				</view>
				
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						amelia@163.com
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="email-fill" color="#fff" ></u-icon>
					</view>
				</view>
				
				<view class="flex" style="flex-direction:column-reverse;">
					<view class="txt_r">
						上海市
						<u-icon size="9px" style="margin-left: 8px;background-color: #000;border-radius: 90%;" name="map-fill" color="#fff" ></u-icon>
					</view>
					
				</view>
				
			</view>

		</view>
		<!-- 经验 -->
		<view class="dashed" @click="experience">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					教育經歷
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
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
			
			<view class="" style="margin-top: 16px;">
				<view class="ctrn_tex" style="margin-left: 9px;">
					實習經驗
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
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
			
			<view class="" style="margin-top: 16px;">
				<view class="ctrn_tex" style="margin-left: 9px;">
					工作經歷
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view class="flex" style="margin-left: 9px;">
					<view class="cemmder onewidth">
						在校時間
					</view>
					<view class="cemmder twowidth">
						學校名稱
					</view>
					<view class="cemmder threewidth">
						經歷名稱
					</view>
				</view>
				<view class="cemmd" style="margin-left: 9px;">
					經歷內容
				</view>
			</view>
			
		</view>
		
		<!-- 專業技能 -->
		<view class="dashed" @click="professional">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					專業技能
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
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
		
		<!-- 证书奖状 -->
		<view class="dashed" @click="certificate">
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
				<view class="cemmd" style="margin-left: 9px;">
					
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
				<view class="cemmd" style="margin-left: 9px;">
					
				</view>
			</view>
		</view>
		
		<!-- 自我评价 -->
		<view class="dashed" @click="evaluation">
			<view class="">
				<view class="ctrn_tex" style="margin-left: 9px;">
					自我評價
				</view>
				<view class="heng">
					<view style="width: 64px;height: 3px;background-color: #000;position: absolute;top: -1px;left: 0px;">
						
					</view>
				</view>
				<view class="cemmd" style="margin-left: 9px;margin-top: 4px;">
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
				<view class="cemmd" style="margin-left: 9px;margin-top: 4px;">
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
			
		};
	},
	onLoad() {},
	methods: {
		// 基础信息
		information(){
			console.log("这是简历基础信息");
		},
		// 职业经验
		experience(){
			console.log("点击了经验");
		},
		// 专业技能
		professional(){
			console.log("点击了专业技能");
		},
		// 技能证书
		certificate(){
			console.log("点击了技能证书");
		},
		// 自我评价
		evaluation(){
			console.log("自我评价");
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
		
	.onewidth{
		min-width: 30%;
	}
	.twowidth{
		min-width: 33%;
	}
	.threewidth{
		min-width: 28%;
	}
	
	/* 虚线边框 */
	.dashed{
		border: 1px dashed rgba(31,35,31,.4);
		margin: 10px;
		padding: 16px 0;
		border-radius: 12px;
	}
	.cemmder{
		margin-top: 7px;
		font-size: 8px;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		line-height: 14px;
	}
	.cemmd{
		font-size: 8px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: rgba(0,0,0,.6);
		
		line-height: 12px;
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
		/* margin-left: 16px; */
	}
	.box_aa{
		width: 16px;
		height: 16px;
		color: #1E8FC7;
	}
	.box_top{
		width: 63px;
		height: 63px;
		background:#D4D4D4 ;
		margin-top: 6px;
		margin-left: 6px;
	}
	.box_top2{
		width: 63px;
		height: 63px;
		background: #1E8FC7;
		margin-left: -70px;
		
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
		line-height: 12px;
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
