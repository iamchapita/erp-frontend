import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";
import { getTransactType } from "../components/utils/getTransactType";

const module = "Ventas";

export const purchaseOrderActive = (purchaseOrder) => ({
	type: types.purchaseOrderActive,
	payload: purchaseOrder,
});

export const loadPurchaseOrder = (token) => {
	return async (dispatch) => {
		FetchData("sales/getPurchaseOrders", token).then((data) => {
			dispatch(purchaseOrderLoaded(data));
		});
	};
};

export const purchaseOrderLoaded = (purchaseOrders) => ({
	type: types.purchaseOrderLoaded,
	payload: purchaseOrders,
});

export const uploadpurchaseOrderAction = (table, transactInfo, token) => {
	return async (dispatch, getState) => {
		const { auth } = getState();
		//convert taxExemptPrice, salesTax and total to float
		table.taxExemptPrice = parseFloat(table.taxExemptPrice);
		table.salesTax = parseFloat(table.salesTax);
		table.total = parseFloat(table.total);
		//idCustomer, idSeller, idTransactType
		table.idCustomer = parseInt(table.idCustomer);
		table.idSeller = parseInt(table.idSeller);
		table.idTransactType = getTransactType(transactInfo);
		table.status === "1" ? (table.status = 1) : (table.status = 0);
		
		FetchData("sales/addPurchaseOrder", token, "POST", table).then(
			(data) => {
				console.log('data', data);
				dispatch(purchaseOrderActive(data));
				dispatch(loadPurchaseOrder(token));

			}
		);
	};
};
