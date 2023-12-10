import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import VoteComponent from './VoteComponent';
const PollDetails = () => {
    const {pollId}=useParams();
    const [poll,setPoll]=useState(null);
    const [selectedChoices,setSelectedChoices]=useState({});

    useEffect(()=>{
          const fetchPollDetails=async()=>{
            try{
                 const response=await fetch(`http://127.0.0.1:7000/polls/${pollId}`);
                
                 const data= await response.json();
               
                 setPoll(data);
            }
            catch(error){
                console.error('Error fetching poll details: ',error);
            }
          }
          fetchPollDetails();
    },[pollId]);
    const handleVote=(questionId,selectedChoice)=>{
            setSelectedChoices({
              ...selectedChoices,
              [questionId]:selectedChoice,
            });
    };
    const handleVoteSubmission=async ()=>{
          try{
              const response=await fetch(`http://127.0.0.1:7000/polls/${pollId}/vote`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                },
                body: JSON.stringify({
                  selectedChoices
                })
              });
              if(response.ok){
                console.log('Successful vote submission')
              }
          }
          catch(error){
            console.error(`Error Submitting Vote : ${error}`);
          }
    }
  return (
    <div>
      <h2>{poll?poll.title:"Loading..."}</h2>
      {
        poll&& (
            <div>
            <p>{poll.description}</p>
            <ul>
              {
              poll.questions.map((question)=>(
                <li key={question._id}>
                    <strong>{question.questionText}</strong>
                
                    <ul>
                    {
                    question.choices.map((choice,index)=>(
                        <li key={index}>{choice.choiceText}</li>
                    ))  
                    }
                    </ul>
                  <VoteComponent
                    questionId={question._id}
                    choices={question.choices}
                    onVote={handleVote}
                  />      
                 </li>
              ))
              }
            </ul>
            <button onClick={handleVoteSubmission}>Submit Votes</button>
            </div>
        )
      }
    </div>
  );
};

export default PollDetails;
