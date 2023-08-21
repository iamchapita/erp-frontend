import { types } from "../types/types";

const initialState = {
	purchaseOrders: [],
	purchaseOrderProducts: [],
	purchaseOrder: {
		id: "",
		idCustomerFK: "",
		firstNames: "",
		lastNames: "",
		idSellerFK: "",
		username: "",
		purchaseOrderDate: "",
		taxablePrice: "",
		taxExemptPrice: "",
		salesTax: "",
		subTotal: "",
		total: "",
		status: "",
	},
	purchaseOrderProduct: {
		id: "",
		idPurchaseOrderFK: "",
		idProductFK: "",
		pricePerUnit: "",
		productQuantity: "",
		totalPerProduct: "",
	},
	currentTab: {
		index: 0,
		tab: "",
		tabHeaders: {},
	},
};

export const salesReducer = (state = initialState, action) => {
	switch (action?.type) {
		case types.purchaseOrderActive:
			return {
				...state,
				purchaseOrder: action.payload,
			};
		case types.purchaseOrderProductsActive:
			return {
				...state,
				purchaseOrderProducts: action.payload,
			};

		case types.purchaseOrderLoaded:
			return {
				...state,
				purchaseOrders: [...action.payload],
			};

		case types.purchaseOrderProductsLoaded:
			return {
				...state,
				purchaseOrderProducts: [...action.payload],
			};

		case types.customer:
			return action.payload;

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
