const state = {
  printView: false
};
const actions = {
  updatePrintView({ commit }) {
    commit("mutatePrintView", !state.printView);
  }
};
const mutations = {
  mutatePrintView: (state, printView) => (state.printView = printView)
};
const getters = {
  printView: state => state.printView
};

export default {
  state,
  actions,
  mutations,
  getters
};
