import {configureStore} from '@reduxjs/toolkit'
import authReducer from './user/userSlice'
import postReducer from './user/postSlice'
import { combineReducers } from '@reduxjs/toolkit'
export interface RootState {
    auth: {
        userInfo: {
            _id:string
            
        }
        adminInfo:string
    }
    post:{
        posts:{

        }
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