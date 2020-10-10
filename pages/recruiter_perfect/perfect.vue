<template>
	<view class="mod_login" :style="{ backgroundImage: 'url(' + backimg + ')' }">
		<view class="bakr" v-if="loading">
			<view class="mid_bla">
				<u-loading mode="flower" size="80" color="#000"></u-loading>
			</view>
		</view>
		<loginTopbackMove :top_center="top_center" @forgect="forgect"></loginTopbackMove>
		<!-- center -->
		
		<view class="main">
			<view class="backgroundWrap">
				<view class="center_index" v-if="isperfect">
					<view class="flex_one">
						<view class="tit">
							<view class="onetit">
								完善機構信息
							</view>
							<view class="onecenter">
								以下信息將被認證
							</view>
						</view>
						<view class="head_img">
							<image :src="photo" mode="" @click="upload"></image>
						</view>
					</view>
					<!-- 机构名称 -->
					<view class="tct" :class="{err_red:mechanism.bool}">
						<view class="tct_tit">
							機構名稱
						</view>
						<view class="tct_in">
							<u-input :placeholder-style="pstyle" @blur="isnof(mechanism)" v-model="mechanism.val" type="text" placeholder="請輸入機構全名"/>
						</view>
					</view>
					
					<view class="tct" :class="{err_red:industry.bool}">
						<view class="tct_tit" >
							行業
						</view>
						<view class="tct_in flex" @click="toindustry">
							<!-- <u-input :placeholder-style="pstyle" :disabled="disabled" @blur="isnof(industry)" v-model="industry.val" type="text" placeholder="請選擇機構所屬行業"/> -->
							<view class="flawe" v-if="industry.id == null">
								請選擇機構所屬行業
							</view>
							<view class="flawe bla" >
								{{industry.val}}
							</view>
							<u-icon name="arrow-right" size="12"></u-icon>
						</view>
					</view>
					
					<view class="tct" :class="{err_red:register.bool}">
						<view class="tct_tit">
							註冊登記號碼
						</view>
						<view class="tct_in" >
							<u-input :placeholder-style="pstyle" v-model="register.val" @blur="isnof(register)" type="text" placeholder="稅號或政府註冊登記號"/>
						</view>
					</view>
					
					<view class="flex">
						<view class="tct zuo" style="flex: 1;" :class="{err_red:na.bool}">
							<view class="tct_tit">
								管理員姓名
							</view>
							<view class="tct_in" >
								<u-input :placeholder-style="pstyle" @blur="isnof(na)" v-model="na.val" type="text" placeholder="姓"/>
							</view>
						</view>
						<view class="tct lef" style="flex: 2;" :class="{err_red:me.bool}">
							<view class="tct_tit">
							</view>
							<view class="tct_in">
								<u-input :placeholder-style="pstyle" @blur="isnof(me)" v-model="me.val" type="text" placeholder="名"/>
							</view>
						</view>
					</view>
					<view class="tct brna" :class="{err_red:mailbox.bool}">
						<view class="tct_tit">
							機構郵箱
						</view>
						<view class="tct_in">
							<u-input :placeholder-style="pstyle" @blur="isnof(mailbox)" v-model="mailbox.val" type="text" placeholder="請輸入機構郵箱"/>
						</view>
					</view>
				</view>
				<!-- 行业 -->
				<view class="center_index flex"  v-if="!isperfect">
					<picker-view indicator-style="height: 45px;" style="width: 50%; height: 190px;text-align: center;"  @change="businesschange">
					    <picker-view-column>
					      <view v-if="!isperfect" v-for='(item,index) in inessList' style="line-height: 45px">{{item.name}}</view>
					    </picker-view-column>
					</picker-view>
					<picker-view indicator-style="height: 45px;" style="width: 50%; height: 190px;text-align: center;"  @change="businesssonchange">
					    <picker-view-column>
					      <view v-if="!isperfect" v-for='(item,index) in inesssonList[inessIndex]' style="line-height: 45px">{{item.name}}</view>
					    </picker-view-column>
					</picker-view>
				</view>
				<bigBtn style="margin: 0 5px;" @goback="goback"></bigBtn>
			</view>
		</view>
	</view>
