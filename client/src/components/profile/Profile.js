import React,{useState,useEffect} from 'react'
import {  useParams,useNavigate ,Link} from 'react-router-dom'
import Logout from '../auth/Logout'
const linkStyle={
  textDecoration: 'none',
  color:'white'
}
const Profile = ({setIsLoggedIn}) => {
    const [userDetail,setUserDetail]=useState({});
    const {userId}=useParams();

    useEffect(()=>{

        const fetchUserDetails=async()=>{
            try{
                const token=localStorage.getItem('token');
                const response= await fetch(`http://127.0.0.1:7000/polls/${userId}/profile`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`${token}`
                    }
                });
                const data=await response.json();
               
                setUserDetail(data);              
            }
            catch(error){
                console.error("Error Fetching User Details:",error.message);
            }
        }
        fetchUserDetails();
    },[userId]);
  return (
    <div>
      <Logout setIsLoggedIn={setIsLoggedIn}/> 
      <div className='user-detail'>
      <img id='profile-image' src={require('../../assets/user-icon1.jpeg')} alt='user-image'></img>
      <p id='uname'><strong><label>Username :</label></strong>  {userDetail.username}</p>
      <p id='uemail'><strong><label>Email :</label></strong>  {userDetail.email}</p>
      </div>
      <div className='polls-profile'>
      <div className='polls-created'>
      <strong><label>CreatedPolls:</label></strong>
      
      {Array.isArray(userDetail.createdPolls) && userDetail.createdPolls.length > 0 ?<div id="create-poll-container">
      {userDetail.createdPolls.map((poll)=>(
             <div id="create-poll-card" key={poll._id}><p>{poll.title}</p><button ><Link style={linkStyle} to={`/polls/update/${poll._id}`} key={poll._id}>Update</Link></button> 
             <button><Link style={linkStyle} to={`/polls/${poll._id}/results`}>Result</Link>

           </button></div>

      ))}
      </div>
      :(
        <p>No Polls created</p>
      )
      } 
      </div>
      <div className='polls-participated'>
      <strong><label>ParticipatedPolls:</label></strong>
      {Array.isArray(userDetail.participatedPolls) && userDetail.participatedPolls.length > 0 ? <div id="participated-poll-container"> 
      {userDetail.participatedPolls.map((poll)=>(
             <div id="participated-poll-card" key={poll._id}><li>{poll.title}</li></div>
      ))}
      </div>:(
        <p>No Polls participated</p>
      )}  
      </div>
      </div>  
      
    </div>
  )
}

export default Profile
