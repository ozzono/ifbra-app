const state = {
  info: {
    name: "",
    age: "",
    registry: "",
    sex: "",
    ethnicity: "",
    deficiencyType: [],
    CID: [],
    history: "",
    birthday: "",
    informant: {
      type: "",
      name: ""
    }
  },
  infoReady: false
};
const actions = {
  setInfo({ commit }, info) {
    commit("mutateInfo", info);
  }
};
const mutations = {
  mutateInfo: (state, info) => (state.info = info)
};
const getters = {
  personal: state => state.info
};

export default {
  state,
  actions,
  mutations,
  getters
};
