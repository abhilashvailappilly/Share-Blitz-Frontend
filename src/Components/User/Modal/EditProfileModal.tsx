import React, { useEffect, useState } from 'react';
import IconImageUpload from '../../icons/ImageUploadIcon';
import CropImage from '../../options/CropImage';
import { toast } from 'react-toastify';
import uploadCloudinary from '../../../hooks/Cloudinary';
import { EditUserProfile } from '../../../Api/user/userApiMethod';
import { HashLoader } from 'react-spinners';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';
import { setCredentials } from '../../../Store/user/userSlice';
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}



const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  
  const user:ProfileDataInterface  = useSelector((state:RootState) => state.auth.userInfo)

const [name , setName] = useState<string>(user.name)
const [userName , setUserName] = useState<string>(user.userName) 
const [profileImageUrl, setProfileImageUrl] = useState<string>('')
const [mobile,setMobile] = useState<string>('')
const [email,setEmail] = useState<string>('')
const [bio,setBio] = useState<string>('')
const [dob,setDob] = useState<string>('')

const [image, setImage] = useState<string>("");
const [error, setError] = useState<string>(""); 
const [selectedImg, setSelectedImg] = useState<boolean>(false); // for image
const [croppedImg, setCroppedImg] = useState<string | null>(null);
const [profileImage,setProfileImageDisplay] = useState<string | "" > ("")
const [loading, setLoading] = useState<boolean>(false); // state to set the loading
const dispatch = useDispatch()
const [formError, setFormError] = useState<{ [key: string]: string }>({});

useEffect(()=>{
if(user){
  setProfileImageUrl(user.profileImageUrl)
  setMobile(user.mobile)
  setEmail(user.email)
  setBio(user.bio)
  setDob(user?.dob)
}
},[user])

const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    try {
        if (img) {
            setError("");
            setImage(URL.createObjectURL(img));
            setSelectedImg(true);
          } else {
            setError("Please select a valid image");
          }
    } catch (error:any) {
      setError(error);
    }
  };


  useEffect(() => {
    setProfileImageDisplay(croppedImg || profileImageUrl); // replace from state
  }, [croppedImg]);

  const onSubmit = async () => {
    if(!validateForm()){
      return
    }
    console.log('Form data');
    console.log(croppedImg)
    try {
      setLoading(true);
      let saveImageUrl = profileImageUrl; // Default to current profile image URL

      if (croppedImg) {
        const saveImage = await uploadCloudinary(croppedImg, setError);
        if (saveImage) {
          saveImageUrl = saveImage.url;
        } else {
          toast.error('Image upload failed');
          setLoading(false);
          return;
        }
      }
      

    if (saveImageUrl) {
      const userData = {
        name,
        profileImageUrl: saveImageUrl,
        bio,
        dob,
        userName,
        mobile,
        email,
      };
       let editProfile = await EditUserProfile(userData)
       if( editProfile.success) {
        toast.success('Profile updated successfully')
        console.log( editProfile)
        dispatch(setCredentials(editProfile.userData))
          clearComponent();
          onClose()
       } else {
        toast.error( editProfile?.message)
        clearComponent()
        setError( editProfile.message)
       }
       setLoading(false)

   
    }
    } catch (error) {
      console.log(error)
    }
  };
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Validate Name
    if (!name) {
      errors.name = "Name cannot be empty";
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      errors.name = "Name cannot contain special characters except spaces";
    }

    // Validate Username
    if (!userName) {
      errors.userName = "Username cannot be empty";
    }

    // Validate Mobile
    if (!mobile) {
      errors.mobile = "Mobile number cannot be empty";
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    // Validate DOB
    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    if (!dob) {
      errors.dob = "Date of Birth cannot be empty";
    } else if (dobDate > today) {
      errors.dob = "Date of Birth cannot be in the future";
    } else if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      errors.dob = "You must be at least 18 years old";
    }

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };
  const clearComponent = () => {
    setError("");
    setSelectedImg(false);
    // setCaption("");
    // setTag("");
    setCroppedImg(null);
    setImage("");
    // if (txtArea.current) {
    //   txtArea.current.value = "";
    // }
  };
 
  return (
    
    <div
      id="crud-modal"
      className={`${
        isOpen ? 'block' : 'hidden'
      } overflow-y no-scrollbar  flex overflow-x-hidden  fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      tabIndex={-1}
      
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
     
          {loading ? (
       <div className="flex justify-center items-center min-h-screen">
     <HashLoader color="#36d7b7" />
      </div>
          ) : (

       

        <form className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="Bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profile Image
              </label>
              <div className="w-full flex justify-center items-center border-2 border-black">
                <IconImageUpload className="w-1/2 h-14" />
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp, image/jpg"
                  name="image"
                  id="image"
                  placeholder="."
                  onChange={(event) => handleProfileImageChange(event)}
               
                  className="absolute w-1/2 h-1/4 opacity-0 cursor-pointer"
                />
                <div className="overflow-hidden w-1/2 h-44">
                  <img
                    src={profileImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className='text-red-800 font-4'>{formError.image }</span>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              /><span className='text-red-800 font-4'>{formError.name}</span>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              <span className='text-red-800 font-4'>{formError.userName}</span>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={mobile}
                onChange={(e)=>setMobile(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              <span className='text-red-800 font-4'>{formError.mobile}</span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DOB
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={dob}
                onChange={(e)=>setDob(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              <span className='text-red-800 font-4'>{formError.dob}</span>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <input
                
                name="bio"
                id="bio"
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            </div>
            <button
              type="button" onClick={onSubmit}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Update Profile
            </button>
          </form>

          )}
   
        </div>
      </div>
      {error ? (
                  <h3 className="error-msg ml-2 text-red-800">{`! ${error}`}</h3>
                ) : null}

      {selectedImg ? (
         <div className=" bottom-1 mt-20 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className=" max-w-md bg-white p-4 rounded-lg">
        <CropImage
          imgUrl={image}
          aspectInit={{ value: 1 / 1 }}
          setCroppedImg={setCroppedImg}
          setimgSelected={setSelectedImg}
          setErr={setError}
        />
        </div>

        </div>
      ) : null}


      {/* {isCropOpen && imageSrc && (
        <div className=" w-full mt-20 h-full fixed inset-0 z-50 flex flex-col justify-center items-center bg-black bg-opacity-50">
            <button onClick={()=>setIsCropOpen(!isCropOpen)}>close</button>
          <div className="relative w-full h-full max-w-md bg-white p-4 rounded-lg">

          <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={2}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
            <button onClick={handleCrop} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Crop Image</button>
         </div>
      )} */}


    </div>
  );
};

export default EditProfileModal;
