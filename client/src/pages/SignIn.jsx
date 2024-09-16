import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loginSeccess, loginFail, loginStart} from "../redux/user/userSlice"
export default function SignIn() {
  const [formData, setFormData] = useState({}) 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user)
  const {isLoading , isError, message } = userState
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
    dispatch(loginStart());
    try{
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: 'POST'
        , headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        dispatch(loginSeccess(data))
        navigate("/home");
      }else{
        dispatch(loginFail(data?.message))
      }
    }catch(err){
      dispatch(loginFail(err))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email or User Name' className='border p-3 rounded-lg' id='email' onChange={onChange}></input>
        <input type='password' autoComplete="on" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={onChange}>
        </input>
        <input type='submit' disabled={isLoading} className='text-center cursor-pointer bg-blue-500 text-white p-3 rounded-lg disabled:bg-slate-300 disabled:text-black' value={isLoading ? 'Signing in...' : 'Sign in'}></input>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>create an account ? </p>
        <Link className='text-blue-500' to='/signup'>Sign up</Link>
      </div>
      {isError &&<p  className='text-red-500'>{message}</p>}
    </div>
  )
}
