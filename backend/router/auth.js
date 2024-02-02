  const jwt =require('jsonwebtoken');
  const express = require('express');        //express connected
  const router = express.Router(); 
  const authenticate =  require('../middleware/authenticate')

  require('../db/connect');                        //db export and user model
  const User = require ('../models/usermodel');
  
  router.get('/',(req,res)=>{                     //main routed page
     res.send("hello router");
  });
                                                                                   /* register */               
  
  //---------------------------------------------------------------------------------using promises-----------------------------------------------------------------------------------------------------------------------
  
  // router.post('/register',  (req,res)=>{                      // post set up post data gives response on clicking regsiter
  //   const {name,email,phone,work ,password} =req.body;

  //   if(!name || ! email || !phone || !work || !password){                //all should be present for checking try removing   
  //       return res.status(422).json({error:"fill properly"});                        // name in postman 
  //   }
  //        // res.json({message:email });                             //response to post request try sending request in postman 
         
  //         User.findOne({email:email})                               //find if registering user is in db or not 
  //            .then((userExist)=>{
  //                     if(userExist){
  //                       return res.status(422).json({error :"User alerady registerd plz login"});            //alerady registerd
  //                     }
  //               const user = new User({name,email,phone,work,password});        // if not in db then creates new  user
                
  //               user.save().then(()=>{ 
  //                 res.status(201).json({message:"success"});                            // if success
  //               }).catch((err)=>res.status(500).json({error:"failed"}) ); 
  //                  // failed
  //          }).catch(err=>{console.log("error check find one()");});                                                   // failed  in activating find one 
    
   
  // });


  //-------------------------------------------------------------------------------------------------using async await-----------------------------------------------------------------------------------------

  router.post('/registe', async (req,res)=>{                                                    

    const {name,email,phone,work,password}=req.body;                                              

    if(!name ||!email || !phone || !work || !password) {                                      //to tell user in case anything missing
      return res.status(422).json({message:"fill properly"});
    }
 
    try {                                                                                   //try catch block

       const userExist = await User.findOne({email:email});                                 //check if user is present in db or not

       if(userExist){
         return res.status(422).json({message : "User alerady Registerd"});                          
       }
       
       const user =  new User({name,email,phone,work,password});                         // model new user 

       await user.save();                                                            //savenew user 

         return res.status(201).json({message:"regsitration Successfull"});
     
    } catch (err) {
       console.log(err);
    }

  });

//--------------------------------------------------------------------------------------user login verification --------------------------------------------------------------


  router.post('/logi', async (req,res)=>{
     
    const {email,password}= req.body;

    if(!email || !password){
      return req.res.status(400).json({message:"email or password missing"});
    }

    try {
      
      const isUser =  await User.findOne({email:email});                           // heck if data is in db or not

      if(!isUser){                                                                 //no dta in db
        return req.res.status(400).json({error:"User does not exist"});
      }
     else{                                                                         //isUser will have data found in db
     
      console.log({name:email});                                
     
      const token = await isUser.generateAuthToken();                                                     //-------------------------------token generation------------------------------------------------
     console.log(token);

    res.cookie("jwtoken",token,{
      expires:new Date(Date.now()+25892000000),
      httpOnly:true
    });

      if(isUser.password===password)                                          // user found now for validity
           return res.status(200).json({message:"Login Sucessfull"});    
      else
        return res.status(400).json({error:"Wrong passsword"});
      

     } 
    } catch (err) {
      
      console.log(err);
    }  
  });
  const cookieParser = require("cookie-parser");
  router.use(cookieParser())

  router.get('/abou',authenticate,(req,res)=>{
        res.send(req.rootUser);  

  }) 
  router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);  

}) 

router.post('/contact',authenticate,async (req,res)=>{
    try {
      const {name,email ,message} = req.body;
      if( !name || !email || !message){
          console.log("check code");
          return res.json({error:"plz fill form properly"});
      }

      const userContact = await User.findOne({_id:req.userID});
      if(userContact){
        const usermessage = await userContact.addMessage(name,email ,message);
        await userContact.save();
        res.status(201).json({message :"user Contact sucess"});
      }
      
    } catch (error) {
      console.log(error);
    }
})

router.get('/logou',authenticate,(req,res)=>{

   res.clearCookie('jwtoken',{path:'/'});
   res.status(200).send('User Logout');  
}) 

   module.exports = router;