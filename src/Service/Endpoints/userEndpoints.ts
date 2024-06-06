import { checkIsFriend } from "../../Api/user/userApiMethod";

const userRoutes={
    followUser:"/user/followUser",
    unFollowUser:"/user/unFollowUser",
    getConnections :'/user/getConnections',
    checkIsFriend:'/user/checkIsFriend',
    searchUser:'user/searchUser'
}

export default userRoutes;