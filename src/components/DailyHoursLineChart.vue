<template>
  <div class="card-body" style="height: 320px">
    <DailyHoursLineChart v-if="chartData.line" :data="chartData.line" />
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  data: { type: Object, required: true },
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: { display: true, text: "日期" },
      ticks: { maxTicksLimit: 8 },
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: "時數 (小時)" },
    },
  },
  plugins: {
    legend: { position: "top" },
    tooltip: { mode: "index", intersect: false },
  },
  animation: { duration: 1500 },
};
</script>
