import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null,
    currentTab: {
        index: 0,
        name: null
    }
}

export const uiReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
        case types.currentTab:
            return {
                ...state,
                currentTab: action.payload
            }
        default:
            return state
    }
}



