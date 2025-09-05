<template>
  <div class="relative h-64">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "AttendancePieChart",
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
        type: "pie",
        data: props.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.parsed;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} 小時 (${percentage}%)`;
                },
              },
            },
          },
          animation: {
            animateRotate: true,
            duration: 1000,
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
