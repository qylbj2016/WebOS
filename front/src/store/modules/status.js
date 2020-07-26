export default {
  state: {
    curApp: null, //当前被右击选中的app
    menuStatus: 0, // 右击菜单状态  0是无，1是桌面菜单，2是app菜单
    menuPosition: {},
    calendar: false, // 日历
    shipitmenu: false, // 开始菜单
    dotips: true, //系统使用说明
    snsaver: false,
    online: navigator.onLine,
    screenfull: false
  },
  mutations: {
    rightClickApp(state, { app, x, y }) {
      state.curApp = app;
      state.menuStatus = 2;
      state.menuPosition = {
        left: x + "px",
        top: y + "px"
      };
    },
    rightClick(state, { x, y }) {
      state.menuStatus = 1;
      state.menuPosition = {
        left: x + "px",
        top: y + "px"
      };
    },
    clearMenu(state) {
      state.menuStatus = 0;
      state.calendar = false;
      state.shipitmenu = false;
    },
    showCalendar(state, bool) {
      state.calendar = bool;
    },
    showShipitmenu(state, bool) {
      state.shipitmenu = bool;
    },
    showSnsaver(state, bool) {
      state.snsaver = bool;
    },
    updateOnlineStatus(state, t) {
      state.online = t.type === "online";
      this._vm.$message({
        type: t.type === "online" ? "success" : "error",
        message:
          t.type === "online"
            ? "网络已恢复正常"
            : "网络错误，请检查您的网络情况"
      });
    },
    clickFullscreen(state) {
      state.screenfull = !state.screenfull;
    },
    showTips(state, bool) {
      state.dotips = !! bool;
    }
  }
};
