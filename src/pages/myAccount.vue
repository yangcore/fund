<template>
    <div class="myAccount">
        <div @click="maskShow=!maskShow"><ymask :maskShow="maskShow" ></ymask></div>
        <div class="list_box"  v-show="maskShow">
            <h1 class="title"></h1>
            <lists :items="items"  class="lists">
            </lists>
         </div>
        <x-header :left-options="{backText: ''}" >
        </x-header>
        <x-header :left-options="{showBack: false}">
            <router-link to="/fundPortfolio" slot="left"> 基金综合页 </router-link>
            <a slot="right" @click="maskShow=!maskShow">排行榜</a>
        </x-header>
        <div class="chart">
            <div id="chart">
            </div>
            <p class="info" :class="[obj.percent=='&nbsp;&nbsp;'?top1:top2]">
                <span>
                    {{obj.name+"占比"}}
                </span>
                <br>
                <span v-html="obj.percent">
                </span>
            </p>
        </div>
        <div style="background:white">
            <p class="totalAssets">{{ totalAssets}}</p>
            <p>总资产</p>
            <div class="center-info">
                <div>
                    <p>
                        <i class="iconfont">&#xe623;</i>563.3</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>总收益(拍金币)</p>
                </div>
                <div>
                    <p>
                        <i class="iconfont">&#xe6b3;</i>563.3</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>可用余额(拍金币)</p>
                </div>
                <div>
                    <p>
                        <i class="iconfont">&#xe611;</i>56%</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>盈亏比</p>
                </div>
                <div>
                    <p>
                        <i class="iconfont">&#xe600;</i>2017.8.24</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>组合创立日期</p>
                </div>
                <div class="partingLine"></div>
            </div>
        </div>
        <div class="box2">
            <group>
                <cell title="基金总资产" is-link link="/myAccount/fundTotalAssets">
                    <i slot="icon" class="info-bottom-i1">
                        &nbsp;&nbsp;&nbsp;
                    </i>
                </cell>
            </group>
            <group>
                <cell title="拍活期基金总资产" is-link link="/myAccount/caifuFund">
                    <i slot="icon" class="info-bottom-i2">
                        &nbsp;&nbsp;&nbsp;
                    </i>
                </cell>
            </group>
            <group>
                <cell title="操作记录" is-link link="/myAccount/myOrder">
                    <i slot="icon" class="info-bottom-i3">
                        &nbsp;&nbsp;&nbsp;
                    </i>
                </cell>
            </group>
        </div>
        <div class="bottom-box">
            <img src="https://cdn.paicaifu.com/webapp/image/inapp/fund/code.jpg">
            <p>本基金模拟活动为虚拟投资活动
                <br><span>拍金币</span>为虚拟货币
                <br> 个人真实财富管理请移步拍财富APP
            </p>
        </div>
    </div>
</template>
<script>
import { XHeader, Group, Cell } from 'vux'
import ymask from '../components/Mask'
import tool from "../tool/tool"
import lists from '../components/lists'//排行榜组件
import pie from '../components/pie' //饼图
export default {
    name: 'myAccount',
    data() {
        var data = [{
            value: 3661,
            name: '股票型'
        }, {
            value: 5713,
            name: '债券型'
        }, {
            value: 9938,
            name: '混合型'
        }, {
            value: 17623,
            name: '货币型'
        }, {
            value: 3299,
            name: 'QDII'
        }, {
            value: 3299,
            name: 'ETF'
        }];
        return {
            top1:"top1",
            top2:"top2",
            maskShow:false,
            totalAssets: tool.fmoney(2121212, 2),//总资产
            obj: { name: "资产", percent: "&nbsp;&nbsp;" },
            myChart: {},
            option: pie.pie(data)
        }
    },
    computed: {
            items(){
            return [
            {user:121212,sy:2112}
            ,{user:121212,sy:2112},
             {user:121212,sy:2112}
            ,{user:121212,sy:2112},
             {user:121212,sy:2112}
            ,{user:121212,sy:2112}
            ] //排行榜数据
        }
    },
    components: {
        XHeader,
        Group,
        Cell,
        ymask,
        lists
    },
    mounted() {
        this.chartInit();
    },
    methods: {
        chartInit() {
            let _this = this;
            window.onresize = function() {
                _this.myChart.resize();
            }
            this.myChart = echarts.init(document.getElementById('chart'));
            this.myChart.setOption(this.option);
            this.myChart.on("click", function(obj) {
                _this.obj = obj.data;
                _this.obj.percent = obj.percent + "%";
            })
        },
        xx(){
            alert(121)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/font.less';
@import '../assets/css/myAccount.less';
</style>

