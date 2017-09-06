<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <div id="views">
     <transition 
     :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
          <router-view></router-view>
        </transition>
     </div>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
     
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    })
  },
  mounted() {

  },
  methods: {
   
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
  height: 100%;
  // top: 46px;
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
.fundInfo .flex-demo2{
  line-height: normal !important;
}
a{
  color: black;
}
a:hover{
  text-decoration: none;
}
._36cca4{
  color: #36cca4;
}
._ff5255{
  color: #ff5255;
}
[v-cloak] { display: none } 
.balance.money div .weui-cells{
    margin-top: 0 !important;
}
.balance.money div .vux-no-group-title{
     margin-top: 0 !important;
}
.balance.money .weui-cells:before,.weui-cells:after{
  border: none !important;
}
.balance.money .vux-number-input{
    font-size: 30px;
}
</style>
