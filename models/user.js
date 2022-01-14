const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const usersSchema = mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true
  },
  
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true
  },
  createdAt:{
    type: String,
  },
  tokens : [{
    token: {
      type: String,
      required: true,
    }
  }]
});

usersSchema.pre("save", async function(next) {
  if (this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

usersSchema.methods.generateAuthToken = async function(){
  try {
     const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
     this.tokens = this.tokens.concat({token});
     console.log("token", token);
     await this.save();
     return token;
  } catch (error) {
    res.send("the error part" + error);
  }
}

const Users = new mongoose.model('Users', usersSchema);

module.exports = Users;
