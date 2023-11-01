import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   data: null,
};

const searchDataSlice = createSlice({
   name: 'searchData',
   initialState,
   reducers: {
      setSearchData: (state, action) => {
         state.data = action.payload;
      }
   },
});

export const { setSearchData } =
   searchDataSlice.actions;

export default searchDataSlice.reducer;