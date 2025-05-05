import React, { useState } from 'react'
import axios from 'axios';
import '../App.css'


function RegisterPage() {
  const [formData,setFormData] = useState(
    {
      name :"",
      email :"",
      password :""
    }
  )

  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit  =  async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData
      )
      alert('Registered successfully!');
    } catch (error) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  }

  return (

    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage