import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { imageUpload } from "../helpers/fileUpload";
import { types } from "../types/types";

export const loadProducts = (token) => {
	return async (dispatch) => {
		FetchData("product/getProduct/", token).then((data) => {
			dispatch(productsLoaded(data));
		});
	};
};

export const productsLoaded = (products) => ({
	type: types.productLoaded,
	payload: products,
});

export const chargeCategories = (token) => {
	return async (dispatch) => {
		FetchData("product/getCategory/", token).then((data) => {
			dispatch(categoriesLoaded(data));
		});
	};
};

export const chargeUnities = (token) => {
	return async (dispatch) => {
		FetchData("product/getProductUnities/", token).then((data) => {
			dispatch(unitiesLoaded(data));
		});
	};
};

export const categoriesLoaded = (categories) => ({
	type: types.productCategoriesLoaded,
	payload: categories,
});

export const unitiesLoaded = (unities) => ({
	type: types.productUnitiesLoaded,
	payload: unities,
});

export const uploadImage = (files, handleInputChange) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Subiendo archivo(s)",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			const fileURL = await imageUpload(files);
			dispatch(imageUploaded(fileURL));
			handleInputChange({
				target: {
					name: "images",
					value: fileURL,
				},
			});
			Swal.close();
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text: "An error occurred during the upload.",
			});
		}
	};
};

export const uploadProduct = (token) => {
	return async (dispatch, getState) => {
		const { product } = getState().product;
		try {
			Swal.fire({
				title: "Subiendo producto",
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
				title: "Upload Failed",
				text: "An error occurred during the upload.",
			});
		}
		FetchData("product/addProduct", token, "POST", product).then((data) => {
			console.log(product);
			console.log(data);
			dispatch(productActive(product));
			Swal.close();
			Swal.fire({
				icon: "success",
				title: "Producto creado",
				text: "El producto se ha creado correctamente.",
			});
		});
	};
};

export const productActive = (product) => ({
	type: types.productActive,
	payload: product,
});

export const imageUploaded = (fileURL) => ({
	type: types.productActive,
	payload: { images: fileURL },
});
