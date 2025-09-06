<template>
  <Pie :data="data" :options="options" />
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  data: { type: Object, required: true },
});

const options = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
};
</script>
