import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { imageUpload } from "../helpers/fileUpload";
import { types } from "../types/types";
import { getTransactType } from "../components/utils/getTransactType";
import { uploadBinacleAction } from "./binacle.actions";
import moment from "moment";

// 	! FALTA IMPLEMENTAR ACTUALIZACIÓN

const mainModule = "Productos";
const firstChildModule = "Categoría de Productos";
const secondChildModule = "Unidad de Medida";

export const loadProducts = (token) => {
	return async (dispatch) => {
		FetchData("product/getProduct/", token).then((data) => {
			dispatch(productsLoaded(data));
		});
	};
};

export const loadProductsToSaleView = (token) => {
	return async (dispatch) => {
		FetchData("product/getProduct/", token).then((data) => {
			let filtered = data.filter((product) => product.status == true);

			filtered = filtered.map((product) => ({
				id: product.id,
				productCode: product.productCode,
				name: product.name,
				description: product.description,
				salePrice: product.salePrice,
			}));

			dispatch(productsLoaded(filtered));
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

export const uploadImage = (files) => {
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

			Swal.close();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text: "An error occurred during the upload.",
			});
		}
	};
};

export const uploadProduct = (formState, token) => {
	return async (dispatch, getState) => {
		let images = formState.images;
		delete formState.images;
		dispatch(uploadImage(images));
		formState = {
			...formState,
			images: getState().product.product.images,
		};

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
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text: "An error occurred during the upload.",
			});
		}
		FetchData("product/addProduct", token, "POST", formState).then(
			(data) => {
				if (data.msg === "Producto agregado correctamente") {
					// Acción sobre bitácora
					dispatch(
						uploadBinacleAction(
							mainModule,
							getTransactType(data),
							token
						)
					);

					Swal.fire({
						icon: "success",
						title: "Producto creado",
						text: "El producto se ha creado correctamente.",
					});
					dispatch(loadProducts(token));
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Ha ocurrido un error al crear el producto.",
					});
				}
			}
		);
	};
};

export const uploadCategory = (formState, token) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Subiendo categoria",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text: "An error occurred during the upload.",
			});
		}
		FetchData("product/addCategory", token, "POST", formState).then(
			(data) => {
				if (
					data.msg ===
					"Se ha creado la categoría de producto correctamente."
				) {
					// Acción sobre bitácora
					dispatch(
						uploadBinacleAction(
							firstChildModule,
							getTransactType(data),
							token
						)
					);
					Swal.fire({
						icon: "success",
						title: "Categoria creada",
						text: "La categoria se ha creado correctamente.",
					});
					dispatch(chargeCategories(token));
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Ha ocurrido un error al crear la categoria.",
					});
				}
			}
		);
	};
};
export const uploadUnity = (formState, token) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Subiendo unidad",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Fallo al subir",
				text: "Un error ha ocurrido durante la subida.",
			});
		}
		FetchData("product/addProductUnity", token, "POST", formState).then(
			(data) => {
				if (
					data.msg ===
					"Se ha creado la unidad de medida correctamente."
				) {
					// Acción sobre bitácora
					dispatch(
						uploadBinacleAction(
							secondChildModule,
							getTransactType(data),
							token
						)
					);

					Swal.fire({
						icon: "success",
						title: "Unidad creada",
						text: "La unidad se ha creado correctamente.",
					});
					dispatch(chargeUnities(token));
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text:
							data.msg === "23000"
								? "Ya existe una unidad de medida con ese nombre."
								: "Ha ocurrido un error al crear la unidad.",
					});
				}
			}
		);
	};
};

export const updateUnity = (formState, token) => {
	let unity = {};
	let id = formState.id;
	delete formState.id;
	delete formState.updatedAt;
	delete formState.createdAt;
	delete formState.status;

	unity = {
		...formState,
	};

	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Actualizando unidad",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "Fallo al actualizar",
				text: "Un error ocurrió durante la actualización.",
			});
		}
		FetchData(
			`product/updateProductUnity/${id}`,
			token,
			"PATCH",
			unity
		).then((data) => {
			if (
				data.msg ===
				"Se ha modificado la unidad de medida correctamente."
			) {
				// Acción sobre bitácora
				dispatch(
					uploadBinacleAction(
						secondChildModule,
						getTransactType(data, id),
						token
					)
				);
				Swal.fire({
					icon: "success",
					title: "Unidad de medida actualizada",
					text: "La unidad se ha actualizado correctamente.",
				});
				dispatch(chargeUnities(token));
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "Ha ocurrido un error al actualizar la unidad.",
				});
			}
		});
	};
};

