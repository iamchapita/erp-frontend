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

export const loadProducts = (token) => {
    return async(dispatch) => {
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
    return async(dispatch) => {
        FetchData("product/getCategory/", token).then((data) => {
            dispatch(categoriesLoaded(data));
        });
    };
};

export const chargeUnities = (token) => {
    return async(dispatch) => {
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
    return async(dispatch) => {
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

export const uploadProduct = (formState, token) => {
    return async(dispatch) => {
        try {
            console.log("Form1", formState);
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
    return async(dispatch) => {
        try {
            console.log("Form1", formState);
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
            console.error(error);
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


export const updateProduct = (formState, token) => {
    let product = {};
    let id = formState.id;
    delete formState.id;
    delete formState.updatedAt;
    const fechaOriginal = '2023-10-23 11:11:40 PM';
    const formatoOriginal = 'YYYY-MM-DD hh:mm:ss A';
    const formatoDeseado = 'YYYY-MM-DD HH:mm:ss';


    product = {
        ...formState,
        status: formState.status !== 0 ? 1 : 0,
        elaborationDate: moment(formState.elaborationDate, formatoOriginal).format(formatoDeseado),
        expirationDate: moment(formState.expirationDate, formatoOriginal).format(formatoDeseado),
    }



    return async(dispatch) => {
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
                console.log('data', data);
                if (
                    data.msg ===
                    "Se ha modificado el producto correctamente."
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
    }
}

export const productActive = (product) => ({
    type: types.productActive,
    payload: product,
});

export const imageUploaded = (fileURL) => ({
    type: types.productActive,
    payload: { images: fileURL },
});

export const changeTab = (tab) => ({
    type: types.currentTab,
    payload: tab,
});