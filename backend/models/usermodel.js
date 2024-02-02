const mongoose = require(`mongoose`);
const jwt =require('jsonwebtoken');
const userSchema = new mongoose.Schema({
   name : String,
   email: String,
   phone : Number,
   work : String,
   password : String,
   date:{
        type :Date,
        default:Date.now
   },
   messsages :[
      {
         name : String,
         email: String,
         message :String    
      }
   ],
   tokens:[
      {
           token :String                                  //value of thokende will be here
      }
   ]
   
});


userSchema.methods.generateAuthToken = async function(){                               //token generation for secure access of data

   try {
       const Secret_key ='SASNDKJAHDIHUWDIUAHDIZADHAIDYSZLKJZKSDZDJAWIODIAODAWDOADAKHKSHDKADHAKD';
       let tokende = jwt.sign({_id:this._id},Secret_key);
       this.tokens = this.tokens.concat({token:tokende});                                     //adding token to user schema
      await this.save();
      return tokende;
   } catch (err) {
      console.log(err);
      
   }
}

userSchema.methods.addMessage = async function(name,email ,message){
     try {
             this.messsages = this.messsages.concat({name,email ,message});
             await this.save();
             return this.messages;
     } catch (error) {
        console.log(error)
     }
}

const User = mongoose.model('USER',userSchema);

module.exports = User;


