import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { token: null, username: '', userPicture: '', email: '', myTrips: [], currentTrip : null }, // Valeur initiale du reducer
	isAdmin: null,
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
			  if (voteItem) {
				voteItem.status = newStatus;
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

		  participateToActivity: (state, action) => {
			const { activityId, newStatus } = action.payload;
			const userToken = state.value.token;
	  
			// Rechercher l'index de l'hébergement (si -1 c'est qu'il n'est pas trouvé)
			const activityIndex = state.value.currentTrip.activities.findIndex(activity => activity._id.toString() === activityId);	  
			if (activityIndex!== -1) {
			  // Si l'utilisateur a déjà voté, mettre à jour son vote

			 const participationItem = state.value.currentTrip.activities[activityIndex].participation.find(participationItem => participationItem.userToken === state.value.token)
			 console.log('participationItem : ', participationItem,' state.value.token', state.value.token, 'userToken : ', userToken) 
			  if (participationItem) {
				console.log('participationItem : ', participationItem)
				participationItem.status = newStatus;
				console.log('depuis reducer participationItem if' + JSON.stringify(participationItem))
			  } else {
				// Sinon, ajouter un nouveau vote
				state.value.currentTrip.activities[activityIndex].participation.push({
				  userId: state.value._id,
				  status: newStatus,
				  userToken: userToken
				});
			  }
			}			
		  },

		  updateFixStatusAccommodation: (state, action) => {
			const accommodationIndex = state.value.currentTrip.accomodations.findIndex(accommodation => accommodation._id.toString() === action.payload.accommodationId);	  
			if (accommodationIndex!== -1) {
			state.value.currentTrip.accomodations[accommodationIndex].isFixed = action.payload.isFixed;
		  	}
		},

		  adminFixActivity: (state, action) => {
			const { activityId, newStatus } = action.payload;
			// Rechercher l'index de l'activité (si -1 c'est qu'il n'est pas trouvé)
			const activityIndex = state.value.currentTrip.activities.findIndex(activity => activity._id.toString() === activityId);	  
			if (activityIndex!== -1) {
			  // Changing "isFixed" to newStatus
			  state.value.currentTrip.activities[activityIndex].isFixed = newStatus;
			}			
		  },
		  
	},
});

export const { addUserToStore, updateMyTrips, removeUserToStore, updateCurrentTrip, voteToAccommodation, participateToActivity, updateCurrentTripAccommodations, updateCurrentTripActivities, updateFixStatusAccommodation, adminFixActivity } = userSlice.actions;
export default userSlice.reducer;