import MinRequest from './http.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})
// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = 'http://wx.newjobbase.com'
	return config
})

export default {
	apis: {
		url(){
			console.log(minRequest); 
		},
		//广告图
		adspictures(data) {
			return minRequest.get('/api/crud/Banner',data);
		},
		
		//查询所有用户信息
		member(data){
			return minRequest.get('/api/crud/Member',data);
		},
		
		
		//获取登录用户信息
		getmemberinfo(data) {
			return minRequest.get('/api/member/getmemberinfo',data);
		},
		//修改登录用户信息
		putmemberinfo(data, id) {
			return minRequest.put('/api/crud/Member/'+id,data);
		},
		//获取验证码 
		sendsms(data){
			return minRequest.get('/api/member/sendsms',data);
		},
		//用户登录获取token
		login(data){
			return minRequest.post('/api/member/login',data);
		},
		//发送邮箱 api/member/sendmail
		sendmail(data){
			return minRequest.get('/api/member/sendmail',data);
		},
		//修改用户密码  /api/crud/Member/1
		menberpassword(data,id){
			return minRequest.put('/api/crud/Member/'+id,data)
		},
		//注册
		register(data){
			return minRequest.post('/api/member/register',data);
		},
		//获取配置
		config(){
			return minRequest.get('/api/crud/Config');
		},
		//获取行业信息
		businessList(){
			return minRequest.get('/api/business/getlist');
		},
		//获取单条行业信息
		businessone(id){
			return minRequest.get('/api/crud/Business/'+id);
		},
		
		//上传图片
		uptopo(photopath,name){
			return minRequest.updata('/api/upload/upload',photopath,name)
			// return minRequest.post('/api/upload/upload',data)
		},
		//添加机构
		// /api/crud/Company
		addcompany(){
			return minRequest.post("/api/crud/Company");
		},
		//完善机构
		company(data,id){
			return minRequest.put('/api/crud/Company/'+id,data)
		},
		//帮助与反馈
		suggest(data){
			return minRequest.post('/api/crud/Suggest',data)
		},
		//屏蔽名单列表
		Blacklist(data){
			return minRequest.get('/api/crud/Blacklist',data)
		},
		//屏蔽名单列表
		delBlack(id){
			return minRequest.delete('/api/crud/Blacklist/'+ id)
		},
		//搜索屏蔽用戶
		searchBlack(data){
			return minRequest.get('/api/blacklist/search', data)
		},
		//添加屏蔽用戶
		addBlack(data){
			return minRequest.post('/api/crud/Blacklist', data)
		},
		//管理人員列表
		companyuserlist(data){
			return minRequest.get('/api/member/companyuserlist', data)
		},
		//管理人員添加
		addcompanyuser(data){
			return minRequest.get('/api/member/addcompanyuser', data)
		},
		//管理人員刪除
		companyuserdel(data){
			return minRequest.get('/api/member/companyuserdel', data)
		},
		//獲取機構信息
		getcompany(id){
			return minRequest.get('/api/crud/Company/' +id)
		},
		//消息列表
		messageList(data){
			return minRequest.get('/api/crud/Message/', data)
		},
		//获取广告/详情
		article(data,id){
			if(id){
				//详情
				return minRequest.get('/api/crud/Article/'+id);
			}else{
				//列表
				return minRequest.get('/api/crud/Article/',data);
			}
		},
		// /api/crud/Job
		//获取职位列表
		isjob(data){
			return minRequest.get('/api/crud/Job',data);
		},
		//单个职位查看
		onejob(id,data){
			return minRequest.get('/api/crud/Job/'+id,data);
		},
		//单个职位修改
		putonejob(id,data){
			return minRequest.put('/api/crud/Job/'+id,data);
		},
		
		//收藏简历
		companycollectresume(data){
			return minRequest.get('/api/crud/Companycollectresume',data);
		},
		companycollectresumelist(data){
			return minRequest.get('/api/Companycollectresume/list',data);
		},
		// /api/crud/Job
		addjob(data){
			return minRequest.post('/api/crud/Job',data);
		},
        updatejob(data){
        	return minRequest.put('/api/crud/Job/'+data.id,data);
        },
		//删除职位
		deljob(id){
			return minRequest.delete('/api/crud/Job/'+ id)
		},
		
		//搜索简历
		searchresume(data){
			return minRequest.get('/api/Resume/searchresume',data)
		},
		
		receive_resume(data){
			return minRequest.get('/api/crud/Receiveresume',data)
		},
		//收到的简历
		receiveresumelist(data){
			return minRequest.get('/api/Receiveresume/index',data)
		},
		postcompanycollectresume(data){
			return minRequest.post('/api/crud/Companycollectresume',data)
		},
		getcompanycollectresume(data){
			return minRequest.get('/api/crud/Companycollectresume',data)
		},
		//推荐简历
		recommendedresume(data){
			return minRequest.get('/api/Resume/recommend',data)
		},
		//推荐职位
		recommendjob(data){
			return minRequest.get('/api/Job/recommendjob',data)
		},
		//添加简历
		//查看简历
		lookresume(id){
			return minRequest.get('/api/crud/Resume/'+id)
		},
		//发送消息
		crudmessage(data){
			return minRequest.post('/api/crud/Message',data)
		},
		// /api/crud/Companycollectresume/
		//删除收藏简历
		delecollectresume(id){
			return minRequest.delete("/api/crud/Companycollectresume/"+id);
		},
		//添加被查看记录
		postResumeview(data){
			return minRequest.post('/api/crud/Resumeview',data)
		},


		/****/
		//求职端
		
		//已發送记录
		Receiveresume(data){
			return minRequest.get('/api/crud/Receiveresume',data)
		},
		//被查看记录
		Resumeview(data){
			return minRequest.get('/api/crud/Resumeview',data)
		},
		//职位详情
		Jobshow(data){
			return minRequest.get('/api/Job/show/',data)
		},
		//撤回简历
		delReceiveresume(aid){
			return minRequest.delete('/api/crud/Receiveresume/'+aid)
		},
		//搜索职位
		searchjob(data){
			return minRequest.get('/api/Job/searchjob',data)
		},
		//消息列表
		membermessage(data){
			return minRequest.get('/api/Message/membermessage',data)
		},
		//收藏
		collectjob(data){
			return minRequest.post('/api/crud/Collectjob',data)
		},
		//收藏列表
		collectjoblist(data){
			return minRequest.get('/api/Collectjob/collectjoblist',data)
		},
		//取消收藏
		delcollectjob(collectjobid){
			return minRequest.delete('/api/crud/Collectjob/'+collectjobid)
		},
		//投放简历
		postReceiveresume(data){
			return minRequest.post('/api/crud/Receiveresume',data)
		},
		//撤回简历
		delReceiveresume(id){
			return minRequest.delete('/api/crud/Receiveresume/'+id)
		},
		//给职位标记
		postJobtag(data){
			return minRequest.post('/api/crud/Jobtag',data)
		},
		//删除职位标记
		delJobtag(id){
			return minRequest.delete('/api/crud/Jobtag/'+id)
		},
		//我的简历列表
		resumelist(data){
			return minRequest.get('/api/crud/Resume',data)
		},
		//简历状态改变
		resumestatus(data){
			return minRequest.put('/api/Resume/resumestatus',data)
		},
		//查看简历
		lookresume(id){
			return minRequest.get('/api/crud/Resume/'+id);
		},
		//修改简历
		reviseresume(data,id){
			return minRequest.put('/api/crud/Resume/'+id,data);
		},
		//添加简历
		addresume(data){
			return minRequest.post('/api/crud/Resume',data);
		},
		//删除简历
		delresume(data,id){
			return minRequest.put('/api/crud/Resume/'+id,data)
		},
		//搜索机构
		searchcompany(data){
			return minRequest.get('/api/blacklist/searchcompany',data)
		},
		
		
	
		


	},

}
