import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from './user/profileData';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        profileData: profileDataReducer
    },
});

export default store;