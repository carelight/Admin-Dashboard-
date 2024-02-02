import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import  { UserContext} from "../App";
const Logout = () => {
    const {state ,dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    useEffect(() => {
            fetch('/logou',{
                method:"GET",
                headers :{
                    Accept :"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            }).then((res)=>{
                dispatch({type:"USER",payload:false})
                if(!res.staus === 200){
                    const error =new Error(res.error);
                    throw error;
                }
                else{
                    window.alert("logged out");
                    navigate("/login");
                }     
            }).catch((err)=>{
                console.log(err);
            })
    });
    
  return (
    <div>wait a sec...</div>
  )
}

export default Logout