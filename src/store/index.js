import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    dicttype:[]
  },
  getters: {},
  mutations: {
    setdicttype(state,list){
      state.dicttype=list
    }
  }
})
