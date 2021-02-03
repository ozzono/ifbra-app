import Vue from "vue";
import Vuex from "vuex";
import evaluation from "./modules/evaluation";
import score from "./modules/score";
import theme from "./modules/theme";
import personal from "./modules/personal";
import print from "./modules/print";
import bodyFunctions from "./modules/bodyFunctions";
import fuzzy from "./modules/fuzzy";
import cid from "./modules/cid";
import { VueMaskDirective } from "v-mask";

Vue.directive("mask", VueMaskDirective);

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    evaluation,
    score,
    theme,
    personal,
    print,
    bodyFunctions,
    fuzzy,
    cid
  }
});
