<template>
    <div class="fundPortfolio">
        <div style="background:#4a80ff">
            <yheader title="基金" fontstyle="color:white" headerstyle="background:#4a80ff"></yheader>
            <!-- 总资产 -->
            <ul class="fund_list">
                <li>总资产</li>
                <li>673.15</li>
                <li>最新净值日期：2017.8.17</li>
            </ul>
            <div class="info">
                <div class="hr hr1"></div>
                <div class="hr hr2"></div>
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>基金总市值</span>
                            <br>
                            <span>562.30</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>基金未确认金额</span>
                            <br>
                            <span>562.30</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <span>基金总收益</span>
                            <br>
                            <span>562.30</span>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <p class="tips">*本活动所有计价单位均为拍财富虚拟货币拍金币</p>

        <div class="card">
            <h1>
                <span>易方达消费行业 110022</span>
                <div>
                    <a href="javascript:;" class="redeem">赎回</a>
                    <a href="javascript:;" class="buy">购买</a>
                </div>
            </h1>
            <div style="background:white">
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>562.30</span>
                            <br>
                            <span>最新市值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>2332</span>
                            <br>
                            <span>最新净值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>562.30</span>
                            <br>
                            <span>持仓份额</span>
                        </div>
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>562.30</span>
                            <br>
                            <span>最新市值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>2332</span>
                            <br>
                            <span>最新净值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                           <i class="iconfont"  style="color:#b3b3b3">&#xe752;</i>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>

           <div class="card">
            <h1>
                <span>易方达消费行业 110022</span>
                <div>
                    <a href="javascript:;" class="redeem">赎回</a>
                    <a href="javascript:;" class="buy">购买</a>
                </div>
            </h1>
            <div style="background:white">
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>562.30</span>
                            <br>
                            <span>最新市值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>2332</span>
                            <br>
                            <span>最新净值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>562.30</span>
                            <br>
                            <span>持仓份额</span>
                        </div>
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>562.30</span>
                            <br>
                            <span>最新市值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                            <span>2332</span>
                            <br>
                            <span>最新净值</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo black">
                           <i class="iconfont" style="color:#b3b3b3">&#xe752;</i>
                        </div>
                    </flexbox-item>
                </flexbox>
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

    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/fundTotalAssets.less';
</style>

