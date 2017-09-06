<template>
    <div class="fundPortfolio">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="$router.push('/index')">
              <router-link  :to="{path:'/myAccount',query:{beforepage:'/fundPortfolio'}}"  slot="right"> 我的账户 
              </router-link>
        </x-header>
        <div class="search">
            <input type="text" placeholder="试试输入名称、代码" @click="goSearch" readonly>
        </div>
        <div class="img1">
        </div>
        <div class="tab">
            <tab :line-width="2" active-color="#4a80ff">
                <tab-item selected @on-item-click="onItemClick">股票型</tab-item>
                <tab-item @on-item-click="onItemClick">债券型</tab-item>
                <tab-item @on-item-click="onItemClick">混合型</tab-item>
                <tab-item @on-item-click="onItemClick">货币型</tab-item>
                <tab-item @on-item-click="onItemClick">QDII</tab-item>
                <tab-item @on-item-click="onItemClick">ETF</tab-item>
            </tab>
        </div>
        <div style="border-bottom: 1Px solid #d8d8d8;">
        <flexbox :gutter="0">
            <flexbox-item :span="2/6">
                <div class="flex-demo">{{title.title1}}</div>
            </flexbox-item>
            <flexbox-item :span="1.3/6">
                <div class="flex-demo">{{title.title2}}</div>
            </flexbox-item>
            <flexbox-item :span="1.3/6">
                <div class="flex-demo">{{title.title3}}</div>
            </flexbox-item>
            <flexbox-item :span="1.4/6">
                <div class="flex-demo">{{title.title4}}</div>
            </flexbox-item>
        </flexbox>
        </div>
        <div class="fundInfo" id="fundInfo">
            <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:list.code,name:list.name,type:fundType,beforepage:'/fundPortfolio'}}" v-for="list in fundInfo" :key="list.id">
            <flexbox :gutter="0" >
                <flexbox-item :span="2/6">
                    <div class="flex-demo2" style="line-height:0;">
                        <span>{{list.name}}</span>
                        <span>{{list.code}}</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1.3/6">
                    <div class="flex-demo2 lin120">
                        {{parseFloat(list.value==null?list.tenThousandReturns:list.value)}}
                    </div>
                </flexbox-item>
                <flexbox-item :span="1.3/6">
                    <div class="flex-demo2 _ff5255 lin120"  v-if="parseFloat(list.dailyIncrease==null?list.sevenDaysRate:list.dailyIncrease)>=0">
                        {{parseFloat(list.dailyIncrease==null?list.sevenDaysRate:list.dailyIncrease)}}%
                    </div>
                     <div class="flex-demo2 _36cca4 lin120"   v-if="parseFloat(list.dailyIncrease==null?list.sevenDaysRate:list.dailyIncrease)<0">
                        {{parseFloat(list.dailyIncrease==null?list.sevenDaysRate:list.dailyIncrease)}}%
                    </div>
                </flexbox-item>
                <flexbox-item :span="1.4/6">
                    <div class="flex-demo2">
                        <router-link class="buy" :to="{path:'/fundPortfolio/apply',query:{code:list.code,name:list.name,type:fundType}}" >购买</router-link>
                    </div>
                </flexbox-item>
            </flexbox>
            </router-link>
        </div>
        <p class="uptime"> 数据更新日期：2017.7.17</p>

        <div class="img2"></div>
        <div class="_Label">
            <flexbox :gutter="0">
                <flexbox-item>
                <router-link to="/fundPortfolio/tagInfo">
                    <div class="flex-demo3">
                        <span>苹果概念</span>
                    </div>
                </router-link>
                    
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <span>消费</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <span style="border:none">酿酒行业</span>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="flex-demo3">
                        <span>苹果概念</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <span>消费</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <span style="border:none">酿酒行业</span>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="flex-demo3">
                        <span>苹果概念</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <span>消费</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo3">
                        <span style="border:none">酿酒行业</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
         <div class="img3" @click="getfundInfo('1006')">
        </div>


    </div>
</template>
<script>
import { XHeader, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'fundPortfolio',
    data() {
        return {
            title: {
                title1: "基金名称",
                title2: "单位净值",
                title3: "日涨跌幅",
                title4: "购买"
            },
            fundInfo: [],
            fundType:'1000',//基金类型
        }
    },
    computed: {
       
    },
    components: {
        XHeader,
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem
    },
    mounted() {
        this.getfundInfo('1000')
    },
    methods: {
        goSearch() {
            this.$router.push('/fundPortfolio/search');
        },
        onItemClick(index) {
        document.querySelectorAll('#fundInfo')[0].scrollTop=0;
            if (index == 0 || index == 1 || index == 2 || index == 3) {
                this.title.title2 = "单位净值";
                this.title.title3 = "日涨跌幅";
            } else if (index == 4) {
                this.title.title2 = "收盘价";
                this.title.title3 = "日涨跌幅";
            } else if (index == 5) {
                this.title.title2 = "每万份收益";
                this.title.title3 = "七日年化";
            }
            switch (index) {
                case 0:
                    this.fundType="1000";
                    break;
                 case 1:
                    this.fundType="1001";
                    break;
                case 2:
                    this.fundType="1002";
                    break;
                case 3:
                    this.fundType="1005";
                    break;
                case 4:
                    this.fundType="1003";
                    break;
                case 5:
                    this.fundType="1004";
                    break;
            }
            this.getfundInfo(this.fundType);
        },
        getfundInfo(fundType) {
            //基金获取接口
            // this.fundInfo = [];
            let _this = this;
            this.post({
                url: "/fundMsg/queryFundMsg/v1.0",
                data:{
                fundType:fundType
                },
                success: function(e) {
                    if(e.code=="0000"){
                        _this.fundInfo=e.result.list;
                    }
                }
            })


        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/fundPortfolio';
</style>

