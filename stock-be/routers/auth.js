const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
// 引入雜湊
const argon = require('argon2');

router.post('/auth/register', async (req, res, next) => {
  // console.log('register', req.body);

  // TODO: 先從資料庫撈檢查這個 email 存不存在
  const [email] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  if (email.length === 0) {
    const hashedPassword = await argon.hash(req.body.password);
    const result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?)', [req.body.email, hashedPassword, req.body.name]);
    console.log(result);

    res.json({ message: 'ok' });
  } else {
    return res.status(400).json({ message: '該 email 已被註冊' });
  }
  // TODO: 將密碼雜湊

  // TODO: 將資料存進資料庫
});

module.exports = router;
