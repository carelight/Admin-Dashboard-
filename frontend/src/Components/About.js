import React, { useEffect, useState} from 'react';
const About = () => {
 
  const [activeTab, setActiveTab] = useState('about');
    const [userdata, setuserdata] = useState({name:"",work:"",phone:"",email:"",_id:""});
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const  callAbout = async()=>{
           try {
             const res= await fetch('/abou',{
                    method :"GET",
                    headers :{
                       Accept :"application/json",
                       "Content-Type":"application/json"
                    },
                    credentials:"include"
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
            callAbout();
        }, [])
        


  return (
    <div style={styles.aboutBox}>
      <div style={styles.header}>
        <img  src="logo512.png" alt="User"  style={styles.userImage} width="50" />
        <div style={styles.userInfo}>
          <h2>{userdata.name}</h2>
          <p>{userdata.work}</p>
        </div>
      </div>

      <div style={styles.tabs}>
        <div
          style={{ ...styles.tab, backgroundColor: activeTab === 'about' ? '#3498db' : '' }}
          onClick={() => handleTabClick('about')}
        >
          About

        </div>
        <div
          style={{ ...styles.tab, backgroundColor: activeTab === 'timeline' ? '#3498db' : '' }}
          onClick={() => handleTabClick('timeline')}
        >
          Timeline
        </div>
      </div>

      <div id="about-content" style={{ ...styles.tabContent, display: activeTab === 'about' ? 'block' : 'none' }}>
         <form style={styles.form} method="GET" >

         <label  style={styles.lab}>
            User ID:
           <p>{userdata._id}</p>
          </label>
          <br/>
          <label  style={styles.lab}>
            Email:
           <p>{userdata.email}</p>
          </label>
          <br />
          <label style={styles.lab}>
            PHONE:
            <p>{userdata.phone}</p>
          </label>
          <br />
          
        </form>
      </div>

      <div id="timeline-content" style={{ ...styles.tabContent, display: activeTab === 'timeline' ? 'block' : 'none' }}>
        <p>This is the timeline section. You can share your professional journey or achievements here.</p>
      </div>
    </div>
  );
};

const styles = {
  aboutBox: {
    position: 'relative',
    width: '70%',
    margin: '50px auto',
    backgroundColor: 'white',
    color:'black',
    padding: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    transform: 'translateZ(30px)',
    transition: 'transform 0.5s',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  userImage: {
    borderRadius: '50%',
    marginRight: '15px',
  },
  userInfo: {
    color: '#3498db',
  },
  tabs: {
    display: 'flex',
    cursor: 'pointer',
  },
  tab: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px 5px 0 0',
    color: 'black',
  },
  tabContent: {
    padding: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '0 0 5px 5px',
  },

 lab :{
  color:'black',
 },
};

export default About;
