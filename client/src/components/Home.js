import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
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
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
