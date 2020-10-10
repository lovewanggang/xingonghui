<template>
	<view class="mod_login" :style="{ backgroundImage: 'url(' + backimg + ')' }">
		<startMove class="span_position" jump_text="跳過" @jump_next="jump_next"></startMove>
	</view>
</template>

<script>
import startMove from 'components/star_hollow/startpage_button.vue';
export default {
	data() {
		return {
			constants: {},
			backimg:"",
		};
	},
	components: {
		// 注册
		startMove
	},
	onLoad() {
		const that= this;
		//获取广告图片 pictures
		try {
			//获取缓存的图片value
		    const value = uni.getStorageSync('photo');
			that.backimg = that.$pubFuc.advertising(e.data.filter((res)=>{
				return res.location == "start"
			})[0].img)
		} catch (e) {
			// 调用广告的接口
			this.$pubFuc.pictures().then((res)=>{
				this.backimg = this.$pubFuc.advertising(res.data.filter((res)=>{
						return res.location == "start"
					})[0].img)
				uni.setStorage({
					key:"photo",
					data:res.data
				});
			});
		}
	},
	methods: {
		jump_next() {
		   //判断有没有用户
		  const that = this;
		  try{
			  //获取用户id
			  const user = uni.getStorageSync('user');
			  //获取用户是招聘还是求职
			  const value = uni.getStorageSync('identity');
			  if(user.id){
				  
				  if(value == 1){
					  that.$openPage('jobindex')
				  }else if(value ==2){
					  that.$openPage('recruiterindex')
				  }else{
					  that.$openPage('login');
				  }
			  }else{
				  that.$openPage('login');
			  }
		  } catch(e) {
			  //前往登录页面
			  that.$openPage('login');
		  }
		},
	}
};
</script>

<style scoped>

.span_position {
	position: absolute;
	bottom: 50px;
	right: 30px;
}
</style>
