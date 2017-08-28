import Vue from 'vue'
import Vuet from 'vuet'
import All from "../components/All"
import Essence from "../components/Essence"
import VuetScroll from "vuet-scroll"
Vue.use(Vuet);
Vue.use(VuetScroll)
const vuet = new Vuet({
    data () {
      return {
        loading: true, // 请求中
        loaderr: false // 请求失败
      }
    },
    pathJoin: '-', // 父子模块的连接路径
    modules: {
      topic: {
        All: All,
        Essence: Essence
      }
    }
  })

  vuet.beforeEach(({ path, params, state }) => {
    state.loading = true
    state.loaderr = false
  })

  vuet.afterEach((err, { path, params, state }) => {
    state.loading = false
    state.loaderr = !!err
  })

  export default vuet