import './Topbar.css'
import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {Button} from '../../../../components/ui/button'
// import {Button} from '@/@/components/ui/button'

import { useDispatch } from 'react-redux'
import { logout } from '../../../Store/user/userSlice'
// import { logout } from '@/src/Store/user/userSlice'


interface RootState {
    auth: {
        userInfo:{
            profileImageUrl:string
        } ;
        adminInfo:string
    }
}

const Topbar = () => {
        const [user, setUser] = useState<{ profileImageUrl?: string }>({})
const userInfo = useSelector((state: RootState) => state.auth);
const dispatch = useDispatch()
console.log('user data :',userInfo)
    useEffect(()=>{
  
        setUser(userInfo.userInfo)

    },[userInfo])
    const logOut = ()=>{
  dispatch(logout())

        console.log('logut')
    }


  return (
   <section className='topbar'>
        <div className="flex-between py-4 px-5">
            <Link to='/' className="flex gap-3 items-center">
                <img 
                    src='/logo.png'
                    alt='logo'
                    width={80}
                    height={100}
                />
            </Link>
            <div className="flex gap-4">
                <Button variant='ghost' className="shad-button_ghost"  onClick = {logOut} >
                    <img src="/logout1.svg" alt="logout" className="h-8 w-8 rounded-full" />
                </Button>
               <Link to = '/profile' className="flex-center gap-3">
                <img src={user?.profileImageUrl || 'assets/images'} alt="profile" className="h-8 w-8 rounded-full" />
               </Link>
                
            </div>
        </div>
   </section>
  )
}

export default Topbar
