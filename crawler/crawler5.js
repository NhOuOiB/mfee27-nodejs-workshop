// TODO: 首先 引入會用到的套件;
// 利用 mysql2 這個套件來存取資料庫

// 帳號密碼不可以寫死在程式碼中、更不可以推上 github
// 利用 dotenv 來處理
// 1. 建立一個 .env 檔案，裡面寫好環境設定
// 2. 利用 dotenv 讀進程式裡來（以下這行）

// 開始抓資料

// 1. 到底有沒有讀到這個變數
// 2. 到底讀到什麼？
// 怎麼檢查？ -> console.log 出來看看就知道啦～
// TODO: 先設定連線
// 1.host
// 2.port 為了保險還是會設port
// 3.user
// 4.password
// 5.database

// TODO: 讀取stockNo.txt檔裡的股票代碼

// TODO: 用axios去抓股票的中文名稱下來
// https://www.twse.com.tw/zh/api/codeQuery?query=2330

// 看要抓什麼樣的資料內容下來
// 判斷如果代碼不存在的話丟錯誤出來
// TODO: 將資料處理後變成想要的樣式

// TODO: 把處理好的資料存進資料庫裡
// INSERT INTO stocks (id, name) VALUES (?, ?) ,[stockNo, stockName]
// 自己串 sql 字串: 容易出錯、有資訊安全上的風險 sql injection
// 建議用 connection.execute 的方式

// TODO: 下面抓股票的整筆資料進資料庫
// 存進資料庫前，跟股票名稱一樣，要先觀察抓到的資料是長什麼樣子、符不符合我們的規範（例如可以存得進 mysql)
// TODO: 處理日期: 民國年轉西元年

// TODO: connection.promise().query('INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [data]);
// 最後記得關閉連線