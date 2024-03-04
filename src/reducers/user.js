import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { name: null }, // Valeur initiale du reducer
};

export const userSlice = createSlice({
	name: "user", // Nom du reducer à exporter
	initialState,
	// Fonctions à importer dans les composants pour agir sur le reducer
	reducers: {
		addUserToStore: (state, action) => {
			state.value.name = action.payload;
		},
	},
});

export const { addUserToStore } = userSlice.actions;
export default userSlice.reducer;