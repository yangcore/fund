<template>
    <div class="fundPortfolio">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="$router.push('/index')">
            <router-link :to="{path:'/myAccount',query:{beforepage:'/fundPortfolio'}}" slot="right"> 我的账户
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
            <div v-for="list in fundInfo" :key="list.id">
            <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:list.code,name:list.name,type:fundType,beforepage:'/fundPortfolio'}}" >
                <flexbox :gutter="0">
                    <flexbox-item :span="2/6">
                        <div class="flex-demo2" style="line-height:0;">
                            <span>{{list.name}}</span>
                            <span>{{list.code}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="1.3/6">
                        <div class="flex-demo2 lin120">
                            {{Number((list.type=='1005' || list.type=='1006')?list.tenThousandReturns:list.value)}}
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="1.3/6">
                        <div class="flex-demo2  lin120" :class="colorType(Number((list.type=='1005' || list.type=='1006')?list.sevenDaysRate:list.dailyIncrease))">
                            {{Number((list.type=='1005' || list.type=='1006')?list.sevenDaysRate:list.dailyIncrease)}}%
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="1.4/6">
                        <div class="flex-demo2">
                            <router-link class="buy" :to="{path:'/fundPortfolio/apply',query:{code:list.code,name:list.name,type:fundType}}">购买</router-link>
                        </div>
                    </flexbox-item>
                </flexbox>
            </router-link>
             </div>
             <p class="uptime"> 最新净值日期：{{ upTime }}</p>
        </div>


        <div class="img2"></div>
        <div class="_Label">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span='1/3' v-for="(list,index) in sectorList" :key="list.id">
                    <router-link :to="{path:'/fundPortfolio/tagInfo',
                        query:{sectorFundType:list.ftTemplateName,ftTemplateDescribe:list.ftTemplateDescribe}}">
                        <div class="flex-demo3">
                            <span v-if="(index+1)%3!==0">{{list.ftTemplateName}}</span>
                            <span v-else style="border:none">{{list.ftTemplateName}}</span>
                        </div>
                    </router-link>
                </flexbox-item>
            </flexbox>
        </div>
        <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:'888888',name:'拍活期基金',type:'1006',beforepage:'/fundPortfolio'}}">
            <div class="img3" @click="getfundInfo('1006')">
            </div>
        </router-link>

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
            fundType: '1000',//基金类型
            sectorList: [],
            upTime:''
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
        this.getfundInfo('1000');
        this.querySector();
    },
    methods: {
         colorType(e) {
            if (e >= 0) {
                return "_ff5255"
            } else {
                return "_36cca4"
            }
        },
        goSearch() {
            this.$router.push('/fundPortfolio/search');
        },
        onItemClick(index) {
            document.querySelectorAll('#fundInfo')[0].scrollTop = 0;
            if (index == 3) {
                this.title.title2 = "万份收益";
                this.title.title3 = "七日年化";
            } else {
                this.title.title2 = "单位净值";
                this.title.title3 = "日涨跌幅";
            }
            switch (index) {
                case 0:
                    this.fundType = "1000";
                    break;
                case 1:
                    this.fundType = "1001";
                    break;
                case 2:
                    this.fundType = "1002";
                    break;
                case 3:
                    this.fundType = "1005";
                    break;
                case 4:
                    this.fundType = "1003";
                    break;
                case 5:
                    this.fundType = "1004";
                    break;
            }
            this.getfundInfo(this.fundType);
        },
        getfundInfo(fundType) {
            //基金获取接口
            let _this = this;
            this.post({
                url: "/fundMsg/queryFundMsg/v1.0",
                data: {
                    fundType: fundType
                },
                success: function(e) {
                    if (e.code == "0000") {
                        _this.fundInfo = e.result.list;
                        _this.upTime=e.result.list[0].updateDate;
                    }
                }
            })
        },
        querySector() {
            let _this = this;
            this.post({
                url: "/fundMsg/querySector/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        _this.sectorList = e.result.sectorList;
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

