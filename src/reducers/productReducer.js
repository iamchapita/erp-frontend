import { types } from "../types/types";

const initialState = {
	products: [],
	productCategories: [],
	productUnities: [],
	product: {
		id: "",
		productCode: "",
		name: "",
		description: "",
		idProductCategoryFK: "",
		idProductUnityFK: "",
		taxablePrice: "",
		taxExemptPrice: "",
		salePrice: "",
		images: "",
		status: "",
		elaborationDate: "",
		expirationDate: "",
	},
};

export const productReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.productActive:
			return {
				...state,
				product: {
					...state.product,
					...action.payload,
				},
			};
		case types.productLoaded:
			return {
				...state,
				products: [...action.payload],
			};
		case types.product:
			return action.payload;
		case types.productAdd:
			return action.payload;
		case types.productUpdate:
			return action.payload;
		case types.productDelete:
			return action.payload;
		case types.productClear:
			return initialState;
		case types.productCategoriesLoaded:
			return {
				...state,
				productCategories: action.payload,
			};
		case types.productUnitiesLoaded:
			return {
				...state,
				productUnities: action.payload,
			};

		default:
			return state;
	}
};
