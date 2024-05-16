// import React, { useEffect, useRef, useState } from "react";

// import bgIcon from "../../../../public/pngwing.com.png";
// import CropImage from "../../options/CropImage";
// import uploadCloudinary from "../../../hooks/Cloudinary"
// import { useDispatch, useSelector } from "react-redux";
// // import { postCreatePost } from "../../services/apiMethods";
// import { createPost } from "../../../Api/user/userApiMethod";
// import { useNavigate } from "react-router-dom";
// import { FaSpinner } from "react-icons/fa";

// import "./CreatePost.css";
// import { addCreatedPost,updateUserPosts } from "../../../Store/user/postSlice";
// import { RootState } from "../../../Store/store";
// interface CreatePostProps {
//   setClose: (value: boolean) => void;
// }

// function CreatePost() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const txtArea = useRef<HTMLTextAreaElement>(null);
//   const [error, setError] = useState<string>(""); // state for setting error occurs
//   const [selectedImg, setSelectedImg] = useState<boolean>(false); //state to set the image selected by client
//   const [bg, setBg] = useState<string>(bgIcon);
//   const [description, setDescription] = useState<string>(""); // state to set the caption of the post

//   const [croppedImg, setCroppedImg] = useState<string | null>(null);
//   const [image, setImage] = useState<string>("");

//   const [loading, setLoading] = useState<boolean>(false); // state to set the loading

// //   const userData = useSelector((state) => state?.user?.userData);
//   const userData = useSelector((state: RootState) => state.auth.userInfo);


//   useEffect(() => {
//     clearComponent();
//   }, []);

//   useEffect(() => {
//     setBg(croppedImg || bgIcon);
//   }, [croppedImg]);

//   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const img = e.target.files?.[0];
//     try {
//         if (img) {
//             setError("");
//             setImage(URL.createObjectURL(img));
//             setSelectedImg(true);
//           } else {
//             setError("Please select a valid image");
//           }
//     } catch (error:any) {
//       setError(error);
//     }
//   };

//   const clearComponent = () => {
//     setError("");
//     setSelectedImg(false);
//     setDescription("");
//     setCroppedImg(null);
//     setImage("");
//     if (txtArea.current) {
//       txtArea.current.value = "";
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     if (!croppedImg) {
//       setError("Please select an image");
//       setLoading(false);
//       return;
//     }

//     const data1  = await uploadCloudinary(croppedImg, setError);

//     if (data1) {
//       const postData = {
//         userId: userData._id,
//         image: 'imae url ',
//         description: description,
//       };

//       createPost(postData).then((response) => {
//         setLoading(false);
//         if (response.status === 200) {
//           dispatch(updateUserPosts(response));
//           dispatch(addCreatedPost(response.post));
//           clearComponent();
//         //   setClose(true);
//         } else if (response.status === 401) {
//           clearComponent();
//           navigate("/login");
//         } else {
//           clearComponent();
//           setError(response.message);
//         }
//       }).finally(() => {
//         clearComponent();
//       });
//     }
//   };

//   return (
//     <>
//       <div className="h-full place-items-center flex flex-1 ">
//         {selectedImg ? (
//           <CropImage
//             imgUrl={image}
//             aspectInit={{ value: 1 / 1 }}
//             setCroppedImg={setCroppedImg}
//             setimgSelected={setSelectedImg}
//             setErr={setError}
//           />
//         ) : null}

//         <div className="md:flex flex-1 order border ml-2 border-black  md:gap-16 gap-10 w-full h-full text-white bg-white-200 p-40 m-auto rounded-lg relative">

//           <div className="absolute top-10 left-[50%] -translate-x-2/4 text-2xl text-black font-semibold font-poppins">Create new post</div>
//           <div className="w-fit h-fit">
//             <div className="bg-white w-full h-full flex-1 relative rounded-md flex justify-center">
//               <img src={bg} alt="" className="w-full h-full self-center " />

//               <input
//                 type="file"
//                 accept="image/jpeg, image/png, image/webp, image/jpg"
//                 name="image"
//                 id="image"
//                 placeholder="image"
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 onChange={handleImage}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col gap-5">
//             <div className="forForm overflow-scroll no-scrollbar relative rounded-md flex flex-col gap-3">
//               <span className="font-medium font-poppins">Add a caption</span>
//               <textarea
//                 ref={txtArea}
//                 name="caption"
//                 id="caption"
//                 cols={30}
//                 rows={8}
//                 defaultValue={description}
//                 placeholder="Write a something ...."
//                 className="w-full h-full placeholder-slate-300 bg-black top-0 left-0 focus:border-white"
//                 onChange={(e) => {
//                   setDescription(e.target.value);
//                 }}
//               />
//             </div>

//             {error ? (
//               <h3 className="error-msg ml-2 text-red-800">{`! ${error}`}</h3>
//             ) : null}

//             <div className="ml-auto flex flex-1 text-white text-lg font-normal font-['Inika']">
//               <button
//                 className="flex-1 w-28 h-8 bg-red-900 bg-opacity-80 rounded-lg mr-5"
//                 onClick={() => {
//                   clearComponent();
//                 //   setClose(true);
//                   setSelectedImg(false);
//                   setDescription("");
//                   setImage("");
//                   setCroppedImg("");
//                   setError("");
//                 }}
//               >
//                 Cancel
//               </button>
//               {!loading ? (
//                 <button
//                   className="flex-1 w-28 h-8 bg-sky-700 bg-opacity-80 rounded-lg"
//                   onClick={handleSubmit}
//                 >
//                   Post
//                 </button>
//               ) : (
//                 <button className=" flex-1 w-28 h-8 bg-sky-700 bg-opacity-80 rounded-lg items-center justify-center">
//                   {" "}
//                   <FaSpinner
//                     size={16}
//                     className="ml-auto mr-auto rotating-spinner"
//                   />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreatePost;
