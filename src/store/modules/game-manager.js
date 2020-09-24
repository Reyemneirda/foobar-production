// import ressourceManager from './ressource-manager'

// initial state
const state = () => ({
  gameStarted: false,
  gameWon: false
});

// getters
const getters = {};

// actions
const actions = {
  gameStarts({ commit }) {
    commit("startGame");
  },
  gameEnds({ commit, nb_robots }) {
    if (nb_robots >= 20) {
      commit("gameWon");
    }
  }
};

// mutations
const mutations = {
  startGame(state) {
    state.gameStarted = true;
  },
  gameWon(state) {
    state.gameWon = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
