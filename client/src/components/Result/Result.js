import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
const Result = ({isLoggedIn}) => {
  const [polls,setPolls]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    // if(!isLoggedIn){
    //   const returnUrl = window.location.pathname; 
    //   localStorage.setItem('returnUrl', returnUrl);
    //   navigate('/login');
    // }
     const fetchPolls=async ()=>{
        try{
        const token=localStorage.getItem('token');
        const response=await fetch('http://127.0.0.1:7000/polls/all',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`${token}`
          }
        });
        const data=await response.json();
        
        setPolls(data);
        }
        catch(error){
            console.error('Error Fetching polls:',error);
        }
         };
      fetchPolls();
    
  },[]);
  return (
    <div>
      <h2>All Polls Results</h2>
      <ul>
        {
            polls.map((poll)=>(
                <li key={poll._id}>
                 <Link to={`/polls/${poll._id}/results`}>{poll.title}</Link>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default Result
