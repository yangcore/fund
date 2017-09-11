<template>
    <div class="index">
        <ymask :maskShow="maskShow"></ymask>
     <x-header :left-options="{showBack: false}">
         <span @click="intUser('myAccount')"  slot="right">我的账户</span>
     </x-header>
        <div class="content">
            <p class="startime">
                2017.8.24-9.34
            </p>
            <!-- 立即参与 -->
            <div href="javascript:;" class="play" @click="intUser"></div> 
        </div>
        <div class="content1">
            <p class="rule_btn" @click="maskShow=!maskShow">活动规则>></p>
        </div>
        <div class="rule_box" v-show="maskShow">
            <div class="rule" >
            </div>
        </div>
        <span class="close" v-show="maskShow" @click="maskShow=!maskShow"></span>
        <!-- 排行榜 -->
        <h1 class="title"></h1>
        <lists>
        </lists>
    </div>
</template>

<script>
import lists from '../components/lists'//排行榜组件
import XHeader from '../../node_modules/vux/src/components/x-header/index'
import ymask from '../components/Mask'
export default {
    name: 'index',
    data() {
        return {
            maskShow:false
        }
    },
    computed:{
    },
    components: {
        lists,
        XHeader,
        ymask
    },
    mounted() {
    },
    methods: {
         intUser(str) {
            let _this = this;
            this.post({
                url: "/fund/initAcct/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        if (e.result.isHaveFundName == 1) {
                            if(str=='myAccount'){
                                _this.$router.push('/myAccount'); //已有基金组合名
                            }else{
                                 _this.$router.push('/fundPortfolio'); //已有基金组合名
                            }
                        } else {
                            _this.$router.push('/');
                        }
                    }else if(e.code=='1004'){
                          sessionStorage.setItem('redirectUrl',window.location.origin+'/p/fund.html');
                          if(str=='myAccount'){
                            sessionStorage.setItem('myAccount','myAccount');
                          }
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/index.less';
</style>

