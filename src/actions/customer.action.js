import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";
import { cleanFormsFields } from "../data/cleanFormsFields";

export const customerActive = (customer) => ({
	type: types.customerActive,
	payload: customer,
});

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

export const loadCustomerType = (token) => {
	return async (dispatch) => {
		FetchData("customer/getCustomerTypes", token).then((data) => {
			dispatch(customerTypeLoaded(data));
		});
	};
};

export const customerTypeLoaded = (customerTypes) => ({
	type: types.customerTypesLoaded,
	payload: customerTypes,
});

export const uploadCustomer = (form, token) => {
	return async (dispatch, getState) => {
		const customer = {
			idCustomerTypeFK: form.idCustomerTypeFK,
			firstNames: form.firstNames,
			lastNames: form.lastNames,
			city: form.city,
			country: form.country,
			direction: form.direction,
			// ContactInfo
			phoneNumber: form.phoneNumber,
			email: form.email,
			// naturalCustomerTypeDetails
			naturalRtn: form.naturalRtn,
			// businessCustomerTypeDetails
			businessName: form.businessName,
			businessRtn: form.businessRtn,
			hasCredit: form.hasCredit,
			creditAmount: form.creditAmount,
		};

		// Pasando a null las propiedades vacías
		customer = cleanFormsFields(customer, " ");

		try {
			Swal.fire({
				title: "Guardando cliente",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Fallo en Guardado",
				text: `Ocurrió un error mientras de guardaba.`,
			});
		}

		FetchData("Customer/addCustomer", token, "POST", customer)
			.then((data) => {
				// console.log(data);
				dispatch(customerActive(customer));
				Swal.close();
				Swal.fire({
					icon: "success",
					title: "Cliente creado",
					text: "El cliente se ha creado correctamente.",
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Fallo en Guardado",
					text: `Ocurrió un error mientras de guardaba.`,
				});
			});
	};
};

export const loadBusinessCustomers = (token) => {
	return async (dispatch) => {
		FetchData("customer/getBusinessCustomers", token).then((data) => {
			dispatch(businessCustomersLoaded(data));
		});
	};
};

export const businessCustomersLoaded = (businessCustomers) => ({
	type: types.businessCustomersLoaded,
	payload: businessCustomers,
});

export const loadNaturalCustomers = (token) => {
	return async (dispatch) => {
		FetchData("customer/getNaturalCustomers", token).then((data) => {
			dispatch(naturalCustomersLoaded(data));
		});
	};
};

export const naturalCustomersLoaded = (naturalCustomers) => ({
	type: types.naturalCustomersLoaded,
	payload: naturalCustomers,
});

export const loadCustomerById = (id, token) => {
	return async (dispatch) => {
		FetchData("customer/getCustomerById", token, "POST", { id: id }).then(
			(data) => {
				dispatch(customerActive(data));
			}
		);
	};
};

export const updateCustomer = (form, token) => {
	return async (dispatch, getState) => {
		let customer = {
			id: form.id,
			idCustomerTypeFK: form.idCustomerTypeFK,
			firstNames: form.firstNames,
			lastNames: form.lastNames,
			city: form.city,
			country: form.country,
			direction: form.direction,
			phoneNumber: form.phoneNumber,
			email: form.email,
			naturalRtn: form.naturalRtn,
			businessName: form.businessName,
			businessRtn: form.businessRtn,
			hasCredit: form.hasCredit,
			creditAmount: form.creditAmount,
		};

		// Pasando a null las propiedades vacías
		customer = cleanFormsFields(customer, " ");

		try {
			Swal.fire({
				title: "Actualizando cliente",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			FetchData("Customer/updateCustomer", token, "PUT", customer).then(
				(data) => {
					dispatch(loadBusinessCustomers(token));
					dispatch(loadNaturalCustomers(token));
					dispatch(loadCustomers(token));
					Swal.close();
					Swal.fire({
						icon: "success",
						title: "Cliente actualizado",
						text: "El cliente se ha actualizado correctamente.",
					});
				}
			);
		} catch (error) {
			console.error(error);
			Swal.close();
			Swal.fire({
				icon: "error",
				title: "Fallo en Actalización",
				text: `Ocurrió un error mientras se actualizaba.`,
			});
		}
	};
};

export const changeTab = (tab) => ({
	type: types.currentTab,
	payload: tab,
});
