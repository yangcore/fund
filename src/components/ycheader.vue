<template>
        <div class="header" :style="headerstyle">
            <i class="iconfont" :style="fontstyle" @click="$router.go(-1)">&#xe60e;</i>
            <div v-if="title">
                <span :style="fontstyle" >{{title}}</span>
            </div>
            <slot name="header"></slot>
            <slot name="right" class="right"></slot>
        </div>
</template>
<script>
export default {
    name: 'header',
    props:["headerstyle","fontstyle","title"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header{
    height: 46Px;
}
.header i{
    width: 10%;
    display: block;
    line-height: 46Px;
    margin-left: 2%;
    float: left;
    font-size: 42px;
}
.header div{
    line-height: 46Px;
    width: 76%;
    float: left;
    color: white;
    text-align: center;
}
.header div span{
    font-size: 16Px;
}
</style>

