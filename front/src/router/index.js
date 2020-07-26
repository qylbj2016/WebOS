import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "user",
    redirect: "/login",
    component: resolve => require(["@/views/User.vue"], resolve),
    children: [
      {
        path: "/login",
        name: "login",
        component: resolve => require(["@/components/user/Login.vue"], resolve)
      },
      {
        path: "/register",
        name: "register",
        component: resolve =>
          require(["@/components/user/Register.vue"], resolve)
      },
      {
        path: "/forget",
        name: "forget",
        component: resolve => require(["@/components/user/Forget.vue"], resolve)
      }
    ]
  },
  {
    path: "/home",
    name: "home",
    component: resolve => require(["@/views/Home.vue"], resolve)
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
