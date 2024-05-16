import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    admin: { /* Define the type for admin object */ } | null;
    usersList: { /* Define the type for users list */ }[];
}

// Get user from localStorage
const admin = JSON.parse(localStorage.getItem('admin') || 'null');

const initialState: AdminState = {
    admin: admin,
    usersList: [],
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: (state) => {
            state.admin = null;
            localStorage.removeItem('admin');
        },
        setAdmin: (state, action: PayloadAction<{ }>) => {
            state.admin = action.payload;
            localStorage.setItem('admin', JSON.stringify(action.payload));
        },
        setUserList: (state, action: PayloadAction<{  }[]>) => {
            state.usersList = action.payload;
        }
    },
});

export const { reset, setAdmin, setUserList } = adminSlice.actions;
export default adminSlice.reducer;
