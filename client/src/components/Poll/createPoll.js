import React from 'react'
import PollForm from './PollForm'
const createPoll = () => {
    const userId="656eb897f0cb83f25d15dfce";
    const handleCreatePoll= async (pollData)=>{
      
      try{
        const pollWithCreator = {
          ...pollData,
          creator: userId,
        };
      console.log(pollWithCreator);
        const response= await fetch('http://localhost:7000/poll/create',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
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
