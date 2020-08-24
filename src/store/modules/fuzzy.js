/* eslint-disable no-console */
const state = {
  fuzzy: [],
  markFuzzy: []
};
// try array.some
// try array.every
// try array.map
// try array.find
const actions = {
  makeFuzzy({ commit }, scores) {
    commit(
      "mutateFuzzy",
      scores.reduce((output, score) => {
        return [...output, { dominio: score.Dominio, _50: false, _75: false }];
      }, [])
    );
  },
  updateFuzzy({ commit }, update) {
    // var count = 0;
    state.fuzzy[update.i]._50 = update.scores[update.i].SubDominios.some(
      subdominio => {
        return (
          parseInt(subdominio.medical, 10) <= 50 ||
          parseInt(subdominio.social, 10) <= 50
        );
      }
    );
    state.fuzzy[update.i]._75 = state.fuzzy[update.i]._50
      ? false
      : (state.fuzzy[update.i]._75 = update.scores[update.i].SubDominios.every(
          subdominio => {
            return (
              parseInt(subdominio.medical, 10) <= 75 &&
              parseInt(subdominio.social, 10) <= 75
            );
          }
        ));
    commit("mutateFuzzy", state.fuzzy);
  }
};

const mutations = {
  mutateFuzzy: (state, fuzzy) => (state.fuzzy = fuzzy)
};
const getters = {
  fuzzy: state => state.fuzzy
};

export default {
  state,
  actions,
  mutations,
  getters
};
