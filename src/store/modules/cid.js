const joinSplice = function(array, index, item) {
  array.join();
  array.splice(index, 0, item);
  array.join();
  return array;
};

const state = {
  cid: []
};
const actions = {
  unlistCID({ commit }, cid) {
    commit(
      "mutateCID",
      JSON.parse(
        JSON.stringify(
          state.cid.filter(element => {
            if (element !== cid) {
              return element;
            }
          })
        )
      )
    );
  },
  refillCID({ commit }, cid) {
    if (
      state.cid.some(element => {
        return element === cid;
      })
    ) {
      return;
    }
    var arr = JSON.parse(JSON.stringify(state.cid));
    const length = arr.length;
    if (arr[0] > cid) {
      arr = joinSplice(arr, 0, cid);
    } else if (arr[length - 1] < cid) {
      arr.push(cid);
    } else {
      for (let i = 0; i < length; i++) {
        if (arr[i] < cid && arr[i + 1] >= 2) {
          arr = joinSplice(arr, i, cid);
          break;
        }
      }
    }
    commit("mutateCID", arr);
  },
  fillCID({ commit }, cidList) {
    commit("mutateCID", cidList);
  }
};
const mutations = {
  mutateCID: (state, cid) => (state.cid = cid)
};
const getters = {
  allCID: state => state.cid
};

export default {
  state,
  actions,
  mutations,
  getters
};
