import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/footer';
import Category from './Dashboard/Category';

const linkStyle={
  textDecoration: 'none',
  color:'#4a4949'
}

const Home = ({isLoggedIn}) => {
  useEffect(()=>{
    const returnUrl = window.location.pathname; 
    localStorage.setItem('returnUrl', returnUrl);
  },[]);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn}/>
      <div className='main-content'>
        <div className='first-container'>
          <div className='content'>
          <h2>Empower Your Opinions with Our Interactive Online Polling Platform</h2>
      <p>Explore diverse topics, share your perspective, and see how your opinions align with others in our engaging online polls.</p>
      <button className='button'>
        <Link to="/create-poll" style={linkStyle}><span id='create-poll'>Create Poll</span></Link>
      </button>
          </div>
          <div className='content-image'>
            <img src={require('../assets/content-image.jpg')} alt='content-image'></img>
          </div>
        </div>
        {/* <div>
          

          <Category/>
        </div> */}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
