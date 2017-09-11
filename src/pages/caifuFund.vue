<template>
    <div class="caifuFund">
        <yheader title="拍活期基金" fontstyle="color:black" headerstyle="background:#fff"></yheader>
        <div style="background:white;padding-bottom:20px;">
            <ul class="fund_list">
                <li>总资产</li>
                <li>{{numberComma(Number(demandInfo.amount))}}</li>
            </ul>

            <div class="info">
                <div class="hr hr1"></div>
                <div class="hr hr2"></div>
                <div class="hr hr3"></div>
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>持仓份额</span>
                            <br>
                            <span>{{numberComma(Number(demandInfo.InvestAmount))}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>万份收益</span>
                            <br>
                            <span>{{numberComma(Number(demandInfo.thousandReturns))}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>未确认金额</span>
                            <br>
                            <span>{{numberComma(Number(demandInfo.unSubmitAmount))}}</span>
                        </div>
                    </flexbox-item>
                </flexbox>

                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>昨日收益</span>
                            <br>
                           <span>{{numberComma(Number(demandInfo.yestardayAgainst))}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>总收益</span>
                            <br>
                             <span>{{numberComma(Number(demandInfo.demandAgainst))}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div style="padding-top:20px;">
                <flexbox>
                    <flexbox-item>
                        <router-link :to="{path:'/fundPortfolio/redeem',query:{code:'888888',name:'拍活期基金',type:'1006'}}" >
                            <div class="redeem">
                                赎回
                            </div>
                        </router-link>
                    </flexbox-item>
                    <flexbox-item>
                        <router-link :to="{path:'/fundPortfolio/apply',query:{code:'888888',name:'拍活期基金',type:'1006'}}">
                            <div class="buy">
                                    申购
                            </div>
                        </router-link>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>

        <div style="bottom">
            <div class="logo">
            </div>
            <p>本基金为虚拟基金，万份收益根据拍活期收益率计算所得，购买真实拍活期请下载拍财富APP或访问www.paicaifu.com
            </p>
        </div>

    </div>
</template>
<script>
import yheader from '../components/ycheader'
import { Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'caifuFund',
    data() {
        return {
            demandInfo:{
                InvestAmount:0,
                amount:0,
                demandAgainst:0,
                thousandReturns:0,
                unSubmitAmount:0,
                yestardayAgainst:0
            }
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
        this.getCaifund();
    },
    methods: {
        getCaifund(){
            let _this = this;
            this.post({
                url: "/fundDemand/fundDemandInfo/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                       _this.demandInfo=e.result.demandInfo;
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/caifuFund.less';
</style>

