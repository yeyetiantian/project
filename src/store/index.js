import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    dicttype:[],
    phone:null,
  },
  getters: {},
  mutations: {
    setdicttype(state,list){
      state.dicttype=list
    },
    setPhone(state,phone){
      state.phone=phone
    }
  }
})
