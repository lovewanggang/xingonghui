
<template>
  <view class="content">
      <view>
          <text class="title">{{title}}</text>
      </view>
      <button @click="testRequest1">请求方法1</button>
	  <button @click="testRequest2">请求方法2</button>
</view>
</template>
<script> 
 export default {
    data() {      
        return {
            title: 'index'
        }
    },
    onLoad() {},
    methods: {
		//跳转使用方法
		// 跳到my的页面  query是传递的参数
		 // 解析路由参数
		      // console.log(this.$parseURL())
			  // this.$openPage('index')
		// this.$openPage({
		//     name: 'login',
		// 	   query: {id: 123}
		// })
      // 使用方法一
      	testRequest1 () {
      		this.$minApi.uniapp({wd: 'uni-app'}).then(res => {
      			this.res = res
      			console.log(res)
      		}).catch(err => {
      			console.log(err)
      		})
      	},
       
      	// 使用方式二
      	async testRequest2 () {
			console.log(this.$pubFuc.timeconversion("2020-07-31T02:10:51.000000Z"));
      		try {
      			const res = await this.$minApi.post({content: '这是添加内容',member_id:8,article_id:1})
      			console.log(res)
      		} catch (err) {
      			console.log(err)
      		}
      	}   
 }  
}
</script>