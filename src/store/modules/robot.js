// initial state
const state = () => ({
    total:2,
    activy:{
        foo:0,
        bar:0,
        foobar:0,
    }
});

// getters
const getters = {
    iddle(){
        return state.total - state.activy.reduce(function(_this, val) {
            return _this + val.foo + val.bar + + val.foobar
        }, 0)
    }
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
