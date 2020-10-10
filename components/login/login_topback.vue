
<!-- 带有返回的顶部栏 -->
<template>
	<view>
		<div class="topcenter">
			<view class="icon_close" @click="beback()"><u-icon name="arrow-left" color="#fff" size="30"></u-icon></view>
			<span class="txtqac">{{ top_center }}</span>
		</div>
	</view>
</template>

<script>
export default {
	name: 'login_topback',
	data() {
		return {
			constants: {}
		};
	},
	props: {
		top_center: {
			type: String,
			val: ''
		}
	},
	onLoad() {},
	methods: {
		beback() {
			console.log('点击了返回了么');
			this.$emit('forgect');
		}
	}
};
</script>

<style scoped>
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
</style>
