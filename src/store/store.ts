import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import profileSliceReducer from '../features/profileSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({

    profile: profileSliceReducer,
    // p: userProfileReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/PURGE'],
            ignoredPaths: ['some.path.to.ignore'],
        },
    }),
})

export const persistor = persistStore(store);
