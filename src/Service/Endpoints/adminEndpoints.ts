
const adminRoutes={
    
    getAllUsers:'/admin/getAllUsers',
    getAllPosts:'/admin/getAllPosts',
    tooglePostIsBlocked:'/admin/tooglePostIsBlocked',
    toogleUserStatus:'/admin/toogleUserStatus',
    getAllReportedPosts:'/admin/getAllReportedPosts',
    getReportsByPostId:'/admin/getReportsByPostId',
    getUserById : '/admin/getUserById',
    getPostById : '/admin/getPostById',
    changeActionStatus:"/admin/changeActionStatus",
    deletePost :'/admin/deletePost',
    getVerificationData:'/admin/getVerificationData',
    approveVerificationRequest:'/admin/approveVerificationRequest',
    cardsData : '/admin/dashboard/cardsData',

}

export default adminRoutes;