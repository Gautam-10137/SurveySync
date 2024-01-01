import React ,{useState,useEffect}from 'react'
import { useParams ,Link,useNavigate} from 'react-router-dom';
const linkStyle={
    textDecoration: 'none',
    color:'#4a4949'
}
const UpdatePoll = () => {
    const predefinedCategories = ['Technology','Science','Entertainment','Sports','Politics','Food','Travel','Health','Education','Business'
    ,'Fashion','Art','Music','Movies','Books','Fitness','Gaming','Home & Garden','Pets','Hobbies', 'Finance'];
        const {pollId}=useParams();
        const navigate=useNavigate();
        const [Poll,setPoll]=useState({
          title:' ',
        description:' ',
        questions:[ 
          {
            questionText:'',
            choices:[{
               choiceText:'',
               votes:0
            }]
          }
                 ],
        category:'',
        creator:'',
        participants:['']
        });
     const token=localStorage.getItem('token');
      useEffect(()=>{
          const fetchDetails=async ()=>{
            try{
            const token=localStorage.getItem('token');
            const response=await fetch(`http://127.0.0.1:7000/polls/${pollId}`,{
              method:'GET',
              headers:{
                'Content-type':'application/json',
                'Authorization':`${token}`
              }
            })
            const data= await response.json();
         
            setPoll(data);
            }
            catch(error){
              console.error('Error fetching poll detail:' + error);
            }
          }
          fetchDetails();
      },[]);
        
          
        const handleAddQuestion=()=>{
          
          setPoll({
            ...Poll,
            questions:[
              ...Poll.questions,
              {
                questionText:'',
                choices:[{
                  choiceText:'',
                  votes:0
                }]
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
         updatedQuestion[index].choices.push({
          choiceText:'',
          votes:0
         });
       
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
          
            updatedQuestion[indexQ].choices[indexC].choiceText=value;
            setPoll({
              ...Poll,
              questions:updatedQuestion
            });
        };
        const handleSubmit=async ()=>{
          try{
            const response=await fetch(`http://127.0.0.1:7000/polls/update/${pollId}`,{
              method:'POST',
              headers:{
                'Content-type':'application/json',
                'Authorization':`${token}`
              },
              body: JSON.stringify(Poll)
            })
            if(response.ok){
              console.log("Poll updated successfully");
              console.log(Poll);
            }
          }
          catch(error){
            console.error("Error updating poll :"+ error);
          }
        }
      
        const handleDelete=async()=>{
             try{
                 const response= await fetch(`http://127.0.0.1:7000/polls/${pollId}`,{
                  method:'DELETE',
                  headers:{
                    'Content-type':'application/json',
                    'Authorization':`${token}`
                  }
                 })
                 if(response.ok){
                    console.log("Poll Deleted Successfully");
                    navigate('/');
                 }
             }
             catch(error){
              console.error("Error Deleting Poll: "+error);
             }
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
                        <button className='signup save delete-poll' onClick={handleDelete}>
                          <span id='sign'>Delete Poll</span>
                          </button>
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
                         value={choice.choiceText}
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

export default UpdatePoll
