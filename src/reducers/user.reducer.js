import { adminTypes } from "../types/admin.types"

const initialState = {
    users: [],
    userActive: {},
    roles: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case adminTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case adminTypes.GET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        case adminTypes.GET_USER_ROL_BY_UID:
            return {
                ...state,
                userActive: action.payload
            }
        case adminTypes.GET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.payload
            }
        case adminTypes.UPDATE_USER_ROLE:
            return {
                ...state,
                userActive: action.payload
            }
            case adminTypes.USER_ACTIVE:
                return {
                    ...state,
                    userActive: action.payload
                }
        default:
            return state
    }
}



