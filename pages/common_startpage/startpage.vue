<template>
	<view class="box" :style="{'backgroundImage': 'url(' + $pubFuc.advertising() + ')'}">
		<startMove class="span_position" jump_text="跳过" @jump_next="jump_next"></startMove>
	</view>
</template>

<script>
	import startMove from "components/star_hollow/startpage_button.vue"
	export default{
		 data() {
			 return {
				 constants: {},
			 }
		 },
		 components: {
		    // 注册
		    startMove
		 },
		 onLoad() {},
		 methods:{
			 jump_next(){
				// 跳到my的页面  query是传递的参数
				this.$openPage('login');
			 },
		 },
	}
</script>

<style scoped>
	uni-page-body{height:100%;}
	body,html{height:100%;}
	.box{
		min-height: 100%;
		background-repeat:no-repeat;
		background-size:cover;
	}
	
	.span_position{
		position: absolute;
		bottom: 50px;
		right: 30px;
	}
	
</style>
