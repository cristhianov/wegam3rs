require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors'); //Sirve para transferir entre el back y el fornt
const morgan = require('morgan');
const bodyParser = require('body-parser');


mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
      origin: ["http://localhost:3002", "https://productback.herokuapp.com/"],
      credentials: true
  })
);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/api/category', require('./routes/category'));
app.use('/api/torneovideogame', require('./routes/torneovideogame'));

module.exports = app;
