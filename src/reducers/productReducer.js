import { types } from "../types/types";

const productInitialState = {
    
}


const productCategoriesInitialState = {
    id: null,
    name: null,
    status: null,
    createdAt: null,
    updatedAt: null,
}




export const productReducer = (state = productInitialState, action) => {
    switch (action?.type) {
        case types.product:
            return action.payload;
        case types.productAdd:
            return action.payload;
        case types.productUpdate:
            return action.payload;
        case types.productDelete:
            return action.payload;
        default:
            return state;
    }
}



export const productCategoriesReducer = (state = productCategoriesInitialState, action) => {
    switch (action?.type) {
        case types.productCategoriesLoaded:
            return action.payload;
        default:
            return state;
    }
}
