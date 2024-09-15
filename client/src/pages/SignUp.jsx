
import { Link } from 'react-router-dom'
import {useState} from 'react'
/**
 * Renders a form for signing up a new user
 * @returns {React.ReactElement} The SignUp form
 */
export default function SignUp() {
  const [formData, setFormData] = useState({})
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
    // const res = await fetch("http://localhost:3000/api/user/test", {
    //   method: 'GET'
    // })
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: 'POST'
      , headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='User Name' className='border p-3 rounded-lg' id='username' onChange={onChange}></input>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={onChange}></input>
        <input type='password' autoComplete="on" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={onChange}>
        </input>
        <input type='submit' className='text-center cursor-pointer bg-blue-500 text-white p-3 rounded-lg disabled:bg-slate-300 disabled:text-black' value='Sign Up'></input>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link className='text-blue-500' to='/sign-in'>Sign In</Link>
      </div>
    </div>
  )
}
