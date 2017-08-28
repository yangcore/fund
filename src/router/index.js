import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'All',
      components: {All:resolve => require([ '@/components/All'], resolve)},
      meta: {
        keepAlive: true
    }
    },
    {
      path: '/Essence',
      name: 'Essence',
      components: {Essence:resolve => require([ '@/components/Essence'], resolve)}
    },
    {
      path: '/Share',
      name: 'Share',
      component: resolve => require([ '@/components/Share'], resolve)
    },
    {
      path: '/Questions',
      name: 'Questions',
      component: resolve => require([ '@/components/Questions'], resolve)
    },{
      path: '/Recruitment',
      name: 'Recruitment',
      component: resolve => require([ '@/components/Recruitment'], resolve)
    }
  ]
})