export const updateProduct = (formState, token) => {
	let product = {};
	let id = formState.id;
	delete formState.id;
	delete formState.updatedAt;
	const fechaOriginal = "2023-10-23 11:11:40 PM";
	const formatoOriginal = "YYYY-MM-DD hh:mm:ss A";
	const formatoDeseado = "YYYY-MM-DD HH:mm:ss";

	product = {
		...formState,
		status: formState.status === true ? 1 : 0,
		elaborationDate: moment(
			formState.elaborationDate,
			formatoOriginal
		).format(formatoDeseado),
		expirationDate: moment(
			formState.expirationDate,
			formatoOriginal
		).format(formatoDeseado),
	};
	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Actualizando producto",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "Fallo al actualizar",
				text: "Un error ocurrió durante la actualización.",
			});
		}
		FetchData(`product/updateProduct/${id}`, token, "PATCH", product).then(
			(data) => {
				if (
					data.msg === "Se ha modificado el producto correctamente."
				) {
					// Acción sobre bitácora
					dispatch(
						uploadBinacleAction(
							firstChildModule,
							getTransactType(data, id),
							token
						)
					);
					Swal.fire({
						icon: "success",
						title: "Producto actualizado",
						text: "El producto se ha actualizado correctamente.",
					});
					dispatch(loadProducts(token));
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "Ha ocurrido un error al actualizar el producto.",
					});
				}
			}
		);
	};
};

export const updateCat = (formState, token) => {
	let category = {};
	let id = formState.id;
	delete formState.id;
	delete formState.updatedAt;
	delete formState.createdAt;
	category = {
		...formState,
		status: formState.status === true ? 1 : 0,
	};

	return async (dispatch) => {
		try {
			Swal.fire({
				title: "Actualizando categoría",
				text: "Por favor espere...",
				allowOutsideClick: false,
				allowEnterKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "Fallo al actualizar",
				text: "Un error ocurrió durante la actualización.",
			});
		}
		FetchData(
			`product/updateCategory/${id}`,
			token,
			"PATCH",
			category
		).then((data) => {
			if (
				data.msg ===
				"Se ha modificado la categoría de producto correctamente."
			) {
				// Acción sobre bitácora
				dispatch(
					uploadBinacleAction(
						firstChildModule,
						getTransactType(data, id),
						token
					)
				);
				Swal.fire({
					icon: "success",
					title: "Categoría actualizada",
					text: "La categoría se ha actualizado correctamente.",
				});
				dispatch(chargeCategories(token));
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "Ha ocurrido un error al actualizar la categoría.",
				});
			}
		});
	};
};

export const providers = (token) => {
	return async (dispatch) => {
		FetchData("product/getProductProviders/", token).then((data) => {
			dispatch(providersLoaded(data));
		});
	};
};

export const loadInventory = (token) => {
	return async (dispatch) => {
		FetchData("inventory/getInventory/", token).then((data) => {
			dispatch(inventoryLoaded(data));
		});
	};
};

export const inventoryLoaded = (inventory) => ({
	type: types.inventoryLoaded,
	payload: inventory,
});

export const providersLoaded = (providers) => ({
	type: types.productProvidersLoaded,
	payload: providers,
});

export const productActive = (product) => ({
	type: types.productActive,
	payload: { ...product, status: product.status === "Activo" ? 1 : 0 },
});

export const prodCategoryActive = (category) => ({
	type: types.productCategoryActive,
	payload: {
		...category,
		status: category.status === "Activo" ? 1 : 0,
	},
});

export const prodUnityActive = (unity) => ({
	type: types.productUnityActive,
	payload: unity,
});

export const imageUploaded = (fileURL) => ({
	type: types.productActive,
	payload: { images: fileURL },
});

export const changeTab = (tab) => ({
	type: types.currentTab,
	payload: tab,
});
