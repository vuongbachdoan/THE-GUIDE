import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from './user/profileData';
import commentsExpandingReducer from './comments/commentsExpanding';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        profileData: profileDataReducer,
        commentsExpanding: commentsExpandingReducer
    },
});

export default store;