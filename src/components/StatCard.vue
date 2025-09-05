<template>
  <div class="card">
    <div class="card-header">
      <h3 class="text-sm font-semibold text-gray-700 text-center">
        {{ title }}
      </h3>
    </div>
    <div class="card-body">
      <p class="text-3xl font-bold text-blue-600 text-center">
        {{ displayValue }}{{ suffix }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useNumberAnimation } from "../composables/useNumberAnimation.js";

export default {
  name: "StatCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    suffix: {
      type: String,
      default: "",
    },
    animate: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  setup(props) {
    const displayValue = ref(props.animate ? 0 : props.value);
    const { animateNumber } = useNumberAnimation();

    const startAnimation = () => {
      if (props.animate) {
        animateNumber(displayValue, props.value, props.duration);
      } else {
        displayValue.value = props.value;
      }
    };

    onMounted(() => {
      // 延遲動畫以創造更好的視覺效果
      setTimeout(startAnimation, Math.random() * 300);
    });

    // 監聽 value 變化
    watch(
      () => props.value,
      (newValue) => {
        if (props.animate) {
          animateNumber(displayValue, newValue, props.duration);
        } else {
          displayValue.value = newValue;
        }
      }
    );

    return {
      displayValue,
    };
  },
};
</script>
