// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Followers {
//   // Define the structure of a post
// }
// interface Followings { 

// }

// interface PostState { 
//  followers:Followers[]
//  followings:Followings[]
// }
// let followers: Followers[] = [];
// let followingsData: Followings[] = [];

// const followersData = sessionStorage.getItem('followers');
// const followingsStorageData = sessionStorage.getItem('followings');

// if (followersData) {
//   try {
//     followers = JSON.parse(followersData) as Followers[];
//   } catch (error) {
//     console.error("Error parsing followers data:", error);
//   }
// }

// if (followingsStorageData) {
//   try {
//     followingsData = JSON.parse(followingsStorageData) as Followings[];
//   } catch (error) {
//     console.error("Error parsing followings data:", error);
//   }
// }
// const initialState: PostState = {
//  followers:[],
//  followings:[] 
// };

// const connectionSlice = createSlice({
//   name: "connections",
//   initialState,
//   reducers: {
//     setFollowerss: (state, action: PayloadAction<Followers[] >) => {
//       state.followers = action.payload;
//     },
//       setFollowings: (state, action: PayloadAction<Followings[] >) => {
//         state.followings = action.payload;
//     },
//     addFollowers: (state, action: PayloadAction<Followers>) => {
//       state.followers = [action.payload,...state.followers];
//     },
//     addFollowings: (state,action: PayloadAction<Followers>) => {
//       state.followings = [action.payload,...state.followings];
//     },
    
//   },
// });

// export const {
//     addFollowings,addFollowers,setFollowerss,setFollowings
// }= connectionSlice.actions;

// export default connectionSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Followers {
  // Define the structure of a follower
}

interface Followings {
  // Define the structure of a following
}

interface PostState {
  followers: Followers[];
  followings: Followings[];
}

const initialState: PostState = {
  followers: [],
  followings: []
};

// Attempt to load followers from session storage
const followersData = sessionStorage.getItem('followers');
if (followersData) {
  try {
    initialState.followers = JSON.parse(followersData) as Followers[];
  } catch (error) {
    console.error("Error parsing followers data:", error);
  }
}

// Attempt to load followings from session storage
const followingsStorageData = sessionStorage.getItem('followings');
if (followingsStorageData) {
  try {
    initialState.followings = JSON.parse(followingsStorageData) as Followings[];
  } catch (error) {
    console.error("Error parsing followings data:", error);
  }
}

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setFollowerss: (state, action: PayloadAction<Followers[]>) => {
      state.followers = action.payload;
    },
    setFollowings: (state, action: PayloadAction<Followings[]>) => {
      state.followings = action.payload;
    },
    addFollower: (state, action: PayloadAction<Followers>) => {
      state.followers = [action.payload, ...state.followers];
    },
    addFollowing: (state, action: PayloadAction<Followings>) => {
      state.followings = [action.payload, ...state.followings];
    },
  },
});

export const {
  setFollowerss,
  setFollowings,
  addFollower,
  addFollowing
} = connectionSlice.actions;

export default connectionSlice.reducer;
