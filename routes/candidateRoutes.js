const express= require('express');
const router= express.Router();
const Candidate = require("../models/candidate");
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

const checkAdminRole= async (UserId)=>{
  try{
    const user = await User.findById(userId);
    return user.role==="admin";
  
  }
  catch(err){
    return false;
  }
}



//post  route to add a candidate
router.post("/", async (req, res) => {
  try {
    if(!checkAdminRole(req.user.id)){
      return res.status(404).json({message:"user has not admin role"})
    }
// agar admin hua to age jega ye sb proess hoga.
    const data = req.body; // assuming the request body candidate the candidate data
    const newCandidate = new Candidate(data);

    const response = await newCandidate.save();
    console.log("data sved");
// const payload= {
//   id:response.id
// }
// console.log(JSON.stringify(payload));
// const token = generateToken(payload);
// console.log('token is',token);


    res.status(200).json({response:response});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Interal Server Error" });
  }
});







  // update
router.put('/:candidateID',jwtAuthMiddleware,async (req,res)=>{
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