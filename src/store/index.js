import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: [],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
  actions: {
    getForm(state) {
      this.form = state.commit("updatePosts", form);
    },
  },
  mutations: {
    updatePosts(state, form) {
      state.form = form;
    },
  },
  modules: {},
});
