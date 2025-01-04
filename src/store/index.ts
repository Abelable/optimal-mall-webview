import { getNewYearBagCount } from "@/utils/api";
import { createStore } from "vuex";

export default createStore({
  state: {
    newYearBagCount: 0,
  },
  getters: {},
  mutations: {
    setNewYearBagCount(state, count) {
      state.newYearBagCount = count;
    },
  },
  actions: {
    async updateNewYearBagCount(context) {
      const newYearBagCount = await getNewYearBagCount();
      context.commit("setNewYearBagCount", newYearBagCount);
    },
  },
  modules: {},
});
