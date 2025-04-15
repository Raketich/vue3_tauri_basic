import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/HomePage.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./pages/SearchPage.vue"),
    },
  ],
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
