import { ref } from 'vue'
import axios from 'axios'

export function useAttendanceData() {
  const attendanceData = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('/attendance_log.json')
      attendanceData.value = response.data
      console.log('資料載入成功:', response.data)
    } catch (err) {
      error.value = `載入資料失敗: ${err.message}`
      console.error('載入資料錯誤:', err)
    } finally {
      loading.value = false
    }
  }

  // 計算統計資料
  const calculateStats = () => {
    if (!attendanceData.value) return null

    const records = attendanceData.value.find(
      (item) => item.type === 'table' && item.name === 'attendance_log',
    )?.data

    if (!records) return null

    const totalClassHours = records.reduce((sum, record) => sum + parseFloat(record.class_hours), 0)
    const totalRawHours = records.reduce((sum, record) => sum + parseFloat(record.raw_hours), 0)

    // 這裡可以根據你的業務邏輯調整計算方式
    const attendedHours = totalClassHours
    const absentHours = Math.max(0, 187 - attendedHours) // 假設總課程時數為 187
    const lateHours = 0 // 根據實際需求計算
    const leaveEarlyHours = Math.max(0, totalRawHours - attendedHours)
    const attendanceRate = Math.round((attendedHours / 187) * 100)

    return {
      classHours: 187.0,
      attendedHours: Math.round(attendedHours * 10) / 10,
      absentHours: Math.round(absentHours * 10) / 10,
      lateHours: Math.round(lateHours * 10) / 10,
      leaveEarlyHours: Math.round(leaveEarlyHours * 10) / 10,
      attendanceRate: attendanceRate,
    }
  }

  return {
    attendanceData,
    loading,
    error,
    loadData,
    calculateStats,
  }
}
