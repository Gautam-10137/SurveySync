import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
const PollResult = () => {
  const {pollId}=useParams();
  const [poll,setPoll]=useState(null);

  useEffect(()=>{
    const fetchPollDetail=async()=>{
    try{
        const response=await fetch(`http://127.0.0.1:7000/polls/${pollId}`);
        const data=await response.json();
        setPoll(data);
    }
    catch(error){
        console.error('Error fetching poll details',error);
    }
    }
    fetchPollDetail();
  },[pollId]);
  
  if(!poll){
    return <div>Loading...</div>
  }

  return (
    <div>
        <h2>{poll.title} Results</h2>
        <p>{poll.description}</p>
        <ul>
            {
                poll.questions.map((question)=>(
                    <li key={question._id}>
                       <strong> {question.questionText}</strong>        
                    <ul>
                        {question.choices.map((choice,index)=>(
                         <li key={index}>
                            {choice.choiceText}:{choice.votes} votes
                         </li>
                        ))}
                    </ul>
                    </li>
                ))
            }
        </ul>
      
    </div>
  )
}

export default PollResult
