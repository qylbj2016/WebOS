import { getCurTime } from "../../utils/time";
export default {
  state: {
    date: getCurTime(),
    vtime: 0,
    stime: 0
  },
  mutations: {
    setTime(state) {
      state.vtime += 1;
      state.stime += 1;
      state.date = getCurTime();
    },
    initStime(state) {
      state.stime = 0;
    }
  },
  actions: {
    async initData({ commit }) {
      try {
        const res = await this._vm.$api({
          method: "GET",
          url: "http://localhost:3000/initData"
        });
        if (res.data.code === 400) {
          return res.data.msg;
        } else {
          commit("initApps", res.data.preApps, { root: true });
          commit("setData", res.data.preData, { root: true });
          commit("initInfo", res.data.userInfo, { root: true });
        }
      } catch (e) {
        alert(e);
      }
    }
  }
};
