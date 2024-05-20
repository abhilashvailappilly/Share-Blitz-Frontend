import React, { useState } from 'react';
import {toast} from 'react-toastify'
import { useNavigate,Link } from 'react-router-dom';
import { userRegistrationValidation } from '../../../utils/validation/user';
import SignUpForm from '../../../Components/User/Google/GoogleAuthSignUp';
import { Register } from '../../../Api/user/authApiMethod';
const SignupComponent: React.FC = () => {

  const [formData,setFormData] = useState({
    name:'',
    userName:'',
    email:'',
    mobile:'',
    password:'',
    confirmPassword:''
  })
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const {name,userName,email,mobile,password,confirmPassword} = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();console.log('worked the submit')
  

    try { 

      if(userRegistrationValidation(formData)){
        const userResponse = await Register(formData)
        console.log('user response ;',userResponse)
        if(userResponse?.data?.success){
          navigate('/otp')
        } else {
          toast.error(userResponse?.data?.message)
          // navigate('/signup')
        }
        
      }
    } catch (error) {
      console.log(error);
      
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
            <h1 className="text-white font-bold text-4xl font-sans">Sign Up</h1>
            <p className="text-white mt-1">The simplest app to use</p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</a>
            </div>
          </div>
        </div>
        {/* Right section */}
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Create a new account</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                        <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em" 
              >
      <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
    </svg>
                <input id="name" className="pl-2 w-full outline-none border-none"  value={name} onChange={onChange} type="text" name="name" placeholder="Enter your name " />
              </div>

              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                        <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
                
              >
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
              </svg>
                <input id="username"  className="pl-2 w-full outline-none border-none" type="text" value={userName}  onChange={onChange}  name="userName" placeholder="Enter your user name " />
              </div>

              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input id="email"  className="pl-2 w-full outline-none border-none" type="email" value={email}  onChange={onChange}  name="email" placeholder="Enter your email Address" />
              </div>

              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z"
                    />
                    <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 012.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                <input className="pl-2 w-full outline-none border-none" type="tel" name="mobile" value={mobile}  onChange={onChange}  id="mobile" placeholder="Enter mobile Number" />
              </div> 


              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input  className="pl-2 w-full outline-none border-none" type="password" name="password" value={password}  onChange={onChange}  id="password" placeholder="Password" />
              </div>

              {/* <label className="mb-2 block text-xs font-semibold">
                  Password
                </label> */}
              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                
                <input  className="pl-2 w-full outline-none border-none" type="password" value={confirmPassword}  onChange={onChange}  name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
              </div>
                 
              {error ? (
                  <div className="text-red-700">{`! ${error}`}</div>
                ) : null}
             
              <button type="submit"  className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" >Register</button>
              <div className="flex justify-between mt-4">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span>
                <Link to="/login" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Login to existing account </Link>
              </div>
              <SignUpForm/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupComponent;
