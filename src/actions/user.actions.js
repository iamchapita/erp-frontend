import { FetchData } from "../components/utils/fetch"
import { adminTypes } from "../types/admin.types";

export const getAllUsers = (accessToken)=> {
    return async (dispatch) => {
        FetchData('user/getUsers', accessToken, 'GET')
            .then((data) => {
               
                dispatch({
                    type: adminTypes.GET_USERS,
                    payload: data,
                })
            }
            )
    }
}

export const updateUserRole = (accessToken, uid, role) => {
    return async (dispatch) => {
        FetchData('user/updateUserRole', accessToken, 'PATCH', { uid, role })
            .then((data) => {
                dispatch({
                    type: adminTypes.UPDATE_USER_ROLE,
                    payload: data,
                })
            }
            )
    }
}


export const userActiveAction = (user) => {
    return {
        type: adminTypes.USER_ACTIVE,
        payload: user,
    }
}


export const getRolesAction = (accessToken) => {
    return async (dispatch) => {
        FetchData('user/getRoles', accessToken, 'GET')
            .then((data) => {
                dispatch({
                    type: adminTypes.GET_ROLES,
                    payload: data,
                })
            }
            )
    }
}