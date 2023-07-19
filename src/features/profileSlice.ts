// slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Initial state values
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Define your actions and reducers here
    },
});

export const { actions } = userSlice;
export default userSlice.reducer
