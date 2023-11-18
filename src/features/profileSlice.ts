import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../services/api';
import { getCookie } from '../utils/Cookie';
import { GroupData } from '../interface/Group';

export const updateUserGroup = createAsyncThunk('userData/updateGroup', async (groupData: GroupData) => {
    const accessToken = getCookie('accessToken');
    try {
        if (groupData._id) {
            const data = await apiRequest(
                'PATCH',
                `${process.env.REACT_APP_LOCAL_API_URL}/group/${groupData._id}`,
                groupData,
                { Authorization: `Bearer ${accessToken}` }
            );

            return data;
        } else {
            const data = await apiRequest(
                'POST',
                `${process.env.REACT_APP_LOCAL_API_URL}/group`,
                groupData,
                { Authorization: `Bearer ${accessToken}` }
            );
            return data;
        }
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
});

export const removeUserFromGroup = createAsyncThunk('userData/removeGroup', async (id: string) => {
    const accessToken = getCookie('accessToken');

    try {
        await apiRequest(
            'DELETE',
            `${process.env.REACT_APP_LOCAL_API_URL}/group/${id}`,
            [],
            { Authorization: `Bearer ${accessToken}` }
        );

        // Resolve the thunk with the id of the removed group
        return id;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
})

export const fetchUserData = createAsyncThunk('userData/post', async (
    email: string | undefined) => {
    try {
        const accessToken = getCookie('accessToken')

        const data = await apiRequest(
            'POST',
            `${process.env.REACT_APP_LOCAL_API_URL}/auth/profile`,
            { email: email },
            { Authorization: `Bearer ${accessToken}` })

        return data
    }
    catch (err) {
        console.log('failed getting user data', err)

        throw err
    }
})

interface UserProfileState {
    data: UserData | null
    isAuthenticated: boolean
    isAdmin: boolean
    isLoading: boolean
    error: string | null
    fetched: boolean | null
}

interface UserData {
    created_at: number,
    updated_at: number;
    email: string,
    first_name: string,
    roles: {
        _id: string,
        roleName: string,
        createdAt: number
    }[] | [],
    user_name: string,
    _id: string,
    user_color: string,
    gameRole: [string] | null;
    userGroups: {
        _id: string,
        groupName: string,
        members: string[]
    }[],
    missions: {
        _id: string,
        eventName: string,
        eventDate: string
    }[]
}


const initialState: UserProfileState = {
    data: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: false,
    error: null as string | null,
    fetched: false
}

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setAdmin: (state) => {
            state.isAdmin = true
        },
        removeAdmin: (state) => {
            state.isAdmin = false
        },
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
                state.isLoading = false;
                state.data = action.payload;
                state.isAuthenticated = true;
                if (state.data && state.data.userGroups) {
                    state.fetched = true;
                }
            })

            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false

                state.isAuthenticated = false
                state.error = action.error.message || 'Failed to fetch user data'
                state.fetched = false
            })
            .addCase(removeUserFromGroup.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(removeUserFromGroup.fulfilled, (state, action) => {
                state.isLoading = false;

                // action.payload is the id of the removed group
                if (state.data && state.data.userGroups) {
                    const index = state.data.userGroups.findIndex(group => group._id === action.payload);

                    if (index !== -1) {
                        state.data.userGroups.splice(index, 1);
                    }
                }
            })

            .addCase(removeUserFromGroup.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to update group data'
            })


            ///////////////////////////////////////////////

            .addCase(updateUserGroup.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateUserGroup.fulfilled, (state, action) => {
                state.isLoading = false


                if (state.data && state.data.userGroups) {
                    console.log(state.data.userGroups);
                    const index = state.data.userGroups.findIndex(group => group._id === action.payload._id);
                    console.log('index', index);

                    if (index !== -1) {
                        state.data.userGroups[index] = action.payload;
                    } else {
                        state.data.userGroups.push(action.payload);
                    }
                }
            })
            .addCase(updateUserGroup.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to update group data'
            })
    }
})

export const { actions } = userSlice
export const { loginUser, logoutUser, setAdmin } = userSlice.actions
export default userSlice.reducer
