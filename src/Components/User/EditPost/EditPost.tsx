import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditUserPost, getPostById } from '../../../Api/user/postApiMethod';
import NotFound from '../../../Pages/Common/Notfound';
import { PostI } from '../../../Types/User/Post';
import { toast } from 'react-toastify';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { SearchUser } from '../../../Api/user/userApiMethod';
import UserList from './UserList';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import upload from '../../../hooks/Cloudinary';
import { HashLoader } from 'react-spinners';
import { userInfo } from 'os';
import useAppSelector from '../../../hooks/UseSelector';

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
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [hovering, setHovering] = useState(true);
  const [newHashtag, setNewHashtag] = useState('');
  const { postId } = useParams();
  const [inputFocused, setInputFocused] = useState(false);
  const [postData, setPostData] = useState<PostI | null>(null);
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

  if (!postId) {
    return <>notFound</>;
  }

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  const fetchPostData = async () => {
    try {
      const response = await getPostById(postId);
      if (!response.success) return <NotFound />;
      setPostData(response.postData);
      setInitialFormValues({
        caption: response.postData?.caption || '',
        hashtags: response.postData?.hashtags || [],
        taggedUsers: response.postData?.taggedUsers || [],
      });
      setFilePreview(response.postData?.imageUrl || null);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

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
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleAddHashtag = () => {
    if (newHashtag.trim() !== '') {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        hashtags: [...prevValues.hashtags, newHashtag.trim()],
      }));
      setNewHashtag('');
    }
  };

  const handleRemoveHashtag = (index: number) => {
    setInitialFormValues((prevValues) => ({
      ...prevValues,
      hashtags: prevValues.hashtags.filter((_, i) => i !== index),
    }));
  };

  const handleAddTaggedUser = (user: ProfileDataInterface) => {
    setInputFocused(false)
    if (!initialFormValues.taggedUsers.find(u => u.userId === user._id)) {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        taggedUsers: [...prevValues.taggedUsers, { userName: user.name, userId: user._id }],
      }));
      setTaggedUserQuery('');
      setUserSuggestions([]);
    }
  };

  const handleRemoveTaggedUser = (index: number) => {
    setInitialFormValues((prevValues) => ({
      ...prevValues,
      taggedUsers: prevValues.taggedUsers.filter((_, i) => i !== index),
    }));
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
        const uploadResponse = await upload(filePreview as string, (error: string) => {
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

    const editPost = await EditUserPost({postData,postId})
    if(!editPost.success)
      return toast.error(editPost.message)
    toast.success("Post updated successfuly")
    navigate(`/profile/${userInfo._id}`)
     setIsLoading(false)

  };

if(isLoading){
 return (
    <div className="flex justify-center items-center min-h-screen">
       <HashLoader color="#36d7b7" />
    </div>
  )
}
  return (
    <div className="w-full mb-28 ml-2  h-full bg-gray-200 dark:bg-black flex flex-col justify-center items-center">
      <h3 className="text-2xl underline font-extrabold text-green-600 mb-4">Edit Post</h3>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="bg-white p-6 rounded shadow-md w-3/4 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 pr-4">
              <div className="mb-4">
                <label className="block text-gray-700">Caption</label>
                <Field
                  type="text"
                  name="caption"
                  className="w-full p-2 border border-gray-300 dark:text-black rounded mt-1"
                />
                <ErrorMessage name="caption" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Hashtags</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 dark:text-black rounded mt-1"
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-green-500 text-white p-2 rounded mt-1"
                    onClick={handleAddHashtag}
                  >
                    <AiOutlineCheck />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap">
                  {values.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      #{tag}
                      <AiOutlineClose
                        className="ml-1 cursor-pointer"
                        onClick={() => handleRemoveHashtag(index)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tagged Users</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={taggedUserQuery}
                    onFocus={() => setInputFocused(true)}
                    // onBlur={() => setInputFocused(false)}
                    onChange={(e) => setTaggedUserQuery(e.target.value)}
                  />
                  {userSuggestions.length > 0 &&inputFocused && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto no-scrollbar z-10">
                    
                        <UserList users={userSuggestions} doFunction={handleAddTaggedUser} />
                      
                    </ul>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap">
                  {values.taggedUsers.map((user, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      @{user.userName}
                      <AiOutlineClose
                        className="ml-1 cursor-pointer"
                        onClick={() => handleRemoveTaggedUser(index)}
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
                    <img
                      src={filePreview}
                      
                      alt="Selected file preview"
                      className="w-1/2 h-1/2 mb-4 rounded"
                    />
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
                <label className="block text-gray-700">File</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPost;