import React,{useState} from 'react'

const PollForm = ({onSubmit}) => {
    const [Poll,setPoll]=useState({
        questions:[ {
            questionText:'',
            choices:['']
                }]
            });
    const handleAddQuestion=()=>{
      console.log("Add QUESTION")
      setPoll({
        ...Poll,
        questions:[
          ...Poll.questions,
          {
            questionText:'',
            choices:['']
          }    ]
      });
    };
    const handleQuestionInput=(index,value)=>{
     const updatedQuestion=[...Poll.questions];
     updatedQuestion[index].questionText=value;
     setPoll({
      ...Poll,
      questions:updatedQuestion
     })
    };    
    const handleAddChoice=(index)=>{
     const updatedQuestion=[...Poll.questions];
     updatedQuestion[index].choices.push('');
     console.log(updatedQuestion);
     setPoll({
      ...Poll,
      questions:updatedQuestion
     })
    };

    const handleChoiceInput=(indexQ,indexC,value)=>{
        const updatedQuestion=[...Poll.questions];
        updatedQuestion[indexQ].choices[indexC]=value;
        setPoll({
          ...Poll,
          questions:updatedQuestion
        });
    };
    const handleSubmit=()=>{
      onSubmit(Poll);
    }

  return (
    <div>
       {
        Poll.questions.map((question,questionIndex)=>(
               <div key={questionIndex}>
                <label>Question {questionIndex+1}:</label>
                <input
                  type='text'
                  value={question.questionText}
                  
                  onChange={(e)=>handleQuestionInput(questionIndex,e.target.value)}
                ></input>
                <label>Choices:</label>
                {question.choices.map((choice,choiceIndex)=>(
                    <input
                    key={choiceIndex}
                     type='text'
                     value={choice}
                     onChange={(e)=>{handleChoiceInput(questionIndex,choiceIndex,e.target.value)}}
                    >
                    </input>
                ))}
                <button onClick={(e)=>handleAddChoice(questionIndex)}>Add Choice</button>
               </div>
        ))
       }
       <button onClick={handleAddQuestion}>Add Question</button>
       <button onClick={handleSubmit}>Submit</button>
      
    </div>
  )
}

export default PollForm
