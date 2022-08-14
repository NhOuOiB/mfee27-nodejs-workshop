// TODO: 改用date套件 ex:moment.js
// TODO: 從檔案取得股票代碼
const axios = require('axios');
const moment = require('moment');
const fsPromises = require('fs/promises');

async function read() {
  try {
    let promise = fsPromises.readFile('stockNo.txt', 'utf8');
    // console.log(await promise);
    let stockNo = await promise;
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
  } catch (err) {
    console.error(err);
  }
}
read();

let queryDate = moment().format('YYYYMMDD');

// (async () => {
//   let response = await axios
//     .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?', {
//       params: {
//         response: 'json',
//         date: queryDate,
//         stockNo: stockNo,
//       },
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   console.log(response.data);
// })();
