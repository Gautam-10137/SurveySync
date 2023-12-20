import React,{useState} from 'react'

const PollForm = ({onSubmit}) => {
  // Example of predefined categories
const predefinedCategories = ['Technology','Science','Entertainment','Sports','Politics','Food','Travel','Health','Education','Business'
,'Fashion','Art','Music','Movies','Books','Fitness','Gaming','Home & Garden','Pets','Hobbies', 'Finance'];

    const [Poll,setPoll]=useState({
        title:'',
        description:'',
        questions:[ 
          {
            questionText:'',
            choices:['']
          }
                 ],
        category:''
        });
    const handleAddQuestion=()=>{
      
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
      console.log(Poll);
      onSubmit(Poll);
    }
  

  return (
    <div>
      <label>Title:</label>
      <input
        type='text'
        value={Poll.title}
        onChange={(e)=>{setPoll({...Poll,title:e.target.value})}}
      ></input>
          <label>
        Category:
        <select value={Poll.category} onChange={(e) => {setPoll({...Poll,category:e.target.value})}}>
          <option value="" disabled>Select a category</option>
          {predefinedCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>Description:</label>
      <input
        type='text'
        value={Poll.description}
        onChange={(e)=>{setPoll({...Poll,description:e.target.value})}}
      ></input>
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
