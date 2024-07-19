import { useState, useEffect } from "react";
import SearchIcon from "../../icons/SearchIcon"; // Assuming SearchIcon component exists
import { SearchUser } from "../../../Api/user/userApiMethod";
import UserList from "../Card/Userlist";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // Adjust type based on your data structure
    const navigate = useNavigate()
 
  const seeProfile = (userId : string ) => {
    navigate(`/profile/${userId}`)
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (searchInput.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const response = await SearchUser(searchInput);
        if (response.success) {
          setSearchResults(response.users);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setSearchResults([]);
      }
    };

    const debounceFetch = setTimeout(fetchUserDetails, 300); 

    return () => clearTimeout(debounceFetch); 
  }, [searchInput]);

  return (
    <div className=" mt-5 w-full h-1/4 flex flex-col justify-between items-center p-2 bg-white dark:bg-gray-900 search-container">
      {/* Search Input */}
      <div className="search-input-container flex items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input rounded-2xl py-2 px-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Search user..."
        />
        <SearchIcon className="search-icon ml-2 hover:cursor-pointer" />
      </div>

      {/* Search Results */}
      <div className="search-results  w-full flex flex-col items-center justify-center mt-4 ">
        {searchResults.length > 0 ? (
          <ul className="user-list list-none w-3/4 ">
            <UserList users={searchResults}  seeProfile={seeProfile} />

            {/* {searchResults.map((user) => (
              <li key={user.id} className="user-item w-5/6 flex mt-3 bg-white items-center py-2 px-4 rounded-lg hover:bg-gray-100 hover:scale-110">
              <UserList users={user}/>
              </li>
            ))} */}
          </ul>
        ) : (
          <p className="no-results text-center text-gray-500 py-4">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
