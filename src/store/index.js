import Vue from "vue";
import Vuex from "vuex";
import evaluation from "./modules/evaluation";
import score from "./modules/score";
import theme from "./modules/theme";
import fuzzy from "./modules/fuzzy";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    evaluation,
    theme,
    score,
    fuzzy
  }
});
