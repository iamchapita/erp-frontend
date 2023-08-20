import Swal from "sweetalert2";
import { types } from "../types/types";
import { uploadLicenseUpdate } from "./binacle.actions";
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

export const systemActive = (systemInfo) => ({
	type: types.systemInfoActive,
	payload: systemInfo,
});

export const updateLicense = (form, token) => {
	return async (dispatch, getState) => {
		let license = {
			licenseStartDate: form.licenseStartDate,
			licenseDueDate: form.licenseDueDate,
		};

		try {
			Swal.fire({
				title: "Actualizando Licencia",
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
				title: "Fallo en Actualización",
				text: `Ocurrió un error mientras de actualizaba.`,
			});
		}

		FetchData("system/setDates", token, "POST", license)
			.then((data) => {
				dispatch(loadSystemInfo(token));
				dispatch(systemActive(license));
				dispatch(
					uploadLicenseUpdate(module, license.licenseDueDate, token)
				);

				Swal.close();
				Swal.fire({
					icon: "success",
					title: "Licencia actualizada",
					text: "El Licencia se ha actualizada correctamente.",
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Fallo en Actualización",
					text: `Ocurrió un error mientras de actualizaba.`,
				});
			});
	};
};