</template>

<script>
	import loginTopbackMove from 'components/login/login_topback.vue';
	import bigBtn from 'components/login/bottom.vue';
	export default{
		name:"perfect",
		data(){
			return {
				loading:false,
				islogin:true,//是否是登录
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				value: [],
				// photo:"http://wx.newjobbase.com/storage/upload/23dcfd21d56eebb2cb781a6358726e41.HEIC",
				photo:"/static/images/timg.jpg",
				pas:"",
				tel:"",
				top_center:"完善信息",
				backimg:"",
				pstyle:"color:rgba(14,36,27,0.3);font-size:12px;",
				isperfect:true,//是否显示完善信息还是选择机构
				// alliness:[],//二级联动数组
				inessList:[],//行业数组
				inesssonList:[],
				inessIndex:0,
				inesssonIndex:0,
				mechanism:{
					val:"",
					bool:false,
				},//机构
				industry:{
					val:"",
					id:null,
					bool:false,
				}, // 行业
				register:{
					val:"",
					bool:false,
				}, // 登记号码
				na:{
					val:"",
					bool:false,
				}, //姓
				me:{
					val:"",
					bool:false,
				}, //名
				mailbox:{
					val:"",
					bool:false,
				}, //邮箱
			}
		},
		components:{
			loginTopbackMove,
			bigBtn
		},
		onLoad(option){
			const that = this;
			uni.getStorage({
				key:"photo",
				success(e){
					that.backimg = that.$pubFuc.advertising(e.data.filter((res)=>{
							return res.title == "首页广告"
						})[0].img);
				}
			});
			this.businessList();
			if(JSON.parse(option.query).pas && JSON.parse(option.query).tel){
				this.islogin = false;
				// console.log(JSON.parse(option.query).pas);
				this.pas = JSON.parse(option.query).pas;
				this.tel = JSON.parse(option.query).tel;
			}
		},
		methods:{
			//上传图片到本地
			upload : function(){
			   const that = this;
			   uni.chooseImage({
			    count: 1,
			    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					that.photo = res.tempFilePaths[0];
			    },
			    error : function(e){
			    }
			   });
			  },
			  //选择机构
			businesschange(e){
				this.inessIndex = e.detail.value[0]
			},
			businesssonchange(e){
				this.inesssonIndex = e.detail.value[0]
			},
			//获取行业
			businessList(){
				this.$minApi.businessList().then((res)=>{
					this.inessList = res.data.map((res)=>{
						return res
					})
					this.inesssonList = res.data.map((res)=>{
						return res.son_list
					})
				});
			},
			
			//点击了返回
			forgect(){
				if(this.isperfect){
					uni.navigateBack();
				}else{
					this.isperfect = true;
					this.top_center = "完善信息";
				}
				
			},
			//验证是否有值
			isnof(val){
				if(val.val == ""){
					val.bool = true
				}else{
					val.bool = false
				}
			},
			//完善机构
			company(resa,id){
				const that = this;
				this.$minApi.company(
					{
						logo:resa,
						name:this.mechanism.val,
						business_id:this.industry.id,
						register_info:this.register.val,
						family_name:this.na.val,
						first_name:this.me.val,
						email:this.mailbox.val,
					},id).then((res)=>{
						that.loading = false;
						that.$openPage('recruiterindex');
					})
					
				// console.log("");
			},
			//点击确定
			goback(){
				const that = this;
				
				if(this.isperfect){
					this.loading = true;
					//检查是否有上传机构图片
					if(this.photo == "static/images/timg.jpg"){
						that.$pubFuc.showToast('請上傳機構圖片');
						that.loading = false;
						return 
					}
					if(!this.mailbox.bool && !this.me.bool && !this.na.bool && !this.register.bool && !this.industry.bool && !this.mechanism.bool){
						const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
						if(!reg.test(this.mailbox.val)){ //正则验证不通过，格式不对
							this.$pubFuc.showToast('郵箱格式不正確');
							that.loading = false;
							return
						}
						//上传图片
						
						that.$minApi.uptopo(that.photo,"file").then((resa)=>{
							if(resa == -1){
								this.$pubFuc.showToast('圖片上傳失敗,請重新上傳');
								that.loading = false;
								return
							}
							if(that.islogin){
								//这里一定是应聘者登录
								that.$minApi.addcompany().then((res)=>{
									//企业id
									uni.getStorage({
										key:"user",
										success(e){
											that.$minApi.menberpassword({company_id:res.data.id},e.data.id);
											that.company(resa,res.data.id);
										}
									})
								})
								
							}else{
								console.log("这是注册的")
								//注册账号然后补充信息
								that.$minApi.register({mobile:that.tel,password:that.pas,type:2}).then((res)=>{
									uni.setStorage({
										key:"user",
										data:res.data
									})
									//开始完善机构
									that.company(resa,res.data.company_id);
								});
							}
						});
					}else{
						that.loading = false;
						// 请完善信息
						this.isnof(this.mailbox);
						this.isnof(this.me);
						this.isnof(this.na);
						this.isnof(this.register);
						this.isnof(this.industry);
						this.isnof(this.mechanism);
						this.$pubFuc.showToast('請完善信息');
					}
				}else{
					this.top_center = "完善信息";
					this.isperfect = true;
					this.industry.bool = false;
					if(this.inesssonList[this.inessIndex]){
						this.industry.val =this.inessList[this.inessIndex].name+ "-" +this.inesssonList[this.inessIndex][this.inesssonIndex].name;
						this.industry.id = this.inesssonList[this.inessIndex][this.inesssonIndex].id
					}else{
						this.industry = this.inessList[this.inessIndex].name;
						this.industry.id = this.inessList[this.inessIndex].id
					}
				}
			},
			//点击了选择行业
			toindustry(){
				this.top_center = "選擇行業";
				this.isperfect = false;
			},
			
		},
	}
