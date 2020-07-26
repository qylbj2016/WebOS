export default {
  state: {
    cmts: []
  },
  mutations: {
    initCmts(state, data) {
      state.cmts = data;
    },
    updateCmts(state, data) {
      let temp = JSON.parse(JSON.stringify(state.cmts));
      temp.splice(data.idx, data.num, data.cmt);
      state.cmts = temp;
    }
  },
  actions: {
    async getCmts({ commit }) {
      try {
        const res = await this._vm.$api({
          method: "GET",
          url: "http://localhost:3000/getComments"
        });
        commit("initCmts", res.data);
      } catch (e) {
        throw new Error(e);
      }
    },
    async writeCmt({ commit }, data) {
      try {
        const res = await this._vm.$api({
          method: "POST",
          url: "http://localhost:3000/writeComment",
          data
        });
        commit("updateCmts", { idx: data.len, num: 0, cmt: res.data });
      } catch (e) {
        throw new Error(e);
      }
    },
    async thumbUp({ commit }, data) {
      try {
        const { cid, opt } = data;
        const res = await this._vm.$api({
          method: "GET",
          url: "http://localhost:3000/thumbUp",
          params: {
            cid,
            opt
          }
        });
        commit("updateCmts", { idx: data.idx, num: 1, cmt: res.data });
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
