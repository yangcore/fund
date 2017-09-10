<template>
    <div class="loginAfter" v-show="loginAfterShow">
        <div class="top">
            <h1>登录/注册成功！</h1>
            <p>100万元基金模拟体验金已发放到您的虚拟账户!</p>
        </div>
        <div class="name">您的模拟基金组合名:</div>
        <div class="input_">
            <input type="text" maxlength="11" v-model="fundName">
            <span @click="sure">确定</span>
        </div>
        <p class="tips" v-show="error">
            <span>提示：</span>{{errorMsg}}</p>
        <caifuBottom style="padding-top:20%"></caifuBottom>
    </div>
</template>
<script>
import caifuBottom from '../components/caifuBottom'
export default {
    name: 'loginAfter',
    data() {
        return {
            error: false,
            errorMsg: "请输入11个字符以内文字/字母/数字",
            fundName: '',
            loginAfterShow:false
        }
    },
    computed: {

    },
    components: {
        caifuBottom
    },
    mounted() {
            this.intUser();
    },
    methods: {
        sure() {
            if (!/^[a-zA-Z0-9\u4e00-\u9fa5\*]+$/.test(this.fundName)) {
                this.error = true;
                return;
            } else {
                this.error = false;
                this.setName();
            }
        },
        setName() { //设置效验组合名称
            let _this = this;
            this.post({
                url: "/fund/setFundName/v1.0",
                data: {
                    fundName: _this.fundName
                },
                success: function(e) {
                    if (e.code == "0000") {
                         sessionStorage.setItem('flag', 'tiao');
                        if (sessionStorage.getItem('myAccount')) {
                            _this.$router.push('/myAccount');
                            sessionStorage.removeItem('myAccount');
                        } else {
                            _this.$router.push('/fundPortfolio'); //已有基金组合名
                        }
                    }else if (e.code == "1002") {
                        _this.errorMsg = "基金组合名已被占用";
                        _this.error = true;
                    } else {
                        _this.errorMsg = "请输入11个字符以内文字/字母/数字"
                        _this.error = false;
                    }
                }
            })
        },
        intUser() {
            let _this = this;
            this.post({
                url: "/fund/initAcct/v1.0",
                success: function(e) {
                    if (e.code == "0000") {
                        let _str = e.result.loginName.substr(0, 3),
                           _str1=e.result.loginName.substr(7,11);
                        if (e.result.isHaveFundName == 1) {
                            if (!sessionStorage.getItem('flag')) {
                                sessionStorage.setItem('flag', 'tiao');
                                if (sessionStorage.getItem('myAccount')) {
                                    _this.$router.push('/myAccount');
                                    sessionStorage.removeItem('myAccount');
                                } else {
                                    _this.$router.push('/fundPortfolio'); //已有基金组合名
                                }
                            }else{
                                _this.$router.push('/index');
                            }
                        } else {
                            _this.loginAfterShow=true;
                            _this.fundName = _str+'****'+_str1;
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
.top {
    height: 400px;
    background: #f7faff;
}

.top h1,
p {
    text-align: center;
    color: #4a80ff;
}

.top h1 {
    display: block;
    padding-top: 150px;
    font-size: 36px;
}

.top p {
    font-size: 26px;
}

.name {
    font-size: 36px;
    color: #4a80ff;
    text-align: center;
    padding: 30px;
}

.input_ {
    background: #f5f5f5;
    padding: 10px 30px 10px 30px;
    overflow: hidden;
}

.input_ input {
    width: 70%;
    height: 60px;
    outline: none;
    border: none;
    background: #f5f5f5;
    float: left;
    color: #888888;
    font-size: 35px;
    letter-spacing: 6px;
}

.input_ span {
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

.tips {
    padding: 10px 30px 10px 30px;
    text-align: left;
    color: #333333;
    font-size: 26px;
}

.tips span {
    color: #ff5355;
}
</style>

