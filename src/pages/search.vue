<template>
    <div class="fundPortfolio">
        <x-header :left-options="{backText: ''}" >set empty back text
            <a slot="right" @click="$router.go(-1)">关闭</a>
        </x-header>
        <div class="search">
            <input type="text" placeholder="试试输入名称、代码" id="search"  autofocus>
            <span>搜索</span>
        </div>
    </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
    name: 'search',
    data() {
        return {
        }
    },
    computed: {

    },
    components: {
        XHeader
    },
    mounted() {
        document.getElementById('search').focus();
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.search input {
    float: left;
    display: block;
    width: 520px;
    height: 60px;
    border: none;
    border-radius: 5px;
    padding-left: 60px;
    // margin: 0 auto;
    background: url("https://cdn.paicaifu.com/webapp/image/inapp/fund/search_icon.png") #f1f1f1 no-repeat 15px 15px;
    background-size: auto 30px;
    margin-left: 35px;
}
.search  span{
    float: left;
line-height: 60px;
font-size: 30px;
margin-left: 30px;
color: #4a80ff;
}
</style>

