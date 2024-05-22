import {configureStore} from '@reduxjs/toolkit'
import authReducer from './user/userSlice'
import postReducer from './user/postSlice'
import { combineReducers } from '@reduxjs/toolkit'
import ProfileDataInterface from '../Types/User/userProfile'
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
}

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer, // Include the postSlice reducer
    // Add other reducers if you have them
});

const store=configureStore({
    reducer:rootReducer
})
export default store