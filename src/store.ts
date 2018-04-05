import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false
  },
  mutations: {
    cAuth (state, newValue) {
      state.isAuth = newValue
    }
  },
  actions: {

  },
});
