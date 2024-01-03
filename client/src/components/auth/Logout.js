import React from 'react'

const Logout = ({setIsLoggedIn}) => {
    const handleLogout=async ()=>{
       const token=localStorage.getItem('token');
       try{ const response= await fetch('http://127.0.0.1:7000/api/logout',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization':`${token}`
            }
        })
        if(response.ok){
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }
        console.log('Logout Successful');
       }
       catch(error){
          console.error('Error Performing Logout :',error);
       }
    }
  return (
    <button  id="logout" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
