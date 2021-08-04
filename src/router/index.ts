import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import People from "../views/People/People.vue";

const routes: any = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/people",
        component: People,
      }
    ]
  },
  { // Catch all non defined routes and redirect to 'Home'
    path: "/:catchAll(.*)",
    redirect: "/",
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
