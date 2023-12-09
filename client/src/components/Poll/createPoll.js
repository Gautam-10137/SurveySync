import React from 'react'
import PollForm from './PollForm'
import {jwtDecode} from 'jwt-decode';
const createPoll = () => {
    
    const token=localStorage.getItem('token');
    const getUserIdFromToken = (token) => {
      try {
        // Decode the token payload
        const decoded = jwtDecode(token);
        // Extract and return the userId
        return decoded.id;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    };
    
    const handleCreatePoll= async (pollData)=>{
      const userId=getUserIdFromToken(token);
      try{
        const pollWithCreator = {
          ...pollData,
          creator: userId,
        };
      console.log(pollWithCreator);
        const response= await fetch('http://localhost:7000/poll/create',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(pollWithCreator)
        })
        // if(response.ok){
        //     // success
        // }
        // else{
        //     // error
        // }
      }
      catch(error){
        console.error(error);
      }
    }

  return (
    <div>
        <h1>Create a Poll : </h1>
        <PollForm onSubmit={handleCreatePoll}></PollForm>
      
    </div>
  )
}

export default createPoll
