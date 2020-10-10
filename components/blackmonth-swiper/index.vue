<template>
	<swiper @change="toindex" class="swiper" style="height: 420px;">
		<swiper-item class="swiperItem" v-for="(item,index) in ctrn" :key='index'>
	<view class="more_box">
		<view class="box" @click="top(index)">
			<view class="tnum" v-if='item.nowpages == ""'>
				{{item.nowpages}}/{{item.pages}}
			</view>
			<view class="headpoto">
				<image mode="aspectFill" :src="$pubFuc.advertising(item.img)" alt="">
				<view class="cares">
					<text>{{item.name}}</text>
					
				</view>
			</view>
			<view class="mid_center">
				<view class="one_center">
					{{item.center}}
				</view>
				<view class="two_center">
							<u-icon style="margin-top: 6px;" name="calendar-fill" color="#243557" size="30"></u-icon>
							<view class="">
								{{item.year}}
							</view>
						</view>
						<view class="two_center">
							<u-icon style="margin-top: 6px;" name="file-text-fill" color="#243557" size="30"></u-icon>
							<view class="">
								{{item.education}}
							</view>
						</view>
					</view>
					<view class="address">
						<!-- 图标 -->
						<u-icon style="margin-right: 3px;" name="map-fill" color="rgba(36,53,87,0.3)" size="30"></u-icon>
						{{item.address}}
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
			},
			top(index){
				this.$emit("goin",index)
			},
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
	.headpoto{
		margin-top: 16px;
		width: 100%;
		height: 226px;
		border-radius: 16px;
		
	}
	.headpoto image{
		width: 171px;
		height: 226px;
		position: relative;
		border-radius: 16px;
	}
	.cares{
		position: absolute;
		top: 17px;
		left: calc(50% - 86px);
		width: 171px;
		height: 226px;
		background: linear-gradient(180deg, rgba(46, 51, 58, 0) 0%, rgba(13, 13, 16, 0.6) 100%);
		border-radius: 16px;
		padding-bottom: 8px;
	}
	.cares text{
		font-size: 22px;
		height: 100%;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 30px;
		display: flex;
		flex-direction: column-reverse;
		letter-spacing: 1px;
	}
	.mid_center{
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}
	.one_center{
		width: 115px;
		font-size: 14px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #243557;
		line-height: 21px;
		margin: 0 8px;
	}
	.two_center{
		margin: 0 8px;
		width: 44px;
		height: 44px;
		background: rgba(126, 140, 172, 0.2);   
		border-radius: 12px;
		font-size: 12px;
		font-family: PingFangTC-Medium, PingFangTC;
		font-weight: 500;
		color: #243557;
		line-height: 17px;
	}
	.address{
		font-size: 12px;
		font-family: PingFangTC-Semibold, PingFangTC;
		font-weight: 600;
		color: #243557;
		line-height: 17px;
		margin-top: 11px;
		margin-bottom: 8px;
	}
	.msg{
		font-size: 12px;
		font-family: PingFangTC-Regular, PingFangTC;
		font-weight: 400;
		color: #243557;
		line-height: 18px;
		margin:0 32px;
	}
	.tnum{
		font-size: 12px;
		font-family: PingFangTC-Medium, PingFangTC;
		font-weight: 500;
		color: #243557;
		line-height: 17px;
		position: absolute;
		top: 16px;
		left: 16px;
	}
</style>
