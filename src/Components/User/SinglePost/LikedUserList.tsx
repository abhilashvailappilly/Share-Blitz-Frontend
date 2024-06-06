import React, { useEffect, useState } from 'react';
import { getUserById } from '../../../Api/admin/adminApiMethod';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FollowUser, UnFollowUser, checkIsFriend } from '../../../Api/user/userApiMethod';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/store';

interface LikedUserListProps {
    userId: string;
    index: number;
}

const LikedUserList = ({ userId, index }: LikedUserListProps) => {
    const [userData, setUserData] = useState<ProfileDataInterface | null>(null);
    const [isFriend, setIsFriend] = useState<Boolean>(false);
    const [isOwner, setIsOwner] = useState<Boolean>(false);
    const [isPrivate, setIsPrivate] = useState<Boolean>(false);
    const user = useSelector((state: RootState) => state.auth.userInfo);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        if (user?._id === userId) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userData) {
            checkFriend();
            setIsPrivate(userData?.isPrivate);
        }
    }, [userData]);

    const fetchUserDetails = async () => {
        const response = await getUserById(userId);
        if (!response.success) return;
        setUserData(response.user);
    };

    const checkFriend = async () => {
        if (!userData?._id) return;
        const response = await checkIsFriend(userData._id);
        if (!response.success) return;
        setIsFriend(response.isFriend);
    };

    const handleClick = () => {
        navigate(`/profile/${userData?._id}`);
    };

    const handleFollow = async () => {
        if (!userData?._id) {
            return toast.error("User Id not available");
        }
        const follow = await FollowUser(userData._id);
        if (follow.success) {
            toast.success("Followed user");
            setIsFriend(true);
        } else {
            toast.error(follow.message);
        }
    };

    const handleUnfollow = async () => {
        if (!userData?._id) {
            return toast.error("User Id not available");
        }
        const unfollow = await UnFollowUser(userData._id);
        if (unfollow.success) {
            toast.success("Unfollowed user");
            setIsFriend(false);
        } else {
            toast.error(unfollow.message);
        }
    };

    const handleRequest = () => {
        // Handle request logic here
        toast.info('Request sent');
    };

    return (
        <li
            onClick={handleClick}
            className="flex items-center justify-between border-2 mt-4 border-gray-200 rounded-lg py-4 px-4 transition duration-300 hover:cursor-pointer hover:bg-gray-300 hover:shadow-2xl shadow-xl"
        >
            {userData && (
                <>
                    <div className="flex items-center">
                        <img
                            src={userData.profileImageUrl}
                            alt={userData.userName}
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                            <strong className="text-gray-800">{userData.name}</strong>
                            <br />
                            <span className="text-gray-500">{userData.userName}</span>
                        </div>
                    </div>
                    {!isFriend && !isOwner && (
                        <>
                            {!isPrivate && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents li onClick from triggering
                                        handleFollow();
                                    }}
                                    className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300"
                                >
                                    Follow
                                </button>
                            )}
                            {isPrivate && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents li onClick from triggering
                                        handleRequest();
                                    }}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-full hover:bg-yellow-600 transition duration-300"
                                >
                                    Request
                                </button>
                            )}
                        </>
                    )}
                    {isFriend && !isOwner && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents li onClick from triggering
                                handleUnfollow();
                            }}
                            className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-300"
                        >
                            Unfollow
                        </button>
                    )}
                </>
            )}
        </li>
    );
};

export default LikedUserList;
