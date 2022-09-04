const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.SERVER_PORT || 3002;

const cors = require('cors');
app.use(cors());

app.use(express.json());

// const mysql = require('mysql2');
// const { query } = require('express');
// let pool = require('./utils/db');

const expressSession = require('express-session');
var FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(path.join(__dirname, 'public')));

let stockRouter = require('./routers/stocks');
app.use('/api/stocks', stockRouter);

let authRouter = require('./routers/auth');
app.use(authRouter);

app.get('/', (req, res, next) => {
  res.send('normal');
});

app.use((req, res, next) => {
  res.status(404).send('not found');
});

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
