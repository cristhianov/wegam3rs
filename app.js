require("dotenv").config();
const express = require('express');
const app = express();


//Middlewares
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors'); //Sirve para transferir entre el back y el fornt
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

//Database Setup
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



app.use(bodyParser.json({ limit: "30mb", extended: true})); //Limitara la carga de imagenes a 30mb
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true})); //Limitara la carga de imagenes a 30mb
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
      origin: ["http://localhost:3001", "https://wegam3rs.herokuapp.com", "http://localhost:3000", "http://localhost:3002"],
      credentials: true
  })
);
//Routes Setup
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/api/category', require('./routes/category'));
app.use('/api/torneovideogame', require('./routes/torneovideogame'));
app.use('/api/authCM', require('./routes/authCM'));


module.exports = app;

//Last Part
//const CONNECTION_URL = 'mongodb+srv://Cristhian:1234567@cluster0.qlzfm.mongodb.net/<dbname>?retryWrites=true&w=majority'
//const PORT = process.env.PORT || 5000; 
//mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
