import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
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
    <form onSubmit={handleFormSubmit}>
    <div>
      <label htmlFor="username">Username:</label>
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
    <button type="submit">Register</button>
  </form>
  )
}

export default Register
