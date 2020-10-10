const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

class MinRequest {
	[config] = {
		baseURL: '',
		header: {
			// 'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text'
	}

	interceptors = {
		request: (func) => {
			if (func) {
				MinRequest[requestBefore] = func
			} else {
				MinRequest[requestBefore] = (request) => request
			}

		},
		response: (func) => {
			if (func) {
				MinRequest[requestAfter] = func
			} else {
				MinRequest[requestAfter] = (response) => response
			}
		}
	}

	static[requestBefore](config) {
		return config
	}

	static[requestAfter](response) {
		return response
	}

	static[isCompleteURL](url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	setConfig(func) {
		this[config] = func(this[config])
	}
	//get post put 处理
	request(options = {}) {
		options.baseURL = options.baseURL || this[config].baseURL
		options.dataType = options.dataType || this[config].dataType
		options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
		options.data = options.data
		options.header = { ...options.header,
			...this[config].header
		}
		options.method = options.method || this[config].method

		options = { ...options,
			...MinRequest[requestBefore](options)
		}
		try{
			const token_api = uni.getStorageSync("user").api_token;
			// console.log(token_api);
			options.header.api_token = token_api
		}catch(e){
			console.log("===========  这里没有请求头时候处理 ===========");
		}
		// console.log(options.header);
		
		return new Promise((resolve, reject) => {
			options.success = function(res) {
				resolve(MinRequest[requestAfter](res))
			}
			options.fail = function(err) {
				reject(MinRequest[requestAfter](err))
			}
			uni.request(options)
		})
	}
	
	
	// 图片（单）
	updata(url,filePath,name,options={}){
		console.log(filePath);
		options.baseURL = options.baseURL || this[config].baseURL
		options.url = MinRequest[isCompleteURL](url) ? url : (options.baseURL + url)
		options.filePath = filePath
		options.name = name
		return new Promise((resolve, reject) => {
			options.success = function(res) {
				// 处理好的路径直接用
				// options.baseURL+"/storage/upload/"+
				if(JSON.parse(MinRequest[requestAfter](res)).data[0] == -1){
					resolve(JSON.parse(MinRequest[requestAfter](res)).data[0])
				}else{
					resolve(JSON.parse(MinRequest[requestAfter](res)).data[1])
				}
			}
			options.fail = function(err) {
				reject(MinRequest[requestAfter](err))
			}
			uni.uploadFile(options)
		})
	}
	// get
	get(url, data,options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	}
	//post
	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	}
	//put
	put(url, data,options = {}) {
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	}
	delete(url, data,options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}

MinRequest.install = function(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (this.$options.minRequest) {
				console.log(this.$options.minRequest)
				Vue._minRequest = this.$options.minRequest
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$minApi', {
		get: function() {
			return Vue._minRequest.apis
		}
	})
}

export default MinRequest
