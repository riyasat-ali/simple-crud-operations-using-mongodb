const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

      const registered = await registerUser.save();
      res.status(200).send({ Message: 'user created successfully' });
    } else {
      res.send("Password are not matching!")
    }
  } catch (error){
    res.status(400).send(error);
  }
});

//Login the user
router.post('/login', async (req,res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const useremail = await Register.findOne({ email: email });
    const isMatch = bcrypt.compare(password, useremail.password);

    let accessToken = jwt.sign({ useremail }, process.env.SECRET_KEY, { expiresIn: "5m" });
    if (isMatch) {
      res.status(200).send({ Message: 'user login successfully', accessToken: accessToken });
    } else {
      res.send("invalid password details");
    }
  } catch (error){
    console.log("here", error);
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
