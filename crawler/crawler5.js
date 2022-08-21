// 用 axios 去目標 API 抓資料
// await 版本
// 更好的參數設定
// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
// 查到股票代碼的中文名稱
// 存到 db
const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');
const mysql = require('mysql2');
// 開始抓資料
// 2330 台積電
// 2603 長榮
// axios.get(url, 設定)
(async () => {
  // let, const:  block scope {}
  // var: function scope
  let connection;
  try {
    connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'admin',
      password: '12345',
      database: 'stock_mfee27',
    });

    // 需要從 stock.txt 的檔案裡讀取股票代碼
    let stockNo = await fs.readFile('stockNo.txt', 'utf-8'); // 2603

    // 去查詢股票代碼的中文名稱
    // https://www.twse.com.tw/zh/api/codeQuery?query=2330
    let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
      params: {
        query: stockNo,
      },
    });
    // console.log(queryNameResponse.data);
    let suggestions = queryNameResponse.data.suggestions;
    let suggestion = suggestions[0];
    if (suggestion === '(無符合之代碼或名稱)') {
      console.error(suggestion);
      throw new Error(suggestion);
    }
    let stockName = suggestion.split('\t').pop();
    console.log('stockName', stockName);
    // INSERT INTO stocks (id, name) VALUES ('2330', '台積電')
    // 自己串 sql 字串: 容易出錯、有資訊安全上的風險 sql injection
    // connection.query
    let saveNameResult = connection.execute(`INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`, [stockNo, stockName]);
    console.log(saveNameResult);
    let queryDate = moment().format('YYYYMMDD'); //'20220814';
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    // console.log(response.data);
    // batch insert / bulk insert 這個效能通常會比一筆一筆 insert 好一點
    // 存進資料庫前，跟股票名稱一樣，要先觀察抓到的資料是長什麼樣子、符不符合我們的規範（例如可以存得進 mysql)
    let data = response.data.data.map((d) => {
      // 對每個欄位的資料都去移除 ,
      d = d.map((value) => {
        // regular expression 的方式
        return value.replace(/,/g, '');
        // value.split(',').join("")
      });
      // 處理日期: 民國年轉西元年
      // split => [0] + 1911 => join
      d[0] = parseInt(d[0].replace(/\//g, ''), 10) + 19110000;
      // 111/08/12 -> 1110812
      d.unshift(stockNo);
      // console.log(d);
      return d;
    });

    // console.log('data', data);
    // bulk insert: 一次 insert 多筆資料，降低傳輸時間、增加效率
    let savePriceResult = await connection
      .promise()
      .query('INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [data]);
    console.log(savePriceResult);
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      // 關掉連線
      connection.end();
    }
  }
})();

// TODO: 首先 引入會用到的套件;
const axios = require('axios');
const moment = require('moment');
const mysql = require('mysql2');
const fsPromsie = require('fs/promises');
// 利用 mysql2 這個套件來存取資料庫

// 帳號密碼不可以寫死在程式碼中、更不可以推上 github
// 利用 dotenv 來處理
// 1. 建立一個 .env 檔案，裡面寫好環境設定
// 2. 利用 dotenv 讀進程式裡來（以下這行）
// require('dotenv').config();
// 開始抓資料
// 1. 到底有沒有讀到這個變數
// 2. 到底讀到什麼？
// 怎麼檢查？ -> console.log 出來看看就知道啦～
// TODO: 先設定連線 mysql.createConnection()
// 1.host
// 2.port 為了保險還是會設port
// 3.user
// 4.password
// 5.database

// TODO: 讀取stockNo.txt檔裡的股票代碼
// TODO: 用axios去抓股票的中文名稱下來
// https://www.twse.com.tw/zh/api/codeQuery?query=2330
(async () => {
  try {
    // const connection = mysql.createConnection({
    //   host: process.env.DB_HOST,
    //   port: process.env.DB_PORT,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    // });
    // console.log(connection.config);
    const stockNo = await fsPromsie.readFile('./stockNo.txt', 'utf-8');
    console.log(stockNo);
    const stockData = await axios('https://www.twse.com.tw/zh/api/codeQuery?', {
      params: {
        query: stockNo,
      },
    });
    let suggestions = stockData.data.suggestions;
    let suggestion = suggestions[0];
    console.log(suggestion);
    if (suggestion === '(無符合之代碼或名稱)') {
      console.error(suggestion);
      throw new Error(suggestion);
    }
    let stockName = suggestion.replace(`${stockNo}\t`, '');
    console.log(stockName);
  } catch (err) {
    console.error(err);
  }
})();

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
