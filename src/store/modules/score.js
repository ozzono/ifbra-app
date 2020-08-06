/* eslint-disable no-console */
const state = {
  filled: false
};
const actions = {
  setScores({ commit }, dominio) {
    var scores = setValues(dominio);
    state.scores = [scores.dominio, scores.dominio];
    state.linkedScores = [scores.linked, scores.linked];
    commit("mutateScores", state.scores);
  },
  updateScores({ commit }, score) {
    state.scores[score.col][score.i].SubDominios[score.j].value = parseInt(
      score.value,
      10
    );
    state.linkedScores[score.col][
      state.scores[score.col][score.i].SubDominios[score.j].id
    ].value = parseInt(score.value, 10);
    console.log([
      state.scores[0][score.i].SubDominios[score.j],
      state.scores[1][score.i].SubDominios[score.j]
    ]);
    commit("mutateScores", state.scores);
  },
  cycleScores({ commit }, score) {
    var i = state.scores[score.col][score.i].SubDominios[score.j].id;
    const start = state.linkedScores[score.col][i];
    var stop = false;
    while (!stop) {
      if (
        state.linkedScores[score.col][state.linkedScores[score.col][i].next]
          .value === 0
      ) {
        state.filled = false;
        stop = true;
      }
      if (start.id === state.linkedScores[score.col][i].next) {
        state.filled = true;
        stop = true;
      }
      i = state.linkedScores[score.col][i].next;
    }
    commit("mutateScores", state.scores);
  },
  calcScores({ commit }) {
    var total = {
      medical: 0,
      social: 0
    };
    //groups
    for (let i = 0; i < state.scores[0].length; i++) {
      var medical = 0;
      var social = 0;
      var count = 0;
      //subgroups
      for (let j = 0; j < state.scores[0][i].SubDominios.length; j++) {
        medical =
          medical + parseInt(state.scores[0][i].SubDominios[j].value, 10);
        social = social + parseInt(state.scores[1][i].SubDominios[j].value, 10);
        count++;
        // console.log({
        //   medical: parseInt(
        //     state.scores[0][i].SubDominios[j].value,
        //     10
        //   ),
        //   social: parseInt(state.scores[1][i].SubDominios[j].value, 10),
        //   count: count
        // });
        if (count == 2) {
          break;
        }
      }
      state.scores[0][i].SubDominios.average = medical / count;
      total.medical += state.scores[0][i].SubDominios.average;
      state.scores[1][i].SubDominios.average = social / count;
      total.social += state.scores[1][i].SubDominios.average;
      // console.log({
      //   medical_average: state.scores[0][i].SubDominios.average,
      //   social_average: state.scores[1][i].SubDominios.average
      // });
      break;
    }
    state.scores[0].total = total.medical;
    state.scores[1].total = total.social;
    console.log({
      medical_total: state.scores[0].total,
      social_total: state.scores[1].total
    });
    commit("mutateScores", state.scores);
  }
};
const mutations = {
  mutateScores: (state, scores) => (state.scores = scores)
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
      dominio[i].SubDominios[j].value = 0;
      if (id === max) {
        dominio[i].SubDominios[j].next = 0;
      } else {
        dominio[i].SubDominios[j].next = id;
      }
      linked.push({
        id: dominio[i].SubDominios[j].id,
        next: dominio[i].SubDominios[j].next,
        value: 1
      });
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
