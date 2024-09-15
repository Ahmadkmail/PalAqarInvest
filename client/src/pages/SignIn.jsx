import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({}) 
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  /**
   * Submits the form data to the server to sign up a new user
   * @param {Event} e - The form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async  (e) =>{
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: 'POST'
      , headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data?.statusCode === 200) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', data.user)
      localStorage.setItem('email', data.email)
      localStorage.setItem('username', data.username)
      localStorage.setItem('id', data.id)
      localStorage.setItem('avatar', data.avatar)
      localStorage.setItem('role', data.role)
      localStorage.setItem('isLoggedIn', true)
      navigate("/home");
      
    }
    console.log(data)
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email or User Name' className='border p-3 rounded-lg' id='email' onChange={onChange}></input>
        <input type='password' autoComplete="on" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={onChange}>
        </input>
        <input type='submit' className='text-center cursor-pointer bg-blue-500 text-white p-3 rounded-lg disabled:bg-slate-300 disabled:text-black' value='Sign in'></input>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>create an account ? </p>
        <Link className='text-blue-500' to='/sign-up'>Sign up</Link>
      </div>
    </div>
  )
}
