import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const linkStyle={
    textDecoration: 'none',
    color:'#4a4949'
}
const Header = ({isLoggedIn}) => {
    const [username,setUsername]=useState('');
    const [userId,setUserId]=useState('');
    useEffect(()=>{
       const token=localStorage.getItem('token');
       const getUserIdFromToken = (token) => {
        try {
          // Decode the token payload
          const decoded = jwtDecode(token);
          // Extract and return the userId
           setUsername(decoded.username);
           setUserId(decoded.id);
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      };  
      getUserIdFromToken(token);
    },[]);
  return (
        <header>
            <nav className='header'>
                <div className='logo'>
                    {/* inline css */}
                    <Link to='/' style={linkStyle}>SurveySync</Link>
                </div>
                <div className='nav-links'>
                    <ul id="header-ul">
                        <li>
                            <Link to='/' style={linkStyle}>Overview</Link>
                        </li>
                        <li>
                            <Link to='/' style={linkStyle}>About us</Link>
                        </li>
                        <li>
                            <Link to='/create-poll' style={linkStyle}>create poll</Link>
                        </li>
                        <li>
                            <Link to='/polls' style={linkStyle}>Public polls</Link>
                        </li>
                    </ul>                    
                </div>
                {isLoggedIn?<div className='profile-section'>
                    <div >
                        Hello,{username}
                    </div>
                    <Link to={`/polls/${userId}/profile`}><FontAwesomeIcon icon={faUser} style={{ fontSize: '2rem' }}/></Link>

                </div>:<div className='profile-section'>
                    <div id='login'>
                        <Link to='/login' style={linkStyle}>Login</Link>
                    </div>
                        <button className='signup'>
                            <Link to='/register' style={linkStyle}><span id='sign'>Sign up</span></Link>
                        </button>      
                </div>}
            </nav>
        </header>
    
  )
}

export default Header