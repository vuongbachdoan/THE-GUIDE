import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   data: null,
   commentsExpanding: false
};

const commentsExpandingSlice = createSlice({
   name: 'commentsExpanding',
   initialState,
   reducers: {
      setCommentData: (state, action) => {
         state.data = action.payload;
      },

      setCommentsExpanding: (state, action) => {
         state.profileDataLoading = action.payload;
      }
   },
});

export const { setCommentData, setCommentsExpanding } =
commentsExpandingSlice.actions;

export default commentsExpandingSlice.reducer;