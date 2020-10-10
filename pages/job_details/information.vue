<template>
	<view class="box_bag">
		<view class="" style="background-color:#fff;padding-top: 44px;box-shadow: 1px 0px 0px rgba(170,170,170,.4);">
			<toptitle :title="title" @beback="beback"></toptitle>
		</view>
		<view class="box">
			<!-- 实习 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view>
					<view class="box_photo" style="text-align: right;" @click="upphoto">
						<view class="" v-if="photo == ''">
							<u-icon style="opacity: 0.5;margin: 13px;" name="camera-fill" size="28px" color="#fff"></u-icon>
						</view>
						<view class="imgUp" v-else>
							<image :src="photo" mode="aspectFill"></image>
						</view>
					</view>
					<!-- 姓名 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							姓名
						</view>
						<view class="flex" style="margin-right: 10px;">
							<view class="box_input" style="margin-right: 10px;">
								<input type="text" maxlength="14" v-model="surname" placeholder="姓" placeholder-class="box_pal" value="" />
							</view>
							<view class="box_input" style="margin-left: 10px;">
								<input type="text" maxlength="18" v-model="name" placeholder="名" placeholder-class="box_pal" value="" />
							</view>
						</view>
					</view>
					<!-- 性別 -->
					<view style="margin-top: 16px;" @click="sexFun();">
						<view class="box_title">
							性別
						</view>
						<view class="box_input flex" style="margin-right: 15px;" >
							<input style="flex: 1;" v-model="sexVal" disabled="true" type="text" placeholder="選擇性別" placeholder-class="box_pal" value="" />
							<u-icon style="margin-bottom: 5px;" name="arrow-right"></u-icon>
						</view>
					</view>
					
					<!-- 求職意向 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							求職意向
						</view>
						<view class="flex"  style="margin-right: 10px;">
							<view class="box_input"  style="margin-right: 10px;flex: 2;">
								<input type="text" maxlength="24" v-model="position" placeholder="輸入職位名稱" placeholder-class="box_pal" value="" />
							</view>
							<view class="box_input flex" style="margin-left: 10px;flex: 1;" @click="fullFun">
								<input disabled="true" type="text" v-model="fullVal" placeholder="全職" placeholder-class="box_pal" value="" />
								<u-icon style="margin-bottom: 5px;" name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					
					<!-- 期望薪資 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							期望薪資
						</view>
						<view class="flex" style="margin-right: 10px;">
							<view class="box_input flex" @click="moneyFun">
								<input style="margin-right: 60px;" type="text" disabled="false" v-model="lowmoney" placeholder="最低期望" placeholder-class="box_pal" value="" />
								<view style="margin-left: -60px;margin-right: 40px;">
									—
								</view>
								<input type="text" disabled="false" v-model="mostmoney" placeholder="最高期望" placeholder-class="box_pal" value="" />
								<u-icon style="margin-bottom: 5px;" name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
					<!-- 工作年限 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							工作年限
						</view>
						<view class="box_input flex" style="margin-right: 15px;" @click="yearFun();">
							<input style="flex: 1;" v-model="yearVal" disabled="true" type="text" placeholder="選擇工作年限" placeholder-class="box_pal" value="" />
							<u-icon style="margin-bottom: 5px;" name="arrow-right"></u-icon>
						</view>
					</view>
					
				</view>
			</view>


			<view class="box_one">
				<!-- 删除按钮 -->
				<view>
					<!-- 年齡 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							年齡
						</view>
						<view class="box_input flex" style="margin-right: 15px;" @click="ageFun();">
							<input style="flex: 1;" v-model="ageVal" disabled="true" type="text" placeholder="選擇年齡" placeholder-class="box_pal" value="" />
							<u-icon style="margin-bottom: 5px;" name="arrow-right"></u-icon>
						</view>
					</view>
					
					<!-- 郵箱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							郵箱
						</view>
						<view class="box_input" style="margin-right: 15px;" >
							<input type="text" v-model="mailbox" placeholder="請輸入郵箱" placeholder-class="box_pal" value="" />
						</view>
					</view>
					
					<!-- 所在地區 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							所在地區
						</view>
						<view class="box_input flex" style="margin-right: 15px;" @tap="address">
							<input style="flex: 1;" disabled="true" v-model="addressVal" type="text" placeholder="所在地區" placeholder-class="box_pal" value="" />
							<u-icon style="margin-bottom: 5px;" name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
			</view>
			
			<view class="box_btn">
				<bottombtn @goback="goback"></bottombtn>
			</view>
		</view>
		
		<u-mask :show="moneyShow" @click="moneyShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇薪资范围
					</view>
					
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 45px; height: 95px;text-align: center;" @change="lowTenthousandFun">
							    <picker-view-column>
							      <view  v-for='(item,index) in twoList' :class="[lowTenthousand==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>萬</view>
							    </picker-view-column>
							</picker-view>
						</view>
						<view class="hengshus">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 45px; height: 95px;text-align: center;" @change="lowThousandFun">
							    <picker-view-column>
							      <view  v-for='(item,index) in threeList_t' :class="[lowThousand==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>千</view>
							    </picker-view-column>
							</picker-view>
						</view>
						<view class="hengshus">
							
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 45px; height: 95px;text-align: center;" @change="lowHundredFun">
							    <picker-view-column>
							      <view  v-for='(item,index) in threeList_t' :class="[lowHundred==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>百</view>
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
							<picker-view mask-style="background:#fff" style="width: 45px; height: 95px;text-align: center;" @change="mostTenthousandFun">
							    <picker-view-column>
							      <view  v-for='(item,index) in twoList' :class="[mostTenthousand==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>萬</view>
							    </picker-view-column>
							</picker-view>
						</view>
						<view class="hengshus">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 45px; height: 95px;text-align: center;" @change="mostThousandFun">
							    <picker-view-column>
							      <view  v-for='(item,index) in threeList_t' :class="[mostThousand==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>千</view>
							    </picker-view-column>
							</picker-view>
						</view>
						<view class="hengshus">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 45px; height: 95px;text-align: center;" @change="mostHundredFun">
							    <picker-view-column>
							      <view  v-for='(item,index) in threeList_t' :class="[mostHundred==index?'iscole':'iscolesa']"><span style="margin-right: 5px;">{{index}} </span>百</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>

				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="moneyOut()"><span class="tagButtom">确定</span></view>
			</view>
		</u-mask>
		
		<u-mask :show="yearShow" @click="yearShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇工作經驗
					</view>
					
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<!-- 定位 -->
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 90px; height: 95px;text-align: center;" @change="yearChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in yearList' :class="[isyear==index?'iscole':'iscolesa']">{{item}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								年
							</view>
						</view>
					</view>
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="yearOut()"><span class="tagButtom">确定</span></view>
			</view>
		</u-mask>
		
		
		<u-mask :show="ageShow" @click="ageShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇年齡
					</view>
					
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<!-- 定位 -->
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 90px; height: 95px;text-align: center;" @change="ageChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in ageList' v-if="item>15" :class="[isage==index?'iscole':'iscolesa']">{{item}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								歲
							</view>
						</view>
					</view>
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="ageOut()"><span class="tagButtom">确定</span></view>
			</view>
		</u-mask>

		<u-mask :show="fullShow" @click="fullShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇職位類別
					</view>
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<!-- 定位 -->
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 90px; height: 95px;text-align: center;" @change="fullChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in fullList' :class="[isfull==index?'iscole':'iscolesa']">{{item}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="fullOut()"><span class="tagButtom">确定</span></view>
			</view>
		</u-mask>
		
		<u-mask :show="sexShow" @click="sexShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇性别
					</view>
					
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<!-- 定位 -->
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 90px; height: 95px;text-align: center;" @change="sexChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in sexList' :class="[issex==index?'iscole':'iscolesa']">{{item}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="sexOut()"><span class="tagButtom">确定</span></view>
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
				//压屏框
				outMaskShow: false,
				//名字
				surname:"",
				name:"",
				// 性别
				sexList:["男","女"],
				issex:0,
				sexVal:"",
				sexShow:false,
				//求职意向
				position:"",
				isfull:0,
				fullVal:"",
				fullList:["全職","兼職"],
				fullShow:false,
				//金额
				//最低金额
				lowmoney:"",
				mostmoney:"",
				moneyShow:false,
				
				lowTenthousand:0,//薪资要求
				lowThousand:0,//薪资要求
				lowHundred:0,//薪资要求
				mostTenthousand:0,//薪资要求
				mostThousand:0,//薪资要求
				mostHundred:0,//薪资要求
				
				twoList:31, // 年资要求
				threeList_t:10,  //薪水要求千 百
				
				//年龄
				ageVal:"",
				ageShow:false,
				ageList:60,
				isage:15,
				
				//工年
				yearVal:"",
				yearShow:false,
				yearList:60,
				isyear:0,
				
				//地址
				addressVal:"",
				photomsg:"",
				
				photo:"",
				isphoto:false,
				title:"基本信息", 
				biglength:80,
				
				//邮箱
				mailbox:"",
			}
		},
		onLoad(option) {
			console.log("进入了单个页面渲染了");
			
			if(option.query && JSON.parse(option.query).data){
				let a = JSON.parse(option.query).data
				console.log(a);
				this.name = a.first_name;
				this.surname = a.family_name;
				this.sexVal = this.sexList[a.sex-1]
				this.photomsg = a.photo;
				this.photo = this.$pubFuc.advertising(a.photo);
				this.position = a.title;
				this.fullVal = this.fullList[a.resume_type - 1];
				this.mailbox = a.email;
				this.addressVal = a.address;
				this.lowmoney = a.salary_start;
				this.mostmoney = a.salary_end;
				this.yearVal = a.work_experience;
				this.ageVal = a.age
			}
			
		},
		components: {
			toptitle,
			bottombtn
		},
		methods:{
			//上传照片
			upphoto(){
				console.log("点击上传照片");
				const that = this;
				uni.chooseImage({
				 count: 1,
				 sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				 sourceType: ['album'], //从相册选择
				 success: function (res) {
					// console.log(res);
					that.photo = res.tempFilePaths[0];
					that.isphoto = true;
				 },
				 error : function(e){
				 }
				});
			},
			//性别
			sexFun(){
				//点击性别选择
				this.sexShow = true;
			},
			sexChange(e){
				//选择性别
				this.issex = e.detail.value[0];
			},
			sexOut(){
				//关闭压屏窗
				this.sexShow = false;
				this.sexVal = this.sexList[this.issex];
			},
			//全职或者兼职
			fullFun(){
				// console.log("全职");
				this.fullShow = true;
			},
			fullChange(e){
				//选择
				this.isfull = e.detail.value[0];
			},
			fullOut(){
				console.log();
				//关闭压屏窗
				this.fullShow = false;
				this.fullVal = this.fullList[this.isfull];
			},
			//金额
			moneyFun(){
				this.moneyShow = true;
			},
			//薪资要求
			lowTenthousandFun(e){
				this.lowTenthousand = e.detail.value[0];
			},
			lowThousandFun(e){
				this.lowThousand = e.detail.value[0];
			},
			lowHundredFun(e){
				this.lowHundred = e.detail.value[0];
			},
			mostTenthousandFun(e){
				this.mostTenthousand = e.detail.value[0];
			},
			mostThousandFun(e){
				this.mostThousand = e.detail.value[0];
			},
			mostHundredFun(e){
				this.mostHundred = e.detail.value[0];
			},
			moneyOut(){
				// console.log("获取薪资范围");
				this.moneyShow = false;
				const a = this.lowTenthousand*10000 + this.lowThousand*1000 + this.lowHundred*100;
				const b = this.mostTenthousand*10000 + this.mostThousand*1000 + this.mostHundred*100;
				if(a>b){
					this.lowmoney = b;
					this.mostmoney = a;
				}else{
					this.lowmoney = a;
					this.mostmoney = b;
				}
			},
			
			//年龄
			ageFun(){
				this.ageShow = true;
			},
			ageChange(e){
				//选择
				this.isage = e.detail.value[0] + 15;
			},
			ageOut(){
				//关闭压屏窗
				this.ageShow = false;
				this.ageVal = this.isage+1;
			},
			//工年
			yearFun(){
				this.yearShow = true;
			},
			yearChange(e){
				//选择
				this.isyear = e.detail.value[0];
			},
			yearOut(){
				//关闭压屏窗
				this.yearShow = false;
				this.yearVal = this.isyear+1;
			},
			//选择地区
			address(){
				const that = this;
				uni.chooseLocation({
					success: (res) => {
						console.log(res);
						let regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
						let addxress = regex.exec(res.address);
						console.log(addxress);
						if(addxress){
							that.addressVal = addxress[1];
						}else{
							that.addressVal = res.address;
						}
						
					}
				})
			},
			//上传图片
			//上传图片
			async tophoto(png){
				const that = this
				console.log(png);
				//判断图片是否需要上传
				if(this.isphoto){
					const phot =  await this.$minApi.uptopo(png,"file");
					console.log(phot);
					this.photomsg = phot;
				}
				// return phot;
			},
			async goback(){
				//上传头像
				if(this.photo == ""){
					this.$pubFuc.showToast("請上傳圖片");
					return
				}
				//判断有没有填入信息
				if(this.surname == ""){
					this.$pubFuc.showToast("請輸入姓氏");
					return
				}
				if(this.name == ""){
					this.$pubFuc.showToast("請輸入名字");
					return
				}
				if(this.sexVal == ""){
					this.$pubFuc.showToast("請選擇性別");
					return
				}
				if(this.position == ""){
					this.$pubFuc.showToast("請輸入求職意向");
					return
				}
				if(this.fullVal == ""){
					this.$pubFuc.showToast("請選擇職位類型");
					return
				}
				if(this.lowmoney == "" && this.mostmoney == ""){
					this.$pubFuc.showToast("請選擇薪資範圍");
					return
				}
				if(this.yearVal == ""){
					this.$pubFuc.showToast("請選擇工作年限");
					return
				}
				if(this.ageVal == ""){
					this.$pubFuc.showToast("請選擇年齡");
					return
				}
				console.log(this.mailbox);
				if(this.mailbox == ""){
					this.$pubFuc.showToast("請輸入郵箱");
					return
				}
				const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
				if(!reg.test(this.mailbox)){ //正则验证不通过，格式不对
					this.$pubFuc.showToast('郵箱格式不正確');
					return
				}
				
				if(this.addressVal == ""){
					this.$pubFuc.showToast("請選擇地址")
					return
				}
				await this.tophoto(this.photo);
				//开始上传图片
				let rendering = {};
				rendering.type =  0;//代表证书获奖
				rendering.photo = this.photomsg; //图片
				rendering.title = this.position; //职位名称
				rendering.resume_type = this.isfull+1; //全职还是兼职
				rendering.family_name = this.surname; //姓
				rendering.first_name = this.name;  //名
				rendering.sex = this.issex+1; //性别
				rendering.age = this.ageVal;  //年龄
				rendering.mobile = uni.getStorageSync('user').mobile;
				rendering.email = this.mailbox; //邮箱
				
				rendering.address = this.addressVal;//详细地址
				rendering.salary_start = this.lowmoney; //最低薪资
				rendering.salary_end = this.mostmoney;  //最高薪资
				rendering.work_experience = this.yearVal; //工作年限
				console.log(rendering);
				uni.setStorage({
					key:'details',
					data:JSON.stringify(rendering)
				})
				uni.navigateBack();
			},
			beback(){
				// console.log("执行了");
				uni.navigateBack();
			},
		}
	}
</script>
<style scoped>
	.red{
		color: red!important;
	}
	.hengshus{
		width: 1px;
		height: 32px;
		background: #0E320D;
		opacity: 0.2;
		margin:0 20px;
	}
	.hengxan{
		margin: 15px 30px;
		width:calc(100% - 60px) ;
		height: 1px;
		background: #0E320D;
		opacity: 0.2;
	}
	
	
	.imgUp{
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
	.imgUp image{
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
	.box_photo{
		margin: 0 auto;
		width: 139px;
		height: 138px;
		background: #EAEAEA;
		border-radius: 8px;
	}
	.islebpo{
		width: 11px;
		height: 14px;
		position: absolute;
		left: 45px;
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
	
	.hengshu{
		width: 1px;
		height: 32px;
		background: #0E320D;
		opacity: 0.2;
		margin: 0 20px 0 20px;
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
	.border{
		padding: 24px 35px!important;
		margin: 0 10px;
		min-height: 120px;
		background: rgba(255, 255, 255, 1)!important;
		border-radius: 20px;
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
