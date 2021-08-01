<template>
  <div class="container just-flex">
    <!-- Main navigation (left) bar -->
    <Navbar :navitems="navitems" />

    <!-- Right side: view info -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Navbar from "../../components/NavBar/Navbar.vue";
import { NavItem } from "../../models/nav-item";

export default defineComponent({
  name: "Home",
  components: { Navbar },
  setup: () => {
    const navitems = ref<NavItem[]>([
      { path: "/dashboard", title: "Dashboard", icon: "chart-pie" },
      { path: "/people", title: "People", icon: "users" },
    ]);
    return { navitems };
  }
});
</script>

<style src="./style.scss" scoped>

</style>
