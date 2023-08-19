import { types } from "../types/types";

const initialState = {
	licenseStartDate: null,
	licenseDueDate: null,
	remainingDays: null,
	licenseStatus: null,
};

export const systemReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.systemInfoLoaded:
			return action.payload;

		default:
			return state;
	}
};
