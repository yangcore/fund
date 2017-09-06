<template>
    <div class="fundPortfolio">
        <x-header :left-options="{backText: ''}">set empty back text
            <a slot="right" @click="$router.go(-1)">关闭</a>
        </x-header>
        <div class="search">
            <i class="iconfont close" v-show="value==''?false:true" @click="clear">&#xe6da;</i>
            <input type="text" placeholder="试试输入名称、代码" id="search" v-model="value">
            <span @click="searchInfo">搜索</span>
        </div>

        <div class="lists">
            <router-link :to="{path:'/fundPortfolio/fundDetails',query:{code:list.code,name:list.name,type:list.type}}" v-for="list in lists" :key="list.id">
                <p class="list">{{list.name}} &nbsp;&nbsp;&nbsp;&nbsp;{{list.code}}</p>
            </router-link>
        </div>
    </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
    name: 'search',
    data() {
        return {
            value: "",
            lists: []
        }
    },
    computed: {

    },
    components: {
        XHeader
    },
    mounted() {
        setTimeout(() => {
            document.getElementById('search').focus();
        }, 500)
    },
    methods: {
        clear(){
           this.value= "";
           this.lists= [];
        },
        searchInfo() {
            let _this = this;
            this.post({
                url: "/fundMsg/searchFund/v1.0",
                data: {
                    keyWord: _this.value
                },
                success: function(e) {
                    console.info(e);
                    if (e.code == "0000") {
                        if( e.result.list){
                             _this.lists = e.result.list;
                        }else{
                             _this.lists = [];
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
.search {
    position: relative;
    overflow: hidden;
}

.search input {
    float: left;
    display: block;
    width: 520px;
    height: 60px;
    border: none;
    border-radius: 5px;
    padding-left: 60px; // margin: 0 auto;
    background: url("https://cdn.paicaifu.com/webapp/image/inapp/fund/search_icon.png") #f1f1f1 no-repeat 15px 15px;
    background-size: auto 30px;
    margin-left: 35px;
}

.search span {
    float: left;
    line-height: 60px;
    font-size: 30px;
    margin-left: 30px;
    color: #4a80ff;
}

.close {
    position: absolute;
    right: 150px;
    top: -6px;
    font-size: 40px;
}

.list {
    padding: 20px 0 20px 30px;
    border-top: 1Px solid #d7d7d7;
    font-size: 28px;
    color: #313131;
}

.lists {
    margin-top: 30px;
}

.lists a:last-child {
    display: block;
    overflow: hidden;
    border-bottom: 1Px solid #d7d7d7;
}
</style>

