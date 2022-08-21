const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;

const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_user,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
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

app.get('/', (req, res, next) => {
  res.send('normal');
});

app.use((req, res, next) => {
  res.status(404).send('not found');
});

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
