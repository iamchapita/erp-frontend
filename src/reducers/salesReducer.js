import { types } from "../types/types";

const initialState = {
	purchaseOrders: [],
	purchaseOrderProducts: [],
	purchaseOrder: {
		id: "",
		idCustomerFK: "",
		fullName: "",
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

		default:
			return state;
	}
};
