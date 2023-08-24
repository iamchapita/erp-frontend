import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";
import { getTransactType } from "../components/utils/getTransactType";
import Swal from "sweetalert2";

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
		
		Swal.fire({
			title: "¿Está seguro?",
			text: "Está a punto de crear una nueva orden de compra",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Sí, crear",
		}).then((result) => {
			if (result.isConfirmed) {
				FetchData("sales/addPurchaseOrder", token, "POST", table).then(
					(data) => {
						console.log(data);
						if (data.affectedRows === 1) {
							Swal.fire(
								"Orden de compra creada",
								"La orden de compra ha sido creada con éxito",
								"success"
							);
							dispatch(purchaseOrderActive(table));
							dispatch(loadPurchaseOrder(token));
						} else {
							Swal.fire("Error", data.msg, "error");
						}
					}
				);
			}
		});
	};
};



