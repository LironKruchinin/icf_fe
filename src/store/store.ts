import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../features/profileSlice';

const rootReducer = combineReducers({
    userProfile: userProfileReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: rootReducer
});

export default store;