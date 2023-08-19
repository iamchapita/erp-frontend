import {types} from "../types/types";

const initialState = {
    products: [],
    productCategories: [],
    productUnities: [],
    product: {
        id: null,
        productCode: "",
        name: "",
        description: "",
        idProductCategoryFK: "",
        idProductUnityFK: "",
        taxablePrice: 0.00,
        taxExemptPrice: 0.00,
        salePrice: 0.00,
        images: "",
        status: 0,
        elaborationDate: "",
        expirationDate: "",
    },
    categoryActive: {
        id: null,
        name: '',
        status: 0,
    },
    unityActive: {
        id: null,
        name: '',
        symbol: '',
    },
    currentTab: {
        index: 0,
        tab: 'Productos',
        tabHeaders: {}
    }

};

export const productReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.productActive:
            return {
                ...state,
                product: {
                    ...state.product,
                    ...action.payload,
                },
            };
        case types.productCategoryActive:
            return {
                ...state,
                categoryActive: {
                    ...state.categoryActive,
                    ...action.payload,
                }
            }
        case types.productUnityActive:
            return {
                ...state,
                unityActive: {
                    ...state.unityActive,
                    ...action.payload,
                }
            }
        case types.productLoaded:
            return {
                ...state,
                products: [...action.payload],
            }
        case types.productAdd:
            return action.payload;
        case types.productUpdate:
            return action.payload;
        case types.productDelete:
            return action.payload;
        case types.productClear:
            return initialState;
        case types.productCategoriesLoaded:
            return {
                ...state,
                productCategories: action.payload,
            };
        case types.productUnitiesLoaded:
            return {
                ...state,
                productUnities: action.payload,
            };
        case types.currentTab:
            return {
                ...state,
                currentTab: {
                    ...state.currentTab,
                    ...action.payload
                }
            }
        default:
            return state;
    }
};
