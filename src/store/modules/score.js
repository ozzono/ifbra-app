const state = {
  filled: false,
  total: {
    medical: 0,
    social: 0
  },
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
    commit("mutateFilled", state.filled);
  },
  calcScores({ commit }) {
    //groups
    var totalSum = {
      medical: 0,
      social: 0
    };
    for (let i = 0; i < state.scores.length; i++) {
      //subgroups
      var sum = state.scores[i].SubDominios.reduce((accumulator, element) => {
        return (accumulator = {
          medical: accumulator.medical + parseInt(element.medical, 10),
          social: accumulator.social + parseInt(element.social, 10)
        });
      });
      state.scores[i].Average = {
        medical: sum.medical / state.scores[i].SubDominios.length,
        social: sum.social / state.scores[i].SubDominios.length
      };
      totalSum.medical += parseInt(state.scores[i].Average.medical, 10);
      totalSum.social += parseInt(state.scores[i].Average.social, 10);
    }
    var total = {
      medical: totalSum.medical / state.scores.length,
      social: totalSum.social / state.scores.length
    };
    commit("mutateTotal", total);
    commit("mutateScores", state.scores);
  }
};
const mutations = {
  mutateScores: (state, scores) => (state.scores = scores),
  mutateFilled: (state, filled) => (state.filled = filled),
  mutateTotal: (state, total) => (state.total = total)
};
const getters = {
  filledStatus: state => state.filled,
  allScores: state => state.scores,
  scoreTotal: state => state.total
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
        medical: 0,
        social: 0
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
