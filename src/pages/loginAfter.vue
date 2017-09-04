<template>
    <div class="loginAfter">
        <div class="top">
            <h1>登录/注册成功！</h1>
            <p>100万元基金模拟体验金已发放到您的虚拟账户!</p>
        </div>
        <div class="name">您的模拟基金组合名:</div>
        <div class="input_">
            <input type="text" maxlength="10" v-model="name">
            <span @click="sure">确定</span>
        </div>
        <p class="tips" v-show="error"><span>提示：</span>{{errorMsg}}</p>
        <caifuBottom style="padding-top:20%"></caifuBottom>
    </div>
</template>
<script>
import caifuBottom from '../components/caifuBottom'
export default {
    name: 'loginAfter',
    data() {
        return {
            name:'139****5227',
            error:false,
            errorMsg:"请输入10个字符以内文字/字母/数字"
        }
    },
    computed: {
    },
    components: {
        caifuBottom
    },
    mounted() {
    },
    methods: {
        sure(){
            if(!/^[a-zA-Z0-9\u4e00-\u9fa5\*]+$/.test(this.name)){
               this.error=true;
               return;
            }else{
               this.error=false;
               this.$router.push('/fundPortfolio');
            }
           
        },
        checkName(){ //效验

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .top{
        height: 400px;
        background: #f7faff;
    }
     .top h1,p{
         text-align: center;
         color: #4a80ff;
     }
    .top h1{
        display: block;
        padding-top: 150px;
        font-size: 36px;
    }
    .top p{
        font-size: 26px;
    }
    .name{
        font-size: 36px;
        color: #4a80ff;
        text-align: center;
        padding: 30px;
    }
    .input_{
        background: #f5f5f5;
        padding: 10px 30px 10px 30px;
        overflow: hidden;
    }
    .input_ input{
        width: 70%;
        height: 60px;
        outline: none;
        border: none;
        background: #f5f5f5;
        float: left;
        color: #888888;
        font-size: 35px;
        letter-spacing:6px;
    }
     .input_ span{
         float: left;
         width: 140px;
         height: 60px;
         background: #4a80ff;
         text-align: center;
         color: white;
         line-height: 64px;
         border-radius: 3px;
         margin-left: 6%;
         font-size: 32px;
     }
     .tips{
         padding: 10px 30px 10px 30px;
         text-align: left;
         color: #333333;
         font-size: 26px;
     }
     .tips span{
         color: #ff5355;
     }
</style>

