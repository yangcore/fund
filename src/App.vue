<template>
  <div id="app">
    <drawer width="200px;" :show.sync="drawerVisibility" show-mode="overlay" placement="left" :drawer-style="{'background-color':'white', width: '200px'}">

      <!-- drawer content -->
      <div slot="drawer">
        <div style="background:#42b983;margin-top:-10px;  padding:20px 0 20px 0px">
          <div class="userhead">
          </div>
          <p>用户名称</p>
        </div>
        <router-link to="/">
          <p class="drawer_p" @click="drawerVisibility = false">
            <i class="iconfont floatleft">&#xe621;</i>
            <span class="floatleft iconafter">全部</span>
          </p>
        </router-link>
        <router-link to="/Essence">
          <p class="drawer_p" @click="drawerVisibility = false">
            <i class="iconfont floatleft">&#xe61a;</i>
            <span class="floatleft iconafter">精华</span>
          </p>
        </router-link>
        <router-link to="/Share">
          <p class="drawer_p" @click="drawerVisibility = false">
            <i class="iconfont floatleft">&#xe645;</i>
            <span class="floatleft iconafter">分享</span>
          </p>
        </router-link>
        <router-link to="/Questions">
          <p class="drawer_p" @click="drawerVisibility = false">
            <i class="iconfont floatleft">&#xe893;</i>
            <span class="floatleft iconafter">问答</span>
          </p>
        </router-link>
        <router-link to="/Recruitment">
          <p class="drawer_p" @click="drawerVisibility = false">
            <i class="iconfont floatleft">&#xe63c;</i>
            <span class="floatleft iconafter">招聘</span>
          </p>
        </router-link>
      </div>
      <view-box ref="viewBox">
        <x-header style="background:#42b983;position:fixed;top:0;width:100%;" :title="title">
          <span slot="overwrite-left" @click="drawerVisibility=!drawerVisibility" style="display:block">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>
        <keep-alive>
          <router-view name="All" style="margin-top:50px"></router-view>
        </keep-alive>
        <keep-alive>
          <router-view name="Essence" style="margin-top:50px"></router-view>
        </keep-alive>
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { XHeader, ViewBox, Drawer } from 'vux'
export default {
  name: 'app',
  data() {
    return {
      drawerVisibility: false
    }
  },
  components: {
    XHeader,
    Drawer,
    ViewBox
  },
  computed: {
    title() {
      if (this.$route.path === '/') return '全部'
      if (this.$route.path === '/Essence') return '精华'
      if (this.$route.path === '/Share') return '分享'
      if (this.$route.path === '/Questions') return '问答'
      if (this.$route.path === '/Recruitment') return '招聘'
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less">
@import './assets/font.less';
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './assets/app.less';
@import '~vux/src/styles/tap.less';
</style>
