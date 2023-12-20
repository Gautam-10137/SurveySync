import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import Logout from './auth/Logout';
const Home = ({isLoggedIn}) => {
  useEffect(()=>{
    const returnUrl = window.location.pathname; 
    localStorage.setItem('returnUrl', returnUrl);
  },[]);
  return (
    <div>
      <h2>Welcome to Polling App.</h2>
      <p>Explore and participate in polls created by the community.</p>
      <button>
        <Link to="/create-poll">Create a New Poll</Link>
      </button>
      <div>
        <Link to="/dashboard">Go to Dashboard.</Link>
      </div>
      {/* {isLoggedIn? */}
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Logout/>
      </div>

      {/* :<h4>Logged In!</h4>} */}
    </div>
  );
};

export default Home;
