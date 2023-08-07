import { types } from "../types/types";

const initialState = {
	customers: [],
	customerTypes: [],
	customersContactInfo: [],
	businessCustomerTypeDetails: [],
	naturalCustomerTypeDetails: [],
	customer: {
		idCustomerTypeFK: "",
		firstNames: "",
		lastNames: "",
		country: "",
		city: "",
		direction: "",
	},
};

export const customerReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.customerActive:
			return {
				...state,
				customer: {
					...state.customer,
					...action.payload,
				},
			};
		case types.customerLoaded:
			return {
				...state,
				customers: [...action.payload],
			};
		case types.customer:
			return action.payload;
		case types.customerAdd:
			return action.payload;
		case types.customerUpdate:
			return action.payload;
		case types.customerDelete:
			return action.payload;
		case types.customerClear:
			return initialState;
		case types.customerTypesLoaded:
			return {
				...state,
				customerTypes: action.payload,
			};
		case types.customersContactInfoLoaded:
			return {
				...state,
				customersContactInfo: action.payload,
			};
		case types.businessCustomerTypeDetailsLoaded:
			return {
				...state,
				businessCustomerTypeDetails: action.payload,
			};
		case types.naturalCustomerTypeDetailsLoaded:
			return {
				...state,
				naturalCustomerTypeDetails: action.payload,
			};
		default:
			return state;
	}
};
