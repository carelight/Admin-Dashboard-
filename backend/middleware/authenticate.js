const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const Authenticate =async (req,res,next)=>{
    try{
           const token =req.cookies.jwtoken;
           const Secret_key ='Random Alphabets in Capital can be key';
           const verifyToken =jwt.verify(token,Secret_key);

           const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
           if(!rootUser) {     throw new Error('user not found');   }
           req.token =token;
           req.rootUser = rootUser;
           req.userID = rootUser._id;
           next();

    } catch(err){
        res.status(401).send('Unauthorized user');
    }
}
module.exports=Authenticate;
