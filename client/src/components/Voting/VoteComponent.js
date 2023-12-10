import React,{useState} from 'react'

const VoteComponent = ({questionId,choices,onVote}) => {
    const [selectedChoiceIndex,setSelectedChoiceIndex]=useState(null);
    const handleVote=()=>{
        onVote(questionId,selectedChoiceIndex);
    }
  return (
    <div>
      <p>Choose your option:</p>
      <select  value={selectedChoiceIndex!==null?selectedChoiceIndex:''} 
      onChange={(e)=>{setSelectedChoiceIndex(Number(e.target.value))}}>
        <option value="" disabled>Select an option</option>
        {
            choices.map((choice,index)=>(
                <option key={index} value={index}>
                    {choice.choiceText}
                </option>
            ))
        }
      </select>
      <button onClick={handleVote}>Vote</button>
    </div>
  )
}

export default VoteComponent
