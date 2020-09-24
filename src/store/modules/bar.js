// initial state
const state = () => ({
  quantity: 0
});

// getters
const getters = {};

// actions
const actions = {
  addQuantity() {
    this.commit("increment");
  }
};

// mutations
const mutations = {
  increment() {
    state.quantity ++;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
