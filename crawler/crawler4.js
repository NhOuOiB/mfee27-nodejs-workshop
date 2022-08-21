const axios = require('axios');
const moment = require('moment');
const fsPromises = require('fs/promises');

let queryDate = moment().format('YYYYMMDD');
async function read() {
  try {
    // console.log(await promise);

    let stockNo = await fsPromises.readFile('stockNo.txt', 'utf8');
    let stockNoResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery?', {
      params: {
        query: stockNo,
      },
    });
    let stockSuggestions = stockNoResponse.data.suggestions;
    let stockSuggestion = stockSuggestions[0];
    if (stockSuggestion === '(無符合之代碼或名稱)') {
      throw Error('stockSuggestion');
    }
    let stockName = stockSuggestion.split('\t').pop();
    let response = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?', {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    console.log(response.data);
    console.log(stockName);
    // console.log(stockSuggestion);
    // console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

read();
