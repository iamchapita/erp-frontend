import { types } from "../types/types";

import { FetchData } from "../components/utils/fetch";

const module = "Sistema";

export const loadSystemInfo = (token) => {
	return async (dispatch) => {
		FetchData("System/getLicenseStatus", token).then((data) => {
			dispatch(systemLoaded(data[0]));
		});
	};
};

export const systemLoaded = (systemInfo) => ({
	type: types.systemInfoLoaded,
	payload: systemInfo,
});

// export const uploadCustomer = (form, token) => {
// 	return async (dispatch, getState) => {
// 		let customer = {
// 			idCustomerTypeFK: form.idCustomerTypeFK,
// 			firstNames: form.firstNames,
// 			lastNames: form.lastNames,
// 			city: form.city,
// 			country: form.country,
// 			direction: form.direction,
// 			// ContactInfo
// 			phoneNumber: form.phoneNumber,
// 			email: form.email,
// 			// naturalCustomerTypeDetails
// 			naturalRtn: form.naturalRtn,
// 			// businessCustomerTypeDetails
// 			businessName: form.businessName,
// 			businessRtn: form.businessRtn,
// 			hasCredit: form.hasCredit,
// 			creditAmount: form.creditAmount,
// 		};

// 		// Pasando a null las propiedades vacías
// 		customer = cleanFormsFields(customer, " ");

// 		try {
// 			Swal.fire({
// 				title: "Guardando cliente",
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
// 				title: "Fallo en Guardado",
// 				text: `Ocurrió un error mientras de guardaba.`,
// 			});
// 		}

// 		FetchData("Customer/addCustomer", token, "POST", customer)
// 			.then((data) => {
// 				dispatch(loadBusinessCustomers(token));
// 				dispatch(loadNaturalCustomers(token));
// 				dispatch(loadCustomers(token));
// 				dispatch(customerActive(customer));

// 				dispatch(
// 					uploadBinacleAction(module, getTransactType(data), token)
// 				);

// 				Swal.close();
// 				Swal.fire({
// 					icon: "success",
// 					title: "Cliente creado",
// 					text: "El cliente se ha creado correctamente.",
// 				});
// 			})
// 			.catch((error) => {
// 				Swal.fire({
// 					icon: "error",
// 					title: "Fallo en Guardado",
// 					text: `Ocurrió un error mientras de guardaba.`,
// 				});
// 			});
// 	};
// };

// export const customerActive = (customer) => ({
// 	type: types.customerActive,
// 	payload: customer,
// });
