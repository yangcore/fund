// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill();//兼容低版本浏览器
import Vue from 'vue'
import App from './App'
import router from './router' 
import store from './vuex/vuex'  //vuex
Vue.config.productionTip = true
import FastClick from 'fastclick'
FastClick.attach(document.body)
import { AjaxPlugin, LoadingPlugin, AlertPlugin  } from 'vux'
Vue.use(AjaxPlugin);
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
const baseUrl = "https://cnodejs.org/api/v1";
const loginTimeOutErrorCode = 'login_timeout_error';

Vue.prototype.baseUrl = baseUrl;
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
    data: opts.data || {}
  }).then(function (response) {
    vue.$vux.loading.hide()
    opts.success(response.data.data)
  }).catch(function (error) {
    vue.$vux.loading.hide()
    if (!opts.error) {
      let response = error.response
      let errorMessage = '请求失败'
      if (response && response.data) {
        if (response.data.code === loginTimeOutErrorCode) {
          window.location.href = '/'
        }
        errorMessage = response.data.message == null ? errorMessage : response.data.message;
      }
      vue.$vux.alert.show({
        title: '提示',
        content: errorMessage
      })
    } else {
      opts.error(error.response.data.data);
      console.info(opts.url,error.response.data.data);
    }
  })
}


Vue.prototype.get = function (opts) {
  opts.method = 'get';
  this.http(opts);
}
Vue.prototype.post = function (opts) {
  opts.method = 'post';
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
