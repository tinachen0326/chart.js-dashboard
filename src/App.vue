<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 標題 -->
    <header class="bg-white shadow-sm">
      <div class="container py-6">
        <h1 class="text-4xl font-bold text-center text-blue-600">
          Tina 出缺勤儀表板
        </h1>
      </div>
    </header>

    <!-- 統計卡片區域 -->
    <section class="container py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="總課程時數"
          :value="stats.classHours"
          :animate="true"
        />
        <StatCard
          title="實際上課時數"
          :value="stats.attendedHours"
          :animate="true"
        />
        <StatCard title="缺席時數" :value="stats.absentHours" :animate="true" />
        <StatCard title="遲到時數" :value="stats.lateHours" :animate="true" />
        <StatCard
          title="早退時數"
          :value="stats.leaveEarlyHours"
          :animate="true"
        />
        <StatCard
          title="出勤比率"
          :value="stats.attendanceRate"
          :animate="true"
          suffix="%"
        />
      </div>
    </section>

    <!-- 圖表區域 -->
    <section class="container py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 圓餅圖 -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-center">出席狀況</h3>
          </div>
          <div class="card-body">
            <AttendancePieChart v-if="chartData.pie" :data="chartData.pie" />
          </div>
        </div>

        <!-- 折線圖 -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-center">每日上課時數</h3>
          </div>
          <div class="card-body">
            <DailyHoursLineChart v-if="chartData.line" :data="chartData.line" />
          </div>
        </div>

        <!-- 長條圖 -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-center">每日在校時數</h3>
          </div>
          <div class="card-body">
            <SchoolHoursBarChart v-if="chartData.bar" :data="chartData.bar" />
          </div>
        </div>
      </div>
    </section>

    <!-- Loading 狀態 -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">載入資料中...</p>
      </div>
    </div>

    <!-- 錯誤狀態 -->
    <div v-if="error" class="container py-8">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-red-800 mb-2">載入失敗</h3>
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="initializeApp"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          重新載入
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import StatCard from "./components/StatCard.vue";
import AttendancePieChart from "./components/AttendancePieChart.vue";
import DailyHoursLineChart from "./components/DailyHoursLineChart.vue";
import SchoolHoursBarChart from "./components/SchoolHoursBarChart.vue";
import { useAttendanceData } from "./composables/useAttendanceData.js";

export default {
  name: "App",
  components: {
    StatCard,
    AttendancePieChart,
    DailyHoursLineChart,
    SchoolHoursBarChart,
  },
  setup() {
    const { attendanceData, loading, error, loadData, calculateStats } =
      useAttendanceData();

    const stats = ref({
      classHours: 187.0,
      attendedHours: 174.0,
      absentHours: 15.0,
      lateHours: 0.0,
      leaveEarlyHours: 4.0,
      attendanceRate: 93.0,
    });

    const chartData = ref({
      pie: null,
      line: null,
      bar: null,
    });

    // 處理圖表資料
    const processChartData = () => {
      if (!attendanceData.value) return;

      const records = attendanceData.value.find(
        (item) => item.type === "table" && item.name === "attendance_log"
      )?.data;

      if (!records) return;

      // 計算總課程時數
      const totalClassHours = records.reduce(
        (sum, record) => sum + parseFloat(record.class_hours),
        0
      );
      const attendedHours = totalClassHours;
      const absentHours = Math.max(0, 187 - attendedHours);

      // 圓餅圖資料
      chartData.value.pie = {
        labels: ["實際上課時數", "缺席時數"],
        datasets: [
          {
            data: [attendedHours, absentHours],
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)", // blue-500
              "rgba(239, 68, 68, 0.8)", // red-500
            ],
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      };

      // 折線圖資料
      chartData.value.line = {
        labels: records.map((item) => item.class_date),
        datasets: [
          {
            label: "每日上課時數",
            data: records.map((item) => parseFloat(item.class_hours)),
            borderColor: "rgba(16, 185, 129, 1)", // green-500
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "rgba(16, 185, 129, 1)",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      };

      // 長條圖資料
      chartData.value.bar = {
        labels: records.map((item) => item.class_date),
        datasets: [
          {
            label: "每日在校時數",
            data: records.map((item) => parseFloat(item.raw_hours)),
            backgroundColor: "rgba(245, 158, 11, 0.8)", // amber-500
            borderColor: "rgba(245, 158, 11, 1)",
            borderWidth: 2,
            borderRadius: 4,
          },
        ],
      };

      // 更新統計資料
      const calculatedStats = calculateStats();
      if (calculatedStats) {
        stats.value = calculatedStats;
      }
    };

    // 初始化應用
    const initializeApp = async () => {
      await loadData();
      // 不要在這裡直接呼叫 processChartData
      // 讓 watcher 自動處理
    };

    // 監聽 attendanceData 變化，自動處理圖表資料
    watch(attendanceData, () => {
      processChartData();
    });

    onMounted(() => {
      initializeApp();
    });

    return {
      stats,
      chartData,
      loading,
      error,
      initializeApp,
    };
  },
};
</script>
