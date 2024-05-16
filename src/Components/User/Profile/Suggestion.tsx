import React from "react";

interface User {

  name: string;
  profilePic: string;
}

interface SuggestionProps {
  user: User;
}

const Suggestion: React.FC<SuggestionProps> = ({ user }) => {
  return (
    <div className="w-fit h-14 flex mt-4 rounded-3xl">
      {/* User profile image div */}
      <img
        className="w-11 h-11 ml-1 self-center rounded-full"
        src={user?.profilePic}
        alt=""
      />

      <div className="w-56 ml-3 flex self-center">
        {/* User name div */}
        <div className="text-white text-lg font-normal font-['Inika']">
          {user?.name }
        </div>

        {/* Follow or unfollow button div */}
        <div className="w-20 h-7 self-center ml-auto mr-2 bg-slate-700 rounded-2xl flex justify-center items-center hover:bg-slate-800">
          <button className="text-white font-mono text-sm text-center">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
