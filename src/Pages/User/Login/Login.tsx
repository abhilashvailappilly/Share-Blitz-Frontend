import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { Link,useNavigate } from 'react-router-dom';
import GoogleLogin from '../../../Components/User/Google/GoogleAuthSignIn';
import {  useDispatch } from 'react-redux'; 
import { validateEmail, validatePassword } from '../../../utils/validation/user';
import { LoginUser } from '../../../Api/user/authApiMethod';
import { setCredentials,setAdminCredentials } from '../../../Store/user/userSlice';
import { setFollowerss,setFollowings } from '../../../Store/user/connectionSlice';
import { toast } from 'react-toastify';
import { getConnections } from '../../../Api/user/userApiMethod';
const LoginComponent: React.FC = () => {

  const navigate = useNavigate()
  const dispatch =useDispatch()
  const [loginDetails,setLoginDetails] = useState({
    email:"",
    password:""
  })
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    const {name,value}=e.target
    setLoginDetails((prevState)=>({
      ...prevState,[name]:value
      })
    )
  } 
  const handleSubmit = async(e : React.ChangeEvent<HTMLFormElement>)  =>{
    e.preventDefault()
    if(validateEmail(loginDetails.email) && validatePassword(loginDetails.password)){
        const login = await LoginUser(loginDetails);
        if(login.data.success){
          if(login.data.user.role === 'USER'){
            dispatch(setCredentials(login?.data?.user))
            localStorage.setItem('userInfo', JSON.stringify(login?.data?.user))
            // localStorage.setItem('userAuthToken', JSON.stringify(login?.data?.token))
            localStorage.setItem('accessToken', JSON.stringify(login?.data?.accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(login?.data?.refreshToken))
            const connections = await getConnections(login?.data?.user._id) 
            dispatch(setFollowerss(connections.connections?.followings))
            dispatch(setFollowings(connections.connections?.followings))
            sessionStorage.setItem('followings', connections.connections?.followings);
            sessionStorage.setItem('followers',connections.connections?.followers );
            // navigate('/home')
          } else {
            dispatch(setAdminCredentials(login?.data?.user))
            localStorage.setItem('adminInfo', JSON.stringify(login?.data?.user))
            // localStorage.setItem('adminAuthToken', JSON.stringify(login?.data?.token))
            localStorage.setItem('accessToken', JSON.stringify(login?.data?.accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(login?.data?.refreshToken))
            navigate('/admin/home')
          }
          toast.success('Login successfull !')
        } else{
          toast.error(login?.data?.message)
        }
    }
  }
  return (
    <>
      {/* Component styles */}
      <style>
        {`
          .login_img_section {
            background: linear-gradient(rgba(2,2,2,.7),rgba(0,0,0,.7)),url(https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) center center;
          }
        `}
      </style>
      {/* Component */}
      <div className="h-screen flex">
        {/* Left section */}
        <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
          <div className="bg-black opacity-20 inset-0 z-0"></div>
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">Share Blitz</h1>
            <p className="text-white mt-1">Social media platform </p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</a>
            </div>
          </div>
        </div>
        {/* Right section */} 
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Login to account</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input id="email" className="pl-2 w-full outline-none border-none dark:text-black font-medium" value={loginDetails.email} onChange={handleChange} type="email" name="email" placeholder="Email Address" />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input className="pl-2 w-full outline-none border-none dark:text-black font-medium"  type="password" value={loginDetails.password} onChange={handleChange} name="password" id="password" placeholder="Password" />
              </div>
              <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
              <div className="flex justify-between mt-4">
              <Link to="/forgetPassword" className="text-sm ml-2 text-indigo-800 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</Link>
            <Link to="/register"  className="text-sm ml-2 text-indigo-800 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"  >Don't have an account yet?</Link>
              </div>
            </form>
              <GoogleLogin/>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
