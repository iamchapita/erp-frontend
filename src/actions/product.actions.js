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

export const categoriesLoaded = (categories) => ({
    type: types.productCategoriesLoaded,
    payload: categories
});






