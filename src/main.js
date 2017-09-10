// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill();//兼容低版本浏览器
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/vuex'  //vuex
import tool from './tool/tool'
Vue.config.productionTip = true
import FastClick from 'fastclick'
FastClick.attach(document.body)
import { AjaxPlugin, LoadingPlugin, AlertPlugin } from 'vux'
Vue.use(AjaxPlugin);
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)
import qs from 'qs'
const baseUrl = window.location.origin.indexOf('127')>=0?'https://mdev.paicaifu.com':window.location.origin;
const loginTimeOutErrorCode = 'login_timeout_error';

Vue.prototype.baseUrl = baseUrl;
Vue.prototype.tool = tool;
//公用方法
Vue.prototype.http = function (opts) {
  let vue = this
  vue.$vux.loading.show({
    text: '正在加载'
  })
  vue.$http({
    method: opts.method,
    url: baseUrl + opts.url,
    headers: opts.headers || {},
    params: opts.params || {},
    data: opts.data || {},
    headers: opts.headers || {},
  }).then(function (response) {
    // console.info(response, "获取的数据");
    vue.$vux.loading.hide();
    opts.success(response.data)
    if (response.data.code == '1004') {
      if(tool.isApp()){
        window.location.href ="paicaifu://signIn";
      }else{
        window.location.href = baseUrl + "/user/login/v1.0";//tonken 失效或为空时
      }
    } else if (response.data.code == '1001' || response.data.code == '1003' || response.data.code == 'S1001') { //1001 参数错误 //1003
      vue.$vux.alert.show({
        title: '提示',
        content: response.data.msg
      })
    }
  }).catch(function (error) {
    console.info(error.response, '错误信息');
    vue.$vux.loading.hide();
    let response = error.response;
    let errorMessage = '请求失败';
    if (response) { //发送请求，服务器返回不在200-300之内
      vue.$vux.alert.show({
        title: '提示',
        content: response.data.msg == null ? errorMessage : response.data.msg
      })
    } else {
      console.log('Error', error);//发生一些错误
    }
  })
}
Vue.prototype.getItemInfo=function(){
  let tokenInfo='';
  if(tool.isApp()){
    if(window.location.href.indexOf('appToken')>=0){
      let str=tool.getUrlAppToken();
      sessionStorage.setItem('token',(str!=="undefined")?str : '');
    }
    tokenInfo= sessionStorage.getItem("token")?sessionStorage.getItem("token"):'';
  }else{
    tokenInfo=localStorage.getItem("token")?localStorage.getItem("token"):'';
  }
  let token = {
      token:tokenInfo,
      // token:"17ac1b29516m4c6cbcmac64ee05c40em",
      // token:'m37fm8c92a5c43f49b56c3f602a645m5',
      isApp:tool.isApp()?1:0
  };
  return token;
}

Vue.prototype.getToken = function (opts, type) {
   let token = this.getItemInfo();
  if (opts.data) {
    Object.assign(opts.data, token);
    opts.data = qs.stringify(opts.data);
  } else if (opts.params) {
    Object.assign(opts.params, token);
    opts.params = qs.stringify(opts.params);
  } else {
    if (type == "post") {
      opts.data = qs.stringify(token);
    } else if (type == "get") {
      opts.params = qs.stringify(token);
    }
  }
}
Vue.prototype.get = function (opts) {
  opts.method = 'get';
  opts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  this.getToken(opts, 'get');
  this.http(opts);
}
Vue.prototype.post = function (opts) {
  opts.method = 'post';
  opts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  this.getToken(opts, 'post');
  this.http(opts);
}
const wx = Vue.wechat;
const t = {
  title: "我捡到一个神秘的水晶球，然后，神奇的事情发生了。。。",
  desc: "就不告诉你！",
  link: baseUrl+"/p/fund.html#/index",
  imgUrl: "https://cdn.paicaifu.com/webapp/image/Ballot/Balloticon.png"
}
const appshare_config = {
  shareUrl:baseUrl+"/p/fund.html#/index",
  title: "我捡到一个神秘的水晶球，然后，神奇的事情发生了。。。",
  desc: "就不告诉你！",
  icon: "https://cdn.paicaifu.com/webapp/image/Ballot/Balloticon.png",
  shareChannel: "1,2,3,4,5"
}
Vue.prototype.appshare_config=appshare_config;
Vue.http({
  method: 'post',
  url: baseUrl + '/signShare/v1.0?_=' + Math.random(),
  data: qs.stringify({
    currentUrl: window.location.href.split("#")[0]
  })
}).then(function (response) {
  if (response.data.code == '0000') {
    let result = response.data.result;
    delete result.url;
    result.jsApiList= ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"];
    wx.config(result);
    wx.ready(function () {
      wxShare(t)
    });
    wx.error(function (error) {
      console.info(error)
    })
  }
})


const wxShare = function (t) {
  wx.onMenuShareTimeline({
    title: t.title,
    link: t.link,
    imgUrl: t.imgUrl,
    success: function () {
    },
    cancel: function () {
    }
  }),
    wx.onMenuShareAppMessage({
      title: t.title,
      desc: t.desc,
      link: t.link,
      imgUrl: t.imgUrl,
      type: "link",
      dataUrl: "",
      success: function () {
      },
      cancel: function () {
      }
    }),
    wx.onMenuShareQQ({
      title: t.title,
      desc: t.desc,
      link: t.link,
      imgUrl: t.imgUrl,
      success: function () {
      },
      cancel: function () {
      }
    })
}






/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
