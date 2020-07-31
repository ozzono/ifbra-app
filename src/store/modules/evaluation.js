/* eslint-disable no-console */
const state = {
  evaluators: []
};

const getters = {
  allEvaluators: state => state.evaluators
};

const actions = {
  async addEvaluator({ commit }, evaluator) {
    if (evaluator.name.length > 0 && evaluator.type.length > 0) {
      commit("newEvaluator", evaluator);
    }
  },
  async removeEvaluator({ commit }, id) {
    commit("delEvaluator", id);
  }
};

const mutations = {
  newEvaluator: (state, evaluator) => {
    state.evaluators.push(evaluator);
  },
  delEvaluator: (state, id) =>
    (state.evaluators = state.evaluators.filter(
      evaluator => evaluator.id != id
    ))
};

export default {
  state,
  actions,
  mutations,
  getters
};
