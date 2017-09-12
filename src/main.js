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
import { AjaxPlugin, LoadingPlugin, AlertPlugin ,numberComma} from 'vux'
Vue.use(AjaxPlugin);
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

import qs from 'qs'
const baseUrl = window.location.origin.indexOf('127')>=0?'https://mdev.paicaifu.com':window.location.origin;

sessionStorage.setItem('activityId',"170912141610000020");
sessionStorage.setItem('channalId',tool.isApp()?"170912142710000102":"170912142610000101");
Vue.prototype.baseUrl = baseUrl;
Vue.prototype.tool = tool;
//公用方法
Vue.prototype.numberComma=numberComma;//数字格式化金额
Vue.prototype.http = function (opts) {
  let vue = this
  vue.$vux.loading.show({
    text: '正在加载'
  })
  vue.$http({
    method: opts.method,
    url: baseUrl + opts.url+'?_='+Math.random(),
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
  title: "给你100万，在这里你就是百万富翁！",
  desc: "来跟我一起参加基金模拟大赛，赢取2198元现金！",
  link: baseUrl+"/p/fund.html#/index?activityId="+tool.getUrlParms('activityId')+'&channalId=170912142610000101',
  imgUrl: "https://cdn.paicaifu.com/webapp/image/inapp/fund/shareicon.jpg"
}
const appshare_config = {
  shareUrl:baseUrl+"/p/fund.html#/index?activityId="+tool.getUrlParms('activityId')+'&channalId=170912142610000101',
  title: "给你100万，在这里你就是百万富翁！",
  desc: "来跟我一起参加基金模拟大赛，赢取2198元现金！",
  icon: "https://cdn.paicaifu.com/webapp/image/inapp/fund/shareicon.jpg",
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

Vue.prototype.shareAdd=function(){
  Vue.http({
    method: 'post',
    url: baseUrl + '/fundMsg/shareTimesAdd/v1.0?_=' + Math.random(),
    data: qs.stringify({
      activityId: sessionStorage.getItem('activityId')
    })
  }).then(function (response) {
    if (response.data.code == '0000') {
        console.info('分享成功');
    }
  })
}



const wxShare = function (t) {
  wx.onMenuShareTimeline({
    title: t.title,
    link: t.link,
    imgUrl: t.imgUrl,
    success: function () {
      Vue.prototype.shareAdd();
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
        Vue.prototype.shareAdd();
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
        Vue.prototype.shareAdd();
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
