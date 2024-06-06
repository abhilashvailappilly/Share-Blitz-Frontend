import {configureStore} from '@reduxjs/toolkit'
import authReducer from './user/userSlice'
import postReducer from './user/postSlice'
import connectionReducer from './user/connectionSlice'
import { combineReducers } from '@reduxjs/toolkit'
import ProfileDataInterface from '../Types/User/userProfile'
import { FollowingsInterface } from '../Types/User/Connections'
export interface RootState {
    auth: {
        userInfo: ProfileDataInterface
        adminInfo:string
    }
    post:{
        myPosts:[]
        newPost:[]
        loadedPosts:[]
        lastPost:{}
    }
    connections:{
        followers :[]
        followings : FollowingsInterface[]
    }
}

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer, 
    connections:connectionReducer
});

const store=configureStore({
    reducer:rootReducer
})
export default store