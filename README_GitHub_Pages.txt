Battle Cats Seed Tracker — GitHub Pages PWA 版

【直接部署】
1. 建立一個 GitHub Repository。
2. 將本資料夾內所有檔案放到 Repository 根目錄。
3. GitHub → Settings → Pages。
4. Build and deployment 選 Deploy from a branch。
5. Branch 選 main / root，儲存。
6. 等 GitHub Pages 部署完成後，用 HTTPS 網址開啟。

【PWA 安裝】
Android / Chrome：
- 開啟 GitHub Pages 網址後，可從瀏覽器選單選「安裝應用程式」。

iPhone / iPad：
- Safari 開啟網站 → 分享 → 加入主畫面。

【檔案說明】
index.html              主程式
manifest.json           PWA App 資訊
service-worker.js       PWA 離線快取
favicon.ico             網頁 favicon
icon-192.png            PWA 圖示
icon-512.png            PWA 圖示
apple-touch-icon.png    iPhone / iPad 主畫面圖示

【離線行為】
- 網頁主程式與圖示可由 Service Worker 離線載入。
- GitLab 最新活動資料仍需網路更新。
- 程式本身已有 localStorage 卡池資料快取，因此只要之前成功載入過資料，
  之後離線啟動仍可使用上次快取的卡池資料。
- 第一次開啟若完全沒有網路，則無法取得 GitLab 卡池資料。

【更新 Service Worker】
若未來修改 index.html 後發現手機仍載入舊版，可將 service-worker.js：
  battle-cats-seed-tracker-pwa-v1
改成 v2、v3...，重新部署即可強制建立新快取。
