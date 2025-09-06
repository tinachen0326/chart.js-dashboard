<template>
  <div class="card-body h-180">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps({
  data: { type: Object, required: true },
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { title: { display: true, text: "日期" } },
    y: { beginAtZero: true, title: { display: true, text: "時數 (小時)" } },
  },
  plugins: {
    legend: { position: "top" },
    tooltip: { mode: "index", intersect: false },
  },
  animation: { duration: 1500 },
};
</script>
