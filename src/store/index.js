import Vue from "vue";
import Vuex from "vuex";
import evaluation from "./modules/evaluation";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    evaluation
  }
});
