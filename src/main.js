// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill();//兼容低版本浏览器
import Vue from 'vue'
import App from './App'
import router from './router' 
import store from './vuex/vuex'  //vuex
import tool from './tool/tool'
Vue.config.productionTip = true
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
import { AjaxPlugin, LoadingPlugin, AlertPlugin  } from 'vux'
Vue.use(AjaxPlugin);
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
import qs from 'qs'
const baseUrl = "https://mdev.paicaifu.com";
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
    headers:opts.headers || {},
  }).then(function (response) {
    console.info(response,"获取的数据");
    vue.$vux.loading.hide();
    opts.success(response.data)
    if(response.data.code=='1004'){
      window.location.href=baseUrl+"/user/login/v1.0";//tonken 失效或为空时
    }else if(response.data.code=='1001' || response.data.code=='1003' || response.data.code=='S1001'){ //1001 参数错误 //1003
      vue.$vux.alert.show({
         title: '提示',
         content: response.data.msg
     })
    }
  }).catch(function (error) {
    console.info(error.response,'错误信息');
    vue.$vux.loading.hide();
    let response = error.response;
    let errorMessage = '请求失败';
    if (response) { //发送请求，服务器返回不在200-300之内
      vue.$vux.alert.show({
        title: '提示',
        content: response.data.msg==null?errorMessage:response.data.msg
      })
    } else{
      console.log('Error', error);//发生一些错误
    }
  })
}
let token={
  // token:sessionStorage.getItem("token")  //eb03b6b3eb8e449280ee4abf91e78c3b
     token:"b6b7173131bc47149f2990ec448e4422"
};
Vue.prototype.getToken=function(opts,type){
  if(opts.data){
    Object.assign(opts.data,token);
    opts.data=qs.stringify(opts.data);
  }else if(opts.params){
    Object.assign(opts.params,token);
    opts.params=qs.stringify(opts.params);
  }else{
    if(type=="post"){
      opts.data=qs.stringify(token);
    }else if(type=="get"){
      opts.params=qs.stringify(token);
    }
  }
}
Vue.prototype.get = function (opts) {
  opts.method = 'get';
  opts.headers={
    'Content-Type':'application/x-www-form-urlencoded'
  }
  this.getToken(opts,'get');
  this.http(opts);
}
Vue.prototype.post = function (opts) {
  opts.method = 'post';
  opts.headers={
    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
  }
  this.getToken(opts,'post');
  this.http(opts);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
