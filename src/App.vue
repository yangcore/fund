<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <div @click="maskShow=!maskShow">
      <ymask :maskShow="maskShow"></ymask>
    </div>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">      
      <router-view></router-view>
    </transition>
    <i class="share" @click="share"></i>
    <div v-show="maskShow" class="shareTips"></div>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
import ymask from '../src/components/Mask'
export default {
  name: 'app',
  data() {
    return {
      maskShow: false
    }
  },
  components: {
    Loading,
    ymask
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    })
  },
  mounted() {
     var _this = this;
     let count=0;
    document.getElementsByTagName('body')[0].onhashchange = function() {
       if (_this.tool.isApp()) {
         let url = window.location.href;
         if (!sessionStorage.getItem('reload') && !sessionStorage.getItem('goAppShare')) {
           sessionStorage.setItem('hashcount', count++);
           if (window.location.hash.indexOf('index') > 0 && sessionStorage.getItem("hashcount") == '0') {
             sessionStorage.setItem('reload', 'reload');
             sessionStorage.setItem('token', _this.tool.getUrlAppToken());
             window.location.href = window.location.origin.indexOf('127') >= 0 ? (window.location.origin) : (window.location.origin + "/p/fund.html");
           }
         }
         if (sessionStorage.getItem('goAppShare')) {
           sessionStorage.removeItem('goAppShare');
           if (url.split('appShare')[url.split('appShare').length - 1].charAt(1) == "Y") {
             _this.shareAdd();
           } else if (url.split('appShare')[url.split('appShare').length - 1].charAt(1) == "N") {
             console.info('app分享失败');
           }
         }
       }
     }
  },
  methods: {
    share() {
      if (this.tool.isApp()) {
        sessionStorage.setItem('goAppShare','goAppShare');
        sessionStorage.setItem('goAppShare1','goAppShare'); //ios特殊处理flag
        sessionStorage.setItem('goAppShareUrl',window.location.href) //ios特殊处理flag
        window.location.href = "paicaifu://share?" + JSON.stringify(this.appshare_config);
      } else {
        document.getElementsByClassName("shareTips")[0].classList.add("flash");
        document.getElementsByClassName("shareTips")[0].classList.add("animated");
        setTimeout(function() {
          document.getElementsByClassName("shareTips")[0].classList.remove("flash");
          document.getElementsByClassName("shareTips")[0].classList.remove("animated");
        },
          1e3)
        this.maskShow = true;
      }
    }
  }
}
</script>

<style lang="less">
#app {
  width: 750px;
  margin: 0 auto;
}

@import './assets/font.less';
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './assets/app.less';
@import '~vux/src/styles/tap.less';
@import '~animate.css/animate.min.css';
.share {
  display: block;
  width: 90px;
  height: 90px;
  background: url(https://cdn.paicaifu.com/webapp/image/inapp/fund/share.png) no-repeat center;
  background-size: 90px 90px;
  position: fixed;
  margin: auto;
  top: 50%;
  right: 2%;
}

.shareTips {
  width: 198px;
  height: 88px;
  background: url('https://cdn.paicaifu.com/webapp/image/inapp/fund/shareicon.png') no-repeat center 0;
  background-size: 198px 88px;
  position: absolute;
  top: 0;
  z-index: 42000;
  right: 5%;
}

.weui-search-bar:before {
  border: none !important;
}

.weui-search-bar:after {
  border: none !important;
}

.weui-search-bar__form,
.weui-search-bar__label {
  background-color: #f1f1f1 !important;
}

.box2 div .weui-cells {
  margin-top: 0 !important;
}

.box2 div .vux-no-group-title {
  margin-top: 0 !important;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%; // top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}


.fundInfo .flex-demo2 {
  line-height: normal !important;
}

a {
  color: black;
}

a:hover {
  text-decoration: none;
}

._36cca4 {
  color: #36cca4;
}

._ff5255 {
  color: #ff5255;
}

[v-cloak] {
  display: none
}

.balance.money div .weui-cells {
  margin-top: 0 !important;
}

.balance.money div .vux-no-group-title {
  margin-top: 0 !important;
}

.balance.money .weui-cells:before,
.weui-cells:after {
  border: none !important;
}

.balance.money .vux-number-input {
  font-size: 30px;
}
</style>
