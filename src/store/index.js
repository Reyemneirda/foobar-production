import Vue from "vue";
import Vuex from "vuex";
import gameManager from "./modules/game-manager";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gameManager
  }
});
