const authRoutes={
    userSignup:'/auth/createUser',
    userForgotPassword:'/auth/forgotPassword',
    userVerifyOtp:'/api/auth/verifyOtp',
    userVerifyOtpForgotPassword:'/auth/forgetPassword/verifyOtp',
    userResendOtp:'/api/auth/resendOtp',
    userResetPassword:'/auth/resetPassword',
    userLogin:'/auth/login',
    userRefreshAccessToken:'/auth/refreshAccessToken',
    userLogout:'/auth/logout',
    userGsignup:'/auth/gsignup',
    userGlogin:'/auth/glogin',
    userProfile:'/auth/profile',
    userEditProfile:'/auth/editprofile',
    userSendOtp:'/auth/forgetPassword/sendOtp',
    userForgetPasswordVerifyOtp:'/auth/forgetPassword/verifyOtp',
    userForgetPasswordChangePassword:'/auth/forgetPassword/changePassword',
}

export default authRoutes;