<template>
    <div class="fundPortfolio">
        <div style="background:#4a80ff">
            <yheader title="基金" fontstyle="color:white" headerstyle="background:#4a80ff"></yheader>
            <!-- 总资产 -->
            <ul class="fund_list">
                <li>总资产</li>
                <li v-cloak>{{numberComma(Number(fundInfo.fundAmount)?Number(fundInfo.fundAmount):0)}}</li>
                <li v-cloak>最新净值日期：{{fundInfo.buildDate!=="null"?fundInfo.buildDate:'- -   - -'}}</li>
            </ul>
            <div class="info">
                <div class="hr hr1"></div>
                <div class="hr hr2"></div>
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>基金总市值</span>
                            <br>
                            <span v-cloak>{{numberComma(Number(fundInfo.marketValueAmount)?Number(fundInfo.marketValueAmount):0)}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>基金未确认金额</span>
                            <br>
                            <span v-cloak>{{numberComma(Number(fundInfo.unSubmitAmount)?Number(fundInfo.unSubmitAmount):0)}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>基金总收益</span>
                            <br>
                            <span v-cloak>{{numberComma(Number(fundInfo.fundAgainst)?Number(fundInfo.fundAgainst):0)}}</span>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <p class="tips">*本活动所有计价单位均为拍财富虚拟货币拍金币</p>
        <div v-if="fundList.length>0" style="padding-bottom:100px">
        <div class="card" v-for="list in fundList" :key="list.id" v-cloak>
            <h1>
                <span>{{list.fundName}}</span> <span>{{list.fundCode}}</span>
                <div>
                    <router-link :to="{path:'/fundPortfolio/redeem',query:{code:list.fundCode,name:list.fundName,type:list.fundType}}" class="redeem">赎回</router-link>
                     <router-link class="buy" :to="{path:'/fundPortfolio/apply',query:{code:list.fundCode,name:list.fundName,type:list.fundType}}">购买</router-link>
                </div>
            </h1>
            <div style="background:white">
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>{{Number(list.fundMarketValue)}}</span>
                            <br>
                            <span>最新市值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black" v-if="list.fundType!=='1005' && list.fundType!=='1006'">
                            <span>{{Number(list.fundNetValue)}} </span>
                            <br>
                            <span>最新净值</span>
                        </div>
                        <div class="flex-demo black" v-if="list.fundType=='1005' || list.fundType=='1006'">
                            <span>{{Number(list.thousand)}} </span>
                            <br>
                            <span>万份收益</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>{{Number(list.fundInvestAmount)}}</span>
                            <br>
                            <span>持仓份额</span>
                        </div>
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span :class="colorType(list.yestardayAgainst)">{{Number(list.yestardayAgainst)}}</span>
                            <br>
                            <span>昨日收益</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span :class="colorType(list.AgainstAmount)">{{Number(list.AgainstAmount)}}</span>
                            <br>
                            <span>总收益</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:list.fundCode,name:list.fundName,type:list.fundType}}">
                                <i class="iconfont"  style="color:#b3b3b3">&#xe752;</i>
                            </router-link>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import yheader from '../components/ycheader'
import { Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'fundTotalAssets',
    data() {
        return {
            fundInfo:{
                fundAmount:0,
                fundAgainst:0,
                buildDate:'--',
                unSubmitAmount:0,
                marketValueAmount:0
            },
            fundList:[]
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
        this.getfundInfo();
        this.getfundList();
    },
    methods: {
        colorType(e){
            if(e>=0){
                return "_ff5255"
            }else{
                 return "_36cca4"
            }
        },
        getfundInfo(){
            let _this = this;
            this.post({
                url: "/fundUser/fundInfo/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                       _this.fundInfo=e.result.fundInfo;
                    }
                }
            })
        },
        getfundList(){
             let _this = this;
            this.post({
                url: "/fundUser/fundDetail/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                       _this.fundList=e.result.list;
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/fundTotalAssets.less';
</style>

