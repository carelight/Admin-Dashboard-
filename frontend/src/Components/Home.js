import React, { useState, useEffect } from 'react';
import './HomePage.css';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [userdata, setuserdata] = useState({name:""});
  const [show, setshow] = useState();
  
  const callHome = async()=>{                                    // fill name and email automatically sameas about section
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
             setshow(true);
             if(!res.status === 200){
              const error  = new Error (res.error);
              throw error;
             }
           } catch (error) {
               console.log(error);
           }
  }
  
        useEffect(() => {
           callHome();
        },[] )


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <div className={`home-page ${showContent ? 'show' : ''}`}>
      <div className="text-container">

       
        <h1>{show ? <h1>{userdata.name} is now a part  MERN developers</h1>:'Welcome let us get you in'}</h1>
      </div>
      <div className="chakra-container">
        <div className="chakra-circle"></div>
      </div>
    </div>
  );
};

export default Home;
