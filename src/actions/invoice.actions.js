import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { imageUpload } from "../helpers/fileUpload";
import { types } from "../types/types";


export const loadInvoices = (token) => {
    return async dispatch => {
        FetchData('invoice/getInvoices/', token)
            .then(data => {
                console.log(data);
                dispatch(invoicesLoaded(data))
            }
            )
    };
}


export const invoicesLoaded = (invoices) => ({
    type: types.invoiceLoaded,
    payload: invoices
});



export const uploadImage = (files, handleInputChange) => {
    return async (dispatch) => {
        try {
            Swal.fire({
                title: 'Subiendo archivo(s)',
                text: 'Por favor espere...',
                allowOutsideClick: false,
                allowEnterKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const fileURL = await imageUpload(files);
            dispatch(imageUploaded(fileURL));
            handleInputChange(
                {
                    target: {
                        name: 'images',
                        value: fileURL
                    }
                }
            );
            Swal.close();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'An error occurred during the upload.',
            });
        }
    };
};


export const uploadInvoice = (token) => {
    return async (dispatch, getState) => {
        const { invoice } = getState().invoice;
        try {
            Swal.fire({
                title: 'Subiendo factura',
                text: 'Por favor espere...',
                allowOutsideClick: false,
                allowEnterKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'An error occurred during the upload.',
            });
        }
        FetchData('invoice/addInvoice', token, 'POST', invoice)
            .then(data => {
                console.log(invoice);
                console.log(data);
                dispatch(invoiceActive(invoice));
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Factura creada',
                    text: 'La factura se ha creado correctamente.',
                });
            }
            )
    };


};


export const invoiceActive = (invoice) => ({
    type: types.invoiceActive,
    payload: invoice
});



export const imageUploaded = (fileURL) => ({
    type: types.invoiceActive,
    payload: { images: fileURL }
});
