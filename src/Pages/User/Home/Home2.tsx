import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../../Components/User/Sidebar/Sidebar';

import SinglePost from '../../../Components/User/SinglePost/SinglePost';
import SuggestionContainer from '../../../Components/User/Container/SuggestionContainer';
import Suggestion from '../../../Components/User/Profile/Suggestion';
import Navbar from '../../../Components/User/Navbar/Navbar';
import './Home.css';
import CreatePost from '../../../Components/User/CreatePost/CreatePost2';
import { getAllPosts } from '../../../Api/user/postApiMethod';
import { setLoadedPosts ,clearLoadedPosts} from '../../../Store/user/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2';

interface Post {
    _id:string
    userId:string
    caption:string
    imageUrl:string
    tag:string[] 
}
interface SuggestionI {
 name:string
 profilePic:string
  // likes: string[]; 
}

const Home2: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch()
  const suggestions: SuggestionI[] = [
    {name:"test user",profilePic:"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"}, 
    {name:"test user",profilePic:"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"}, 
    {name:"test user",profilePic:"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"}, 
    {name:"test user",profilePic:"https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"}, 
    {name:"test user",profilePic:"https://buffer.com/library/content/images/2023/10/free-images.jpg"},
    {name:"test user",profilePic:"https://buffer.com/library/content/images/2023/10/free-images.jpg"},
    {name:"test user",profilePic:"https://buffer.com/library/content/images/2023/10/free-images.jpg"},
  ];


  const loadedPosts2 : Post[] =  useSelector((state : RootState) => state?.post?.loadedPosts);
  console.log('........loaded',loadedPosts2)

  const openEditor = useRef<HTMLDivElement>(null);
  const closeEditor = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();
  const [pageSize,setPageSize] = useState<number>(1)

  // Likes
  const likesModal = useRef<HTMLDivElement>(null);
  const closeLikeModal = useRef<HTMLDivElement>(null);
  const [likePost, setLikePost] = useState<Post | undefined>();

  const [isClosed, setIsClosed] = useState(true)


  const [showPosts ,setShowPosts] = useState<boolean>(true)
  const [showCreatePost,setShowCreatePost] = useState<boolean>(false)
  const toogleShowPost = ()=>{
    // toast.success('showpost')

    setShowPosts(!showPosts)
  }
  const toogleShowCreatePost = ()=>{
    // toast.success('createpost')
    setShowCreatePost(!showCreatePost)
  }
  useEffect(()=>{
    
    fetchPosts()
  },[pageSize])
  useEffect(()=>{
  },[pageSize])
  useEffect(() => {
    const unloadListener = () => {
      dispatch(clearLoadedPosts());
    };

    window.addEventListener("beforeunload", unloadListener);

    return () => {
      window.removeEventListener("beforeunload", unloadListener);
    };
  }, [dispatch]);

  const fetchPosts = async () => {
    try {
      setLoading(true); 
      const allPosts = await getAllPosts(pageSize); 
      if(allPosts.success){
        dispatch(setLoadedPosts(allPosts.postData))
      }
     
      setLoading(false); 
      return
    } catch (error) {
      console.log(error); 
      setLoading(false);
    }
  };

 


  return (
    <>
    {/* <div className='dashboard bg-black'> */}

      <div className="flex">
        <Navbar/>
      {/* <Sidebar setShowPost={setShowPosts} setShowCreatePost={setShowCreatePost}/> */}
      <Sidebar2 />
    
       <div className="md:ml-auto">
        {/* <PostContainer> */}
        <div
          id="post-container"
          className="md:w-fit w-screen h-screen md:mr-auto bg-stone-300 md:bg-transparent bg-opacity-50 overflow-scroll no-scrollbar"
        >
       {showPosts &&loadedPosts2?.map((post: Post, index: number) => {
          return (
            <SinglePost
              likeModal={likesModal}
              setLikePost={setLikePost}
              setSelectedPost={setSelectedPost}
              key={index}
              postData={post}
              openEditor={openEditor}
            />
          );
        })}


       </div>
       </div>

      
       
          <div className="hidden lg:block md:hidden mr-auto ml-auto">
        {suggestions?.length && (
          <SuggestionContainer>
              {suggestions.map((suggestedUser, index) => {
                return <Suggestion user={suggestedUser} key={index} />;
              })}
            </SuggestionContainer>
        )}
        </div>
        </div>
       
    </>
  );
};

export default Home2;
