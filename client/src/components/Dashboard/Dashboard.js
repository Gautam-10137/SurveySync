import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
const Dashboard = () => {
  const token=localStorage.getItem('token');
  const [userId,setUserId]=useState('');
  useEffect(()=>{
  const getUserId=(token)=>{
    try {
      // Decode the token payload
      const decoded = jwtDecode(token);
      // Extract and return the userId
      setUserId(decoded.id);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  getUserId(token);
  },[]);


  return (
    <div>
      <h2>Dashboard:</h2>
      <ul>
        <li>
            <Link to="/create-poll"> Create a New Poll</Link>
        </li>
        <li>
            <Link to="/polls">View Available Polls</Link>
        </li>
        <li>
          <Link to="/polls/results">Results</Link>
        </li>
        <li>
          <Link to={`/polls/${userId}/profile`}>My Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dashboard
