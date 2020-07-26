export default {
  state: {
    preApps: [],
    sApps: [],
    apps: []
  },
  mutations: {
    refreshApps(state) {
      let temp = [...state.preApps];
      state.preApps = [];
      setTimeout(() => {
        state.preApps = temp;
      }, 20);
    },
    initApps(state, data) {
      state.preApps = data.preApps;
      state.sApps = data.sApps;
      state.apps = data.preApps.concat(data.sApps);
    },
    updateApps(state, args) {
      if (args.it === undefined || args.it.type !== "系统") {
        if (args.op === "add") {
          state.preApps.push(args.it);
          state.sApps.forEach((item, idx, self) => {
            item.appId === args.it.appId ? self.splice(idx, 1) : "";
          });
        } else if (args.op === "del") {
          state.sApps.push(args.it);
          state.preApps.forEach((item, idx, self) => {
            item.appId === args.it.appId ? self.splice(idx, 1) : "";
          });
        }
      } else if (args.it.type === "系统") {
        this._vm.$message({
          message: "系统应用不可卸载",
          type: "warning"
        });
      } else {
        return;
      }
      this._vm.$api({
        method: "POST",
        url: "http://localhost:3000/updateApps",
        data: {
          preApps: state.preApps
        }
      });
    }
  }
};
