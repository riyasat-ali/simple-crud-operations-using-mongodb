const express = require('express');
const router = express.Router();

//User Model
let Register = require('../models/user');

//Create a new user in out database
router.post('/register', async (req,res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const registerUser = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword
      })

      const token = await registerUser.generateAuthToken();

      const registered = await registerUser.save();
      res.status(200).send({ Message: 'user created successfully'});
    } else {
      res.send("Password are not matching!")
    }
  } catch (error){
    res.status(400).send(error);
  }
});

//Create a new user in out database
router.post('/login', async (req,res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const useremail = await Register.findOne({email: email});
    const isMatch = bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();
    console.log("the token part", token);
    if (isMatch) {
      res.status(200).send({ Message: 'user login successfully'});
    } else {
      res.send("invalid password details");
    }
  } catch (error){
    res.status(400).send("invalid login details");
  }
});

//Listing all Users
router.get('/listUsers', async (req,res) => {
  try {
    const users =  await Register.find();
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(404).send({ err: error });
  }
});



module.exports = router;
