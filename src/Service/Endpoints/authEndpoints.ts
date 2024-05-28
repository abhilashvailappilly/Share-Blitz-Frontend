const authRoutes={
    userSignup:'/auth/createUser',
    userForgotPassword:'/auth/forgotPassword',
    userVerifyOtp:'/api/auth/verifyOtp',
    userVerifyOtpForgotPassword:'/auth/verifyOtpForgotPassword',
    userResendOtp:'/api/auth/resendOtp',
    userResetPassword:'/auth/resetPassword',
    userLogin:'/auth/login',
    userLogout:'/auth/logout',
    userGsignup:'/auth/gsignup',
    userGlogin:'/auth/glogin',
    userProfile:'/auth/profile',
    userEditProfile:'/auth/editprofile',
}

export default authRoutes;