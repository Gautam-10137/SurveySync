import React, { useEffect ,useState} from 'react'

const PollList = () => {
    const [polls,setPolls]=useState([]);
    
    useEffect(()=>{
        const fetchPolls= async()=>{
            try{
              const token=localStorage.getItem('token');
              const response= await fetch('http://localhost:7000/polls/all',{
                method:'GET',
                headers:{
                  'Content-type':'application/json',
                  'Authorization':`${token}`
                }

              });
              if(response.ok){
                const data= await response.json();
                console.log(data);
                setPolls(data);
                console.log("data ");
                console.log(polls);
              }
              else{
                // Handle error
              }

            }
            catch(error){
                console.error(error);
            }
        }
        fetchPolls();
    },[]);
  return (
    <div>
        <h2>All Polls:</h2>
        {Array.isArray(polls) && polls.length > 0 ? (
      <ul>
        {
            polls.map((poll)=>(
            <div key={poll._id}>
                <h3>Creator : {poll.creator.username}</h3>
                <p>Created at : {poll.createdAt}</p>
                {
                    poll.questions.map((question,questionIndex)=>(
                        <div key={questionIndex}>
                            <p>{question.questionText}</p>
                            <ul>
                                {question.choices.map((choice,choiceIndex)=>(
                                    <li key={choiceIndex}> {choice.choiceText}</li>
                                ))}
                            </ul>

                        </div>
                    ))
                }
            </div>
            ))
        }  </ul>
        ) : (
          <p>No polls available.</p>)}
      
    </div>
  )
}

export default PollList
