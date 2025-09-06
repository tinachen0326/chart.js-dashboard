<template>
  <div
    class="rounded-2xl shadow-md p-6 flex items-center gap-4 transition-transform hover:scale-105 bg-white"
  >
    <div :class="['rounded-full p-3', iconBgColor]">
      <component :is="iconComponent" class="w-7 h-7 text-white" />
    </div>
    <div>
      <div class="text-gray-500 text-sm">{{ title }}</div>
      <div class="text-2xl font-bold text-gray-800">
        {{ value
        }}<span v-if="suffix" class="text-base font-normal">{{ suffix }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowRightCircleIcon,
  ChartBarIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  title: String,
  value: [String, Number],
  color: String,
  icon: String,
  suffix: String,
});

const iconMap = {
  "book-open": BookOpenIcon,
  "check-circle": CheckCircleIcon,
  "x-circle": XCircleIcon,
  clock: ClockIcon,
  "arrow-right-circle": ArrowRightCircleIcon,
  percent: ChartBarIcon, // 用 ChartBarIcon 取代 PercentIcon
};
const iconComponent = computed(() => iconMap[props.icon] || BookOpenIcon);

const iconBgMap = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  teal: "bg-teal-500",
};
const iconBgColor = computed(() => iconBgMap[props.color] || "bg-gray-400");
</script>
