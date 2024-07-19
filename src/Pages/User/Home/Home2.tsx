import React, { useEffect, useRef, useState } from 'react';
import SinglePost from '../../../Components/User/Home/SinglePost';
import SuggestionContainer from '../../../Components/User/Container/SuggestionContainer';
import Suggestion from '../../../Components/User/Profile/Suggestion';
import './Home.css';
import { getAllPosts, getSavedPosts } from '../../../Api/user/postApiMethod';
import { setLoadedPosts, setSavedPosts } from '../../../Store/user/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';
import { PostI } from '../../../Types/User/Post';
import { HashLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDarkMode } from '@/Context/DarkModeContext';
import Layout from '@/Layout';
import ProfileDataInterface from '@/Types/User/userProfile';
import { FetchSuggestedUsers } from '@/Api/user/userApiMethod';



const Home2: React.FC = () => {
  const openEditor = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<PostI | undefined>();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [suggestedUser,setSuggestedUsers] = useState<ProfileDataInterface[]>([])
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();



  const loadedPostsFromRedux: PostI[] = useSelector((state: RootState) => state?.post?.loadedPosts);
  const [loadedPosts, setLoadedPostsState] = useState<PostI[]>([]);
  const [page, setPage] = useState<number>(1);


  useEffect(()=> {
    fetchSuggestedUsers()
  },[])

  useEffect(() => {
    console.log(selectedPost)
    setPageLoading(true);
    if (page === 1) fetchPosts(1);
    setPageLoading(false);
    fetchSavedPosts();
  }, []);

     const fetchSuggestedUsers = async()=>{
      try {
        const response = await FetchSuggestedUsers()
        if(response.success){
          setSuggestedUsers(response?.users)
        }
      } catch (error) {
        console.log(error)
      }
     }
      
  const fetchPosts = async (page: number) => {
    try {
      // setLoading(true);
      const allPosts = await getAllPosts(page, 3);
      if (allPosts.success) {
        const newPosts = allPosts.postData;
        setLoadedPostsState((prevLoadedPosts) => prevLoadedPosts.concat(Array.from(newPosts)));
        dispatch(setLoadedPosts([...loadedPostsFromRedux, ...newPosts]));

        if (newPosts.length < 3) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      
      setHasMore(false);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const response = await getSavedPosts();
      if (response.success) {
        dispatch(setSavedPosts(response?.savedPosts.savedPosts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMorePosts = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setTimeout(async () => {
      await fetchPosts(newPage);
    }, 3000);
  };

  if (pageLoading) {
    return (
      <div className="flex min:w-full justify-center items-center min-h-screen">
        {pageLoading && <HashLoader color="#36d7b7" />}
      </div>
    );
  }

  return (
    <>
     <Layout>
     <div className=' flex dark:bg-gray-900 bg-white'>
   

        <div className="md:ml-auto">
          <div
            id="post-container"
            className={`md:w-fit w-screen md:mr-auto ${
              isDarkMode ? 'bg-gray-900' : 'bg-stone-300'
            } md:bg-transparent bg-opacity-50 overflow-y-auto no-scrollbar`}
          >
            <InfiniteScroll
              dataLength={loadedPosts.length}
              next={fetchMorePosts}
              hasMore={hasMore}
              loader={
                <div className="flex h-screen justify-center items-center py-4">
                  <HashLoader color="#36d7b7" />
                </div>
              }
              endMessage={
                <p className="text-center text-green-500 py-4">
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {loadedPosts?.map((post, index) => (
                <SinglePost
                  setSelectedPost={setSelectedPost}
                  key={index}
                  postData={post}
                  openEditor={openEditor}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>

        <div className="hidden lg:block md:hidden mr-auto ml-auto">
          {suggestedUser?.length && (
            <SuggestionContainer>
              {suggestedUser.map((suggestedUser, index) => (
                <Suggestion user={suggestedUser} key={index} />
              ))}
            </SuggestionContainer>
          )}
        </div>
      </div>
   </Layout>
     
    </>
  );
};

export default Home2;
