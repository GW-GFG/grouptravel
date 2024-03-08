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
		updateCurrentTripAccommodations: (state, value) => {
			state.value.currentTrip.accomodations.push(action.payload)
		},
		updateCurrentTripActivities: (state, value) => {
			state.value.currentTrip.activities.push(action.payload)
		},
		voteToAccommodation: (state, action) => {
			const { accommodationId, newStatus } = action.payload;
			//._id.$oid $oid is a mongoose methode to use object id as string (here to compare it)
			const accommodationIndex = state.value.currentTrip.accomodations.findIndex(accommodation => accommodation._id.$oid === accommodationId);
			//findIndex return -1 to false
			if (accommodationIndex !== -1) {
			  state.value.currentTrip.accomodations[accommodationIndex].vote = [{
				userId: state.value._id,
				status: newStatus
			  }];
			}
		  },
		voteToActivity: (state, action) => {
			const { activityId, newStatus } = action.payload;

			const activityIndex = state.value.currentTrip.activities.findIndex(activity => activity._id.$oid === activityId);

			if (activityIndex !== -1) {
			  state.value.currentTrip.activities[activityIndex].vote = [{
				userId: state.value._id,
				status: newStatus
			  }];
			}
		  },
	},
});

export const { addUserToStore, updateMyTrips, removeUserToStore, updateCurrentTrip, voteToAccommodation, voteToActivity, updateCurrentTripAccommodations, updateCurrentTripActivities } = userSlice.actions;
export default userSlice.reducer;