const state = {
  theme: { dark: false }
};
const actions = {
  setTheme({ commit }, dark) {
    commit("mutateTheme", dark);
  }
};
const mutations = {
  mutateTheme: (state, dark) => (state.theme.dark = dark)
};
const getters = {
  theme: state => state.theme
};

export default {
  state,
  actions,
  mutations,
  getters
};
