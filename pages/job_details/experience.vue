<template>
	<view class="box_bag">
		<view class="" style="background-color:#fff;padding-top: 44px;box-shadow: 1px 0px 0px rgba(170,170,170,.4);">
			<toptitle :title="title" @beback="beback"></toptitle>
		</view>
		<view class="box">
			<!-- 学习 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view v-for="(item,index) in study" style="position: relative;">
					<view style="position: absolute;top: -10px;right: -10px;padding: 5px;" @click="isdelete(index)" v-if="study.length>1">
						<u-icon name="close-circle" color="rgba(27, 36, 38, 0.2)" size="24px"></u-icon>
					</view>
					<!-- 學習時間 -->
					<view class="">
						<view class="box_title">
							學習時間
						</view>
						<view class="flex" style="justify-content: space-between;"  @click="istimers(index);">
							<view class="box_input" style="margin-right: 15px;">
								<input v-model="item.starttime" disabled="true" type="text" placeholder="年/月" placeholder-class="box_pal" value="" />
							</view>
							<view class="mid_hen">
								—
							</view>
							<view class="box_input">
								<input v-model="item.endtime" disabled="true" type="text" placeholder="年/月" placeholder-class="box_pal" value="" />
							</view>
						</view>
					</view>
					<!-- 學校名稱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							學校名稱
						</view>
						<view class="box_input">
							<input v-model="item.schoolname" type="text" placeholder="請輸入學校名" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 學校專業 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							所學專業
						</view>
						<view class="flex">
							<view class="box_input" style="margin-right: 15px;flex: 5;" >
								<input v-model="item.study" type="text" placeholder="請輸入專業名稱" placeholder-class="box_pal" value="" />
							</view>
							<view class="box_input flex" style="flex: 3;align-items: center;" @click="replyeducation(index)">
								<input v-model="item.education" disabled="true" type="text" placeholder="學歷" placeholder-class="box_pal" value="" />
								<u-icon style="margin:0 5px 5px 0;" name="arrow-right" color="#0E241B"></u-icon>
							</view>
						</view>
					</view>
					<!-- 主修內容 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							主修內容
						</view>
						<view class="box_center" style="position: relative;">
							<view class="box_pal" style="position: absolute;right: 8px;bottom: 8px;">
								{{item.studylength}}/{{biglength}}
							</view>
							<textarea @input="studyinput(index)" placeholder-class="box_pal" v-model="item.studytext" placeholder="輸入主修內容…" :maxlength="biglength"></textarea>
						</view>
					</view>
					<!-- 横线 -->
					<view class="henxian" v-if="index != study.length-1">
						
					</view>
				</view>
				<!-- 添加更多 -->
				<view class="addmore" @click="addstudy" v-if="study.length<3">
					
					<u-icon name="plus" color="rgba(27, 36, 38, 0.2)" size="20px"></u-icon>
					
					<view class="">
						添加更多
					</view>
				</view>
			</view>
			<!-- 实习 -->
			<view class="box_one">
				<!-- 删除按钮 -->
				<view v-for="(item,index) in practice" style="position: relative;">
					<view style="position: absolute;top: -10px;right: -10px;padding: 5px;" @click="practicedelete(index)" v-if="practice.length>1">
						<u-icon name="close-circle" color="rgba(27, 36, 38, 0.2)" size="24px"></u-icon>
					</view>
					<!-- 实习時間 -->
					<view class="">
						<view class="box_title">
							實習時間
						</view>
						<view class="flex" style="justify-content: space-between;"  @click="ispracticetimers(index);">
							<view class="box_input" style="margin-right: 15px;">
								<input v-model="item.starttime" disabled="true" type="text" placeholder="年/月" placeholder-class="box_pal" value="" />
							</view>
							<view class="mid_hen">
								—
							</view>
							<view class="box_input">
								<input v-model="item.endtime" disabled="true" type="text" placeholder="年/月" placeholder-class="box_pal" value="" />
							</view>
						</view>
					</view>
					
					<!-- 实习名稱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							機構名稱
						</view>
						<view class="box_input">
							<input v-model="item.institution_name" type="text" placeholder="請輸入機構名" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 职位 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							職位
						</view>
						<view class="box_input" style="margin-right: 15px;" >
							<input v-model="item.practice" type="text" placeholder="請輸入職位名稱" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- 实习內容 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							實習內容
						</view>
						<view class="box_center" style="position: relative;">
							<view class="box_pal" style="position: absolute;right: 8px;bottom: 8px;">
								{{item.practicelength}}/{{biglength}}
							</view>
							<textarea @input="practiceinput(index)" placeholder-class="box_pal" v-model="item.practicetext" placeholder="輸入實習內容…" :maxlength="biglength"></textarea>
						</view>
					</view>
					
					<!-- 横线 -->
					<view class="henxian" v-if="index != practice.length-1">
					</view>
				</view>
				<!-- 添加更多 -->
				<view class="addmore" @click="addpractice" v-if="practice.length<3">
					
					<u-icon name="plus" color="rgba(27, 36, 38, 0.2)" size="20px"></u-icon>

					<view class="">
						添加更多
					</view>
				</view>
			</view>
			
			<view class="box_one">
				<!-- 删除按钮 -->
				<view v-for="(item,index) in worker" style="position: relative;">
					<view style="position: absolute;top: -10px;right: -10px;padding: 5px;" @click="workerdelete(index)" v-if="worker.length>1">
						<u-icon name="close-circle" color="rgba(27, 36, 38, 0.2)" size="24px"></u-icon>
					</view>

					<view class="">
						<view class="box_title">
							工作時間
						</view>
						<view class="flex" style="justify-content: space-between;"  @click="isworkstimers(index);">
							<view class="box_input" style="margin-right: 15px;">
								<input v-model="item.starttime" disabled="true" type="text" placeholder="年/月" placeholder-class="box_pal" value="" />
							</view>
							<view class="mid_hen">
								—
							</view>
							<view class="box_input">
								 <!-- v-model="item.endtime" -->
								<input v-model="item.endtime" disabled="true" type="text" placeholder="年/月" placeholder-class="box_pal" value="" />
							</view>
						</view>
					</view>
					<!-- 機構名稱 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							機構名稱
						</view>
						<view class="box_input">
							<input v-model="item.workername" type="text" placeholder="請輸入機構名" placeholder-class="box_pal" value="" />
						</view>
					</view>
					<!-- worker:[{starttime:"",endtime:"",workername:"",worker:"",rank:"",workerlength:0,workertext:""}], -->
					<!-- 職位 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							職位
						</view>
						<view class="flex">
							<view class="box_input" style="margin-right: 15px;flex: 5;" >
								<input v-model="item.worker" type="text" placeholder="輸入職位名稱" placeholder-class="box_pal" value="" />
							</view>
							<view class="box_input flex" style="flex: 3;align-items: center;" @click="replyrank(index)">
								<input v-model="item.rank" disabled="true" type="text" placeholder="職級" placeholder-class="box_pal" value="" />
								<u-icon style="margin:0 5px 5px 0;" name="arrow-right" color="#0E241B"></u-icon>
							</view>
						</view>
					</view>
					<!-- 主修內容 -->
					<view style="margin-top: 16px;">
						<view class="box_title">
							工作內容
						</view>
						<view class="box_center" style="position: relative;">
							<view class="box_pal" style="position: absolute;right: 8px;bottom: 8px;">
								{{item.workerlength}}/{{biglength}}
							</view>
							<textarea @input="workerinput(index)" placeholder-class="box_pal" v-model="item.workertext" placeholder="輸入工作內容…" :maxlength="biglength"></textarea>
						</view>
					</view>
					<!-- 横线 -->
					<view class="henxian" v-if="index != worker.length-1">
						
					</view>
				</view>
				<!-- 添加更多 -->
				<view class="addmore" @click="addworker" v-if="worker.length<3">
					
					<u-icon name="plus" color="rgba(27, 36, 38, 0.2)" size="20px"></u-icon>
					
					<view class="">
						添加更多
					</view>
				</view>
			</view>
			
			<view class="box_btn">
				<bottombtn @goback="goback"></bottombtn>
			</view>
		</view>
		
		<u-mask :show="fullShow" @click="fullShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇職位類別
					</view>
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<!-- 定位 -->
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 90px; height: 95px;text-align: center;" @change="fullChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in fullList' :class="[isfull==index?'iscole':'iscolesa']">{{item}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="fullOut()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="fullShow = false;">取消</view>
			</view>
		</u-mask>
		
		<u-mask :show="rankShow" @click="ranlShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇職級
					</view>
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<!-- 定位 -->
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 90px; height: 95px;text-align: center;" @change="rankChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in rankList' :class="[isrank==index?'iscole':'iscolesa']">{{item}}</view>
							    </picker-view-column>
							</picker-view>
						</view>
					</view>
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="rankOut()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="rankShow = false;">取消</view>
			</view>
		</u-mask>
		<u-mask :show="outMaskShow" @click="outMaskShow = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="border">
					<view class="">
						選擇時間
					</view>
					
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 70px; height: 95px;text-align: center;" @change="yearChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in year' v-if="item < 100 " :class="[year - isyear==index?'iscole':'iscolesa']">{{year - index}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								年
							</view>
							
						</view>
						<view class="hengshu">
							
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="monthChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in month' :class="[ismonth==index?'iscole':'iscolesa']">{{index+1}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								月
							</view>
						</view>
						<!-- <view class="hengshu">
							
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="dayChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in day' :class="[isday - 1==index?'iscole':'iscolesa']">{{index+1}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								日
							</view>
						</view> -->
					</view>
					
					<view class="hengxan">
					</view>
					
					<view class="flex" style="margin-top: 10px;align-items: center;text-align: center;justify-content: center;">
						<view class="islebpo">
							<image src="/static/images/j_00.png" alt="">
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 70px; height: 95px;text-align: center;" @change="yearendChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in year' v-if="item < 100 " :class="[year - isendyear==index?'iscole':'iscolesa']">{{year - index}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								年
							</view>
							
						</view>
						<view class="hengshu">
							
						</view>
						<view class="flex" style="align-items: center;">
							<picker-view mask-style="background:#fff" style="width: 40px; height: 95px;text-align: center;" @change="monthendChange">
							    <picker-view-column>
							      <view  v-for='(item,index) in month' :class="[isendmonth==index?'iscole':'iscolesa']">{{index+1}}</view>
							    </picker-view-column>
							</picker-view>
							<view class="isfont">
								月
							</view>
						</view>
					</view>
					
				</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="signOut()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="outMaskShow = false;">取消</view>
			</view>
		</u-mask>
		
		<u-mask :show="delete_bra" @click="delete_bra = false" :mask-click-able="false" :custom-style="{background: 'rgba(0, 0, 0, .5)'}">
			<view class="warp">
				<view class="rect">是否删除?</view>
				<view class="tagWrap" style="margin: 64upx 96upx;" @click="delete_yes()"><span class="tagButtom">确定</span></view>
				<view class="rect" style="font-size:28upx;" @click="delete_bra = false">取消</view>
			</view>
		</u-mask>
	</view>
