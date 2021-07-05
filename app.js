const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
const port = process.env.PORT || 3000;

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


// //Todo Model
// let Todo = require('./models/todo');

//Routing
let todo = require('./routes/todo');

app.use('/todo', todo);

//Starting Server
app.listen(port, ()=>{
  console.log('Listening on port: ',port);
})
