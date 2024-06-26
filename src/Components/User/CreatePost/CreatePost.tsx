import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditUserPost, getPostById } from '../../../Api/user/postApiMethod';
import { PostI } from '../../../Types/User/Post';
import { toast } from 'react-toastify';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { SearchUser } from '../../../Api/user/userApiMethod';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import * as Yup from 'yup';
import upload from '../../../hooks/Cloudinary';
import { HashLoader } from 'react-spinners';
import useAppSelector from '../../../hooks/UseSelector';
import UserList from '../EditPost/UserList';
import { createPost } from '@/Api/user/authApiMethod';
import CropImage from '@/Components/options/CropImage';

interface TaggedUser {
  userId: string;
  userName: string;
}

const EditPost = () => {
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const [isLoading,setIsLoading] = useState(true)
  const [taggedUserQuery, setTaggedUserQuery] = useState('');
  const [userSuggestions, setUserSuggestions] = useState<ProfileDataInterface[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [hovering, setHovering] = useState(true);
  const [newHashtag, setNewHashtag] = useState('');
  const { postId } = useParams();
  const [inputFocused, setInputFocused] = useState(false);
  const [postData, setPostData] = useState<PostI | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [error, setError] = useState<string>(""); 
  const [showCrop,setShowCrop] = useState<boolean>(false)

  const navigate = useNavigate()

  const [initialFormValues, setInitialFormValues] = useState({
    caption: '',
    hashtags: [] as string[],
    taggedUsers: [] as TaggedUser[],
  });

  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }



  useEffect(() => {
    // fetchPostData();
    setIsLoading(false)
  }, []);

//   const fetchPostData = async () => {
//     try {
//       const response = await getPostById(postId);
//       if (!response.success) return <NotFound />;
//       setPostData(response.postData);
//       setInitialFormValues({
//         caption: response.postData?.caption || '',
//         hashtags: response.postData?.hashtags || [],
//         taggedUsers: response.postData?.taggedUsers || [],
//       });
//       setFilePreview(response.postData?.imageUrl || null);
//       setIsLoading(false)
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more MIME types if needed
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please select an image.');
        e.target.value = '';
        setFile(null);
        setFilePreview(null);
        return
      }
      setFile(file);
      setFilePreview(URL.createObjectURL(file));
      setShowCrop(true)
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setFilePreview(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
  };

  const handleAddHashtag = (values: { caption?: string; hashtags: any; taggedUsers?: TaggedUser[]; }, setFieldValue: { (field: string, value: any, shouldValidate?: boolean | undefined): Promise<void | FormikErrors<{ caption: string; hashtags: string[]; taggedUsers: TaggedUser[]; }>>; (arg0: string, arg1: any[]): void; }) => {
    if (newHashtag.trim() !== '') {
      setFieldValue('hashtags', [...values.hashtags, newHashtag.trim()]);
      setNewHashtag('');
    }
  };

 

  const handleRemoveHashtag = (index: number, values: { caption?: string; hashtags: any; taggedUsers?: TaggedUser[]; }, setFieldValue: { (field: string, value: any, shouldValidate?: boolean | undefined): Promise<void | FormikErrors<{ caption: string; hashtags: string[]; taggedUsers: TaggedUser[]; }>>; (arg0: string, arg1: any): void; }) => {
    setFieldValue('hashtags', values.hashtags.filter((_: any, i: any) => i !== index));
  };
  
  const handleAddTaggedUser = (user: ProfileDataInterface, values: { caption?: string; hashtags?: string[]; taggedUsers: any; }, setFieldValue: { (field: string, value: any, shouldValidate?: boolean | undefined): Promise<void | FormikErrors<{ caption: string; hashtags: string[]; taggedUsers: TaggedUser[]; }>>; (arg0: string, arg1: any[]): void; }) => {
    setInputFocused(false);
    if (!values.taggedUsers.find((u: { userId: any; }) => u.userId === user._id)) {
      setFieldValue('taggedUsers', [...values.taggedUsers, { userName: user.name, userId: user._id }]);
      setTaggedUserQuery('');
      setUserSuggestions([]);
    }
  };
  

  const handleRemoveTaggedUser = (index: number, values: { caption?: string; hashtags?: string[]; taggedUsers: any; }, setFieldValue: { (field: string, value: any, shouldValidate?: boolean | undefined): Promise<void | FormikErrors<{ caption: string; hashtags: string[]; taggedUsers: TaggedUser[]; }>>; (arg0: string, arg1: any): void; }) => {
    setFieldValue('taggedUsers', values.taggedUsers.filter((_: any, i: any) => i !== index));
  };

  const debouncedFetchUserSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim() !== '') {
        const suggestions = await SearchUser(query);
        setUserSuggestions(suggestions.users);
      } else {
        setUserSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchUserSuggestions(taggedUserQuery);
  }, [taggedUserQuery, debouncedFetchUserSuggestions]);

  const validationSchema = Yup.object({
    caption: Yup.string().required('Caption is required'),
    hashtags: Yup.array().of(Yup.string()),
    taggedUsers: Yup.array().of(
      Yup.object({
        userId: Yup.string().required(),
        userName: Yup.string().required(),
      })
    ),
  });

  const handleSubmit = async (postData: any) => {
    if (file) {
      try {
        setIsLoading(true)
        const uploadResponse = await upload(croppedImg as string, (error: string) => {
          if (error !== "upload_success") {
            toast.error(`Image upload failed: ${error}`);
          }
        });
        setIsLoading(false)

        if (uploadResponse) {
          console.log("Uploaded Image URL:", uploadResponse.secure_url);
          postData.imageUrl = uploadResponse.secure_url; // Update the form values with the uploaded image URL
        }
      } catch (error) {
        console.error('File upload failed:', error);
        toast.error('File upload failed. Please try again.');
        setIsLoading(false)
        return;
      }
    }

    const createpost = await createPost(postData)
    if(!createpost.success)
      return toast.error(createpost.message)
    toast.success("Post created successfully")
    navigate(`/home`)
     setIsLoading(false)

  };

  const setSelectedImg =()=>{
    toast.info('set selcted img')
    setShowCrop(!showCrop)

  }

