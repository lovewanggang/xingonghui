import Vue from 'vue'
import App from './App'
//引入公共js
import PubFuc from './static/js/common.js'
//请求
import MinRequest from './utils/http.js'
import minRequest from './utils/api.js'

// 引入MinRouter文件
import MinRouter from './utils/MinRouter.js'
// 引入router文件
import minRouter from './utils/router'

//引入uview-app
import uView from "uview-ui";

import aLoadMore from "@/components/loading/loading.vue";
Vue.component("aLoadMore", aLoadMore);
Vue.use(uView);

Vue.use(MinRouter)
// 注册插件
Vue.use(MinRequest)

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.$pubFuc = PubFuc

const app = new Vue({
	...App,
	minRouter,
	minRequest
})
app.$mount()
