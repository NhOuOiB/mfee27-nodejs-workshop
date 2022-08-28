const express = require('express');
const router = express.Router();

router.post('/auth/register', async (req, res, next) => {
  console.log('register', req.body);

  res.json({});
});

module.exports = router;
