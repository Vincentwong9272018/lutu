# Lutu 旅途 — 智能旅遊小助手

全新嘅旅遊規劃 App，資料只存在你部裝置（localStorage），適合直接丟上 [Netlify](https://www.netlify.com/)。

## 功能

- 多個旅程：倒數出發、進行中／回憶分類、封面圖、匯入／匯出
- 行程表：按日時間軸、Google Maps 地點／大眾運輸／全日路線、手信提示
- 行李／手信／出行文件清單（分類、進度）
- 花費記帳 + 預算，自動換算本幣
- 匯率換算（預設本幣 HKD）
- 住宿、機票／車票
- 7 日天氣（Open-Meteo）
- 旅遊須知、緊急電話、當地用語
- AI 一鍵規劃行程／行李／手信／須知／用語，同旅途助手對話
- 可安裝做 PWA，夜航模式

## 本機預覽

用任何靜態伺服器開呢個資料夾即可，例如：

```bash
cd lutu
python3 -m http.server 8787
```

然後用瀏覽器開 http://localhost:8787

本機預覽時，AI 預設會打 Netlify Function（本地冇呢條路徑會失敗）。可以入「設定」改用自訂端點，例如 LM Studio：`http://127.0.0.1:1234/v1/chat/completions`。

## 部署到 Netlify

1. 將整個 `lutu` 資料夾推上 GitHub，或喺 [Netlify Drop](https://app.netlify.com/drop) 直接拖放（Functions 建議用 Git 連線，環境變數先穩陣）。
2. Netlify 設定：
   - **Publish directory：** `.`（專案根目錄）
   - **Functions directory：** `netlify/functions`
3. 到 **Site settings → Environment variables** 加入：

| 變數 | 必填 | 說明 |
| --- | --- | --- |
| `XAI_API_KEY` | 是 | 喺 [console.x.ai](https://console.x.ai/team/default/api-keys) 產生 |
| `XAI_MODEL` | 否 | 預設 `grok-4.7`。Netlify 免費版 Function 只有約 10 秒，若逾時可改 `grok-4.20-0309-non-reasoning` |

4. Redeploy 一次，令環境變數生效。

AI 請求會由 `/.netlify/functions/chat` 代打 `https://api.x.ai/v1/chat/completions`，API key 唔會出現喺瀏覽器。

## 專案結構

```
lutu/
├── index.html
├── css/app.css
├── js/app.js
├── icons/
├── manifest.json
├── sw.js
├── netlify.toml
└── netlify/functions/chat.js
```

資料全部喺瀏覽器本機，重整網站唔會清旅程（除非清網站資料或撳設定入面「清除本機資料」）。
