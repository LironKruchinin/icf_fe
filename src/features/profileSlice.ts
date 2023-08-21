import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../services/api';
import { getLocalStorage } from '../utils/localStorage';

export const fetchUserData = createAsyncThunk('userData/post', async (
    email: string | undefined) => {
    try {
        const accessToken = getLocalStorage('accessToken')

        const data = await apiRequest(
            'POST',
            `${process.env.REACT_APP_LOCAL_API_URL}/auth/profile`,
            { email: email },
            { Authorization: `Bearer ${JSON.parse(accessToken)}` })

        return data
    }
    catch (err) {
        console.log('failed getting user data')

        throw err
    }
})

interface UserProfileState {
    data: UserData | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    fetched: boolean | null
}


interface UserData {
    created_at: number,
    updated_at: number;
    email: string,
    first_name: string,
    roles: [string],
    user_name: string,
    _id: string,
    user_color: string,
    gameRole: [string] | null;

}


const initialState: UserProfileState = {
    data: null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
    fetched: false
}

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuthenticated = true
            state.data = action.payload
        },
        logoutUser: (state) => {
            return initialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                state.isAuthenticated = true
                state.fetched = true  // Set fetched to true once data is successfully fetched
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.error.message || 'Failed to fetch user data'
                state.fetched = false  // Optionally, reset fetched to false on fetch error
            })
    }
})

export const { actions } = userSlice
export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
