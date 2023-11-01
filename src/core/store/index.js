import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from './user/profileData';
import commentsExpandingReducer from './comments/commentsExpanding';
import searchDataReducer from './search/globalSearchPost';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        profileData: profileDataReducer,
        commentsExpanding: commentsExpandingReducer,
        searchData: searchDataReducer
    },
});

export default store;