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
		for (const [prop, value] of Object.entries(customer)) {
			customer[prop] = value === "" ? null : value;
		}

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
					title: "Producto creado",
					text: "El producto se ha creado correctamente.",
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

export const customerActive = (customer) => ({
	type: types.customerActive,
	payload: customer,
});
