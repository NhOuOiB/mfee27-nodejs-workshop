const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT || 3002;

const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');
const { query } = require('express');
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_user,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    dateStrings: true,
  })
  .promise();

app.get('/ssr', (req, res, next) => {
  // views/index.pug
  res.render('index', {
    stocks: ['台積電', '長榮航', '聯發科'],
  });
});

app.get('/api/stocks', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});
<<<<<<< HEAD
=======

app.get('/api/stocks/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId;
  // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [stockId]);
  // res.send(data);

  let page = req.query.page || 1;
  const perPage = 5;
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [stockId]);
  total = total[0].total;
  let lastPage = Math.ceil(total / perPage);
  const offset = perPage * (page - 1);
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?', [stockId, perPage, offset]);

  res.json({
    pagination: {
      total,
      perPage,
      page,
      lastPage,
    },
    data,
  });
});
>>>>>>> 3722772 ([feat]pagination)

app.get('/', (req, res, next) => {
  res.send('normal');
});

app.use((req, res, next) => {
  res.status(404).send('not found');
});

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
