import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { ChangePassword, SendOtp, VerifyForgetPasswordOtp } from '../../../Api/user/authApiMethod';

const Forgetpassword: React.FC = () => {
  const navigate = useNavigate();
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [otpSend, setOtpSend] = useState<boolean>(false);
  const [showSendOtpButton , setShowSendOtpButton] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false); // State for OTP visibility

  const initialValues = { email: '', otp: '' };
  const initialValuesConfirmPassword = { password: '', confirmPassword: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    otp: Yup.string()
      .required('OTP is required')
      .min(4, '4 digits only')
      .max(4, '4 digits only')
  });

  const changePasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^\S*$/, 'Password cannot contain spaces')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmitSendOtp = async (values: { email: any; otp?: string; }, { setFieldTouched, validateField, setFieldError }: { setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{ email: string; otp: string; }>>; validateField: (field: string) => Promise<void> | Promise<string | undefined>; setFieldError: (field: string, message: string | undefined) => void; }) => {
    setFieldTouched('email', true, false);
    validateField('email').then(async () => {
      if (!values.email) {
        setFieldError('email', 'Email is required');
        return;
      }
      // Simulate sending OTP
      const response  = await SendOtp(values.email)
      if(response.success){
        toast.success(response?.message)
               localStorage.setItem('userOtp',response.data?.token)
        setOtpSend(true)
        setShowSendOtpButton(false)
      }

    });
  };
  
  const handleSubmitVerifyOtp = async (values: typeof initialValues) => {
    const response = await VerifyForgetPasswordOtp(values.otp)
    if(response.success){
      toast.success(response?.message)
     setOtpVerified(true)
    }
  };
  
  const handleSubmitConfirmPassword = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await ChangePassword(values.email,values.password)
      if(response.success){
        toast.success(response?.message)
       setOtpVerified(true)
      }
      setSubmitting(false);
      navigate("/login")
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  const toggleShowOtp = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <style>
        {`
          .login_img_section {
            background: linear-gradient(rgba(2,2,2,.7),rgba(0,0,0,.7)),url(https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80) center center;
          }
        `}
      </style>
      <div className="h-screen flex">
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
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        {!otpVerified ? (
            <div className="w-full px-8 md:px-32 lg:px-24">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitVerifyOtp}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({ isSubmitting, setFieldTouched, validateField, setFieldError, values }) => (
                  <Form className="bg-white rounded-md shadow-2xl p-5">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Forgot password</h1>
                    <p className="text-sm font-normal text-gray-600 mb-8"></p>
                    {showSendOtpButton && (
                      <div className="flex flex-col sm:flex-row items-center border-2 mb-2 py-2 px-3 rounded-2xl">
                        <div className="flex items-center w-full sm:w-3/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          <Field id="email" name="email" type="email" className="pl-2 w-full outline-none border-none" placeholder="Email Address" />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSubmitSendOtp(values, { setFieldTouched, validateField, setFieldError })}
                          className="w-full sm:w-1/4 mt-2 sm:mt-0 sm:ml-2 rounded bg-indigo-600 h-9 text-white font-bold hover:ease-in hover:transition-transform hover:scale-105"
                        >
                          Send Otp
                        </button>
                      </div>
                    )}
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    {otpSend && (
                      <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <Field id="otp" name="otp" type="text" className="pl-2 w-full outline-none border-none" placeholder="OTP" />
                      </div>
                    )}
                    <ErrorMessage name="otp" component="div" className="text-red-600 text-sm" />
                    {!showSendOtpButton && (
                      <button type="submit" disabled={isSubmitting} className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                        Verify Otp
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div className="w-full px-8 md:px-32 lg:px-24">
           <Formik
              initialValues={initialValuesConfirmPassword}
              validationSchema={changePasswordValidationSchema}
              onSubmit={handleSubmitConfirmPassword}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ isSubmitting, setFieldValue,setSubmitting  }) => (
                <Form className="bg-white rounded-md shadow-2xl p-5">
                  <h1 className="text-gray-800 font-bold text-2xl  mb-1">Change password</h1>
                  <p className="text-sm font-normal text-gray-600 mb-8"></p>
                 

                  <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <Field id="password" name="password" type={showPassword ? "text" : "password"}className="pl-2 w-3/4 outline-none border-none" placeholder="New password " />

                    {/* <Field id="otp" name="otp" type={showOtp ? "text" : "password"} className="pl-2 w-full outline-none border-none" placeholder="OTP" /> */}
                    <button type="button" onClick={toggleShowOtp} className="absolute right-3">
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3m0 0l-3-3m3 3V3" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l3 3m0 0l-3 3m3-3H3" />
                        </svg>
                      )}
                    </button>
                  </div>

                 
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />

                  <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <Field id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"}className="pl-2 w-3/4 outline-none border-none" placeholder="Confirm password " />

                    <button type="button" onClick={toggleShowOtp} className="absolute right-3">
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3m0 0l-3-3m3 3V3" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l3 3m0 0l-3 3m3-3H3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
                  
                  <button type="submit" disabled={isSubmitting} className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Change password</button>
                </Form>
              )}
            </Formik>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Forgetpassword;
