<template>
  <div class="container">
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
import { useStore } from "vuex";

export default defineComponent({
  name: "People",
  setup() {
    const store = useStore();
    const people = computed(() => store.getters.getUsers);
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
    return { table, defaultPageSize, };
  },
});
</script>

<style src="./style.scss" scoped>

</style>
