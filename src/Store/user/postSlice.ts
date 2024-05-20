import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  // Define the structure of a post
}

interface PostState {
  myPosts: Post[];
  newPost: Post | null;
  loadedPosts: Post[];
  lastPost: boolean;
}

const initialState: PostState = {
  myPosts: [],
  newPost: null,
  loadedPosts: [],
  lastPost: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<Post[] >) => {
      console.log('action.....:',action)
      state.myPosts = action.payload;
    },
    clearUserPosts: (state) => {
      state.myPosts = [];
    },
    updateUserPosts: (state, action: PayloadAction<{ post: Post }>) => {
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
      state.loadedPosts = [...state.loadedPosts, ...action.payload];
      console.log('action . pay',action)
      console.log('action . pay',action.payload)
      // if (action.payload.length < 5) {
      //   // state.lastPost = true;
      // }
    },
    addCreatedPost: (state, action: PayloadAction<Post>) => {
      state.loadedPosts = [action.payload, ...state.loadedPosts];
    },
    clearLoadedPosts: (state) => {
      state.loadedPosts = [];
      state.lastPost = false;
    },
    
  },
});

export const {
  setUserPosts,
  removeUserPosts,
  updateUserPosts,
  addNewPost,
  removeNewPost,
  setLoadedPosts,
  addCreatedPost,
  clearLoadedPosts,
  clearUserPosts
} = postSlice.actions;

export default postSlice.reducer;
