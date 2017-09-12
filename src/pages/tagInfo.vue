<template>
    <div class="tagInfo">
        <x-header :left-options="{backText: ''}" style="border-bottom:1px solid #d8d8d8">
        </x-header>
        <div class="top">
            <p>涉及{{$route.query.sectorFundType}}产品供应链</p>
            <p>
                <span>“</span>{{$route.query.ftTemplateDescribe}}
                <span>”</span>
            </p>
        </div>
        <div class="bottom" v-cloak>
            <div class="content" v-for="list in lists" :key="list.id" v-cloak>
                <router-link :to="{path:'/fundPortfolio/fundDetails',query:{name:list.name,type:list.type,code:list.code}}">
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexbox-item :span="2.2/7">
                        <div class="flex-demo">
                            <p style="font-size:16px" :class="tool.colorType(list.dailyIncrease)">{{Number(list.dailyIncrease)}}%</p>
                            <span>日涨幅</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="2.6/7">
                        <div class="flex-demo">
                            <p class="name">{{list.name}}</p>
                            <span>{{list.code}}</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="2.2/7">
                    <router-link :to="{path:'/fundPortfolio/apply',query:{name:list.name,type:list.type,code:list.code}}">
                         <div class="flex-demo">
                            <span class="buy">购买</span>
                        </div>
                    </router-link>
                       
                    </flexbox-item>
                </flexbox>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { XHeader, Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'tagInfo',
    data() {
        return {
            lists: []
        }
    },
    computed: {

    },
    components: {
        XHeader,
        Flexbox,
        FlexboxItem
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            let _this = this;
            this.post({
                url: "/fundMsg/querySectorFund/v1.0",
                data: {
                    sectorFundType: _this.$route.query.sectorFundType
                },
                success: function(e) {
                    if (e.code == "0000") {
                        _this.lists = e.result.list;
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.top p:nth-child(1) {
    font-size: 34px;
    color: #4a80ff;
    padding: 54px 0 30px 40px;
}

.top p:nth-child(2) {
    font-size: 26px;
    color: #888888;
    padding: 0 125px 40px 50px;
    position: relative;
}

.top p:nth-child(2) span {
    color: #7eb1fd;
    font-size: 26px;
}

.top p:nth-child(2) span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 35px;
}

.bottom {
    background: #f4f4f4;
    padding-top: 20px;
}

.content {
    background: white;
    padding: 20px 0;
    border-bottom: 1px solid #d8d8d8;
    position: relative;
}

.content .flex-demo {
    text-align: center;
}

.updown {
    font-size: 42px;
    color: #fb524d
}

.updown+span {
    color: #888888;
    font-size: 26px;
}

.buy {
    display: inline-block;
    width: 1.28rem;
    height: 0.61333rem;
    background: #4a80ff;
    border-radius: 3px;
    color: white;
    font-size: 0.34667rem;
    line-height: 0.64rem;
}

.name {
    padding: 10px 0;
}

.name+span {
    font-size: 26px;
    color: #888888;
}

.hr {
    width: 1Px;
    background: #ebebeb;
    height: 90px;
    position: absolute;
    left: 30%;
    top: 20%;
}
</style>

