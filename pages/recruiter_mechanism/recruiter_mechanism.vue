<template>
    
	<view class="mid" :style="topbg ? 
        { backgroundImage: 'url('+topbg+')', backgroundSize: 'cover' } : 
        { background: 'linear-gradient(179deg, rgba(27, 51, 101, 0) 20%, rgba(32, 66, 130, 0.32) 100%)' }">
		<!-- 这是机构 -->
		<view>
			<div class="topcenter">
				<view class="icon_close" style="text-shadow: 1px 0px 1px #ccc;" @click="forgect"><u-icon name="arrow-left" color="#243557" size="30"></u-icon></view>
				<span style="color: #243557;text-shadow: 1px 0px 1px #ccc;" class="txtqac">{{ top_center }}</span>
			</div>
		</view>
		<view class="qqc_io">
			<!-- 大的照相机 -->
			<view class="top_photo" @click.stop="upphoto">
				<image :src="bga" mode="scaleToFill"></image>
			</view>
			<view class="posi_title">
				<view class="photosmal" @click="uplogo">
					<image :src="photologo" mode="aspectFit"></image>
				</view>
				<view class="box_right">
					<view class="flex" style="width: 100%;justify-content: space-between;align-items: center;">
						<view class="title_name">
							{{company.name}}
						</view>
					</view>
					<view class="title_center">
						{{businessvalue}}
					</view>
				</view>
			</view>
			
			<view class="box_btn">
				<view class="topbt">
				</view>
				<!-- 公司简介 -->
				<view class="">
					<view class="flex gsjj" >
						<view class="title_nme">
							公司簡介
						</view>
						<view class="bigbtn" @click="onecl('公司简介')">
							<u-icon name="arrow-right" color="#243557" size="26"></u-icon>
						</view>
					</view>
					<view class="center_q" @click="onecl('公司简介')">
						<!-- 显示时候 -->
						<view  v-if="true" class="center_text">
							<!-- 没有输入内容的 -->
							<view style="opacity: 0.2;" v-if="company.desc == null">
								None
							</view>
							<!-- 有内容的时候 -->
							<view v-else>
                                <text>{{company.desc}}</text>
							</view>
						</view>
						<!-- 输入时候 -->
						<view v-if="false">
							
						</view>

						<view class="t_hxa">
							
						</view>
					</view>
				</view>
				<!-- 公司照片 -->
				<view class="">
					<view class="flex gsjj" >
						<view class="title_nme">
							公司照片
						</view>
						<view class="">
						</view>
					</view>
					<view class="center_q" style="margin-top: 10px;display: flex;overflow-x:auto;overflow-y:hidden;" >
						<view class="photo_box" @click="addphoto(-1)">
							<view class="po_imag">
								<image src="/static/images/addpotr.png" mode="aspectFill"></image>
							</view>
							<view class="phoyo_co">
								Add photos
							</view>
						</view>
						<view class="photo_box" v-for="(item,index) in imgList" :key="index" @click="addphoto(index)">
							<image :src="item" alt="" mode="aspectFill">
						</view>
					</view>
				</view>
				<!-- 公司地址 -->
				<view class="">
					<view class="flex gsjj">
						<view class="title_nme">
							公司地址
						</view>
						<view class="bigbtn" @tap="chooseLocation">
							<u-icon name="arrow-right" color="#243557" size="26"></u-icon>
						</view>
					</view>
					<view class="center_q" @tap="chooseLocation">
						<view class="center_text">
							<view style="opacity: 0.2;" v-if="!addressbool">
								None
							</view>
							<view class="" v-else>
								<!-- 这里有内容的时候 -->
								<!-- 图标的 -->
								<view>
									<!-- 这里是map地图 -->
									<map v-if="!filter" class="map_mp" scale="15" 
                                        :latitude="company.lat" :longitude="company.lng" 
                                        :markers="[{latitude: company.lat, longitude: company.lng, label: {content:company.name,bgColor:'white',padding:5}}]"
                                    ></map>
								</view>
								<view style="margin-top: 10px;">
									<u-icon name="map-fill" color="rgba(36,53,87,0.5)" size="36"></u-icon>
									<span style="color: rgba(36,53,87,0.5);margin-left: 8px;
										font-size: 12px;
										font-family: PingFangTC-Regular, PingFangTC;
										font-weight: 400;
										opacity: ;
										line-height: 17px;">
										{{company.address}}
									</span>
								</view>
							</view>
						</view>
						<view class="t_hxa">
							
						</view>
					</view>
				</view>
				
				<!-- 更多訊息 -->
				<view class="">
					<view class="flex gsjj">
						<view class="title_nme">
							更多訊息
						</view>
						<view class="bigbtn" @click="ismore">
							<u-icon name="arrow-right" color="#243557" size="26"></u-icon>
						</view>
					</view>
					
					<view class="center_q" @click="ismore">
						<view class="center_text">
							<view style="opacity: 0.2;" v-if="company.more_desc == null">
								None
							</view>
							<view class="" v-else>
								<text>{{company.more_desc}}</text>
							</view>
						</view>
						<view class="t_hxa">
							
						</view>
					</view>
				</view>
				
				<!-- 按钮确定 -->
				<view class="" style="margin: 28px 48px 32px 48px;">
					<view class="tagWrapButtom" @click="isokar()">
						<view :style="{'margin-left':(toup?'-20px':'0px')}">
							<u-loading mode="flower" :show="toup" size="30px" color="#fff"></u-loading>
						</view>
						<!-- :style="{color:(index==0?conFontColor:'#000')}" -->
						<span class="tag">確定</span>
					</view>
				</view>
			</view>
		</view>
		<popup :filter="filter" :conter="popupcenter" :title="popuptitle" @closePopup="closePopup" @responsibilitiesSubmit='responsibilitiesSubmit'></popup>
	</view>
