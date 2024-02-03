const mongoose = require('mongoose');

const DB ="mongodb+srv://YOUR URL";
 mongoose.connect(DB);

 mongoose.connect(DB,{
    useNewUrlParser:true,  
       useUnifiedTopology:true,  
   }).then(()=>{
           console.log("connection done");
   }).catch((err) => console.log("no connection"));
   
