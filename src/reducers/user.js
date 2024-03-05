import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { token: null, username: '', userPicture: '', email: '', myTrips: [] }, // Valeur initiale du reducer
};

export const userSlice = createSlice({
	name: "user", // Nom du reducer à exporter
	initialState,
	// Fonctions à importer dans les composants pour agir sur le reducer
	reducers: {
		addUserToStore: (state, action) => {
			state.value = action.payload;
		},
		updateMyTrips: (state, action) => {
			state.value.myTrips = state.value.myTrips.push(action.payload)
		}
	},
});

export const { addUserToStore } = userSlice.actions;
export default userSlice.reducer;