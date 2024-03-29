import { types } from "../types/types";

const initialState = {
	customers: [],
	customerTypes: [],
	customersContactInfo: [],
	businessCustomers: [],
	naturalCustomers: [],
	customer: {
		id: "",
		idCustomerTypeFK: "",
		firstNames: "",
		lastNames: "",
		city: "",
		country: "",
		direction: "",
		phoneNumber: "",
		email: "",
		naturalRtn: "",
		businessName: "",
		businessRtn: "",
		hasCredit: "",
		creditAmount: "",
	},
	currentTab: {
		index: 0,
		tab: "",
		tabHeaders: {},
	},
};

export const customerReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.customerActive:
			return {
				...state,
				customerActive: action.payload,
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
		case types.businessCustomersLoaded:
			return {
				...state,
				businessCustomers: action.payload,
			};
		case types.naturalCustomersLoaded:
			return {
				...state,
				naturalCustomers: action.payload,
			};

		case types.currentTab:
			return {
				...state,
				currentTab: {
					...state.currentTab,
					...action.payload,
				},
			};
		default:
			return state;
	}
};
