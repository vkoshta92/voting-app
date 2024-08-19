const mongoose = require("mongoose");
// const { type } = require('os');
const bcrypt= require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  adharcardnumber: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    required: true,
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});


userSchema.pre('save',async function(next){
  const person=this;
  //hash the password ony if it has been modified(or is new)
if(!person.isModified('password')) return next(); // no need hash


  try{
// hash password generate
const salt =await bcrypt.genSalt(10);

// hash password
const hashPassword= await bcrypt.hash(person.password,salt);

// override the plin password with the hashed one
User.password= hashPassword;
      next();
  }
  catch(err){
return next(err);
  }
})

userSchema.methods.comparePassword=async function(candidatePassword){
try{
  // use bcrypt provided pass with hash password
  // prince->hghhfhjfhjfjhf
  //login->agarwal
  //  hghhfhjfhjfjhf--> extract salt from prince
  //salt+agarwal->hash->hgjgghjhjfhfhfhfhfhfh  now check is same
  const isMatch= await bcrypt.compare(candidatePassword,this.password);
  return isMatch;
}
catch(err){
  throw err;
}
}





const User = mongoose.model("User", userSchema);
module.exports = User;
