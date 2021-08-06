<template>
  <div class="container">
    <div class="charts-wrapper">
      <!-- Bar chart -->
      <div class="chart-container">
          <span>Pet preference per age group</span>
          <apexchart
          :options="barChartData.options"
          :series="barChartData.series"
          />
      </div>

      <!-- Bar chart -->
      <div class="chart-container">
        <div><span>Eye colours</span></div>
        <apexchart
          :options="pieChartData.options"
          :series="pieChartData.series"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { User } from "../../models/user";

// Constants to avoid typos
const eyeColors = {
  BROWN: "brown",
  GREEN: "green",
  BLUE: "blue",
};
const pet = {
  DOG: "dog",
  CAT: "cat",
  BIRD: "bird",
  NONE: "none",
};
const PETS_NUMBER = Object.keys(pet).length;

export default {
  name: "Dashboard",
  setup: () => {
    const store = useStore();
    const people = computed(() => store.getters.getUsers);

    // Bar chart data
    const barChartData = {
      options: { 
        chart: { id: "age-pet-chart", type: "bar", stacked: false },
        xaxis: { categories: ["20-25", "25-30", "30-35", "35-40"] },
      },
      series: [ 
        { name: "dog", data: [0, 0, 0, 0] },
        { name: "cat", data: [0, 0, 0, 0] },
        { name: "bird", data: [0, 0, 0, 0] }, 
        { name: "none", data: [0, 0, 0, 0] }, 
      ],
    };

    // Pie chart data
    const pieChartData = {
      options: {
        chart: { id: "eye-color-chart", type: "pie" },
        labels: ["Blue", "Green", "Brown"],
      },
      series: [0, 0, 0],
    };

    // Format data functions
    const getEyeColorsChart = () => {
      people.value.forEach((person: User) => {
        if(person.eyeColor === eyeColors.BLUE) pieChartData.series[0]++;
        else if (person.eyeColor === eyeColors.GREEN) pieChartData.series[1]++;
        else if ( person.eyeColor === eyeColors.BROWN) pieChartData.series[2]++;
      });
    };

    // Filter list by pet preference
    const getAnimalPreference = (pref: string) => {
      return people.value.filter((person: User) => person.preferences.pet === pref );
    };

    // Filter list by age range
    const getAgeRange = (ageFrom: number, ageTo: number, list: User[]) => {
      return list.filter((person: User) => person.age > ageFrom && person.age <= ageTo).length;
    };

    const getAgePetChart = () => {
      const pets = Object.values(pet); // Get PET object values to access them by index in the loop

      // Please note that the dataset is very small and this way the code is more legible
      for(let i=0; i<PETS_NUMBER; i++) {
        const list = getAnimalPreference(pets[i]);
        barChartData.series[i].data[0] = getAgeRange(19, 25, list); // (19, 25]
        barChartData.series[i].data[1] = getAgeRange(25, 30, list); // (25, 30]
        barChartData.series[i].data[2] = getAgeRange(30, 35, list); // (30, 35]
        barChartData.series[i].data[3] = getAgeRange(35, 40, list); // (35, 40]
      }
    };

    onMounted(() => {
      getEyeColorsChart();
      getAgePetChart();
    });

    return { barChartData, pieChartData };
  },
};
</script>

<style src="./style.scss" scoped>

</style>
