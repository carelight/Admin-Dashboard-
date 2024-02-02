import React, { useContext, useState } from 'react'
import { NavLink ,useNavigate } from 'react-router-dom'
import './Register.css';
import  { UserContext} from "../App";
const Login = () => {
     const {state ,dispatch} = useContext(UserContext);
    const [email,setEmail]=useState();
    const [password,setPassword]= useState();
    const navigate = useNavigate();
  
   

    const logIn = async(e)=>{
        e.preventDefault();
       const res =await  fetch('/logi',{
        method :"POST",
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
           
         email,
         password       
        }) 
       });
           
       if(res.status!==200){
        window.alert("login failed");
       }
       else{
        const data = await res.json();
        if(data.status===400 ||!data){
          window.alert("invalid credintial");          
       }
  
       
       else{
        dispatch({type:"USER",payload:true})
        window.alert("Login sucess");
        navigate("/");
          
       }
       }
     
      
    }
  return (
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h1>Login</h1>
          </div>
          <div class="card-body">
            <form method="POST">
              <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="Enter your email" name="email" required
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                
                />
              </div>
              <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" placeholder="Enter your password"  name ="password" required
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                 />
              </div>
              <button type="submit" class="btn btn-login btn-block" onClick={logIn}>Login</button>
            </form>
            <p class="text-center mt-3">
              <label>Don't have an account?</label> <NavLink to="/register" class="btn-create-account">Create Account</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default Login
