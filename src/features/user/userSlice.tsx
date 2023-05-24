import { createSlice } from '@reduxjs/toolkit';

// Set the initial state from the user detail API call
const initialState = {
    userDetail: {
        name: 'Don',
        email: 'don@gmail.com',
        role: 'admin'
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userDetails: (state) => getUserDetails(state)
    }
});

const getUserDetails = (state: typeof initialState) => {
    state.userDetail = {
        name: 'New Name',
        email: 'newemail@gmail.com',
        role: 'new role'
    };
};

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
