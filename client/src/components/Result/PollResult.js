import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import PollResultChart from './PollResultChart';
const linkStyle={
  textDecoration: 'none',
  color:'#4a4949',
 
}
const PollResult = () => {
  const {pollId}=useParams();
  const [poll,setPoll]=useState(null);
  const [labels,setLabels]=useState(null);

  useEffect(()=>{
    const fetchPollDetail=async()=>{
    try{
        const token=localStorage.getItem('token');
        const response=await fetch(`http://127.0.0.1:7000/polls/${pollId}`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`${token}`
          }
        });
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
        <h1 id="result-logo"><Link to='/'style={linkStyle}>SurveySync</Link></h1>
      
       <div id="result-section"> <p><strong id='result-id'>Title:</strong> {poll.title} </p>
        <p><strong id='result-id'>Description:</strong> {poll.description}</p>
        </div>
                  <ul className='chart-ul'>
            {
                poll.questions.map((question,index)=>(
                    <li id="chart-li"key={question._id}>
                       <strong> {index+1}. {question.questionText}</strong>        
                    {/* <ul>
                        {question.choices.map((choice,index)=>(
                         <li key={index}>
                            {choice.choiceText}:{choice.votes} votes
                         </li>
                        ))}
                    </ul> */}
                    
                    <PollResultChart data={question.choices}/>
                    </li>
                    
                ))
            }
        </ul>
     
      
    </div>
  )
}

export default PollResult
