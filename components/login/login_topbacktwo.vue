<!-- 带有返回的顶部栏 -->

<template>
	<view>
		<div class="topcenter">
			<view class="icon_close" @click="beback()"><u-icon name="arrow-left" color="#000" size="30"></u-icon></view>
			<span style="color: #000000;" class="txtqac">{{ top_center }}</span>
		</div>
	</view>
</template>

<script>
export default {
	name: 'login_topbacktwo',
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