</template>
<script>
import loginTopbackTwoMove from 'components/login/login_topbacktwo.vue';
import popup from 'components/recruiter/popup_company.vue'
export default {
  data() {
    return {
	  top_center: '機構信息',
	  topbg:"",
	  photologo:"/static/images/camera.png",
	  bga:"/static/images/camera.png",
	  // top_center: '机构信息',
	  filter: false,
	  filtermo:false,
	  popuptitle:"",
	  popupcenter:"",
	  
	  businessvalue:"",
	  imgList:[],
	  company:{
	  },
	  toup:false,
	  addressbool:false,//是否有地图
    };
  },
  onLoad() {
	  // console.log();
	  this.getcompany();
  },
  components:{
	  loginTopbackTwoMove,
	  popup
  },
  methods: {
	  //地图启用
	  chooseLocation: function () {
		  const that = this;
	  	uni.chooseLocation({
	  		success: (res) => {
				// console.log(res);
				that.addressbool = true;
				that.company.lat = res.latitude;
				that.company.lng = res.longitude;
				that.company.address = res.address;
				console.log(that.company);
	  		}
	  	})
	  },
	  
	  getcompany(){
		  const that = this;
		  try{
			//企业id
		  	const value = uni.getStorageSync('user');
            console.log('user',value);
			//获取企业内容
			this.$minApi.getcompany(value.company_id).then((res)=>{
				// console.log(res.data.address);
				if(res.data.address == null){
					that.addressbool = false;
				}else{
					that.addressbool = true;
				}
				res.data.logo == null?"":that.photologo = that.$pubFuc.advertising(res.data.logo);
				res.data.bg == null?"":that.topbg = that.$pubFuc.advertising(res.data.bg);
				
                if(res.data.img){
                    that.imgList = res.data.img.split(",").map((resa)=>{
                        return that.$pubFuc.advertising(resa)
                    });
                }
				that.company = res.data
				that.businessid(res.data.business_id);
			})
		  }catch(e){
			  console.log(e);
		  }
	  },
	  
	  //行业id转译
	  businessid(id){
		  const that = this
		  this.$minApi.businessone(id).then((res)=>{
			  that.businessvalue = res.data.name
		  });
	  },
	  //添加职业图片
	  addphoto(num){
		const that = this;
		let count;
		num == -1?count = 9:count = 1;
		uni.chooseImage({
			count: count,
			sizeType: ['compressed'], // 可以指定是原图还是压缩图,默认二者都有
			sourceType: ['album'], // 从相册选择
			success: function (res) {
				// console.log(res);
				// console.log("成功上传图片");
				if(num == -1){
					that.imgList = that.imgList.concat(res.tempFilePaths);
				}else{
					that.$set(that.imgList,num,res.tempFilePaths[0])
				}
			},
			error: function (e){
				
			}
		})
	  },
	  forgect() {
	  	uni.navigateBack();
	  },
	  //上传背景图
	  upphoto(){
		 // console.log("这里上传图片"); 
		 const that = this;
		 uni.chooseImage({
		  count: 1,
		  sizeType: ['compressed'], // 可以指定是原图还是压缩图,默认二者都有
		  sourceType: ['album'], // 从相册选择
		  success: function (res) {
			  console.log(res.tempFilePaths[0]);
			  // console.log("成功上传背景图片");
		      that.topbg = res.tempFilePaths[0];
              that.tophoto(that.topbg,1);
		  },
		  error : function(e){
			 // 带了到时候不知道啊
		  }
		 });
		 
	  },
	  // 上传logo图
	  uplogo(){
		  // console.log("这里上传图片");
		  const that = this;
		  uni.chooseImage({
		   count: 1,
		   sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
		   sourceType: ['album'], //从相册选择
		   success: function (res) {
		  			  that.photologo = res.tempFilePaths[0];
		   },
		   error : function(e){
		   }
		  });
	  },
	  //弹出窗口
	  closePopup(){
	  		  this.filter = false;
	  		  this.filtermo = false;
	  },
	  responsibilitiesSubmit(val,type) {
			console.log(val);
			console.log(type);
	  		this.filter = false;
			if(type == "公司简介"){
				this.company.desc = val;
			}
			if(type == "更多讯息"){
				this.company.more_desc = val
			}
	  },
	  // 公司简介
	  onecl(val){
		  // console.log("这是公司简介");
		  this.filter = true;
		  // 简介标题
		  this.popuptitle = "公司简介"
		  this.popupcenter = this.company.desc;
	  },
	  // 更多讯息
	  ismore(){
		  // console.log("这是更多讯息");
		  this.filter = true;
		  // 简介标题
		  this.popuptitle = "更多讯息" //more_desc
		  this.popupcenter = this.company.more_desc;
		  
	  },
	  //上传图片
	  async tophoto(png,num){
		  const that = this
		  // png
		  console.log(png);
		  if(png == "/static/images/camera.png" || png == "" || png.startsWith('http')){
			  // console.log("无此图不需要上传");
			  return
		  }
		  await this.$minApi.uptopo(png,"file").then((res)=>{
			  if(res == -1){
				  return;
			  }
			  if(num == 1){
				  that.company.bg = res
                  that.topbg = that.$pubFuc.advertising(res)
			  }
			  if(num == 2){
			  		that.company.logo = res
			  }
			  if(num == 3){
				  if(that.company.img == null){
					  that.company.img = [];
				  }
				  that.company.img.push(res)
			  }
		  })
	  },
	  //最终提交
	   async isokar(){
		if(this.toup) return
		this.toup = true;
		//判断有没有地址和简介
		if(!this.addressbool){
			//请选择公司地址
			this.$pubFuc.showToast("請選擇公司地址");
			return 
		}
		if(this.company.desc == null){
			//输入公司简介
			this.$pubFuc.showToast("輸入公司簡介");
			return 
		}
		try{
			await this.tophoto(this.topbg,1);
			await this.tophoto(this.photologo,2);

			// 系列图上传
			for(var i= 0 ;i<this.imgList.length;i++){
				await this.tophoto(this.imgList[i],3);
			}
			//开始上传
			if(this.company.img){
				this.company.img = this.company.img.toString();
			}
			delete this.company.business_id;
			delete this.company.created_at;
			delete this.company.updated_at;
			this.$minApi.company(this.company,this.company.id).then((res)=>{
				if(res.code == 0){
					this.$pubFuc.showToast("信息更新成功");
					//返回上一页
					uni.navigateBack();
				}else{
					this.$pubFuc.showToast("信息更新失败请从新提交");
				}
			});
			this.toup = false;
		}catch(e){
			this.$pubFuc.showToast("信息更新失败请从新提交");
		}
	  		
	  },
  },
};
</script>
<style scoped>
	uni-page-body {
		background-color: #F1F3F6;
	}
	body,
	html {
		background-color: #F1F3F6;
	}
	.bigbtn{
		padding:2px 10px;
	}
	.groupback {
		text-align: center;
	}
	.icon {
		width: 10px;
		height: 16px;
	}
	
	.topcenter {
		position: relative;
		width: 100%;
		text-align: center;
		padding-top: 50px;
	}
	.icon_close {
		position: absolute;
		top: 48px;
		left: 30px;
	}
	.addmore{
		height: 74px;
		border-radius: 10px;
		opacity: 0.2;
		border: 1px solid #243557;
	}
	.tagWrap {
		display: flex;
		position: relative;
		align-items: center;
		align-self: center;
		flex-direction: row;
		justify-content: center;
		margin-top: 15px;
		border-radius: 16px;
		background-image: linear-gradient(0deg, #1ceeaf 0%, #079742 100%);
		width: calc(100%);
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
	.tag {
		max-width: 303px;
		height: 17px;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 17px;
		white-space: nowrap;
		color: #ffffff;
		font-size: 12px;
		font-weight: 500;
	}
	.top_photo{
		margin: 30px 20px;
		width:calc(100% - 40px);
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.photosmal{
		background: #EEEEEE;
		margin-top: 1px;
		max-width: 86px;
        width:86px;
		height: 64px;
		/* padding: 20px 0; */
		border-radius: 16px;
	}
	.photosmal image{
		border-radius: 16px;
		width: 100%;
		height: 100%;
		
/* 		object-fit: cover; */
	}
	.top_photo image{
		width: 28px;
		height: 24px;
		padding: 18px;
	}
	.posi_title{
		display: flex;
		margin: 0 30px;
		width: calc(100% - 60px);
	}
	.box_right{
		margin-left: 16px;
		width: 100%;
	}
	.title_name{
		margin-top: 7px;
		font-size: 18px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 25px;
		text-shadow: 1px 1px 1px #ccc;
	}
	.title_center{
		margin-top: 4px;
		font-size: 12px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 17px;
		text-shadow: 1px 1px 1px #ccc;
	}
	.box_btn{
		margin-top: 20px;
		padding: 12px 0;
		width: 100%;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 32px 32px 0px 0px; 
	}
	.topbt{
		margin: 0 auto;
		width: 48px;
		height: 6px;
		background: #E5E7EA;
		border-radius: 3px;
	}
	.gsjj{
		margin: 30px 38px 0 38px;
		width:calc(100% - 76px);
		justify-content: space-between;
		align-items: center;
	}
	.title_nme{
		font-size: 12px;
		font-family: PingFangTC-Medium, PingFangTC;
		font-weight: 500;
		color: #243557;
		letter-spacing: 1px;
		line-height: 17px;
	}
	.t_hxa{
		width: 100%;
		height: 1px;
		background: #243557;
		opacity: 0.2;
	}
	.center_q{
		margin: 0 32px;
		/* display: flex; */
	}
	.center_text{
		margin: 5px 10px 10px 5px;
		font-size: 12px;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #243557;
		line-height: 17px;
	}
	.photo_box{
		min-width: 93px;
		max-width: 93px;
		height: 82px;
		border-radius: 16px;
		border: 1px solid rgba(36, 53, 87, 0.2);
		margin-right: 10px;
	}
	.photo_box image{
		width: 100%;
		height: 100%;
		border-radius: 16px;
		object-fit: cover;
	}
	.po_imag{
		margin-top: 10px;
		margin-bottom: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.po_imag image{
		width: 42px;
		height: 42px;
	}
	
	.phoyo_co{
		text-align: center;
		font-size: 12px;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #243557;
		line-height: 17px;
	}
	.map_mp{
		width: 100%;
        height:90px;
		border-radius: 10px;
	}
	.btrn{
		margin: 16px 32px;
		border-radius: 18px;
		border: 1px dashed #ccc;
		text-align: center;
		padding: 20px;
		font-size: 12px;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #243557;
		line-height: 17px;
	}
</style>
