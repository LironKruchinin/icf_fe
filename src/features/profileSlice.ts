// slice.js
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { getLocalStorage } from '../utils/localStorage';
import { apiPostRequest } from '../services/api';

export const fetchUserData = createAsyncThunk('userData/post', async (email: string) => {
    try {
        console.log('fetching email', email);

        const accessToken = getLocalStorage('accessToken')
        console.log('accessToken', accessToken);

        const data = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/profile`,
            { email: email },
            { Authorization: `Bearer ${JSON.parse(accessToken)}` })
        console.log('data', data);

        return data
    }
    catch (err) {
        console.log('failed getting user data');

        throw err
    }
})

const initialState = {
    data: null,
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false
                // state.data = action.payload
            })
    },
});

export const { actions } = userSlice;
export default userSlice.reducer
