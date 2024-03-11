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
		updateCurrentTripAccommodations: (state, action) => {
			state.value.currentTrip.accomodations.push(action.payload)
		},
		updateCurrentTripActivities: (state, action) => {
			state.value.currentTrip.activities.push(action.payload)
		},

		voteToAccommodation: (state, action) => {
			const { accommodationId, newStatus } = action.payload;
			const userToken = state.value.token;
	  
			// Rechercher l'index de l'hébergement (si -1 c'est qu'il n'est pas trouvé)
			const accommodationIndex = state.value.currentTrip.accomodations.findIndex(accommodation => accommodation._id.toString() === accommodationId);	  
			if (accommodationIndex !== -1) {
			  // Si l'utilisateur a déjà voté, mettre à jour son vote

			//   const voteItem = state.value.currentTrip.accomodations[accommodationIndex].vote.find(voteItem => voteItem.userId === state.value._id);
			 const voteItem = state.value.currentTrip.accomodations[accommodationIndex].vote.find(voteItem => voteItem.userToken === state.value.token)
			 console.log('voteItem : ', voteItem,' state.value.token', state.value.token, 'userToken : ', userToken) 
			  if (voteItem) {
				console.log('voteItem : ', voteItem)
				voteItem.status = newStatus;
				console.log('depuis reducer voteItem if' + JSON.stringify(voteItem))
			  } else {
				// Sinon, ajouter un nouveau vote
				state.value.currentTrip.accomodations[accommodationIndex].vote.push({
				  userId: state.value._id,
				  status: newStatus,
				  userToken: userToken
				});
			  }
			}			
		  },
	},
});

export const { addUserToStore, updateMyTrips, removeUserToStore, updateCurrentTrip, voteToAccommodation, voteToActivity, updateCurrentTripAccommodations, updateCurrentTripActivities } = userSlice.actions;
export default userSlice.reducer;