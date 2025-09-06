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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "vue-chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: "DailyHoursLineChart",
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
        type: "line",
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
            duration: 1500,
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
