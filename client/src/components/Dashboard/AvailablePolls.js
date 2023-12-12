import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
const AvailablePolls = () => {
    const [polls,setPolls]=useState([]);
    const token=localStorage.getItem('token');
    useEffect(()=>{
         const fetchAvailablePolls=async ()=>{
            try{
                const response=await fetch('http://127.0.0.1:7000/polls/all',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `${token}`,
                  }}
                );
                const data=await response.json();
                setPolls(data);
            }
            catch(error){
                console.error('Error while fetching Polls: ',error);
            }
         }
         fetchAvailablePolls();
    },[])
  return (
    <div>
      <h2>Available Polls:</h2>
      {Array.isArray(polls) && polls.length > 0 ? (
      <ul>   
      {polls.map((poll)=>(
        <li key={poll._id}>
           <Link to={`/polls/${poll._id}`}>{poll.title}</Link>
        </li>
      ))}
      </ul>):(
          <p>No polls available.</p>)}
    </div>
  );
};

export default AvailablePolls;
