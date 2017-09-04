<template>
   <div class="bottom-box">
            <img src="https://cdn.paicaifu.com/webapp/image/inapp/fund/code.jpg">
            <p>本基金模拟活动为虚拟投资活动
                <br><span>拍金币</span>为虚拟货币
                <br> 个人真实财富管理请移步拍财富APP
            </p>
    </div>
</template>
<script>
export default {
    name: 'caifuBottom'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bottom-box{
    background: white;
    padding-top: 100px;
}
.bottom-box img{
    display: block;
    width: 166px;
    height: 166px;
    margin: 0 auto;
}

.bottom-box p{
    padding-top: 20px;
    text-align: center;
    color: #888888;
    padding-bottom: 20px;
}
.bottom-box p span{
    color: #4a80ff;
}
</style>
