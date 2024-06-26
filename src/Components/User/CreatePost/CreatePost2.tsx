import React, { useEffect, useRef, useState } from "react";

import bgIcon from "../../../../public/pngwing.com.png";
import CropImage from "../../options/CropImage";
import uploadCloudinary from "../../../hooks/Cloudinary"
import { useDispatch, useSelector } from "react-redux";
// import { postCreatePost } from "../../services/apiMethods";
import { createPost } from "../../../Api/user/authApiMethod";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Loader from "../../icons/Loader";

import "./CreatePost.css";
import { addCreatedPost,updateUserPosts,setLoadedPosts, addNewUserPosts } from "../../../Store/user/postSlice";
import { RootState } from "../../../Store/store";
import { toast } from "react-toastify";
interface CreatePostProps {
  setClose: (value: boolean) => void;
}

 
function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const txtArea = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string>(""); 
  const [selectedImg, setSelectedImg] = useState<boolean>(false); // for image
  const [bg, setBg] = useState<string>(bgIcon);
  const [caption, setCaption] = useState<string>(""); // caption of the post
  const [tag, setTag] = useState<string>(""); // state to set the tag of the post

  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [image, setImage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false); // state to set the loading

  const userData = useSelector((state: RootState) => state.auth.userInfo);


  useEffect(() => {
    clearComponent();
  }, []);

  useEffect(() => {
    setBg(croppedImg || bgIcon);
  }, [croppedImg]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const clearComponent = () => {
    setError("");
    setSelectedImg(false);
    setCaption("");
    setTag("");
    setCroppedImg(null);
    setImage("");
    if (txtArea.current) {
      txtArea.current.value = "";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!croppedImg) {
      toast.error('Please select an image')
      setLoading(false);
      return;
    }
    if(!caption.trim()){
      toast.error("Add Caption")
      setLoading(false);

      return 
    }
    if(!tag.trim()){
      toast.error("Minimum one tag required")
      setLoading(false);

      return
    }

    const saveImage  = await uploadCloudinary(croppedImg, setError);

    if (saveImage) {
      const postData = {
        userId: userData._id,
        imageUrl: saveImage?.url,
        caption: caption,
        hashtags:tag.split(' ')
      };
       let createNewPost = await createPost(postData)
       if(createNewPost.success) {
        toast.success('Post created successfully')
        console.log(createNewPost)
          // dispatch(updateUserPosts(createNewPost.postData));
          // dispatch(setLoadedPosts([createNewPost.postData]));
          dispatch(addCreatedPost([createNewPost.postData]));
          // dispatch(addNewUserPosts(createNewPost.postData));
          clearComponent();
       } else {
        toast.error(createNewPost?.message)
        clearComponent()
        setError(createNewPost.message)
       }
       setLoading(false)

   
    }
  };

  return (
    <>
  <div className="h-full place-items-center grid">
      {selectedImg ? (
        <CropImage
          imgUrl={image}
          aspectInit={{ value: 1 / 1 }}
          setCroppedImg={setCroppedImg}
          setimgSelected={setSelectedImg}
          setErr={setError}
        />
      ) : null}

      <div className="md:flex grid md:gap-16 border border-black gap-10 w-fit h-fit text-white bg-white border-b-8 p-40 m-auto rounded-lg relative">


        <div className="absolute top-10 left-[50%] -translate-x-2/4 text-2xl text-black underline font-semibold font-poppins">Create post</div>
        <div className="w-full h-full flex flex-1 flex-col">
        {!loading ? ( 
        <><div className="w-fit h-fit ">
        <div className="w-full md:w-auto h-auto items-center md:flex-1 relative rounded-md  justify-center">

                <img src={bg} alt="" className="w-28 h-28 self-center " />

                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp, image/jpg"
                  name="image"
                  id="image"
                  placeholder="."
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImage} />
              </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="forForm overflow-scroll no-scrollbar relative rounded-md flex flex-col gap-3">
                  <span className="font-medium text-black 
                   font-poppins">Add a caption</span>
                  <textarea
                    ref={txtArea}

                    name="caption"
                    id="caption"
                    cols={30}
                    rows={8}
                    defaultValue={caption}
                    placeholder="Write a something ...."
                    className="w-full h-full placeholder-slate-300 bg-black top-0 left-0 focus:border-white rounded"
                    onChange={(e) => {
                      setCaption(e.target.value);
                    } } />
                </div>
                <div className="forForm overflow-scroll no-scrollbar relative rounded-md flex flex-col gap-3">
                  <span className="font-medium text-black 
                   font-poppins">Add tags</span>
                   <input type="text"
                   value={tag}
                   onChange={(e)=>setTag(e.target.value)}
                    placeholder="Add tags" name="tag" className="text-white bg-black  focus:border-black rounded-full " />
                  
                </div>

                {error ? (
                  <h3 className="error-msg ml-2 text-red-800">{`! ${error}`}</h3>
                ) : null}

                <div className="ml-auto md:flex text-white text-lg font-normal font-['Inika']">
                  <button
                    className="flex-1 w-28 h-8 bg-red-600 rounded-lg mr-5"
                    onClick={() => {
                      clearComponent();
                      // setClose(true);
                      setSelectedImg(false);
                      setCaption("");
                      setImage("");
                      setCroppedImg("");
                      setError("");
                    } }
                  >
                    Cancel
                  </button>
                  {!loading ? (
                    <button
                      className="flex-1 w-28 h-8 bg-green-800 bg-opacity-100 rounded-lg"
                      onClick={handleSubmit}
                    >
                      Post
                    </button>
                  ) : (
                    <button className=" flex-1 w-28 h-8 bg-red-700  rounded-lg items-center justify-center">
                      {" "}
                      <FaSpinner
                        size={16}


                        className="ml-auto mr-auto rotating-spinner" />
                    </button>
                  )}
                </div>
              </div></>
        ) :  (
          <Loader/>
         
        )}
        </div>
      </div>
    </div>
 
  </>
  );
}

export default CreatePost;
