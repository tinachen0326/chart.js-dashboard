<template>
  <div class="relative h-64">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "SchoolHoursBarChart",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);

    const createChart = async () => {
      await nextTick();

      if (!chartCanvas.value || !props.data) return;

      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      const ctx = chartCanvas.value.getContext("2d");

      chartInstance.value = new ChartJS(ctx, {
        type: "bar",
        data: props.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "日期",
              },
              ticks: {
                maxTicksLimit: 8,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "時數 (小時)",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          animation: {
            duration: 1200,
          },
        },
      });
    };

    onMounted(createChart);

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
    });

    watch(() => props.data, createChart, { deep: true });

    return {
      chartCanvas,
    };
  },
};
</script>
