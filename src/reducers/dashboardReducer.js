import {types} from "../types/types";

const initialState = {
    userCount: 0
}

export const dashboardReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.getUserCount:
            return {
                ...state,
                userCount: action.payload
            }
    }
    return state;
}