import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const linkStyle={
  textDecoration: 'none',
  color:'#4a4949'
}

const PollForm = ({onSubmit}) => {
  // Example of predefined categories
const predefinedCategories = ['Technology','Science','Entertainment','Sports','Politics','Food','Travel','Health','Education','Business'
,'Fashion','Art','Music','Movies','Books','Fitness','Gaming','Home&Garden','Pets','Hobbies', 'Finance'];

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
    const handleRemoveQuestion=(questionIndex)=>{
      const updatedQuestion=[...Poll.questions];
      updatedQuestion.splice(questionIndex,1);
      setPoll({
        ...Poll,
        questions:updatedQuestion
      })
    }
    
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
    const handleRemoveChoice=(index)=>{
      const updatedQuestion=[...Poll.questions];
      updatedQuestion[index].choices.pop();
    
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
    <>
       <header>
            <nav className='header'>
                <div className='logo'>
                    {/* inline css */}
                    <Link to='/' style={linkStyle}>SurveySync</Link>
                </div>
                <div className='nav-links'>
                    <ul>
                        <li>
                            <Link to='/create-poll' style={linkStyle}>Questions</Link>
                        </li>
                        <li>
                            <Link to='/create poll' style={linkStyle}>Responses</Link>
                        </li>
                        
                    </ul>                    
                </div>
                <div className='profile-section'>
                  Move to folder
                        <button className='signup save'  onClick={handleSubmit} >
                           <span id='sign'>Save</span>
                        </button>    
                </div>
            </nav>
        </header>


    <div className='form'>
      <div className='form-title'>
      <label id='label1'>Form Title:</label>
      <input id='title'
        type='text'
        value={Poll.title}
        onChange={(e)=>{setPoll({...Poll,title:e.target.value})}}
        required
      ></input>
          <label id='label2'>
        Category:
        <select id='category' value={Poll.category} onChange={(e) => {setPoll({...Poll,category:e.target.value})}} required>
          <option value="" disabled>Select a category</option>
          {predefinedCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label id='label3'>Form description:</label>
      <textarea rows="4" cols="10" id='description'
        type='text'
        value={Poll.description}
        onChange={(e)=>{setPoll({...Poll,description:e.target.value})}} 
        required
        >
      </textarea>
    </div>
    
       {
        Poll.questions.map((question,questionIndex)=>(
          
               <div  className='question' key={questionIndex}>
                    <div id="question-label">
                    <label id='que'>Question {questionIndex+1}:</label>
                    <button className='add-option' onClick={(e)=>handleRemoveQuestion(questionIndex)}> - Remove que. </button>
                    </div>
                <input id='id1'
                  type='text'
                  value={question.questionText}                  
                  onChange={(e)=>handleQuestionInput(questionIndex,e.target.value)}
                  required
                ></input>

                <label id='option'>Choices:</label>
                {question.choices.map((choice,choiceIndex)=>(
                  <div key={choiceIndex}>
                    <input type='radio'></input>
                    <input id='id2' 
                    key={choiceIndex}
                     type='text'
                     value={choice}
                     onChange={(e)=>{handleChoiceInput(questionIndex,choiceIndex,e.target.value)}}
                     required
                    >
                    </input></div>
                ))}
                <div id="choice-button">
                    <button className='add-option' onClick={(e)=>handleAddChoice(questionIndex)}>+ Add option</button>
                    <button className ="add-option" onClick={(e)=>handleRemoveChoice(questionIndex)}>- Remove option</button>
                </div>
               </div>
           
        ))
        
       }
       
       <div className='add-question'>
       <button id='add' onClick={handleAddQuestion}> + Add Question</button>
       
       </div>
    </div>
    </>
  )
}

export default PollForm
