<template>
    <div class="apply">
        <x-header :left-options="{backText: ''}">
            <span slot="default" style="color:black">申购</span>
        </x-header>
        <div class="apply_box">
            <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:$route.query.code,name:$route.query.name,type:$route.query.type}}">
                <h1>{{$route.query.name}} {{$route.query.code}}
                    <i class="iconfont">&#xe752;</i>
                </h1>
            </router-link>
            <div class="balance">
                <span>可用余额</span>
                <input type="number" v-model="fvaBalance" readonly>
                <span>(拍金币)</span>
            </div>
            <div class="balance money">
                <span style="float:left">投资金额</span>
                <group style="float:left">
                    <x-number :width="widthinput" v-model="amount" style="float:left" :step="10000" :min='0' :max='1000000'></x-number>
                </group>
                <!-- <input type="number" v-model="amount"> -->
                <span style="float:right">(拍金币)</span>
            </div>
        </div>
        <p :class="buyBackground" @click="apply">{{btnMsg}}</p>
        <p class="tips">
            <span>温馨提示:</span>交易日15：00前申购，下一交易日确认金额</p>
        <ymask :maskShow="maskShow"></ymask>
        <div class="alert" v-show="maskShow">
            <p>订单提交成功，交易确认中</p>
            <div class="alert_info">
                申购产品：{{applyResult.fundName}}
                <br> 申购金额：
                <span style="color:#4a80ff">{{ Number(applyResult.amount)}}</span>
                <br> 预计确认日期：{{applyResult.verifyDate}}
            </div>
            <div class="bottom_btn">
                <span @click="maskShow=!maskShow,amount=0">继续购买</span>
                <span @click="$router.go(-1)">返回</span>
                <span @click="$router.push('/myAccount')">我的账户</span>
            </div>
        </div>

    </div>
</template>
<script>
import { XHeader, XNumber, Group } from 'vux'
import ymask from '../components/Mask'
export default {
    name: 'apply',
    data() {
        return {
            maskShow: false,
            amount: 0,//订单金额
            fvaBalance: '',//可用余额
            widthinput: "70px",
            btnMsg: "购买",
            applyResult: {},
            buyBackground: 'buy2'
        }
    },
    computed: {

    },
    components: {
        XHeader,
        ymask,
        XNumber,
        Group
    },
    mounted() {
        this.applyInfo();
    },
    methods: {
        applyInfo(fundCode) {
            let _this = this;
            this.post({
                url: "/fundTrans/queryAcctMsg/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        _this.fvaBalance = e.result.acctMsg.fvaBalance;
                    }
                }
            })
        },
        apply() {
            let _this = this;
            if (this.amount == 0 || this.amount > this.fvaBalance) {
                return;
            }
            this.post({
                url: "/fundTrans/buy/v1.0",
                data: {
                    fundCode: _this.$route.query.code,
                    amount: _this.amount
                },
                success: function(e) {
                    if (e.code == "0000") {
                        let result = e.result;
                        _this.applyResult = result;
                        _this.amount=0;
                        _this.fvaBalance = _this.fvaBalance - result.amount;
                        _this.maskShow = true;
                    } else if (e.code == "1002" || e.code == "1005" || e.code == '1006' || e.code == '1007' ||e.code == '1008') {
                        _this.$vux.alert.show({
                            title: '提示',
                            content: e.msg
                        })
                    }
                }
            })
        }
    },
    watch: {
        amount: function(n, o) {
            if (this.amount !== 0) {
                this.buyBackground = 'buy1';
            } else {
                this.buyBackground = 'buy2';
            }
            if (n > this.fvaBalance) {
                this.btnMsg = "余额不足";
                this.buyBackground = 'buy2';
            } else {
                this.btnMsg = "购买"
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.apply_box h1 {
    font-size: 30px;
    padding: 30px 0 30px 30px;
    background: #f4f4f4;
}

.apply_box h1 i {
    font-size: 20px;
    float: right;
    margin-right: 40px;
    color: #aeaeae;
    margin-top: 10px;
}

.balance {
    padding: 25px 0 25px 30px;
    border-bottom: 1PX solid #d8d8d8;
    overflow: hidden;
}

.balance .weui-cell:before {
    border: none;
}

.balance.money .weui-cell {
    padding: 0 0 0 50px;
}

.balance span:nth-child(1) {
    font-size: 36px;
}

.balance input:nth-child(2) {
    font-size: 36px;
    color: #4a80ff;
    margin-left: 40px;
    border: none;
    width: 40%;
}

.balance span:nth-child(3) {
    font-size: 36px;
    color: #4a80ff;
    float: right;
    margin-right: 40px;
}

.buy1 {
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

.buy2 {
    width: 90%;
    height: 80px;
    line-height: 80px;
    background: #888;
    text-align: center;
    color: white;
    margin: 0 auto;
    border-radius: 3Px;
    margin-top: 60px;
}

.tips {
    font-size: 26px;
    text-align: center;
    padding-top: 30px;
    color: #888888;
}

.tips span {
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

.alert>p {
    font-size: 30px;
    color: #333333;
    padding: 60px 0 40px 0;
    line-height: 20px;
}

.alert_info {
    font-size: 30px;
    font-weight: 600;
    line-height: 46px;
}

.bottom_btn {
    padding-top: 30px;
}

.bottom_btn span {
    display: inline-block;
    width: 156px;
    height: 60px;
    line-height: 60px;
    border: 1Px solid #4a80ff;
    border-radius: 3Px;
    color: #4a80ff;
    margin: 10px;
}

.bottom_btn span:nth-child(3) {
    background: #4a80ff;
    color: white;
}
</style>

