const express= require('express');
const router= express.Router();
const User = require("../models/user");
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

router.post("/signup", async (req, res) => {
    try {
      const data = req.body;
      const newUser = new User(data);
  
      const response = await newUser.save(); // save in database
      console.log("data sved");
      const payload={
        id:response.id,
        // username:response.username
      }
      console.log(JSON.stringify(payload));
      // const token= generateToken(response.username);
      const token= generateToken(payload);

      console.log('token is',token);
      res.status(200).json({response:response,token:token});

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Interal Server Error" });
    }
  });

// login routes tki 30 sec me jwt token expire ho rha h to bar bar signup na krna pde 
// user ko token bhejte h login me .
router.post('/login',async(req,res)=>{
  try{
    const {adharcardnumber,password}= req.body;
    // find user by uername
    const user=await User.findOne({adharcardnumber:adharcardnumber});
    // if user does not exist or password does not match , return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid username or password'});
    }
//generate token
const payload={
  id: user.id,
//   username:user.username

}
const token= generateToken(payload);
//return token
res.json({token});

  }
  catch(err){
console.err(err);
res.status(500).json({error:'internal server error'})
  }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
  try{
    const userData= req.user;
    // console.log('user data',userData);
    const userId=userData.id;
    const user = await User.findById(userId);
res.status(200).json(user);
  }
  catch(err){
console.err(err);
res.status(500).json({error:'Internl Server error'});
  }
})







  // update
router.put('/profile/password',jwtAuthMiddleware,async (req,res)=>{
try{
const UserId=req.user;
const {currentPassword,newPassword}= req.body;

// if password matches

if( !(await user.comparePassword(currentPassword))){
    return res.status(401).json({error:'Invalid username or password'});
  }

//   update the new password
user.password=newPassword;
await user.save();

console.log('password updated');
res.status(200).json({meaasge:"Password Updated Successfuly"})


// find user if present or not
const user=await User.findById(UserId);




console.log('data updated');
res.status(200).json(response);


}
catch(err){
console.log(err);
res.status(500).json({error:'Internal Server Error'})
}

})



  module.exports= router;