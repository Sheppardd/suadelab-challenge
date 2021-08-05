<template>
  <div class="container flex-col">
    <!-- Search bar -->
    <div class="table-search">
      <Searchbar @search-updated="onSearchUpdate" :placeholder="searchPlaceholder" />
    </div>
    
    <!-- Table -->
    <div class="table-container">
      <div class="flex justify-end buttons-container"><button class="app-button" @click="showModal = true">Edit Users</button></div>
      <vue-table-lite class="table"
        :is-static-mode="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :pageSize="defaultPageSize"
      />
    </div>

    <!-- Edit user modal -->
    <transition name="modal">
      <EditUserModal v-if="showModal" @close="showModal = false" />
    </transition> 
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import Searchbar from "../../components/SearchBar/Searchbar.vue";
import EditUserModal from "../../components/EditUserModal/EditUserModal.vue";
import { User } from "../../models/user";
import { useStore } from "vuex";

export default defineComponent({
  name: "People",
  components: { Searchbar, EditUserModal },
  setup() {
    const store = useStore();
    const people = computed(() => store.getters.getUsers);
    const searchPlaceholder = "Search by name, age, eye color...";
    const showModal = ref(false);
    // Table data
    const tableData = ref(people.value.slice()); // Slice to get array instead of ref
    const tableTotal = computed(() => tableData.value.length);
    const defaultPageSize = 25; // Initial page size
    const table = reactive({
      columns: [
        { label: "ID", field: "_id", width: "20%", sortable: true, isKey: true },
        { label: "Name", field: "name", width: "20%", sortable: true },
        { label: "Age", field: "age", width: "5%", sortable: true },
        { label: "Eye Color", field: "eyeColor", width: "15%", sortable: true },
        { label: "Gender", field: "gender", width: "10%", sortable: true },
        { label: "Preferences", field: "preferences", width: "25%", sortable: false,
          display: (row: User) => {
            return (`${row.preferences.pet} / ${row.preferences.fruit}`);
          },
        }
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
    return { table, defaultPageSize, onSearchUpdate, searchPlaceholder, showModal };
  },
});
</script>

<style src="./style.scss" scoped>

</style>
