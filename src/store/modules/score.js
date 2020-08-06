/* eslint-disable no-console */
const state = {
  filled: false
};
const actions = {
  setScores({ commit }, dominio) {
    var scores = setValues(dominio);
    state.scores = scores.dominio;
    state.linkedScores = scores.linked;
    commit("mutateScores", state.scores);
  },
  updateScores({ commit }, score) {
    console.log("updateScores");
    console.log(score);
    var value = parseInt(score.value, 10);
    if (score.col === "medical") {
      state.scores[score.i].SubDominios[score.j].medical = value;
      state.linkedScores[
        state.scores[score.i].SubDominios[score.j].id
      ].medical = value;
    }
    if (score.col === "social") {
      state.scores[score.i].SubDominios[score.j].social = value;
      state.linkedScores[
        state.scores[score.i].SubDominios[score.j].id
      ].social = value;
    }
    commit("mutateScores", state.scores);
  },
  cycleScores({ commit }, score) {
    console.log("cycleScores");
    var i = state.scores[score.i].SubDominios[score.j].id;
    const start = state.linkedScores[i];
    var stop = false;
    while (!stop) {
      if (
        state.linkedScores[state.linkedScores[i].next].medical === 0 ||
        state.linkedScores[state.linkedScores[i].next].social === 0
      ) {
        state.filled = false;
        stop = true;
      }
      if (start.id === state.linkedScores[i].next) {
        state.filled = true;
        stop = true;
      }
      i = state.linkedScores[i].next;
    }
    console.log({ filled: state.filled });
    commit("mutateScores", state.scores);
  },
};
const mutations = {
  mutateScores: (state, scores) => (state.scores = scores),
  mutateFilled: (state, filled) => (state.filled = filled)
};
const getters = {
  allScores: state => state
};

function setValues(dominio) {
  var id = 0;
  var max = 0;
  var linked = new Array();
  dominio.forEach(group => {
    for (let k = 0; k < group.SubDominios.length; k++) {
      max++;
    }
  });
  for (let i = 0; i < dominio.length; i++) {
    for (let j = 0; j < dominio[i].SubDominios.length; j++) {
      dominio[i].SubDominios[j].id = id++;
      dominio[i].SubDominios[j].medical = 0;
      dominio[i].SubDominios[j].social = 0;
      if (id === max) {
        dominio[i].SubDominios[j].next = 0;
      } else {
        dominio[i].SubDominios[j].next = id;
      }
      var item = {
        id: dominio[i].SubDominios[j].id,
        next: dominio[i].SubDominios[j].next,
        medical: 1,
        social: 1
      };
      linked.push(item);
    }
  }
  return {
    dominio: dominio,
    linked: linked
  };
}

export default {
  state,
  actions,
  mutations,
  getters
};
