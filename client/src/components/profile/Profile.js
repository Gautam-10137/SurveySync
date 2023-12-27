import React,{useState,useEffect} from 'react'
import {  useParams,useNavigate ,Link} from 'react-router-dom'
const Profile = () => {
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
      <p><strong><label>Username :</label></strong>  {userDetail.username}</p>
      <p><strong><label>Email :</label></strong>  {userDetail.email}</p>
      <strong><label>CreatedPolls:</label></strong>
      
      {Array.isArray(userDetail.createdPolls) && userDetail.createdPolls.length > 0 ? <ul>
      {userDetail.createdPolls.map((poll)=>(
             <li key={poll._id}><Link to={`/polls/update/${poll._id}`} key={poll._id}>{poll.title}</Link></li>
      ))}
      </ul>:(
        <p>No Polls created</p>
      )} 
      <strong><label>ParticipatedPolls:</label></strong>
      {Array.isArray(userDetail.participatedPolls) && userDetail.participatedPolls.length > 0 ? <ul>
      {userDetail.participatedPolls.map((poll)=>(
             <li key={poll._id}>{poll.title}</li>
      ))}
      </ul>:(
        <p>No Polls participated</p>
      )}     
    </div>
  )
}

export default Profile
