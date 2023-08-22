import { types } from "../types/types";

const initialState = {
	sellers: [],
	seller: {
		id: "",
		username: "",
	},
};

export const employeeReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.sellerActive:
			return {
				...state,
				sellerActive: action.payload,
			};
		case types.sellerLoaded:
			return {
				...state,
				sellers: action.payload,
			};
		default:
			return state;
	}
};
