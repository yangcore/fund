<template>
    <div class="fundDetails">
        <yheader fontstyle="color:black" headerstyle="background:#fff" style="border-bottom:1px solid #d8d8d8">
            <p slot="header" class="header_title" style="">
                <span>易方达消费行业</span>
                <span> 110022 股票型</span>
            </p>
            <span slot="right" class="right">基金</span>
        </yheader>
        <div class="center">
            <flexbox>
                <flexbox-item>
                    <div class="flex-demo">
                        <p>最新净值</p>
                        <span style="color:#4a80ff">673.15</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo">
                        <p>日涨幅值</p>
                        <span style="color:#36cca4">-0.37%</span>
                    </div>
                </flexbox-item>
            </flexbox>
            <p class="uptime">数据更新日期：2017.7.17</p>
        </div>


        <div class="_Label">
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="flex-demo3">
                        <div>累计净值</div>
                        <span>1.8720</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <div>近1个月</div>
                        <span class="_36cca4">-0.37%</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3" style="border:none">
                        <div>近3个月</div>
                        <span class="_ff5255">-2.9%</span>
                    </div>
                </flexbox-item>
            </flexbox>
           <flexbox :gutter="0">
                <flexbox-item>
                    <div class="flex-demo3">
                        <div>近一年</div>
                        <span class="_36cca4">1.8720</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <div>近三年</div>
                        <span>-0.37%</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3" style="border:none">
                        <div>成立以来</div>
                        <span class="_ff5255">-2.9%</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <p class="time">成立日期:2010.7.10&nbsp;&nbsp;&nbsp;&nbsp; 基金经理:萧楠</p>
        <div class="bottom">
            <p>单位净值走势:</p>
            <p><a href="">http://www.efunds.com.cn/html/fund/110022_fundinfo.htm</a></p>
            <p>拍财富基金智投顾观点：该基金主要投向大消费行业，风格鲜明、稳定、具备较高配置价值</p>
            <p><span class="tag">大消费</span><span class="tag">大消费</span></p>
        </div>
        <router-link to="/fundPortfolio/apply">
            <div class="buy">立刻购买</div>
        </router-link>
    </div>
</template>
<script>
import yheader from '../components/ycheader'
import { Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'fundDetails',
    data() {
        return {
            value: ""
        }
    },
    computed: {

    },
    components: {
        yheader,
        Flexbox,
        FlexboxItem
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.fundDetails{
    background: #f4f4f4;
    height: 100%;
}
.header_title {
    width: 50%;
    color: black;
    height: 40px;
    float: left;
    height: 46Px;
    overflow: hidden;
    text-align: center;
    margin-left: 13%;
}

.header_title span:nth-child(1) {
    margin-top: 5PX;
    display: block;
    font-size: 15Px;
}

.header_title span:nth-child(2) {
    display: block;
    font-size: 12Px;
    color: #888888;
    margin-top: -5Px;
}

.right {
    float: right;
    line-height: 46Px;
    margin-right: 4%;
    font-size: 16Px;
}
.center{
    background: white;
}
.flex-demo{
    text-align: center;
}
.flex-demo p{
    font-size: 26px;
    color: #888888;
}
.flex-demo span{
    font-size: 70px;
    color: #4a80ff;
}
.center{
    padding-top: 30px;
}
.uptime{
    color: #888888;
    text-align: center;
    font-size: 26px;
    padding-bottom: 20px;
}
.flex-demo3{
    text-align: center;
    border-right: 1Px solid #d8d8d8;
}
.flex-demo3 div{
    color: #888888;
    font-size: 26px;
}
.flex-demo3 {
    margin:  20px 0;
}
._Label{
    background: white;
    padding-top: 30px;
    margin-top: 30px;
    border-bottom: 1Px solid #d8d8d8;
}
.time{
    color: #888888;
    font-size: 26px;
    padding-bottom: 20px;
    background: white;
    padding: 10px 0 10px 30px;
}
.bottom{
    padding: 30px 20px 30px 30px;
    background: white;
    margin-top: 30px;
}
.bottom p:nth-child(1){
    color: #4a80ff;
}
.bottom p:nth-child(3){
    color: #888;
    margin-top: 20px;
}
.bottom p:nth-child(4){
   color: #888;
   margin-top: 30px;
}
.bottom p:nth-child(4) span{
    display: inline-block;
    width: 100px;
    height: 40px;
    border: 1Px solid #888888;
    line-height: 42px;
    font-size: 26px;
    text-align: center;
    border-radius: 2Px;
    margin-right: 30px;
}
.buy{
    width: 80%;
    height: 80px;
    background: #4a80ff;
    margin: 0 auto;
    text-align: center;
    color: white;
    line-height: 80px;
    border-radius: 3px;
    margin-top: 60px;
}

</style>