</script>

<style scoped>
	/* 没有验证红色 */
	.err_red{
		/* color: red; */
		border-bottom:1px solid rgba(230,24,24,0.8)!important;
	}
	
	.bla{
		color: #000!important;
	}
	
	.flawe{
		width: 100%;
		color:rgba(14,36,27,0.3);font-size:12px;
		line-height: 35px;
	}
	
	.main {
		display: flex;
		width: 100%;
		position: absolute;
		bottom: 40px;
	}
	.backgroundWrap {
		width: calc(100% - 20px);
		display: flex;
		flex-direction: column;
		margin: 0 10px;
		z-index: 11;
	}
	.center_index {
		margin-bottom: 3px;
		border-radius: 16px;
		padding: 30px 30px 20px 20px;
	}
	.center_index::before {
		opacity: 0.9;
		border-radius: 16px;
		background: #fff!important;
	}
	.head_img{
		width: 60px;
		height: 60px;
	}
	.flex_one{
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
	}
	.head_img image{
		border-radius:4px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.tit{
		margin: 5px 0;
	}
	.onetit{
		font-size:24px;
		letter-spacing: 1px;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(33,53,45,1);
		line-height:33px;
	}
	.onecenter{
		font-size:12px;
		letter-spacing: 1px;
		font-family:PingFangTC;
		color:rgba(33,53,45,1);
		line-height:17px;
	}
	.tct{
		font-size:12px;
		font-family:PingFangTC;
		color:rgba(33,53,45,1);
		line-height:17px;
		border-bottom:1px solid rgba(27,36,38,0.2);
	}
	.tct_tit{
		margin: 15px 0 -2px 5px;
	}
	.tct_in{
		margin: 0 0 0px 5px;
		font-size:12px !important;
		font-family:PingFangTC;
		color:rgba(14,36,27,1);
		line-height:15px;
		letter-spacing: 1rpx;
	}
	.lef{
		margin-left: 20px;
		margin-top: 17px;
	}
	.brna{
		margin-bottom: 10px;
	}
	.bakr{
		/* background-color: #fff; */
		background-color:rgba(255,255,255,0.4);
		opacity: 0.6;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
		display: flex;
		align-items: center;
		/* text-align: center; */
		/* margin: 0 auto; */
	}
	.mid_bla{
		width: 100%;
		opacity: 1!important;
		margin: 0 auto;
		text-align: center;
	}
</style>
