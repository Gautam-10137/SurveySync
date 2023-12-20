import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
const linkStyle={
  textDecoration: 'none',
  color:'#4a4949'
}
const Register = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username=formData.username;
    const email=formData.email;

    const password=formData.password;
    const response = await fetch('http://localhost:7000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,email, password }),
      });
    
      const data = await response.json();
  
     
      navigate('/');
  };
  return (
   <>   <div id='auth-logo'><Link to='/' style={linkStyle}><span id='icon'>SurveySync</span></Link></div>    
      <div className='form-container'>    
    <form onSubmit={handleFormSubmit}>
    <div>
      <label htmlFor="username">Username:</label>
      <br></br>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <br></br>
      <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      >
      </input>
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <br></br>
      <input
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
    </div>
    <button type="submit" id='register'>Register</button>
  </form>
  </div>
  <h6 id='para'>Sign up
By signing up you accept our terms of use and policies.</h6>
  </>
  )
}

export default Register
