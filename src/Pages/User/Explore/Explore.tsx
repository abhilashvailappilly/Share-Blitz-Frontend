import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HashLoader } from "react-spinners";

const array = [
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
];

const array2 = [
  { name: "Abhccilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
  { name: "Abhilash" },
];

const Explore = () => {
  const [hasMore, setHasMore] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState(Array.from({ length: 8 }));

  const fetchMorePosts = () => {
    setTimeout(() => {
      if (loadedPosts.length >= array.concat(array2).length) {
        setHasMore(false);
        return;
      }
      setLoadedPosts((prevLoadedPosts) =>
        prevLoadedPosts.concat(Array.from({ length: 2 }))
      );
    }, 3000);
  };

  return (
    <div className="w-full h-[1000px] bg-red-300">
      <h1>Explore</h1>

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
          <p className="text-center py-4">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {loadedPosts.map((_, index) => (
          <div key={index} className="bg-yellow-400 w-full m-3 h-44">
            {index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Explore;
