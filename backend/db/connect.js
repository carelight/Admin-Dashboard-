const mongoose = require('mongoose');

const DB ="mongodb+srv://Anshul:Atlas9898@cluster0.7fgzc9c.mongodb.net/?retryWrites=true&w=majority";
 mongoose.connect(DB);

 mongoose.connect(DB,{
    useNewUrlParser:true,  
       useUnifiedTopology:true,  
   }).then(()=>{
           console.log("connection done");
   }).catch((err) => console.log("no connection"));
   