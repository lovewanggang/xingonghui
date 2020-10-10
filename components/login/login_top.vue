
<!-- 顶部栏组件 -->
<template>
	<view class="top position_absolute">
		<!-- 登录时候的 -->
		<view class="right_top flex">
			<view class="spacing" v-for="item in top_center">{{ item }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'login_top',
	data() {
		return {
			constants: {}
		};
	},
	props: {
		top_center: {
			type: Array,
			val: null
		}
	},
	onLoad() {},
	methods: {}
};
</script>

<style scoped>
.top {
	top: 54px;
	right: 30px;
}
.right_top {
	font-size: 16px;
	font-family: PingFangTC-Regular, PingFangTC;
	font-weight: 400;
	letter-spacing: 1px;
	color: rgba(255, 255, 255, 1);
	line-height: 26px;
}
.spacing {
	margin: 0 6px;
}
</style>
