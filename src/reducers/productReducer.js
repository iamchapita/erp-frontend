import { types } from "../types/types";

const productInitialState = {
    id: null,
    name: null,
    description: null,
    idProductCategoryFK: null,
    idProductUnityFK: null,
    taxablePrice: null,
    taxExcemptPrice: null,
    salePrice: null,
    images: null,
    status: null,
    elaborationDate: null,
    expirationDate: null,
    createdAt: null,

}


const productCategoriesInitialState = {
    id: null,
    name: null,
    status: null,
    createdAt: null,
    updatedAt: null,
}

const productUnitiesInitialState = {
    id: null,
    name: null,
    symbol: null,
    createdAt: null
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


export const productUnitiesReducer = (state = productUnitiesInitialState, action) => {
    switch (action?.type) {
        case types.productUnitiesLoaded:
            return action.payload;
        default:
            return state;
    }
}

