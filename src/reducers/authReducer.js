import { types } from "../types/types";


export const authReducer = (state = {}, action) => {
    switch (action?.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
                photoUrl: action.payload.photoURL
            }
        default:
            return state;
    }

}