import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import axios from "axios";
import api from "./utils/api";
import "./assets/css/init.scss";

Vue.use(ElementUI);

axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$getViewportSize = () => ({
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  height:
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
