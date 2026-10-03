Battle Cats Seed Tracker — Android Chrome PWA v2

這版針對 https://410635011.github.io/catRolls/ 固定設定。

主要調整：
1. manifest 的 id / start_url / scope 改成明確的 /catRolls/。
2. icon purpose 改成 any，避免 maskable 判定造成干擾。
3. 加入 prefer_related_applications: false。
4. Service Worker 升級為 v2，並使用明確 /catRolls/ 路徑。
5. Service Worker 快取改為單檔容錯，避免單一圖示失敗讓整個 SW install 失敗。
6. HTML 會提早捕捉 beforeinstallprompt。
7. Chrome 判定 PWA 可安裝時，網頁頂端會自動出現「安裝 App」按鈕。

更新方法：
- 把 ZIP 內容全部覆蓋到 GitHub repo 根目錄。
- 等 GitHub Pages 顯示 deployed。
- Android Chrome 對 410635011.github.io 清除網站資料。
- 完全關閉 Chrome 後重新開啟。
- 開 https://410635011.github.io/catRolls/
- 停留至少約 30 秒並重新整理一次。
- 若 Chrome 判定可安裝，頂端會出現「安裝 App」。

Chrome 新版選單：
更多（三點）→ 安裝並建立捷徑 → 安裝

如果頂端「安裝 App」始終不出現：
Chrome 沒有觸發 beforeinstallprompt，表示瀏覽器仍認為網站不符合安裝條件。
此時可連接手機到桌面 Chrome，用 chrome://inspect 檢查 Console。
