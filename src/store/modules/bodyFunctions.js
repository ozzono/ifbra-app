const state = {
  bodyFunctions: {}
};
const actions = {
  setFunctions({ commit }, bodyFunctions) {
    commit(
      "mutateFunctions",
      bodyFunctions.reduce((outerOutput, bodyFunction) => {
        return [
          ...outerOutput,
          {
            Type: bodyFunction.Tipo,
            SubFunction: bodyFunction.SubFuncao.reduce(
              (innerOutput, { Detalhe, Tipo }) => {
                return [
                  ...innerOutput,
                  {
                    Detail: Detalhe,
                    Type: Tipo,
                    checked: false
                  }
                ];
              },
              []
            )
          }
        ];
      }, [])
    );
  },
  updateSubFunction({ commit }, { i, j }) {
    commit(
      "mutateFunctions",
      state.bodyFunctions.reduce((output, bodyFunction, index) => {
        return [
          ...output,
          index === parseInt(i, 10)
            ? {
                Type: bodyFunction.Type,
                SubFunction: bodyFunction.SubFunction.reduce(
                  (innerOutput, subFunction, innerIndex) => {
                    return [
                      ...innerOutput,
                      innerIndex === parseInt(j, 10)
                        ? {
                            Detail: subFunction.Detail,
                            Type: subFunction.Type,
                            checked: !subFunction.checked
                          }
                        : subFunction
                    ];
                  },
                  []
                )
              }
            : bodyFunction
        ];
      }, [])
    );
  }
};
const mutations = {
  mutateFunctions: (state, bodyFunctions) =>
    (state.bodyFunctions = bodyFunctions)
};
const getters = {
  bodyFunctions: state => state.bodyFunctions
};

export default {
  state,
  actions,
  mutations,
  getters
};
