<template>
    <div class="fundPortfolio">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="$router.push('/index')">
              <router-link to="/myAccount" slot="right"> 我的账户 </router-link>
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
        <div class="fundInfo">
            <router-link to="/fundPortfolio/fundDetails">
            <flexbox :gutter="0">
                <flexbox-item :span="2/6">
                    <div class="flex-demo2" style="line-height:0;">
                        <span>上投摩根核心成长</span>
                        <span>000457</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="1.3/6">
                    <div class="flex-demo2">1.9560</div>
                </flexbox-item>
                <flexbox-item :span="1.3/6">
                    <div class="flex-demo2" :style="_color">0.31%</div>
                </flexbox-item>
                <flexbox-item :span="1.4/6">
                    <div class="flex-demo2">
                        <router-link class="buy" to="/fundPortfolio/apply">购买</router-link>
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
         <div class="img3">
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
        }
    },
    computed: {
        _color() {
            return "color:#ff5354";//颜色  #36cca4
        }
    },
    components: {
        XHeader,
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem
    },
    mounted() {

    },
    methods: {
        goSearch() {
            this.$router.push('/fundPortfolio/search');
        },
        onItemClick(index) {
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

            this.getfundInfo(index);
        },
        getfundInfo(index) {
            //基金获取接口
            this.fundInfo = [];
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/fundPortfolio';
</style>

