const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Todo Model
let Todo = require('../models/todo');

function auth(req, res, next) {
  let token = req.headers["authorization"];
  token = token?.split(" ")[1]; //Access Token

  jwt.verify(token, process.env.SECRET_KEY, (err) => {
     if (!err) {
         next();
     } else {
         return res.status(403).json({ message: "User not authenticated" });
     }
  })
};

//Listing all Todos
router.get('/listTodos', auth, (req,res) => {
  Todo.find((err, todo) =>{
    if(err){
      res.status(404).send({ err: err });
    } else {
      res.status(200).send({ data: todo });
    }
  })
});

//Adding a Todo
router.post('/addTodo', auth, (req, res) => {
  let todo = new Todo();
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.save( (err) => {
    if(err){
      console.log(err);
      res.status(404).send({err: err});
    } else {
      res.status(200).send({ Message: 'todo added' });
    }
  });
});

//Updating a Todo
router.put('/:id', auth, (req, res) => {
  let todo = {};
  todo.title = req.body.title;
  todo.description = req.body.description;
  let query = { _id: req.params.id };
  Todo.update(query, todo, (err) => {
    if(err){
      console.log(err);
      res.status(404).send({err: err});
    } else {
      res.status(200).send({ Message: 'todo Updated' } );
    }
  });
});

//Deleting a Todo
router.delete('/:id', auth, (req, res) =>{
  let query = {_id: req.params.id};
  Todo.findById(req.params.id, (err, todo) =>{
    Todo.deleteOne(query, (err) =>{
      if(err){
        console.log(err);
        res.status(404).send({ err: err });
      } else {
        res.status(200).send({ Message: 'Todo Deleted' });
      }
    });
  });
});

module.exports = router;
