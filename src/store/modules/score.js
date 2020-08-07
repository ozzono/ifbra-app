/* eslint-disable no-console */
const state = {
  filled: false,
  scores: [],
  linkedScores: []
};
const actions = {
  setScores({ commit }, dominio) {
    var scores = setValues(dominio);
    state.scores = scores.dominio;
    state.linkedScores = scores.linked;
    commit("mutateScores", state.scores);
  },
  updateScores({ commit }, score) {
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
    var i = state.scores[score.i].SubDominios[score.j].id;
    const start = state.linkedScores[i];
    var stop = false;
    while (!stop) {
      if (
        parseInt(state.linkedScores[state.linkedScores[i].next].medical, 10) ===
          0 ||
        parseInt(state.linkedScores[state.linkedScores[i].next].social, 10) ===
          0
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
    commit("mutateScores", state.scores);
  },
  calcScores({ commit }) {
    console.log("calculating scores");
    var total = {
      medical: 0,
      social: 0
    };
    //groups
    for (let i = 0; i < state.scores.length; i++) {
      var medical = 0;
      var social = 0;
      var count = 0;
      console.log("[" + i + "]:");
      //subgroups
      for (let j = 0; j < state.scores[i].SubDominios.length; j++) {
        medical = parseInt(
          medical + parseInt(state.scores[i].SubDominios[j].medical, 10),
          10
        );
        social = parseInt(
          social + parseInt(state.scores[i].SubDominios[j].social, 10),
          10
        );
        count++;
      }
      console.log({
        medical: medical,
        social: social,
        count: count
      });
      state.scores[i].SubDominios.average = {
        medical: medical / count,
        social: social / count
      };
    }
    state.scores.total = total.medical;
    state.scores.total = total.social;
    commit("mutateScores", state.scores);
  }
};
const mutations = {
  mutateScores: (state, scores) => (state.scores = scores),
  mutateFilled: (state, filled) => (state.filled = filled)
};
const getters = {
  filledStatus: state => state.filled
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
      dominio[i].SubDominios[j].medical = 1;
      dominio[i].SubDominios[j].social = 1;
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
