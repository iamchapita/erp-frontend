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
			console.log(data);
			dispatch(purchaseOrderLoaded(data));
		});
	};
};

export const purchaseOrderLoaded = (purchaseOrders) => ({
	type: types.purchaseOrderLoaded,
	payload: purchaseOrders,
});

// export const uploadpurchaseOrderAction = (table, transactInfo, token) => {
// 	return async (dispatch, getState) => {
// 		const { auth } = getState();
// 		const data = { ...transactInfo, uid: auth.uid, actionOn: table };

// 		FetchData("purchaseOrder/addAction", token, "POST", data).then(
// 			(data) => {
// 				dispatch(purchaseOrderActive(data));
// 			}
// 		);
// 	};
// };
