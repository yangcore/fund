<template>
    <div class="apply">
          <x-header :left-options="{backText: ''}"> <span slot= "default" style="color:black">赎回</span> </x-header>
          <div class="apply_box">
               <router-link to="/fundPortfolio/fundDetails">
                    <h1>易方达消费行业 110022 <i class="iconfont">&#xe752;</i></h1>
               </router-link>
              <div class="balance">
                  <span>可赎回份额</span>
                  <input type="number" value="110022" readonly>
              </div>
              <div class="balance money">
                  <span>赎回份额</span>
                   <input type="number" value="110022">
              </div>
          </div>
        <p class="buy">赎回</p>
        <p class="tips"><span>温馨提示:</span>交易日15：00前赎回，下一交易日确认金额</p>


<ymask :maskShow="maskShow"></ymask>
        <div class="alert" v-show="maskShow">
            <p>订单提交成功，交易确认中</p>
            <div class="alert_info">
                赎回产品：易方达消费行业
                <br> 赎回份额：<span style="color:#4a80ff">100,000</span>
                <br> 预计确认日期：2017.7.28
            </div>
            <div class="bottom_btn">
                <span>继续赎回</span>
                <span>返回</span>
                <span>我的账户</span>
            </div>
        </div>

    </div>
</template>
<script>
import ymask from '../components/Mask'
import { XHeader } from 'vux'
export default {
    name: 'apply',
    data() {
        return {
            value:"",
             maskShow: false
        }
    },
    computed: {

    },
    components: {
        XHeader,
        ymask
    },
    mounted() {
      
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.apply_box h1{
    font-size: 30px;
    padding: 30px 0 30px 30px ;
    background: #f4f4f4;
}
.apply_box h1 i{
    font-size: 20px;
    float: right;
    margin-right: 40px;
    color: #aeaeae;
    margin-top: 10px;
}
.balance{
    padding: 25px 0 25px 30px ;
    border-bottom: 1PX solid #d8d8d8;
}
.balance span:nth-child(1){
    font-size: 36px;
}
.balance input:nth-child(2) {
    font-size: 36px;
    color: #4a80ff;
    margin-left: 40px;
    border: none;
    width: 40%;
}

.balance span:nth-child(3){
    font-size: 36px;
    color: #4a80ff;
    float: right;
     margin-right: 40px;
}
.buy{
    width: 90%;
    height: 80px;
    line-height: 80px;
    background: #4a80ff;
    text-align: center;
    color: white;
    margin: 0 auto;
    border-radius: 3Px;
    margin-top: 60px;
}
.tips{
    font-size: 26px;
    text-align: center;
    padding-top: 30px;
    color: #888888;
}
.tips span{
    color: #fc534d;
}

.alert {
    width: 586px;
    height: 400px;
    border-radius: 10Px;
    background: white;
    position: fixed;
    z-index: 40005;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}

.alert >p{
    font-size: 30px;
    color: #333333;
    padding: 60px 0 40px 0;
    line-height: 20px;
}
.alert_info{
    font-size: 30px;
    font-weight: 600;
     line-height: 46px;
}
.bottom_btn{
    padding-top: 30px;
}
.bottom_btn span{
    display: inline-block;
    width: 156px;
    height: 60px;
    line-height: 60px;
    border: 1Px solid #4a80ff;
    border-radius: 3Px;
    color: #4a80ff;
    margin: 10px;
}
.bottom_btn span:nth-child(3){
    background:  #4a80ff;
    color: white;
}
</style>

