require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/db');
const authRouter = require('./src/routes/auth.routes');
const foodRouter = require('./src/routes/food.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();




app.use('/api/v1/auth', authRouter);
app.use('/api/v1/food', foodRouter);

module.exports = app;
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});