
const  express =  require('express');
const index = express();
const http = require('http').Server(index);        

index.use(express.json());
index.use(require('./router/auth'));          //path setup  in router


require('./db/connect');                        //db export and user model
const user = require ('./models/usermodel');
 




index.get('/about', (req,res) =>{          //path for about page
    res.send("About"); 
});
index.get('/contact', (req,res) =>{          //path for about page
    res.send("contact");
});

http.listen(3000,()=>{                        //providing express port at 3000
    console.log(" server runing");
})