import {toast} from 'react-toastify'

// interface valiationErrorInterface{
//        name:string , userName:string,email:string,mobile:string,password:string,confirmPassword:string
// }

export const userRegistrationValidation = (userData:any,setValidationError:any)=>{

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        if(!userData.name.length || !userData.userName.length || !userData.email.length || !userData.mobile.length || !userData.password.length ) {
       //  toast.error('Please fill all the fields !!')
        setValidationError({name:"name is required",userName:"user name is required !!",email:"email is required !!",
        mobile:"mobile is required !!",password:"password is required !!",confirmPassword:"password is required !!"})
        return false;
        }
        if (userData.name.trim().length < 4) {
        setValidationError({name:"Name should have more than 3 letters !!!"})
        return false;
        } else if (userData.userName.trim().length < 4) {
        setValidationError({userName:"Name should have more than 3 letters !!!"})

        return false;
        } 
        else if (!emailRegex.test(userData.email)) {
        setValidationError({email:"Enter a valid email !!"})
        return false;
        } else if (!mobileRegex.test(userData.mobile)){
        setValidationError({mobile:"Invalid mobile number !!!"})
        return false
        } else if (userData.password.trim().length < 8) {
       //  toast.error("Please enter valid password !!!");
        setValidationError({password:"Password should contain atleast 8 digits !!!"})
        return false ;
        } else if (userData.password.trim().includes(' ')) {
              setValidationError({password:"Password  cannot contain space !!!"})
        return false ;
        }  
        else if (userData.password !== userData.confirmPassword) {
       //  toast.error("Passwords miss match !!!");
        setValidationError({password:"password && confirm password must be same",confirmPassword:"password && confirm password must be same"})

        return false;
        }

        return true
}
export const validateEmail = (email:string)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email){
                toast.error("Provide valid credentials");
        }
         if (!emailRegex.test(email)) {
              //   toast.error("Please enter valid email!!!");
                return false;
         }
        return true
}
export const validatePassword = (password:string)=>{
         if (!password&&password.trim().length < 8 ) {
                toast.error("Password length should be minimum 8 !!!");
                return false;
         }
         if ( password.includes(' ')) {
              //   toast.error("Password cannot contain space");
                return false;
         }
        return true
}