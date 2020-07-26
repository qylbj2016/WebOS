import Vue from "vue";
import Vuex from "vuex";

import status from "./modules/status";
import task from "./modules/task";
import config from "./modules/config";
import apps from "./modules/apps";
import user from "./modules/user";
import init from "./modules/init";
import cmts from "./modules/cmts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    status,
    task,
    config,
    apps,
    user,
    init,
    cmts
  }
});
