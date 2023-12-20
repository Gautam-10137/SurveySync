import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const linkStyle={
  textDecoration: 'none',
  color:'#4a4949'
}

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
                    <div id='login'>
                        <Link to='/login' style={linkStyle}>Move to folder</Link>
                    </div>
                        <button className='signup'>
                            <Link to='/register' style={linkStyle}><span id='sign'>Send</span></Link>
                        </button>
                        
                    
                </div>
            </nav>
        </header>


    <div>
      <div className='form-title'>
      <label id='label1'>Untitled form:</label>
      <input id='title'
        type='text'
        value={Poll.title}
        onChange={(e)=>{setPoll({...Poll,title:e.target.value})}}
      ></input>
          <label id='label2'>
        Category:
        <select id='category' value={Poll.category} onChange={(e) => {setPoll({...Poll,category:e.target.value})}}>
          <option value="" disabled>Select a category</option>
          {predefinedCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label id='label3'>Form description:</label>
      <input id='description'
        type='text'
        value={Poll.description}
        onChange={(e)=>{setPoll({...Poll,description:e.target.value})}}>
      </input>
    </div>
    <div className='question'>
       {
        Poll.questions.map((question,questionIndex)=>(
               <div key={questionIndex}>

                <label id='que'>Question {questionIndex+1}:</label>
                <input id='id1'
                  type='text'
                  value={question.questionText}                  
                  onChange={(e)=>handleQuestionInput(questionIndex,e.target.value)}
                ></input>

                <label id='option'>Choices:</label>
                {question.choices.map((choice,choiceIndex)=>(
                    <input id='id2'
                    key={choiceIndex}
                     type='text'
                     value={choice}
                     onChange={(e)=>{handleChoiceInput(questionIndex,choiceIndex,e.target.value)}}
                    >
                    </input>
                ))}
                <button id='add-option' onClick={(e)=>handleAddChoice(questionIndex)}>Add option</button>
               </div>
              
        ))
        
       }
       </div>
       <div className='add'>
       <button id='add' onClick={handleAddQuestion}>Add Question</button>
       </div>
       <div className='submit'>
       <button id='submit' onClick={handleSubmit}>Submit</button>
       </div>
    </div>
    </>
  )
}

export default PollForm
