import React, { useEffect, useState} from 'react'
import './Contact.css';
const Contact = () => {
  const [userdata, setuserdata] = useState({name:"",work:"",phone:"",email:"",_id:"",message:""});
 
  const callCont = async()=>{                                    // fill name and email automatically sameas about section
           try {
             const res= await fetch('/getdata',{
                    method :"GET",
                    headers :{
                       "Content-Type":"application/json"
                    },
             });
             const data = await res.json();
             console.log(data);
             setuserdata(data);
             if(!res.status === 200){
              const error  = new Error (res.error);
              throw error;
             }
           } catch (error) {
               console.log(error);
           }
  }
  
        useEffect(() => {
           callCont();
        },[] )


    const handleInp =(e)=>{
      const name = e.target.name;
      const value=e.target.value;
      setuserdata({...userdata,[name]:value});
    }   
    
    const ContactMe = async (e)=>{                                     //mail to admin
      e.preventDefault();
      const {name,email ,message} =userdata;
     const res = await fetch('/contact',{
       method:"POST",
       headers:{
           "Content-Type":"application/json"
       },
       body :JSON.stringify({
           name,email ,message
       })
     });

     const data =await res.json();
     if(!data){
      console.log("message not send");
     }
     else{
      alert("message sent");
      setuserdata({...userdata,message:''});
     }

    }
        
  return (
  <>
    <div class="contact-info">
    <div class="container">
      <div className="row">
        <div className="col-md-4">
          <div class="contact-box-item phone-box">
            <i class="fas fa-phone"></i>
            <p>Contact Us: +123 456 7890</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="contact-box-item email-box">
            <i class="fas fa-envelope"></i>
            <p>Email: info@gamingcompany.com</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="contact-box-item address-box">
            <i class="fas fa-map-marker-alt"></i>
            <p>Address: 123 Gaming Street, Cityville</p>
          </div>
        </div>
      </div>
    </div>
  </div>


   <div className="boy">
          <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            Contact Us
          </div>
          <div className="card-body">
            <form method="POST">
              <div className="form-group">
                <label for="inputName">Your Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter your name"  value={userdata.name} 
                onChange={handleInp}  name="name"
                required/>
              </div>
              <div className="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter your email" value={userdata.email}
                onChange={handleInp}    name="email"
                required/>
              </div>
              <div className="form-group">
                <label for="inputMessage">Message</label>
                <textarea className="form-control" id="inputMessage" rows="4" placeholder="Enter your message" required value={userdata.message}
                onChange={handleInp} name="message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-submit btn-block" onClick={ContactMe}>Submit</button>
            </form>
            <div className="form-footer">
              <p>
                For urgent inquiries, contact us at <strong>upretianshul9898@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

   </div>
   </>  
  )
}

export default Contact