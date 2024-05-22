

import React, { useState ,useEffect} from 'react';
import { toast } from 'react-toastify';
import { ResendOtp, VerifyOtp } from '../../../Api/user/authApiMethod';
import { useNavigate } from 'react-router-dom';


const OTPVerification: React.FC = () => {

  const [seconds, setTimer] = useState<number>(59);
  const [resendOtp,setResendOtp] = useState<boolean>(false)
  const [otpEmail,setOtpEmail] = useState<string>('')
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const navigate = useNavigate()


  useEffect(() => {
    const sendEmail = localStorage.getItem('userOtpEmail') 
    console.log(sendEmail)
      setOtpEmail(sendEmail || '')
  },[])
  useEffect(() => {
    
    const interval = setInterval(() => {
      setTimer((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          setResendOtp(true);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) =>{
  
    try {
      const maxLength = 4;
      const input = e.target as HTMLInputElement;
      if (input.value.length > maxLength) {
        console.log('in')
          input.value = input.value.slice(0, maxLength);
      }
      const otpValue = e.target.value;
      if(otpValue.length <=0 && otpValue != '0'){
        console.log('less')

        setOtp(undefined)
        return
      }
      if (/^\d+$/.test(input.value)) {
        setOtp(input.value); 
      } else {
        toast.error('Enter a valid OTP');
      }
        return
      
    } catch (error) {
      console.log(error)
    }
      
  }
// vvvvvvvvv
  const verifyOtp = async()=>{
    console.log('otp :',otp)
    try {
      if (otp?.toString()?.length !== 4) {
        toast.error("OTP is invalid");
        return;
      }
      const res = await VerifyOtp(Number(otp))
      if(res?.data?.success){
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resendOtpHandler = async()=>{
    console.log('otp :',otp)
    try {
      const resendOtpResponse = await ResendOtp()
      if(resendOtpResponse?.success){
          toast.success('Otp send successfully !')
          setResendOtp(false)
          setTimer(59)
        } else {
          toast.error(resendOtpResponse?.data?.message)
        }

    
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-white">
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
                <p className="text-gray-600 text-center mb-4">Otp send to </p> <p className='text-center font-semibold'> {otpEmail}</p>

                    <div className='flex flex-col items-center'> 
                    <label htmlFor="otpId">Enter your otp </label>
                    <input type="text" name="otp" onInput={handleChangeOtp} value={otp??''}  className= ' text-black rounded-lg  bg-white' id="otpId"
                     />
                    </div>
               
                <div className="flex items-center flex-col justify-between mb-6">
                    <p className="text-gray-600 text-sm">Didn't receive code?</p>
                    <div className="flex items-center space-x-2">
                        {!resendOtp && (
                <p>
              <button className="px-3 py-2 text-sm font-medium text-center rounded text-gray-500 hover:text-green-500">Request Again (00:00:{seconds < 10 ? `0${seconds}` : seconds})</button>
                </p>
              )}
                    </div>
                </div>
                   {
                !resendOtp ?
                  (<button onClick={verifyOtp} className="w-full px-4 py-2 text-lg font-medium text-white bg-green-800 rounded-md hover:bg-green-900">Verify</button>)
                  : (<button onClick={resendOtpHandler}  className="w-full px-4 py-2 text-lg font-medium text-white bg-green-800 rounded-md hover:bg-green-900">Resend otp</button>)
                   }
            </div>
        </div>
    );
};

export default OTPVerification;
