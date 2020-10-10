<template>
	<view>
		<view class="tagWrap" @click="btnback()">
			<span class="tag" style="margin-left: 10px;">確定</span>
		</view>
	</view>
</template>
<script>
	/*
	确定按钮组件
	*/
export default {
	name: 'bottom',
	data() {
		return {
			btn: '确定'
		};
	},
	onLoad() {},
	methods: {
		btnback() {
			// console.log("点击了确定");
			this.$emit('goback');
		}
	}
};
</script>

<style scoped>
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
</style>
