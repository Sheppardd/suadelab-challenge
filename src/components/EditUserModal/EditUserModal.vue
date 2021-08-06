<template>
  <div class="modal-mask">
    <div class="modal-wrapper flex justify-center">
      <div class="modal-container flex-col">
        <!-- Modal header -->
        <div class="header flex">
          <span>Edit user</span>
        </div>
        <!-- Modal content (flex-grow to get remaining space) -->
        <div class="content flex-col flex-grow space-between">
          <div>
            <span>Enter an ID to start editing</span>
            <!-- Person fields -->
            <div class="forms just-flex space-between flex-wrap">
              <!-- ID -->
              <div class="form-field flex">
                <span>ID:</span>
                <input type="text" v-model="id">
              </div>
              <!-- NAME -->
              <div class="form-field flex">
                <span>Name:</span>
                <input type="text" v-model="person.name">
              </div>
              <!-- AGE -->
              <div class="form-field flex">
                <span>Age:</span>
                <input type="text" v-model="person.age">
              </div>
              <!-- EYE COLOR -->
              <div class="form-field flex">
                <span>E.Color:</span>
                <input type="text" v-model="person.eyeColor">
              </div>
              <!-- Gender -->
              <div class="form-field flex">
                <span>Gender:</span>
                <input type="text" v-model="person.gender">
              </div>
              <!-- PREFERENCES: pet -->
              <div class="form-field flex">
                <span>Pet:</span>
                <input type="text" v-model="person.preferences.pet">
              </div>
              <!-- PREFERENCES: fruit -->
              <div class="form-field flex">
                <span>Bird:</span>
                <input type="text" v-model="person.preferences.fruit">
              </div>
            </div>
          </div>
          <!-- Modal buttons -->
          <div class="buttons-container flex justify-end">
            <button :class="{disabled: !person._id}" class="app-button" @click="updatePerson"><span>save</span></button>
            <button class="app-button" @click="closeModal"><span>close</span></button>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { User } from "../../models/user";

export default defineComponent({
  name: "EditUserModal",
  emits: ["close"],
  setup:(props, context) => {
    const store = useStore();
    const people = computed(() => store.getters.getUsers);
    const closeModal = () => context.emit("close", true);
    // ID to get the USER to edit
    const id = ref("");
    // Function to initialize/reset USER object
    const initializeEmptyPerson = () => {
      const emptyPerson: User = {
        _id: "",
        name: "",
        age: "",
        eyeColor: "",
        gender: "",
        preferences: { pet: "", fruit: "" },
        location: { latitude: 0, longitude: 0 },
      };
      return emptyPerson;
    };
    // Person object to edit
    const person = ref(initializeEmptyPerson());
    // Update PERSON in store
    const updatePerson = () => {
      if(person.value._id) {
        store.commit("updateUser", person.value);
        closeModal();
      }
    };
    // Everytime the ID changes => update PERSON object
    watch(id, (newID) => {
      const result = people.value.find((person: User) => person._id === newID);
      // Watch out! Object.assign would still copy the ref of PREFERENCES and LOCATION
      if(result) person.value = JSON.parse(JSON.stringify(result));
      else person.value = initializeEmptyPerson();
    });
    return { id, person,closeModal, updatePerson };
  }
});
</script>

<style src="./style.scss">

</style>
