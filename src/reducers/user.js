import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const friendsSlice = createSlice({
 name: 'users',

  initialState,
 reducers: {
   addUserToStore: (state, action) => {
     state.value.push(action.payload);
   },
 },
});

export const { addUserToStore } = friendsSlice.actions;
export default friendsSlice.reducer;