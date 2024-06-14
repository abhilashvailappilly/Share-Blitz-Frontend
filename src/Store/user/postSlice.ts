import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  // Define the structure of a post
}

interface PostState {
  myPosts: Post[];
  savedPosts: [];
  newPost: Post | null;
  loadedPosts: Post[];
  lastPost: boolean;
}

const initialState: PostState = {
  myPosts: [],
  savedPosts: [],
  newPost: null,
  loadedPosts: [],
  lastPost: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<Post[] >) => {
      state.myPosts = action.payload;
    },
    addNewUserPosts: (state, action: PayloadAction<{post:Post}>) => {
      console.log('action payload :',action.payload)
      state.myPosts.push(action.payload.post);   
    },
    clearUserPosts: (state) => {
      state.myPosts = [];
    },
    updateUserPosts: (state, action: PayloadAction<{ post: Post }>) => {
      console.log("my posts : ",action.payload.post)
      state.myPosts.unshift(action.payload.post);
    },
    addNewPost: (state, action: PayloadAction<Post>) => {
      state.newPost = action.payload;
    },
    removeNewPost: (state) => {
      state.newPost = null;
    },
    removeUserPosts: (state) => {
      state.myPosts = [];
    },
    setLoadedPosts: (state, action: PayloadAction<Post[]>) => {
      state.loadedPosts = [...state.loadedPosts,...action.payload ];
     
    },
    setSavedPosts: (state, action: PayloadAction<[]>) => {
      state.savedPosts = [...action.payload ];
     
    },
    // setLoadedPosts: (state, action) => {
    //   state.loadedPosts = action.payload;
    // },
    appendLoadedPosts: (state, action) => {
      state.loadedPosts = [...state.loadedPosts, ...action.payload];
    },
    addCreatedPost: (state, action: PayloadAction<Post>) => {
      state.myPosts = [action.payload, ...state.myPosts];
    },
    clearLoadedPosts: (state) => {
      state.loadedPosts = [];
      state.lastPost = false;
    },
    
  },
});

export const {
  setUserPosts,
  appendLoadedPosts,
  removeUserPosts,
  updateUserPosts,
  addNewPost,
  setSavedPosts,
  removeNewPost,
  setLoadedPosts,
  addCreatedPost,
  clearLoadedPosts,
  clearUserPosts,
  addNewUserPosts
} = postSlice.actions;

export default postSlice.reducer;
