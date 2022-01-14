require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
const port = process.env.PORT || 3000;
const bcrypt = require("bcryptjs");

//Connecting to db
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to db');
})

db.on('error', (err) => {
  console.log(err);
})

//Express initialisation
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));



//Routing
const todo = require('./routes/todo');
const user = require('./routes/user')


app.use('/todo', todo);
app.use('/user', user);


//Starting Server
app.listen(port, ()=>{
  console.log('Listening on port: ',port);
})
