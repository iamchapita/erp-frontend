import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";
import { uploadBinacleAction } from "./binacle.actions";
import { cleanFormsFields } from "../data/cleanFormsFields";
import { getTransactType } from "../components/utils/getTransactType";


export const loadInvoices = (token) => {
	return async (dispatch) => {
		FetchData("Invoice/getInvoices", token).then((data) => {
			dispatch(invoicesLoaded(data));
		});
	};
};

export const invoicesLoaded = (invoices) => ({
	type: types.invoiceLoaded,
	payload: invoices,
});


export const invoiceActive = (invoice) => ({
	type: types.invoiceActive,
	payload: invoice,
});

export const uploadInvoice = (form, token) => {
	return async (dispatch, getState) => {
		let invoice = {
			id: form.id,
			idCustomerFK: form.idCustomerFK,
			idSellerFK: form.idSellerFK,
			idPurchaseOrderFK: form.idPurchaseOrderFK,
			invoiceCode: form.invoiceCode,
			cai: form.cai,
			rtn: form.rtn,
			invoiceType: form.invoiceType,
			saleDate: form.saleDate,
			dueDate: form.dueDate,
			creditDays: form.creditDays,
			invoiceNotes: form.invoiceNotes
		};

		// Pasando a null las propiedades vacías
		invoice = cleanFormsFields(invoice, " ");

		try {
			Swal.fire({
				title: "Guardando factura",
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

		FetchData("Invoice/addInvoice", token, "POST", invoice)
			.then((data) => {
				dispatch(loadInvoices(token));
				dispatch(invoiceActive(invoice));

				dispatch(
					uploadBinacleAction(module, getTransactType(data), token)
				);

				Swal.close();
				Swal.fire({
					icon: "success",
					title: "Factura creada",
					text: "La factura se ha creado correctamente.",
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