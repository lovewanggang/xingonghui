<template>
	<swiper class="swiper" style="height: 420px;" @change="toindex">
		<swiper-item class="swiperItem" v-for="(item,index) in ctrn" :key='index'>
	<view class="more_box">
		<view class="box">
					<view class="headpoto">
						<image :src="item.img" alt="">
					</view>
					<view class="cpse">
						{{item.title}}
					</view>
					<view class="address">
						<u-icon style="margin-right: 3px;" name="map-fill" color="rgba(36,53,87,0.3)" size="30"></u-icon>
						{{item.address}}
					</view>
					<view class="compay">
						{{item.companytitle}}
					</view>
					<view class="money">
						HK${{item.salary_start}}-{{item.salary_end}}K/月
					</view>
					<view class="flex" style="justify-content: center;">
						<view class="onga">
							<image src="/static/images/gwbb.png" alt="">{{item.year}}年
						</view>
						<view class="onga">
							<image src="/static/images/limm.png" alt="">{{item.education}}
						</view>
						<view class="onga" v-if="item.job_type==1">
							<image src="/static/images/lidaiz.png" alt="" >
							全職
							
						</view>
						<view class="onga" v-else>
							<image src="/static/images/lidaiz.png" alt="" >
							兼職
							
						</view>
						
					</view>
					<view class="msg">
						{{item.msg}}
					</view>
		</view>
	</view>
	</swiper-item>
	</swiper>
</template>
<script>
	export default {
		props: {
			ctrn: {
				val: {}
			},
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		methods: {
			toindex(e){
				// console.log(e.detail.current);
				this.$emit("toindex",e.detail.current)
			}
		}
	}
</script>

<style>
	.more_box{
		margin-top: 24px;
		display: flex;
		justify-content: center;
	}
	.box{
		width: 279px;
		height: 382px;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 16px;
		text-align: center;
		margin: 0 auto;
		text-align: center;
		position: relative;
	}
	.box::after{
		content: '';
		z-index: -1;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: url('/static/images/bag1.png');
		overflow: hidden;
		background-position: center top;
		background-size: cover;
		background-attachment: fixed;
		-webkit-filter: blur(8px);
		-moz-filter: blur(8px);
		-ms-filter: blur(8px);
		-o-filter: blur(8px);
		filter: blur(8px);
	}
	.headpoto{
		margin-top: 24px;
		width: 100%;
		border-radius: 16px;
	}
	.headpoto image{
		width: 64px;
		height: 64px;
		object-fit: cover;
		border-radius: 16px;
	}
	.address{
		font-size: 12px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #0E320D;
		line-height: 17px;
		margin-top: 11px;
		margin-bottom: 8px;
	}
	.msg{
		font-size: 12px;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #0E320D;
		opacity: 0.6;
		line-height: 18px;
		margin:0 32px;
	}
	.cpse{
		margin-top: 18px;
		font-size: 24px;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #0E320D;
		line-height: 28px;
	}
	.compay{
		font-size: 12px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #0E320D;
		line-height: 22px;
	}
	.money{
		margin-top: 11px;
		font-size: 16px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #0E320D;
		line-height: 22px;
	}
	.onga{
		margin: 15px 5px;
		width: 75px;
		height: 21px;
		background:rgba(126,172,127,0.2);
		border-radius: 11px;
		font-size: 11px;
		font-family: PingFangTC-Medium, PingFangTC;
		font-weight: 500;
		color: #0E320D;
		/* line-height: 15px; */
		line-height: 21px;
		
		
	}
	.onga image{
		width: 11px;
		height: 11px;
		object-fit: cover;
		margin-top: 5px;
		margin-right: 3px;
		/* margin-top: 2px; */
	}
</style>
