<template>
    <div class="myOrder">
        <yheader title="我的订单" fontstyle="color:black" headerstyle="background:#fff"></yheader>
        <div class="tab" style="clear:both">
            <tab :line-width="2" active-color="#4a80ff">
                <tab-item selected @on-item-click="onItemClick">申购</tab-item>
                <tab-item @on-item-click="onItemClick">赎回</tab-item>
            </tab>
        </div>
        <div v-if="lists.length>0">
        <div class="list" v-for="list in lists" :key="list.id" >
            <flexbox>
                <flexbox-item>
                    <div class="flex-demo">
                        <p>
                            <span v-if="list.Type=='1'">申购</span>
                            <span v-else>赎回</span>
                            {{list.fundName}} {{list.fundCode}} </p>
                        <p>{{list.fundDateTime.split('.')[0]}}
                        <span v-if="Number(list.fundNumAmount) ||Number(list.fundNumAmount)==0 ">份额:
                            {{numberComma(Number(list.fundNumAmount)) }}
                        </span>
                        <span v-else>份额:
                            {{list.fundNumAmount }}
                        </span>
                        </p>
                    </div>
                </flexbox-item>
                <flexbox-item :span="3">
                    <div class="flex-right">
                        <span v-if="Number(list.fundAmount) ||Number(list.fundAmount)==0 ">
                            {{numberComma(Number(list.fundAmount))}}
                        </span>
                        <span v-else>
                            {{list.fundAmount }}
                        </span>
                        <div class="warn" v-if="list.status=='1'">等待确认</div>
                        <div class="info" v-else>已确认</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
        <div v-else class="kong">
            暂无数据
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
            lists:[]
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
    created() {
        this.getMyorder(0);//初始化申购订单
    },
    methods: {
        onItemClick(index) {
            this.getMyorder(index);
        },
        getMyorder(index){
            let _this = this;
            this.post({
                url: "/fundOrder/fundOrderList/v1.0",
                data:{
                    flag:index+1
                },
                success: function(e) {
                    if (e.code == "0000") {
                       _this.lists=e.result.list;
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

