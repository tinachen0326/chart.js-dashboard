# 個人出缺勤儀表板 Personal Attendance Dashboard

一個基於 Vue 3 的響應式出缺勤資料視覺化儀表板，展示現代前端開發技術與資料處理能力。

## 專案簡介

本專案是一個以 **Vue 3 + Vite + Tailwind CSS + Chart.js** 打造的現代化出缺勤儀表板，能即時呈現課程出勤統計、每日上課時數、在校時數等資訊。介面簡潔美觀，響應式設計，適合各種裝置瀏覽。

## 網址

[chart-js-dashboard-vue.vercel.app](https://chart-js-dashboard-vue.vercel.app/)

## 核心價值

- **資料視覺化**：統計卡片 + 圓餅圖 + 折線圖 + 長條圖，將出勤數據轉換為清晰直觀的圖表
- **用戶體驗**：簡潔明瞭的介面設計，支援響應式佈局
- **技術展示**：結合 Vue 3 Composition API、Tailwind CSS 與 Chart.js 的完整應用

## 功能特色

### 資料視覺化

- **統計卡片**：顯示總課程時數、實際上課時數、缺席時數、遲到時數、早退時數、出勤比率
- **圓餅圖**：出勤與缺勤比例
- **折線圖**：每日上課時數趨勢
- **長條圖**：每日在校時數分布

### 互動功能

- **即時資料載入**：自動從 `public/attendance_log.json` 讀取出缺勤資料
- **資料更新**：動態渲染，支援平滑過渡
- **響應式設計**：完美適配桌面與行動裝置

### 資料管理

- **JSON 資料來源**：內建 `attendance_log.json` 測試資料
- **資料處理**：使用 composables 分離邏輯與 UI
- **動畫效果**：統計數字支援平滑遞增動畫

## 技術架構

- **前端框架**：Vue 3 (Composition API)
- **CSS 框架**：Tailwind CSS
- **圖表庫**：Chart.js + vue-chartjs
- **建置工具**：Vite
- **版本控制**：Git

## 專案結構

```
chart.js-dashboard-vue/
├── public/
│   └── attendance_log.json      # 出缺勤資料(JSON格式)
├── src/
│   ├── components/              # 儀表板元件
│   │   ├── StatCard.vue
│   │   ├── AttendancePieChart.vue
│   │   ├── DailyHoursLineChart.vue
│   │   └── SchoolHoursBarChart.vue
│   ├── composables/             # 可重用邏輯
│   │   ├── useAttendanceData.js
│   │   └── useNumberAnimation.js
│   ├── App.vue                  # 主頁面
│   ├── main.js                  # 入口
│   └── style.css                # Tailwind 樣式
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 安裝與啟動

```
# 1. Clone 專案
git clone https://github.com/tinachen0326/chart.js-dashboard-vue.git
cd chart.js-dashboard-vue

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 瀏覽應用
# 開啟 http://localhost:5173
```

## 建置部署

```
# 產生生產版本
npm run build

# 預覽建置結果
npm run preview
```

## 核心技術亮點

1. 資料狀態轉換

- JSON 中原始資料轉換為可視化數據
- 使用 useAttendanceData.js 集中處理

2. 圖表動態更新

- Vue watch 監聽資料變化
- Chart.js 實例安全銷毀與重建

3. 統計數字動畫

- 透過 useNumberAnimation.js，數值呈現更具互動感

## 未來優化

### v2.0

- CRUD 功能：新增、編輯、刪除出勤記錄

- 資料匯出：支援 Excel、PDF 格式匯出

- 主題切換：日間/夜間模式

### v3.0

- 後端整合：串接 RESTful API

- 使用者認證：登入/登出功能

- 多人管理：支援團隊出勤統計

### v4.0

- 即時通知：出勤提醒與異常警告

- 進階分析：預測分析與建議

- 行動應用：React Native 版本

## 版權聲明

此專案僅供個人學習參考使用，無授權商業用途。
