/* eslint-disable no-console */
const state = {
  fuzzy: [],
  printFuzzy: []
};
const actions = {
  makePrintFuzzy({ commit }, fuzzyData) {
    commit(
      "mutatePrint",
      fuzzyData.reduce((output, row) => {
        row.needAid = false;
        row.severe = false;
        return [...output, row];
      }, [])
    );
  },
  updatePrintFuzzy({ commit }, input) {
    commit(
      "mutatePrint",
      state.printFuzzy.reduce((output, row) => {
        return [
          ...output,
          row.Desc === input.Desc
            ? {
                Desc: row.Desc,
                Obs: row.Obs,
                Dominios: row.Dominios,
                needAid: input.needAid,
                severe: input.severe
              }
            : row
        ];
      }, [])
    );
  },
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
    state.fuzzy[update.dominio.toLowerCase()].switch =
      state.fuzzy[update.dominio.toLowerCase()]._50 ||
      state.fuzzy[update.dominio.toLowerCase()]._75;
    commit("mutateFuzzy", state.fuzzy);
  }
};

const mutations = {
  mutateFuzzy: (state, fuzzy) => (state.fuzzy = fuzzy),
  mutatePrint: (state, printFuzzy) => (state.printFuzzy = printFuzzy)
};
const getters = {
  fuzzy: state => state.fuzzy,
  printFuzzy: state => state.printFuzzy
};

export default {
  state,
  actions,
  mutations,
  getters
};
