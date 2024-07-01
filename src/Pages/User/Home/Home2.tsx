import React, { useEffect, useRef, useState } from 'react';
import SinglePost from '../../../Components/User/SinglePost/SinglePost';
import SuggestionContainer from '../../../Components/User/Container/SuggestionContainer';
import Suggestion from '../../../Components/User/Profile/Suggestion';
import Navbar from '../../../Components/User/Navbar/Navbar';
import './Home.css';
import { getAllPosts, getSavedPosts } from '../../../Api/user/postApiMethod';
import { setLoadedPosts, setSavedPosts } from '../../../Store/user/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2';
import { PostI } from '../../../Types/User/Post';
import { HashLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAppSelector from '@/hooks/UseSelector';
import { useDarkMode } from '@/Context/DarkModeContext';
import Layout from '@/Layout';

interface SuggestionI {
  name: string;
  profilePic: string;
}

const Home2: React.FC = () => {
  const openEditor = useRef<HTMLDivElement>(null);
  const closeEditor = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<PostI | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();

  const suggestions: SuggestionI[] = [
    { name: "test user", profilePic: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
    { name: "test user", profilePic: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
    { name: "test user", profilePic: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
    { name: "test user", profilePic: "https://buffer.com/library/content/images/2023/10/free-images.jpg" },
    { name: "test user", profilePic: "https://buffer.com/library/content/images/2023/10/free-images.jpg" },
    { name: "test user", profilePic: "https://buffer.com/library/content/images/2023/10/free-images.jpg" },
  ];

  const loadedPostsFromRedux: PostI[] = useSelector((state: RootState) => state?.post?.loadedPosts);
  const [loadedPosts, setLoadedPostsState] = useState<PostI[]>([]);
  const [page, setPage] = useState<number>(1);

  const closeLikeModal = useRef<HTMLDivElement>(null);

  const [showPosts, setShowPosts] = useState<boolean>(true);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

  useEffect(() => {
    setPageLoading(true);
    if (page === 1) fetchPosts(1);
    setPageLoading(false);
    fetchSavedPosts();
  }, []);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
     <div className={`flex bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
        {/* <Navbar />
        <Sidebar2 /> */}

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
                <div className="flex justify-center items-center py-4">
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
          {suggestions?.length && (
            <SuggestionContainer>
              {suggestions.map((suggestedUser, index) => (
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
