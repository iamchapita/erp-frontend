import { types } from "../types/types";

const initialState = {
    invoices: [],
    invoice: {
        id: '',
        idCustomerFK: '',
        idSellerFK: '',
        idPurchaseOrderFK: '',
        invoiceCode: '',
        cai: '',
        rtn: '',
        invoiceType: '',
        saleDate: '',
        dueDate: '',
        creditDays: '',
        invoiceNotes: ''
    },
}

export const invoiceReducer = (state = initialState, action) => {
    switch (action?.type) {
        case invoiceTypes.invoiceActive:
            return {
                ...state,
                invoice: {
                    ...state.invoice,
                    ...action.payload
                }
            }
        case types.invoiceLoaded:
            return {
                ...state,
                invoices: [...action.payload]
            }
        case types.invoice:
            return action.payload;
        case types.invoiceAdd:
            return action.payload;
        case types.invoiceUpdate:
            return action.payload;
        case types.invoiceDelete:
            return action.payload;
        case types.invoiceClear:
            return initialState;
        default:
            return state;
    }
}

