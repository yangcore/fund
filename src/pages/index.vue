<template>
    <div class="index">
     <x-header :left-options="{showBack: false}"><router-link to='/myAccount'  slot="right">我的账户</router-link></x-header>
        <div class="content">
            <p class="startime">
                2017.8.24-9.34
            </p>
            <!-- 立即参与 -->
            <a href="javascript:;" class="play" @click="islogin"></a> 
        </div>
        <div class="content1">
            <p class="rule_btn">活动规则>></p>
        </div>
        <!-- 排行榜 -->
        <h1 class="title"></h1>
        <lists :items="items">
        </lists>
    </div>
</template>

<script>
import lists from '../components/lists'//排行榜组件
import XHeader from '../../node_modules/vux/src/components/x-header/index'
export default {
    name: 'index',
    data() {
        return {
        }
    },
    computed:{
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
        lists,
        XHeader
    },
    mounted() {
       
    },
    methods: {
         islogin(){
            // 判断是否登陆
            //TODO 未登录

            //已登陆
            this.$router.push('/fundPortfolio');
            
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/index.less';
</style>

