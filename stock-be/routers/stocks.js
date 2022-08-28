const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

router.get('/api/stocks', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

router.get('/api/stocks/:stockId', async (req, res, next) => {
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

module.exports = router;
