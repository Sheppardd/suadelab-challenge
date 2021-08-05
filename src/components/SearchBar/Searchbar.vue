<template>
  <div class="container flex">
    <font-awesome-icon icon="search" class="search-icon"/>
    <input class="search-input" type="text" :placeholder="placeholder" v-model="searchTerm">
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";

export default defineComponent({
  name: "Searchbar",
  emits: ["search-updated"],
  props: {
    placeholder: {
      required: true,
      type: String,
    }
  },
  setup:(props, context) => {
    const searchTerm = ref("");

    watch(searchTerm, (newValue) => {
      context.emit("search-updated", newValue)
    })

    return { searchTerm };
  }
});
</script>

<style src="./style.scss" scoped>

</style>
