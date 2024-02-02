
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import {  Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Logout from './Components/Logout';
import { createContext, useReducer } from 'react';
import { initialState,reducer } from './reducer/UseReducer'; 
export const UserContext  = createContext();
 

const  App = ()=> {
  const [state, dispatch] = useReducer(reducer,initialState)
  
  return (
    
    <>
    <UserContext.Provider value ={{state,dispatch}}>
       <Navbar/>
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
       
        <Route
            path="/login"
            element={<Login />}
          />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/logout" element={<Logout/>} /> 
      
      </Routes>
    
      </UserContext.Provider>
    </>
  );
}

export default App;
