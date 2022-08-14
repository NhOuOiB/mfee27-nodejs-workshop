// 1. 先安裝在引用 npm i axios
// 2. require(axios)
const axios = require('axios');

// TODO: 改用async
// TODO: 改成樣板語法
// axios.get(url, 設定)
// TODO: params
let queryDate = '20220814';
let stockNo = '2603';
(async () => {
  let response = await axios
    .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?', {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(response.data);
})();
