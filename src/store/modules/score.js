const ranges = [
  [0, 5740],
  [5740, 6355],
  [6355, 7585],
  [7585, 8200]
];
const state = {
  filled: false,
  totalScores: [],
  totalScore: {
    medical: 0,
    social: 0
  },
  scores: [],
  linkedScores: [],
  degree: ""
};
const actions = {
  fuzzyfy({ commit }, forceFuzzy) {
    const dominios = forceFuzzy.dominios.reduce((out, dominio) => {
      return [...out, forceFuzzy.normalize(dominio)];
    }, []);
    var newScore={}
    commit(
      "mutateScores",
      state.scores.reduce((output, score) => {
        var hasNew=false
        if (
          (score.Dominio === dominios[0] || score.Dominio === dominios[1]) &&
          score.min != null
        ) {
          hasNew=true
          newScore=score.SubDominios.reduce((out, sub) => {
            sub.min={
              medical: score.min.medical,
              social: score.min.social
            }

            return [...out, sub];
          }, []);
        }
        {
          if (hasNew){
            score.SubDominios=newScore
          }
          return [...output, score];
        }
      }, [])
    );
  },
  setScores({ commit }, dominios) {
    var id = 0;
    var max = dominios.reduce((output, dominio) => {
      return output + dominio.SubDominios.length;
    }, 0);
    dominios = dominios.reduce((output, dominio) => {
      return [
        ...output,
        {
          Desc: dominio.Desc,
          Dominio: dominio.Dominio,
          SubDominios: dominio.SubDominios.reduce(
            (innerOutput, { Desc, Detalhe }) => {
              return [
                ...innerOutput,
                {
                  Desc: Desc,
                  Detalhe: Detalhe,
                  id: id++,
                  next: id === max ? 0 : id,
                  medical: null,
                  social: null,
                  barriers: []
                }
              ];
            },
            []
          ),
          min: {
            medical:100,
            social:100
          }
        }
      ];
    }, []);
    var linked = dominios.reduce((output, dominio) => {
      return [
        ...output,
        ...dominio.SubDominios.reduce((innerOutput, { id, next }) => {
          return [
            ...innerOutput,
            {
              id: id,
              next: next,
              medical: 0,
              social: 0
            }
          ];
        }, [])
      ];
    }, []);

    commit("mutateScores", dominios);
    commit("mutateLinked", linked);
  },
  updateScores({ commit }, score) {
    var value = parseInt(score.value, 10);
    state.scores[score.i].SubDominios[score.j][score.col] = value;
    state.linkedScores[state.scores[score.i].SubDominios[score.j].id ][score.col] = value;

    state.scores[score.i].min = state.scores[score.i].SubDominios.reduce(
      (output, element) => {
        if (output.medical > element.medical && element.medical != null) {
          output.medical = element.medical;
        }
        if (output.social > element.social && element.social != null) {
          output.social = element.social;
        }
        return output;
      },
      // 100
      {medical:100,social:100}
    );
    commit("mutateScores", state.scores);
  },
  cycleScores({ commit }, score) {
    var i = state.scores[score.i].SubDominios[score.j].id;
    const start = state.linkedScores[i];
    var stop = false;
    var filled = false;
    while (!stop) {
      if (
        (parseInt(state.linkedScores[state.linkedScores[i].next].medical, 10) ||
          0) == 0 ||
        (parseInt(state.linkedScores[state.linkedScores[i].next].social, 10) ||
          0) == 0
      ) {
        filled = false;
        stop = true;
      }
      if (start.id === state.linkedScores[i].next) {
        if (
          state.linkedScores[i].medical != 0 &&
          state.linkedScores[i].social != 0
        ) {
          filled = true;
        }
        stop = true;
      }
      i = state.linkedScores[i].next;
    }
    if (filled) {
      commit("mutateFilled", filled);
    }
  },
  calcScores({ commit }) {
    commit(
      "mutateTotals",
      state.scores.reduce((output, dominio) => {
        // pass thru every domain
        return [
          ...output,
          {
            Desc: dominio.Desc, //returns an array with domain name and total
            total: dominio.SubDominios.reduce(
              (innerOutput, subDominio) => {
                return {
                  //sums the medical and social total score
                  medical: (innerOutput.medical += parseInt(
                    subDominio.medical,
                    10
                  )),
                  social: (innerOutput.social += parseInt(
                    subDominio.social,
                    10
                  ))
                };
              },
              {
                medical: 0,
                social: 0
              }
            )
          }
        ];
      }, [])
    );
    commit(
      "mutateTotal",
      state.totalScores.reduce(
        (output, dominio) => {
          return {
            medical: (output.medical += dominio.total.medical),
            social: (output.social += dominio.total.social)
          };
        },
        { medical: 0, social: 0 }
      )
    );
    commit(
      "mutateDegree",
      getDegree(state.totalScore.medical + state.totalScore.medical)
    );
  },
  updateBarrier({ commit }, update) {
    commit(
      "mutateScores",
      state.scores.reduce((output, domain, i) => {
        return [
          ...output,
          i === update.i //changes only the update.i'th domain
            ? {
                Desc: domain.Desc,
                Dominio: domain.Dominio,
                SubDominios: domain.SubDominios.reduce(
                  (output, subDominio, j) => {
                    if (j === update.j) {
                      //changes only the update.j'th subDomain
                      subDominio.barriers = update.values.reduce(
                        (output, value) => {
                          return [
                            ...output,
                            ...update.barriers.reduce((output, barrier) => {
                              return [
                                ...output,
                                ...(value === barrier.Item //matches the incoming barrier values with the detailed barrier object
                                  ? [barrier.Desc]
                                  : [])
                              ];
                            }, [])
                          ];
                        },
                        []
                      );
                    }
                    return [...output, subDominio];
                  },
                  []
                )
              }
            : domain
        ];
      }, [])
    );
  }
};
const mutations = {
  mutateScores: (state, scores) => (state.scores = scores),
  mutateLinked: (state, linked) => (state.linkedScores = linked),
  mutateFilled: (state, filled) => (state.filled = filled),
  mutateTotals: (state, total) => (state.totalScores = total),
  mutateTotal: (state, total) => (state.totalScore = total),
  mutateDegree: (state, degree) => (state.degree = degree)
};
const getters = {
  filledStatus: state => state.filled,
  allScores: state => state.scores,
  totalScores: state => state.totalScores,
  totalScore: state => state.totalScore,
  degree: state => state.degree
};

function rangeCheck(val, range) {
  return range[0] <= val && val < range[1];
}

function getDegree(val) {
  switch (true) {
    case rangeCheck(val, ranges[0]):
      return "grave";
    case rangeCheck(val, ranges[1]):
      return "moderado";
    case rangeCheck(val, ranges[2]):
      return "leve";
    case rangeCheck(val, ranges[3]):
      return "insuficiente";
    default:
      break;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
};
