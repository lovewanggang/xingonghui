<template name="startpage">
	<view class="start_page_text" @click="jump_next()">{{ jump_text }}</view>
</template>

<script>
export default {
	name: 'startpage',
	data() {
		return {
			constants: {}
		};
	},
	props: {
		jump_text: {
			type: String, //属性类型
			value: null
		}
	},
	onLoad() {},
	methods: {
		jump_next() {
			this.$emit('jump_next');
		}
	}
};
</script>

<style scoped>
.start_page_text {
	width: 140px;
	height: 40px;
	border-radius: 16px;
	border: 1px solid rgba(255, 255, 255, 1);
	font-size: 12px;
	letter-spacing: 2px;
	font-family: PingFangTC-Semibold, PingFangTC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 38px;
	text-align: center;
	text-shadow: 0px 1px 0px #000;
	box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
}
</style>
