// initial state
const state = () => ({
  quantity: 0
});

// actions
const actions = {
  addQuantity() {
    this.commit("increment");
  }
};

// mutations
const mutations = {
  increment() {
    state.quantity++;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
