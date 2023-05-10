import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/homePage.vue"),
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("@/views/successPage.vue"),
  },
  {
    path: "/fail",
    name: "Fail",
    component: () => import("@/views/failPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
