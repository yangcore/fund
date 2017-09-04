<template>
    <div class="tagInfo">
        <x-header :left-options="{backText: ''}" style="border-bottom:1px solid #d8d8d8">
        </x-header>
        <div class="top">
            <p>涉及苹果公司产品供应链</p>
            <p>
                <span>“</span>茁壮成长，有一点的风险，适应于短期投资。茁壮 成长，有一点的风险，适应于短期投资。有一点的 风险，适应于短期投资。
                <span>”</span>
            </p>
        </div>
        <div class="bottom">
            <div class="content">
                <div class="hr"></div>
            <flexbox :gutter="0">
                <flexbox-item :span="2.2/7">
                    <div class="flex-demo">
                        <p class="updown">0.31%</p>
                        <span>日涨幅</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="2.6/7">
                    <div class="flex-demo">
                          <p class="name">上投摩根核心成长</p>
                          <span>000457</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="2.2/7">
                    <div class="flex-demo">
                        <span class="buy">购买</span>
                    </div>
                </flexbox-item>
            </flexbox>
            </div>
        </div>
    </div>
</template>
<script>
import { XHeader,Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'tagInfo',
    data() {
        return {
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

    },
    methods: {

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
.content .flex-demo{
    text-align: center;
}
.updown{
    font-size:42px;
    color:#fb524d
}
.updown+span{
    color:#888888;
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
.name{
    padding:10px 0;
}
.name+span{
    font-size: 26px;
    color:#888888;
}
.hr{
    width: 1Px;
    background: #ebebeb;
    height: 90px;
    position: absolute;
    left: 30%;
    top: 20%;
}
</style>

