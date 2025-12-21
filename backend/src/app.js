require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth.routes');
const foodRouter = require('./routes/food.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/food', foodRouter);

module.exports = app;