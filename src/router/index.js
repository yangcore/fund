import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/vuex'
Vue.use(Router)
let router=new Router({
  routes: [
    {
      path: '/',
      component: resolve => require([ '@/pages/loginAfter'], resolve),
    },
    {
      path: '/index',
      component: resolve => require([ '@/pages/index'], resolve),
    },
    {
      path: '/fundPortfolio',
      component: resolve => require([ '@/pages/fundPortfolio'], resolve)
    },
    {
      path: '/fundPortfolio/tagInfo',
      component: resolve => require([ '@/pages/tagInfo'], resolve)
    },
    {
      path: '/fundPortfolio/apply',
      component: resolve => require([ '@/pages/apply'], resolve)
    },
    {
      path: '/fundPortfolio/redeem',  
      component: resolve => require([ '@/pages/redeem'], resolve)
    },
    {
      path: '/fundPortfolio/fundDetails',  
      component: resolve => require([ '@/pages/fundDetails'], resolve)
    },
    {
      path:"/fundPortfolio/search",
      component: resolve => require([ '@/pages/search'], resolve)
    },
    {
      path:"/myAccount",
      component: resolve => require([ '@/pages/myAccount'], resolve)
    },
    {
      path:"/myAccount/fundTotalAssets",
      component: resolve => require([ '@/pages/fundTotalAssets'], resolve)
    },
    {
      path:"/myAccount/caifuFund",
      component: resolve => require([ '@/pages/caifuFund'], resolve)
    },
    {
      path:"/myAccount/myOrder",
      component: resolve => require([ '@/pages/myOrder'], resolve)
    }         
  ]
})

// simple history management
const history = window.sessionStorage
// history.removeItem('/')
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  //TODO
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  window.scrollTo(0,0);
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router;