<template>
	<view style="width:calc( 100% - 0px);margin-top: 4px;">
		<u-tabs
		:list="list"
		:inactive-color="utabs.incolors"
		:bg-color="utabs.bagcolor" 
		:bold="false"
		:item-width="utabs.width"
		:gutter="utabs.gutte"
		:font-size="utabs.font"
		:active-color="utabs.incolor"
		:is-scroll="true"
		:active-item-style="utabs.opin"
		:current="current"
		@change="change"></u-tabs>
	</view>
</template>

<script>
	//组件缺少跳到指定的简历职位里面
	
	export default {
	  data() {
	    return {
		 current: 0,
	     utabs:{
	     	incolor:"rgba(255,255,255,1)",
	     	incolors:"rgba(255,255,255,0.6)",
	     	bagcolor:"''",//空白底色
	     	font:"28rpx",
	     	gutter:"48rpx",
	     	width:"180rpx",
	     	gutte:"20rpx",
			// opin:{"font-size":"38rpx"},
	     },
	    };
	  },
	  props:{
		  list: {
		  	type: Array,
		  	default: []
		  },
		  // oncances:{
			 //  type:Number,
			 //  default:null,
		  // }
	  },
	  created() {
	 //	console.log(this.oncances);
		// this.clock(this.oncances);
		// // this.current = this.oncances;
		// // console.log("===============================");
		// // console.log(this.current);
		// // this.$set(this.list[this.oncances])
		// // this.$forceUpdate()
	  },
	  methods:{
		  change(index) {
		  	this.current = index;
			this.$emit('click_job',this.list[index].id)
		  },
		
	  }
	}
</script>

<style>
</style>
