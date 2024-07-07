import React, { useEffect, useRef, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDarkMode } from '../../../Context/DarkModeContext';
import ReCAPTCHA from 'react-google-recaptcha'; 
import upload from '../../../hooks/Cloudinary';
import { IsRequestedVerification, SubmitPaymentDetails, SubmitVerification } from '../../../Api/user/userApiMethod';
import ListPendingRequest from '../Verification/ListPendingRequest';


declare global {
    interface Window {
        Razorpay: any;
    }
}
interface PlanAmounts {
    '10 days': number;
    '20 days': number;
    '30 days': number;
}

const Verification = () => {
    const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHE_KEY;
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('');
    const [requestedVerification, setRequestedVerification] = useState(false);
    const [verificationData, setVerificationData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode } = useDarkMode();
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [validationError, setValidationError] = useState({ image: "", captcha: "" });

    // const handlePaymentCompletion = () => {
    //     setPaymentCompleted(true);
    // };

    useEffect(() => {
        console.log('ver', verificationData);
    }, [verificationData]);

    useEffect(() => {
        fetchVerificationStatus();
    }, []);

    const fetchVerificationStatus = async () => {
        try {
            setIsLoading(true);
            const response = await IsRequestedVerification();
            if (!response.success) return
            setRequestedVerification(response?.verificationStatus);
            if (response?.verificationStatus) {
                setVerificationData(response?.verificationData);
                setPaymentCompleted(response?.verificationData.payment.paymentStatus);
                setPaymentCompleted(response?.verificationData.payment.paymentStatus);
                setVerificationStatus(response?.verificationData.verificationStatus);
                // setVerificationStatus('Approved');

            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Invalid file type. Please select an image.');
                e.target.value = '';
                setFile(null);
                setFilePreview(null);
                return;
            }
            setFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input value
        }
    };

    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);

        if (!file) {
            setValidationError(prevState => ({
                ...prevState,
                image: "Image is required"
            }));
            setTimeout(() => {
                setValidationError({ image: "", captcha: "" });
            }, 2000);
            return;
        }

        if (!recaptchaToken) {
            setValidationError(prevState => ({
                ...prevState,
                captcha: "Select captcha"
            }));
            setTimeout(() => {
                setValidationError({ image: "", captcha: "" });
            }, 2000);
            return;
        }

        try {
            const uploadResponse = await upload(filePreview as string, (error: string) => {
                if (error !== "upload_success") {
                    toast.error(`Image upload failed: ${error}`);
                    throw new Error(error);
                }
            });

            if (uploadResponse) {
                console.log("Uploaded Image URL:", uploadResponse.secure_url);
            }

            const idUrl = uploadResponse.secure_url;
            const response = await SubmitVerification(idUrl);

            if (!response.success) {
                return toast.error(response.message);
            }
            setVerificationStatus("Pending")
            setVerificationData(response?.userData)
            setRequestedVerification(true);
            toast.success("Verification submitted successfully");
        } catch (error) {
            console.error("Verification submission failed:", error);
        } finally {
            setIsLoading(false);
            setFile(null);
            setFilePreview(null);
            setRecaptchaToken(null);
            setValidationError({ image: "", captcha: "" });
        }
    };

    ///////////////////////////////////////////////////////////////////////////

    const [selectedPlan, setSelectedPlan] = useState<keyof PlanAmounts | ''>('');
    const planAmounts :PlanAmounts  = {
        '10 days': 100 * 100, // Amount in paise
        '20 days': 200 * 100,
        '30 days': 300 * 100,
    };
    const handlePaymentCompletion = () => {

      if(!selectedPlan)
      return  toast.info("Select a Plan")
      handleRazorpay(planAmounts[selectedPlan])
    //   setPaymentCompleted(true);
    }; 

    const handleRazorpay = (amount : number)=>{
       
        if(!selectedPlan)
            return
   
        const options = {
            key: RAZORPAY_KEY_ID, 
            amount: amount,
            currency: "INR",
            name: "SHARE BLITZ",
            description: "Test Transaction",
            handler: function (response: { razorpay_payment_id: any; }) {
                setPaymentCompleted(true);
                submitPaymentDetails(response.razorpay_payment_id, selectedPlan);
            },
            prefill: {
                name: "Abhilash v s",
                email: "abhilash@gmail.com",
                contact: "9999999999"
            },
            notes: {
                address: "Your Address"
            },
            theme: {
                color: "#3399cc"
            }
        };
 
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
            // Logic to handle payment failure
            console.log(response)
            toast.error('Payment Failed');
        rzp1.close();

        });

        rzp1.open();
    }
    const submitPaymentDetails = async (paymentId: any, plan: string) => {
        try {
            const response = await SubmitPaymentDetails(paymentId,plan)
            console.log("submit payment details ;",response)
            if(response.success){

                toast.success(" Verification  completed")
                setPaymentCompleted(true)
            }
                return toast.error(response?.message)
         

        
        } catch (error) {
            console.error('Error saving payment details:', error);
            toast.error('Error saving payment details');
        }
    };
    const handlePlanSelection = (plan: keyof PlanAmounts | "") => {
      setSelectedPlan(plan);
    };
    //////////////////////////////////////////////////////////////

    if (isLoading) {
        return (
            <div className="flex w-full justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center w-full h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-3xl mb-8">Account Verification</h2>

            {!requestedVerification ? (
                <div className={`bg-white dark:bg-gray-800 p-8 rounded shadow-2xl w-full max-w-lg`}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="idPicture" className="block text-gray-700 dark:text-gray-300 mb-2">
                                Upload ID Picture:
                            </label>
                            <input
                                type="file"
                                id="idPicture"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                                ref={fileInputRef}
                            />
                            <span className='text-red-700'>{validationError.image}</span>
                        </div>

                        {filePreview && (
                            <div className="mb-4">
                                <img src={filePreview} alt="ID Preview" className="mb-4 w-40 h-40" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="p-2 bg-red-500 text-white rounded"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}

                        <div className="mb-4">
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_SITE_KEY}
                                onChange={handleRecaptchaChange}
                            />
                            <span className='text-red-700'>{validationError.captcha}</span>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-green-600 text-white rounded"
                        >
                            Verify Account
                        </button>
                    </form>
                </div>
            ) : (
                verificationStatus === 'Pending' ? (
                    <ListPendingRequest verificationData={verificationData}/>
                ) : ( 
                    <div className={`w-full h-2/3 rounded shadow-2xl ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-green-100 text-green-700'}`}>
                        <div className="w-full flex items-center justify-center font-bold text-green-600 dark:text-green-400">
                            <h1>Verification completed </h1>
                        </div>
                        <div className="mb-4 h-full flex flex-col justify-center ">
                            {!paymentCompleted ? (
                                <div>
                                    <label className="block font-semibold mb-2">Complete Payment:</label>
                                <div className="flex justify-around mb-4 ">
                                    <div
                                    className={`p-4 mr-2 border rounded-lg cursor-pointer ${selectedPlan === '10 days' ? 'border-blue-600  border-4' : ''}`}
                                    onClick={() => handlePlanSelection('10 days')}
                                    >
                                    <h3 className="text-xl font-bold">10 Days Plan</h3>
                                    <p>$10</p>
                                    </div>
                                    <div
                                    className={`p-4 mr-2 border rounded-lg cursor-pointer ${selectedPlan === '20 days' ? 'border-blue-600 border-4' : ''}`}
                                    onClick={() => handlePlanSelection('20 days')}
                                    >
                                    <h3 className="text-xl font-bold">20 Days Plan</h3>
                                    <p>$20</p>
                                    </div>
                                    <div
                                    className={`p-4 border rounded-lg cursor-pointer ${selectedPlan === '30 days' ? 'border-blue-600  border-4' : ''}`}
                                    onClick={() => handlePlanSelection('30 days')}
                                    >
                                    <h3 className="text-xl font-bold">30 Days Plan</h3>
                                    <p>$30</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handlePaymentCompletion}
                                    className="w-full p-2 bg-blue-600 text-white rounded"
                                    // disabled={!selectedPlan}
                                >
                                    Complete Payment
                                </button>
                                </div>
                            ) : (
                                <>
                               
                                <div className="text-center mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-600 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 1a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM5 9a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1zm1 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-lg text-blue-600 font-semibold mb-2">Account Verified</p>
                                    <p className="text-gray-700">Your account has been successfully verified.</p>
                                </div>
                            </>
                            
                            )}
                            
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Verification;


