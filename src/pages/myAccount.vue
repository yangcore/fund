<template>
    <div class="myAccount">
        <div @click="maskShow=!maskShow">
            <ymask :maskShow="maskShow"></ymask>
        </div>
        <div class="list_box" v-show="maskShow">
            <h1 class="title"></h1>
            <lists :items="items" class="lists">
            </lists>
        </div>
        <x-header :left-options="{backText: ''}" :title="fundGroupName">
            <a slot="right" @click="maskShow=!maskShow" v-if="$route.query.beforepage=='/fundPortfolio'">排行榜</a>
        </x-header>
        <x-header :left-options="{showBack: false}" v-if="$route.query.beforepage!=='/fundPortfolio'">
            <router-link to="/fundPortfolio" slot="left"> 基金综合页 </router-link>
            <a slot="right" @click="maskShow=!maskShow">排行榜</a>
        </x-header>
        <div class="chart" >
            <div id="chart">
            </div>
            <p class="info" :class="[obj.percent=='&nbsp;&nbsp;'?top1:top2]" v-if="pieLists.length!==0">
                <span v-html="obj.name+'占比'">
                </span>
                <br>
                <span v-html="obj.percent">
                </span>
            </p>
              <div v-if="pieLists.length==0" class="kong">
                <div>
                    暂无数据
                </div>
              </div>
        </div>
        <div style="background:white">
            <p class="totalAssets">{{amount}}</p>
            <p>总资产</p>
            <div class="center-info">
                <div>
                    <p>
                        <i class="iconfont">&#xe623;</i>{{totalAgainst}}</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>总收益(拍金币)</p>
                </div>
                <div>
                    <p>
                        <i class="iconfont">&#xe6b3;</i>{{canUseAmount}}</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>可用余额(拍金币)</p>
                </div>
                <div>
                    <p>
                        <i class="iconfont">&#xe611;</i>{{profitRatio}}%</p>
                    <p>
                        <i class="iconfont">&nbsp;&nbsp;&nbsp;&nbsp;</i>盈亏比</p>
                </div>
                <div>
                    <p>
                        <i class="iconfont">&#xe600;</i>{{buildDate}}</p>
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
        <caifuBottom></caifuBottom>
    </div>
</template>
<script>
import { XHeader, Group, Cell } from 'vux'
import ymask from '../components/Mask'
import lists from '../components/lists'//排行榜组件
import pie from '../components/pie' //饼图
import caifuBottom from '../components/caifuBottom'
// import { numberComma } from 'vux'
export default {
    name: 'myAccount',
    data() {
        return {
            top1: "top1",
            top2: "top2",
            maskShow: false,
            myChart: {},
            pieLists: [],//饼图数据
            amount: 0,//总资产
            totalAgainst: 0,//总收益
            profitRatio: 0,//盈亏比
            buildDate: '-- --',//成立时间
            canUseAmount: 0, // 可用余额
            fundGroupName:'',//组合名
            obj:{ name: "资产", percent: "&nbsp;&nbsp;" },
            items:[]
        }
    },
    computed: {
    },
    components: {
        XHeader,
        Group,
        Cell,
        ymask,
        lists,
        caifuBottom
    },
    created() {
        this.getAccountInfo();
        this.getFundTotalInfo();
    },
    methods: {
        chartInit(data) {
            let _this = this;
            this.myChart = echarts.init(document.getElementById('chart'));
            this.myChart.setOption(pie.pie(data));
            this.myChart.on("click", function(obj) {
                _this.obj = obj.data;
                _this.obj.percent = obj.percent + "%";
            })
            window.onresize = function() {
                _this.myChart.resize();
            }
        },
        getAccountInfo() {
            let _this = this;
            this.post({
                url: "/fundUser/fundAllInfo/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        let list = e.result.list;
                        if (list.length > 0) {
                            for (let i = 0; i < list.length; i++) {
                                let obj = {};
                                obj.name = _this.tool.getType(list[i].fundType);
                                obj.value = list[i].fundAmount;
                                _this.pieLists.push(obj);
                            }
                            _this.chartInit(_this.pieLists);
                        }
                    }
                }
            })
        },
        getFundTotalInfo(){
            let _this = this;
            this.post({
                url: "/fundUser/fundTotalInfo/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        let FundUserDto = e.result.FundUserDto;
                            _this.amount = _this.numberComma(Number(FundUserDto.amount));
                            _this.totalAgainst = _this.numberComma(Number(FundUserDto.totalAgainst));
                            _this.profitRatio = FundUserDto.profitRatio;
                            _this.buildDate = FundUserDto.buildDate;
                            _this.canUseAmount = _this.numberComma(Number(FundUserDto.canUseAmount));
                             _this.fundGroupName = FundUserDto.fundGroupName;
                            
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/font.less';
@import '../assets/css/myAccount.less';
</style>

