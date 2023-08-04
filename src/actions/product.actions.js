import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";

export const chargeCategories = (token) => {
    return async dispatch => {
        FetchData('product/getCategory/', token)
            .then(data => {
                dispatch(categoriesLoaded(data))
            }
            )
    };
}

export const chargeUnities = (token) => {
    return async dispatch => {
        FetchData('product/getProductUnities/', token)
            .then(data => {
                dispatch(unitiesLoaded(data))
            }
            )
    };
}


export const categoriesLoaded = (categories) => ({
    type: types.productCategoriesLoaded,
    payload: categories
});

export const unitiesLoaded = (unities) => ({
    type: types.productUnitiesLoaded,
    payload: unities
});

