/* eslint-disable no-console */
const state = {
  fuzzy: []
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
        output[`${score.Dominio}`] = {
          _50: false,
          _75: false,
          dominio: score.Dominio
        };
        return output;
      }, [])
    );
  },
  updateFuzzy({ commit }, update) {
    var dominio = update.scores.filter(score => {
      return score.Dominio.toLowerCase().includes(update.dominio.toLowerCase());
    })[0];
    state.fuzzy[update.dominio.toLowerCase()]._50 = dominio.SubDominios.some(
      subdominio => {
        return (
          parseInt(subdominio.medical, 10) <= 50 ||
          parseInt(subdominio.social, 10) <= 50
        );
      }
    );
    state.fuzzy[update.dominio.toLowerCase()]._75 = state.fuzzy[
      update.dominio.toLowerCase()
    ]._50
      ? false
      : (state.fuzzy[
          update.dominio.toLowerCase()
        ]._75 = dominio.SubDominios.every(subdominio => {
          return (
            parseInt(subdominio.medical, 10) == 75 &&
            parseInt(subdominio.social, 10) == 75
          );
        }));
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
