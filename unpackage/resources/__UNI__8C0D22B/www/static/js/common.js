const PubFuc = {
	//验证手机号码
	telverification:()=>{
		console.log("验证手机号码")
	},
	//获取时间加8小时
	timeconversion:(date)=>{
		let time = new Date(Date.parse(date));
		time.setTime(time.setHours(time.getHours()));
		let Y = time.getFullYear();
	    let M = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
	    let D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
	    let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
	    let m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
	    let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
	    return Y + '-'  + M + '-' + D + '      ' + h + ':' + m + ':' + s;
	},
	//初始化公用图片获取
	
	//广告页面的图
	advertising:()=>{
		return "/static/images/904a5d60d2f311ea8f20fb830305516b.png"
	},
	// 登录页面背景图
	loginbg:()=>{
		return "/static/images/904a5d60d2f311ea8f20fb830305516b.png"
	},
}
export default PubFuc