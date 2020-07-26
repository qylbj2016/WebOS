export default {
  state: {
    preData: null,
    curData: {
      bgIdx: 0,
      haveTips: 0
    },
    bgArr: [
      "/img/bgs/m2.jpg",
      "/img/bgs/car.jpg",
      "/img/bgs/m1.jpg",
      "/img/bgs/view1.jpg",
      "/img/bgs/view2.jpg",
      "/img/bgs/view3.jpg",
      "/img/bgs/view4.jpg"
    ]
  },
  mutations: {
    //data:  { key: xxx,  val: xxx }
    setData(state, data) {
      state.curData = JSON.parse(JSON.stringify(data));
      state.preData = JSON.parse(JSON.stringify(data));
    },
    changeData(state, data) {
      state.curData = Object.assign({}, state.curData, data);
    },
    save(state) {
      state.preData = JSON.parse(JSON.stringify(state.curData));
    },
    restore(state) {
      state.curData = JSON.parse(JSON.stringify(state.preData));
    }
  },
  actions: {
    async updatePreData({ commit }, data) {
      const res = await this._vm.$api({
        method: "POST",
        url: "http://localhost:3000/updatePreData",
        data
      });
      if (res) {
        commit("save");
        if (!data.haveTips) {
          this._vm.$message({
            message: "保存成功",
            type: "success"
          });
        }
      }
    }
  }
};
