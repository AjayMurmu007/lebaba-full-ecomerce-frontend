import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useLoginMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser, {isLoading: loginLoading}] = useLoginMutation();
  // console.log('Login User :', loginUser);
  const navigate = useNavigate();
  

  const handleLogin = async (e) =>  {
    e.preventDefault();
    const data = {
        email,
        password,
    }
    // console.log('Formdata',  data);
    // alert(`'Formdata', Email: ${email} \n Password: ${password}`);
    
    
    try {
      const response = await loginUser(data).unwrap();
      // console.log('Login Response:', response);
      // Check if the response contains a user object
      const { user , token} = response;
      dispatch(setUser({user, token}));
      // Save user data to localStorage
      alert("Login Successful");
      navigate("/");
      // if (response) {
      //   setMessage('');
      //   // dispatch(login(res));
      //   // Navigate to the home page or dashboard
      //   window.location.href = '/';
      // }
    } catch (error) {
      setMessage("Please check your email and password");
    }

    
  }


  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow-lg bg-white mx-auto p-8'>
        <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
            <input onChange={(e) => setEmail(e.target.value)} type='email' name='email' id='email' placeholder='Email Address' required className='w-full bg-green-100 focus:outline-none px-5 py-3' />
            <input type='password'  onChange={(e) => setPassword(e.target.value)} name='password' id='password' placeholder='Password' required className='w-full bg-green-100 focus:outline-none px-5 py-3' />

            {
                message && <p className='text-red-500'>{message}</p>
            }

            <button className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md' type='submit'>Login</button>

        </form>

            <p className='my-5 italic text-sm text-center'>Don't have an account <Link to={'/register'} className='text-red-400 underline px-1'>Register</Link> here.</p>

      </div>
    </section>
  )
}

export default Login
