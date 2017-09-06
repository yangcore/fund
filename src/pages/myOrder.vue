<template>
    <div class="myOrder">
        <yheader title="我的订单" fontstyle="color:black" headerstyle="background:#fff"></yheader>
        <div class="tab" style="clear:both">
            <tab :line-width="2" active-color="#4a80ff">
                <tab-item selected @on-item-click="onItemClick">申购</tab-item>
                <tab-item @on-item-click="onItemClick">赎回</tab-item>
            </tab>
        </div>
        <div class="list">
            <flexbox>
                <flexbox-item>
                    <div class="flex-demo">
                        <p><span>申购</span>易方达消费行业 110022 </p>
                        <p>2017-07-30 11:00:59 <span>份额:8000</span></p>
                    </div>
                </flexbox-item>
                <flexbox-item :span="4">
                    <div class="flex-right">
                        <span>￥100,000</span>
                        <div class="warn">等待确认</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="list">
            <flexbox>
                <flexbox-item>
                    <div class="flex-demo">
                        <p><span>申购</span>易方达消费行业 110022 </p>
                        <p>2017-07-30 11:00:59 <span>份额:8000</span></p>
                    </div>
                </flexbox-item>
                <flexbox-item :span="4">
                    <div class="flex-right">
                        <span>￥100,000</span>
                        <div class="info">已确认</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>
<script>
import yheader from '../components/ycheader'
import { Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'myOrder',
    data() {
        return {
        }
    },
    computed: {

    },
    components: {
        yheader,
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem
    },
    mounted() {
    },
    methods: {
        onItemClick(index) {
            console.info(index);
            this.getMyorder(index);
        },
        getMyorder(index){
            let _this = this;
            this.post({
                url: "/fundUser/fundOrderList/v1.0",
                data:{
                    flag:index
                },
                success: function(e) {
                    if (e.code == "0000") {
                       
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../assets/css/myOrder.less';

</style>

