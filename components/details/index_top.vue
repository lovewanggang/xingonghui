<template>
	<view class="flex">
		<view class="">
			<u-icon style="padding: 15px 15px;" @click="back" name="arrow-left" color="#0E320D"></u-icon>
		</view>
		<view style="margin-left: -40px;margin-top: 15px;text-shadow: 1px 1px 1px #aaa;color: #0E320D;width: 100%;text-align: center;">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				title_name:"",
			}
		},
		props:['title'],
		methods:{
			back(){
				console.log("点击了返回");
				this.$emit('beback');
			},
		}
	}
</script>

<style>
</style>
