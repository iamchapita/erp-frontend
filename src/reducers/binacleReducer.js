import { types } from "../types/types";

const initialState = {
	binacles: [],
	binacle: {
		id: "",
		actionPerformedBy: "",
		userRole: "",
		actionOn: "",
		actionDate: "",
		actionType: "",
		description: "",
	},
};

export const binacleReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.binacleActive:
			return {
				...state,
				binacle: {
					...state.binacle,
					...action.payload,
				},
			};
		case types.binacleLoaded:
			return {
				...state,
				binacles: [...action.payload],
			};
		default:
			return state;
	}
};
