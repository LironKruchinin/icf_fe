import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { getLocalStorage } from '../utils/localStorage';
import { apiPostRequest } from '../services/api';

export const fetchUserData = createAsyncThunk('userData/post', async (
    email: string | undefined) => {
    try {
        const accessToken = getLocalStorage('accessToken')
        const data = await apiPostRequest(
            `${process.env.REACT_APP_LOCAL_API_URL}/profile`,
            { email: email },
            { Authorization: `Bearer ${JSON.parse(accessToken)}` })
        console.log('data', data)

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
}

interface UserData {
    email: string
}


const initialState: UserProfileState = {
    data: null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null
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
            state.isAuthenticated = false
            state.data = null
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
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.error.message || 'Failed to fetch user data'
            })
    },
})

export const { actions } = userSlice
export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
