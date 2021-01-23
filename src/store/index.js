import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '使用vuex'
  },
  mutations: {
    edit (state, payload) {
      state.name = 'jack' + payload
    }
  },
  actions: {
    // 执行异步操作
    aedit (context, payload) {
      setTimeout(() => {
        context.commit('edit', payload)
      }, 2000)
    }
  },
  modules: {
  }
})
