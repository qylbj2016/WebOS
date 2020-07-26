export default {
  state: {
    name: "游客",
    head: "/img/prehead.png",
    snpwd: ""
  },
  mutations: {
    initInfo(state, data) {
      state.name = data.name;
      state.head = data.head;
    }
  }
};
