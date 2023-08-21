import { types } from "../types/types";

const initialState = {
	uid: null,
	name: null,
	email: null,
	photoURL: null,
	emailVerified: null,
	accessToken: null,
	idRole: null,
	role: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.login:
			return action.payload;

		case types.logout:
			return initialState;

		default:
			return state;
	}
};
