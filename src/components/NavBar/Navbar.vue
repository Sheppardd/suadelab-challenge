<template>
  <div class="nav-container">
    <!-- Navigation bar logo + title -->
    <div class="nav-header">
      <h3>Alfonso Mateos</h3>
    </div>

    <!-- Navigation items: icon + title -->
    <div v-for="item in navitems" :key="item.title" class="nav-item" v-bind:class="{'active': item.title === currentView}" v-on:click="changeView(item)">
      <font-awesome-icon :icon="item.icon" class="nav-item-icon"/>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
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
    let currentView = ref(props.navitems[0].title);
    const changeView = async (navItem: NavItem) => {
      currentView.value = navItem.title;
      router.push(navItem.path);
    }

    return { currentView, changeView };
  }
});
</script>

<style src="./style.scss" scoped>

</style>
