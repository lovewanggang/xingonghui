import MinRouter from './MinRouter'
// 配置路由
const router = new MinRouter({
	routes: [
		{
			path: 'pages/recruiter_perfect/perfect',
			name: 'perfect'  //完善机构
		},
		{
			path: 'pages/common_login/login',
			type:'reLaunch',
			name: 'login'   //登录 注册 找回 冻结
		},
		{
			path: 'pages/common_forin/forin',
			name: 'forin'   //登录 注册 找回 冻结
		},
		{
			path: 'pages/receive_resume/index',
			animationType:'slide-in-bottom',
			name: 'login2'   //测试
		},
		{
			path: 'pages/recruiter_soso/soso',
			type:'reLaunch',
			name: 'soso'   //测试
		},
		{
			path: 'pages/recruiter_resume/resume',
			animationType:'slide-in-bottom',
			name: 'resume'   //搜索的简历
		},
		{
			path: 'pages/job_tuijian/index',
			animationType:'slide-in-bottom',
			name: 'tuijian'   //搜索的简历
		},
		{
			path: 'pages/job_soso/index',
			type:'reLaunch',
			name: 'job_soso' 
		},
		{
			path: 'pages/common_character/character',
			// type:'reLaunch',
			name: 'character'  //选择角色
		},
		{
			path: 'pages/job_index/index',
			type:'reLaunch',
			name: 'jobindex'
		},
		{
			path: 'pages/recruiter_index/index',
			type:'reLaunch',
			name: 'recruiterindex'
		},
		{
			// 页面路径
			path: 'pages/common_hollow/hollow',
			type: 'reLaunch',
			name: 'hollow'    //首页广告
		},
		{
			// 页面路径
			path: 'pages/job_resume/index',
			name: 'job_resume'    //通用设置
		},
		{
			// 页面路径
			path: 'pages/recruiter_currency_set/index',
			name: 'currency_set'    //通用设置
		},
		{
			// 页面路径
			path: 'pages/recruite_details/index',
			name: 'recruite_details'    //通用设置
		},
		{
			// 页面路径
			path: 'pages/job_details/index',
			name: 'tolist'    //简历详情
		},
		{
			// 页面路径
			path: 'pages/job_details/experience',
			name: 'experience'    //简历详情填写
		},
		{
			// 页面路径 
			path: 'pages/job_details/certificate',
			name: 'certificate'    //简历证书
		},
		{
			// 页面路径 
			path: 'pages/job_details/information',
			name: 'information'    //简历证书
		},
		{
			// 页面路径
			path: 'pages/job_details/evaluation',
			name: 'evaluation'    //简历证书
		},
		{
			// 页面路径
			path: 'pages/job_details/professional',
			name: 'professional'    //简历详情填写
		},
		{
			// 页面路径
			path: 'pages/job_currency_set/index',
			name: 'job_currency_set'    //通用设置
		},
		{
			// 页面路径
			path: 'pages/recruiter_account_set/account_set',
			name: 'account_set'    //帳號設置
		},
		{
			// 页面路径
			path: 'pages/recruiter_agreement/recruiter_agreement',
			name: 'agreement'    //协议
		},{
			// 页面路径
			path: 'pages/recruiter_agreement/recruiter_agreement_details',
			name: 'agreement_details'    //协议详情
		},
		{
			// 页面路径
			path: 'pages/recruiter_admin_set/recruiter_admin_set',
			name: 'admin_set'    //帳號設置
		},
		{
			// 页面路径
			path: 'pages/recruiter_shield_user/recruiter_shield_user',
			name: 'shield_user'    //屏蔽用戶
		},
		{
			// 页面路径
			path: 'pages/job_shield_user/job_shield_user',
			name: 'job_shield_user'    //屏蔽机构
		},
		{
			// 页面路径
			path: 'pages/job_recording/index',
			name: 'job_recording'    //屏蔽用戶
		},
		{
			// 页面路径
			path: 'pages/job_recording/details',
			name: 'job_recording_details'    //屏蔽用戶
		},
		{
			// 页面路径
			path: 'pages/recruiter_vip/recruiter_vip',
			name: 'recruiter_vip'    //VIP
		},
		{
			// 页面路径
			path: 'pages/job_vip/job_vip',
			name: 'job_vip'    //VIP
		},
		{
			// 页面路径
			path: 'pages/job_sosolist/index',
			name: 'job_sosolist'    //VIP
		},
		{
			// 页面路径
			path: 'pages/job_sosolist/details',
			name: 'job_sosolist_details'    //VIP
		},
		{
			// 页面路径
			path: 'pages/recruiter_vip/recruiter_vipRecord',
			name: 'recruiter_vipRecord'    //訂單記錄
		},
		{
			// 页面路径
			path: 'pages/job_vip/job_vipRecord',
			name: 'job_vipRecord'    //訂單記錄
		},
		{
			// 页面路径
			path: 'pages/job_shoucang/index',
			name: 'job_shoucang'    //訂單記錄
		},
		{
			// 页面路径
			path: 'pages/job_shoucang/details',
			name: 'job_shoucang_details'    //訂單記錄
		},
		{
			// 页面路径
			path: 'pages/recruiter_news/recruiter_news',
			name: 'recruiter_news'    //消息
		},
		{
			// 页面路径
			path: 'pages/job_news/index',
			name: 'job_news'    //消息
		},
		{
			// 页面路径
			path: 'pages/recruiter_article/recruiter_article',
			name: 'recruiter_article'    //文章詳情
		},
		{
			// 页面路径
			path: 'pages/recruiter_mechanism/recruiter_mechanism',
			name: 'recruiter_mechanism'    //機構信息
		},
		{
			// 页面路径
			path: 'pages/recruiter_address/index',
			name: 'recruiter_address'    //機構信息
		},
		{
			// 页面路径
			path: 'pages/recruiter_position/recruiter_position',
			name: 'recruiter_position'    //招聘職位
		},{
			// 页面路径
			path: 'pages/recruiter_position/recruiter_addposition',
			animationType:'slide-in-bottom',
			name: 'recruiter_addposition'    //添加招聘職位
		},
		{
			// 页面路径
			path: 'pages/recruite_sosolist/sosolist',
			animationType:'slide-in-bottom',
			name: 'sosolist'    //添加招聘職位
		},
		{
			// 页面路径
			path: 'pages/recruiter_resumeDetails/recruiter_resumeDetails',
			name: 'recruiter_resumeDetails'    //簡歷詳情
		},
		{
			// 页面路径
			path: 'pages/recruiter_collection/recruiter_collection',
			name: 'recruiter_collection'    //收藏簡歷
		},
		{
			// 页面路径
			path: 'pages/job_agreement/job_agreement',
			name: 'job_agreement'    //协议
		},{
			// 页面路径
			path: 'pages/job_agreement/job_agreement_details',
			name: 'job_agreement_details'    //协议详情
		},
	]
})

export default router