</template>
<script>
	import toptitle from 'components/details/index_top.vue'
	import bottombtn from 'components/details/index_bottom.vue'
	export default{
		data(){
			return {
				//删除的弹出框
				delete_bra:false,
				num:null,
				index:null,
				//删除内容
				title:"個人經歷", 
				biglength:80,
				//学习数组
				study:[
					{starttime:"",endtime:"",schoolname:"",study:"",education:"",center:"",studylength:0,studytext:""},
				],
				//学历数组
				practice:[{starttime:"",endtime:"",institution_name:"",practice:"",practicelength:0,practicetext:""}],
				practicelength:0,
				practicetext:"",
				//工作数组
				worker:[{starttime:"",endtime:"",workername:"",worker:"",rank:"",workerlength:0,workertext:""}],
				workerlength:0,
				workertext:"",
				//学历
				isfull:0,
				// fullVal:"",
				fullIndex:null,
				fullList:["中學","大學","碩士","博士"],
				fullShow:false,
				
				//职级
				isrank:0,
				// fullVal:"",
				rankIndex:null,
				rankList:["普通員工","基層管理","中層管理","高層管理"],
				rankShow:false,
				
				//时间
				//压屏框
				outMaskShow: false,
				//日期
				year:"",
				month:12,
				day:0,
				
				yearend:"",
				monthend:12,
				dayend:0,
				
				isyear:0,//这是年
				ismonth:0,//这是月
				isday:1,//这是日
				
				isendyear:0,//这是年
				isendmonth:0,//这是月
				isendday:1,//这是日
				certificate:null,//第几个证书第几个
				glory:null,
				
				//判断是哪个的标识
				studyindex:null,
				practiceindex:null,
				workerindex:null,
			}
		},
		onLoad(option) {
			//获取当前的年月日
			this.year = new Date().getFullYear();
			this.isyear = new Date().getFullYear();
			this.isendyear = new Date().getFullYear();
			this.day = this.GetMonthDayCount();
			
			if(option.query && JSON.parse(option.query).data){
				this.study = JSON.parse(option.query).data.study;
				this.practice = JSON.parse(option.query).data.practice;
				this.worker = JSON.parse(option.query).data.worker;
			}
		},
		components: {
			toptitle,
			bottombtn
		},
		methods:{
			goback(){
				if(this.study.filter((res)=>{
					return res.starttime == ""||res.education == ""||res.schoolname == ""||res.study == ""||res.studytext == "";
				}).length > 0){
					this.$pubFuc.showToast("請完善學校信息");
					return;
				} 
				if(this.practice.filter((res)=>{
					return res.starttime == ""||res.institution_name == ""||res.practice == ""||res.practicetext == "";
				}).length > 0){
					this.$pubFuc.showToast("請完善實習信息");
					return;
				} 
				if(this.practice.filter((res)=>{
					return res.starttime == ""||res.workername == ""||res.rank == ""||res.workertext == ""||res.worker == "";
				}).length > 0){
					this.$pubFuc.showToast("請完善工作信息");
					return;
				} 
				let rendering = {};
				rendering.type =  1;//代表证书获奖
				rendering.study= this.study;
				rendering.practice= this.practice;
				rendering.worker = this.worker;
				uni.setStorage({
					key:'details',
					data:JSON.stringify(rendering)
				})
				// localStorage.setItem('details', JSON.stringify(rendering));
				uni.navigateBack();
			},
			//触发事件选择
			istimers(index){
				this.studyindex = index;
				this.practiceindex = null;
				this.workerindex = null;
				this.outMaskShow = true;
			},
			ispracticetimers(index){
				this.studyindex = null;
				this.practiceindex = index;
				this.workerindex = null;
				this.outMaskShow = true;
			},
			isworkstimers(index){
				this.studyindex = null;
				this.practiceindex = null;
				this.workerindex = index;
				this.outMaskShow = true;
			},
			signOut(){
				if(this.studyindex == null && this.practiceindex == null){
					// +"/"+this.isday
					this.worker[this.workerindex].starttime = this.isyear+"/"+(this.ismonth+1);
					// +"/"+this.isendday
					this.worker[this.workerindex].endtime = this.isendyear+"/"+(this.isendmonth+1);
					this.outMaskShow = false;
				}else if(this.practiceindex == null && this.workerindex == null){
					// +"/"+this.isday
					this.study[this.studyindex].starttime = this.isyear+"/"+(this.ismonth+1);
					// +"/"+this.isendday
					this.study[this.studyindex].endtime = this.isendyear+"/"+(this.isendmonth+1);
					this.outMaskShow = false;
				}else if(this.workerindex == null && this.studyindex == null){
					// +"/"+this.isday
					this.practice[this.practiceindex].starttime = this.isyear+"/"+(this.ismonth+1);
					// +"/"+this.isendday
					this.practice[this.practiceindex].endtime = this.isendyear+"/"+(this.isendmonth+1);
					this.outMaskShow = false;
				}
			},
			yearChange(e){
				// 获取年
				this.isyear = this.year - e.detail.value[0];
				this.day = this.GetMonthDayCount();
			},
			yearendChange(e){
				// 获取年
				this.isendyear = this.year - e.detail.value[0];
				this.day = this.GetMonthDayCount();
			},
			monthChange(e){
				// 获取月份
				this.ismonth = e.detail.value[0];
				this.day = this.GetMonthDayCount();
			},
			monthendChange(e){
				// 获取月份
				this.isendmonth = e.detail.value[0];
				this.day = this.GetMonthDayCount();
			},
			dayChange(e){
				//获取日期
				this.isday = e.detail.value[0]+1;
			},
			dayendChange(e){
				//获取日期
				this.isendday = e.detail.value[0]+1;
			},
			//判断当前是有多少日的
			GetMonthDayCount(){
				switch(this.ismonth+1)
					{
						case 1:
						case 3:
						case 5:
						case 7:
						case 8:
						case 10:
						case 12:
							{
								return 31;
							}
						case 4:
						case 6:
						case 9:
						case 11:
							{
								return 30;
							}
						case 2:
							{
								if(this.isyear%4)
								{
									return 28;
								}
								else
								{
									if(this.isyear%100)
									{
										return 29;
									}
									else
									{
										if(this.isyear%400)
										{
											return 28;
										}
										else
										{
											return 29;
										}
									}
								}
							}
						default:
							{
								return 0;
							}
					}
			},

			isdelete(index){
				// console.log("删除第"+index+"个模块");
				this.delete_bra = true;
				this.num = 0;
				this.index = index;
			},
			// 删除工作经验
			workerdelete(index){
				// console.log("删除第"+index+"个模块");
				this.delete_bra = true;
				this.num = 1;
				this.index = index;
			},
			//删除实习经验
			practicedelete(index){
				// console.log("删除第"+index+"个模块");
				this.delete_bra = true;
				this.num = 2;
				this.index = index;
			},
			delete_yes(){
				console.log("删除");
				if(this.num == 0){
					//删除
					delete this.study[this.index];
					//重新渲染
					this.study = this.study.filter((res)=>{
						if(res){
							return res;
						}
					})
				}else if(this.num == 1){
					//删除
					delete this.worker[this.index];
					//重新渲染
					this.worker = this.worker.filter((res)=>{
						if(res){
							return res;
						}
					})
				}else if(this.num ==2){
					// 删除
					delete this.practice[this.index];
					// 重新渲染
					this.practice = this.practice.filter((res)=>{
						if(res){
							return res;
						}
					})
				}
				this.num = null;
				this.index = null;
				this.delete_bra = false;
			},
			beback(){
				uni.navigateBack();
			},
			replyeducation(index){
				this.fullShow = true;
				this.fullIndex = index;
			},
			replyrank(index){
				this.rankShow = true;
				this.rankIndex = index;
			},
			//学历
			fullChange(e){
				//选择
				this.isfull = e.detail.value[0];
			},
			rankChange(e){
				//选择
				this.isrank = e.detail.value[0];
			},
			fullOut(){
				//关闭压屏窗 
				this.fullShow = false;
				this.study[this.fullIndex].education = this.fullList[this.isfull];
			},
			rankOut(){
				//关闭压屏窗 
				this.rankShow = false;
				this.worker[this.rankIndex].rank = this.rankList[this.isrank];
			},
			//学历 
			studyinput(index){
				this.study[index].studylength = this.study[index].studytext.length
			},
			//工作
			workerinput(index){
				this.worker[index].workerlength = this.worker[index].workertext.length
			},
			//实习
			practiceinput(index){
				this.practice[index].practicelength = this.practice[index].practicetext.length
			},
			//添加学历
			addstudy(){
				this.study.push({starttime:"",endtime:"",schoolname:"",study:"",education:"",center:"",studylength:0,studytext:""});
			},
			//添加实习经验
			addworker(){
				this.worker.push({starttime:"",endtime:"",workername:"",worker:"",rank:"",workerlength:0,workertext:""});
			},
			//添加工作
			addpractice(){
				this.practice.push({starttime:"",endtime:"",institution_name:"",practice:"",practicelength:0,practicetext:""});
			},
		}
	}
