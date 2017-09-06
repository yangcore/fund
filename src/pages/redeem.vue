<template>
    <div class="apply">
        <x-header :left-options="{backText: ''}">
            <span slot="default" style="color:black">赎回</span>
        </x-header>
        <div class="apply_box">
            <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:$route.query.code,name:$route.query.name,type:$route.query.type}}">
                <h1>{{$route.query.name}} {{$route.query.code}}
                    <i class="iconfont">&#xe752;</i>
                </h1>
            </router-link>
            <div class="balance">
                <span>可赎回份额</span>
                <input type="number" v-model="canRedeem" readonly>
            </div>
            <div class="balance money">
                <span>赎回份额</span>
                <input type="number" onkeyup="value=value.replace(/[^\d.]/g,'')" v-model="amount">
            </div>
        </div>
        <p :class="buyBackground" @click="redeem">{{btnMsg}}</p>
        <p class="tips">
            <span>温馨提示:</span>交易日15：00前赎回，下一交易日确认金额</p>

        <ymask :maskShow="maskShow"></ymask>
        <div class="alert" v-show="maskShow">
            <p>订单提交成功，交易确认中</p>
            <div class="alert_info">
                赎回产品：{{successInfo.fundName}}
                <br> 赎回份额：
                <span style="color:#4a80ff">{{successInfo.amount}}</span>
                <br> 预计确认日期：{{successInfo.verifyDate}}
            </div>
            <div class="bottom_btn">
                <span @click="maskShow=!maskShow,amount=''">继续赎回</span>
                <span @click="$router.go(-1)">返回</span>
                <span @click="$router.push('/myAccount')">我的账户</span>
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
            maskShow: false,
            canRedeem: 0,
            amount: '',
            successInfo: {
                fundName: '',
                amount: 0,
                verifyDate: ''
            },
            buyBackground: 'buy2',
            btnMsg: "赎回"
        }
    },
    computed: {

    },
    components: {
        XHeader,
        ymask
    },
    mounted() {
        this.redeemInfo()
    },
    methods: {
        redeemInfo(fundCode) { //基金可赎回份额查询
            let _this = this;
            this.post({
                url: "/fundTrans/queryCanRedeem/v1.0",
                data: {
                    fundCode: _this.$route.query.code
                },
                success: function(e) {
                    if (e.code == "0000") {
                        _this.canRedeem = e.result.canRedeem;
                    }
                }
            })
        },
        redeem() {
            let _this = this;
            if (this.amount == 0 || this.amount == '' || this.amount > this.canRedeem) {
                return;
            }
            this.post({
                url: "/fundTrans/redeem/v1.0",
                data: {
                    fundCode: _this.$route.query.code,
                    amount: _this.amount
                },
                success: function(e) {
                    if (e.code == "0000") {
                        _this.successInfo = e.result;
                        _this.maskShow = true;
                        _this.amount = '';
                        _this.canRedeem = _this.canRedeem - e.result.amount;
                    } else if (e.code == "1002" || e.code == "1005" || e.code == "1006" || e.code == "1007" || e.code == "1008") {
                        _this.$vux.alert.show({
                            title: '提示',
                            content: e.msg
                        })
                    }
                }
            })
        }
    }, watch: {
        amount: function(n, o) {
            //    console.info(n,o);
            if (this.amount == 0 || this.amount == '' || this.amount > this.canRedeem) {
                this.buyBackground = 'buy2'
            } else {
                this.buyBackground = 'buy1'
            }
            if (this.amount > this.canRedeem) {
                this.btnMsg = '赎回份额大于当前可赎回份额'
            } else {
                this.btnMsg = '赎回'
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

