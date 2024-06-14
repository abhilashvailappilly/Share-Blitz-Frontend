import { checkIsFriend } from "../../Api/user/userApiMethod";

const userRoutes={
    followUser:"/user/followUser",
    unFollowUser:"/user/unFollowUser",
    getConnections :'/user/getConnections',
    checkIsFriend:'/user/checkIsFriend',
    searchUser:'user/searchUser',
    changePrivacy:'user/changePrivacy',
    submitVerification:'user/submitVerification',
    isRequestedVerification:'user/isRequestedVerification',
    submitPaymentDetails:'user/submitPaymentDetails'
}

export default userRoutes;