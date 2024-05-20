import {toast} from 'react-toastify'

export const userRegistrationValidation = (userData:any)=>{

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        if(!userData.name.length || !userData.userName.length || !userData.email.length || !userData.mobile.length || !userData.password.length ) {
        toast.error('Please fill all the fields !!')
        return false;
        }
        if (userData.name.trim().length < 4) {
        toast.error("Name should have more than 3 letters !!!");
        return false;
        } else if (userData.userName.trim().length < 4) {
        toast.error("Name should have more than 3 letters !!!");
        return false;
        } 
        else if (!emailRegex.test(userData.email)) {
        toast.error("Please enter valid email!!!");
        return false;
        } else if (!mobileRegex.test(userData.mobile)){
        toast.error('Invalid mobile number')
        return false
        } else if (userData.password.trim().length < 8) {
        toast.error("Please enter valid password !!!");
        return false ;
        } else if (userData.password.trim().includes(' ')) {
        toast.error("Password cannot contain space !!!");
        return false ;
        }  
        else if (userData.password !== userData.confirmPassword) {
        toast.error("Passwords miss match !!!");
        return false;
        }

        return true
}
export const validateEmail = (email:string)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
                toast.error("Please enter valid email!!!");
                return false;
         }
        return true
}
export const validatePassword = (password:string)=>{
         if (password.trim().length < 8 ) {
                toast.error("Password length should be minimum 8 !!!");
                return false;
         }
         if ( password.includes(' ')) {
                toast.error("Password cannot contain space");
                return false;
         }
        return true
}