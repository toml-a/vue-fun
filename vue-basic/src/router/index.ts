import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "@/views/ContactView.vue";
import AboutView from "@/views/AboutView.vue";
import CatView from "@/views/CatView.vue";
import DogView from "@/views/DogView.vue";
import BirdView from "@/views/BirdView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/cat",
      name: "cat",
      component: CatView,
    },
    {
      path: "/dog",
      name: "dog",
      component: DogView,
    },
    {
      path: "/bird",
      name: "bird",
      component: BirdView,
    },
  ],
});

export default router;
