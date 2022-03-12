import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/new-Form",
    name: "newForm",
    component: () => import("../views/NewForm.vue"),
  },
  {
    path: "/form/:id",
    component: () => import("../views/FormItem.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