</script>
<style scoped>
	uni-page-body {
			background-color: #EEEEEE;
		}
		body,
		html {
			background-color: #EEEEEE;
		}
		.hengxan{
			margin: 15px 30px;
			width:calc(100% - 60px) ;
			height: 1px;
			background: #0E320D;
			opacity: 0.2;
		}
		.box_btn{
			margin: 24px 38px;
		}
		.box_bag{
			background-color: #EEEEEE;
			height: 100%;
		}
	.box{
		background-color: #EEEEEE;
		padding: 8px 10px;
	}
	.rect {
		text-align: center;
		font-size:64upx;
		font-family:PingFangTC-Semibold,PingFangTC;
		font-weight:600;
		color:rgba(255,255,255,1);
	}
	.border{
		padding: 24px 35px!important;
		margin: 0 10px;
		min-height: 120px;
		background: rgba(255, 255, 255, 1)!important;
		border-radius: 20px;
	}
	.tagWrap {
		display: flex;
		position: relative;
		align-items: center;
		align-self: center;
		flex-direction: row;
		justify-content: center;
		margin-top: 24px!important;
		border-radius: 16px;
		background-image: linear-gradient(0deg, #1ceeaf 0%, #079742 100%);
		width: calc(100% - 96px);
		height: 45px;
		-moz-box-shadow: 0px 3px 0px 0px #05653b;
		-webkit-box-shadow: 0px 3px 0px 0px #05653b;
		box-shadow: 0px 3px 0px 0px #05653b;
	}
	.tagWrap:active {
		-moz-box-shadow: 0px 0px 0px 0px #05653b;
		-webkit-box-shadow: 0px 0px 0px 0px #05653b;
		box-shadow: 0px 0px 0px 0px #05653b;
	}
	.warp {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		margin-bottom: 50upx;
	}
	.iscole{
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 16px;
		color: #0E320D;
		font-weight: 600;
		line-height: 35px;
	}
	.iscolesa{
		opacity: 0.5;
		font-family: PingFangSC-Medium, PingFang SC;
		font-size: 14px;
		color: #0E320D;
		font-weight: 600;
		line-height: 35px;
	}
	.islebpo{
		width: 11px;
		height: 14px;
		position: absolute;
		left: 45px;
	}
	.islebpo image{
		width: 100%;
		height: 100%;
	}
	.mid_hen{
		margin: 0 19px 0 0 ;
	}
	.henxian{
		height: 1px;
		background: rgba(27, 36, 38, 0.2);
		margin: 24px 0;
	}
	.box_one{
		padding: 25px;
		margin: 16px 0;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 1px 1px 0px rgba(170,170,170,.6);
	}
	.box_title{
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #21352D;
		line-height: 17px;
		margin:0 10px;
	}
	.box_center{
		margin-top: 4px;
		padding:8px 10px;
		height: 106px;
		border-radius: 12px;
		border: 1px solid #CCCFCF;
	}
	.box_input{
		border-bottom: 1px solid rgba(27, 36, 38, 0.2);
	}
	.box_input input{
		padding: 4px 10px 10px 10px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #0E241B;
		line-height: 17px;
	}
	.box_center textarea{
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #0E241B;
		line-height: 17px;
	}
	.box_pal{
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(14,36,27,.3);
		line-height: 17px;
	}
	.addmore{
		margin-top: 16px;
		padding: 15px;
		border-radius: 10px;
		border: 1px dashed #CCCFCF;
		text-align: center;
	}
</style>
