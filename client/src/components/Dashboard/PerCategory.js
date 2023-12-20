import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
const PerCategory = () => {
    const [polls,setPolls]=useState([]);
    const {categoryId}=useParams();

    useEffect(()=>{
        const fetchPolls=async()=>{
            try{
                const token=localStorage.getItem('token');
                const response=await fetch(`http://127.0.0.1:7000/polls/category/${categoryId}`,{
                    method:'GET',
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':`${token}`
                    }
                });
                
                const data= await response.json();
                setPolls(data);
            }
            catch(error){
                console.error('Error fetching Category-vise Polls :',error);
            }
        }
        fetchPolls();
    },[]);
  return (
    <div>
      <h3>Category : {categoryId}</h3>
      {
        polls.map((poll)=>(
            
            <Link key={poll._id} to={`/polls/${poll._id}`}>{poll.title}</Link>
        ))
      }
    </div>
  )
}

export default PerCategory
