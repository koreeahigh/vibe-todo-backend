require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('연결성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

app.use(cors());
app.use(express.json());

const todoRouter = require('./routes/todo');
app.use('/todos', todoRouter);

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}번에서 실행중입니다.`);
});
