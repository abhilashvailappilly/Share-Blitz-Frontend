import { useDarkMode } from "@/Context/DarkModeContext";
import ProfileDataInterface from "@/Types/User/userProfile";
import { useChatStore } from "@/ZustandStore/chatStore";

interface ListUsersSidebarInterface {
    user: ProfileDataInterface;
    doFunction: (user: ProfileDataInterface) => void;
}

const ListUsersSidebar = ({ user, doFunction }: ListUsersSidebarInterface) => {
    const { isDarkMode } = useDarkMode();
    const selectedUser = useChatStore((state) => state.selectedUser);

    const onlineUsers = useChatStore((state) => state.onlineUsers);
    const isOnline = onlineUsers.includes(user?._id);
    const isSelected = selectedUser?._id === user._id;

    return (
        <li
            key={user._id}
            onClick={() => doFunction(user)}
            className={`p-2 cursor-pointer mt-1 ${
                isDarkMode
                    ? isSelected
                        ? 'bg-gray-800 text-white'
                        : 'hover:bg-gray-800 text-white'
                    : isSelected
                    ? 'bg-gray-200 text-black'
                    : 'hover:bg-gray-200 text-black'
            } hover:rounded-xl relative rounded-xl`}
        >
            <div className={`w-full h-15 flex p-2 items-center gap-3 transition duration-200`}>
                <div className="rounded-full w-12 h-10 overflow-hidden border-2 border-white shadow-md relative">
                    <img src={user?.profileImageUrl} className="w-full h-full object-cover" alt="User Profile" />
                </div>
                <div className="flex flex-col w-full">
                    <span
                        className={`font-semibold flex gap-4 items-center justify-between w-full ${
                            isDarkMode ? 'text-white' : 'text-black'
                        }`}
                    >
                        {user.name}
                        {isOnline && (
                            <div className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        @{user.userName}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default ListUsersSidebar;
