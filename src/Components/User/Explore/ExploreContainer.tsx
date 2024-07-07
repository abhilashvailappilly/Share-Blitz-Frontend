import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../Api/user/postApiMethod';
import { PostI } from '../../../Types/User/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HashLoader } from 'react-spinners';
import SinglePost from './SinglePost';

const ExploreContainer: React.FC = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [_loading, setLoading] = useState<boolean>(true);
  const [loadedPosts, setLoadedPostsState] = useState<PostI[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
  
    if (page === 1) fetchPosts(1);
    setPageLoading(false);
  }, []);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const allPosts = await getAllPosts(page, 5);
      if (allPosts.success) {
        const newPosts = allPosts.postData;
        setLoadedPostsState((prevLoadedPosts) => prevLoadedPosts.concat(newPosts));
        setLoadedPostsState((prevLoadedPosts) => prevLoadedPosts.concat(newPosts));
        setLoadedPostsState((prevLoadedPosts) => prevLoadedPosts.concat(newPosts));
        setLoadedPostsState((prevLoadedPosts) => prevLoadedPosts.concat(newPosts));
        setLoadedPostsState((prevLoadedPosts) => prevLoadedPosts.concat(newPosts));

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
    } finally {
      setLoading(false);

    }
  };

 

  const fetchMorePosts = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setTimeout(async () => {
      await fetchPosts(newPage);
    }, 1000);
  };

  // const getRandomHeight = (): string => {
  //   const minHeight = 200;
  //   const maxHeight = 600;
  //   const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  //   return `${height}px`;
  // };

  if(pageLoading){
    return(
      <div className="flex h-screen justify-center items-center py-4">
          <HashLoader color="#36d7b7" />
        </div>
    )
  }

  return (
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loadedPosts.map((post, postIndex) => (
     <SinglePost post={post} index = {postIndex} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ExploreContainer;
