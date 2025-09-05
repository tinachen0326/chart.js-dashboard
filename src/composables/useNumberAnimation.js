export function useNumberAnimation() {
  const animateNumber = (targetRef, endValue, duration = 1000) => {
    const startValue = targetRef.value
    const startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // 使用 easeOutQuart 緩動函數
      const easeProgress = 1 - Math.pow(1 - progress, 4)

      const currentValue = startValue + (endValue - startValue) * easeProgress
      targetRef.value = Math.round(currentValue * 10) / 10

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        targetRef.value = endValue
      }
    }

    requestAnimationFrame(animate)
  }

  return {
    animateNumber,
  }
}
