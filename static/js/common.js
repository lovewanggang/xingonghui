
import minRequest from '../../utils/api.js'
const PubFuc = {
	//图片获取的
	pictures:()=>{
		return minRequest.apis.adspictures()
	},
	//图片拼接路径
	
	//验证手机号码是否正常
	telverification: (phone) => {
		// 中国/香港/澳门的手机号码验证
		return (/^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(phone));
	},
	//判断手机号码是否存在
	havemember: (phone) => {
		return minRequest.apis.member({s:JSON.stringify({mobile:phone})});
	},
	//密码是否合格
	password:(pas)=>{
		if(pas.length<6){
			return false
		}
		return (/^(?![^a-zA-Z]+$)(?!\D+$)/.test(pas));
	},
	//提示窗口
	showToast:(text) =>{
		uni.showToast({
			icon:"none",
			title: text,
			duration: 3000
		});
	},
	
	
	//获取时间加8小时
	timeconversion: (date) => {
		let time = new Date(Date.parse(date));
		time.setTime(time.setHours(time.getHours()));
		let Y = time.getFullYear();
		let M = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
		let D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
		let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
		let m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
		let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
		return Y + '/' + M + '/' + D;
	},
	//初始化公用图片获取
	
	//图片处理
	advertising: (data) => {
		return "http://wx.newjobbase.com/storage/upload/"+data
	},
	// 登录页面背景图
	loginbg: () => {
		return "/static/images/bag.png"
	},
}
export default PubFuc
