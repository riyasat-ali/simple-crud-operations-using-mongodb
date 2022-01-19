const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  createdAt:{
    type: String,
  },
});

usersSchema.pre("save", async function(next) {
  if (this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

const Users = new mongoose.model('Users', usersSchema);

module.exports = Users;
