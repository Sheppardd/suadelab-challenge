<template>
  <div class="container flex-col">
    <div class="table-search">
      <searchbar @search-updated="onSearchUpdate" :placeholder="searchPlaceholder" />
    </div>

    <div class="table-container">
      <vue-table-lite
        :is-static-mode="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :pageSize="defaultPageSize"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import { User } from "../../models/user";
import Searchbar from "../../components/SearchBar/Searchbar.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "People",
  components: { Searchbar },
  setup() {
    const store = useStore();
    const people = computed(() => store.getters.getUsers);
    const searchPlaceholder = "Search by name, age, eye color...";
    // Table data
    const tableData = ref(people.value.slice()); // Slice to get array instead of ref
    const tableTotal = computed(() => tableData.value.length);
    const defaultPageSize = 25; // Initial page size
    const table = reactive({
      columns: [
        { label: "Name", field: "name", width: "20%", sortable: true, isKey: true },
        { label: "Age", field: "age", width: "5%", sortable: true },
        { label: "Eye Color", field: "eyeColor", width: "20%", sortable: true },
        { label: "Gender", field: "gender", width: "10%", sortable: true },
        { label: "Preferences", field: "preferences", width: "30%", sortable: false,
          display: (row: User) => {
            return (`${row.preferences.pet} / ${row.preferences.fruit}`);
          },
        },
        { // TODO: edit button here
          label: "", field: "", width: "5%" },
      ],
      totalRecordCount: tableTotal,
      rows: tableData,
    });

    // Filter table data by all fields everytime the searchterm changes
    const onSearchUpdate = (newSearchterm) => {
      const searchTerm = newSearchterm.toLowerCase();
      tableData.value = people.value.filter(person => 
        person.name.toLowerCase().includes(searchTerm) ||
        person.age.toString().includes(newSearchterm) ||
        person.eyeColor.toLowerCase().includes(searchTerm) ||
        person.gender.toLowerCase().includes(searchTerm) ||
        person.preferences.pet.toLowerCase().includes(searchTerm) ||
        person.preferences.fruit.toLowerCase().includes(searchTerm)
      )
    }

    return { table, defaultPageSize, onSearchUpdate, searchPlaceholder };
  },
});
</script>

<style src="./style.scss" scoped>

</style>
