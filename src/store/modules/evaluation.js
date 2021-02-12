const state = {
  evaluators: [],
  date: ""
};

const getters = {
  allEvaluators: state => state.evaluators,
  evalDate: state => state.date
};

const actions = {
  async addEvaluator({ commit }, evaluator) {
    commit("newEvaluator", evaluator);
  },
  async removeEvaluator({ commit }, id) {
    commit("delEvaluator", id);
  },
  setDate({ commit }, date) {
    commit("mutateDate", date);
  }
};

const mutations = {
  newEvaluator: (state, evaluator) => {
    state.evaluators.push(evaluator);
  },
  mutateDate: (state, date) => (state.date = date),
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
