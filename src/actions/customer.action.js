import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";

export const loadCustomers = (token) => {
	return async (dispatch) => {
		FetchData("customer/getCustomers", token).then((data) => {
			dispatch(customersLoaded(data));
		});
	};
};

export const customersLoaded = (customers) => ({
	type: types.customerLoaded,
	payload: customers,
});

// export const uploadCustomer = (token) => {
// 	return async (dispatch, getState) => {
// 		const { customer } = getState().product;
// 		try {
// 			Swal.fire({
// 				title: "Subiendo producto",
// 				text: "Por favor espere...",
// 				allowOutsideClick: false,
// 				allowEnterKey: false,
// 				didOpen: () => {
// 					Swal.showLoading();
// 				},
// 			});
// 		} catch (error) {
// 			console.error(error);
// 			Swal.fire({
// 				icon: "error",
// 				title: "Upload Failed",
// 				text: "An error occurred during the upload.",
// 			});
// 		}
// 		FetchData("product/addProduct", token, "POST", product).then((data) => {
// 			console.log(product);
// 			console.log(data);
// 			dispatch(productActive(product));
// 			Swal.close();
// 			Swal.fire({
// 				icon: "success",
// 				title: "Producto creado",
// 				text: "El producto se ha creado correctamente.",
// 			});
// 		});
// 	};
// };

// export const productActive = (product) => ({
// 	type: types.productActive,
// 	payload: product,
// });
