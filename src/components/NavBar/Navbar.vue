<template>
  <div class="nav-container">
    <!-- Navigation bar logo + title -->
    <div class="nav-header flex">
      <div class="logo-container"><img src="../../assets/icons/logo.svg" alt="logo"></div>
      <span>Alfonso Mateos</span>
    </div>

    <!-- Navigation items: icon + title -->
    <div v-for="item in navitems" :key="item.title" class="nav-item" v-bind:class="{'active': item.title.toLowerCase() === currentView}" v-on:click="changeView(item)">
      <font-awesome-icon :icon="item.icon" class="nav-item-icon"/>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted } from "vue";
import { useRoute } from "vue-router"; 
import { NavItem } from "../../models/nav-item";
import router from "../../router";

export default defineComponent({
  name: "Navbar",
  props: {
    navitems: {
      required: true,
      type: Array as PropType<NavItem[]>,
    }
  },
  setup: (props) => {
    const route = useRoute();
    const currentView = computed(() => route.fullPath.split("/")[1]); // "/path" => "path"
    const changeView = async (navItem: NavItem) => {
      router.push(navItem.path);
    }

    onMounted(() => {
      if(!currentView.value) router.push(props.navitems[0].path); // Redirect to view if no current view
    })

    return { currentView, changeView };
  }
});
</script>

<style src="./style.scss" scoped>

</style>