if(isLoading){
 return (
    <div className="flex justify-center items-center min-h-screen">
       <HashLoader color="#36d7b7" />
    </div>
  )
}
  return (
    <div className="w-full mb-28 ml-2  min-h-screen  bg-gray-200 dark:bg-slate-600 flex flex-col justify-center items-center">
       {showCrop && filePreview ? (
        <CropImage
          imgUrl={filePreview}
          aspectInit={{ value: 1 / 1 }}
          setCroppedImg={setCroppedImg}
          setimgSelected={setSelectedImg}
        />
      ) : null}
      <h3 className="text-2xl underline font-extrabold dark:text-white text-black mb-4">Edit Post</h3>
  
      <Formik
  initialValues={initialFormValues}
  validationSchema={validationSchema}
  enableReinitialize={true}
  onSubmit={handleSubmit}
>
  {({ values, setFieldValue }) => (
    <Form className="bg-white dark:bg-gray-800 p-6  rounded shadow-md w-3/4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-4">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300  font-bold">Caption</label>
          <Field
            type="text"
            name="caption"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-gray-300"
          />
          <ErrorMessage name="caption" component="div" className="text-red-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold">Hashtags</label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-gray-300"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
            />
            <button
              type="button"
              className="ml-2 bg-green-500 text-white p-2 rounded mt-1"
              onClick={() => handleAddHashtag(values, setFieldValue)}
            >
              <AiOutlineCheck />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {values.hashtags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
              >
                #{tag}
                <AiOutlineClose
                  className="ml-1 cursor-pointer"
                  onClick={() => handleRemoveHashtag(index, values, setFieldValue)}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300  font-bold">Tagged Users</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-gray-300"
              value={taggedUserQuery}
              onFocus={() => setInputFocused(true)}
              onChange={(e) => setTaggedUserQuery(e.target.value)}
            />
            {userSuggestions.length > 0 && inputFocused && (
              <ul className="absolute left-0 right-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded mt-1 max-h-40 overflow-y-auto no-scrollbar z-10">
                <UserList users={userSuggestions} doFunction={(user) => handleAddTaggedUser(user, values, setFieldValue)} />
              </ul>
            )}
          </div>
          <div className="mt-2 flex flex-wrap">
            {values.taggedUsers.map((user, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
              >
                @{user.userName}
                <AiOutlineClose
                  className="ml-1 cursor-pointer"
                  onClick={() => handleRemoveTaggedUser(index, values, setFieldValue)}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 pl-4">
        <div className="mb-4 relative">
          {filePreview && (
            <div className="relative">
              <div className='w-full h-44 '>
                <img
                  src={croppedImg || ''}
                  alt="Selected file preview"
                  className="w-full  h-full mb-4 object-fit rounded"
                />
              </div>
              {hovering && (
                <button
                  type="button"
                  className="absolute top-0 left-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded"
                  onClick={handleDeleteImage}
                >
                  Delete
                </button>
              )}
            </div>
          )}
          <label className="block text-gray-700 dark:text-gray-300  font-bold mt-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-gray-300"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
          Add Post
        </button>
      </div>
    </Form>
  )}
</Formik>

    </div>
  );
};

export default EditPost;