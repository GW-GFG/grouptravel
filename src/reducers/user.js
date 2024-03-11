import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { token: null, username: '', userPicture: '', email: '', myTrips: [], currentTrip : null }, // Valeur initiale du reducer
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
			state.value.myTrips.push(action.payload);
		},
		// Creation 
		updateCurrentTrip : (state, action) => { 
			state.value.currentTrip = action.payload;
		},
		removeUserToStore: (state, action) => {
			state.value = initialState;
		},
		// TODO : updateCurrentTripActivity & updateCurrentTripAccomodation
		updateCurrentTripActivities: (state, action) => {
			state.value.currentTrip.activities.push(action.payload)
		}
	},
});

export const { addUserToStore, updateMyTrips, removeUserToStore, updateCurrentTrip, updateCurrentTripActivities } = userSlice.actions;
export default userSlice.reducer;