import React ,{useState} from 'react'

import { NavLink ,useNavigate} from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const[user,setUser]=useState({name:"",email:"",phone:"",work:"",password:""});
  let name , value;
  const handleInputs =(e)=>{
   
   name=e.target.name;
   value =e.target.value;
   setUser({...user,[name]:value});
  }

 const PostData = async (e)=>{
    e.preventDefault();
    const {name,email,phone,work,password}=user;
   const res =  await fetch("/registe",{
    method :"POST",
    headers : {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({
      
      name,email,phone,work,password
    
    })
   });
   if(res.status!==201){
    window.alert("Credintial missing");
   }
   else{
    const data = await res.json();
    if(data.status===422 ||!data){
            window.alert("invalid Regsiteration");          
    }
    else{
     console.log("Registerd");
     window.alert("regsiterd");
     navigate("/login");
    }
   }
   
 }

  return (
    <div>
    <section className="vh-100" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" >
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"><h1>Sign up</h1></p>

                <form method="POST" className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name="name"
                          value={user.name}
                          onChange={handleInputs}
                      />
                      <label className="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control"  name="email" required
                          value={user.email}
                          onChange={handleInputs}
                      />
                      <label className="form-label" for="form3Example2c">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="number" id="form3Example2c" className="form-control"  name="phone" required
                          value={user.phone}
                          onChange={handleInputs}
                      />
                      <label className="form-label" for="form3Example5c">Your Phone</label>
                    </div>
                  </div> 
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example5c" className="form-control" name="work"
                          value={user.work}
                          onChange={handleInputs}
                      />
                      <label className="form-label" for="form3Example6c">Work</label>
                    </div>
                  </div> 
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example6c" className="form-control" name="password" required
                          value={user.password}
                          onChange={handleInputs}
                      />
                      <label className="form-label" for="form3Example6c">Password</label>
                    </div>
                  </div>

                 

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={PostData}>Register</button>
                  </div>

                </form>
                <div> <NavLink to="/login" >Alerady registerd</NavLink></div>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sampe"/>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Register
