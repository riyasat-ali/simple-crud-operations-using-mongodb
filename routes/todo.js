const express = require('express');
const router = express.Router();

//Todo Model
let Todo = require('../models/todo');

//Listing all Todos
router.get('/listTodos', (req,res) => {
  console.log('Get : ');
  Todo.find((err, todo) =>{
    if(err){
      res.status(404).send({err: err});
    } else{
      res.status(200).send({ data: todo});
    }
  })
});

//Adding a Todo
router.post('/addTodo', (req, res) => {
  console.log('Post : ',req.body);
  let todo = new Todo();
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.save( (err) => {
    if(err){
      console.log(err);
      res.status(404).send({err: err});
    } else{
      res.status(200).send({ Message: 'todo added' } );
    }
  });
});

//Updating a Todo
router.put('/:id', (req, res) => {
  console.log('updateTodo : ', req.params.id);
  let todo = {};
  todo.title = req.body.title;
  todo.description = req.body.description;
  let query = { _id: req.params.id };
  Todo.update(query, todo, (err) => {
    if(err){
      console.log(err);
      res.status(404).send({err: err});
    } else{
      res.status(200).send({ Message: 'todo Updated' } );
    }
  });
});

//Deleting a Todo
router.delete('/:id', (req, res) =>{
  console.log('deleteTodo : ', req.params.id);
  let query = {_id: req.params.id};
  Todo.findById(req.params.id, (err, todo) =>{
    Todo.deleteOne(query, (err) =>{
      if(err){
        console.log(err);
        res.status(404).send({err: err});
      } else{
        res.status(200).send({ Message: 'Todo Deleted' });
      }
    });
  });
});

module.exports = router;
