<template>
    <div class="lists">
            <div class="list_box">
                <ul class="list" v-for="(item,index) in items"  :key="item.id" :class="{'ffeeaf':index%2 != 0}">
                    <li><span></span> <i>{{index+1}}</i></li>
                    <li>{{item.fundGroupName}}</li>
                    <li>{{tool.fmoney(item.totalAgainst,2)}} </li>
                </ul>
            </div>
        </div>
</template>

<script>
    export default {
    name: 'lists',
    data(){
        return {
            items:[]
        }
    },
    mounted(){
        this.getInfo();
    },
    methods:{
        getInfo(){
            let _this = this;
            this.post({
                url: "/fundUser/fundRankList/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        _this.items=e.result.list;
                    }
                }
            })
        }
    }
}
</script>
  <style lang="less" scoped>
    
.lists{
    height: 520px;
    width: 750px;
    background: url("https://cdn.paicaifu.com/webapp/image/inapp/fund/index_04.png") no-repeat center 0;
    background-size:  750px 621px;
    padding-top: 80px;
}
.list_box{
    width: 92%;
    height: 500px;
    margin: 0 auto;
    overflow: hidden;
    overflow-y: scroll;
}
.lists ul li:first-child span{
    float: left;
    width: 44px;
    height: 65px;
    display: block;
    margin-top: 20px;
    margin-left: 70px;
}
.lists ul:nth-child(1) li:first-child span{
    float: left;
    width: 44px;
    height: 65px;
    display: block;
    background: url('https://cdn.paicaifu.com/webapp/image/inapp/fund/indexicon.png') no-repeat center 0;
    background-size: 44px auto;
    margin-top: 20px;
    margin-left: 70px;
}
.lists ul:nth-child(2) li:first-child span{
    float: left;
    width: 44px;
    height: 65px;
    display: block;
    background: url('https://cdn.paicaifu.com/webapp/image/inapp/fund/indexicon.png') no-repeat center -102px;
    background-size: 44px auto;
    margin-top: 20px;
    margin-left: 70px;
}
.lists ul:nth-child(3) li:first-child span{
    float: left;
    width: 44px;
    height: 65px;
    display: block;
    background: url('https://cdn.paicaifu.com/webapp/image/inapp/fund/indexicon.png') no-repeat center -210px;
    background-size: 44px auto;
    margin-top: 20px;
    margin-left: 70px;
}
.list {
    overflow: hidden;
}
.list li i{
    float: left;
    font-style: normal;
    margin-left: 20px;
}
.list li{
    float: left;
    color: #ff6c00;
    font-size: 22px;
    text-align: center;
    height: 100px;
    line-height: 100px;
}
.list li:nth-child(1){
    width: 30%;
}
.list li:nth-child(2){
    width: 39.5%;
}
.list li:nth-child(3){
    width: 30%;
}
.ffeeaf{
    background: #ffeeaf;
}
  </style>
  
            