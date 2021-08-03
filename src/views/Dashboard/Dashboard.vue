<template>
  <div class="container">
    <div class="charts-wrapper">
      <!-- Bar chart -->
      <div class="chart-container">
          <span>Pet preference per age</span>
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

// Eye color constants to avoid typos
const BROWN = "brown";
const GREEN = "green";
const BLUE = "blue";

export default {
  name: "Dashboard",
  setup: () => {
    const store = useStore();
    const people = computed(() => store.getters.getUsers);

    // Bar chart data
    const barChartData = {
      options: { 
        chart: { id: "age-pet-chart", type: "bar" },
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] },
      },
      series: [ { name: "owl", data: [30, 40, 35, 50, 49, 60, 70, 91] } ]
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
    const getEyeColors = () => {
      people.value.forEach((person: User) => {
        if(person.eyeColor === BLUE) pieChartData.series[0]++;
        else if (person.eyeColor === GREEN) pieChartData.series[1]++;
        else if ( person.eyeColor === BROWN) pieChartData.series[2]++;
      })
    };

    onMounted(() => {
      getEyeColors();
    });

    return { barChartData, pieChartData };
  },
};
</script>

<style src="./style.scss" scoped>

</style>
