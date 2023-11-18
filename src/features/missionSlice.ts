import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface MissionType {
    _id: string,
    eventName: string,
    eventDescription: string,
    eventDate: number,
    eventCloseDate: number,
    createdAt: number,
    users: [],
}

interface MissionState {
    latestMissions: MissionType[];
}

const initialState: MissionState = {
    latestMissions: [],
}

const missionsSlice = createSlice({
    name: 'missions',
    initialState,
    reducers: {
        // Define your reducers here
    },
    extraReducers: builder => {
        // Handle asynchronous actions here if any
    }
});

export const { actions } = missionsSlice;
export default missionsSlice.reducer;

