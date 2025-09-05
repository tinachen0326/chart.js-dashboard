# 個人出缺勤儀表板 (Personal Attendance Dashboard)

一個基於 Vue 3 的響應式出缺勤資料視覺化儀表板，展示現代前端開發技術與資料處理能力。

## 專案簡介

專注於展示前端資料視覺化、UI/UX 設計與狀態管理能力。透過直觀的圖表與表格，讓使用者能清楚掌握個人出勤狀況與統計趨勢。

## 核心價值

資料視覺化：將複雜的出勤資料轉化為直觀的圖表
用戶體驗：簡潔明瞭的介面設計，支援響應式佈局
技術展示：整合現代前端技術棧的完整應用

## 功能特色

### 資料視覺化

- 折線圖：展示每日出勤趨勢變化
- 圓餅圖：呈現月度各類出勤狀態比例
- 資料表格：詳細的每日出勤記錄列表

### 互動功能

- 月份切換：動態載入不同月份的出勤資料
- 圖表更新：即時響應資料變化，平滑轉換
- 響應式設計：完美適配桌面與行動裝置

### 資料管理

- 本地存儲：使用 localStorage 實現資料持久化
- 模擬資料：內建豐富的測試資料集
- 資料處理：智能的出勤狀態數值轉換

### 技術架構

- 前端框架：Vue 3 (Composition API)
- CSS 框架：Tailwind CSS
- 圖表庫：Chart.js
- 建置工具：Vite
- 版本控制：Git

## 專案結構

```
attendance-dashboard/
├── public/                   # 靜態資源
│   └── favicon.ico
├── src/
│   ├── components/           # Vue 組件
│   │   ├── AttendanceTable.vue       # 出勤記錄表格
│   │   ├── AttendanceLineChart.vue   # 趨勢折線圖
│   │   └── AttendancePieChart.vue    # 比例圓餅圖
│   ├── utils/               # 工具函式
│   │   └── attendanceHelper.js      # 資料處理邏輯
│   ├── App.vue             # 主應用組件
│   └── main.js             # 應用入口
├── index.html              # HTML 模板
├── package.json            # 專案配置
├── tailwind.config.js      # Tailwind 配置
├── vite.config.js          # Vite 配置
└── README.md              # 專案說明
```

## 安裝與啟動

```
# 1. Clone專案
git clone https://github.com/yourusername/attendance-dashboard.git
cd attendance-dashboard

# 2. 安裝依賴
npm install

# 3. 啟動開發服務器
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
   挑戰：將文字狀態（出勤、遲到、請假、缺席）轉換為圖表可用的數值
   解決方案：

```
const statusMapping = {
  '出勤': 1,
  '遲到': 0.7,
  '請假': 0.3,
  '缺席': 0
}
```

2. 圖表動態更新
   挑戰：切換月份時圖表需要平滑更新，避免記憶體洩漏
   解決方案：
   使用 Vue 的 watch 監聽資料變化
   妥善處理 Chart.js 實例的銷毀與重建
   實現資料的漸進式載入

3. 響應式資料處理
   特色：
   運用 Vue 3 Composition API 進行狀態管理
   實現資料的響應式更新
   優化渲染效能

### 未來優化

第一階段 (v2.0)

- CRUD 功能：新增、編輯、刪除出勤記錄
- 資料匯出：支援 Excel、PDF 格式匯出
- 主題切換：日間/夜間模式

第二階段 (v3.0)

- 後端整合：串接 RESTful API
- 使用者認證：登入/登出功能
- 多人管理：支援團隊出勤統計

第三階段 (v4.0)

- 即時通知：出勤提醒與異常警告
- 進階分析：預測分析與建議
- 行動應用：React Native 版本

## 版權聲明

此專案僅供個人學習參考使用，無授權用途。
